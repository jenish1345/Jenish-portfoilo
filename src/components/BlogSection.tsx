import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building a Customer Churn Prediction Model with Python",
    excerpt: "Learn how I built a machine learning model that predicts customer churn with 89% accuracy using scikit-learn and pandas.",
    date: "Mar 15, 2026",
    readTime: "8 min read",
    category: "Machine Learning",
    image: "📊"
  },
  {
    id: "2",
    title: "Understanding Neural Networks: A Beginner's Guide",
    excerpt: "A comprehensive introduction to neural networks, covering the basics of how they work and their applications in AI.",
    date: "Feb 28, 2026",
    readTime: "12 min read",
    category: "Deep Learning",
    image: "🧠"
  },
  {
    id: "3",
    title: "Data Visualization Best Practices for Data Scientists",
    excerpt: "Explore effective techniques for visualizing complex datasets and communicating insights to stakeholders.",
    date: "Feb 10, 2026",
    readTime: "6 min read",
    category: "Data Science",
    image: "📈"
  }
];

const BlogSection = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 border-2 border-black rounded-lg flex items-center justify-center">
                <span className="text-xs">✍️</span>
              </div>
              <h2 className="text-sm uppercase tracking-wider">Latest Articles</h2>
            </div>
            <p className="text-black/60 max-w-2xl">
              Sharing insights on data science, machine learning, and AI development
            </p>
          </div>
          <a 
            href="#blog" 
            className="hidden md:flex items-center gap-2 text-sm hover:opacity-60 transition-opacity"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              {/* Image/Icon */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 mb-4 flex items-center justify-center">
                <div className="text-8xl">{post.image}</div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-black/40">
                  <span className="px-2 py-1 bg-black/5 rounded-full">{post.category}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>

                <h3 className="text-xl font-semibold group-hover:opacity-60 transition-opacity leading-tight">
                  {post.title}
                </h3>

                <p className="text-sm text-black/60 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2 text-sm font-medium pt-2 group-hover:gap-3 transition-all">
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="md:hidden mt-12 text-center">
          <a 
            href="#blog" 
            className="inline-flex items-center gap-2 text-sm hover:opacity-60 transition-opacity"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
