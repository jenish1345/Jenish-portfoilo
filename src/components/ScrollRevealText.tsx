import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  /** 'chars' | 'words' */
  mode?: "chars" | "words";
  tag?: keyof JSX.IntrinsicElements;
}

const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({
  text,
  className = "",
  delay = 0,
  mode = "words",
  tag: Tag = "span",
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const tokens = mode === "chars" ? text.split("") : text.split(" ");

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={containerRef} className={`inline ${className}`} aria-label={text}>
      {tokens.map((token, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
          }}
        >
          <span
            style={{
              display: "inline-block",
              transform: visible ? "translateY(0)" : "translateY(110%)",
              opacity: visible ? 1 : 0,
              transition: `transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay + i * (mode === "chars" ? 0.03 : 0.07)}s, opacity 0.5s ease ${delay + i * (mode === "chars" ? 0.03 : 0.07)}s`,
            }}
          >
            {token}
            {mode === "words" && i < tokens.length - 1 ? "\u00a0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
};

export default ScrollRevealText;
