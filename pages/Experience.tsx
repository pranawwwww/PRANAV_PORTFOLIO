import React from 'react';
import PageLayout from '../components/PageLayout';
import { ExperienceItem } from '../types';
import { experienceData } from '../data/experienceData.ts';

const MetaRow: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text)' }}>
    {icon}
    <span>{text}</span>
  </div>
);

const TimelineItem: React.FC<{ item: ExperienceItem }> = ({ item }) => (
  <li className="mb-10 ml-6 relative">
    {/* Accent dot */}
    <span
      className="absolute -left-1.5 top-2 flex h-3 w-3 items-center justify-center rounded-full ring-4"
      style={{ background: 'var(--accent)', ringColor: 'var(--surface)' } as React.CSSProperties}
    />

    {/* Card content */}
    <div className="rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div className="p-4 sm:p-5">
        {/* Role as the main heading */}
        <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
          {item.role}
        </h3>

        {/* Metadata rows */}
        <div className="space-y-1 mb-3">
          <MetaRow
            icon={
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 21V9h6v12" />
              </svg>
            }
            text={item.company}
          />
          {item.location && (
            <MetaRow
              icon={
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11a3 3 0 100-6 3 3 0 000 6zm0 0c-4.418 0-8 2.239-8 5v3h16v-3c0-2.761-3.582-5-8-5z" />
                </svg>
              }
              text={item.location}
            />
          )}
          <MetaRow
            icon={
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
              </svg>
            }
            text={`${item.start} - ${item.end}`}
          />
        </div>

        {/* Description bullets as paragraphs */}
        {item.bullets && item.bullets.length > 0 && (
          <div className="space-y-2">
            {item.bullets.map((point, idx) => (
              <p key={idx} className="text-sm sm:text-base" style={{ color: 'var(--text)' }}>
                {point}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  </li>
);

const Experience: React.FC = () => {
  return (
    <PageLayout title="Experience">
      <ul className="relative border-l pl-6" style={{ borderColor: 'var(--border)' }}>
        {experienceData.map((item) => (
          <TimelineItem key={`${item.company}-${item.start}`} item={item} />
        ))}
      </ul>
    </PageLayout>
  );
};

export default Experience;