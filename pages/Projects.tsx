import React, { useMemo, useState } from 'react';
import PageLayout from '../components/PageLayout';
import { Project } from '../types';
import { projectsData } from '../data/projectsData.ts';

// Helper to get a thumbnail image of a website (uses a public screenshot service)
const getPreviewImageUrl = (url: string) =>
  `https://image.thum.io/get/width/1600/crop/900/noanimate/${encodeURIComponent(url)}`;

// Updated Projects page: Title on top -> Big preview (description on hover) -> Tech + Links below
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [imgError, setImgError] = useState(false);
  const previewUrl = useMemo(() => (project.links.demo ? getPreviewImageUrl(project.links.demo) : ''), [project.links.demo]);

  return (
    <article className="py-10" style={{ borderBottom: '1px solid var(--border)' }}>
      {/* Title on top */}
      <header className="mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
            {project.title}
          </h2>
          <span
            className="text-sm font-medium mono px-3 py-1 rounded-md self-start sm:self-auto"
            style={{ color: 'var(--text-muted)', background: 'var(--surface-2)', border: '1px solid var(--border)' }}
          >
            {project.year}
          </span>
        </div>
      </header>

      {/* Bigger preview with description on hover */}
      {project.links.demo && (
        <div
          className="relative group rounded-xl overflow-hidden shadow-lg"
          style={{ border: '1px solid var(--border)' }}
        >
          <div className="w-full h-72 sm:h-96 lg:h-[28rem] bg-[color:var(--surface-2)]">
            {/* Prefer static preview image; fallback to iframe if image fails */}
            {!imgError ? (
              <img
                src={previewUrl}
                alt={`${project.title} — Live preview`}
                loading="lazy"
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <iframe
                src={project.links.demo}
                className="w-full h-full"
                title={`${project.title} Preview`}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-popups allow-popups-to-escape-sandbox"
                style={{ transform: 'scale(0.9)', transformOrigin: 'top left', width: '112%', height: '112%' }}
              />
            )}
          </div>

          {/* Subtle darken on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

          {/* Description overlay on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 sm:p-5 flex items-end">
            <div className="w-full max-w-none bg-black/60 backdrop-blur rounded-lg p-4 sm:p-5">
              <p className="text-sm sm:text-base leading-relaxed text-white">{project.summary}</p>
              <div className="mt-3">
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg font-medium"
                  style={{ background: 'var(--accent)', color: '#ffffff' }}
                >
                  View Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tech stack */}
      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1.5 text-sm rounded-md font-medium"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text)' }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links below */}
      <div className="mt-4 flex items-center gap-4 flex-wrap">
        {project.links.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200"
            style={{ background: 'var(--accent)', color: '#ffffff' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
          </a>
        )}
        {project.links.repo && (
          <a
            href={project.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200"
            style={{ color: 'var(--text)', border: '1px solid var(--border)', background: 'var(--surface)' }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        )}
        {project.links.arXiv && (
          <a
            href={project.links.arXiv}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200"
            style={{ color: 'var(--text)', border: '1px solid var(--border)', background: 'var(--surface)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            arXiv Paper
          </a>
        )}
      </div>
    </article>
  );
};


const Projects: React.FC = () => {
  return (
    <PageLayout title="Projects">
      <div className="space-y-16">
        {projectsData.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </PageLayout>
  );
};

export default Projects;
