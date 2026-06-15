import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, MessageCircle } from 'lucide-react';

interface ContactPerson {
  name: string;
  relation: string;
  phone: string;
  displayPhone: string;
}

export const Contact: React.FC = () => {
  const contacts: ContactPerson[] = [
    {
      name: "David Smith",
      relation: "Groom's Brother",
      phone: "+12025550143",
      displayPhone: "+1 (202) 555-0143"
    },
    {
      name: "Elena Rosario",
      relation: "Bride's Sister",
      phone: "+12025550198",
      displayPhone: "+1 (202) 555-0198"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="w-full max-w-[335px] md:max-w-[365px] mx-auto bg-gradient-to-b from-[#0c1b30] to-[#050b15] p-3.5 rounded-lg border border-luxury-gold/30 shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative text-center my-2"
    >
      <div className="absolute inset-0 opacity-[0.02] pattern-overlay pointer-events-none" />

      {/* Header */}
      <h3 className="font-display text-[10px] text-luxury-goldLight tracking-[0.25em] uppercase mb-2.5">
        For Queries & Information
      </h3>

      <div className="space-y-2.5">
        {contacts.map((contact, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-2 px-3 rounded bg-[#050b15]/55 border border-luxury-gold/10 hover:border-luxury-gold/30 transition-all duration-300"
          >
            <div className="text-left">
              <h4 className="font-serif text-[11px] text-luxury-ivory font-bold">
                {contact.name}
              </h4>
              <p className="text-[9px] text-luxury-ivoryDark/60 font-serif">
                {contact.relation}
              </p>
            </div>
            
            <div className="flex gap-2">
              {/* Tap to Call */}
              <a
                href={`tel:${contact.phone}`}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-gold-gradient text-royal-black shadow hover:scale-110 active:scale-95 transition-transform"
                title={`Call ${contact.name}`}
              >
                <PhoneCall className="w-3 h-3" />
              </a>

              {/* WhatsApp direct link */}
              <a
                href={`https://wa.me/${contact.phone.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full flex items-center justify-center bg-green-700 text-white shadow hover:scale-110 active:scale-95 transition-transform"
                title={`WhatsApp ${contact.name}`}
              >
                <MessageCircle className="w-3 h-3 fill-current" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </motion.div>
  );
};
