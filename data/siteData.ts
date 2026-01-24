import { SiteData } from '../types';

// Get resume URL from environment variable with hardcoded fallback
const getResumeUrl = (): string => {
  return (
    import.meta.env.VITE_RESUME_URL ||
    "https://drive.google.com/file/d/1ROBttOv_1Rk-Lkdu4OaLVuWTn7O2mfJh/view?usp=sharing"
  );
};

export const siteData: SiteData = {
  name: "",
  tagline: "Grad CS @ ASU | SWE who speaks ML | My models lift & backends don't skip leg day | Now accepting quests.",
  location: "Tempe, AZ",
  links: {
    email: "mailto:thirupranav99@gmail.com",
    emailDisplay: "thirupranav99@gmail.com",
    github: "https://github.com/pranawwwww",
    githubDisplay: "github.com/pranawwwww",
    linkedin: "https://linkedin.com/in/pranavkutralingam",
    linkedinDisplay: "linkedin.com/in/pranavkutralingam",
    googleScholar: "https://scholar.google.com/citations?user=7wl6PBUAAAAJ",
    googleScholarDisplay: "Google Scholar",
    resume: getResumeUrl()
  }
};
