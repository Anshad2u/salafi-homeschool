import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedCoding() {
  const existing = await prisma.$queryRawUnsafe<{cnt: number}[]>(
    "SELECT COUNT(*) as cnt FROM \"CurriculumTopic\" WHERE subject='coding'"
  );
  if (Number(existing[0]?.cnt ?? 0) > 0) {
    console.log('  Coding topics already exist — skipping.');
    return;
  }
  console.log('Seeding coding curriculum...');

  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('cd-001','coding','coding-foundations',0,'0-1','Cause and effect with buttons','Press a button on a toy → something happens. Baby learns that actions produce results — the foundation of programming logic.','introduction',3,'["hands-on"]','[""]','interactive toys, cause-effect apps'),
('cd-002','coding','coding-foundations',0,'0-1','Pattern recognition — stacking and sorting','Stack blocks, sort shapes, match colors. Recognizing patterns is the first step in computational thinking.','introduction',3,'["hands-on"]','[""]','shape sorter, stacking blocks'),
('cd-003','coding','coding-foundations',1,'1-2','Sequencing — first, then, next','Learn sequences: "First we put on shoes, then we go outside." Understanding order of steps is programming basics.','introduction',3,'["verbal","hands-on"]','["cd-001"]','picture sequence cards'),
('cd-004','coding','coding-foundations',1,'1-2','Following instructions — simple commands','Give and follow simple commands: "Clap your hands," "Turn around." Learn that code is just a set of instructions.','introduction',3,'["verbal","hands-on"]','["cd-003"]','command games'),
('cd-005','coding','coding-foundations',2,'2-3','If-then thinking — simple conditions','"If it rains, we take an umbrella." Learn conditional thinking through daily examples.','introduction',3,'["verbal"]','["cd-003"]','condition cards, daily scenarios'),
('cd-006','coding','coding-foundations',2,'2-3','Loops — doing things again','"Every morning we pray Fajr, then Dhuhr, then Asr..." Repetition in daily life = loops in coding.','introduction',3,'["verbal"]','["cd-003"]','repetition activities'),
('cd-007','coding','coding-foundations',3,'3-4','Introduction to Scratch Jr','Start using Scratch Jr app — drag blocks to make characters move. Create a simple animation of a character walking.','introduction',3,'["hands-on"]','["cd-005"]','Scratch Jr app, tablet'),
('cd-008','coding','coding-foundations',3,'3-4','Scratch Jr — sequences and loops','Make characters move in sequence, repeat actions. Create a simple dance animation using sequence and repeat blocks.','practice',3,'["hands-on"]','["cd-007"]','Scratch Jr app'),
('cd-009','coding','coding-foundations',3,'3-4','Scratch Jr — events and conditions','Make characters respond to taps, screen shakes. "When green flag clicked, say Hello!" Introduction to event-driven programming.','practice',3,'["hands-on"]','["cd-008"]','Scratch Jr app'),
('cd-010','coding','coding-blocks',4,'4-5','Scratch basics — sprites and scripts','Move to Scratch (desktop/web). Learn about sprites, backdrops, and scripts. Create a simple story with two characters talking.','introduction',3,'["hands-on"]','["cd-007"]','Scratch website, computer'),
('cd-011','coding','coding-blocks',4,'4-5','Scratch — variables and score','Create a simple game with a score. Learn that a variable is a "box" that stores a number. "When sprite touches apple, change score by 1."','practice',3,'["hands-on"]','["cd-010"]','Scratch'),
('cd-012','coding','coding-blocks',4,'4-5','Scratch — if-else conditions','"If score > 10, say You win! Else, say Try again!" Build a simple quiz game using conditions.','practice',3,'["hands-on"]','["cd-011"]','Scratch'),
('cd-013','coding','coding-blocks',5,'5-6','Scratch — loops and forever','"Forever" loop: make a character continuously move. "Repeat 10 times": create a pattern. Build a simple maze game.','practice',3,'["hands-on"]','["cd-012"]','Scratch'),
('cd-014','coding','coding-blocks',5,'5-6','Scratch — lists and data','Create a list of Quran surahs or Islamic facts. Use "add to list" and "say item" blocks. Introduction to data structures.','practice',3,'["hands-on"]','["cd-013"]','Scratch'),
('cd-015','coding','coding-blocks',5,'5-6','Scratch — projects and sharing','Complete a personal Scratch project (game, animation, or story). Share on Scratch community. Learn to give and receive feedback.','mastery',4,'["hands-on"]','["cd-014"]','Scratch, internet access'),
('cd-016','coding','coding-text',6,'6-7','Introduction to Python — print and variables','Start learning Python: print("Assalamu Alaikum"), variables (name = "Yusuf"), basic math. Write your first Python program.','introduction',3,'["hands-on"]','["cd-010"]','Python, computer'),
('cd-017','coding','coding-text',6,'6-7','Python — if-else and input','Write programs that ask questions and make decisions: "What is your name? Hello, name!" if/else conditions in Python.','practice',3,'["hands-on"]','["cd-016"]','Python'),
('cd-018','coding','coding-text',6,'6-7','Python — loops (for and while)','For loops: "print the numbers 1 to 10." While loops: "keep asking until the answer is correct." Build a simple guessing game.','practice',3,'["hands-on"]','["cd-017"]','Python'),
('cd-019','coding','coding-text',6,'6-7','Python — functions and lists','Create functions: "def greet(name): print Hello name." Lists: store and manipulate collections of data. Build a simple todo list program.','practice',3,'["hands-on"]','["cd-018"]','Python'),
('cd-020','coding','coding-web',6,'6-7','HTML basics — creating a webpage','Learn HTML tags: <h1>, <p>, <img>, <a>. Create a simple webpage about Islam or a personal page.','practice',3,'["hands-on"]','["cd-016"]','text editor, browser'),
('cd-021','coding','coding-web',6,'6-7','CSS basics — styling your webpage','Add colors, fonts, and layouts to your HTML page. Learn CSS: color, background, font-size, margin, padding.','practice',3,'["hands-on"]','["cd-020"]','text editor, browser'),
('cd-022','coding','coding-robotics',6,'6-7','Introduction to algorithms','Learn what an algorithm is: a step-by-step solution to a problem. Write algorithms for everyday tasks: making tea, tying shoes.','practice',2,'["verbal","hands-on"]','["cd-003"]','algorithm cards'),
('cd-023','coding','coding-robotics',6,'6-7','Debugging — finding and fixing errors','Learn to find and fix bugs in code. "Why doesn''t my program work?" — systematic debugging approach: check each step.','practice',2,'["hands-on"]','["cd-016"]','Scratch or Python examples'),
('cd-024','coding','coding-robotics',6,'6-7','Computational thinking — decomposition','Break big problems into small parts. "Build a website" → design layout → write HTML → add CSS → test. Practice with real projects.','practice',2,'["verbal","hands-on"]','["cd-022"]','project planning worksheet')`);

  console.log('  Seeded 24 coding topics (cd-001 to cd-024)');
}
