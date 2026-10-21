import Accordion, { type AccordionItem } from "@/components/Accordion";

export type Internship = {
  company: string;
  role: string;
  period: string;
  duration?: string;
  location: string;
  status: string;
  description: string;
  responsibilities: string[];
  tags: string[];
};

const Pills = ({ items, label }: { items: string[]; label: string }) => (
  <ul className="flex flex-wrap gap-2" aria-label={label}>
    {items.map((t) => (
      <li key={t} className="rounded-full bg-black/5 px-3 py-1 text-xs dark:bg-white/10">
        {t}
      </li>
    ))}
  </ul>
);

const aboutItems: AccordionItem[] = [
  {
    id: "who",
    title: "Who I am",
    summary: "Full Stack, Oracle APEX and AI. B.Tech IT at Loyola-ICAM, Chennai.",
    children: (
      <p className="max-w-3xl text-lg leading-relaxed text-black/70 dark:text-white/70">
        I'm Antony Jenish Fernando, a Full Stack Developer, Oracle APEX Developer and AI Engineer pursuing a B.Tech in
        Information Technology at Loyola-ICAM College of Engineering and Technology in Chennai, India.
      </p>
    ),
  },
  {
    id: "looking",
    title: "What I'm looking for",
    summary: "Software engineering, AI/ML, Oracle APEX and data roles, plus internships and freelance work.",
    children: (
      <p className="max-w-3xl text-lg leading-relaxed text-black/70 dark:text-white/70">
        I'm looking for full-time roles, internships and freelance collaborations in Software Engineering, AI/ML, Oracle
        APEX and Data. I build responsive websites, enterprise Oracle APEX applications and AI-powered systems.
      </p>
    ),
  },
  {
    id: "now",
    title: "What I'm working on",
    summary: "Knowledge graphs and semantic web at Ontographica.",
    children: (
      <p className="max-w-3xl text-lg leading-relaxed text-black/70 dark:text-white/70">
        At Ontographica I work on knowledge-graph engineering, semantic-web technologies (RDF, OWL, SPARQL) and AI data
        pipelines. My projects include an identity and trust layer for AI agents, a safety gate for agent actions, a
        scam-network analyzer, a claim-denial defense tool and a live store for a client.
      </p>
    ),
  },
];

export const AboutAccordion = () => <Accordion items={aboutItems} defaultOpen={["who"]} noun="topics" />;

export const ExperienceAccordion = ({ internships }: { internships: Internship[] }) => {
  const items: AccordionItem[] = internships.map((e) => ({
    id: e.company,
    title: (
      <>
        {e.role}
        {e.status === "current" && (
          <span className="ml-3 inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-0.5 align-middle text-xs font-medium text-green-700 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-400">
            <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            Current
          </span>
        )}
      </>
    ),
    summary: e.company,
    meta: (
      <>
        {e.period}
        <span className="block">{[e.duration, e.location].filter(Boolean).join(" · ")}</span>
      </>
    ),
    children: (
      <div className="space-y-5">
        <p className="max-w-3xl leading-relaxed text-black/70 dark:text-white/70">{e.description}</p>
        <Pills items={e.responsibilities} label="What I worked on" />
        <Pills items={e.tags} label="Tags" />
      </div>
    ),
  }));
  return <Accordion items={items} defaultOpen={[internships[0].company]} noun="internships" />;
};

const educationItems: AccordionItem[] = [
  {
    id: "btech",
    title: "B.Tech, Information Technology",
    summary: "Loyola-ICAM College of Engineering and Technology",
    meta: (
      <>
        2023 – 2027
        <span className="block">Chennai, India</span>
      </>
    ),
    children: (
      <div className="space-y-5">
        <p className="max-w-3xl leading-relaxed text-black/70 dark:text-white/70">
          Specializing in Data Science, Machine Learning and AI. Active in tech events, hackathons and collaborative
          projects, with a foundation in algorithms, data structures and statistical analysis.
        </p>
        <Pills items={["AI/ML", "Data Science", "Full Stack"]} label="Focus areas" />
      </div>
    ),
  },
  {
    id: "hs",
    title: "Higher Secondary, Computer Science",
    summary: "BMC Matriculation Higher Secondary School",
    meta: "2016 – 2023",
    children: (
      <p className="max-w-3xl leading-relaxed text-black/70 dark:text-white/70">
        Higher secondary schooling with a Computer Science stream.
      </p>
    ),
  },
];

export const EducationAccordion = () => <Accordion items={educationItems} defaultOpen={["btech"]} noun="entries" />;
