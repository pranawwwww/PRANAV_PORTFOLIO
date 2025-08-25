
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
    <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>{formatCategoryTitle(category)}</h2>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span 
          key={skill} 
          className="px-3 py-1.5 text-sm"
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            color: "var(--text)"
          }}
        >
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
