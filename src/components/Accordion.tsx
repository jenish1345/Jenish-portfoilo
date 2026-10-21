import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";

export type AccordionItem = {
  id: string;
  /** Row heading. */
  title: ReactNode;
  /** One line that stays visible when the row is closed. */
  summary?: ReactNode;
  /** Small text on the right of the row (period, tags, count). */
  meta?: ReactNode;
  /** Revealed on tap. */
  children: ReactNode;
};

type Props = {
  items: AccordionItem[];
  /** Rows that start open. */
  defaultOpen?: string[];
  /** Noun for the toolbar, e.g. "projects". */
  noun: string;
};

/**
 * Clean list rows that open in place. Closed rows still show a title and a summary,
 * so the page reads fine by scrolling; "Expand all" turns it into a plain long page.
 */
const Accordion = ({ items, defaultOpen = [], noun }: Props) => {
  const uid = useId();
  const [open, setOpen] = useState<Set<string>>(() => new Set(defaultOpen));
  const allOpen = open.size === items.length;

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4 text-sm">
        <p className="text-zinc-500 dark:text-zinc-400">
          {items.length} {noun} · tap a row to open
        </p>
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(items.map((i) => i.id)))}
          className="min-h-[44px] rounded-full px-3 font-medium text-emerald-700 transition-colors hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <ul className="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/10 dark:border-white/10">
        {items.map((item) => {
          const isOpen = open.has(item.id);
          const buttonId = `${uid}-${item.id}-button`;
          const panelId = `${uid}-${item.id}-panel`;
          return (
            <li key={item.id}>
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(item.id)}
                  className="group flex w-full items-start gap-4 py-5 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-white/[0.03] sm:px-2"
                >
                  <span className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <span className="min-w-0">
                      <span className="block text-xl font-semibold text-zinc-900 dark:text-white sm:text-2xl">
                        {item.title}
                      </span>
                      {item.summary && (
                        <span className="mt-1 block text-base font-normal text-zinc-600 dark:text-zinc-400">
                          {item.summary}
                        </span>
                      )}
                    </span>
                    {item.meta && (
                      <span className="shrink-0 font-mono text-xs font-normal text-zinc-500 dark:text-zinc-400 sm:text-right">
                        {item.meta}
                      </span>
                    )}
                  </span>
                  <span
                    aria-hidden
                    className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 transition-colors group-hover:border-emerald-500 group-hover:text-emerald-600 dark:border-white/20 dark:text-zinc-300 dark:group-hover:border-emerald-400 dark:group-hover:text-emerald-400"
                  >
                    <Plus
                      className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none ${
                  isOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pb-7 pt-1 sm:px-2">{item.children}</div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Accordion;
