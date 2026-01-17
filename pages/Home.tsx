import React, { useState, useRef, useEffect } from 'react';
import { siteData } from '../data/siteData.ts';
import { projectsData } from '../data/projectsData.ts';
import { experienceData } from '../data/experienceData.ts';
import { skillsData } from '../data/skillsData.ts';
import { Project, ExperienceItem } from '../types';
import emailjs from '@emailjs/browser';
import { useChat } from '../contexts/ChatContext';
import Message from '../components/chat/Message';
import neuroIcon from '../data/connection.png';

// Import section components
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const getPreviewImageUrl = (url: string) =>
    `https://image.thum.io/get/width/1600/crop/900/noanimate/${encodeURIComponent(url)}`;
  const previewUrl = project.links.demo ? getPreviewImageUrl(project.links.demo) : '';

  return (
    <article className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 rounded-lg transition-all duration-200 hover:bg-[color:var(--surface-2)]"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-bold mb-1" style={{ color: 'var(--text)' }}>
              {project.title}
            </h2>
            <p className="text-sm line-clamp-1" style={{ color: 'var(--text-muted)' }}>
              {project.summary}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm mono" style={{ color: 'var(--text-muted)' }}>
              {project.year}
            </span>
            <svg
              className="w-5 h-5 transition-transform duration-200"
              style={{
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                color: 'var(--text-muted)'
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="mt-2 p-4 rounded-lg" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <p className="text-sm sm:text-base mb-4 leading-relaxed" style={{ color: 'var(--text)' }}>
            {project.summary}
          </p>

          {project.links.demo && (
            <div className="relative group rounded-lg overflow-hidden mb-4" style={{ border: '1px solid var(--border)' }}>
              <div className="w-full h-64 sm:h-80 bg-[color:var(--surface-2)]">
                {!imgError ? (
                  <img
                    src={previewUrl}
                    alt={`${project.title} preview`}
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
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-md font-medium"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text)' }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{ background: '#E8E4D9', color: '#000000' }}
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
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
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
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{ color: 'var(--text)', border: '1px solid var(--border)', background: 'var(--surface)' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Paper
              </a>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

const TimelineItem: React.FC<{ item: ExperienceItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 rounded-lg transition-all duration-200 hover:bg-[color:var(--surface-2)]"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: 'var(--text)' }}>
              {item.company}
            </h3>
            <p className="text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>
              {item.role}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {item.start} - {item.end}
            </span>
            <svg
              className="w-5 h-5 transition-transform duration-200"
              style={{
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                color: 'var(--text-muted)'
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="mt-2 p-4 rounded-lg" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          {item.location && (
            <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{item.location}</span>
            </div>
          )}
          {item.bullets && item.bullets.length > 0 && (
            <div className="space-y-2">
              {item.bullets.map((point, idx) => (
                <p key={idx} className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text)' }}>
                  • {point}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </li>
  );
};

const RotatingTagline: React.FC = () => {
  const taglines = [
    "Building Scalable Systems",
    "LLM and Machine Learning Researcher",
    "Deploying LLM and ML Systems in Production",
    "Hackathon Builder with Shipped Projects",
    "Designing Reliable Backend Systems",
    "Gym Rat with Engineering Discipline"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev: number) => (prev + 1) % taglines.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h3 className="font-semibold text-lg sm:text-xl mb-6 h-8 overflow-hidden" style={{ color: "var(--text-muted)" }}>
      <span
        className="inline-block transition-all duration-300"
        style={{
          opacity: isAnimating ? 0 : 1,
          transform: isAnimating ? 'translateY(-20px)' : 'translateY(0)'
        }}
      >
        {taglines[currentIndex]}
      </span>
    </h3>
  );
};

const SkillPill: React.FC<{ skill: string }> = ({ skill }) => {
  const getIconCandidates = (s: string): string[] => {
    const skillLower = s.toLowerCase();
    const cdn = {
      devicon: (name: string, variant: string = 'original') =>
        `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`,
      simple: (name: string) => `https://api.iconify.design/simple-icons:${name}.svg`,
    };

    const map: Record<string, string[]> = {
      // Languages
      'python': [cdn.devicon('python')],
      'java': [cdn.devicon('java')],
      'c++': [cdn.devicon('cplusplus')],
      'javascript': [cdn.devicon('javascript')],
      'typescript': [cdn.devicon('typescript')],
      'sql': [cdn.devicon('azuresqldatabase')],
      'bash': [cdn.devicon('bash')],
      'c#': [cdn.devicon('csharp')],
      '.net': [cdn.devicon('dotnetcore')],
      'rust': [cdn.devicon('rust')],

      // Frameworks & Libraries
      'react': [cdn.devicon('react')],
      'node': [cdn.devicon('nodejs')],
      'node.js': [cdn.devicon('nodejs')],
      'fastapi': [cdn.devicon('fastapi')],
      'spring boot': [cdn.devicon('spring')],
      'flask': [cdn.devicon('flask')],
      'tensorflow': [cdn.devicon('tensorflow')],
      'pytorch': [cdn.devicon('pytorch')],
      'scikit-learn': [cdn.simple('scikitlearn')],
      'hugging face transformers': [cdn.simple('huggingface')],

      // Tools & Platforms
      'git': [cdn.devicon('git')],
      'docker': [cdn.devicon('docker')],
      'kubernetes': [cdn.devicon('kubernetes')],
      'github actions': [cdn.devicon('githubactions')],
      'jenkins': [cdn.devicon('jenkins')],
      'aws': [cdn.devicon('amazonwebservices', 'plain-wordmark')],
      'azure': [cdn.devicon('azure')],
      'splunk': [cdn.simple('splunk')],
      'hpc clusters': [cdn.simple('linux')],
      'linux': [cdn.devicon('linux')],

      // Databases
      'postgresql': [cdn.devicon('postgresql', 'plain')],
      'mysql': [cdn.devicon('mysql')],
      'mongodb': [cdn.devicon('mongodb')],
      'hibernate': [cdn.devicon('hibernate')],

      // Testing & Quality
      'junit': [cdn.devicon('junit', 'plain')],
      'playwright': [cdn.devicon('playwright')],
      'google lighthouse': [cdn.simple('lighthouse')],
      'ci/cd testing pipelines': [cdn.simple('githubactions')],

      // ML & AI
      'large language models (llms)': [cdn.simple('openai')],
      'retrieval-augmented generation (rag)': [cdn.simple('langchain')],
      'mlops': [cdn.simple('mlflow')],
      'model evaluation & experiment tracking': [cdn.simple('weightsandbiases')],

      // Systems & Concepts
      'rest apis': [cdn.simple('swagger')],
      'microservices': [cdn.devicon('kubernetes')],
      'distributed systems': [cdn.devicon('apachekafka')],
      'reinforcement learning': [cdn.simple('openai')],
    };

    return map[skillLower] || [];
  };

  const [idx, setIdx] = useState(0);
  const candidates = getIconCandidates(skill);
  const src = candidates[idx];

  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md"
      style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text)' }}
    >
      {src && (
        <img
          src={src}
          alt={`${skill} logo`}
          loading="lazy"
          width={18}
          height={18}
          style={{ display: 'inline-block' }}
          onError={() => {
            if (idx < candidates.length - 1) setIdx(idx + 1);
          }}
        />
      )}
      <span>{skill}</span>
    </span>
  );
};

const EmbeddedChatBox: React.FC = () => {
  const { messages, sendMessage, isLoading, quickActions, executeAction } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const lastBotMessageRef = useRef<HTMLDivElement>(null);
  const prevMessagesLength = useRef(messages.length);

  useEffect(() => {
    // Scroll to start of new bot response within the chat container only
    if (messages.length > prevMessagesLength.current && lastBotMessageRef.current && messagesContainerRef.current) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.author === 'bot') {
        const container = messagesContainerRef.current;
        const element = lastBotMessageRef.current;
        // Calculate position of element relative to container
        const elementTop = element.offsetTop - container.offsetTop;
        container.scrollTo({ top: elementTop, behavior: 'smooth' });
      }
    }
    prevMessagesLength.current = messages.length;
  }, [messages]);

  useEffect(() => {
    // Prevent body scroll when expanded
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue('');
  };

  const [showOverlay, setShowOverlay] = useState(true);

  return (
    <>
      <div
        className={`${isExpanded ? 'hidden' : 'w-full h-[500px]'} rounded-2xl flex flex-col overflow-hidden relative`}
        style={{ border: "3px solid var(--border)", background: "var(--surface)" }}
      >
        {/* Translucent overlay prompt */}
        {showOverlay && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer rounded-2xl"
            style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(2px)' }}
            onClick={() => setShowOverlay(false)}
          >
            <div className="text-center px-6">
              <p className="text-lg font-semibold text-white mb-2">Ask about my work</p>
              <p className="text-sm text-gray-300">AI assistant trained on my projects, skills, and experience</p>
            </div>
          </div>
        )}
        {/*
          CHATBOT SIZE CONFIGURATION:
          - Width: Change "sm:w-96" (96 = 24rem = 384px)
            Example: sm:w-80 (320px), sm:w-[400px] (400px), sm:w-[450px] (450px)
          - Height: Change "h-[500px]"
            Example: h-[400px], h-[600px], h-[700px]
        */}
        {/* Chat header */}
        <div className="px-3 py-2 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2">
            <img
              src={neuroIcon}
              alt=""
              className="w-5 h-5"
              style={{ borderRadius: '4px' }}
            />
            <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>Chat with Neuro</h3>
          </div>
          <button
            onClick={() => setIsExpanded(true)}
            className="p-1 hover:opacity-70 transition-opacity"
            style={{ color: "var(--text)" }}
            title="Expand fullscreen"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
            </svg>
          </button>
        </div>

      {/* Chat messages area */}
      <div ref={messagesContainerRef} className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => {
            const isLastBotMessage = index === messages.length - 1 && msg.author === 'bot';
            return (
              <div key={msg.id} ref={isLastBotMessage ? lastBotMessageRef : null}>
                <Message
                  message={msg}
                  isLastMessage={isLastBotMessage}
                />
              </div>
            );
          })}
          {isLoading && <Message message={{ id: 'loading', author: 'bot', text: '...' }} />}
        </div>
      </div>

      {/* Quick Action Buttons - Persistent at bottom */}
      {quickActions.length > 0 && (
        <div className="px-4 py-2 border-t" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          {/* <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>Quick Actions:</p> */}
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'thin' }}>
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => executeAction(action)}
                disabled={isLoading}
                className="px-3 py-1 text-xs transition-opacity rounded disabled:opacity-50 whitespace-nowrap flex-shrink-0"
                style={{
                  background: 'var(--accent)',
                  color: 'var(--bg)',
                  border: 'none'
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat input */}
      <form onSubmit={handleSubmit} className="p-4 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Neuro anything..."
            className="flex-1 px-4 py-2 rounded-lg text-sm"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text)" }}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            Send
          </button>
        </div>
      </form>
    </div>

      {/* Fullscreen Overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 p-4"
          style={{ background: "rgba(0, 0, 0, 0.8)" }}
        >
          <div
            className="w-full h-full rounded-2xl flex flex-col overflow-hidden"
            style={{ border: "3px solid var(--border)", background: "var(--surface)" }}
          >
            {/* Chat header */}
            <div className="px-3 py-2 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2">
                <img
                  src={neuroIcon}
                  alt=""
                  className="w-5 h-5"
                  style={{ borderRadius: '4px' }}
                />
                <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>Chat with Neuro</h3>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:opacity-70 transition-opacity"
                style={{ color: "var(--text)" }}
                title="Close fullscreen"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M.5 5a.5.5 0 0 1 .5-.5h4a1.5 1.5 0 0 0 1.5-1.5v-4a.5.5 0 0 1 1 0v4A1.5 1.5 0 0 0 9 4.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 0 7.5 7v4a.5.5 0 0 1-1 0V7A1.5 1.5 0 0 0 5 5.5H1a.5.5 0 0 1-.5-.5z"/>
                  <path d="M.5 11a.5.5 0 0 0 .5.5h4A1.5 1.5 0 0 1 6.5 13v4a.5.5 0 0 0 1 0v-4A1.5 1.5 0 0 1 9 11.5h4a.5.5 0 0 0 0-1h-4A1.5 1.5 0 0 1 7.5 9V5a.5.5 0 0 0-1 0v4A1.5 1.5 0 0 1 5 10.5H1a.5.5 0 0 0-.5.5z"/>
                </svg>
              </button>
            </div>

            {/* Chat messages area */}
            <div ref={messagesContainerRef} className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <Message
                    key={msg.id}
                    message={msg}
                    isLastMessage={index === messages.length - 1 && msg.author === 'bot'}
                  />
                ))}
                {isLoading && <Message message={{ id: 'loading', author: 'bot', text: '...' }} />}
              </div>
            </div>

            {/* Quick Action Buttons - Persistent at bottom */}
            {quickActions.length > 0 && (
              <div className="px-4 py-2 border-t" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
                <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>Quick Actions:</p>
                <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'thin' }}>
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => executeAction(action)}
                      disabled={isLoading}
                      className="px-3 py-1 text-xs transition-opacity rounded disabled:opacity-50 whitespace-nowrap flex-shrink-0"
                      style={{
                        background: 'var(--accent)',
                        color: 'var(--bg)',
                        border: 'none'
                      }}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat input */}
            <form onSubmit={handleSubmit} className="p-4 border-t" style={{ borderColor: "var(--border)" }}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Neuro anything..."
                  className="flex-1 px-4 py-2 rounded-lg text-sm"
                  style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text)" }}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                  style={{ background: "var(--accent)", color: "var(--bg)" }}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const Home: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'missingKeys'>('idle');


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
        to_email: 'thirupranav99@gmail.com'
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

  const contactLinks = [
    { name: 'Email', href: siteData.links.email, label: siteData.links.emailDisplay },
    { name: 'GitHub', href: siteData.links.github, label: siteData.links.githubDisplay },
    { name: 'LinkedIn', href: siteData.links.linkedin, label: siteData.links.linkedinDisplay },
  ];

  const projectItems = projectsData;

  const formatCategoryTitle = (category: string) => {
    return category
      .replace(/_/g, ' & ')
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <div className="min-h-screen">
      {/* About Section - Hero */}
      <section id="about" className="max-w-7xl mx-auto px-2 sm:px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Left side - Text content */}
          <div className="lg:pr-8">
            <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl mb-4 heading-blue gradient-blue" style={{ letterSpacing: "0.02em" }}>
              PRANAV KUTRALINGAM
            </h1>
            <h2 className="font-bold text-2xl sm:text-3xl mb-6" style={{ color: "var(--text)" }}>
              SOFTWARE ENGINEER
            </h2>
            <RotatingTagline />
            <div className="space-y-4 text-base sm:text-lg leading-relaxed" style={{ color: "var(--text)" }}>
              <p>
                I build production-grade software systems across backend engineering and applied machine learning. My experience spans research, industry, and startups, with a focus on scalable architectures, ML pipelines, and real-world deployment.
              </p>
              <p className="text-sm sm:text-base" style={{ color: "var(--text-muted)" }}>
                MS CS @ ASU · Open to full-time Software Engineering and Applied ML roles
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href={siteData.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-sm"
                style={{
                  color: "var(--text)",
                  background: "var(--surface)",
                  border: "1px solid var(--border)"
                }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href={siteData.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-sm"
                style={{
                  color: "var(--text)",
                  background: "var(--surface)",
                  border: "1px solid var(--border)"
                }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a
                href={siteData.links.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-sm"
                style={{
                  color: "var(--text)",
                  background: "var(--surface)",
                  border: "1px solid var(--border)"
                }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
                </svg>
                Scholar
              </a>
              <a
                href={siteData.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-sm"
                style={{
                  color: "var(--text)",
                  background: "var(--surface)",
                  border: "1px solid var(--border)"
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                Resume
              </a>
            </div>

            {/* Scroll Down Indicator */}
            <div className="mt-8">
              <a
                href="#experience"
                className="inline-flex items-center gap-2 animate-bounce"
                style={{ color: 'var(--text-muted)' }}
                aria-label="Scroll down to see more"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
                <span className="text-sm">Scroll to explore</span>
              </a>
            </div>
          </div>

          {/* Right side - Chatbot */}
          <div className="flex justify-center lg:justify-end lg:ml-12">
            <EmbeddedChatBox />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6 heading-blue gradient-blue">
          Work Experience
        </h2>
        <ul className="space-y-2">
          {experienceData.map((item) => (
            <TimelineItem key={`${item.company}-${item.start}`} item={item} />
          ))}
        </ul>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6 heading-blue gradient-blue">
          Featured Projects & Publications
        </h2>
        <div className="space-y-2">
          {projectItems.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-8 sm:mb-12 heading-blue gradient-blue">
          Skills
        </h2>
        <div className="space-y-8">
          {skillsData.map(({ category, skills }) => (
            <div key={category}>
              <h3 className="text-xl font-bold mb-4 subheading">
                {formatCategoryTitle(category)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <SkillPill key={skill} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-8 sm:mb-12 heading-blue gradient-blue">
          Get in touch !
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-2xl font-bold mb-6 subheading">
              
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-base font-medium mb-2" style={{ color: 'var(--text)' }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-base font-medium mb-2" style={{ color: 'var(--text)' }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-base font-medium mb-2" style={{ color: 'var(--text)' }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl resize-vertical"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-xl font-medium disabled:opacity-50"
                style={{ background: 'var(--accent)', color: 'var(--bg)' }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitStatus === 'success' && (
                <div className="p-4 rounded-xl" style={{ background: 'var(--surface-2)', border: '1px solid var(--accent)' }}>
                  <p style={{ color: 'var(--accent)' }}>Message sent successfully!</p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 rounded-xl" style={{ background: 'var(--surface-2)', border: '1px solid #ef4444' }}>
                  <p style={{ color: '#ef4444' }}>Failed to send. Please try email below.</p>
                </div>
              )}
              {submitStatus === 'missingKeys' && (
                <div className="p-4 rounded-xl" style={{ background: 'var(--surface-2)', border: '1px solid #f59e0b' }}>
                  <p style={{ color: '#f59e0b' }}>Email service not configured. Use links below.</p>
                </div>
              )}
            </form>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6 subheading">
              Other ways to reach me
            </h3>
            <p className="mb-6" style={{ color: 'var(--text)' }}>
              Feel free to reach out through any of these channels.
            </p>
            <div className="space-y-4">
              {contactLinks.map((link) => (
                <div key={link.name} className="flex flex-col sm:flex-row sm:items-center">
                  <span className="w-24 font-bold" style={{ color: 'var(--text)' }}>{link.name}:</span>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: 'var(--accent)' }}
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Quote */}
      <footer className="py-12 text-center" style={{ borderTop: '1px solid var(--border)' }}>
        <blockquote className="max-w-2xl mx-auto px-4">
          <p className="text-lg sm:text-xl italic mb-2" style={{ color: 'var(--text-muted)' }}>
            "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
          </p>
          <cite className="text-sm" style={{ color: 'var(--text-muted)', fontStyle: 'normal' }}>
            — Aristotle
          </cite>
        </blockquote>
      </footer>
    </div>
  );
};

export default Home;
