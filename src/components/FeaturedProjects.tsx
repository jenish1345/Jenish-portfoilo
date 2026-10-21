import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { featuredProjects, moreProjects, type Project } from "@/data/featuredProjects";

const Prompt = ({ children }: { children: string }) => (
  <span className="text-emerald-600 dark:text-emerald-400">&gt; {children}</span>
);

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const titleId = `project-${project.id}`;
  return (
    <motion.article
      aria-labelledby={titleId}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col bg-white dark:bg-[#0d0d0d] border border-zinc-200 dark:border-emerald-500/20 rounded-lg overflow-hidden transition-colors ${
        project.featured ? "lg:col-span-2" : ""
      }`}
    >
      <div className="bg-zinc-50 dark:bg-[#0a0a0a] border-b border-zinc-200 dark:border-emerald-500/20 px-4 py-3 flex items-center justify-between gap-3 transition-colors">
        <span className="text-xs font-mono text-zinc-700 dark:text-zinc-500">
          {String(index + 1).padStart(2, "0")} / {String(featuredProjects.length).padStart(2, "0")}
        </span>
        <div className="flex flex-wrap justify-end gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded border border-emerald-200 dark:border-emerald-500/30 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 id={titleId} className={`font-bold text-zinc-900 dark:text-white ${project.featured ? "text-4xl" : "text-3xl"}`}>
          {project.title}
        </h3>
        <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">{project.summary}</p>

        <p className="mt-5 font-mono text-sm text-zinc-600 dark:text-zinc-400">
          <Prompt>role:</Prompt> {project.role}
        </p>

        <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {project.stack.map((s) => (
            <li
              key={s}
              className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded text-xs font-mono text-emerald-700 dark:text-emerald-400"
            >
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-1 pt-6 text-sm font-medium">
          {project.links.map((l) => {
            const Icon = l.label.toLowerCase().startsWith("live") ? ExternalLink : Github;
            return (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 py-2 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <Icon className="w-4 h-4" aria-hidden />
                {l.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
};

const FeaturedProjects = () => (
  <>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {featuredProjects.map((p, i) => (
        <ProjectCard key={p.id} project={p} index={i} />
      ))}
    </div>

    <h3 className="mt-14 mb-4 text-xl font-bold text-zinc-900 dark:text-white">More projects</h3>
    <ul className="divide-y divide-zinc-200 dark:divide-white/10 border-y border-zinc-200 dark:border-white/10">
      {moreProjects.map((m) => (
        <li key={m.href}>
          <a
            href={m.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-1 py-4 text-zinc-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors sm:flex-row sm:items-baseline sm:justify-between"
          >
            <span className="font-medium">
              {m.title} <span aria-hidden>↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </span>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">{m.note}</span>
          </a>
        </li>
      ))}
    </ul>
  </>
);

export default FeaturedProjects;
