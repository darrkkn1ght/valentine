import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { HeartDoodle } from "../doodles/HeartDoodle";
import { StarDoodle } from "../doodles/StarDoodle";

interface InteractiveBackgroundProps {
    children?: React.ReactNode;
    className?: string;
    enableTilt?: boolean;
}

export const InteractiveBackground = ({ children, className, enableTilt = true }: InteractiveBackgroundProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for tilt
    const springConfig = { damping: 30, stiffness: 200 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig); // Tilt based on Y
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig); // Tilt based on X

    // Spotlight gradient position
    const spotlightX = useSpring(0, { damping: 20, stiffness: 100 });
    const spotlightY = useSpring(0, { damping: 20, stiffness: 100 });

    useEffect(() => {
        // Gyroscope Handler (Mobile)
        const handleOrientation = (e: DeviceOrientationEvent) => {
            if (!e.beta || !e.gamma) return;
            // Beta: -180 to 180 (front/back tilt) -> Map approx -45 to 45
            // Gamma: -90 to 90 (left/right tilt) -> Map approx -45 to 45

            const y = Math.min(Math.max(e.gamma / 45, -0.5), 0.5); // side-to-side
            const x = Math.min(Math.max((e.beta - 45) / 45, -0.5), 0.5); // assume holding at 45deg

            mouseX.set(y);
            mouseY.set(x);
        };

        // Mouse Handler (Desktop)
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth) - 0.5;
            const y = (e.clientY / innerHeight) - 0.5;

            mouseX.set(x);
            mouseY.set(y);

            // Update spotlight absolute coords
            spotlightX.set(e.clientX);
            spotlightY.set(e.clientY);
        };

        window.addEventListener("deviceorientation", handleOrientation);
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("deviceorientation", handleOrientation);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY, spotlightX, spotlightY]);

    // Static Doodles that will repel from cursor (Physics)
    // We'll create a few random ones
    const doodles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // %
        y: Math.random() * 100, // %
        size: 20 + Math.random() * 30,
        Component: i % 2 === 0 ? HeartDoodle : StarDoodle,
    }));

    return (
        <div
            ref={containerRef}
            className={cn("relative w-full min-h-screen overflow-hidden perspectiva-1000", className)}
            style={{ perspective: "1000px" }}
        >
            {/* 3D Tilt Container */}
            <motion.div
                className="relative w-full min-h-screen transform-style-3d bg-background"
                style={{
                    rotateX: enableTilt ? rotateX : 0,
                    rotateY: enableTilt ? rotateY : 0,
                }}
            >

                {/* Spotlight Overlay */}
                <motion.div
                    className="absolute inset-0 pointer-events-none z-20 mix-blend-soft-light"
                    style={{
                        background: `radial-gradient(circle 300px at ${spotlightX.get()}px ${spotlightY.get()}px, rgba(255,255,255,0.4), transparent 80%)`
                    }}
                />

                {/* Repulsive Doodles Layer */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    {doodles.map((d) => (
                        <PhysicsDoodle
                            key={d.id}
                            {...d}
                            mouseX={spotlightX} // Use exact pixel coords shared with spotlight
                            mouseY={spotlightY}
                        />
                    ))}
                </div>

                {/* Main Content */}
                <div className="relative z-10 transform-style-3d">
                    {children}
                </div>

            </motion.div>
        </div>
    );
};

// Sub-component for individual repulsive doodles
const PhysicsDoodle = ({ x, y, size, Component, mouseX, mouseY }: any) => {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // Simple poll-based physics loop for this element (lightweight)
    useEffect(() => {
        const interval = setInterval(() => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const mx = mouseX.get();
            const my = mouseY.get();

            const dx = centerX - mx;
            const dy = centerY - my;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
                // Repel
                const force = (150 - dist) / 10;
                const angle = Math.atan2(dy, dx);
                setOffset(prev => ({
                    x: prev.x + Math.cos(angle) * force,
                    y: prev.y + Math.sin(angle) * force
                }));
            } else {
                // Return to origin slowly
                setOffset(prev => ({
                    x: prev.x * 0.95,
                    y: prev.y * 0.95
                }));
            }
        }, 50);
        return () => clearInterval(interval);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            ref={ref}
            className="absolute opacity-20"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                x: offset.x,
                y: offset.y
            }}
        >
            <Component size={size} variant="outline" />
        </motion.div>
    );
}
