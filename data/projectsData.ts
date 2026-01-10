import { Project } from '../types';

export const projectsData: Project[] = [
  {
    title: 'AdaptED AI — Personalized Digital Tutor',
    year: 2025,
    stack: ['React', 'TypeScript', 'Gemini API'],
    summary:
      "Generative AI study assistant with an adaptive UI and real-time, context-aware feedback; won 'Best Use of AI' at ASU DevHacks with ~40% higher live-demo engagement.",
    links: {
      demo: 'https://pranawwwww.github.io/adaptedge-assignment-helper/',
      repo: 'https://github.com/pranawwwww/adaptedge-assignment-helper',
    },
  },
  // {
  //   title: 'Tokenized Simulator',
  //   year: 2025,
  //   stack: ['Python', 'LLM Integrations', 'GPU/CPU Simulation', 'GitHub Actions', 'Render'],
  //   summary:
  //     'Full-stack Python execution platform with LLM-assisted tutoring and real-time GPU/CPU simulation; integrated with ASU\'s SOL supercomputer and automated deployments.',
  //   links: {
  //     demo: 'https://pranawwwww.github.io/tutokenized-simulator/',
  //     repo: 'https://github.com/pranawwwww/tutokenized-simulator',
  //   },
  // },
  {
    title: 'EtherFi Buddy — AI-Powered DeFi Education & Analytics',
    year: 2025,
    stack: ['React', 'TypeScript', 'FastAPI', 'Claude AI', 'DefiLlama API'],
    summary:
      'Full-stack DeFi platform with universal AI explainer layer that demystifies complex concepts; multi-asset portfolio analytics with correlation heatmaps; yield strategy simulator; real-time market data from 5+ APIs (Beaconcha.in, Uniswap, EigenExplorer) integrated with Claude forecasting.',
    links: {
      demo: 'https://etherfi-buddy.vercel.app',
      repo: 'https://github.com/pranawwwww/etherfi-buddy',
    },
  },
  {
    title: 'HEAL.AI — Healthcare Expense Analyzer & Bill Simplifier',
    year: 2025,
    stack: ['React', 'TypeScript', 'FastAPI', 'Gemini 2.5 Pro', 'RAG'],
    summary:
      'AI-powered healthcare platform addressing 80% error rate in medical bills; analyzes insurance policies and medical bills to extract coverage details, flag billing errors, detect duplicate charges, and generate dispute recommendations; RAG-powered chatbot for contextual insurance Q&A; includes admin dashboard with database management and demo reset tools.',
    links: {
      demo: 'https://heal-ai-production.up.railway.app/',
      repo: 'https://github.com/kspswati/heal-ai',
    },
  },
  {
    title: 'A Survey of Sim-to-Real Methods in Reinforcement Learning',
    year: 2025,
    stack: ['Research', 'RL', 'Sim2Real', 'Taxonomy'],
    summary:
      'Reviewed 100+ sources and curated 48+ RL benchmarks; defined a taxonomy mapping adaptation methods to MDP components (state, action, transition, reward) to improve comparative evaluation.',
    links: {
      arXiv: 'https://arxiv.org/abs/2502.13187',
      repo: 'https://github.com/LongchaoDa/AwesomeSim2Real',
    },
  },
  {
    title: 'ShadeBench — Benchmark Dataset & Shade Simulation for Urban Planning',
    year: 2025,
    stack: ['Computer Vision', 'Diffusion Models', '3D Simulation', 'Contrastive Learning'],
    summary:
      'Addresses heatwave threat to public health through shade simulation; built extensive dataset using Blender-based 3D simulations and satellite imagery; developed DeepShade diffusion model with Canny edge enhancement and contrastive learning to synthesize shade variations conditioned on time-of-day and solar angles; demonstrated real-world application for route planning in Tempe, Arizona.',
    links: {
      arXiv: 'https://openreview.net/forum?id=brBCPRgCz3',
    },
  },
  {
    title: 'DeepShade — Text-Conditioned Shade Simulation via Generative Models',
    year: 2025,
    stack: ['Computer Vision', 'Diffusion Models', 'Text Conditioning', 'Environmental AI'],
    summary:
      'Enables urban shade estimation from satellite imagery using diffusion-based generative models; captures building shadows under varying solar zenith angles throughout the year via Blender simulations; uses text-conditioned prompts (time, solar angles) to generate realistic shade predictions; bridges gap between noisy satellite data and high-quality training data for sustainable city planning and heatwave mitigation.',
    links: {
      arXiv: 'https://arxiv.org/abs/2507.12103',
    },
  },
];