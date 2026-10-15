import { Project } from '../types';

export const projectsData: Project[] = [
  {
    title: 'Mobile Assurance — Cross-Platform Appium Framework',
    year: 2025,
    stack: ['Java', 'Appium', 'TestNG', 'iOS', 'Android'],
    summary:
      'Object-oriented Appium framework that shares test behavior across iOS and Android through abstract base classes, inheritance and polymorphism. Runs 80+ automated tests, stabilized with encapsulated locators, platform overrides and CI-friendly waits.',
    links: {},
  },
  {
    title: 'Multilingual LLM Tool-Call Test Harness',
    year: 2026,
    stack: ['Python', 'vLLM', 'Pytest', 'LLM Evals', 'A100 GPUs'],
    summary:
      'The test harness behind an ACL 2026 paper: serves open models on vLLM, parses every tool call from 13 LLMs and scores it against ground truth across 4 languages. A concurrent scheduler across 8 model backends cut full runs from 12 hours to under 1 hour.',
    links: {
      arXiv: 'https://arxiv.org/abs/2601.05366',
    },
  },
  {
    title: 'Cloud Video & Image Analysis Platform',
    year: 2025,
    stack: ['Python', 'AWS (EC2, SQS, S3, Lambda)', 'Docker'],
    summary:
      'Runs face recognition on videos and images. Jobs queue in SQS for EC2 workers and Dockerized Lambda, with S3 storage and a custom auto-scaler that sizes EC2 by queue depth.',
    links: {},
  },
  {
    title: 'HEAL.AI — Medical Bill Analyzer & Insurance Q&A',
    year: 2025,
    stack: ['React', 'TypeScript', 'FastAPI', 'Gemini 2.5 Pro', 'RAG'],
    summary:
      'Built a healthcare expense analyzer that extracts coverage details from insurance documents, flags suspicious charges, and generates dispute-ready explanations via RAG-powered document Q&A.',
    links: {
      demo: 'https://heal-ai-production.up.railway.app/',
      repo: 'https://github.com/kspswati/heal-ai',
    },
  },
  {
    title: 'AdaptED AI — Personalized Digital Tutor',
    year: 2025,
    stack: ['React', 'TypeScript', 'Gemini API'],
    summary:
      "Built a generative-AI study assistant with adaptive UI and real-time, context-aware feedback; won 'Best Use of AI' at ASU DevHacks.",
    links: {
      demo: 'https://pranawwwww.github.io/adaptedge-assignment-helper/',
      repo: 'https://github.com/pranawwwww/adaptedge-assignment-helper',
    },
  },
  {
    title: 'EtherFi Buddy — AI-Powered DeFi Education & Analytics',
    year: 2025,
    stack: ['React', 'TypeScript', 'FastAPI', 'Claude AI'],
    summary:
      'Built a full-stack DeFi dashboard with an AI explainer layer, portfolio analytics, and strategy simulation using real-time market data aggregated from multiple APIs.',
    links: {
      demo: 'https://etherfi-buddy.vercel.app',
      repo: 'https://github.com/pranawwwww/etherfi-buddy',
    },
  },
  {
    title: 'Lost in Execution: On the Multilingual Robustness of Tool Calling in Large Language Models',
    year: 2026,
    stack: ['Python', 'LLM Evaluation', 'Test Harness', 'Multilingual LLMs', 'Tool Calling'],
    summary:
      'Published at ACL 2026 (2nd author). Built the test harness that validates every tool call from 13 LLMs against ground truth across 4 languages; found parameter-value language mismatch to be the dominant execution failure mode.',
    links: {
      arXiv: 'https://arxiv.org/abs/2601.05366',
    },
    isPublication: true,
  },
  {
    title: 'Latent Adaptation of Foundation Policies for Sim-to-Real Transfer',
    year: 2026,
    stack: ['Reinforcement Learning', 'Sim-to-Real Transfer', 'Foundation Policies', 'PyTorch'],
    summary:
      'Published at ICLR 2026. Adapts pretrained foundation policies to real-world dynamics at deployment via latent-space adaptation, without retraining. Ran the multi-GPU training, with 9 policies trained concurrently.',
    links: {
      arXiv: 'https://openreview.net/forum?id=yn9dzttHvT',
    },
    isPublication: true,
  },
  {
    title: 'A Survey of Sim-to-Real Methods in Reinforcement Learning',
    year: 2025,
    stack: ['Research', 'Reinforcement Learning', 'Sim2Real'],
    summary:
      'Surveyed 100+ sources and curated 48+ benchmarks; proposed a taxonomy mapping adaptation methods to MDP components to improve comparative evaluation.',
    links: {
      arXiv: 'https://arxiv.org/abs/2502.13187',
      repo: 'https://github.com/LongchaoDa/AwesomeSim2Real',
    },
    isPublication: true,
  },
  {
    title: 'ShadeBench — Benchmark Dataset for Urban Shade Simulation',
    year: 2026,
    stack: ['Blender', '3D Simulation', 'Computer Vision', 'Dataset'],
    summary:
      'Built a benchmark dataset using Blender-based 3D simulations and satellite imagery to support shade estimation under varying time-of-day and solar geometry.',
    links: {
      arXiv: 'https://openreview.net/forum?id=brBCPRgCz3',
    },
    isPublication: true,
  },
  {
    title: 'DeepShade — Generative Shade Prediction from Satellite Imagery',
    year: 2025,
    stack: ['Diffusion Models', 'Computer Vision', 'Text Conditioning'],
    summary:
      'Helped develop a diffusion-based model conditioned on time/solar angles to generate realistic shade maps from satellite imagery, bridging noisy real data with high-quality simulated supervision.',
    links: {
      arXiv: 'https://arxiv.org/abs/2507.12103',
    },
    isPublication: true,
  },
];
