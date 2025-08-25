import React from 'react';
import PageLayout from '../components/PageLayout';
import { ExperienceItem } from '../types';
import { experienceData } from '../data/experienceData.ts';

const ExperienceCard: React.FC<{ item: ExperienceItem }> = ({ item }) => (
  <section>
    <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
      <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>{item.company}</h2>
      <span className="text-sm mt-1 sm:mt-0" style={{ color: "var(--text-muted)" }}>{item.start} – {item.end}</span>
    </header>
    <h3 className="text-base font-medium mb-3" style={{ color: "var(--text)" }}>{item.role}</h3>
    <ul className="list-disc list-inside space-y-2" style={{ color: "var(--text)" }}>
      {item.bullets.map((point, index) => (
        <li key={index} className="marker:text-[var(--text-muted)]">{point}</li>
      ))}
    </ul>
  </section>
);


const Experience: React.FC = () => {
  return (
    <PageLayout title="Experience">
        {experienceData.map((item) => (
          <ExperienceCard key={item.company} item={item} />
        ))}
    </PageLayout>
  );
};

export default Experience;