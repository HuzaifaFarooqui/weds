import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from './components/Sparkles';
import { MusicPlayer } from './components/MusicPlayer';
import { DoorOpening } from './components/DoorOpening';
import { InvitationCard } from './components/InvitationCard';
import { Venue } from './components/Venue';
import { Timeline } from './components/Timeline';
import { Hosts } from './components/Hosts';

function App() {
  const [doorsOpened, setDoorsOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleOpenStart = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.65;
      audioRef.current.play().catch(err => {
        console.log("Audio failed to play synchronously:", err);
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-royal-black text-luxury-ivory overflow-hidden selection:bg-luxury-gold selection:text-royal-black w-full">
      
      {/* Background audio player (HTML5 Audio tag) */}
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        preload="auto"
      />

      {/* Floating mute controller */}
      {doorsOpened && <MusicPlayer audioRef={audioRef} />}

      <AnimatePresence mode="wait">
        {!doorsOpened ? (
          <motion.div
            key="doors"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-45"
          >
            <DoorOpening 
              onOpenStart={handleOpenStart}
              onOpen={() => setDoorsOpened(true)} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-[100dvh] overflow-y-scroll snap-y snap-mandatory no-scrollbar relative bg-royal-black scroll-smooth"
          >
            {/* Ambient golden dust sparkles floating in the background */}
            <Sparkles />
            
            {/* Islamic wallpaper motif overlay */}
            <div className="absolute inset-0 opacity-[0.03] pattern-overlay pointer-events-none z-0" />

            {/* Mobile luxury border frame overlay */}
            <div className="fixed inset-3 border border-luxury-gold/15 pointer-events-none z-30 rounded-lg" />
            <div className="fixed inset-4 border border-luxury-gold/30 pointer-events-none z-30 rounded-lg" />

            {/* Slide 1: Invitation & Date Reveal */}
            <section className="h-[100dvh] w-full snap-start flex flex-col justify-center items-center py-4 px-4 relative z-10 overflow-hidden">
              <InvitationCard />
            </section>

            {/* Slide 2: Venue and Directions */}
            <section className="h-[100dvh] w-full snap-start flex flex-col justify-center items-center py-4 px-4 relative z-10 overflow-hidden">
              <Venue />
            </section>

            {/* Slide 3: Wedding Itinerary Timeline */}
            <section className="h-[100dvh] w-full snap-start flex flex-col justify-center items-center py-4 px-4 relative z-10 overflow-hidden">
              <Timeline />
            </section>

            {/* Slide 4: Inviting Families & Contacts */}
            <section className="h-[100dvh] w-full snap-start flex flex-col justify-center items-center py-4 px-4 relative z-10 overflow-hidden">
              <div className="w-full flex flex-col justify-center items-center gap-3 max-h-[90vh] overflow-y-auto no-scrollbar py-2">
                <Hosts />
                
                {/* Invitation Footer details */}
                <footer className="text-center mt-2 font-serif text-[8px] uppercase tracking-[0.25em] text-luxury-goldLight opacity-80 pb-2">
                  <p>No Boxed Gifts Please</p>
                  <p className="mt-0.5 text-luxury-ivoryDark/50">Only Your Prayers & Presence</p>
                </footer>
              </div>
            </section>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
