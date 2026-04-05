import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<"default" | "hover" | "click">("default");
  const [cursorLabel, setCursorLabel] = useState("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.closest("a")) {
        setCursorState("hover");
        
        // Set label based on element type
        if (target.closest("[data-project-card]")) {
          setCursorLabel("View");
        } else if (target.textContent?.includes("Projects")) {
          setCursorLabel("Explore");
        } else if (target.textContent?.includes("Contact")) {
          setCursorLabel("Connect");
        } else {
          setCursorLabel("Click");
        }
      } else {
        setCursorState("default");
        setCursorLabel("");
      }
    };

    const handleMouseDown = () => {
      setCursorState("click");
    };

    const handleMouseUp = () => {
      setCursorState("hover");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const cursorSize = cursorState === "hover" ? 60 : cursorState === "click" ? 40 : 12;
  const trailSize = cursorState === "hover" ? 80 : cursorState === "click" ? 60 : 32;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed rounded-full pointer-events-none z-[9999] flex items-center justify-center"
        animate={{
          x: mousePosition.x - cursorSize / 2,
          y: mousePosition.y - cursorSize / 2,
          width: cursorSize,
          height: cursorSize,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 28,
          mass: 0.5 
        }}
        style={{
          background: cursorState === "hover" 
            ? "linear-gradient(135deg, rgba(0, 245, 255, 0.3), rgba(138, 43, 226, 0.3))"
            : "rgba(0, 245, 255, 0.8)",
          backdropFilter: cursorState === "hover" ? "blur(10px)" : "none",
        }}
      >
        {cursorState === "hover" && cursorLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-white text-xs font-bold"
          >
            {cursorLabel}
          </motion.span>
        )}
      </motion.div>
      
      {/* Cursor trail */}
      <motion.div
        className="fixed rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - trailSize / 2,
          y: mousePosition.y - trailSize / 2,
          width: trailSize,
          height: trailSize,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 150, 
          damping: 20,
          mass: 0.8
        }}
        style={{
          border: "2px solid rgba(0, 245, 255, 0.5)",
          background: "transparent",
        }}
      />
    </>
  );
};

export default CustomCursor;
