import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { FloatingDoodles } from "@/components/doodles/FloatingDoodles";
import { AudioToggle } from "@/components/AudioToggle";
import { EntryScene } from "@/components/scenes/EntryScene";
import { BuildUpScene } from "@/components/scenes/BuildUpScene";
import { TeaseScene } from "@/components/scenes/TeaseScene";
import { AskScene } from "@/components/scenes/AskScene";
import { CelebrationScene } from "@/components/scenes/CelebrationScene";

type Scene = "entry" | "buildup" | "tease" | "ask" | "celebration";

// Personalization data - can be customized
const RECIPIENT_NAME = "My Love";
const SENDER_NAME = "Your Secret Admirer";

const Index = () => {
  const [currentScene, setCurrentScene] = useState<Scene>("entry");
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const goToNextScene = useCallback((nextScene: Scene) => {
    setCurrentScene(nextScene);
  }, []);

  const toggleAudio = useCallback(() => {
    setIsAudioPlaying(prev => !prev);
  }, []);

  // Handle audio playback with fade-in
  useEffect(() => {
    if (!audioRef.current) return;

    if (isAudioPlaying) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(() => {
        console.log("Audio autoplay was blocked");
      });

      // Gentle fade-in over 3 seconds
      let startTime = Date.now();
      const fadeInDuration = 3000;
      const targetVolume = 0.5;

      const fadeIn = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / fadeInDuration, 1);
        if (audioRef.current) {
          audioRef.current.volume = progress * targetVolume;
        }
        if (progress < 1) {
          requestAnimationFrame(fadeIn);
        }
      };
      fadeIn();
    } else {
      audioRef.current.pause();
    }
  }, [isAudioPlaying]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        loop
        src="/music/Stephen Sanchez - Until I Found You (Official Video) - StephenSanchezVEVO (1).mp3"
        crossOrigin="anonymous"
      />

      {/* Background floating doodles - now on top of paper backgrounds */}
      <FloatingDoodles 
        density={currentScene === "celebration" ? "heavy" : "medium"} 
      />

      {/* Audio toggle */}
      <AudioToggle isPlaying={isAudioPlaying} onToggle={toggleAudio} />

      {/* Scene content */}
      <AnimatePresence mode="wait">
        {currentScene === "entry" && (
          <EntryScene
            key="entry"
            recipientName={RECIPIENT_NAME}
            onContinue={() => goToNextScene("buildup")}
          />
        )}

        {currentScene === "buildup" && (
          <BuildUpScene
            key="buildup"
            recipientName={RECIPIENT_NAME}
            senderName={SENDER_NAME}
            onContinue={() => goToNextScene("tease")}
          />
        )}

        {currentScene === "tease" && (
          <TeaseScene
            key="tease"
            onContinue={() => goToNextScene("ask")}
          />
        )}

        {currentScene === "ask" && (
          <AskScene
            key="ask"
            recipientName={RECIPIENT_NAME}
            onYes={() => goToNextScene("celebration")}
          />
        )}

        {currentScene === "celebration" && (
          <CelebrationScene
            key="celebration"
            recipientName={RECIPIENT_NAME}
            senderName={SENDER_NAME}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
