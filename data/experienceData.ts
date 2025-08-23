import { ExperienceItem } from '../types';

export const experienceData: ExperienceItem[] = [
  {
    company: 'Data Mining & Reinforcement Learning Lab, Arizona State University',
    role: 'Graduate Research Assistant',
    start: 'Aug 2024',
    end: 'Dec 2025',
    bullets: [
      'Engineered scalable Sim2Real RL benchmarks with Python/PyTorch, improving reproducibility and cutting setup time by ~50% on ASU’s supercomputer.',
      'Led prompt-tuned domain adaptation experiments on foundation policies, validating real-world transfer across multiple RL environments.',
      'Automated benchmark execution pipelines, boosting throughput by ~70% and reducing evaluation cycles from days to hours.',
    ],
  },
  {
    company: 'Amadeus Labs',
    role: 'Software Engineer (including Internship)',
    start: 'Jan 2021',
    end: 'Dec 2023',
    bullets: [
      'Optimized CI/CD test execution with Docker, Kubernetes, and Jenkins—reducing build time from 72 to 12 hours via pipeline parallelization and script restructuring.',
      'Migrated and secured a legacy Java backend to Spring Boot microservices, increasing deployment scalability and cutting rollback incidents by ~40%.',
      'Built an NLP-powered root-cause analysis system (Python/SQL) to auto-classify 15K+ monthly test failures.',
      'Streamlined job scheduling and backend parsers with regex-based automation, improving runtime by ~30% and reducing operational overhead.',
    ],
  },
];
