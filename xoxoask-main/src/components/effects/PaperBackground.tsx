import { cn } from "@/lib/utils";
import paperBackground from "@/assets/backgrounds/paper-main.jpg";

interface PaperBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: "main" | "celebration";
}

export const PaperBackground = ({ 
  children, 
  className,
  variant = "main"
}: PaperBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative min-h-screen overflow-hidden",
        className
      )}
      style={{
        backgroundImage: `url(${paperBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Paper grain noise overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
      
      {/* Soft vignette gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-paper/10 to-paper/30 pointer-events-none" />
      
      {/* Warm glow overlay for celebration */}
      {variant === "celebration" && (
        <div className="absolute inset-0 bg-gradient-radial from-primary-soft/20 via-transparent to-transparent pointer-events-none" />
      )}
      
      {/* Torn edge effects - top */}
      <svg 
        className="absolute top-0 left-0 right-0 w-full h-6 text-background/30 pointer-events-none"
        viewBox="0 0 1200 24" 
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0,24 L0,8 Q30,12 60,6 T120,10 T180,4 T240,12 T300,6 T360,14 T420,8 T480,10 T540,4 T600,12 T660,6 T720,14 T780,8 T840,10 T900,4 T960,12 T1020,6 T1080,10 T1140,8 T1200,6 L1200,24 Z" />
      </svg>
      
      {/* Torn edge effects - bottom */}
      <svg 
        className="absolute bottom-0 left-0 right-0 w-full h-6 text-background/30 pointer-events-none rotate-180"
        viewBox="0 0 1200 24" 
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0,24 L0,8 Q30,14 60,8 T120,12 T180,6 T240,10 T300,8 T360,12 T420,6 T480,14 T540,8 T600,10 T660,6 T720,12 T780,8 T840,14 T900,6 T960,10 T1020,8 T1080,12 T1140,6 T1200,10 L1200,24 Z" />
      </svg>
      
      {/* Subtle corner fold effect - top right */}
      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-foreground/5 to-transparent"
          style={{
            clipPath: "polygon(100% 0, 0 0, 100% 100%)",
          }}
        />
      </div>
      
      {/* Corner shadow - bottom left */}
      <div 
        className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at bottom left, hsl(var(--foreground) / 0.03) 0%, transparent 70%)",
        }}
      />
      
      {/* Corner shadow - bottom right */}
      <div 
        className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at bottom right, hsl(var(--foreground) / 0.03) 0%, transparent 70%)",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
