import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import PageLayout from '../components/PageLayout';
import { siteData } from '../data/siteData.ts';

const contactLinks = [
  { name: 'Email', href: siteData.links.email, label: siteData.links.emailDisplay },
  { name: 'GitHub', href: siteData.links.github, label: siteData.links.githubDisplay },
  { name: 'LinkedIn', href: siteData.links.linkedin, label: siteData.links.linkedinDisplay },
];

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

    try {
      // Initialize EmailJS with your public key
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

      // Send email using EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'thirupranav99@gmail.com'
        }
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout title="Contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Form (Left) */}
        <section>
          <h2 className="text-2xl font-bold mb-6 subheading" style={{ color: "var(--text)" }}>Send me a message</h2>
          <form onSubmit={handleSubmit} className="space-y-8 w-full">
            <div>
              <label htmlFor="name" className="block text-base font-medium mb-3" style={{ color: "var(--text)" }}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 text-base sm:text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text)"
                }}
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-base font-medium mb-3" style={{ color: "var(--text)" }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 text-base sm:text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text)"
                }}
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-base font-medium mb-3" style={{ color: "var(--text)" }}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={8}
                className="w-full px-5 py-4 text-base sm:text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent resize-vertical"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text)"
                }}
                placeholder="Your message..."
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-7 py-4 text-base sm:text-lg font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{
                background: "var(--accent)",
                color: "#ffffff"
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            
            {submitStatus === 'success' && (
              <div className="p-5 rounded-xl" style={{
                background: "var(--surface-2)",
                border: "1px solid var(--accent)"
              }}>
                <p className="text-base" style={{ color: "var(--accent)" }}>✅ Message sent successfully! I'll get back to you soon.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="p-5 rounded-xl" style={{
                background: "var(--surface-2)",
                border: "1px solid #ef4444"
              }}>
                <p className="text-base" style={{ color: "#ef4444" }}>❌ Failed to send message. Please try again or use the email link below.</p>
              </div>
            )}
          </form>
        </section>

        {/* Contact Links (Right) */}
        <section>
          <h2 className="text-2xl font-bold mb-6 subheading" style={{ color: "var(--text)" }}>Other ways to reach me</h2>
          <p className="mb-8" style={{ color: "var(--text)" }}>
            Feel free to reach out through any of these channels. I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision.
          </p>
          <div className="space-y-4">
            {contactLinks.map((link) => (
              <div key={link.name} className="flex flex-col sm:flex-row sm:items-center">
                <span className="w-24 font-bold" style={{ color: "var(--text)" }}>{link.name}:</span>
                <a 
                  href={link.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  style={{ color: "var(--accent)" }}
                >
                  {link.label}
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Contact;
