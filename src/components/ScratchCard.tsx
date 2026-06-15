import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles as SparklesIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ScratchCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Compact dimensions for mobile viewport compliance
    const width = 285;
    const height = 110;
    canvas.width = width;
    canvas.height = height;

    // Create a gorgeous gold metallic foil gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#AA7C11');
    gradient.addColorStop(0.2, '#D4AF37');
    gradient.addColorStop(0.4, '#F7E7A9');
    gradient.addColorStop(0.6, '#D4AF37');
    gradient.addColorStop(0.8, '#F7E7A9');
    gradient.addColorStop(1, '#AA7C11');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw borders on the foil
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(4, 4, width - 8, height - 8);

    ctx.strokeStyle = 'rgba(170, 124, 17, 0.5)';
    ctx.lineWidth = 1;
    ctx.strokeRect(7, 7, width - 14, height - 14);

    // Draw scratch text instruction on foil
    ctx.fillStyle = '#040913';
    ctx.font = '600 11px "Cinzel", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH WITH LOVE', width / 2, height / 2 - 10);

    ctx.fillStyle = '#0e1b2f';
    ctx.font = 'italic 10px "Playfair Display", serif';
    ctx.fillText('to reveal the date', width / 2, height / 2 + 10);
  }, []);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isRevealed) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    if (e.cancelable) {
      e.preventDefault();
    }

    const { x, y } = getCoordinates(e);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!canvas || !ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    const totalPixels = canvas.width * canvas.height;
    const percentage = Math.round((transparentPixels / totalPixels) * 100);
    setScratchProgress(percentage);

    if (percentage > 40 && !isRevealed) {
      setIsRevealed(true);
      triggerConfettiReveal();
    }
  };

  const triggerConfettiReveal = () => {
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#D4AF37', '#F7E7A9', '#FFFDF6', '#AA7C11']
    });
  };

  return (
    <div className="flex flex-col items-center my-3 px-2">
      <div className="flex items-center gap-1.5 mb-1.5 text-luxury-gold">
        <SparklesIcon className="w-3.5 h-3.5 animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium font-serif">
          Invitation Date
        </span>
        <SparklesIcon className="w-3.5 h-3.5 animate-pulse" />
      </div>

      <div 
        ref={containerRef}
        className="w-[285px] h-[110px] relative rounded-md overflow-hidden shadow-lg border border-luxury-gold/30 bg-[#050b15] select-none"
      >
        {/* Revealed date layout */}
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-b from-[#0c1c30] to-[#050b15] p-3">
          <div className="absolute inset-0 opacity-[0.02] pattern-overlay pointer-events-none" />
          <div className="absolute inset-1.5 border border-luxury-gold/25 pointer-events-none rounded" />
          
          <motion.span 
            initial={{ opacity: 0, y: 3 }}
            animate={isRevealed ? { opacity: 0.9, y: 0 } : { opacity: 0 }}
            className="text-luxury-gold text-[10px] tracking-[0.2em] uppercase font-serif"
          >
            Tuesday
          </motion.span>
          
          <motion.span 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0 }}
            transition={{ delay: 0.1, type: 'spring' }}
            className="text-gold-gradient text-2xl font-display font-bold my-1 text-shadow-gold"
          >
            26 July 2030
          </motion.span>
          
          <motion.span 
            initial={{ opacity: 0, y: -3 }}
            animate={isRevealed ? { opacity: 0.8, y: 0 } : { opacity: 0 }}
            className="text-luxury-ivory text-[10px] tracking-wider opacity-85 font-serif"
          >
            10:00 AM onwards
          </motion.span>
        </div>

        {/* Scratchable Canvas overlay */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.canvas
              ref={canvasRef}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              onMouseDown={handleStart}
              onMouseMove={draw}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={draw}
              onTouchEnd={handleEnd}
              className="absolute inset-0 z-30 scratch-canvas w-full h-full"
            />
          )}
        </AnimatePresence>
      </div>

      {!isRevealed && (
        <p className="text-[9px] text-luxury-ivoryDark/45 mt-1 tracking-widest uppercase italic">
          Scratched: {scratchProgress}%
        </p>
      )}
      {isRevealed && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[9px] text-luxury-gold mt-1 tracking-widest uppercase font-semibold font-serif"
        >
          Date Revealed!
        </motion.p>
      )}
    </div>
  );
};
