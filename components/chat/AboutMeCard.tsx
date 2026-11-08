import React from 'react';

const AboutMeCard: React.FC = () => {
  // Import photos using dynamic require
  const getPhotoPath = (filename: string) => {
    try {
      return new URL(`../../data/pranav_photos/${filename}`, import.meta.url).href;
    } catch {
      return '';
    }
  };

  const photo1 = getPhotoPath('WhatsApp Image 2026-01-14 at 11.09.02 PM.jpeg');
  const photo2 = getPhotoPath('WhatsApp Image 2026-01-14 at 11.11.16 PM.jpeg');
  const photo3 = getPhotoPath('WhatsApp Image 2026-01-14 at 11.24.47 PM.jpeg');

  return (
    <div
      className="my-4 rounded-xl overflow-hidden"
      style={{
        border: '2px solid var(--border)',
        background: 'var(--surface-2)',
      }}
    >
      {/* Header with photos */}
      <div className="grid grid-cols-3 gap-0">
        <div
          className="aspect-square overflow-hidden"
          style={{ borderRight: '1px solid var(--border)' }}
        >
          {photo1 ? (
            <img
              src={photo1}
              alt="Pranav Kutralingam"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
          )}
        </div>
        <div
          className="aspect-square overflow-hidden"
          style={{ borderRight: '1px solid var(--border)' }}
        >
          {photo2 ? (
            <img
              src={photo2}
              alt="Pranav Kutralingam"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
          )}
        </div>
        <div className="aspect-square overflow-hidden">
          {photo3 ? (
            <img
              src={photo3}
              alt="Pranav Kutralingam"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-pink-500/20 to-orange-500/20" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div>
            <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text)' }}>
              Pranav Kutralingam
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Software Engineer, AI
            </p>
          </div>
        </div>

        {/* Professional Journey */}
        <div className="mb-4">
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
            Pranav is a Computer Science graduate from ASU (Dec 2025, GPA 3.97/4.0) with experience across industry, a startup, and applied research.
            <br /><br />
            He joined Amadeus as an intern in 2021 and grew into leading a team of 5, building Java and Spring Boot booking services. He then did his M.S. at ASU's DaRL Lab, building the eval and training infrastructure behind two 2026 papers (ACL, ICLR).
            <br /><br />
            At Pretorin, a seed-stage AI compliance startup, he took an agentic RAG chatbot from zero to one, raised retrieval precision from 71% to 93%, and built guardrails and an LLM eval suite in CI/CD. He's now an AI Researcher at ASU's DaRL Lab.
            <br /><br />
            He's looking for Software Engineer roles on AI teams: AI developer tools, agents, or the cloud services underneath them. Based in the SF Bay Area, open to relocating anywhere in the US, no sponsorship needed.
          </p>


        </div>

        {/* Links */}
        <div className="flex gap-2 mt-4">
          <a
            href="https://github.com/pranawwwww"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 px-3 rounded text-xs font-medium transition-opacity hover:opacity-80"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/pranavkutralingam"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 px-3 rounded text-xs font-medium transition-opacity hover:opacity-80"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}
          >
            LinkedIn
          </a>
          <a
            href="https://scholar.google.com/citations?user=7wl6PBUAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 px-3 rounded text-xs font-medium transition-opacity hover:opacity-80"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}
          >
            Scholar
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutMeCard;
