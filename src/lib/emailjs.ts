// EmailJS Configuration
// To activate email sending:
// 1. Sign up at https://www.emailjs.com (free - 200 emails/month)
// 2. Create a service (Gmail), connect your antonyjenishfernando@gmail.com account
// 3. Create an email template with variables: {{from_email}}, {{message}}, {{from_name}}
// 4. Replace the placeholders below with your actual Service ID, Template ID, and Public Key

export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_fjai53m",
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_9p9buog",
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "SXBi_q150DYD65_98-",
  TO_EMAIL: "antonyjenishfernando@gmail.com",
};

export const isEmailJSConfigured = () => true;
