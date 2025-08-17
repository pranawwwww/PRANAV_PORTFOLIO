import React from 'react';
import PageLayout from '../components/PageLayout';
import { ExperienceItem } from '../types';
import { experienceData } from '../data/experienceData.ts';

const ExperienceCard: React.FC<{ item: ExperienceItem }> = ({ item }) => (
  <section>
    <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
      <h2 className="text-xl font-bold text-neutral-100">{item.company}</h2>
      <span className="text-sm text-neutral-400 mt-1 sm:mt-0">{item.start} – {item.end}</span>
    </header>
    <h3 className="text-base text-neutral-300 font-medium mb-3">{item.role}</h3>
    <ul className="list-disc list-inside space-y-2 text-neutral-300 marker:text-neutral-500">
      {item.bullets.map((point, index) => (
        <li key={index}>{point}</li>
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