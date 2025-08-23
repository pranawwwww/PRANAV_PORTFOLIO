# 📧 EmailJS Setup Instructions

## 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

## 2. Create an Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (recommended) or another email provider
4. Connect your Gmail account (`thirupranav99@gmail.com`)
5. Copy the **Service ID** (something like `service_xxxxxx`)

## 3. Create an Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Template Name:** `template_contact`

**Subject:** `New Contact from {{from_name}} - Portfolio`

**Content:**
```
Hello Pranav,

You have received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply to: {{reply_to}}
```

4. Save the template and copy the **Template ID**

## 4. Get Your Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

## 5. Update Environment Variables
Update your `.env.local` file with your actual values:

```env
GEMINI_API_KEY=AIzaSyC3Psu0oXfp6RwchwlIg07EJGEFtsrr7HM

# Replace these with your actual EmailJS values
VITE_EMAILJS_SERVICE_ID=service_your_actual_id
VITE_EMAILJS_TEMPLATE_ID=template_contact
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

## 6. Test the Contact Form
1. Restart your development server: `npm run dev`
2. Go to the Contact page
3. Fill out the form and submit
4. Check your email (`thirupranav99@gmail.com`) for the message!

## 🔒 Security Notes
- EmailJS free plan allows 200 emails/month
- Your public key is safe to expose in frontend code
- All emails will be sent to `thirupranav99@gmail.com`
- Users will see a success message when email is sent

## 🚀 Production Deployment
When you deploy to Vercel/Netlify, add the environment variables to your hosting platform's environment settings.
