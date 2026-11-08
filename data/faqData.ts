import { FAQItem } from '../types';

export const faqData: FAQItem[] = [
  // Recruiter-focused
  {
    q: "What roles are you targeting?",
    a: "Software Engineer (backend/platform) and Applied AI/LLM Engineer, I'm also open to MLOps/ML Platform roles given my DaRL Labs and Amadeus Labs experience deploying ML pipelines and test infrastructure. I like shipping production AI and scalable systems end-to-end."
  },
  {
    q: "When are you available?",
    a: "I completed my M.S. in CS at ASU in December 2025. I'm currently a Product Engineer Intern at Pretorin (through the internship), and open to full-time SWE/AI roles."
  },
  {
    q: "What languages and stacks do you use most?",
    a: "Languages: Python, Java, C++, C, C#, Rust, SQL, TypeScript/JavaScript. Backends: FastAPI, Flask, Spring Boot, Microservices, REST APIs. LLMs/GenAI: OpenAI Agent SDK, OpenAI API, Hugging Face, RAG, pgvector, LLM-as-a-Judge Evaluation, Prompt Engineering. ML: PyTorch, scikit-learn, NumPy, Pandas. DevOps: Docker, Kubernetes, Helm, Jenkins, GitHub Actions, Slurm, AWS, Azure, Splunk, Grafana, Locust."
  },
  {
    q: "Give me one project you're proud of.",
    a: "AdaptED AI — a personalized tutor built with React/TypeScript + Gemini; it won “Best Use of AI” at DevHacks Hackathon at ASU in 2025 for being innovative and having real-life impact on students."
  },
  {
    q: "How have you applied ML beyond coursework?",
    a: "As a Graduate Research Assistant at ASU's DaRL Lab (May 2024 - Dec 2025), I built fault-tolerant batch pipelines that ran 2,000+ PyTorch experiments across a 10-GPU Slurm cluster, and built the data/integration layer for MLCL, a multilingual LLM tool-calling benchmark. That work led to two published papers: 'Latent Adaptation of Foundation Policies for Sim-to-Real Transfer' (ICLR 2026) and 'Lost in Execution: On the Multilingual Robustness of Tool Calling in LLMs' (ACL 2026, 2nd author)."
  },
  {
    q: "Any performance or scale wins?",
    a: "At Amadeus: redesigned a distributed E2E test pipeline on Kubernetes/Jenkins, cutting runtime from 12 hours to 4 hours; built an NLP-based error-log monitoring system that cut manual triage effort by 60% across 15K+ events/month; improved API response times by 45% under peak load through SQL tuning and caching. At Pretorin: built the platform's first Kubernetes load/stress framework (Locust, Helm, 100 concurrent users) with an OpenAI token-budget kill-switch."
  },
  {
    q: "How do you approach reliability and testing?",
    a: "Automated pipelines, fast feedback, and pragmatic tests. At Pretorin I designed an LLM evaluation gate in CI (deterministic schema checks + calibrated LLM-as-judge vs. a hand-labeled golden set) that fails closed to block bad AI outputs before release. I track the metrics that matter and design for safe rollouts."
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
    a: "I've shipped tangible wins (12hr→4hr CI/CD pipeline redesign, 60% less manual triage, automated failure routing), plus research discipline that produced two published papers (ICLR 2026, ACL 2026). I bridge models, services, and product outcomes."
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
    a: "AdaptED AI—an adaptive tutor using React/TypeScript + Gemini. It won “Best Use of AI” at DevHacks for boosting demo engagement and showcases my habit of tying models to real UX."
  },
  {
    q: "How does your research translate to product work?",
    a: "My research at ASU's DaRL Lab focused on reproducible batch experimentation and multilingual LLM evaluation — building fault-tolerant pipelines and benchmark tooling. That rigor shows up in my engineering via automation, eval-driven development (like the LLM-as-judge gate I built at Pretorin), and clean experiment→prod handoffs."
  },
  {
    q: "What scale or volume have you handled?",
    a: "Enterprise CI/CD and service migrations at Amadeus (multi-team pipelines, 15K+ test events/month). On the research side, I ran 2,000+ PyTorch experiments across a 10-GPU Slurm cluster with automated batch execution and zero manual restarts."
  },
    {
    q: "What is your GPA",
    a: "3.97/4.0 at ASU for my M.S. in Computer Science. 3.7/4.0 at SRM for my B.Tech in Computer Science and Engineering."
  },
    {
    q: "What are your achievements?",
    a: "📄 Published at ICLR 2026 (Latent Adaptation of Foundation Policies for Sim-to-Real Transfer) and ACL 2026 (Lost in Execution: Multilingual Robustness of Tool Calling in LLMs, 2nd author). 🏆 Best Use of AI at ASU DevHacks 2025 (AdaptED AI). Two more papers on arXiv: A Survey of Sim-to-Real Methods in RL, and DeepShade. 3.97/4.0 GPA (MS CS, ASU) and 3.7/4.0 (BTech, SRM)."
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
    a: "Software Engineer with 3+ years of production backend experience, currently building AI compliance infrastructure at Pretorin. Published at ICLR 2026 and ACL 2026 from my research assistantship at ASU. I ship reliable AI—from Python backends to LLM systems in production."
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
    a: "I've led cross-functional initiatives at Amadeus that improved CI/CD efficiency, and I mentor junior engineers, helping them navigate challenges and grow their skills. I was the Student Representative of the Computer Science department in my Undergraduate days at SRM University."
  },

];
