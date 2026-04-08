import { motion } from "framer-motion";
import { ArrowRight, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";

const ContactFormSection = ({ contact }: { contact: any }) => {
  const [formData, setFormData] = useState({
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link with subject and body
    const subject = encodeURIComponent(`Message from ${formData.email}`);
    const body = encodeURIComponent(formData.message);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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
          Available for Work
        </p>

        <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          Let's create<br />something<br />extraordinary<br />together.
        </h2>
      </motion.div>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto space-y-6 mb-20"
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 flex items-center gap-2 text-white/80">
            <Mail className="w-4 h-4" />
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-colors text-white placeholder:text-white/40"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2 flex items-center gap-2 text-white/80">
            <MessageSquare className="w-4 h-4" />
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-colors text-white placeholder:text-white/40 resize-none"
            placeholder="Tell me about your project..."
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-white text-black px-6 py-4 rounded-lg font-medium hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
        >
          Send Message
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.form>

      {/* Footer Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-2xl mx-auto">
        <div>
          <h3 className="text-sm uppercase tracking-wider text-white/40 mb-6">Navigation</h3>
          <div className="space-y-3">
            <a href="#work" className="block hover:opacity-60 transition-opacity">Work</a>
            <a href="#about" className="block hover:opacity-60 transition-opacity">About</a>
            <a href="#contact" className="block hover:opacity-60 transition-opacity">Contact</a>
          </div>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-wider text-white/40 mb-6">Socials</h3>
          <div className="space-y-3">
            <a href="https://github.com/jenish1345" target="_blank" rel="noopener noreferrer" className="block hover:opacity-60 transition-opacity">
              GitHub
            </a>
            <a href={contact.linkedIn} target="_blank" rel="noopener noreferrer" className="block hover:opacity-60 transition-opacity">
              LinkedIn
            </a>
            <a href={`mailto:${contact.email}`} className="block hover:opacity-60 transition-opacity">
              Email
            </a>
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
