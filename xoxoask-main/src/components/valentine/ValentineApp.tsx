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

import { InteractiveBackground } from "@/components/effects/InteractiveBackground";
import { CursorEffects } from "@/components/effects/CursorEffects";

export const ValentineApp = ({
  recipientName = "My Love",
  senderName = "Your Secret Admirer"
}: ValentineAppProps) => {
  const [currentScene, setCurrentScene] = useState<Scene>("entry");
  // Audio logic removed - handled globally by MusicPlayer component

  const handleSceneTransition = (nextScene: Scene) => {
    setCurrentScene(nextScene);
  };

  return (
    <InteractiveBackground>
      <CursorEffects />
      <div className="relative min-h-screen overflow-hidden valentine-scrollbar">
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
    </InteractiveBackground>
  );
};
