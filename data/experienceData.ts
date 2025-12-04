import { ExperienceItem } from '../types';

export const experienceData: ExperienceItem[] = [
  {
    company: 'Data Mining & Reinforcement Learning Lab, Arizona State University',
    role: 'Graduate Research Assistant',
    start: 'Aug 2024',
    end: 'Dec 2025',
    bullets: [
      'Engineered scalable Sim2Real RL benchmarks using Python, PyTorch, Hydra, and Git; optimized multi-process data ingestion, feature extraction, and evaluation pipelines on ASU HPC cluster.',
      'Built and tuned distributed training and domain-adaptation workflows for foundation policies, improving cross-environment generalization and reducing training variance.',
      'Automated model evaluation, logging, and monitoring pipelines, reducing experiment turnaround from days to hours with robust offline + streaming experiment tracking.',
      'Developed large-scale Blender-based simulation pipelines for multi-GB dataset generation, optimizing media I/O, batching, and preprocessing for downstream ML systems.'
    ],
  },
  {
    company: 'Amadeus Labs',
    role: 'Software Engineer',
    start: 'May 2021',
    end: 'Dec 2023',
    bullets: [
      'Spearheaded CI/CD optimization using Docker, Kubernetes, and Jenkins; designed high-throughput microservice pipelines cutting build time from 81→12 hours.',
      'Developed an NLP-powered root-cause analysis system using Python, SQL, and clustering for 15K+ monthly test failures; improved model accuracy and reduced manual debugging by 60%.',
      'Improved production observability using Splunk and real-time monitoring dashboards; reduced MTTR by 40% with automated anomaly detection and alerting workflows.'
    ],
  },
  {
    company: 'Amadeus Labs',
    role: 'Software Engineer Intern',
    start: 'Jan 2021',
    end: 'May 2021',
    bullets: [
      'Modernized legacy Java services into Spring Boot microservices, improving scalability, resilience, and deployment safety with containerized rollouts.',
      'Accelerated backend parsers and schedulers through regex automation and async processing, improving runtime by 30%.',
      'Implemented query tuning and caching optimizations, improving peak-load response times by 45% across billing workflows.'
    ],
  },
];
