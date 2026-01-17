import React, { useState, useEffect } from 'react';
import type { Message as MessageType } from '../../types';
import AboutMeCard from './AboutMeCard';
import ProjectsCard from './ProjectsCard';
import SingleProjectCard from './SingleProjectCard';
import { projectsData } from '../../data/projectsData';

interface MessageProps {
  message: MessageType;
  isLastMessage?: boolean;
}

const Typewriter: React.FC<{ text: string; messageId: string }> = ({ text, messageId }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        // If this message has already animated, show full text immediately
        if (hasAnimated) {
            setDisplayedText(text);
            return;
        }

        setDisplayedText('');
        let i = 0;
        if (text.length === 0) {
            return;
        }

        const intervalId = setInterval(() => {
            setDisplayedText(text.substring(0, i + 1));
            i++;
            if (i >= text.length) {
                clearInterval(intervalId);
                setHasAnimated(true);
            }
        }, 15);

        return () => clearInterval(intervalId);
    }, [text, messageId, hasAnimated]);

    return (
        <div
            className="whitespace-pre-wrap leading-relaxed max-w-none w-full"
            style={{ color: 'var(--text)' }}
            dangerouslySetInnerHTML={{ __html: displayedText }}
        />
    );
};

const MessageComponent: React.FC<MessageProps> = ({ message, isLastMessage = false }) => {
  const isBot = message.author === 'bot';
  const isTyping = message.text === '...';
  const prefix = isBot ? '[NEURO]:' : '[USER]:';

  // Check if message contains special card tags
  const hasAboutMeCard = message.text.includes('[ABOUT_ME_CARD]');
  const hasProjectsCard = message.text.includes('[PROJECTS_CARD]');

  // Check for specific project cards [PROJECT:identifier]
  const projectMatch = message.text.match(/\[PROJECT:([^\]]+)\]/);
  const hasSpecificProject = !!projectMatch;
  const projectIdentifier = projectMatch ? projectMatch[1] : '';

  // Filter projects based on identifier
  const getFilteredProjects = (identifier: string) => {
    const id = identifier.trim().toLowerCase();

    // Technology-based filtering
    if (id === 'react') {
      return projectsData.filter(p => p.stack.some(tech => tech.toLowerCase() === 'react'));
    }
    if (id === 'defi' || id === 'web3') {
      return projectsData.filter(p =>
        p.title.toLowerCase().includes('etherfi') ||
        p.stack.some(tech => ['web3', 'defi'].includes(tech.toLowerCase()))
      );
    }
    if (id === 'healthcare' || id === 'medical') {
      return projectsData.filter(p => p.title.toLowerCase().includes('heal'));
    }
    if (id === 'education' || id === 'learning') {
      return projectsData.filter(p => p.title.toLowerCase().includes('adapted'));
    }
    if (id === 'computer vision') {
      return projectsData.filter(p =>
        p.stack.some(tech => tech.toLowerCase() === 'computer vision')
      );
    }
    if (id === 'reinforcement learning' || id === 'rl') {
      return projectsData.filter(p =>
        p.stack.some(tech => tech.toLowerCase() === 'rl')
      );
    }
    if (id === 'diffusion models') {
      return projectsData.filter(p =>
        p.stack.some(tech => tech.toLowerCase() === 'diffusion models')
      );
    }
    if (id === 'rag' || id === 'langchain') {
      return projectsData.filter(p =>
        p.stack.some(tech => ['rag', 'langchain'].includes(tech.toLowerCase()))
      );
    }

    // Exact project name matching
    if (id === 'adapted ai' || id === 'adapted') {
      return projectsData.filter(p => p.title.toLowerCase().includes('adapted'));
    }
    if (id === 'etherfi buddy' || id === 'etherfi') {
      return projectsData.filter(p => p.title.toLowerCase().includes('etherfi'));
    }
    if (id === 'heal.ai' || id === 'heal') {
      return projectsData.filter(p => p.title.toLowerCase().includes('heal'));
    }
    if (id === 'sim2real rl survey' || id === 'sim2real' || id === 'sim-to-real') {
      return projectsData.filter(p => p.title.toLowerCase().includes('sim-to-real'));
    }
    if (id === 'shadebench') {
      return projectsData.filter(p => p.title.toLowerCase().includes('shadebench'));
    }
    if (id === 'deepshade') {
      return projectsData.filter(p => p.title.toLowerCase().includes('deepshade'));
    }

    // Fallback: partial match on title
    return projectsData.filter(p => p.title.toLowerCase().includes(id));
  };

  const filteredProjects = hasSpecificProject ? getFilteredProjects(projectIdentifier) : [];

  let textWithoutCard = message.text
    .replace('[ABOUT_ME_CARD]', '')
    .replace('[PROJECTS_CARD]', '')
    .replace(/\[PROJECT:([^\]]+)\]/, '')
    .trim();

  return (
    <div className="mono text-base sm:text-lg w-full">
        <span className="select-none font-medium" style={{ color: 'var(--text-muted)' }}>{prefix}</span>
        <div className="mt-2 leading-relaxed w-full" style={{ color: 'var(--text)' }}>
          {isTyping ? (
              <div className="flex items-center">
                  <span className="inline-block w-2 h-4 animate-pulse" style={{ backgroundColor: 'var(--accent)' }} aria-hidden="true"></span>
              </div>
          ) : hasAboutMeCard ? (
              <>
                <AboutMeCard />
                {textWithoutCard && (
                  <p className="mt-3 whitespace-pre-wrap w-full" style={{ color: 'var(--text)' }}>{textWithoutCard}</p>
                )}
              </>
          ) : hasProjectsCard ? (
              <>
                <ProjectsCard />
                {textWithoutCard && (
                  <p className="mt-3 whitespace-pre-wrap w-full" style={{ color: 'var(--text)' }}>{textWithoutCard}</p>
                )}
              </>
          ) : hasSpecificProject && filteredProjects.length > 0 ? (
              <>
                {filteredProjects.map((project, index) => (
                  <div
                    key={index}
                    style={{
                      animation: `fadeInUp 0.4s ease-out ${index * 0.2}s both`
                    }}
                  >
                    <SingleProjectCard project={project} />
                  </div>
                ))}
                {textWithoutCard && (
                  <p className="mt-3 whitespace-pre-wrap w-full" style={{ color: 'var(--text)' }}>{textWithoutCard}</p>
                )}
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
          ) : isBot && isLastMessage ? (
              <Typewriter text={message.text} messageId={message.id} />
          ) : (
               <p className="whitespace-pre-wrap w-full" style={{ color: 'var(--text)' }}>{message.text}</p>
          )}
        </div>
    </div>
  );
};

export default MessageComponent;