import { GroupedExperience } from '../types';

// Reverse chronological. Each entry is one card on the site.
export const experienceData: GroupedExperience[] = [
  {
    company: 'DaRL Lab, Arizona State University',
    location: 'Tempe, AZ',
    totalStart: 'September 2026',
    totalEnd: 'Present',
    roles: [
      {
        role: 'AI Researcher',
        start: 'Sep 2026',
        end: 'Present',
        bullets: [
          "Research position in Prof. Hua Wei's DaRL Lab, continuing LLM research.",
        ],
      },
    ],
  },
  {
    company: 'Pretorin (Seed-stage AI Compliance Startup)',
    location: 'Tempe, AZ',
    totalStart: 'March 2026',
    totalEnd: 'September 2026',
    roles: [
      {
        role: 'Software Engineer (Product)',
        start: 'Mar 2026',
        end: 'Sep 2026',
        bullets: [
          'Designed, built and deployed a production agentic RAG chatbot from zero to one for government compliance teams, serving 1,000+ documents per customer with chained tool calls, and raised retrieval precision from 71% to 93% with hybrid search and reranking.',
          'Built responsible-AI guardrails as code: an allowlisted writer that stops the LLM from ever writing compliance control text, checked against a 40-pair hand-labeled golden set, plus an LLM-judged eval suite in CI/CD (85% agreement with human labels) that blocked accuracy regressions.',
          'Debugged an 89% upload failure rate at 10 concurrent users with a Locust load test I wrote, traced it to blocking storage calls on the async path, cut failures to 0%, and added a CI lint rule that blocked the bug class.',
          'Built ingestion for PDFs, images and text on a Postgres work queue, handling up to 28 upstream document updates a day. GPT-4o vision turns image evidence into validated JSON with a confidence score.',
          'Built an OAuth 2.0 gateway that turns Google identities and LDAP attributes into JWTs, with MFA step-up and secrets in Azure Key Vault.',
          'Built a nightly network-cut CI gate that fails any release pulling an external image, protecting air-gapped production installs on Kubernetes.',
          'Built React and Next.js product screens, including a compliance dashboard and voice input for the chatbot.',
        ],
      },
    ],
  },
  {
    company: 'DaRL Lab, Arizona State University',
    location: 'Tempe, AZ',
    totalStart: 'May 2024',
    totalEnd: 'December 2025',
    roles: [
      {
        role: 'Graduate Research Assistant (AI & ML)',
        start: 'May 2024',
        end: 'Dec 2025',
        bullets: [
          'Cut LLM evaluation sweeps from 12 hours to under 1 hour with a concurrent Python scheduler across 8 model backends, including vLLM inference on A100 GPUs, for the ACL 2026 benchmark of tool calling in 13 LLMs across 4 languages.',
          'Made 2,000-job distributed sweeps on a 10-GPU Slurm cluster fault-tolerant with checkpointing and retries, turning 4-5 day experiments into overnight runs.',
          'Trained 9 RL policies concurrently in PyTorch across multiple GPUs for an ICLR 2026 paper on sim-to-real transfer.',
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
        role: 'Software Engineer',
        start: 'Jul 2021',
        end: 'Dec 2023',
        bullets: [
          'Built Java and Spring Boot services for airline and travel-agency booking, including an event-driven itinerary service at 5 ms p99 on peak days of 100K+ requests.',
          'Built a gradient-boosting ML pipeline that screens third-party Agency Debit Memo claims and flags likely false ones for dispute, saving $500K a year.',
          'Replaced manual root-cause triage of 15K+ monthly test failures with a scikit-learn classifier at 97% precision, taking CI/CD releases from every 2-3 days to daily.',
          "Shipped the IndiGo integration into Amadeus's travel-agent booking platform with Spring Boot REST and payment APIs and idempotent checkout, growing the platform's India market share 18%.",
          'Led 5 engineers on internal tooling used by 12 teams (planning, code reviews, mentoring).',
        ],
      },
      {
        role: 'Software Engineer Intern',
        start: 'Jan 2021',
        end: 'Jun 2021',
        bullets: [
          "Cut a legacy parsing service's codebase by 65% by rebuilding it around a regex-based parser in Spring Boot.",
          'Reduced database storage by 25% by normalizing the MySQL schema and consolidating duplicate vendor reference data.',
        ],
      },
    ],
  },
];
