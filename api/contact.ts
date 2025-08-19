export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { senderEmail, message, senderName } = req.body;

    if (!senderEmail || !message) {
      res.status(400).json({ error: 'Email and message are required' });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(senderEmail)) {
      res.status(400).json({ error: 'Invalid email format' });
      return;
    }

    // For now, we'll just log the contact form submission
    // In production, you would integrate with a service like:
    // - SendGrid, Mailgun, or AWS SES for sending emails
    // - Or store in a database and send notification emails
    
    console.log('Contact form submission:', {
      senderEmail,
      senderName: senderName || 'Anonymous',
      message,
      timestamp: new Date().toISOString()
    });

    // TODO: Integrate with email service
    // Example with SendGrid:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // 
    // const msg = {
    //   to: 'thiru.pranav@gmail.com',
    //   from: 'noreply@your-domain.com',
    //   subject: 'New Contact Form Submission',
    //   html: `
    //     <h3>New message from ${senderName || 'Anonymous'}</h3>
    //     <p><strong>Email:</strong> ${senderEmail}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `
    // };
    // 
    // await sgMail.send(msg);

    res.status(200).json({ 
      success: true,
      message: 'Your message has been received! I\'ll get back to you soon.'
    });
    
  } catch (error: any) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      error: 'Failed to send message. Please try again later.',
      details: error?.message || 'Unknown error'
    });
  }
}
