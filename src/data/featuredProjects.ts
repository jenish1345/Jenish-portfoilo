export type Project = {
  id: string;
  title: string;
  /** Small labels shown on the card: be honest about context (hackathon, client, team, base project). */
  tags: string[];
  /** One sentence: what it is and who it is for. */
  summary: string;
  /** What I personally did. Keep it factual and checkable against the repo history. */
  role: string;
  /** Short, concrete facts taken from the project's own README or commits. */
  highlights: string[];
  stack: string[];
  links: { label: string; href: string }[];
  featured?: boolean;
  /** Optional screenshot under /public/projects. */
  image?: { src: string; alt: string };
};

export const featuredProjects: Project[] = [
  {
    id: "credentia",
    title: "Credentia",
    tags: ["Hackathon", "Monad testnet"],
    summary:
      "A portable identity and trust layer for AI agents and people: issue, share and verify credentials, with on-chain reputation.",
    // Evidence: all 5 commits in jenish1345/Credentia are mine.
    // TODO: say which parts you wrote if others contributed outside Git.
    role: "Author of every commit in the repository.",
    highlights: [
      "Monorepo: Solidity contracts (Foundry), Node/Express API, Next.js 14 web app, React Native SDK, MetaMask Snap and an Envio indexer.",
      "Issue → share → verify → receipt flow, deployed to Monad testnet.",
      "The README states which integrations are testnet stand-ins rather than real ones.",
    ],
    stack: ["Solidity", "TypeScript", "Next.js", "Node.js", "React Native"],
    links: [{ label: "Code", href: "https://github.com/jenish1345/Credentia" }],
    featured: true,
  },
  {
    id: "house-of-elleora",
    title: "House of Elleora",
    tags: ["Freelance", "Live store"],
    summary:
      "An online shop for a women's accessories brand, built and maintained for the owner.",
    // Evidence: 60 commits, all mine, 2026-03-19 to 2026-06-03.
    // TODO: add one result the owner is happy to confirm (orders, time saved). Do not add numbers you cannot show.
    role: "Sole developer: 60 commits from March to June 2026.",
    highlights: [
      "Catalogue of 115 products with Cloudinary image hosting and paginated loading.",
      "UPI payment flow and order messages sent over WhatsApp.",
      "Node/Express with serverless functions and a Postgres database.",
    ],
    stack: ["JavaScript", "Node.js", "Express", "Postgres", "Cloudinary"],
    links: [
      { label: "Live site", href: "https://houseofelleora.netlify.app" },
      { label: "Code", href: "https://github.com/jenish1345/house-of-elleora" },
    ],
    // TODO: add a screenshot, e.g. image: { src: "/projects/elleora.png", alt: "..." } (file goes in public/projects/).
  },
  {
    id: "claimguard",
    title: "Claimguard",
    tags: ["Hackathon", "Team of two"],
    summary:
      "Helps patients contest health-insurance claim denials: reads the denial, checks it against the policy and drafts the appeal.",
    // Evidence: contributors are jenish1345 and samuveljohnson1416.
    // TODO: describe exactly what you built (frontend, OCR, legal gate, ...).
    role: "Built with Samuvel Johnson.",
    highlights: [
      "A plan-type gate decides whether ERISA or state prompt-pay law applies before any legal citation is shown.",
      "Cites only statutes from a verified table; otherwise it says the information is not available.",
      "OCR-grounded comparison of the denial against the policy contract, plus an appeal letter and phone script.",
    ],
    stack: ["TypeScript", "OCR", "RAG"],
    links: [{ label: "Code", href: "https://github.com/jenish1345/Claimguard" }],
  },
  {
    id: "firebreak",
    title: "Firebreak",
    tags: ["Hackathon", "Built on AgentTX"],
    summary:
      "A preflight safety gate for AI agents: it rehearses an action in a sandbox and compares what the agent said it would do with what it actually did.",
    // Evidence: AgentTX base by aliengineering-byte (MIT). My commits: the gate implementation and attack suite,
    // sandbox canary fix, repository URL.
    // TODO: list exactly which modules are yours versus the AgentTX base.
    role: "Implemented the Firebreak gate and attack suite on top of AgentTX, the MIT-licensed base by aliengineering-byte.",
    highlights: [
      "Catches undeclared file deletion, credential exfiltration (canary tokens), out-of-scope writes and unexpected network calls.",
      "Every finding is tagged with OWASP LLM and agentic categories.",
      "Includes an attack suite, tests and CI workflows.",
    ],
    stack: ["TypeScript", "Node.js", "GitHub Actions"],
    links: [
      { label: "Code", href: "https://github.com/jenish1345/firebreak" },
      { label: "AgentTX (base)", href: "https://github.com/aliengineering-byte/agenttx" },
    ],
  },
  {
    id: "aegisnet",
    title: "AegisNet",
    tags: ["Hackathon", "Team of two"],
    summary:
      "Evidence-grounded AI that connects scam messages into campaigns, checks the counter-evidence and hands a human reviewer a brief.",
    // Evidence: contributors are jenish1345 and samuveljohnson1416.
    // TODO: (1) say what you built. (2) A commit says the codebase was rebranded from "TraceX" and
    // the README still contains the placeholder "[NEW_NAME]". Confirm where TraceX came from and credit it
    // here if it is someone else's work, and fix the README.
    role: "Built with Samuvel Johnson.",
    highlights: [
      "Seven-step offline demo: signal extraction, evidence correlation, campaign reconstruction, counter-evidence check, claim verification, review brief.",
      "Python backend with a separate frontend and a test folder.",
    ],
    stack: ["Python", "TypeScript"],
    links: [{ label: "Code", href: "https://github.com/jenish1345/AegisNet" }],
  },
  {
    id: "decidr",
    title: "DECIDR",
    tags: ["Solo", "Prototype"],
    summary:
      "A decision platform where a company sets what must happen, a personal AI decides how and when, and only privacy-safe aggregates flow back.",
    // Evidence: all 5 commits are mine, all on 2026-08-28.
    // TODO: link a demo or screenshots, and confirm the backend framework.
    role: "Author of every commit in the repository.",
    highlights: [
      "Two linked modes: an organization console and a personal assistant that exchange corporate actions and aggregated outcomes.",
      "Decision contracts, a personal constitution, an agent debate and a decision trace; the commit log reports 7 of 7 integration tests passing.",
    ],
    stack: ["TypeScript", "Python", "AI agents"],
    links: [{ label: "Code", href: "https://github.com/jenish1345/acds-x-decidrr" }],
  },
];

export const moreProjects = [
  {
    title: "SmartSchedule",
    note: "Timetable generator with a working demo.",
    href: "https://jenish1345.github.io/timetable-generator/",
  },
  {
    title: "ChurnGuard",
    note: "Streamlit churn-prediction dashboard (random forest).",
    href: "https://github.com/jenish1345/customer-churn-prediction-retention-dashboard",
  },
  {
    title: "Swiftypay",
    note: "Pay-by-link demo on Monad testnet with a mock token.",
    href: "https://github.com/jenish1345/Swiftypay",
  },
];
