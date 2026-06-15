import React from 'react';
import { motion } from 'framer-motion';
import { ScratchCard } from './ScratchCard';
import { Mandala } from './Mandala';

export const InvitationCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="w-full max-w-[335px] md:max-w-[365px] mx-auto bg-gradient-to-b from-[#0c1b30] to-[#050b15] p-5 rounded-lg shadow-[0_15px_40px_rgba(0,0,0,0.85)] border border-luxury-gold/30 relative overflow-hidden luxury-border-frame flex flex-col justify-between my-2 min-h-[500px]"
    >
      <div className="absolute inset-0 opacity-[0.03] pattern-overlay pointer-events-none rounded-lg" />

      {/* Top Overlapping Golden Mandala - Large & Cropped */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 pointer-events-none z-10 opacity-90">
        <Mandala className="w-full h-full" />
      </div>

      {/* Card Content Area */}
      <div className="relative z-20 flex flex-col items-center text-center pt-36 pb-2 px-1">
        
        <p className="text-luxury-gold font-display text-[12px] uppercase tracking-[0.3em] mb-1.5 font-semibold text-shadow-gold">
          SAVE THE DATE
        </p>

        <p className="text-[9px] text-luxury-gold/85 italic font-serif tracking-wider mb-3">
          By the Grace of Almighty Allah
        </p>

        <p className="text-luxury-ivoryDark text-[9px] tracking-[0.2em] mb-4 uppercase opacity-80">
          FOR THE WEDDING OF
        </p>
        
        {/* Bride & Groom Name Calligraphy */}
        <div className="my-2 flex flex-col items-center">
          <h2 className="font-cursive text-5xl md:text-6xl text-gold-gradient text-shadow-gold tracking-wide leading-none py-1">
            Sarim & Unknow
          </h2>
        </div>

        {/* Divider line */}
        <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-luxury-gold/60 to-transparent my-3" />

        {/* Embedded Scratch Card */}
        <ScratchCard />

        {/* Bottom request text / quote */}
        <p className="text-luxury-ivoryDark text-[9px] opacity-75 tracking-wider mt-3 max-w-[240px] font-serif leading-relaxed italic">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
        </p>
      </div>
    </motion.div>
  );
};
