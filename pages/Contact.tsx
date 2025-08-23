
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
      <div className="space-y-12">
        {/* Contact Form */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-neutral-100">Send me a message</h2>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#111111] focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#111111] focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#111111] focus:border-transparent resize-vertical"
                placeholder="Your message..."
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#111111] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-400 text-sm">✅ Message sent successfully! I'll get back to you soon.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">❌ Failed to send message. Please try again or use the email link below.</p>
              </div>
            )}
          </form>
        </section>

        {/* Contact Links */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-neutral-100">Other ways to reach me</h2>
          <p className="mb-8 text-neutral-300">
            Feel free to reach out through any of these channels. I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision.
          </p>
          <div className="space-y-4">
            {contactLinks.map((link) => (
              <div key={link.name} className="flex flex-col sm:flex-row sm:items-center">
                <span className="w-24 font-bold text-neutral-100">{link.name}:</span>
                <a 
                  href={link.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-white hover:underline underline-offset-4 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#111111]"
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
