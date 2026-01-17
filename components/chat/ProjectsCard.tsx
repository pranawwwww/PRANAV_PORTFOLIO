import React from 'react';
import { projectsData } from '../../data/projectsData';

const ProjectsCard: React.FC = () => {
  return (
    <>
      <div className="my-4 space-y-3">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden"
            style={{
              border: '2px solid var(--border)',
              background: 'var(--surface-2)',
              animation: `fadeInUp 0.4s ease-out ${index * 0.2}s both`
            }}
          >
          <div className="p-4">
            {/* Project Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text)' }}>
                  {project.title}
                </h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {project.year}
                </p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1 mb-3">
              {project.stack.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 text-xs rounded"
                  style={{
                    background: 'var(--surface)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Summary */}
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text)' }}>
              {project.summary}
            </p>

            {/* Links */}
            <div className="flex gap-2">
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 px-3 rounded text-xs font-medium transition-opacity hover:opacity-80"
                  style={{ background: '#E8E4D9', color: '#000000' }}
                >
                  Live Demo
                </a>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 px-3 rounded text-xs font-medium transition-opacity hover:opacity-80"
                  style={{ background: 'var(--accent)', color: 'var(--bg)' }}
                >
                  Code
                </a>
              )}
              {project.links.arXiv && (
                <a
                  href={project.links.arXiv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 px-3 rounded text-xs font-medium transition-opacity hover:opacity-80"
                  style={{ background: 'var(--accent)', color: 'var(--bg)' }}
                >
                  Paper
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
    <style>{`
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}</style>
    </>
  );
};

export default ProjectsCard;
