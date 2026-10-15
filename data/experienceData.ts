import { GroupedExperience } from '../types';

export const experienceData: GroupedExperience[] = [
  {
    company: 'DaRL Lab, Arizona State University',
    location: 'Tempe, AZ',
    totalStart: 'May 2024',
    totalEnd: 'Present',
    roles: [
      {
        role: 'AI Researcher',
        start: 'Sep 2026',
        end: 'Present',
        bullets: [
          "Research position in Prof. Hua Wei's DaRL Lab, continuing LLM research on how reliably models call tools.",
        ],
      },
      {
        role: 'Graduate Research Assistant (AI & ML)',
        start: 'May 2024',
        end: 'Dec 2025',
        bullets: [
          'Built the Python test harness for an ACL 2026 paper that validates every tool call from 13 LLMs against ground truth across 4 languages, serving open models on vLLM, parsing each tool call and scoring it automatically.',
          'Automated LLM evaluation pipelines with a concurrent Python scheduler across 8 model backends, including vLLM on A100 GPUs, cutting full runs from 12 hours to under 1 hour.',
          'Made 2,000-job sweeps on a 10-GPU Slurm cluster fault-tolerant with checkpointing and retries, so experiments that took 4–5 days finished overnight.',
          'Ran multi-GPU RL training for an ICLR 2026 paper on adapting pretrained policies for sim-to-real transfer, with 9 policies trained concurrently.',
        ],
      },
    ],
  },
  {
    company: 'Pretorin (AI Compliance Platform)',
    location: 'Tempe, AZ',
    totalStart: 'March 2026',
    totalEnd: 'September 2026',
    roles: [
      {
        role: 'Product Engineer Intern',
        start: 'Mar 2026',
        end: 'Sep 2026',
        bullets: [
          "Designed and implemented Selenium UI automation in Python for the compliance platform's React and TypeScript web app, covering 20 end-to-end flows.",
          'Developed REST API tests in Postman for the FastAPI backend, validating authentication, payloads, schemas, negative cases and data consistency in PostgreSQL.',
          'Ran a self-built Locust load test that exposed an 89% upload failure rate at 10 concurrent users before customers hit it; fixed the root cause and added a CI lint check that blocks that class of bug.',
          "Built an LLM-judged accuracy regression suite in CI that reruns after every RAG change, and used it to raise the production chatbot's retrieval precision from 71% to 93%.",
          'Built a nightly network-cut CI gate that fails any release pulling an external image, protecting air-gapped production installs on Kubernetes.',
          'Defined acceptance criteria and test strategy with the founders, and built reusable utilities that check LLM-authored documents in the data validation pipeline.',
        ],
      },
    ],
  },
  {
    company: 'Amadeus',
    location: 'Bengaluru, India',
    totalStart: 'January 2021',
    totalEnd: 'December 2023',
    roles: [
      {
        role: 'Software Development Engineer in Test (SDET)',
        start: 'Jul 2021',
        end: 'Dec 2023',
        bullets: [
          'Designed test strategies and automated end-to-end, regression and smoke suites in Selenium WebDriver and Java, run on Chrome, Firefox and Edge, including IVR calls that test a voice agent.',
          'Tested REST APIs in Postman and validated backend data changes in MySQL with SQL, then logged, tracked and retested defects in Jira with test cases in Zephyr.',
          'Integrated automated test runs into Jenkins with automatic retries and parallel runs across 4 Kubernetes clusters, cutting release-blocking failure review from 6 hours to 1 hour.',
          'Replaced manual triage of 15K+ monthly test failures with an ML classifier (TF-IDF and random forest) that sorts root causes into 4 categories at 97% precision, so releases moved from every 2–3 days to daily.',
          'Built a monitoring dashboard for 5 client-facing apps across all environments, with Splunk alerts that route production failures to the owning team.',
          'Worked in Agile sprints (stand-ups, sprint planning, backlog grooming) giving test estimates each sprint, and led 5 engineers on internal tooling used by 12 teams.',
        ],
      },
      {
        role: 'Software Engineer Intern',
        start: 'Jan 2021',
        end: 'Jun 2021',
        bullets: [
          'Cut a legacy parsing services codebase by 65% by rebuilding it around a regex-based parser in Spring Boot.',
          'Reduced database storage by 25% by normalizing the MySQL schema and consolidating duplicate vendor reference data.',
        ],
      },
    ],
  },
];
