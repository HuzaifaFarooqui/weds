import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { Mandala } from './Mandala';

export const Venue: React.FC = () => {
  const mapSearchUrl = "https://maps.google.com/?q=The+Royal+Grand+Marquee+DHA+Phase+6+Lahore";
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.551381395893!2d74.45070217646194!3d31.481522874232333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919092671555555%3A0x6b3f94e9f5e1e1a5!2sDHA+Phase+6%2C+Lahore%2C+Punjab%2C+Pakistan!5e0!3m2!1sen!2s!4v1718465000000!5m2!1sen!2s";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="w-full max-w-[335px] md:max-w-[365px] mx-auto bg-gradient-to-b from-[#0c1b30] to-[#050b15] p-4 rounded-lg shadow-[0_15px_40px_rgba(0,0,0,0.85)] border border-luxury-gold/30 relative overflow-visible my-2"
    >
      <div className="absolute inset-0 opacity-[0.02] pattern-overlay pointer-events-none rounded-lg" />
      
      {/* Top Overlapping Golden Mandala */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 pointer-events-none z-10">
        <Mandala className="w-full h-full" />
      </div>

      {/* Decorative luxury corners */}
      <div className="absolute top-2 left-2 w-4.5 h-4.5 border-t border-l border-luxury-gold/50" />
      <div className="absolute top-2 right-2 w-4.5 h-4.5 border-t border-r border-luxury-gold/50" />
      <div className="absolute bottom-2 left-2 w-4.5 h-4.5 border-b border-l border-luxury-gold/50" />
      <div className="absolute bottom-2 right-2 w-4.5 h-4.5 border-b border-r border-luxury-gold/50" />

      <div className="relative z-10 flex flex-col items-center text-center pt-6 pb-2">
        
        {/* Section Header */}
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin className="w-4 h-4 text-luxury-gold" />
          <h3 className="font-display text-md text-gold-gradient tracking-widest font-semibold uppercase">
            The Venue
          </h3>
        </div>

        {/* Venue Image */}
        <div className="w-full h-32 rounded border border-luxury-gold/30 mb-2.5 shadow-md relative overflow-hidden group">
          <img 
            src="/venue.png" 
            alt="The Royal Grand Marquee" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-black/60 to-transparent" />
        </div>

        {/* Venue Info */}
        <h4 className="font-serif text-sm text-luxury-goldLight font-bold mb-0.5">
          The Royal Grand Marquee
        </h4>
        <p className="text-luxury-ivory text-[10px] max-w-[250px] leading-relaxed mb-3 opacity-80">
          Main Boulevard, Sector K, DHA Phase 6, Lahore, Punjab, Pakistan
        </p>

        {/* Embedded Map */}
        <div className="w-full h-32 rounded border border-luxury-gold/20 overflow-hidden mb-3.5 relative">
          <iframe 
            src={mapEmbedUrl}
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(100%) invert(90%) sepia(10%) hue-rotate(210deg) saturate(150%) contrast(100%)' }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
          />
        </div>

        {/* Direction Button */}
        <a 
          href={mapSearchUrl}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded bg-gold-gradient hover:bg-gold-gradient-soft text-royal-black font-semibold text-[10px] tracking-wider uppercase transition-all duration-300 hover:shadow-gold-glow hover:scale-105 active:scale-95"
        >
          <Navigation className="w-3 h-3 fill-current" />
          Open in Google Maps
        </a>

      </div>

      {/* Bottom Overlapping Golden Mandala */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 pointer-events-none z-10">
        <Mandala className="w-full h-full rotate-180" />
      </div>
    </motion.div>
  );
};
