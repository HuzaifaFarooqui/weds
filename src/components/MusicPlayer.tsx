import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ audioRef }) => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-40 w-9 h-9 rounded-full bg-gold-gradient text-royal-black shadow-[0_4px_12px_rgba(0,0,0,0.4)] flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-gold-glow"
      title={isMuted ? "Unmute Music" : "Mute Music"}
    >
      {isMuted ? (
        <VolumeX className="w-4 h-4" />
      ) : (
        <Volume2 className="w-4 h-4 animate-[spin_8s_linear_infinite]" />
      )}
    </button>
  );
};
