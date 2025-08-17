import { Project } from '../types';

export const projectsData: Project[] = [
  {
    title: 'Project Alpha',
    year: 2023,
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    summary: 'A full-stack web application for collaborative project management with real-time updates.',
    links: {
      demo: '#',
      repo: '#',
    },
  },
  {
    title: 'DataViz Dashboard',
    year: 2022,
    stack: ['D3.js', 'SvelteKit', 'Tailwind CSS'],
    summary: 'An interactive data visualization dashboard for analyzing complex datasets with custom charts.',
    links: {
      repo: '#',
    },
  },
  {
    title: 'Static Site Generator',
    year: 2021,
    stack: ['Go', 'Markdown'],
    summary: 'A lightweight and performant static site generator built from scratch in Go.',
    links: {
      repo: '#',
    },
  },
];
