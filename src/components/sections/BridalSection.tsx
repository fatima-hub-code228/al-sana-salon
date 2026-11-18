import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SALON_CONFIG } from '@/src/config/salonConfig';
import { EditorialImage } from '@/src/components/ui/EditorialImage';

interface BridalSectionProps {
  onReserveBridal: () => void;
  reducedMotion: boolean;
}

const BRIDAL_PILLARS = [
  {
    index: '01',
    title: 'Private Bridal Suite',
    detail:
      'Reserved exclusively for your bridal morning with sunlit mirrors, soft refreshments, and calm dress & dupatta pinning.',
  },
  {
    index: '02',
    title: 'Pre-Bridal Glow Prep',
    detail:
      'Curated rose-quartz facials, hydration infusions, and brow architecture scheduled 2–4 weeks ahead of your celebration.',
  },
  {
    index: '03',
    title: 'Nikah, Barat & Walima',
    detail:
      'Distinct luminous signatures—from soft ivory pearl daylight elegance to rich golden-hour evening couture.',
  },
];

export function BridalSection({ onReserveBridal, reducedMotion }: BridalSectionProps) {
  const petals = [
    { left: '10%', top: '16%', delay: 0, duration: 7 },
    { left: '28%', top: '10%', delay: 1.4, duration: 8.5 },
    { left: '62%', top: '18%', delay: 0.7, duration: 7.8 },
    { left: '84%', top: '14%', delay: 2.1, duration: 9 },
  ];

  return (
    <section
      id="bridal"
      className="relative z-10 overflow-hidden border-t border-[#EEDCE2] bg-[#FAF2EE] px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Editorial Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-[#E5CAD3] shadow-[0_32px_80px_-32px_rgba(143,78,97,0.28)]">
          <div className="aspect-[16/9] w-full">
            <EditorialImage
              src={SALON_CONFIG.bridalFeatureImage}
              alt="Illustrative sunlit blush pink bridal beauty suite with rose-gold mirror"
              fallbackTitle="ALSANA Bridal Couture"
              className="h-full w-full"
              imgClassName="h-full w-full object-cover"
            />
          </div>

          {/* Floating Subtle Rose Petals (compositor transform & opacity only) */}
          {!reducedMotion &&
            petals.map((p, idx) => (
              <motion.div
                key={idx}
                aria-hidden="true"
                initial={{ y: -10, opacity: 0.4, rotate: 0 }}
                animate={{
                  y: [0, 36, 0],
                  x: [0, 14, -8, 0],
                  rotate: [0, 24, -12, 0],
                  opacity: [0.45, 0.85, 0.45],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: 'easeInOut',
                }}
                style={{ left: p.left, top: p.top }}
                className="pointer-events-none absolute h-3.5 w-5 rounded-full bg-gradient-to-br from-[#FAD7E2] to-[#E29CB2] shadow-sm"
              />
            ))}

          {/* Contrast-safe editorial scrim */}
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#2D1E24]/88 via-[#2D1E24]/36 to-transparent p-6 sm:p-12">
            <div className="max-w-2xl text-[#FFFDFC]">
              <div className="flex items-center gap-2 text-xs tracking-[0.22em] text-[#F5D6DF]">
                <span>The Bridal Atelier</span>
                <span aria-hidden="true">·</span>
                <span>Illustrative Editorial Scene</span>
              </div>
              <h2 className="mt-2.5 text-balance font-display text-3xl font-medium leading-tight sm:text-5xl">
                Luminous Bridal Artistry for Every Chapter
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#F8E9EE] sm:text-base">
                Crafted in warm golden light so your skin looks effortless in person, under
                candlelight, and in every timeless portrait.
              </p>
              <button
                type="button"
                onClick={onReserveBridal}
                className="mt-6 inline-flex min-h-[44px] items-center gap-2.5 rounded-lg bg-[#FDF9F7] px-6 py-2.5 text-sm font-medium text-[#2D1E24] transition-colors duration-150 hover:bg-[#F7E6EC] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFFDFC]"
              >
                <span>Inquire for Bridal Dates</span>
                <ArrowRight className="h-4 w-4 text-[#8F4E61]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* 3-Column Editorial Bridal Pillars */}
        <div className="gsap-reveal mt-12 grid gap-8 border-t border-[#E7CFD7] pt-10 md:grid-cols-3">
          {BRIDAL_PILLARS.map((pillar) => (
            <div key={pillar.index} className="space-y-2.5">
              <span className="tabular-nums text-xs font-medium tracking-[0.2em] text-[#8F4E61]">
                {pillar.index}
              </span>
              <h3 className="font-display text-2xl font-medium text-[#2D1E24]">
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#664D56]">{pillar.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
