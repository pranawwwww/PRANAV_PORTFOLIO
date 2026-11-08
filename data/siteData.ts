import { SiteData } from '../types';

// Current resume (Google Drive, public view link). Update here when the resume changes.
const RESUME_URL = 'https://drive.google.com/file/d/1jHTTvQRcG_M7tD3QuY1stw8LET37JvGQ/view?usp=sharing';

export const siteData: SiteData = {
  name: 'Pranav Kutralingam',
  tagline: 'Software Engineer, AI. Builds and ships LLM agents and cloud services in Java & Python.',
  location: 'San Francisco Bay Area',
  links: {
    email: 'mailto:tpranavkutralingam@gmail.com',
    emailDisplay: 'tpranavkutralingam@gmail.com',
    github: 'https://github.com/pranawwwww',
    githubDisplay: 'github.com/pranawwwww',
    linkedin: 'https://linkedin.com/in/pranavkutralingam',
    linkedinDisplay: 'linkedin.com/in/pranavkutralingam',
    googleScholar: 'https://scholar.google.com/citations?user=7wl6PBUAAAAJ',
    googleScholarDisplay: 'Google Scholar',
    resume: RESUME_URL,
  },
};
