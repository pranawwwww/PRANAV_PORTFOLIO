import { SiteData } from '../types';

// Get resume URL from environment variable with hardcoded fallback
const getResumeUrl = (): string => {
  return (
    import.meta.env.VITE_RESUME_URL ||
    `${import.meta.env.BASE_URL}Pranav_Kutralingam_Resume_SDET.pdf`
  );
};

export const siteData: SiteData = {
  name: "",
  tagline: "SDET who speaks AI | Selenium, Appium & Postman by day, LLM evals that gate releases by night | Bugs fear me.",
  location: "Fremont, CA",
  links: {
    email: "mailto:tpranavkutralingam@gmail.com",
    emailDisplay: "tpranavkutralingam@gmail.com",
    github: "https://github.com/pranawwwww",
    githubDisplay: "github.com/pranawwwww",
    linkedin: "https://linkedin.com/in/pranavkutralingam",
    linkedinDisplay: "linkedin.com/in/pranavkutralingam",
    googleScholar: "https://scholar.google.com/citations?user=7wl6PBUAAAAJ",
    googleScholarDisplay: "Google Scholar",
    resume: getResumeUrl()
  }
};
