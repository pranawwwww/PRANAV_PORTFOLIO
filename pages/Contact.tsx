
import React from 'react';
import PageLayout from '../components/PageLayout';
import { siteData } from '../data/siteData.ts';

const contactLinks = [
  { name: 'Email', href: siteData.links.email, label: siteData.links.emailDisplay },
  { name: 'GitHub', href: siteData.links.github, label: siteData.links.githubDisplay },
  { name: 'LinkedIn', href: siteData.links.linkedin, label: siteData.links.linkedinDisplay },
];

const Contact: React.FC = () => {
  return (
    <PageLayout title="Contact">
      <section>
        <p className="mb-8 text-neutral-300">
          Feel free to reach out. I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision.
        </p>
        <div className="space-y-4">
          {contactLinks.map((link) => (
            <div key={link.name} className="flex flex-col sm:flex-row sm:items-center">
              <span className="w-24 font-bold text-neutral-100">{link.name}:</span>
              <a 
                href={link.href} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white hover:underline underline-offset-4 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#111111]"
              >
                {link.label}
              </a>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
