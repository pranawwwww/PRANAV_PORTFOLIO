import { GroupedExperience } from '../types';

export const experienceData: GroupedExperience[] = [
  {
    company: 'Data Mining & Reinforcement Learning Lab, Arizona State University',
    location: 'Tempe, AZ',
    totalStart: 'Aug 2024',
    totalEnd: 'Dec 2025',
    roles: [
      {
        role: 'Graduate Research Assistant',
        start: 'Aug 2024',
        end: 'Dec 2025',
        bullets: [
          'Designed and engineered scalable Sim2Real reinforcement learning benchmarks using Python, PyTorch, Hydra, and Git, supporting reproducible experimentation across multiple simulated environments.',
          'Built distributed training and domain-adaptation workflows for foundation policies, improving cross-environment generalization and reducing training variance across simulation domains.',
          'Developed automated evaluation, logging, and experiment-tracking pipelines on ASU\'s HPC cluster, reducing experiment turnaround time from days to hours.',
          'Implemented large-scale Blender-based simulation pipelines for multi-GB dataset generation, optimizing data ingestion, preprocessing, and I/O throughput for downstream ML systems.'
        ],
      },
    ],
  },
  {
    company: 'Amadeus Labs',
    location: 'Bangalore, India',
    totalStart: 'Jan 2021',
    totalEnd: 'Dec 2023',
    roles: [
      {
        role: 'Software Engineer',
        start: 'May 2021',
        end: 'Dec 2023',
        bullets: [
          'Led CI/CD pipeline optimization using Docker, Kubernetes, and Jenkins, redesigning microservice build and deployment workflows and reducing end-to-end build times from 81 hours to 12 hours.',
          'Developed an NLP-driven root-cause analysis system using Python, SQL, and clustering techniques to analyze 15K+ monthly test failures, reducing manual debugging effort by over 60%.',
          'Improved production observability by building Splunk-based monitoring dashboards and alerting workflows, reducing mean time to resolution (MTTR) by approximately 40%.'
        ],
      },
      {
        role: 'Software Engineer Intern',
        start: 'Jan 2021',
        end: 'May 2021',
        bullets: [
          'Refactored legacy Java services into Spring Boot–based microservices, improving scalability, fault tolerance, and deployment reliability.',
          'Optimized backend parsers and scheduling services through regex automation and asynchronous processing, improving runtime performance by approximately 30%.',
          'Implemented database query tuning and caching strategies, improving peak-load response times by up to 45% across billing and transaction workflows.'
        ],
      },
    ],
  },
];
