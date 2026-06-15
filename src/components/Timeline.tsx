import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Utensils, Star, Users, CalendarDays } from 'lucide-react';
import { Mandala } from './Mandala';

interface TimelineEvent {
  title: string;
  time: string;
  date: string;
  description: string;
  icon: React.ReactNode;
}

export const Timeline: React.FC = () => {
  const events: TimelineEvent[] = [
    {
      title: "Barat Arrival",
      time: "8:00 PM",
      date: "Tuesday, 26 July 2030",
      description: "Welcoming the groom and his family with warmth and tradition.",
      icon: <Users className="w-3.5 h-3.5" />
    },
    {
      title: "Nikah Ceremony",
      time: "9:00 PM",
      date: "Tuesday, 26 July 2030",
      description: "The solemnization of the marriage contract in the presence of loved ones.",
      icon: <Heart className="w-3.5 h-3.5 fill-current" />
    },
    {
      title: "Wedding Dinner",
      time: "10:00 PM",
      date: "Tuesday, 26 July 2030",
      description: "A traditional festive feast to celebrate the union of two families.",
      icon: <Utensils className="w-3.5 h-3.5" />
    },
    {
      title: "Rukhsati",
      time: "11:00 PM",
      date: "Tuesday, 26 July 2030",
      description: "An emotional send-off as the bride departs for her new home.",
      icon: <Star className="w-3.5 h-3.5 fill-current" />
    }
  ];

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

      {/* Section Title */}
      <div className="flex flex-col items-center mb-4 text-center pt-6">
        <div className="flex items-center gap-1.5 mb-1 text-luxury-gold">
          <CalendarDays className="w-4 h-4" />
          <h3 className="font-display text-md text-gold-gradient tracking-widest font-semibold uppercase">
            Itinerary
          </h3>
        </div>
        <p className="text-[9px] text-luxury-ivoryDark/60 tracking-widest uppercase">
          Timeline of Blessed Ceremonies
        </p>
      </div>

      {/* Vertical Timeline container */}
      <div className="relative border-l border-luxury-gold/25 ml-2.5 pl-4 space-y-3 py-1 pb-4">
        <div className="absolute left-[-1px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-luxury-gold/50 to-transparent opacity-80" />

        {events.map((event, index) => (
          <div key={index} className="relative">
            <span className="absolute -left-[27px] top-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-[#050b15] border border-luxury-gold/80 shadow-gold-glow text-luxury-gold">
              {event.icon}
            </span>

            <div className="bg-[#050b15]/40 border border-luxury-gold/15 p-2 px-3 rounded shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-baseline gap-1 mb-0.5">
                <h4 className="font-display text-[11px] text-luxury-goldLight font-bold uppercase tracking-wider">
                  {event.title}
                </h4>
                <div className="text-[8px] text-luxury-gold font-bold uppercase bg-[#050b15] border border-luxury-gold/25 px-1.5 py-0.5 rounded">
                  {event.time}
                </div>
              </div>

              <p className="text-[8px] text-luxury-ivoryDark/80 font-serif mb-1 italic">
                {event.date}
              </p>

              <p className="text-luxury-ivory/80 text-[10px] leading-relaxed font-serif">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Overlapping Golden Mandala */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 pointer-events-none z-10">
        <Mandala className="w-full h-full rotate-180" />
      </div>
    </motion.div>
  );
};
