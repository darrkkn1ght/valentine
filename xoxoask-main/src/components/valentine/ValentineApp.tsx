import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { AudioToggle } from "../AudioToggle";
import { EntryScene } from "./scenes/EntryScene";
import { BuildUpScene } from "./scenes/BuildUpScene";
import { TeaseScene } from "./scenes/TeaseScene";
import { AskScene } from "./scenes/AskScene";
import { CelebrationScene } from "./scenes/CelebrationScene";

type Scene = "entry" | "buildup" | "tease" | "ask" | "celebration" | "rejected";

interface ValentineAppProps {
  recipientName?: string;
  senderName?: string;
}

export const ValentineApp = ({ 
  recipientName = "My Love", 
  senderName = "Your Secret Admirer" 
}: ValentineAppProps) => {
  const [currentScene, setCurrentScene] = useState<Scene>("entry");
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSceneTransition = (nextScene: Scene) => {
    setCurrentScene(nextScene);
  };

  const toggleAudio = () => {
    setIsAudioPlaying(prev => !prev);
  };

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
    <div className="relative min-h-screen overflow-hidden valentine-scrollbar">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        loop
        src="/music/Stephen Sanchez - Until I Found You (Official Video) - StephenSanchezVEVO (1).mp3"
        crossOrigin="anonymous"
      />

      {/* Audio toggle button */}
      <AudioToggle isPlaying={isAudioPlaying} onToggle={toggleAudio} />

      <AnimatePresence mode="wait">
        {currentScene === "entry" && (
          <EntryScene
            key="entry"
            recipientName={recipientName}
            onContinue={() => handleSceneTransition("buildup")}
          />
        )}
        
        {currentScene === "buildup" && (
          <BuildUpScene
            key="buildup"
            recipientName={recipientName}
            onContinue={() => handleSceneTransition("tease")}
          />
        )}
        
        {currentScene === "tease" && (
          <TeaseScene
            key="tease"
            onContinue={() => handleSceneTransition("ask")}
          />
        )}
        
        {currentScene === "ask" && (
          <AskScene
            key="ask"
            recipientName={recipientName}
            senderName={senderName}
            onYes={() => handleSceneTransition("celebration")}
            onNo={() => handleSceneTransition("celebration")} // Even "no" leads to celebration after playful resistance
          />
        )}
        
        {currentScene === "celebration" && (
          <CelebrationScene
            key="celebration"
            recipientName={recipientName}
            senderName={senderName}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
