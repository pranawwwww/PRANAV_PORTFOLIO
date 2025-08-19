import siteData from '../../src/data/site.json';
import projectsData from '../../src/data/projects.json';
import experienceData from '../../src/data/experience.json';
import skillsData from '../../src/data/skills.json';
import faqData from '../../src/data/faq.json';
import funfacts from '../data/funfacts.json';

// Create simple skills list for AI context
const allSkills = Object.values(skillsData).flat();

export interface CondensedContext {
  about: string;
  topSkills: string;
  projectSummaries: string[];
  experience: string[];
  funFacts: string[];
}

export function condensedContext(): CondensedContext {
  // About (≤180 chars)
  const about = `${siteData.name} - ${siteData.tagline}. Located in ${siteData.location}.`;

  // Top skills (≤180 chars)
  const topSkills = allSkills.slice(0, 8).join(', ');

  // Project summaries (≤180 chars each)
  const projectSummaries = projectsData.map(project => 
    `${project.title} (${project.year}): ${project.summary.slice(0, 120)}... Tech: ${project.stack.slice(0, 3).join(', ')}`
  );

  // Experience summaries (≤180 chars each)
  const experience = experienceData.map(exp => 
    `${exp.role} at ${exp.company} (${exp.start}-${exp.end}): ${exp.bullets[0].slice(0, 100)}...`
  );

  return {
    about,
    topSkills,
    projectSummaries,
    experience,
    funFacts: funfacts
  };
}

export function getFullContext() {
  return {
    site: siteData,
    projects: projectsData,
    experience: experienceData,
    skills: skillsData,
    faq: faqData,
    funfacts: funfacts
  };
}
