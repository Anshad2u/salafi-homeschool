import { prisma } from './prisma';

const SUBJECTS_PER_DAY: Record<string, number> = {
  'quran': 2,           // 1 recitation + 1 memorization/understanding
  'islamic-studies': 1,
  'english': 2,         // 1 phonics/reading + 1 writing/grammar
  'mathematics': 1,
  'science': 1,
  'art-music': 1,       // alternating
  'physical-education': 1, // alternating
  'life-skills': 1,
  'social-studies': 0,  // occasional
};

const ALL_SUBJECTS = [
  'quran', 'islamic-studies', 'english', 'mathematics',
  'science', 'social-studies', 'art-music', 'physical-education', 'life-skills'
];

/**
 * Get curriculum topics suitable for a student's level.
 * Level 0 = age 0-1, Level 1 = age 1-2, etc.
 * Includes topics at the student's level and one level below (review).
 */
async function getTopicsForLevel(level: number) {
  return prisma.curriculumTopic.findMany({
    where: {
      level: { in: [level, Math.max(0, level - 1)] },
    },
    orderBy: [{ strand: 'asc' }, { level: 'asc' }, { category: 'asc' }],
  });
}

/**
 * Generate a 365-day curriculum plan for a student.
 * Topics are distributed evenly across subjects and days.
 * Each topic is scheduled `estimatedSessions` times.
 */
export async function generateYearlyPlan(
  studentPlanId: string,
  startDate: string,
  knownTopicIds: string[],
) {
  const plan = await prisma.studentPlan.findUnique({
    where: { id: studentPlanId },
  });
  if (!plan) throw new Error('Student plan not found');

  const allTopics = await getTopicsForLevel(plan.level);

  // Filter out known topics
  const unknownTopics = allTopics.filter(t => !knownTopicIds.includes(t.id));

  // Build a queue of topic slots: each topic appears estimatedSessions times
  type TopicSlot = { topicId: string; subject: string; strand: string; title: string; description: string; category: string; };
  const queue: TopicSlot[] = [];
  for (const t of unknownTopics) {
    for (let s = 0; s < t.estimatedSessions; s++) {
      queue.push({
        topicId: t.id,
        subject: t.subject,
        strand: t.strand,
        title: t.title,
        description: t.description,
        category: t.category,
      });
    }
  }

  // Shuffle queue for variety
  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }

  // Generate 365 days
  const dailyPlans: Array<{
    date: string;
    dayNumber: number;
    tasks: TopicSlot[];
  }> = [];

  let queueIndex = 0;

  for (let day = 0; day < 365; day++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + day);
    const dateStr = date.toISOString().split('T')[0];

    // Determine how many topics per subject this day
    const subjectsToday: string[] = [];
    for (const subj of ALL_SUBJECTS) {
      const count = SUBJECTS_PER_DAY[subj] || 0;
      for (let i = 0; i < count; i++) {
        subjectsToday.push(subj);
      }
    }

    // Pick topics for today from the queue, balancing subjects
    const dayTasks: TopicSlot[] = [];
    const usedToday = new Set<string>();

    for (const subj of subjectsToday) {
      // Find next topic in queue for this subject that hasn't been used today
      let found = false;
      for (let attempt = 0; attempt < queue.length; attempt++) {
        const idx = (queueIndex + attempt) % queue.length;
        const slot = queue[idx];
        if (slot.subject === subj && !usedToday.has(slot.topicId)) {
          dayTasks.push(slot);
          usedToday.add(slot.topicId);
          queueIndex = (idx + 1) % queue.length;
          found = true;
          break;
        }
      }
      // If no topic found for this subject, skip
      if (!found && queueIndex < queue.length) {
        queueIndex = (queueIndex + 1) % queue.length;
      }
    }

    // If queue is exhausted, cycle back (topics repeat for reinforcement)
    if (queueIndex >= queue.length) {
      queueIndex = 0;
    }

    dailyPlans.push({
      date: dateStr,
      dayNumber: day + 1,
      tasks: dayTasks,
    });
  }

  return dailyPlans;
}

/**
 * Save generated plan to database.
 */
export async function savePlanToDb(
  studentPlanId: string,
  dailyPlanData: Array<{ date: string; dayNumber: number; tasks: Array<{ topicId: string; subject: string; }>; }>,
) {
  // Create all daily plans and tasks in a transaction
  for (const dp of dailyPlanData) {
    const dailyPlan = await prisma.dailyPlan.create({
      data: {
        studentPlanId,
        date: dp.date,
        dayNumber: dp.dayNumber,
      },
    });

    if (dp.tasks.length > 0) {
      await prisma.dailyPlanTask.createMany({
        data: dp.tasks.map(t => ({
          dailyPlanId: dailyPlan.id,
          topicId: t.topicId,
          subject: t.subject,
          status: 'pending',
        })),
      });
    }
  }
}

/**
 * Get today's plan for a student, including overdue tasks from previous days.
 */
export async function getTodayPlan(profileId: string) {
  const today = new Date().toISOString().split('T')[0];

  // Find the active plan for this student
  const studentPlan = await prisma.studentPlan.findFirst({
    where: { profileId, isActive: true },
    orderBy: { createdAt: 'desc' },
  });
  if (!studentPlan) return null;

  // Get today's plan
  let dailyPlan = await prisma.dailyPlan.findUnique({
    where: { studentPlanId_date: { studentPlanId: studentPlan.id, date: today } },
    include: {
      tasks: {
        include: { topic: true },
        orderBy: { subject: 'asc' },
      },
    },
  });

  // If no plan exists for today, get the most recent day's plan (for carry-forward)
  if (!dailyPlan) {
    // Find the latest plan before today that has pending tasks
    const previousPlan = await prisma.dailyPlan.findFirst({
      where: {
        studentPlanId: studentPlan.id,
        date: { lt: today },
      },
      include: {
        tasks: {
          include: { topic: true },
          orderBy: { subject: 'asc' },
        },
      },
      orderBy: { date: 'desc' },
    });

    if (previousPlan) {
      // Get overdue tasks (pending from previous days)
      const overdueTasks = previousPlan.tasks.filter(t => t.status === 'pending');

      // Create today's plan and carry forward overdue tasks
      dailyPlan = await prisma.dailyPlan.create({
        data: {
          studentPlanId: studentPlan.id,
          date: today,
          dayNumber: previousPlan.dayNumber + 1,
        },
        include: {
          tasks: {
            include: { topic: true },
            orderBy: { subject: 'asc' },
          },
        },
      });

      if (overdueTasks.length > 0 && dailyPlan) {
        const planId = dailyPlan.id;
        await prisma.dailyPlanTask.createMany({
          data: overdueTasks.map(t => ({
            dailyPlanId: planId,
            topicId: t.topicId,
            subject: t.subject,
            status: 'carried-over',
          })),
        });

        // Refresh daily plan
        dailyPlan = await prisma.dailyPlan.findUnique({
          where: { id: dailyPlan.id },
          include: {
            tasks: {
              include: { topic: true },
              orderBy: { subject: 'asc' },
            },
          },
        });
      }
    }
  }

  return dailyPlan;
}

/**
 * Mark a task as completed, skipped, or not-needed.
 */
export async function updateTaskStatus(
  taskId: string,
  status: 'completed' | 'skipped' | 'not-needed' | 'pending',
  feedback?: string,
) {
  return prisma.dailyPlanTask.update({
    where: { id: taskId },
    data: {
      status,
      feedback: feedback || '',
      completedAt: status === 'completed' ? new Date() : undefined,
    },
  });
}
