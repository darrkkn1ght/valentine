import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartDoodle } from "../doodles/HeartDoodle";

interface Point {
    id: number;
    x: number;
    y: number;
    rotation: number;
    variant: 1 | 2 | 3;
}

export const CursorEffects = () => {
    const [trail, setTrail] = useState<Point[]>([]);
    const [bursts, setBursts] = useState<Point[]>([]);

    // Trail Logic
    useEffect(() => {
        let lastPointTime = 0;

        const handleMove = (e: MouseEvent | TouchEvent) => {
            const now = Date.now();
            if (now - lastPointTime < 50) return; // Throttle to 50ms

            const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const y = 'touches' in e ? e.touches[0].clientY : e.clientY;

            const newPoint: Point = {
                id: now,
                x,
                y,
                rotation: Math.random() * 360,
                variant: Math.random() > 0.5 ? 1 : 2,
            };

            setTrail(prev => [...prev.slice(-20), newPoint]); // Keep last 20
            lastPointTime = now;
        };

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("touchmove", handleMove);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("touchmove", handleMove);
        };
    }, []);

    // Click Burst Logic
    const handleBurst = useCallback((e: MouseEvent | TouchEvent) => {
        const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const burstId = Date.now();

        const newBursts = Array.from({ length: 8 }).map((_, i) => ({
            id: burstId + i,
            x,
            y,
            rotation: Math.random() * 360,
            variant: 1 as const, // Casting for simplicity
        }));

        setBursts(prev => [...prev, ...newBursts]);

        // Cleanup burst after animation
        setTimeout(() => {
            setBursts(prev => prev.filter(b => b.id < burstId));
        }, 1000);
    }, []);

    useEffect(() => {
        window.addEventListener("click", handleBurst);
        window.addEventListener("touchstart", handleBurst);
        return () => {
            window.removeEventListener("click", handleBurst);
            window.removeEventListener("touchstart", handleBurst);
        };
    }, [handleBurst]);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            <AnimatePresence>
                {/* Trail */}
                {trail.map((point) => (
                    <motion.div
                        key={`trail-${point.id}`}
                        initial={{ opacity: 0.8, scale: 0.5 }}
                        animate={{ opacity: 0, scale: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute"
                        style={{
                            left: point.x,
                            top: point.y,
                            transform: `rotate(${point.rotation}deg)`
                        }}
                    >
                        <HeartDoodle size={16} variant={point.variant === 1 ? "filled" : "outline"} className="text-primary/40" />
                    </motion.div>
                ))}

                {/* Bursts */}
                {bursts.map((particle, i) => (
                    <motion.div
                        key={`burst-${particle.id}`}
                        initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                        animate={{
                            x: (Math.random() - 0.5) * 200,
                            y: (Math.random() - 0.5) * 200,
                            opacity: 0,
                            scale: 0
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute"
                        style={{
                            left: particle.x,
                            top: particle.y,
                        }}
                    >
                        <HeartDoodle size={24} variant="filled" className="text-love-red" />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
