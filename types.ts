// from src/data/site.json
export interface SiteData {
  name: string;
  tagline: string;
  location: string;
  links: {
    email: string;
    emailDisplay: string;
    github: string;
    githubDisplay: string;
    linkedin: string;
    linkedinDisplay: string;
    googleScholar?: string;
    googleScholarDisplay?: string;
    resume: string;
  };
}

// from src/data/projects.json
export interface Project {
  title: string;
  year: number;
  stack: string[];
  summary: string;
  links: {
    demo?: string;
    repo?: string;
    arXiv?: string;
  };
}

// from src/data/experience.json
export interface ExperienceItem {
  company: string;
  role: string;
  start: string;
  end: string;
  // optional location for nicer formatting
  location?: string;
  bullets: string[];
}

// from src/data/skills.json
export interface SkillsData {
  [key: string]: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

// from src/data/faq.json
export interface FAQItem {
  q: string;
  a: string;
}

// For chat
export type MessageAuthor = 'user' | 'bot';

export interface Message {
  id: string;
  author: MessageAuthor;
  text: string;
}
