import { ExperienceItem } from '../types';

export const experienceData: ExperienceItem[] = [
  {
    company: 'Data Mining & Reinforcement Learning Lab, Arizona State University',
    role: 'Graduate Research Assistant',
    start: 'Aug 2024',
    end: 'Dec 2025',
    bullets: [
      'Built scalable Sim2Real RL benchmarks in Python/PyTorch and automated ASU HPC pipelines—improving reproducibility, cutting setup ~50%, and turning multi-day evaluations into hours while leading domain-adaptation studies on foundation policies.'
    ],
  },
  {
    company: 'Amadeus Labs',
    role: 'Software Engineer',
    start: 'Jun 2021',
    end: 'Dec 2023',
    bullets: [
      'Accelerated CI/CD from 72→12 hours with Docker, Kubernetes, and Jenkins; migrated legacy Java to Spring Boot microservices (fewer rollbacks, ~40% more scalable), and built an NLP root-cause analyzer for 15K+ monthly test failures while automating schedulers/parsers (~30% faster).'
    ],
  },
  {
    company: 'Amadeus Labs',
    role: 'Software Engineer Intern',
    start: 'Jan 2021',
    end: 'Jun 2021',
    bullets: [
      'Prototyped CI/CD optimizations and microservice patterns that later powered production rollout—containerized services, introduced Jenkins/GitHub Actions caching, and scripted parsers to reduce operational toil and improve build stability.'
    ],
  },
];
