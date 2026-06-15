import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export type MusicPlayerHandle = {
  play: () => void;
};

interface MusicPlayerProps {
  onReady?: () => void;
}

export const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(({ onReady }, ref) => {
  const playerRef = useRef<any>(null);
  const playRequestedRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Load YouTube Iframe API if not already present
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      // Define global callback
      (window as any).onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    function initPlayer() {
      playerRef.current = new (window as any).YT.Player('yt-player', {
        height: '10',
        width: '10',
        videoId: 'lgm3puP3tMA',
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: 'lgm3puP3tMA',
          mute: 0,
          playsinline: 1,
          rel: 0,
          showinfo: 0,
          modestbranding: 1
        },
        events: {
          onReady: () => {
            // Set initial volume to 75 (loud background level)
            if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
              playerRef.current.setVolume(75);
            }
            // If the user already tapped to open, play immediately
            if (playRequestedRef.current && playerRef.current && typeof playerRef.current.playVideo === 'function') {
              playerRef.current.playVideo();
            }
            if (onReady) {
              onReady();
            }
          },
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING is 1
            if (event.data === 1) {
              setIsPlaying(true);
            } else {
              setIsPlaying(false);
            }
          }
        }
      });
    }
  }, [onReady]);

  useImperativeHandle(ref, () => ({
    play: () => {
      playRequestedRef.current = true;
      if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
        playerRef.current.playVideo();
      }
    }
  }));

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  return (
    <>
      {/* Off-screen active container to prevent mobile browsers from suspending/blocking rendering */}
      <div 
        id="yt-player" 
        className="absolute top-[-999px] left-[-999px] w-[10px] h-[10px] opacity-0 pointer-events-none z-0" 
      />
      
      {/* Floating mute controller - displayed only after music begins playing */}
      {isPlaying && (
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
      )}
    </>
  );
});

MusicPlayer.displayName = 'MusicPlayer';
