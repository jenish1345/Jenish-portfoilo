import { ExternalLink, Github } from "lucide-react";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import { featuredProjects, moreProjects, type Project } from "@/data/featuredProjects";

const Chip = ({ children }: { children: string }) => (
  <li className="rounded border border-emerald-200 bg-emerald-50 px-3 py-1.5 font-mono text-xs text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
    {children}
  </li>
);

const details = (p: Project) => (
  <div className="space-y-5">
    <p className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
      <span className="text-emerald-600 dark:text-emerald-400">&gt; role:</span> {p.role}
    </p>

    <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
      {p.highlights.map((h) => (
        <li key={h} className="flex gap-3">
          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
          <span>{h}</span>
        </li>
      ))}
    </ul>

    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
      {p.stack.map((s) => (
        <Chip key={s}>{s}</Chip>
      ))}
    </ul>

    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-medium">
      {p.links.map((l) => {
        const Icon = l.label.toLowerCase().startsWith("live") ? ExternalLink : Github;
        return (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 text-zinc-800 transition-colors hover:text-emerald-600 dark:text-zinc-200 dark:hover:text-emerald-400"
          >
            <Icon className="h-4 w-4" aria-hidden />
            {l.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        );
      })}
    </div>
  </div>
);

const items: AccordionItem[] = featuredProjects.map((p, i) => ({
  id: p.id,
  title: (
    <>
      <span aria-hidden className="mr-3 font-mono text-sm font-normal text-zinc-400">
        {String(i + 1).padStart(2, "0")}
      </span>
      {p.title}
    </>
  ),
  summary: p.summary,
  meta: p.tags.join(" · "),
  children: details(p),
}));

const FeaturedProjects = () => (
  <>
    <Accordion items={items} defaultOpen={[featuredProjects[0].id]} noun="projects" />

    <h3 className="mb-4 mt-14 text-xl font-bold text-zinc-900 dark:text-white">More projects</h3>
    <ul className="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/10 dark:border-white/10">
      {moreProjects.map((m) => (
        <li key={m.href}>
          <a
            href={m.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-1 py-4 text-zinc-900 transition-colors hover:text-emerald-600 dark:text-white dark:hover:text-emerald-400 sm:flex-row sm:items-baseline sm:justify-between"
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
