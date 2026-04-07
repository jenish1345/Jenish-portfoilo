import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ContactFormSection = ({ contact }: { contact: any }) => {
  return (
    <div className="max-w-4xl mx-auto w-full text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-sm uppercase tracking-wider text-white/40 mb-8 flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Available for Work
        </p>

        <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          Let's create<br />something<br />extraordinary<br />together.
        </h2>

        <motion.a
          href={`mailto:${contact.email}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 text-2xl md:text-3xl hover:opacity-60 transition-opacity mb-16"
        >
          {contact.email}
          <ArrowRight className="w-8 h-8" />
        </motion.a>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 text-left">
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
          <p>© 2026 Antony Jenish. All rights reserved.</p>
          <p className="mt-2">Designed in Chennai</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactFormSection;
