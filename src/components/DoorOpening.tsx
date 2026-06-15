import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mandala } from './Mandala';

interface DoorOpeningProps {
  onOpenStart?: () => void;
  onOpen: () => void;
}

export const DoorOpening: React.FC<DoorOpeningProps> = ({ onOpenStart, onOpen }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenDoors = () => {
    if (isOpened) return;
    if (onOpenStart) {
      onOpenStart();
    }
    setIsOpened(true);
    
    // Trigger golden confetti explosion
    setTimeout(() => {
      const duration = 1.5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: ['#D4AF37', '#F7E7A9', '#FFFDF6', '#AA7C11']
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: ['#D4AF37', '#F7E7A9', '#FFFDF6', '#AA7C11']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }, 450);

    setTimeout(() => {
      onOpen();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-royal-black flex flex-col justify-between items-center py-12 px-6">
      
      {/* Background glowing halo behind doors */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute inset-0 opacity-[0.03] pattern-overlay pointer-events-none z-0" />

      {/* Top Calligraphy Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="text-center z-20 mt-4"
      >
        <span className="text-luxury-gold text-3.5xl md:text-4.5xl font-semibold tracking-wide block font-serif text-shadow-gold select-none">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </span>
      </motion.div>

      {/* 3D Realistic Double Doors container */}
      <div 
        onClick={handleOpenDoors}
        className="w-full max-w-[340px] md:max-w-[390px] h-[55vh] relative perspective-1000 preserve-3d cursor-pointer group z-20 my-6 rounded-lg shadow-[0_25px_60px_rgba(0,0,0,0.95)] border border-luxury-gold/25 overflow-hidden"
      >
        {/* Left Door Half */}
        <motion.div
          animate={isOpened ? { rotateY: -120 } : { rotateY: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
          className="absolute left-0 top-0 w-1/2 h-full origin-left preserve-3d backface-hidden border-r border-luxury-gold/50 bg-gradient-to-r from-royal-dark to-royal-navy overflow-hidden"
          style={{
            boxShadow: '-10px 10px 30px rgba(0,0,0,0.7)'
          }}
        >
          {/* Inner frame overlay */}
          <div className="absolute inset-y-2 left-2 right-0 border-y border-l border-luxury-gold/30 rounded-l pointer-events-none z-5" />
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-luxury-gold/80 pointer-events-none z-5" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-luxury-gold/80 pointer-events-none z-5" />
          
          {/* Vertical centering flexbox container */}
          <div className="absolute inset-0 flex items-center justify-end z-10 pointer-events-none">
            {/* Left Mandala Half - positioned absolute to overlay on the seam */}
            <div className="absolute right-0 w-44 h-44 md:w-52 md:h-52 translate-x-1/2">
              <Mandala className="w-full h-full" />
            </div>
            
            {/* Left Handle half */}
            <div className="w-4.5 h-9 border-y border-l border-luxury-gold/90 bg-royal-dark rounded-l-full flex items-center justify-end pr-0.5 shadow-gold-glow group-hover:scale-105 transition-transform duration-300 pointer-events-auto z-20">
              <div className="w-2.5 h-2.5 rounded-full bg-gold-gradient shadow-inner" />
            </div>
          </div>
        </motion.div>

        {/* Right Door Half */}
        <motion.div
          animate={isOpened ? { rotateY: 120 } : { rotateY: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
          className="absolute right-0 top-0 w-1/2 h-full origin-right preserve-3d backface-hidden border-l border-luxury-gold/50 bg-gradient-to-l from-royal-dark to-royal-navy overflow-hidden"
          style={{
            boxShadow: '10px 10px 30px rgba(0,0,0,0.7)'
          }}
        >
          {/* Inner frame overlay */}
          <div className="absolute inset-y-2 right-2 left-0 border-y border-r border-luxury-gold/30 rounded-r pointer-events-none z-5" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-luxury-gold/80 pointer-events-none z-5" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-luxury-gold/80 pointer-events-none z-5" />

          {/* Vertical centering flexbox container */}
          <div className="absolute inset-0 flex items-center justify-start z-10 pointer-events-none">
            {/* Right Mandala Half - positioned absolute to overlay on the seam */}
            <div className="absolute left-0 w-44 h-44 md:w-52 md:h-52 -translate-x-1/2">
              <Mandala className="w-full h-full" />
            </div>
            
            {/* Right Handle half */}
            <div className="w-4.5 h-9 border-y border-r border-luxury-gold/90 bg-royal-dark rounded-r-full flex items-center justify-start pl-0.5 shadow-gold-glow group-hover:scale-105 transition-transform duration-300 pointer-events-auto z-20">
              <div className="w-2.5 h-2.5 rounded-full bg-gold-gradient shadow-inner" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
        className="text-center z-20 mb-4"
      >
        <button
          onClick={handleOpenDoors}
          className="px-8 py-3 rounded-full border border-luxury-gold bg-royal-dark/95 text-luxury-gold font-serif text-sm tracking-[0.25em] uppercase hover:bg-luxury-gold hover:text-royal-black transition-all duration-300 shadow-gold-glow animate-pulse-slow font-semibold relative overflow-hidden active:scale-95"
        >
          {isOpened ? "Opening..." : "Tap to Open"}
        </button>
      </motion.div>

    </div>
  );
};
