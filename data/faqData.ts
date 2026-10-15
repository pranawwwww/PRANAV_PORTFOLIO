import { FAQItem } from '../types';

export const faqData: FAQItem[] = [
  // Recruiter-focused
  {
    q: "What roles are you targeting?",
    a: "QA Automation, SDET, and AI Software Engineer roles. I've spent 3 years automating tests at Amadeus and built Selenium, API, load and LLM regression tests at Pretorin, so I'm happiest owning test strategy and automation for products that increasingly have AI inside them."
  },
  {
    q: "When are you available?",
    a: "Now. I completed my M.S. in CS at ASU in December 2025 (GPA 3.97), finished my role at Pretorin in September 2026, and I'm currently an AI Researcher at ASU's DaRL Lab. I'm open to full-time QA Automation and SDET roles."
  },
  {
    q: "What testing tools and stacks do you use most?",
    a: "Test automation: Selenium WebDriver, Playwright, Appium, TestNG, JUnit, Pytest, Postman, Locust. QA process: Jira, Confluence, Zephyr, TestLink. Languages: Python, Java, SQL (MySQL, PostgreSQL), TypeScript. CI/CD: Jenkins, GitHub Actions, Docker, Kubernetes, Linux, AWS, Splunk."
  },
  {
    q: "How do you approach test automation?",
    a: "Start from a test strategy and acceptance criteria, automate the flows that block releases first (smoke, then E2E and regression), and wire everything into CI so it runs on every change. At Amadeus that meant Selenium/Java suites on Chrome, Firefox and Edge running in Jenkins with retries and parallel runs across 4 Kubernetes clusters, which cut failure review from 6 hours to 1."
  },
  {
    q: "How have you tested AI and LLM systems?",
    a: "At Pretorin I built an LLM-judged accuracy regression suite in CI that reruns after every RAG change and used it to raise retrieval precision from 71% to 93%. At ASU I built the test harness for an ACL 2026 paper that validates every tool call from 13 LLMs against ground truth across 4 languages."
  },
  {
    q: "Give me a bug you caught before customers did.",
    a: "At Pretorin I ran a Locust load test I'd built and found an 89% upload failure rate at just 10 concurrent users. I fixed the root cause and added a CI lint check that blocks that whole class of bug from coming back."
  },
  {
    q: "Any performance or scale wins?",
    a: "At Amadeus: cut release-blocking failure review from 6 hours to 1, and replaced manual triage of 15K+ monthly test failures with an ML classifier at 97% precision so releases moved from every 2–3 days to daily. At ASU: cut full LLM evaluation runs from 12 hours to under 1 hour, and made 2,000-job Slurm sweeps finish overnight instead of 4–5 days."
  },
  {
    q: "Have you done API and database testing?",
    a: "Yes. At Amadeus I tested REST APIs in Postman and validated backend data changes in MySQL with SQL. At Pretorin I wrote Postman tests for the FastAPI backend covering auth, payloads, schemas, negative cases, and data consistency in PostgreSQL."
  },
  {
    q: "Have you done mobile testing?",
    a: "Yes. Mobile Assurance is a cross-platform Appium framework in Java and TestNG that shares test behavior across iOS and Android through abstract base classes and polymorphism, running 80+ automated tests."
  },
  {
    q: "How do you work with a team?",
    a: "Agile sprints: stand-ups, sprint planning and backlog grooming, with test estimates each sprint. Defects get logged, tracked and retested in Jira, with test cases in Zephyr. At Amadeus I also led 5 engineers on internal tooling used by 12 teams."
  },
  {
    q: "Why you for an SDET role?",
    a: "I've done the core SDET work for years (Selenium, Postman, SQL, Jira, Jenkins) and I bring something most SDETs don't: I know how to test AI. I've built LLM evals that gate releases and an ML classifier that triages test failures, plus published research at ICLR 2026 and ACL 2026."
  },
  {
    q: "How do you handle ambiguity?",
    a: "Pin down acceptance criteria first, then write the smallest test that would prove it works. I write down assumptions, automate early, and keep stakeholders in the loop."
  },
  {
    q: "What is your GPA",
    a: "3.97/4.0 at ASU for my M.S. in Computer Science. 3.7/4.0 at SRM for my B.Tech in Computer Science and Engineering."
  },
  {
    q: "What are your achievements?",
    a: "📄 Published at ICLR 2026 (Latent Adaptation of Foundation Policies for Sim-to-Real Transfer) and ACL 2026 (Lost in Execution: Multilingual Robustness of Tool Calling in LLMs, 2nd author). 🧪 Releases moved from every 2–3 days to daily at Amadeus thanks to my ML failure-triage classifier. 🏆 Best Use of AI at ASU DevHacks 2025 (AdaptED AI). 3.97/4.0 GPA (MS CS, ASU)."
  },

  // Fun & human
  {
    q: "What do you do for fun?",
    a: "I love hitting the gym, going for runs, and traveling in my free time. I also enjoy playing the guitar and piano. I'm also a big fan of tech hackathons and FIFA tournaments!"
  },
  {
    q: "Share a fun fact.",
    a: "I first started writing code in COBOL, I Was the Student Representative of the Computer Science department in my Undergraduate days at SRM. I'm an avid chess player as well!"
  },
  {
    q: "Can you summarize your background in 3 lines?",
    a: "SDET with 3 years of test automation at Amadeus (Selenium, Java, Postman, Jenkins). Built Selenium, API, load and LLM regression tests at Pretorin, and an LLM tool-call test harness for an ACL 2026 paper at ASU. I build the tests that keep software, and AI, honest."
  },
  {
    q: "How do I contact you?",
    a: "Email and LinkedIn are on the Contact page—feel free to reach out."
  },
  {
    q: "Who is Neko Kutty?",
    a: "A cutie pie and the love of my life. <3"
  },
  {
    q: "What are your leadership experiences?",
    a: "At Amadeus I led 5 engineers on internal tooling used by 12 teams in the division: planned the projects, reviewed code and mentored interns. I was also the Student Representative of the Computer Science department in my undergraduate days at SRM University."
  },
];
