
import React from 'react';
import PageLayout from '../components/PageLayout';
import { Project } from '../types';
import { projectsData } from '../data/projectsData.ts';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <article className="py-8 border-b border-white/10 last:border-b-0">
    <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
      <h2 className="text-xl font-bold text-neutral-100">{project.title}</h2>
      <span className="text-sm text-neutral-400 mt-1 sm:mt-0">{project.year}</span>
    </header>
    <p className="mb-4 text-neutral-300">{project.summary}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {project.stack.map((tech) => (
        <span key={tech} className="bg-white/5 border border-white/10 px-2 py-1 text-xs text-neutral-300">
          {tech}
        </span>
      ))}
    </div>
    <div className="flex items-center space-x-4 text-sm">
      {project.links.demo && (
        <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#111111] p-1 -m-1">
          [Demo]
        </a>
      )}
      {project.links.repo && (
        <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#111111] p-1 -m-1">
          [Repo]
        </a>
      )}
    </div>
  </article>
);


const Projects: React.FC = () => {
  return (
    <PageLayout title="Projects">
      <div>
        {projectsData.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </PageLayout>
  );
};

export default Projects;
