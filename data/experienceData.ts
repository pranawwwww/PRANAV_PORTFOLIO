import { GroupedExperience } from '../types';

export const experienceData: GroupedExperience[] = [
  {
    company: 'Pretorin Inc. (AI Compliance Automation Platform)',
    location: 'Remote',
    totalStart: 'March 2026',
    totalEnd: 'Present',
    roles: [
      {
        role: 'Product Engineer Intern',
        start: 'Mar 2026',
        end: 'Present',
        bullets: [
          'Owned a Python data-freshness pipeline keeping 26 compliance frameworks (NIST, FedRAMP, SOC 2) synced to upstream sources for a custom GPT-5.5 based hybrid RAG architecture.',
          'Designed an LLM evaluation gate in CI: deterministic schema checks plus a calibrated LLM-as-judge benchmarked against a hand-labeled golden set, failing closed to block bad AI enrichments before release.',
          'Built a production attestation service that cryptographically signs AI- and human-produced compliance evidence, making every record independently verifiable and hash-bound to its source.',
          "Built the platform's first Kubernetes load/stress framework (Locust, Helm, 5 scenarios, 100 concurrent users) with Grafana dashboards and an OpenAI token-budget kill-switch, catching latency and AI-cost regressions before release."
        ],
      },
    ],
  },
  {
    company: 'Data Mining & Reinforcement Learning Lab, Arizona State University',
    location: 'Tempe, AZ',
    totalStart: 'May 2024',
    totalEnd: 'December 2025',
    roles: [
      {
        role: 'Graduate Research Assistant',
        start: 'May 2024',
        end: 'Dec 2025',
        bullets: [
          'Designed fault-tolerant batch execution pipelines in Python (checkpointing, retries, idempotency) that ran 2,000+ PyTorch experiments across a 10-GPU Slurm cluster with zero manual restarts.',
          'Cut experiment turnaround from 4-5 days to overnight by designing a batch execution pipeline on Slurm that automated result collection and inference.',
          'Built the Python data and integration layer for MLCL, a multilingual LLM tool-calling benchmark, turning manual prep and ad hoc runs into one-command batched evaluation with automated scoring.'
        ],
      },
    ],
  },
  {
    company: 'Amadeus Labs',
    location: 'Bangalore, India',
    totalStart: 'January 2021',
    totalEnd: 'December 2023',
    roles: [
      {
        role: 'Software Engineer',
        start: 'August 2021',
        end: 'December 2023',
        bullets: [
          'Redesigned a distributed E2E test execution pipeline on Kubernetes and Jenkins with parallel execution and focused jobs, cutting total runtime from 12 hours to 4 hours.',
          'Cut manual triage effort by 60% across 15K+ events/month by building an NLP-based error-log monitoring system in Python that tagged genuine failures and routed them to owning teams.',
          'Designed observability pipelines and Splunk dashboards to detect anomalies and surface production issues, alerting the relevant code owners before customer impact.',
          'Owned backend production services in Java and Python powering high-volume, customer-facing travel workflows with strict uptime, latency, and reliability requirements.'
        ],
      },
      {
        role: 'Software Engineer Intern',
        start: 'January 2021',
        end: 'May 2021',
        bullets: [
          'Modernized a legacy monolithic JSP application into a Spring Boot microservices platform, improving fault isolation, deployment safety, and scalability.',
          'Cut backend scheduler and parser runtime by 30% through async execution and targeted refactors in Java.',
          'Improved API response times by 45% under peak production load through SQL query tuning and caching.'
        ],
      },
    ],
  },
];
