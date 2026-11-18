import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { SALON_CONFIG } from '@/src/config/salonConfig';

interface HeroSectionProps {
  onEnterWorld: () => void;
  reducedMotion: boolean;
}

export function HeroSection({ onEnterWorld, reducedMotion }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen flex-col items-center justify-end px-6 pb-20 pt-24 text-center sm:pb-24"
    >
      {/* Measured soft radial scrim behind hero typography so text stays crisp over live 3D mirror */}
      <div className="pointer-events-auto max-w-2xl rounded-2xl border border-[#ECD6DE] bg-[#FDF9F7]/84 px-7 py-9 shadow-[0_24px_64px_-24px_rgba(143,78,97,0.22)] sm:px-12 sm:py-11">
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-xs font-medium tracking-[0.26em] text-[#8F4E61]"
        >
          {SALON_CONFIG.hero.kicker}
        </motion.p>

        <motion.h1
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 text-balance font-display text-5xl font-medium tracking-[0.16em] text-[#2D1E24] sm:text-7xl"
        >
          {SALON_CONFIG.brand.name}
          <span className="mt-1 block text-lg font-normal tracking-[0.34em] text-[#664D56] sm:text-xl">
            {SALON_CONFIG.brand.subtitle}
          </span>
        </motion.h1>

        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 font-display text-2xl italic text-[#8F4E61] sm:text-3xl"
        >
          “{SALON_CONFIG.brand.tagline}”
        </motion.p>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={onEnterWorld}
            className="group inline-flex min-h-[44px] items-center gap-3 rounded-lg bg-[#8F4E61] px-7 py-3 text-sm font-medium tracking-wider text-[#FFFDFC] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#7A3F50] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F4E61]"
          >
            <span>{SALON_CONFIG.hero.ctaLabel}</span>
            <ArrowDown
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
