import { motion } from "framer-motion";

interface QuoteSectionProps {
  quote: string;
  author: string;
}

const QuoteSection = ({ quote, author }: QuoteSectionProps) => {
  return (
    <section className="py-32 px-6 bg-[#f5f5f0] dark:bg-[#0a0a0a] transition-colors">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-6xl md:text-8xl mb-8 opacity-20">"</div>
          <p className="text-2xl md:text-4xl font-light leading-relaxed mb-8 text-black/80 dark:text-white/80">
            {quote}
          </p>
          <p className="text-sm uppercase tracking-wider text-black/40 dark:text-white/40">
            — {author}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteSection;
