import { motion } from "framer-motion";
import { ArrowRight, Mail, MessageSquare, MapPin, Clock, Github, Linkedin, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG, isEmailJSConfigured } from "@/lib/emailjs";

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const ContactFormSection = ({ contact }: { contact: any }) => {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [emailError, setEmailError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "email") {
      if (value && !validateEmail(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!formData.message.trim()) return;

    setStatus("sending");

    try {
      if (isEmailJSConfigured()) {
        // Send via EmailJS — lands directly in antonyjenishfernando@gmail.com
        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          {
            from_email: formData.email,
            from_name: formData.email,
            message: formData.message,
            to_email: EMAILJS_CONFIG.TO_EMAIL,
            reply_to: formData.email,
          },
          { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
        );
        setStatus("success");
        setFormData({ email: "", message: "" });
      } else {
        // Fallback: open default mail client until EmailJS is configured
        const subject = encodeURIComponent(`Portfolio message from ${formData.email}`);
        const body = encodeURIComponent(`From: ${formData.email}\n\n${formData.message}`);
        window.open(
          `mailto:antonyjenishfernando@gmail.com?subject=${subject}&body=${body}`,
          "_blank"
        );
        setStatus("success");
        setFormData({ email: "", message: "" });
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm uppercase tracking-wider text-white/40 mb-8 flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          {contact.availability || "Available for Work"}
        </p>

        <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          Let's create<br />something<br />extraordinary<br />together.
        </h2>
      </motion.div>

      {/* Quick Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto"
      >
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
          <Clock className="w-5 h-5 text-white/50 mx-auto mb-2" />
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Response Time</div>
          <div className="text-sm font-medium">{contact.responseTime || "Within 24 Hours"}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
          <MapPin className="w-5 h-5 text-white/50 mx-auto mb-2" />
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Location</div>
          <div className="text-sm font-medium">{contact.location}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
          <CheckCircle className="w-5 h-5 text-green-500 mx-auto mb-2" />
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Status</div>
          <div className="text-sm font-medium text-green-400">Open to Projects</div>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto space-y-6 mb-20"
        noValidate
      >
        {/* Email Field */}
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium mb-2 flex items-center gap-2 text-white/80">
            <Mail className="w-4 h-4" />
            Your Email
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-describedby={emailError ? "email-error" : undefined}
            aria-invalid={!!emailError}
            className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:outline-none transition-colors text-white placeholder:text-white/40 ${
              emailError
                ? "border-red-400 focus:border-red-400"
                : "border-white/20 focus:border-white/40"
            }`}
            placeholder="your.email@example.com"
          />
          {emailError && (
            <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <span>⚠</span> {emailError}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium mb-2 flex items-center gap-2 text-white/80">
            <MessageSquare className="w-4 h-4" />
            Your Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            minLength={10}
            rows={6}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-colors text-white placeholder:text-white/40 resize-none"
            placeholder="Tell me about your project..."
          />
        </div>

        {/* Status Messages */}
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            role="status"
            aria-live="polite"
            className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-3"
          >
            <CheckCircle className="w-4 h-4 shrink-0" />
            Message sent! I'll get back to you within 24 hours.
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            aria-live="assertive"
            className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3"
          >
            <span>⚠</span>
            Something went wrong. Please try emailing me directly at{" "}
            <a
              href="mailto:antonyjenishfernando@gmail.com"
              className="underline hover:text-red-300 transition-colors"
            >
              antonyjenishfernando@gmail.com
            </a>
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={status === "sending" || !!emailError || !formData.email || !formData.message}
          whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
          whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
          className="w-full bg-white text-black px-6 py-4 rounded-lg font-medium hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </motion.form>

      {/* Footer Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left max-w-2xl mx-auto">
        <div>
          <h3 className="text-sm uppercase tracking-wider text-white/40 mb-6">Navigation</h3>
          <div className="space-y-3">
            <a href="#work" className="block hover:opacity-60 transition-opacity">Work</a>
            <a href="#about" className="block hover:opacity-60 transition-opacity">About</a>
            <a href="#services" className="block hover:opacity-60 transition-opacity">Services</a>
            <a href="#contact" className="block hover:opacity-60 transition-opacity">Contact</a>
          </div>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-wider text-white/40 mb-6">Connect</h3>
          <div className="space-y-3">
            <a href="https://github.com/jenish1345" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-60 transition-opacity">
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a href={contact.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-60 transition-opacity">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a href={`mailto:antonyjenishfernando@gmail.com`} className="flex items-center gap-2 hover:opacity-60 transition-opacity">
              <Mail className="w-4 h-4" />
              Email
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-wider text-white/40 mb-6">Info</h3>
          <div className="space-y-3 text-sm text-white/60">
            <p>📍 {contact.location}</p>
            <p>⚡ {contact.responseTime || "Within 24 Hours"}</p>
            <p>🟢 {contact.availability || "Available for Work"}</p>
          </div>
        </div>
      </div>

      <div className="mt-20 pt-12 border-t border-white/10 text-sm text-white/40 text-center">
        <p>Built with passion in Chennai ❤️</p>
        <p className="mt-2">© 2026 Antony Jenish. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ContactFormSection;
