import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, MessageCircle, Users } from 'lucide-react';
import { Mandala } from './Mandala';

interface ContactPerson {
  name: string;
  relation: string;
  phone: string;
}

export const Hosts: React.FC = () => {
  const contacts: ContactPerson[] = [
    {
      name: "Huzaifa ",
      relation: "Groom's Friend",
      phone: "+12025550143"
    },
    {
      name: "Someone",
      relation: "Bride's Friend",
      phone: "+12025550198"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="w-full max-w-[335px] md:max-w-[365px] mx-auto bg-gradient-to-b from-[#0c1b30] to-[#050b15] p-4 rounded-lg border border-luxury-gold/30 shadow-[0_15px_40px_rgba(0,0,0,0.85)] relative overflow-visible text-center my-2"
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

      {/* Main Content Area */}
      <div className="pt-6 pb-2">
        {/* Section 1: Inviting Families */}
        <div className="flex items-center justify-center gap-1.5 mb-3">
          <Users className="w-4 h-4 text-luxury-gold" />
          <h3 className="font-display text-md text-gold-gradient tracking-widest font-semibold uppercase">
            Inviting Families
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center mb-4 relative">
          {/* Central separator */}
          <div className="absolute left-1/2 top-1 bottom-1 w-[1px] bg-gradient-to-b from-transparent via-luxury-gold/25 to-transparent" />
          
          {/* Bride's Side */}
          <div className="px-1">
            <span className="text-[8px] text-luxury-gold tracking-widest uppercase block mb-0.5 font-serif opacity-75">
              Bride's Family
            </span>
            <h4 className="font-serif text-[11px] text-luxury-ivory font-bold">
              Mr. & Mrs. yet to be known
            </h4>
            <p className="text-[8px] text-luxury-ivoryDark/60 font-serif">
              & Family
            </p>
          </div>

          {/* Groom's Side */}
          <div className="px-1">
            <span className="text-[8px] text-luxury-gold tracking-widest uppercase block mb-0.5 font-serif opacity-75">
              Groom's Family
            </span>
            <h4 className="font-serif text-[11px] text-luxury-ivory font-bold">
              Mr. & Mrs. Misbahuddin 
            </h4>
            <p className="text-[8px] text-luxury-ivoryDark/60 font-serif">
              & Family
            </p>
          </div>
        </div>

        {/* Section 2: Contact Queries */}
        <div className="border-t border-luxury-gold/15 pt-3.5 mt-2">
          <h4 className="font-display text-[9px] text-luxury-gold tracking-[0.25em] uppercase mb-2">
            For Queries & Information
          </h4>
          
          <div className="space-y-2 max-w-[290px] mx-auto">
            {contacts.map((contact, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-1.5 px-2.5 rounded bg-[#050b15]/55 border border-luxury-gold/10 hover:border-luxury-gold/20 transition-all duration-300"
              >
                <div className="text-left">
                  <h5 className="font-serif text-[10px] text-luxury-ivory font-bold">
                    {contact.name}
                  </h5>
                  <p className="text-[8px] text-luxury-ivoryDark/60 font-serif">
                    {contact.relation}
                  </p>
                </div>
                
                <div className="flex gap-1.5">
                  <a
                    href={`tel:${contact.phone}`}
                    className="w-6.5 h-6.5 rounded-full flex items-center justify-center bg-gold-gradient text-royal-black shadow hover:scale-105 active:scale-95 transition-transform"
                    title={`Call ${contact.name}`}
                  >
                    <PhoneCall className="w-2.5 h-2.5" />
                  </a>

                  <a
                    href={`https://wa.me/${contact.phone.replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-6.5 h-6.5 rounded-full flex items-center justify-center bg-green-700 text-white shadow hover:scale-105 active:scale-95 transition-transform"
                    title={`WhatsApp ${contact.name}`}
                  >
                    <MessageCircle className="w-2.5 h-2.5 fill-current" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Overlapping Golden Mandala */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 pointer-events-none z-10">
        <Mandala className="w-full h-full rotate-180" />
      </div>
    </motion.div>
  );
};
