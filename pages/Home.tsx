import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { siteData } from '../data/siteData.ts';
import { projectsData } from '../data/projectsData.ts';
import { experienceData } from '../data/experienceData.ts';
import { skillsData } from '../data/skillsData.ts';
import { Project } from '../types';
import ChatBubble from '../components/ChatBubble';
import profileImage from '../data/pranav_photos/pranav_pfp.jpeg';

/* ---------- small shared pieces ---------- */

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl sm:text-4xl mb-8 heading-blue gradient-blue">{children}</h2>
);

const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    className="px-2.5 py-1 text-xs sm:text-sm rounded-md"
    style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text)' }}
  >
    {children}
  </span>
);

const LinkButton: React.FC<{ href: string; primary?: boolean; children: React.ReactNode }> = ({
  href,
  primary,
  children,
}) => {
  const external = !href.startsWith('mailto:');
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
      style={
        primary
          ? { background: 'var(--accent)', color: 'var(--bg)', border: '1px solid var(--accent)' }
          : { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' }
      }
    >
      {children}
    </a>
  );
};

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-5 rounded-lg" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
    {children}
  </div>
);

/* ---------- sections ---------- */

const ExperienceList: React.FC = () => (
  <div className="space-y-6">
    {experienceData.map((company, i) => (
      <Card key={`${company.company}-${i}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-lg sm:text-xl font-bold" style={{ color: 'var(--text)' }}>
            {company.company}
          </h3>
          <span className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
            {company.location}
          </span>
        </div>
        {company.roles.map((role) => (
          <div key={role.role} className="mt-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="font-semibold" style={{ color: 'var(--text)' }}>{role.role}</p>
              <span className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
                {role.start} – {role.end}
              </span>
            </div>
            <ul className="mt-2 space-y-1.5 list-disc pl-5">
              {role.bullets.map((b) => (
                <li key={b} className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Card>
    ))}
  </div>
);

const ProjectItem: React.FC<{ project: Project }> = ({ project }) => (
  <Card>
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
      <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>{project.title}</h3>
      <span className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
        {project.note ? `${project.note} · ` : ''}
        {project.year}
      </span>
    </div>
    <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text)' }}>{project.summary}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {project.stack.map((t) => <Chip key={t}>{t}</Chip>)}
    </div>
    <div className="flex flex-wrap gap-2">
      {project.links.demo && <LinkButton href={project.links.demo}>Live demo ↗</LinkButton>}
      {project.links.repo && <LinkButton href={project.links.repo}>GitHub ↗</LinkButton>}
    </div>
  </Card>
);

const PublicationItem: React.FC<{ pub: Project }> = ({ pub }) => (
  <Card>
    <p className="text-xs sm:text-sm font-semibold mb-1" style={{ color: 'var(--accent)' }}>
      {pub.venue}
      {pub.authorship ? ` · ${pub.authorship}` : ''}
    </p>
    <h3 className="text-base sm:text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>{pub.title}</h3>
    <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text)' }}>{pub.summary}</p>
    <div className="flex flex-wrap gap-2">
      {pub.links.arXiv && <LinkButton href={pub.links.arXiv}>Paper ↗</LinkButton>}
      {pub.links.repo && <LinkButton href={pub.links.repo}>GitHub ↗</LinkButton>}
    </div>
  </Card>
);

const taglines = [
  'Production-grade systems built',
  'Building LLM agents and cloud services in Java & Python',
  'RAG precision 71% → 93% in production',
  'Published at ICLR 2026 & ACL 2026',
  'Deploying LLM and ML Systems in Production',
  'Multiple Hackathon Winner with Shipped Projects',
  'Shipping Reliable Backend Systems',
  'Gym Rat with Engineering Discipline',
];

const RotatingTagline: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i: number) => (i + 1) % taglines.length);
        setFading(false);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-base sm:text-lg font-medium mb-6 min-h-[3.5rem] sm:min-h-[1.75rem] overflow-hidden" style={{ color: 'var(--accent)' }} aria-live="off">
      <span
        className="inline-block transition-all duration-300"
        style={{ opacity: fading ? 0 : 1, transform: fading ? 'translateY(-12px)' : 'translateY(0)' }}
      >
        {taglines[index]}
      </span>
    </p>
  );
};

/* ---------- page ---------- */

const Home: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'missingKeys'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
      setSubmitStatus('missingKeys');
      setIsSubmitting(false);
      return;
    }

    try {
      emailjs.init(PUBLIC_KEY);
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'tpranavkutralingam@gmail.com',
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const projects = projectsData.filter((p) => !p.isPublication);
  const publications = projectsData.filter((p) => p.isPublication);
  const inputStyle = { background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' };

  return (
    <div>
      {/* Hero */}
      <section id="about" className="snap-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full py-8 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <h1 className="font-bold text-4xl sm:text-5xl mb-2 heading-blue gradient-blue" style={{ letterSpacing: '0.02em' }}>
                Pranav Kutralingam
              </h1>
              <p className="text-xl sm:text-2xl font-semibold mb-1" style={{ color: 'var(--text)' }}>
                Software Engineer, AI
              </p>
              <RotatingTagline />

              <div className="space-y-3 text-base leading-relaxed max-w-2xl" style={{ color: 'var(--text)' }}>
                <p>Most of my code has run in production. Some of it also made it into ACL and ICLR.</p>
                <p>I build services and the AI that runs on them, in Java and Python.</p>
                <p>At Pretorin, I took an LLM agent from zero to one and raised its retrieval precision from 71% to 93%.</p>
                <p>Before that: 3 years at Amadeus on Java and Spring Boot, from intern to leading a team of 5.</p>
                <p>M.S. in CS, ASU (3.97 GPA). Now an AI Researcher at ASU's DaRL Lab.</p>
                <p className="font-semibold">
                  Based in the SF Bay Area. Open to relocating anywhere in the US. No sponsorship needed.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                <LinkButton href={siteData.links.resume} primary>Resume ↗</LinkButton>
                <LinkButton href={siteData.links.email}>Email</LinkButton>
                <LinkButton href={siteData.links.linkedin}>LinkedIn ↗</LinkButton>
                <LinkButton href={siteData.links.github}>GitHub ↗</LinkButton>
                {siteData.links.googleScholar && <LinkButton href={siteData.links.googleScholar}>Scholar ↗</LinkButton>}
              </div>

              <button
                type="button"
                onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-8 inline-flex items-center gap-2 animate-bounce"
                style={{ color: 'var(--text-muted)' }}
                aria-label="Scroll down to see more"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span className="text-sm">Scroll to explore</span>
              </button>
            </div>

            <div className="justify-self-center md:justify-self-end order-first md:order-last">
              <img
                src={profileImage}
                alt="Pranav Kutralingam"
                className="w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[26rem] lg:h-[26rem] rounded-2xl object-cover shadow-lg"
                style={{ border: '1px solid var(--border)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="snap-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full py-8">
          <SectionTitle>Experience</SectionTitle>
          <ExperienceList />
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="snap-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full py-8">
          <SectionTitle>Projects</SectionTitle>
          <div className="grid grid-cols-1 gap-6">
            {projects.map((p) => <ProjectItem key={p.title} project={p} />)}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section id="publications" className="snap-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full py-8">
          <SectionTitle>Publications</SectionTitle>
          <div className="grid grid-cols-1 gap-6">
            {publications.map((p) => <PublicationItem key={p.title} pub={p} />)}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="snap-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full py-8">
          <SectionTitle>Skills</SectionTitle>
          <Card>
            <div className="space-y-4">
              {skillsData.map((group) => (
                <div key={group.category} className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-2">
                  <p className="font-semibold text-sm sm:pt-1" style={{ color: 'var(--text)' }}>{group.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((s) => <Chip key={s}>{s}</Chip>)}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="snap-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full py-8 pb-28">
          <SectionTitle>Get in touch</SectionTitle>
          <p className="text-base sm:text-lg mb-6 max-w-2xl" style={{ color: 'var(--text)' }}>
            Hiring for a Software Engineer role on an AI team? Email the req number to{' '}
            <a href={siteData.links.email} className="font-semibold underline" style={{ color: 'var(--accent)' }}>
              {siteData.links.emailDisplay}
            </a>
            .
          </p>
          <div className="flex flex-wrap gap-2 mb-10">
            <LinkButton href={siteData.links.email} primary>Email me</LinkButton>
            <LinkButton href={siteData.links.linkedin}>LinkedIn ↗</LinkButton>
            <LinkButton href={siteData.links.github}>GitHub ↗</LinkButton>
            <LinkButton href={siteData.links.resume}>Resume ↗</LinkButton>
          </div>

          <Card>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text)' }}>Or send a message here</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  aria-label="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg"
                  style={inputStyle}
                  placeholder="Your name"
                />
                <input
                  type="email"
                  name="email"
                  aria-label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg"
                  style={inputStyle}
                  placeholder="your.email@example.com"
                />
              </div>
              <textarea
                name="message"
                aria-label="Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg"
                style={inputStyle}
                placeholder="Your message"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-lg font-medium disabled:opacity-50"
                style={{ background: 'var(--accent)', color: 'var(--bg)' }}
              >
                {isSubmitting ? 'Sending…' : 'Send message'}
              </button>
              {submitStatus === 'success' && (
                <p className="text-sm" style={{ color: 'var(--accent)' }}>Message sent. I'll get back to you soon.</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-sm" style={{ color: '#ef4444' }}>Couldn't send. Please email me directly.</p>
              )}
              {submitStatus === 'missingKeys' && (
                <p className="text-sm" style={{ color: '#f59e0b' }}>The form isn't set up right now. Please email me directly.</p>
              )}
            </form>
          </Card>

          <blockquote className="mt-12 pt-8 max-w-2xl mx-auto text-center" style={{ borderTop: '1px solid var(--border)' }}>
            <p className="text-lg sm:text-xl italic mb-2" style={{ color: 'var(--text-muted)' }}>
              "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
            </p>
            <cite className="text-sm" style={{ color: 'var(--text-muted)', fontStyle: 'normal' }}>— Aristotle</cite>
          </blockquote>

          <p className="mt-8 text-xs text-left sm:text-center" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Pranav Kutralingam
          </p>
        </div>
      </section>

      <ChatBubble />
    </div>
  );
};

export default Home;
