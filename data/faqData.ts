import { FAQItem } from '../types';

export const faqData: FAQItem[] = [
  // Recruiter-focused
  {
    q: "What roles are you targeting?",
    a: "Software Engineer roles on AI teams: AI-powered developer tools, LLM agents, or the cloud services underneath them. I build services and the AI that runs on them, in Java and Python. Based in the SF Bay Area, open to relocating anywhere in the US, no sponsorship needed. Hiring? Email the req number to tpranavkutralingam@gmail.com."
  },
  {
    q: "When are you available?",
    a: "Now. I finished my M.S. in CS at ASU in December 2025 (GPA 3.97), was a Software Engineer (Product) at Pretorin from March to September 2026, and I'm currently an AI Researcher at ASU's DaRL Lab while looking for full-time roles."
  },
  {
    q: "What languages and stacks do you use most?",
    a: "Java, Python and TypeScript. Backend: Spring Boot, FastAPI, REST. Frontend: React, Next.js. AI: LLM agents, RAG (hybrid search, reranking, pgvector), LLM evals, guardrails, vLLM, PyTorch, scikit-learn, Claude Code. Cloud and infra: Kubernetes, Azure, AWS, Docker, CI/CD (GitHub Actions, Jenkins), PostgreSQL."
  },
  {
    q: "Give me one project you're proud of.",
    a: "AdaptED AI — a personalized tutor built with React/TypeScript + Gemini; it won “Best Use of AI” at DevHacks Hackathon at ASU in 2025 for being innovative and having real-life impact on students."
  },
  {
    q: "How have you applied ML beyond coursework?",
    a: "In production: at Pretorin I took an agentic RAG chatbot from zero to one over 1,000+ documents per customer and raised retrieval precision from 71% to 93%; at Amadeus I built a gradient-boosting pipeline that saves $500K a year by flagging false Agency Debit Memo claims, and a scikit-learn classifier that triages 15K+ monthly test failures at 97% precision. In research at ASU's DaRL Lab, I built the eval and training infrastructure for two 2026 papers (ACL, ICLR)."
  },
  {
    q: "Any performance or scale wins?",
    a: "Pretorin: retrieval precision 71% → 93%; upload failures at 10 concurrent users cut from 89% to 0%. Amadeus: an itinerary service at 5 ms p99 on 100K+ request peak days; releases moved from every 2-3 days to daily; the IndiGo integration grew India market share 18%. ASU: eval sweeps cut from 12 hours to under 1 hour, and 4-5 day experiments turned into overnight runs."
  },
  {
    q: "How do you approach reliability and testing?",
    a: "AI gets measured before it ships. At Pretorin I built guardrails as code (an allowlisted writer so the LLM never writes compliance control text, checked against a 40-pair hand-labeled golden set) and an LLM-judged eval suite in CI/CD with 85% agreement with human labels that blocked accuracy regressions. I also found an 89% upload failure rate with a Locust load test I wrote, fixed it to 0%, and added a lint rule that blocks the bug class."
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
    a: "I build services and the AI that runs on them, and I've shipped both: an agentic RAG chatbot from zero (71% → 93% retrieval precision), a 5 ms p99 Java service, an ML pipeline saving $500K a year, and release tooling that moved releases to daily. Plus research discipline from two 2026 papers (ACL, ICLR)."
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
    a: "Pragmatic first: clear SLAs, simple APIs, and strong observability. I design for idempotency, backpressure, and failure domains; prefer REST APIs, queues for async, and caching where it truly moves p95."
  },
  {
    q: "How do you ensure reliability and quality?",
    a: "Lean CI/CD, fast feedback loops, and tests that matter. I favor rollout safety (fail-closed gates, canary rollouts), and I track latency/error budgets so we can ship often without surprises."
  },
  {
    q: "What's an ML project you're proud of?",
    a: "The Pretorin compliance chatbot: an agentic RAG system I designed, built and deployed from zero, serving 1,000+ documents per customer with chained tool calls. I raised retrieval precision from 71% to 93% with hybrid search and reranking, and kept it honest with guardrails and an LLM eval suite in CI/CD. On the hackathon side, AdaptED AI won “Best Use of AI” at ASU DevHacks."
  },
  {
    q: "How does your research translate to product work?",
    a: "At the DaRL Lab I built eval and training infrastructure: a concurrent scheduler across 8 model backends for a 13-LLM tool-calling benchmark, and fault-tolerant Slurm sweeps. Pretorin is where the two met: production engineering, with AI that's measured before it ships, using an LLM-judged eval suite in CI/CD."
  },
  {
    q: "What scale or volume have you handled?",
    a: "Amadeus: an itinerary service handling 100K+ requests on peak days at 5 ms p99, 15K+ test failures a month, and tooling used by 12 teams. Pretorin: 1,000+ documents per customer. ASU: 2,000-job distributed sweeps on a 10-GPU Slurm cluster."
  },
    {
    q: "What is your GPA",
    a: "3.97/4.0 at ASU for my M.S. in Computer Science. 3.7/4.0 at SRM for my B.Tech in Computer Science and Engineering."
  },
    {
    q: "What are your achievements?",
    a: "📄 Published at ICLR 2026 (Latent Adaptation of Foundation Policies for Sim-to-Real Transfer) and ACL 2026 (Lost in Execution: Multilingual Robustness of Tool Calling in LLMs, 2nd author). 💼 Took an agentic RAG chatbot from zero to one at Pretorin (71% → 93% retrieval precision) and built an ML pipeline at Amadeus saving $500K a year. 🏆 Best Use of AI at ASU DevHacks 2025 (AdaptED AI). 🎓 3.97/4.0 GPA (MS CS, ASU)."
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
    a: "Software Engineer on AI: I build services and the AI that runs on them, in Java and Python. Took an LLM agent from zero to one at Pretorin (71% → 93% retrieval precision) after 3 years at Amadeus, where I went from intern to leading 5 engineers. M.S. CS from ASU, published at ACL and ICLR 2026, now an AI Researcher at ASU's DaRL Lab."
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
    a: "I joined Amadeus as an intern in 2021 and grew into leading 5 engineers on internal tooling used by 12 teams: planning the projects, reviewing code and mentoring. At Pretorin I worked directly with clients on requirements, integrations and demos. I was also the Student Representative of the Computer Science department at SRM University."
  },

];
