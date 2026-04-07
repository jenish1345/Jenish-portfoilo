import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Calendar, Mail, User, MessageSquare, Sparkles, Zap, Heart } from "lucide-react";

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
        className="relative"
      >
        {/* Decorative elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-3xl"
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h3 className="text-3xl font-bold">Let's Connect</h3>
          </div>
          <p className="text-white/60 mb-8">
            Have an exciting project? Let's turn your ideas into reality together.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="name" className="block text-sm font-medium mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-purple-400" />
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-white placeholder:text-white/40"
                placeholder="Your name"
              />
            </motion.div>

            <motion.div
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="email" className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all text-white placeholder:text-white/40"
                placeholder="your.email@example.com"
              />
            </motion.div>

            <motion.div
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="message" className="block text-sm font-medium mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-pink-400" />
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all text-white placeholder:text-white/40 resize-none"
                placeholder="Tell me about your project..."
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white px-6 py-4 rounded-lg font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                initial={{ x: "100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                {status === "sending" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <Heart className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </span>
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Right: Quick Contact Options */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-yellow-400" />
          <h3 className="text-3xl font-bold">Quick Connect</h3>
        </div>

        {/* Email */}
        <motion.a
          href="mailto:antonyjenishfernando.27it@licet.ac.in"
          whileHover={{ x: 10, scale: 1.02 }}
          className="flex items-start gap-4 p-6 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl hover:border-purple-400/50 transition-all group relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform relative z-10">
            <Mail className="w-6 h-6 text-purple-400" />
          </div>
          <div className="relative z-10">
            <h4 className="font-semibold mb-1 flex items-center gap-2">
              Email Me
              <Sparkles className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h4>
            <p className="text-sm text-white/60">antonyjenishfernando.27it@licet.ac.in</p>
          </div>
        </motion.a>

        {/* Calendar */}
        <motion.a
          href="https://calendly.com/antonyjenish"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 10, scale: 1.02 }}
          className="flex items-start gap-4 p-6 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl hover:border-blue-400/50 transition-all group relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform relative z-10">
            <Calendar className="w-6 h-6 text-blue-400" />
          </div>
          <div className="relative z-10">
            <h4 className="font-semibold mb-1 flex items-center gap-2">
              Schedule a Call
              <Sparkles className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h4>
            <p className="text-sm text-white/60">Book a 30-minute consultation</p>
          </div>
        </motion.a>

        {/* Response Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="p-6 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-green-500/20 rounded-xl relative overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl"
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-2 h-2 bg-green-500 rounded-full"
              />
              <h4 className="font-semibold">Lightning Fast Response</h4>
            </div>
            <p className="text-sm text-white/60">
              I typically respond within 24 hours. For urgent inquiries, I'll get back to you even sooner!
            </p>
          </div>
        </motion.div>

        {/* Fun Stats */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-white/5 border border-white/10 rounded-xl text-center"
          >
            <div className="text-2xl font-bold text-purple-400">100%</div>
            <div className="text-xs text-white/60 mt-1">Response Rate</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-white/5 border border-white/10 rounded-xl text-center"
          >
            <div className="text-2xl font-bold text-blue-400">24h</div>
            <div className="text-xs text-white/60 mt-1">Avg. Reply Time</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactFormSection;
