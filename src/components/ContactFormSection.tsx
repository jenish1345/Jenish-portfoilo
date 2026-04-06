import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Calendar, Mail, User, MessageSquare } from "lucide-react";

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // EmailJS integration (you'll need to set this up)
    // For now, simulating submission
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Left: Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl font-bold mb-6">Send me a message</h3>
        <p className="text-white/60 mb-8">
          Have a project in mind? Let's discuss how we can work together.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-colors text-white placeholder:text-white/40"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 flex items-center gap-2">
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
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-colors text-white placeholder:text-white/40 resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <motion.button
            type="submit"
            disabled={status === "sending"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white text-black px-6 py-4 rounded-lg font-medium hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "sending" ? (
              <>
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                Sending...
              </>
            ) : status === "success" ? (
              <>
                <span className="text-green-600">✓</span>
                Message Sent!
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Right: Quick Contact Options */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h3 className="text-3xl font-bold mb-6">Other ways to connect</h3>

        {/* Email */}
        <motion.a
          href="mailto:antonyjenishfernando.27it@licet.ac.in"
          whileHover={{ x: 10 }}
          className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all group"
        >
          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold mb-1">Email Me</h4>
            <p className="text-sm text-white/60">antonyjenishfernando.27it@licet.ac.in</p>
          </div>
        </motion.a>

        {/* Calendar */}
        <motion.a
          href="https://calendly.com/antonyjenish"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 10 }}
          className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all group"
        >
          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold mb-1">Schedule a Call</h4>
            <p className="text-sm text-white/60">Book a 30-minute consultation</p>
          </div>
        </motion.a>

        {/* Response Time */}
        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <h4 className="font-semibold">Quick Response</h4>
          </div>
          <p className="text-sm text-white/60">
            I typically respond within 24 hours. For urgent inquiries, please mention it in your message.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactFormSection;
