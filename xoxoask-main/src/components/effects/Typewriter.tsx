import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  showCursor?: boolean;
}

export const Typewriter = ({
  text,
  className,
  speed = 50,
  delay = 0,
  onComplete,
  showCursor = true,
}: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
      onComplete?.();
    }
  }, [displayedText, text, speed, hasStarted, onComplete]);

  return (
    <span className={cn("inline", className)}>
      {displayedText}
      {showCursor && isTyping && (
        <span className="inline-block w-[2px] h-[1em] bg-primary ml-1 animate-pulse" />
      )}
    </span>
  );
};
