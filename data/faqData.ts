import { FAQItem } from '../types';

export const faqData: FAQItem[] = [
  // Recruiter-focused
  {
    q: "What roles are you targeting?",
    a: "Software Engineer (backend/platform) and ML Engineer, I am open to SRE roles as well, as I had somewhat of that experience in both DaRL labs and Amadeus Labs, deploying ML pipelines as well as test pipelines. I like shipping production AI and scalable systems end-to-end."
  },
  {
    q: "When are you available?",
    a: "I'm pursuing an M.S. in CS at ASU through Dec 2025. Open to Full Time roles from December 2025 onwards."
  },
  {
    q: "What languages and stacks do you use most?",
    a: "Python, Java, JavaScript/TypeScript; backends with Spring Boot and Flask; REST/gRPC; CI/CD with GitHub Actions/Jenkins; Docker/Kubernetes on AWS; Postgres/MySQL/MongoDB."
  },
  {
    q: "Give me one project you're proud of.",
    a: "AdaptED AI — a personalized tutor built with React/TypeScript + Gemini; it won “Best Use of AI” at DevHacks Hackathon at ASU in 2025 for being innovative and having real-life impact on students."
  },
  {
    q: "How have you applied ML beyond coursework?",
    a: "Sim2Real RL research at ASU: domain-adaptation studies, scalable benchmarks, and a survey that maps methods to MDP components to compare approaches clearly. I am currently working on a new Sim2Real project focusing on improving Foundational Policies wioth Hilbert Representations."
  },
  {
    q: "Any performance or scale wins?",
    a: "At Amadeus I cut CI/CD from ~72→12 hours (Docker/K8s/Jenkins), migrated legacy Java to Spring Boot microservices (~40% fewer rollbacks), and built an NLP RCA that auto-labels 15K+ test failures/month."
  },
  {
    q: "How do you approach reliability and testing?",
    a: "Automated pipelines, fast feedback, and pragmatic tests (JUnit/Playwright). I track the metrics that matter and design for safe rollouts."
  },
  {
    q: "SDE vs ML—what's your preference?",
    a: "Both. I enjoy hybrid roles that connect models to real users—clean APIs, reliable infra, measurable outcomes."
  },
  {
    q: "Where can I see your code and demos?",
    a: "Check the Projects page for write-ups and links; the Contact page has my GitHub if you want to dive deeper."
  },
    {
    q: "Why you for SDE or ML at FAANG?",
    a: "I’ve shipped tangible wins (72→12 hr CI/CD, fewer rollbacks, automated failure triage), plus research discipline from Sim2Real RL. I bridge models, services, and product outcomes."
  },
    {
    q: "How can I quickly see your work?",
    a: "Check the Projects page for write-ups and links (demo/GitHub). If you want a 3-line summary or a role-specific pitch, ask the assistant to ‘copy bio’ or ‘pitch for SDE/ML’."
  },
    {
    q: "How do you handle ambiguity?",
    a: "Start with a thin slice and a measurable target, instrument early, then iterate. I write down assumptions, run small experiments, and keep stakeholders in the loop."
  },
    {
    q: "What kind of problems excite you here?",
    a: "Latency hunts, reliability work, and connecting ML to users. I like projects where the success metric is obvious—faster, cheaper, more accurate—and we can measure it."
  },
    {
    q: "How do you approach system design?",
    a: "Pragmatic first: clear SLAs, simple APIs, and strong observability. I design for idempotency, backpressure, and failure domains; prefer REST/gRPC, queues for async, and caching where it truly moves p95."
  },
  {
    q: "How do you ensure reliability and quality?",
    a: "Lean CI/CD, fast feedback loops, and tests that matter (JUnit/Playwright). I favor rollout safety (canary/feature flags), and I track latency/error budgets so we can ship often without surprises."
  },
  {
    q: "What’s an ML project you’re proud of?",
    a: "AdaptED AI—an adaptive tutor using React/TypeScript + Gemini. It won “Best Use of AI” at DevHacks for boosting demo engagement and showcases my habit of tying models to real UX."
  },
  {
    q: "How does your research translate to product work?",
    a: "My Sim2Real RL research (ASU) focused on reproducible benchmarks and domain adaptation. That rigor shows up in my engineering via automation, metrics, and clean experiment→prod handoffs."
  },
  {
    q: "What scale or volume have you handled?",
    a: "Enterprise CI/CD and service migrations at Amadeus (multi-team pipelines, thousands of tests/day). On the research side, automated RL evaluations that took days now complete in hours through HPC pipelines."
  },
    {
    q: "What is your GPA",
    a: "3.96/4 at ASU for my M.S. in Computer Science. 8.7/10 at SRM for my B.Tech in Computer Science and Engineering."
  },
    {
    q: "What are your achievements?",
    a: "Won 'Best Use of AI' at DevHacks Hackathon 2025 for AdaptED AI. Published Sim2Real RL research at NeurIPS 2023. Dean's List at ASU (2024). Participated in over 4 Hackathons, recieving positive feedback in each of them. Was awarded employee of the year for my division at Amadeus for the year 2023."
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
    a: "Software Developer & ML Engineer. Sim2Real RL research @ ASU. I ship reliable AI—from Python backends to cloud pipelines."
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
    a: "I’ve led cross-functional teams at Amadeus, driving initiatives that improved CI/CD efficiency and fostered a culture of collaboration. I also mentor junior engineers, helping them navigate challenges and grow their skills. I was the Student Representative of the Computer Science department in my Undergraduate days at SRM University."
  },

];
