BookBuddy
Team Name: Alpha-5

Team Policy:

Meetings

Once a week, on Thursday at 2 PM (unless otherwise specified).
Communication Required
Every meeting should include, at minimum, a summary of what has been completed by the member.
Communicate with respective teams consistently.
Attendance and Absence Policy
Notify Ben if you have to miss; a small rescheduled meeting may be arranged.
Attendance will be tracked.
Unexcused absences are defined as:
No communication.
Absence due to poor planning or “forgetting” (meetings are the same time every week).
Repeated absences may also be categorized as unexcused.
Acceptable absences include: medical, work, conflicting classes, family emergency, or other extremely important matters.

AI Usage

Absolute zero vibe coding.
AI can be used for debugging, troubleshooting, and small code snippets when stuck.
Members must be able to fully understand and explain their code if asked.

Ethics Policy

Unsafe GitHub/programming practices or project deletion will result in:
Mandatory education on proper practices.
A written summary showing understanding of correct practices.

Language Policy

English

Code/Work Modification Guidelines

Members may modify another team member’s code/work only if:
They have consent from the code creator, or
The code creator is not completing their code promptly.

Face Mask Policy

None

Grade Requirement (B- or Higher)

To receive a B- or higher, a member must:
Not exceed 2 unexcused absences.
Contribute productive, functional, and well-commented code.
Not be a repeat offender of using AI solely to write code.

📖 Project Description

A website like goodReads. Where the user can have a personal library and get recommendations for books as well.

🙌 Team Member Bios

🧑 Ben
[Computer Science major with experience in Java, Python, SQL, and Spring Boot Frameworks. I am comforable using both Windows and IOS machines. I am on the backend development team while also maintaining the role of Team Lead and overseeing the development of the entirety of BookBuddy and the team as a whole. ]

🧑 Bear
[Studying a computer science major at Eastern Michigan University, I have experience with HTML, CSS, JavaScript, Java, Python, SQL, and a few others. I am Co-leader of the team developing BetterReads. I’ll be doing most of my work on the front end, as well as designing the user interface and attempting to create digital assets to use within the project.]

🧑 Ryan C
[Computer Science major with experience in Java, Python, SQL, and Amazon S3. I am planning on working with the backend and database portions of the program.]

🧑 Ryan R
[I am a computer science applied student graduating this semester. I have some experience in Java, JavaScript, PHP, sql, etc. I will be taking on a floating role connecting the front and backend. I will also be doing some quality assurance, namely on input-output.]

🧑 Nick
[Computer science major with experience in Java, Python, HTML, and JavaScript. I'm helping with the Frontend development and helping design the UI / User Experience. ]

🧑 Noah
[I am a computer science student major and a senior in my last year at Eastern Michigan University. I have experience using Java, Python, and SQL. I am a part of the backend team for BetterReads as well as the Documentation Specialist, which is responsible for verifying code is well documented as well as taking notes during weekly meetings.]

Running the Project

To run this project locally, you need to have the following software installed:

JDK 17+

Node.js

MySQL Server Workbench

Git

To set up the local database:

Open MySQL Server and create a new server by hitting the +

For Connection Name: bookbuddy

For password: password

with default options for everything else, note the case because it matters.

```
git clone https://github.com/COSC481W-2025Fall/BookBuddy.git

cd Bookbuddy/bookbuddy/frontend

npm install

npm run dev

cd ..
```

Open a new tab in your IDE/Terminal

You should now be in the bookbuddy directory

MAKE SURE DOCKER IS OPEN AND ON NOW

```
mvn clean install

docker compose up --build
```

You can now go to http://localhost:5173/ and see the book buddy website with these two terminals running
