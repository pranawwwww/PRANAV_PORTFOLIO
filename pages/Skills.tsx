
import React from 'react';
import PageLayout from '../components/PageLayout';
import { skillsData } from '../data/skillsData.ts';

const formatCategoryTitle = (category: string) => {
  return category
    .replace(/_/g, ' & ')
    .replace(/\b\w/g, char => char.toUpperCase());
};

const SkillGroup: React.FC<{ category: string; skills: string[] }> = ({ category, skills }) => (
  <section>
    <h2 className="text-xl font-bold mb-4 text-neutral-100">{formatCategoryTitle(category)}</h2>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span key={skill} className="bg-white/5 border border-white/10 px-3 py-1.5 text-sm text-neutral-300">
          {skill}
        </span>
      ))}
    </div>
  </section>
);

const Skills: React.FC = () => {
  return (
    <PageLayout title="Skills">
      {skillsData.map(({ category, skills }) => (
        <SkillGroup key={category} category={category} skills={skills} />
      ))}
    </PageLayout>
  );
};

export default Skills;
