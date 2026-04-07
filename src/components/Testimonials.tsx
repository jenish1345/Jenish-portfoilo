import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Antony's data analysis skills are exceptional. He transformed our raw data into actionable insights that drove real business results.",
    author: "Sarah Chen",
    role: "Product Manager",
    company: "Tech Innovations Inc."
  },
  {
    id: 2,
    quote: "Working with Antony on our ML project was a game-changer. His expertise in predictive modeling helped us achieve 92% accuracy.",
    author: "Michael Rodriguez",
    role: "CTO",
    company: "DataFlow Solutions"
  },
  {
    id: 3,
    quote: "Antony delivered our e-commerce platform ahead of schedule with exceptional quality. His attention to detail is remarkable.",
    author: "Emily Watson",
    role: "Founder",
    company: "House of Elleora"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 px-6 bg-[#f5f5f0]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-8 border-2 border-black rounded-lg flex items-center justify-center">
            <Quote className="w-4 h-4" />
          </div>
          <h2 className="text-sm uppercase tracking-wider">What People Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 border border-black/5 hover:border-black/10 transition-all"
            >
              <Quote className="w-8 h-8 text-black/20 mb-4" />
              <p className="text-black/70 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-black/5 pt-4">
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-black/60">{testimonial.role}</p>
                <p className="text-xs text-black/40 mt-1">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
