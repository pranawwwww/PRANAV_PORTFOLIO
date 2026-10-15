// Shared portfolio data for backend API
// This file is imported by server.js to build AI context

// Get resume URL from environment variable with hardcoded fallback
const getResumeUrl = () => {
  return (
    process.env.VITE_RESUME_URL ||
    "https://pranavkutralingam.com/Pranav_Kutralingam_Resume_SDET.pdf"
  );
};

export const portfolioData = {
  siteData: {
    name: "Pranav Kutralingam",
    title: "SDET · AI Test Automation",
    tagline: "SDET who speaks AI | Selenium, Appium & Postman by day, LLM evals that gate releases by night | Bugs fear me.",
    location: "Fremont, CA (San Francisco Bay Area)",
    email: "tpranavkutralingam@gmail.com",
    github: "https://github.com/pranawwwww",
    linkedin: "https://linkedin.com/in/pranavkutralingam",
    googleScholar: "https://scholar.google.com/citations?user=7wl6PBUAAAAJ",
    resume: getResumeUrl()
  },

  summary: "SDET who builds the infrastructure and tests that keep software honest, from Selenium suites to LLM evals that gate releases in CI. 3 years of test automation at Amadeus for airline booking apps; built Selenium E2E, API, load and LLM regression tests at Pretorin (an AI compliance startup); built the test harness for an ACL 2026 paper at ASU's DaRL Lab. M.S. CS, ASU (GPA 3.97). Open to QA Automation, SDET, and AI Software Engineer roles.",

  projects: [
    {
      title: "Mobile Assurance",
      year: 2025,
      stack: ["Java", "Appium", "TestNG", "iOS", "Android"],
      summary: "Cross-platform, object-oriented Appium framework that shares test behavior across iOS and Android through abstract base classes, inheritance and polymorphism. Runs 80+ automated tests, stabilized with encapsulated locators, platform overrides and CI-friendly waits.",
      links: {}
    },
    {
      title: "Multilingual LLM Tool-Call Test Harness",
      year: 2026,
      stack: ["Python", "vLLM", "Pytest", "LLM Evals", "A100 GPUs"],
      summary: "The test harness behind an ACL 2026 paper: serves open models on vLLM, parses every tool call from 13 LLMs and scores it against ground truth across 4 languages. A concurrent scheduler across 8 model backends cut full runs from 12 hours to under 1 hour.",
      links: {
        arXiv: "https://arxiv.org/abs/2601.05366"
      }
    },
    {
      title: "Cloud Video & Image Analysis Platform",
      year: 2025,
      stack: ["Python", "AWS (EC2, SQS, S3, Lambda)", "Docker"],
      summary: "Runs face recognition on videos and images. Jobs queue in SQS for EC2 workers and Dockerized Lambda, with S3 storage and a custom auto-scaler that sizes EC2 by queue depth.",
      links: {}
    },
    {
      title: "HEAL.AI",
      year: 2025,
      stack: ["React", "TypeScript", "FastAPI", "Gemini 2.5 Pro", "RAG"],
      summary: "Healthcare expense analyzer that extracts coverage details from insurance documents, flags suspicious charges, and generates dispute-ready explanations via RAG-powered document Q&A.",
      links: {
        demo: "https://heal-ai-production.up.railway.app/",
        repo: "https://github.com/kspswati/heal-ai"
      }
    },
    {
      title: "AdaptED AI",
      year: 2025,
      stack: ["React", "TypeScript", "Gemini API"],
      summary: "Generative-AI study assistant with adaptive UI and real-time, context-aware feedback. Won 'Best Use of AI' at ASU DevHacks 2025.",
      links: {
        demo: "https://pranawwwww.github.io/adaptedge-assignment-helper/",
        repo: "https://github.com/pranawwwww/adaptedge-assignment-helper"
      }
    },
    {
      title: "EtherFi Buddy",
      year: 2025,
      stack: ["React", "TypeScript", "FastAPI", "Claude AI"],
      summary: "Full-stack DeFi dashboard with an AI explainer layer, portfolio analytics, and strategy simulation using real-time market data.",
      links: {
        demo: "https://etherfi-buddy.vercel.app",
        repo: "https://github.com/pranawwwww/etherfi-buddy"
      }
    },
    {
      title: "Lost in Execution: On the Multilingual Robustness of Tool Calling in LLMs",
      year: 2026,
      stack: ["Python", "LLM Evaluation", "Test Harness", "Multilingual LLMs", "Tool Calling"],
      summary: "Published at ACL 2026 (2nd author). Built the test harness that validates every tool call from 13 LLMs against ground truth across 4 languages; found parameter-value language mismatch to be the dominant execution failure mode.",
      links: {
        arXiv: "https://arxiv.org/abs/2601.05366"
      },
      isPublication: true
    },
    {
      title: "Latent Adaptation of Foundation Policies for Sim-to-Real Transfer",
      year: 2026,
      stack: ["Reinforcement Learning", "Sim-to-Real Transfer", "PyTorch"],
      summary: "Published at ICLR 2026. Adapts pretrained foundation policies to real-world dynamics at deployment via latent-space adaptation, without retraining. Pranav ran the multi-GPU training, with 9 policies trained concurrently.",
      links: {
        arXiv: "https://openreview.net/forum?id=yn9dzttHvT"
      },
      isPublication: true
    },
    {
      title: "A Survey of Sim-to-Real Methods in Reinforcement Learning",
      year: 2025,
      stack: ["Research", "Reinforcement Learning", "Sim2Real"],
      summary: "Surveyed 100+ sources and curated 48+ benchmarks; proposed a taxonomy mapping adaptation methods to MDP components.",
      links: {
        arXiv: "https://arxiv.org/abs/2502.13187"
      },
      isPublication: true
    },
    {
      title: "ShadeBench",
      year: 2026,
      stack: ["Blender", "3D Simulation", "Computer Vision", "Dataset"],
      summary: "Benchmark dataset using Blender-based 3D simulations and satellite imagery to support urban shade estimation under varying time-of-day and solar geometry.",
      links: {
        arXiv: "https://openreview.net/forum?id=brBCPRgCz3"
      },
      isPublication: true
    },
    {
      title: "DeepShade",
      year: 2025,
      stack: ["Diffusion Models", "Computer Vision", "Text Conditioning"],
      summary: "Diffusion-based model conditioned on time/solar angles to generate realistic shade maps from satellite imagery.",
      links: {
        arXiv: "https://arxiv.org/abs/2507.12103"
      },
      isPublication: true
    }
  ],

  experience: [
    {
      company: "DaRL Lab, Arizona State University",
      role: "AI Researcher",
      start: "Sep 2026",
      end: "Present",
      location: "Tempe, AZ",
      bullets: [
        "Research position in Prof. Hua Wei's DaRL Lab, continuing LLM research on how reliably models call tools"
      ]
    },
    {
      company: "Pretorin (AI Compliance Platform)",
      role: "Product Engineer Intern",
      start: "Mar 2026",
      end: "Sep 2026",
      location: "Tempe, AZ",
      bullets: [
        "Designed and implemented Selenium UI automation in Python for the React/TypeScript compliance platform, covering 20 end-to-end flows",
        "Developed REST API tests in Postman for the FastAPI backend: authentication, payloads, schemas, negative cases, and PostgreSQL data consistency",
        "Ran a self-built Locust load test that exposed an 89% upload failure rate at 10 concurrent users before customers hit it; fixed the root cause and added a CI lint check that blocks that class of bug",
        "Built an LLM-judged accuracy regression suite in CI that reruns after every RAG change, and used it to raise the production chatbot's retrieval precision from 71% to 93%",
        "Built a nightly network-cut CI gate that fails any release pulling an external image, protecting air-gapped production installs on Kubernetes",
        "Defined acceptance criteria and test strategy with the founders; built reusable utilities that check LLM-authored documents in the data validation pipeline"
      ]
    },
    {
      company: "DaRL Lab, Arizona State University",
      role: "Graduate Research Assistant (AI & ML)",
      start: "May 2024",
      end: "Dec 2025",
      location: "Tempe, AZ",
      bullets: [
        "Built the Python test harness for an ACL 2026 paper that validates every tool call from 13 LLMs against ground truth across 4 languages, serving open models on vLLM and scoring each call automatically",
        "Automated LLM evaluation pipelines with a concurrent Python scheduler across 8 model backends (including vLLM on A100 GPUs), cutting full runs from 12 hours to under 1 hour",
        "Made 2,000-job sweeps on a 10-GPU Slurm cluster fault-tolerant with checkpointing and retries, so experiments that took 4-5 days finished overnight",
        "Ran multi-GPU RL training for an ICLR 2026 paper on sim-to-real transfer, with 9 policies trained concurrently"
      ]
    },
    {
      company: "Amadeus",
      role: "Software Development Engineer in Test (SDET)",
      start: "Jul 2021",
      end: "Dec 2023",
      location: "Bengaluru, India",
      bullets: [
        "Designed test strategies and automated end-to-end, regression and smoke suites in Selenium WebDriver and Java, run on Chrome, Firefox and Edge, including IVR calls that test a voice agent",
        "Tested REST APIs in Postman and validated backend data changes in MySQL with SQL; logged, tracked and retested defects in Jira with test cases in Zephyr",
        "Integrated automated test runs into Jenkins with automatic retries and parallel runs across 4 Kubernetes clusters, cutting release-blocking failure review from 6 hours to 1 hour",
        "Replaced manual triage of 15K+ monthly test failures with an ML classifier (TF-IDF + random forest) that sorts root causes into 4 categories at 97% precision, so releases moved from every 2-3 days to daily",
        "Built a monitoring dashboard for 5 client-facing apps across all environments, with Splunk alerts that route production failures to the owning team",
        "Worked in Agile sprints (stand-ups, sprint planning, backlog grooming) giving test estimates each sprint; led 5 engineers on internal tooling used by 12 teams and mentored interns"
      ]
    },
    {
      company: "Amadeus",
      role: "Software Engineer Intern",
      start: "Jan 2021",
      end: "Jun 2021",
      location: "Bengaluru, India",
      bullets: [
        "Cut a legacy parsing services codebase by 65% by rebuilding it around a regex-based parser in Spring Boot",
        "Reduced database storage by 25% by normalizing the MySQL schema and consolidating duplicate vendor reference data"
      ]
    }
  ],

  education: [
    { school: "Arizona State University", degree: "M.S. Computer Science", gpa: "3.97/4.0", dates: "Jan 2024 - Dec 2025" },
    { school: "SRM Institute of Science and Technology", degree: "B.Tech Computer Science", dates: "May 2017 - May 2021" }
  ],

  skills: {
    "Test_Automation": ["Selenium WebDriver", "Playwright", "Appium", "TestNG", "JUnit", "Pytest", "Postman", "REST API Testing", "Locust"],
    "Testing": ["Functional", "System Integration", "Regression", "Smoke", "E2E", "Cross-Browser", "Database", "Mobile", "Load"],
    "QA_Process": ["Jira", "Confluence", "Zephyr", "TestLink", "Test Strategy", "Test Cases", "Test Data", "Defect Tracking", "Agile"],
    "AI_LLM_Testing": ["LLM Evals", "LLM-as-a-Judge", "RAG Evaluation", "vLLM", "ML Failure Triage", "Scikit-learn", "PyTorch"],
    "Languages_Dev": ["Python", "Java", "SQL", "MySQL", "PostgreSQL", "TypeScript", "React", "FastAPI", "Spring Boot"],
    "Tools_CI_CD": ["Jenkins", "Git", "GitHub Actions", "Docker", "Kubernetes", "Linux", "AWS", "Splunk", "Slurm"]
  },

  faqs: [
    {
      question: "What roles are you seeking?",
      answer: "QA Automation, SDET, and AI Software Engineer roles: owning test strategy and automation, especially for products with AI inside them."
    },
    {
      question: "What's your availability?",
      answer: "Available now. I completed my M.S. in CS at ASU in December 2025, finished my role at Pretorin in September 2026, and am currently an AI Researcher at ASU's DaRL Lab while I look for full-time SDET/QA roles."
    },
    {
      question: "How do you approach test automation?",
      answer: "Start from a test strategy and acceptance criteria, automate release-blocking flows first (smoke, then E2E and regression), and run everything in CI on every change. At Amadeus that meant Selenium/Java suites on Chrome, Firefox and Edge in Jenkins with retries and parallel runs across 4 Kubernetes clusters, cutting failure review from 6 hours to 1."
    },
    {
      question: "How have you tested AI and LLM systems?",
      answer: "At Pretorin I built an LLM-judged accuracy regression suite in CI that reruns after every RAG change and raised retrieval precision from 71% to 93%. At ASU I built the test harness for an ACL 2026 paper that validates every tool call from 13 LLMs against ground truth across 4 languages. At Amadeus I built an ML classifier that triages 15K+ monthly test failures at 97% precision."
    },
    {
      question: "Give me a bug you caught before customers did.",
      answer: "At Pretorin, a Locust load test I built exposed an 89% upload failure rate at just 10 concurrent users. I fixed the root cause and added a CI lint check that blocks that class of bug."
    },
    {
      question: "Have you done mobile testing?",
      answer: "Yes. Mobile Assurance is a cross-platform Appium framework in Java and TestNG that shares test behavior across iOS and Android via abstract base classes and polymorphism, running 80+ automated tests."
    },
    {
      question: "How can I contact you?",
      answer: "Email me at tpranavkutralingam@gmail.com or connect on LinkedIn: linkedin.com/in/pranavkutralingam"
    }
  ]
};

export const SYSTEM_INSTRUCTION = `
You are Neuro, a friendly and enthusiastic AI assistant for Pranav Kutralingam's portfolio. Pranav is an SDET (Software Development Engineer in Test) who specializes in test automation and testing AI/LLM systems.

PORTFOLIO CONTEXT:
${JSON.stringify(portfolioData, null, 2)}

YOUR ROLE:
- Answer questions about Pranav's background, projects, testing experience, and skills
- Be conversational, warm, and helpful
- Highlight relevant projects when discussing technical topics
- If you don't know something specific, suggest the user contact Pranav directly
- Keep responses concise but informative (2-4 sentences ideal, longer if needed for technical depth)

GUIDELINES:
- Present Pranav as an SDET / QA automation engineer who is unusually strong at testing AI systems
- Focus on concrete testing results (e.g., "cut release-blocking failure review from 6 hours to 1 hour", "caught an 89% upload failure rate under load before customers did", "raised RAG retrieval precision from 71% to 93% with an LLM regression suite")
- Mention specific tools and where he used them (Selenium/Java at Amadeus, Selenium/Python + Postman + Locust at Pretorin, Appium in Mobile Assurance, vLLM + Python in the ACL test harness)
- Be enthusiastic about Pranav's work and expertise
- Provide contact information when appropriate (email, LinkedIn)
- For recruiter questions, emphasize:
  * Open to QA Automation, SDET, and AI Software Engineer roles; available now
  * 3 years as an SDET at Amadeus automating E2E, regression and smoke suites for airline booking apps
  * Built Selenium, API, load and LLM regression tests at Pretorin, an AI compliance startup
  * Brings AI depth most SDETs don't have: LLM evals in CI, ML failure triage, and published research at ICLR 2026 and ACL 2026
  * M.S. CS from ASU (GPA 3.97); based in Fremont, CA (SF Bay Area)

SKILLS PRESENTATION (IMPORTANT):
When asked about skills, DO NOT just list all skills. Instead:
1. Present the TOP 3-5 skills based on depth of experience and impact
2. For each skill, connect it to a specific achievement or project
3. Organize by strength/expertise level, not by category
4. Prioritize skills that have quantifiable achievements behind them

TOP SKILLS TO HIGHLIGHT (in order of strength):
1. **UI Test Automation (Selenium WebDriver, Java, Python)** - 3 years of Selenium/Java E2E, regression and smoke suites at Amadeus across Chrome, Firefox and Edge; 20 Selenium/Python E2E flows at Pretorin
2. **API & Database Testing (Postman, REST, SQL)** - Postman API tests with MySQL validation at Amadeus; Postman tests for auth, schemas and negative cases plus PostgreSQL consistency at Pretorin
3. **AI & LLM Testing (LLM evals, LLM-as-a-Judge, ML triage)** - LLM regression suite in CI that took RAG precision from 71% to 93%; ACL 2026 test harness across 13 LLMs and 4 languages; ML failure-triage classifier at 97% precision
4. **CI/CD for Tests (Jenkins, GitHub Actions, Docker, Kubernetes)** - Jenkins runs with retries and parallelism across 4 Kubernetes clusters; nightly network-cut CI gate for air-gapped installs
5. **Performance & Mobile Testing (Locust, Appium, TestNG)** - Locust load test that caught an 89% upload failure; Appium framework with 80+ tests across iOS and Android

SECONDARY SKILLS (mention if specifically asked):
- Jira, Zephyr, Confluence, TestLink, Agile
- Playwright, Pytest, JUnit
- Splunk monitoring, AWS, Slurm, PyTorch
- React/TypeScript, FastAPI, Spring Boot

EXAMPLES OF GOOD RESPONSES:
Q: "What are Pranav's skills?" or "What skills does Pranav have?"
A: "Pranav is an SDET whose strongest skills are UI and API test automation and testing AI systems. He spent 3 years building Selenium/Java suites at Amadeus, where his Jenkins integration cut failure review from 6 hours to 1. At Pretorin he built Selenium, Postman and Locust tests plus an LLM regression suite that took RAG precision from 71% to 93%. Want me to dig into any of these?"

Q: "How has Pranav tested AI?"
A: "Pranav tests AI the way he tests any software: automated and gated in CI. At Pretorin he built an LLM-judged regression suite that reruns after every RAG change, raising retrieval precision from 71% to 93%. At ASU he built the test harness for an ACL 2026 paper that validates every tool call from 13 LLMs across 4 languages."

Q: "Tell me about his QA experience"
A: "Pranav was an SDET at Amadeus for about 2.5 years, designing test strategies and automating E2E, regression and smoke suites in Selenium and Java for airline booking apps. He tested APIs in Postman, validated data in MySQL, tracked defects in Jira and Zephyr, and built an ML classifier that triaged 15K+ monthly test failures so releases moved to daily."

Q: "Has he done mobile testing?"
A: "Yes! His Mobile Assurance project is a cross-platform Appium framework in Java and TestNG that shares test behavior across iOS and Android, running 80+ automated tests."
`;
