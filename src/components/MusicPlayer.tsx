import React, { useEffect, useRef, useState } from 'react';

interface MusicPlayerProps {
  playTriggered: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ playTriggered }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  // Send control commands to the YouTube iframe API
  const sendPlayerCommand = (func: string, args: any[] = []) => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func,
          args
        }),
        '*'
      );
    }
  };

  // Auto-play when trigger flips and iframe is ready
  useEffect(() => {
    if (playTriggered && isIframeLoaded) {
      // Small timeout to ensure YouTube player has initialized post-handshake
      setTimeout(() => {
        sendPlayerCommand('setVolume', [60]); // Medium background level
        sendPlayerCommand('playVideo');
      }, 500);
    }
  }, [playTriggered, isIframeLoaded]);

  const handleIframeLoad = () => {
    setIsIframeLoaded(true);
  };

  return (
    <div className="hidden">
      {/* Invisible YouTube Iframe with JS API enabled */}
      <iframe
        ref={iframeRef}
        src="https://www.youtube.com/embed/lgm3puP3tMA?enablejsapi=1&controls=0&loop=1&playlist=lgm3puP3tMA&autoplay=0&mute=0"
        className="w-0 h-0 opacity-0 pointer-events-none absolute"
        allow="autoplay"
        title="Wedding Background Music"
        onLoad={handleIframeLoad}
      />
    </div>
  );
};
