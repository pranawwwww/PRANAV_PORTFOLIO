import { Project } from '../types';

// Order matters: this is the order shown on the site.
export const projectsData: Project[] = [
  {
    title: 'Computer-Use Automation Agent',
    year: 2026,
    stack: ['Python', 'LLM agents', 'Pydantic', 'Playwright'],
    summary:
      'An LLM learns a task in a legacy web app (ParaBank) once, saves it as a typed, versioned skill, then replays it deterministically without the LLM. Self-repairs when the page drifts, with safety gates and 188 offline tests.',
    links: {
      repo: 'https://github.com/pranawwwww/cua-computer-use-automation',
    },
  },
  {
    title: 'HEAL AI: Medical Insurance Assistant',
    year: 2025,
    stack: ['Python', 'FastAPI', 'React', 'TypeScript', 'Gemini', 'RAG'],
    summary:
      "Answers questions on uploaded medical bills and insurance policies and flags coverage gaps and overcharges. A React client calls a FastAPI RAG backend that grounds Gemini in the user's files.",
    note: 'Team project',
    links: {
      demo: 'https://heal-ai-production.up.railway.app/',
      repo: 'https://github.com/kspswati/heal-ai',
    },
  },
  {
    title: 'AdaptED AI: Personalized Digital Tutor',
    year: 2025,
    stack: ['React', 'TypeScript', 'Gemini API'],
    summary:
      "A generative-AI study assistant with an adaptive UI and real-time, context-aware feedback. Won 'Best Use of AI' at ASU DevHacks 2025.",
    links: {
      demo: 'https://pranawwwww.github.io/adaptedge-assignment-helper/',
      repo: 'https://github.com/pranawwwww/adaptedge-assignment-helper',
    },
  },
  {
    title: 'Scalable Cloud-Based Video & Image Analysis Platform',
    year: 2025,
    stack: ['Python', 'AWS (EC2, SQS, S3, Lambda)', 'Docker'],
    summary:
      'Runs face recognition on videos and images. Jobs queue in SQS for EC2 workers and Dockerized Lambda, with S3 storage and a custom auto-scaler that sizes EC2 by queue depth.',
    links: {},
  },

  // Publications (ACL first: closest to software/AI engineering work)
  {
    title: 'Lost in Execution: On the Multilingual Robustness of Tool Calling in Large Language Models',
    year: 2026,
    venue: 'ACL 2026',
    authorship: '2nd of 6 authors',
    stack: ['Python', 'vLLM', 'LLM Evaluation', 'Tool Calling'],
    summary:
      'Benchmarks how accurately 13 LLMs call tools across 4 languages. I built the Python harness that serves open models on vLLM, parses each tool call and scores it against ground truth.',
    links: {
      arXiv: 'https://arxiv.org/abs/2601.05366',
    },
    isPublication: true,
  },
  {
    title: 'Latent Adaptation of Foundation Policies for Sim-to-Real Transfer',
    year: 2026,
    venue: 'ICLR 2026',
    stack: ['Reinforcement Learning', 'PyTorch', 'Sim-to-Real'],
    summary:
      'Adapts pretrained RL policies for sim-to-real transfer. I ran the multi-GPU training: 9 policies concurrently with checkpointing and auto-resume.',
    links: {
      arXiv: 'https://openreview.net/forum?id=yn9dzttHvT',
    },
    isPublication: true,
  },
  {
    title: 'A Survey of Sim-to-Real Methods in Reinforcement Learning',
    year: 2025,
    venue: 'arXiv, 2025',
    stack: ['Reinforcement Learning', 'Sim-to-Real', 'Survey'],
    summary:
      'Surveys sim-to-real methods in RL and maps adaptation methods to MDP components, with a curated list of benchmarks.',
    links: {
      arXiv: 'https://arxiv.org/abs/2502.13187',
      repo: 'https://github.com/LongchaoDa/AwesomeSim2Real',
    },
    isPublication: true,
  },
  {
    title: 'ShadeBench: Benchmark Dataset for Urban Shade Simulation',
    year: 2025,
    venue: 'NeurIPS 2025 Workshop (UrbanAI)',
    authorship: '4th of 6 authors',
    stack: ['Blender', '3D Simulation', 'Computer Vision', 'Dataset'],
    summary:
      'A benchmark dataset built from Blender 3D simulations and satellite imagery for shade estimation across time of day and sun position.',
    links: {
      arXiv: 'https://openreview.net/forum?id=brBCPRgCz3',
    },
    isPublication: true,
  },
  {
    title: 'DeepShade: Generative Shade Prediction from Satellite Imagery',
    year: 2025,
    venue: 'arXiv preprint, 2025',
    authorship: '4th of 6 authors',
    stack: ['Diffusion Models', 'Computer Vision'],
    summary:
      'A diffusion model conditioned on time and sun angle that generates shade maps from satellite imagery.',
    links: {
      arXiv: 'https://arxiv.org/abs/2507.12103',
    },
    isPublication: true,
  },
];
