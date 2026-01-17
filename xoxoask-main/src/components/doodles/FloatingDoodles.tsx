import { HeartDoodle } from "./HeartDoodle";
import { StarDoodle } from "./StarDoodle";
import { SparkleDoodle } from "./SparkleDoodle";
import { cn } from "@/lib/utils";

interface FloatingDoodlesProps {
  className?: string;
  density?: "light" | "medium" | "heavy";
}

export const FloatingDoodles = ({ 
  className,
  density = "medium" 
}: FloatingDoodlesProps) => {
  const doodles = [
    // Hearts
    { Component: HeartDoodle, props: { variant: 1 as const, size: 32 }, position: "top-[10%] left-[5%]", animation: "animate-float", delay: "0s" },
    { Component: HeartDoodle, props: { variant: 2 as const, size: 24 }, position: "top-[20%] right-[8%]", animation: "animate-float-slow", delay: "1s" },
    { Component: HeartDoodle, props: { variant: 1 as const, size: 40 }, position: "bottom-[15%] left-[10%]", animation: "animate-float", delay: "2s" },
    { Component: HeartDoodle, props: { variant: 2 as const, size: 28 }, position: "top-[60%] right-[5%]", animation: "animate-float-fast", delay: "0.5s" },
    
    // Stars
    { Component: StarDoodle, props: { size: 28 }, position: "top-[15%] left-[20%]", animation: "animate-sparkle", delay: "0.3s" },
    { Component: StarDoodle, props: { size: 20 }, position: "top-[40%] right-[15%]", animation: "animate-sparkle", delay: "1.5s" },
    { Component: StarDoodle, props: { size: 24 }, position: "bottom-[25%] right-[20%]", animation: "animate-sparkle", delay: "0.8s" },
    
    // Sparkles
    { Component: SparkleDoodle, props: { size: 20 }, position: "top-[30%] left-[8%]", animation: "animate-sparkle", delay: "0.2s" },
    { Component: SparkleDoodle, props: { size: 16 }, position: "bottom-[35%] left-[25%]", animation: "animate-sparkle", delay: "1.2s" },
    { Component: SparkleDoodle, props: { size: 24 }, position: "top-[70%] left-[15%]", animation: "animate-sparkle", delay: "0.7s" },
  ];

  const filteredDoodles = density === "light" 
    ? doodles.filter((_, i) => i % 2 === 0)
    : density === "heavy"
    ? [...doodles, ...doodles.slice(0, 4).map((d, i) => ({ ...d, position: d.position.replace(/\d+%/, `${parseInt(d.position.match(/\d+/)?.[0] || "0") + 10}%`) }))]
    : doodles;

  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      {filteredDoodles.map(({ Component, props, position, animation, delay }, index) => (
        <div
          key={index}
          className={cn("doodle opacity-60", position, animation)}
          style={{ animationDelay: delay }}
        >
          <Component {...props} />
        </div>
      ))}
    </div>
  );
};
