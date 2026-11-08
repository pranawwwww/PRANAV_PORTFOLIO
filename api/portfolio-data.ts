// Shared portfolio data for backend API
// This file is imported by the serverless function to build AI context

// Current resume (Google Drive). Keep in sync with data/siteData.ts.
const RESUME_URL = "https://drive.google.com/file/d/1jHTTvQRcG_M7tD3QuY1stw8LET37JvGQ/view?usp=sharing";

export const portfolioData = {
  siteData: {
    name: "Pranav Kutralingam",
    tagline: "Software Engineer, AI. Builds and ships LLM agents and cloud services in Java & Python.",
    location: "San Francisco Bay Area",
    email: "tpranavkutralingam@gmail.com",
    github: "https://github.com/pranawwwww",
    linkedin: "https://linkedin.com/in/pranavkutralingam",
    googleScholar: "https://scholar.google.com/citations?user=7wl6PBUAAAAJ",
    resume: RESUME_URL
  },

  projects: [
    {
      "title": "Computer-Use Automation Agent",
      "year": 2026,
      "stack": [
        "Python",
        "LLM agents",
        "Pydantic",
        "Playwright"
      ],
      "summary": "An LLM learns a task in a legacy web app (ParaBank) once, saves it as a typed, versioned skill, then replays it deterministically without the LLM. Self-repairs when the page drifts, with safety gates and 188 offline tests.",
      "links": {
        "repo": "https://github.com/pranawwwww/cua-computer-use-automation"
      }
    },
    {
      "title": "HEAL AI: Medical Insurance Assistant",
      "year": 2025,
      "note": "Team project",
      "stack": [
        "Python",
        "FastAPI",
        "React",
        "TypeScript",
        "Gemini",
        "RAG"
      ],
      "summary": "Answers questions on uploaded medical bills and insurance policies and flags coverage gaps and overcharges. A React client calls a FastAPI RAG backend that grounds Gemini in the user's files.",
      "links": {
        "demo": "https://heal-ai-production.up.railway.app/",
        "repo": "https://github.com/kspswati/heal-ai"
      }
    },
    {
      "title": "AdaptED AI: Personalized Digital Tutor",
      "year": 2025,
      "stack": [
        "React",
        "TypeScript",
        "Gemini API"
      ],
      "summary": "A generative-AI study assistant with an adaptive UI and real-time, context-aware feedback. Won 'Best Use of AI' at ASU DevHacks 2025.",
      "links": {
        "demo": "https://pranawwwww.github.io/adaptedge-assignment-helper/",
        "repo": "https://github.com/pranawwwww/adaptedge-assignment-helper"
      }
    },
    {
      "title": "Scalable Cloud-Based Video & Image Analysis Platform",
      "year": 2025,
      "stack": [
        "Python",
        "AWS (EC2, SQS, S3, Lambda)",
        "Docker"
      ],
      "summary": "Runs face recognition on videos and images. Jobs queue in SQS for EC2 workers and Dockerized Lambda, with S3 storage and a custom auto-scaler that sizes EC2 by queue depth.",
      "links": {}
    },
    {
      "title": "Lost in Execution: On the Multilingual Robustness of Tool Calling in Large Language Models",
      "year": 2026,
      "venue": "ACL 2026",
      "authorship": "2nd of 6 authors",
      "isPublication": true,
      "stack": [
        "Python",
        "vLLM",
        "LLM Evaluation",
        "Tool Calling"
      ],
      "summary": "Benchmarks how accurately 13 LLMs call tools across 4 languages. Pranav built the Python harness that serves open models on vLLM, parses each tool call and scores it against ground truth.",
      "links": {
        "arXiv": "https://arxiv.org/abs/2601.05366"
      }
    },
    {
      "title": "Latent Adaptation of Foundation Policies for Sim-to-Real Transfer",
      "year": 2026,
      "venue": "ICLR 2026",
      "isPublication": true,
      "stack": [
        "Reinforcement Learning",
        "PyTorch",
        "Sim-to-Real"
      ],
      "summary": "Adapts pretrained RL policies for sim-to-real transfer. Pranav ran the multi-GPU training: 9 policies concurrently with checkpointing and auto-resume.",
      "links": {
        "arXiv": "https://openreview.net/forum?id=yn9dzttHvT"
      }
    },
    {
      "title": "A Survey of Sim-to-Real Methods in Reinforcement Learning",
      "year": 2025,
      "venue": "arXiv, 2025",
      "isPublication": true,
      "stack": [
        "Reinforcement Learning",
        "Sim-to-Real",
        "Survey"
      ],
      "summary": "Surveys sim-to-real methods in RL and maps adaptation methods to MDP components, with a curated list of benchmarks.",
      "links": {
        "arXiv": "https://arxiv.org/abs/2502.13187"
      }
    },
    {
      "title": "ShadeBench: Benchmark Dataset for Urban Shade Simulation",
      "year": 2025,
      "venue": "NeurIPS 2025 Workshop (UrbanAI)",
      "authorship": "4th of 6 authors",
      "isPublication": true,
      "stack": [
        "Blender",
        "3D Simulation",
        "Computer Vision",
        "Dataset"
      ],
      "summary": "A benchmark dataset built from Blender 3D simulations and satellite imagery for shade estimation across time of day and sun position.",
      "links": {
        "arXiv": "https://openreview.net/forum?id=brBCPRgCz3"
      }
    },
    {
      "title": "DeepShade: Generative Shade Prediction from Satellite Imagery",
      "year": 2025,
      "venue": "arXiv preprint, 2025",
      "authorship": "4th of 6 authors",
      "isPublication": true,
      "stack": [
        "Diffusion Models",
        "Computer Vision"
      ],
      "summary": "A diffusion model conditioned on time and sun angle that generates shade maps from satellite imagery.",
      "links": {
        "arXiv": "https://arxiv.org/abs/2507.12103"
      }
    }
  ],

  experience: [
    {
      "company": "DaRL Lab, Arizona State University",
      "role": "AI Researcher",
      "start": "Sep 2026",
      "end": "Present",
      "location": "Tempe, AZ",
      "bullets": [
        "Research position in Prof. Hua Wei's DaRL Lab, continuing LLM research"
      ]
    },
    {
      "company": "Pretorin (seed-stage AI compliance startup, government clients)",
      "role": "Software Engineer (Product)",
      "start": "Mar 2026",
      "end": "Sep 2026",
      "location": "Tempe, AZ",
      "stack": "Python, FastAPI, PostgreSQL (pgvector), Azure, Kubernetes, React, Next.js, GitHub Actions",
      "bullets": [
        "Designed, built and deployed a production agentic RAG chatbot from zero to one for government compliance teams, serving 1,000+ documents per customer with chained tool calls; raised retrieval precision from 71% to 93% with hybrid search and reranking",
        "Built responsible-AI guardrails as code: an allowlisted writer that stops the LLM from ever writing compliance control text, checked against a 40-pair hand-labeled golden set, plus an LLM-judged eval suite in CI/CD (85% agreement with human labels) that blocked accuracy regressions",
        "Debugged an 89% upload failure rate at 10 concurrent users with a Locust load test he wrote, traced it to blocking storage calls on the async path, cut failures to 0%, and added a CI lint rule that blocked the bug class"
      ],
      "more_bullets": [
        "Document ingestion for PDFs, images and text on a Postgres work queue; GPT-4o vision turns image evidence into validated JSON",
        "OAuth 2.0 gateway turning Google identities and LDAP attributes into JWTs, with MFA step-up and Azure Key Vault",
        "Nightly network-cut CI gate protecting air-gapped Kubernetes installs",
        "React and Next.js product screens, including a compliance dashboard and voice input for the chatbot"
      ]
    },
    {
      "company": "DaRL Lab, Arizona State University",
      "role": "Graduate Research Assistant (AI & ML)",
      "start": "May 2024",
      "end": "Dec 2025",
      "location": "Tempe, AZ",
      "bullets": [
        "Built the software behind two 2026 papers on LLM tool calling (ACL) and sim-to-real reinforcement learning (ICLR)",
        "Cut LLM evaluation sweeps from 12 hours to under 1 hour with a concurrent Python scheduler across 8 model backends, including vLLM inference on A100 GPUs, for the ACL 2026 benchmark of tool calling in 13 LLMs across 4 languages",
        "Made 2,000-job distributed sweeps on a 10-GPU Slurm cluster fault-tolerant with checkpointing and retries, turning 4-5 day experiments into overnight runs",
        "Trained 9 RL policies concurrently in PyTorch across multiple GPUs for an ICLR 2026 paper on sim-to-real transfer"
      ]
    },
    {
      "company": "Amadeus",
      "role": "Software Engineer",
      "start": "Jul 2021",
      "end": "Dec 2023",
      "location": "Bengaluru, India",
      "bullets": [
        "Java and Spring Boot services for airline and travel-agency booking, including an event-driven itinerary service at 5 ms p99 on peak days of 100K+ requests",
        "Led 5 engineers on internal tooling used by 12 teams (planning, code reviews, mentoring)",
        "Built a gradient-boosting ML pipeline that screens third-party Agency Debit Memo claims and flags likely false ones for dispute, saving $500K a year",
        "Replaced manual root-cause triage of 15K+ monthly test failures with a scikit-learn classifier at 97% precision, taking CI/CD releases from every 2-3 days to daily",
        "Shipped the IndiGo integration into Amadeus's travel-agent booking platform with Spring Boot REST and payment APIs and idempotent checkout, growing the platform's India market share 18%"
      ]
    },
    {
      "company": "Amadeus",
      "role": "Software Engineer Intern",
      "start": "Jan 2021",
      "end": "Jun 2021",
      "location": "Bengaluru, India",
      "bullets": [
        "Cut a legacy parsing service's codebase by 65% by rebuilding it around a regex-based parser in Spring Boot",
        "Reduced database storage by 25% by normalizing the MySQL schema and consolidating duplicate vendor reference data"
      ]
    }
  ],

  education: [
    {
      "school": "Arizona State University",
      "degree": "M.S. Computer Science",
      "dates": "Jan 2024 - Dec 2025",
      "gpa": "3.97/4.0"
    },
    {
      "school": "SRM University",
      "degree": "B.Tech Computer Science",
      "dates": "May 2017 - May 2021",
      "gpa": "3.7/4.0"
    }
  ],

  skills: {
    "Languages": [
      "Java",
      "Python",
      "TypeScript",
      "SQL",
      "Kotlin"
    ],
    "Backend_Web": [
      "Spring Boot",
      "FastAPI",
      "React",
      "Next.js",
      "REST APIs",
      "OAuth 2.0 / JWT",
      "PostgreSQL",
      "MySQL"
    ],
    "AI_LLMs": [
      "AI agents & tool calling",
      "MCP",
      "LangGraph",
      "RAG (hybrid search, reranking)",
      "LLM evals / LLM-as-judge",
      "Guardrails",
      "vLLM",
      "QLoRA fine-tuning",
      "PyTorch",
      "scikit-learn"
    ],
    "Cloud_Infra": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "Azure",
      "AWS",
      "CI/CD (GitHub Actions, Jenkins)",
      "Slurm",
      "Linux"
    ],
    "Testing_Tools": [
      "Pytest",
      "Playwright",
      "Selenium",
      "Locust",
      "Splunk",
      "Claude Code",
      "GitHub Copilot",
      "Cursor"
    ]
  },

  faqs: [
    {
      "question": "What roles are you seeking?",
      "answer": "Software Engineer roles on AI teams: AI-powered developer tools, LLM agents, or the cloud services underneath them. Based in the SF Bay Area, open to relocating anywhere in the US, no sponsorship needed. Hiring? Email the req number to tpranavkutralingam@gmail.com."
    },
    {
      "question": "What's your availability?",
      "answer": "Available now. Finished the M.S. in CS at ASU in Dec 2025, was a Software Engineer (Product) at Pretorin (Mar-Sep 2026), and is currently an AI Researcher at ASU's DaRL Lab while looking for full-time roles."
    },
    {
      "question": "What programming languages do you use?",
      "answer": "Java, Python and TypeScript most, plus SQL and Kotlin."
    },
    {
      "question": "What's your biggest technical achievement?",
      "answer": "Taking Pretorin's agentic RAG chatbot from zero to one and raising its retrieval precision from 71% to 93%, with guardrails and an LLM eval suite in CI/CD. At Amadeus: an ML pipeline saving $500K a year and the IndiGo integration (India market share +18%). In research: two 2026 papers (ACL, ICLR)."
    },
    {
      "question": "Do you have experience with ML/LLMs in production?",
      "answer": "Yes. At Pretorin he built a production agentic RAG chatbot over 1,000+ documents per customer with chained tool calls, guardrails as code, and an LLM-judged eval suite in CI/CD (85% agreement with human labels). At Amadeus he shipped a gradient-boosting pipeline saving $500K a year and a scikit-learn failure-triage classifier at 97% precision."
    },
    {
      "question": "What's your experience with distributed systems?",
      "answer": "An event-driven Java itinerary service at 5 ms p99 on 100K+ request peak days at Amadeus; async FastAPI services on Kubernetes at Pretorin; 2,000-job fault-tolerant distributed sweeps on a 10-GPU Slurm cluster at ASU."
    },
    {
      "question": "How can I contact you?",
      "answer": "Email tpranavkutralingam@gmail.com or connect on LinkedIn: linkedin.com/in/pranavkutralingam"
    }
  ]
};

export const SYSTEM_INSTRUCTION = `
You are Neuro, a friendly and enthusiastic AI assistant for Pranav Kutralingam's portfolio. Pranav is a Software Engineer, AI: he builds and ships LLM agents and cloud services in Java & Python.

PORTFOLIO CONTEXT:
${JSON.stringify(portfolioData, null, 2)}

YOUR ROLE:
- Answer questions about Pranav's background, projects, technical experience, and skills
- Be conversational, warm, and helpful
- Highlight relevant projects when discussing technical topics
- If you don't know something specific, suggest the user contact Pranav directly
- Keep responses concise but informative (2-4 sentences ideal, longer if needed for technical depth)

GUIDELINES:
- Focus on technical achievements and concrete results (e.g., "raised RAG retrieval precision from 71% to 93%", "built a Java service at 5 ms p99 latency", "ML pipeline saving $500K a year")
- Mention specific projects when relevant (e.g., "In his computer-use agent, Pranav...")
- Be enthusiastic about Pranav's work and expertise
- Provide contact information when appropriate (email, LinkedIn)
- When discussing technologies, connect them to real projects or roles from the portfolio
- For recruiter questions, emphasize:
  * Headline: Software Engineer, AI. Builds and ships LLM agents and cloud services in Java & Python. "Most of my code has run in production. Some of it also made it into ACL and ICLR."
  * Looking for Software Engineer roles on AI teams: AI-powered developer tools, agents, or the cloud services underneath them
  * Based in the SF Bay Area, open to relocating anywhere in the US, no sponsorship needed; recruiters can email the req number to tpranavkutralingam@gmail.com
  * Career arc: joined Amadeus as an intern in 2021 and grew into leading a team; M.S. CS at ASU (3.97 GPA) building research infrastructure for LLMs and RL; Pretorin is where the two met: production engineering, with AI that's measured before it ships
  * Pretorin title was Software Engineer (Product), Mar-Sep 2026, a full-time role; never describe him as an intern there
  * Currently an AI Researcher at ASU's DaRL Lab (since Sep 2026)

SKILLS PRESENTATION (IMPORTANT):
When asked about skills, DO NOT just list all skills. Instead:
1. Present the TOP 3-5 skills based on depth of experience and impact
2. For each skill, connect it to a specific achievement or project
3. Organize by strength/expertise level, not by category
4. Prioritize skills that have quantifiable achievements behind them

TOP SKILLS TO HIGHLIGHT (in order of strength):
1. **LLM agents & evals (agentic RAG, tool calling, guardrails, LLM evals)** - Took Pretorin's agentic RAG chatbot from zero to one (71% to 93% retrieval precision) with guardrails as code and an LLM-judged eval suite in CI/CD; built eval infrastructure for the ACL 2026 tool-calling benchmark of 13 LLMs
2. **Java & Spring Boot backends** - 3 years at Amadeus: a 5 ms p99 event-driven itinerary service and the IndiGo booking integration (India market share +18%)
3. **Python & FastAPI** - Pretorin's chatbot backend on Kubernetes and Azure; debugged an 89% upload failure rate to 0%
4. **Machine Learning (PyTorch, scikit-learn)** - $500K/year gradient-boosting pipeline and a 97%-precision failure-triage classifier at Amadeus; ICLR 2026 RL training
5. **Cloud & CI/CD (Kubernetes, Azure, AWS, GitHub Actions)** - Moved Amadeus releases from every 2-3 days to daily; eval and lint gates in CI/CD at Pretorin

SECONDARY SKILLS (mention if specifically asked):
- Kotlin (Android)
- Splunk, Grafana, Slurm, MinIO
- Testing: Selenium, Playwright, Pytest, Locust, Postman
- React/TypeScript (used across HEAL AI, AdaptED AI and Pretorin's product screens)
- Pranav does not list C#, C, C++ or Rust as working skills.

WORK AUTHORIZATION: Pranav does not need visa sponsorship. He is based in the SF Bay Area and open to relocating anywhere in the US.

EXAMPLES OF GOOD RESPONSES:
Q: "What are Pranav's skills?" or "What skills does Pranav have?"
A: "Pranav's strongest areas are LLM engineering, Java/Spring Boot backends, and Python services. At Pretorin he built a production LLM chatbot from zero and raised retrieval precision from 71% to 93%. At Amadeus he built a 5 ms p99 Java itinerary service and an ML pipeline saving $500K a year. He's also published at ICLR 2026 and ACL 2026. Want me to dive deeper into any of these?"

Q: "What's Pranav's experience with ML?"
A: "Pranav has ML experience across production and research. At Pretorin he took an agentic RAG chatbot from zero to one and raised its retrieval precision from 71% to 93%, and at Amadeus he shipped an ML pipeline saving $500K a year. At ASU's DaRL Lab he built the infrastructure behind two 2026 papers (ICLR and ACL)."

Q: "Tell me about backend experience"
A: "Pranav spent 3 years on Java and Spring Boot booking services at Amadeus: he designed an event-driven itinerary sync service at 5 ms p99 on 100K+ request peak days and shipped the IndiGo integration with idempotent checkout, growing India market share 18%. He also led 5 engineers on tooling used by 12 teams. At Pretorin he built the FastAPI backend for an agentic RAG chatbot and debugged an 89% upload failure rate down to 0%."

Q: "What projects use React?"
A: "Pranav has built React front ends for HEAL AI (a team project: medical insurance assistant with RAG) and AdaptED AI (adaptive tutor with Gemini), plus React and Next.js product screens at Pretorin. Check them out on his portfolio!"
`;
