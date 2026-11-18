import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SALON_CONFIG } from '@/src/config/salonConfig';

interface CinematicLoaderProps {
  reducedMotion: boolean;
  onComplete: () => void;
}

export function CinematicLoader({ reducedMotion, onComplete }: CinematicLoaderProps) {
  const [visible, setVisible] = useState(!reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(false);
      onComplete();
      return;
    }

    const timer = window.setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [reducedMotion, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FDF9F7] px-6 text-center"
          aria-live="polite"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <span className="font-display text-4xl tracking-[0.28em] text-[#2D1E24] sm:text-5xl">
              {SALON_CONFIG.brand.name}
            </span>
            <span className="mt-2 text-xs tracking-[0.34em] text-[#8F4E61]">
              {SALON_CONFIG.brand.subtitle}
            </span>
            <div className="mt-8 h-[1px] w-44 overflow-hidden bg-[#EBD5DD]">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full rose-gold-gradient"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
