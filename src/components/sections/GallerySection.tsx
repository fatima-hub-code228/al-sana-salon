import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Expand, X } from 'lucide-react';
import { SALON_CONFIG, type GalleryPiece } from '@/src/config/salonConfig';
import { EditorialImage } from '@/src/components/ui/EditorialImage';

interface GallerySectionProps {
  reducedMotion: boolean;
}

const CATEGORIES: Array<'All' | 'Atelier' | 'Bridal' | 'Rituals'> = [
  'All',
  'Atelier',
  'Bridal',
  'Rituals',
];

export function GallerySection({ reducedMotion }: GallerySectionProps) {
  const [filter, setFilter] = useState<'All' | 'Atelier' | 'Bridal' | 'Rituals'>('All');
  const [selectedPiece, setSelectedPiece] = useState<GalleryPiece | null>(null);

  const items =
    filter === 'All'
      ? SALON_CONFIG.gallery
      : SALON_CONFIG.gallery.filter((item) => item.category === filter);

  useEffect(() => {
    if (!selectedPiece) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPiece(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedPiece]);

  return (
    <section
      id="gallery"
      className="relative z-10 border-t border-[#EEDCE2] bg-[#FDF9F7] px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-medium tracking-[0.22em] text-[#8F4E61]">
              <span>Editorial Lookbook</span>
              <span aria-hidden="true">·</span>
              <span>Illustrative Visuals</span>
            </div>
            <h2 className="mt-3 text-balance font-display text-4xl font-medium text-[#2D1E24] sm:text-5xl">
              The Luxury Gallery
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#664D56]">
              {SALON_CONFIG.imageryDisclosure}
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div
            className="inline-flex shrink-0 items-center gap-1 self-start rounded-lg border border-[#EAD4DC] bg-[#F7EBF0] p-1 md:self-auto"
            role="group"
            aria-label="Filter gallery category"
          >
            {CATEGORIES.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`min-h-[36px] rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#8F4E61] ${
                    active
                      ? 'bg-[#FFFDFC] text-[#2D1E24] shadow-sm'
                      : 'text-[#664D56] hover:text-[#2D1E24]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Bento Editorial Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((piece) => {
            const isWide = piece.aspect === 'wide';
            return (
              <motion.button
                key={piece.id}
                type="button"
                layout={!reducedMotion}
                onClick={() => setSelectedPiece(piece)}
                whileHover={reducedMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.2 }}
                className={`group relative overflow-hidden rounded-2xl border border-[#E9D1D9] bg-[#F7E6EC] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F4E61] ${
                  isWide ? 'md:col-span-2 aspect-[16/10]' : 'aspect-[4/5]'
                }`}
              >
                <EditorialImage
                  src={piece.image}
                  alt={piece.imageAlt}
                  fallbackTitle={piece.title}
                  className="h-full w-full"
                  imgClassName="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[#2D1E24]/86 via-[#2D1E24]/35 to-transparent p-6 text-[#FFFDFC]">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#F5D6DF]">
                      <span>{piece.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>Illustrative Concept</span>
                    </div>
                    <h3 className="mt-1 font-display text-2xl font-medium">
                      {piece.title}
                    </h3>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-[#2D1E24]/45 text-[#FFFDFC] transition-transform duration-200 group-hover:scale-105">
                    <Expand className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* High-Resolution Lightbox Modal */}
      <AnimatePresence>
        {selectedPiece && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setSelectedPiece(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#23151A]/90 p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={selectedPiece.title}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-[#6E4D59] bg-[#FDF9F7] shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedPiece(null)}
                aria-label="Close gallery preview"
                className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#2D1E24]/80 text-[#FFFDFC] transition-colors hover:bg-[#2D1E24] focus-visible:outline-2 focus-visible:outline-[#FFFDFC]"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="max-h-[68vh] w-full overflow-hidden bg-[#F7E6EC]">
                <img
                  src={selectedPiece.image}
                  alt={selectedPiece.imageAlt}
                  referrerPolicy="no-referrer"
                  className="max-h-[68vh] w-full object-contain"
                />
              </div>

              <div className="flex flex-col justify-between gap-3 border-t border-[#EEDCE2] p-6 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#8F4E61]">
                    <span>{selectedPiece.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>Illustrative Aesthetic Preview</span>
                  </div>
                  <h3 className="mt-1 font-display text-2xl font-medium text-[#2D1E24]">
                    {selectedPiece.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#664D56]">{selectedPiece.caption}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
