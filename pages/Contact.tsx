
import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import { siteData } from '../data/siteData.ts';

const contactLinks = [
  { name: 'GitHub', href: siteData.links.github, label: siteData.links.githubDisplay },
  { name: 'LinkedIn', href: siteData.links.linkedin, label: siteData.links.linkedinDisplay },
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.senderEmail || !formData.message) {
      setSubmitStatus('error');
      setStatusMessage('Please fill in your email and message.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setStatusMessage(data.message);
        setFormData({ senderName: '', senderEmail: '', message: '' });
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout title="Contact">
      <section>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
          Feel free to reach out. I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision.
        </p>

        {/* Contact Form */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-6 font-mono" style={{ color: 'var(--text-primary)' }}>
            Send me a message
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="senderName" className="block text-sm font-medium mb-2 font-mono" style={{ color: 'var(--text-primary)' }}>
                Your Name (optional)
              </label>
              <input
                type="text"
                id="senderName"
                name="senderName"
                value={formData.senderName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 font-mono focus:outline-none focus:ring-2 transition-all"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)'
                }}
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="senderEmail" className="block text-sm font-medium mb-2 font-mono" style={{ color: 'var(--text-primary)' }}>
                Your Email *
              </label>
              <input
                type="email"
                id="senderEmail"
                name="senderEmail"
                value={formData.senderEmail}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 font-mono focus:outline-none focus:ring-2 transition-all"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)'
                }}
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 font-mono" style={{ color: 'var(--text-primary)' }}>
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 font-mono focus:outline-none focus:ring-2 transition-all resize-vertical"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)'
                }}
                placeholder="Tell me about your project, idea, or opportunity..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3 font-mono font-medium uppercase tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)'
              }}
              onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = 'var(--nav-hover-bg)')}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-primary)'}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {/* Status Message */}
            {submitStatus !== 'idle' && (
              <div className={`p-4 font-mono text-sm ${
                submitStatus === 'success' 
                  ? 'border-green-500 bg-green-500/10 text-green-400' 
                  : 'border-red-500 bg-red-500/10 text-red-400'
              }`} style={{ border: '1px solid' }}>
                {statusMessage}
              </div>
            )}
          </form>
        </div>

        {/* Other Contact Links */}
        <div>
          <h3 className="text-xl font-bold mb-6 font-mono" style={{ color: 'var(--text-primary)' }}>
            Other ways to connect
          </h3>
          <div className="space-y-4">
            {contactLinks.map((link) => (
              <div key={link.name} className="flex flex-col sm:flex-row sm:items-center">
                <span className="w-24 font-bold font-mono" style={{ color: 'var(--text-primary)' }}>{link.name}:</span>
                <a 
                  href={link.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    color: 'var(--text-muted)',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  {link.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
