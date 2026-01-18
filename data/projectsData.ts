import { Project } from '../types';

export const projectsData: Project[] = [
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
    year: 2025,
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
  {
  title: 'Lost in Execution: On the Multilingual Robustness of Tool Calling in Large Language Models',
  year: 2026,
  stack: ['Python', 'Rust', 'Evaluation', 'BFCL', 'Multilingual LLMs', 'Tool Calling'],
  summary:
    'Contributed to building a Rust-based test environment and batch-job runner to evaluate multilingual tool-calling performance across models on the BFCL dataset; supported result aggregation and analysis.',
  links: {
    arXiv: 'https://arxiv.org/abs/2601.05366',
  },
  isPublication: true,
},

];
