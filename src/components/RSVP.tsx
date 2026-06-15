import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, User, Users, ClipboardCheck } from 'lucide-react';
import { Mandala } from './Mandala';

interface RsvpData {
  name: string;
  attending: string; // 'yes' | 'no'
  guests: number;
  message: string;
}

export const RSVP: React.FC = () => {
  const [formData, setFormData] = useState<RsvpData>({
    name: '',
    attending: 'yes',
    guests: 1,
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('wedding_rsvp_submitted');
    if (saved) {
      setSubmitted(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    localStorage.setItem('wedding_rsvp_submitted', 'true');
    localStorage.setItem('wedding_rsvp_details', JSON.stringify(formData));
    setSubmitted(true);
  };

  const handleReset = () => {
    localStorage.removeItem('wedding_rsvp_submitted');
    localStorage.removeItem('wedding_rsvp_details');
    setSubmitted(false);
    setFormData({
      name: '',
      attending: 'yes',
      guests: 1,
      message: ''
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="w-full max-w-[335px] md:max-w-[365px] mx-auto bg-gradient-to-b from-[#0c1b30] to-[#050b15] p-4 rounded-lg border border-luxury-gold/30 shadow-[0_15px_40px_rgba(0,0,0,0.85)] relative overflow-visible my-2"
    >
      <div className="absolute inset-0 opacity-[0.02] pattern-overlay pointer-events-none rounded-lg" />
      
      {/* Top Overlapping Golden Mandala */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 pointer-events-none z-10">
        <Mandala className="w-full h-full" />
      </div>

      {/* Decorative inner frame */}
      <div className="absolute inset-1.5 border border-luxury-gold/15 rounded pointer-events-none" />

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="rsvp-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 pt-6 pb-2"
          >
            <div className="flex flex-col items-center mb-4 text-center">
              <ClipboardCheck className="w-4 h-4 text-luxury-gold mb-1" />
              <h3 className="font-display text-md text-gold-gradient tracking-widest font-semibold uppercase">
                RSVP Confirmation
              </h3>
              <p className="text-[9px] text-luxury-ivoryDark/60 tracking-wider uppercase mt-0.5">
                Please respond by July 10, 2030
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
              {/* Guest Name */}
              <div>
                <label className="block text-[9px] text-luxury-gold uppercase tracking-widest mb-1 font-semibold font-serif">
                  Your Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-luxury-gold/50 pointer-events-none">
                    <User className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full pl-8 pr-2.5 py-1.5 bg-[#050b15]/70 border border-luxury-gold/20 rounded text-[11px] text-luxury-ivory placeholder-luxury-ivoryDark/35 focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all duration-300"
                  />
                </div>
              </div>

              {/* Attendance Toggle */}
              <div>
                <label className="block text-[9px] text-luxury-gold uppercase tracking-widest mb-1 font-semibold font-serif">
                  Will you attend?
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: 'yes' })}
                    className={`py-1.5 rounded border text-[10px] tracking-wider uppercase font-semibold transition-all duration-300 ${
                      formData.attending === 'yes'
                        ? 'bg-gold-gradient text-royal-black border-luxury-gold font-bold shadow-gold-glow'
                        : 'bg-[#050b15]/40 text-luxury-ivory/60 border-luxury-gold/20'
                    }`}
                  >
                    Attending
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: 'no', guests: 0 })}
                    className={`py-1.5 rounded border text-[10px] tracking-wider uppercase font-semibold transition-all duration-300 ${
                      formData.attending === 'no'
                        ? 'bg-gold-gradient text-royal-black border-luxury-gold font-bold shadow-gold-glow'
                        : 'bg-[#050b15]/40 text-luxury-ivory/60 border-luxury-gold/20'
                    }`}
                  >
                    Regretfully No
                  </button>
                </div>
              </div>

              {/* Number of Guests */}
              {formData.attending === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <label className="block text-[9px] text-luxury-gold uppercase tracking-widest mb-1 font-semibold font-serif">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-luxury-gold/50 pointer-events-none">
                      <Users className="w-3.5 h-3.5" />
                    </span>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                      className="w-full pl-8 pr-2.5 py-1.5 bg-[#050b15]/70 border border-luxury-gold/20 rounded text-[11px] text-luxury-ivory focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all duration-300 appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num} className="bg-[#0c1b30] text-luxury-ivory">
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}

              {/* Message */}
              <div>
                <label className="block text-[9px] text-luxury-gold uppercase tracking-widest mb-1 font-semibold font-serif">
                  Wishes & Messages
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Send your prayers & wishes..."
                  rows={2}
                  className="w-full px-2.5 py-1.5 bg-[#050b15]/70 border border-luxury-gold/20 rounded text-[11px] text-luxury-ivory placeholder-luxury-ivoryDark/35 focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-2.5 mt-1 rounded bg-gold-gradient hover:bg-gold-gradient-soft text-royal-black font-bold text-[10px] tracking-widest uppercase transition-all duration-300 hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98]"
              >
                Send RSVP Response
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="rsvp-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 text-center pt-6 pb-2 flex flex-col items-center"
          >
            <CheckCircle2 className="w-10 h-10 text-luxury-gold mb-3 animate-[bounce_1s_infinite_alternate]" />
            <h3 className="font-display text-md text-gold-gradient font-bold uppercase tracking-widest mb-1.5">
              Response Submitted!
            </h3>
            
            <div className="w-12 h-[1px] bg-luxury-gold/30 my-3" />
            
            <p className="text-luxury-ivory text-[10px] max-w-[240px] leading-relaxed mb-4 font-serif">
              Thank you for your response. We look forward to celebrating with you!
            </p>

            <button
              onClick={handleReset}
              className="text-[9px] text-luxury-gold/60 underline tracking-widest uppercase hover:text-luxury-goldLight transition-colors"
            >
              Update RSVP Info
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Overlapping Golden Mandala */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 pointer-events-none z-10">
        <Mandala className="w-full h-full rotate-180" />
      </div>
    </motion.div>
  );
};
