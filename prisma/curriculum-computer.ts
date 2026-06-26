import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedComputer() {
  const existing = await prisma.$queryRawUnsafe<{cnt: number}[]>(
    "SELECT COUNT(*) as cnt FROM \"CurriculumTopic\" WHERE subject='computer'"
  );
  if (Number(existing[0]?.cnt ?? 0) > 0) {
    console.log('  Computer topics already exist — skipping.');
    return;
  }
  console.log('Seeding computer literacy curriculum...');

  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('co-001','computer','computer-foundations',0,'0-1','Touch screen basics','Swipe, tap, pinch. Baby learns to interact with a tablet — the foundation of digital literacy.','introduction',3,'["hands-on"]','[""]','tablet, simple apps'),
('co-002','computer','computer-foundations',0,'0-1','Screen time balance','Learn that screens are for limited use. Balance with outdoor play, reading, and physical activity.','introduction',3,'["verbal"]','[""]','parent guidance, timer'),
('co-003','computer','computer-foundations',1,'1-2','Mouse and trackpad basics','Move the cursor, click, double-click. Practice with simple click-and-drag games.','introduction',3,'["hands-on"]','["co-001"]','computer, mouse games'),
('co-004','computer','computer-foundations',1,'1-2','Keyboard basics — pressing keys','Press keys and see letters appear on screen. Learn that the keyboard is how we type words.','introduction',3,'["hands-on"]','["co-003"]','computer, keyboard game'),
('co-005','computer','computer-foundations',2,'2-3','Parts of a computer — screen, keyboard, mouse','Identify and name the parts: monitor (screen), keyboard, mouse, tower/computer box, speakers, printer.','introduction',2,'["visual","verbal"]','["co-003"]','computer parts poster'),
('co-006','computer','computer-foundations',2,'2-3','Turning on and off a computer safely','Learn to properly shut down a computer (not just close the lid). Importance of saving work before shutting down.','introduction',2,'["hands-on"]','["co-005"]','computer'),
('co-007','computer','computer-foundations',2,'2-3','What is the internet?','The internet connects computers worldwide. We can learn, communicate, and share. Like a library that never closes.','introduction',2,'["verbal"]','["co-005"]','internet diagram'),
('co-008','computer','computer-foundations',3,'3-4','Internet safety — basics','Never share personal information online. Tell a parent if you see something uncomfortable. Online strangers are still strangers.','practice',2,'["verbal"]','["co-007"]','safety poster, discussion'),
('co-009','computer','computer-foundations',3,'3-4','Typing practice — home row keys','Learn proper finger placement on the keyboard. Practice typing simple words using all 10 fingers.','practice',3,'["hands-on"]','["co-004"]','typing software (e.g. TypingClub)'),
('co-010','computer','computer-foundations',3,'3-4','Files and folders — organizing digital content','Create folders, save files, rename files. "A folder on a computer is like a drawer for your papers."','practice',2,'["hands-on"]','["co-006"]','computer, file manager'),
('co-011','computer','computer-foundations',4,'4-5','Using a word processor — typing a letter','Open a word processor (Google Docs/Word). Type a short letter. Learn: save, open, print, copy, paste, undo.','practice',3,'["hands-on"]','["co-009"]','Google Docs or Word'),
('co-012','computer','computer-foundations',4,'4-5','Internet safety — passwords and privacy','Create strong passwords. Never share passwords. What is personal information (name, address, phone, school).','practice',2,'["verbal"]','["co-008"]','password worksheet'),
('co-013','computer','computer-foundations',4,'4-5','Email basics — sending a simple email','Create an email account (with parent). Send an email to a family member. Learn: to, subject, body, send.','practice',2,'["hands-on"]','["co-011"]','email account, parent supervision'),
('co-014','computer','computer-foundations',5,'5-6','Spreadsheet basics — cells and data','Open Excel or Google Sheets. Enter data in cells, create a simple table (e.g., weekly chores tracker). Basic formulas: =SUM().','practice',3,'["hands-on"]','["co-011"]','Google Sheets or Excel'),
('co-015','computer','computer-foundations',5,'5-6','Presentation basics — slides and content','Create a simple slideshow presentation about an Islamic topic. Add text, images, and transitions.','practice',3,'["hands-on"]','["co-011"]','Google Slides or PowerPoint'),
('co-016','computer','computer-foundations',5,'5-6','Digital citizenship — online behavior','Treat others online as you would in person. No cyberbullying. Respect intellectual property (don''t copy others'' work).','practice',2,'["verbal"]','["co-012"]','discussion, scenarios'),
('co-017','computer','computer-foundations',6,'6-7','File management — organizing your computer','Create a proper folder structure for schoolwork. Learn: drive (C:), folders, subfolders, file extensions (.docx, .pdf, .jpg).','practice',2,'["hands-on"]','["co-010"]','computer, file manager'),
('co-018','computer','computer-foundations',6,'6-7','Keyboard shortcuts — efficiency tips','Learn essential shortcuts: Ctrl+C (copy), Ctrl+V (paste), Ctrl+Z (undo), Ctrl+S (save), Ctrl+P (print).','practice',2,'["hands-on"]','["co-011"]','keyboard shortcut cheat sheet'),
('co-019','computer','computer-foundations',6,'6-7','Cloud storage — backing up work','Learn about Google Drive, iCloud, OneDrive. Save work to the cloud so it''s safe even if the computer breaks.','practice',2,'["hands-on"]','["co-017"]','cloud storage account'),
('co-020','computer','computer-foundations',6,'6-7','Digital literacy — evaluating information','Not everything online is true. Check sources. Use reliable websites. "Is this website trustworthy? Who wrote it?"','practice',2,'["verbal"]','["co-008"]','evaluation worksheet, examples')`);

  console.log('  Seeded 20 computer topics (co-001 to co-020)');
}
