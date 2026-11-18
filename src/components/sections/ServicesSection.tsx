import { useState, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { SALON_CONFIG, type ServiceOffering } from '@/src/config/salonConfig';
import { EditorialImage } from '@/src/components/ui/EditorialImage';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
  reducedMotion: boolean;
}

export function ServicesSection({
  onSelectServiceForBooking,
  reducedMotion,
}: ServicesSectionProps) {
  const services = SALON_CONFIG.services;
  const [activeId, setActiveId] = useState<string>(services[0].id);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const activeService: ServiceOffering =
    services.find((s) => s.id === activeId) || services[0];

  const handleCardMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -ny * 6, ry: nx * 6 });
  };

  const resetTilt = () => setTilt({ rx: 0, ry: 0 });

  return (
    <section
      id="services"
      className="relative z-10 border-t border-[#EEDCE2] bg-[#FDF9F7]/94 px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="gsap-reveal max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-medium tracking-[0.22em] text-[#8F4E61]">
            <span>Curated Rituals</span>
            <span aria-hidden="true">·</span>
            <span>Rawalpindi Atelier</span>
          </div>
          <h2 className="mt-3 text-balance font-display text-4xl font-medium text-[#2D1E24] sm:text-5xl">
            Bespoke Beauty Services
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#664D56]">
            Select a treatment below to explore our rituals, botanical formulations, and
            tailored appointment durations.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Interactive Service Menu */}
          <div className="flex flex-col justify-between lg:col-span-6" role="tablist" aria-label="Beauty Services">
            <div className="divide-y divide-[#ECD8DF] border-y border-[#ECD8DF]">
              {services.map((service) => {
                const isSelected = service.id === activeService.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveId(service.id)}
                    onMouseEnter={() => setActiveId(service.id)}
                    className={`group flex w-full items-start justify-between gap-4 py-5 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F4E61] ${
                      isSelected ? 'bg-[#F8EBF0]/80 px-4' : 'px-2 hover:bg-[#FAF1F4]'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 text-xs text-[#8F4E61]">
                        <span className="tabular-nums font-medium">{service.index}</span>
                        <span aria-hidden="true">·</span>
                        <span>{service.subtitle}</span>
                      </div>
                      <h3 className="mt-1 font-display text-2xl font-medium text-[#2D1E24] sm:text-3xl">
                        {service.title}
                      </h3>
                    </div>
                    <span
                      className={`mt-2 shrink-0 text-xs font-medium tracking-wider transition-transform duration-200 ${
                        isSelected
                          ? 'translate-x-0 text-[#8F4E61]'
                          : 'text-[#9B7A85] group-hover:translate-x-1 group-hover:text-[#8F4E61]'
                      }`}
                    >
                      {service.duration}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Service Ritual Summary */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8"
              >
                <p className="text-base leading-relaxed text-[#4C363F]">
                  {activeService.description}
                </p>

                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {activeService.rituals.map((ritual) => (
                    <li
                      key={ritual}
                      className="flex items-start gap-2.5 text-sm text-[#664D56]"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#B87487]"
                        aria-hidden="true"
                      />
                      <span>{ritual}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-5">
                  <button
                    type="button"
                    onClick={() => onSelectServiceForBooking(activeService.title)}
                    className="inline-flex min-h-[44px] items-center gap-2.5 rounded-lg bg-[#8F4E61] px-6 py-2.5 text-sm font-medium text-[#FFFDFC] transition-colors duration-150 hover:bg-[#7A3F50] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F4E61]"
                  >
                    <span>Reserve {activeService.title}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span className="text-xs text-[#664D56]">
                    {activeService.accentNote}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Editorial 3:4 Portrait Showcase with 3D Tilt & Rose-Gold Frame */}
          <div className="lg:col-span-6">
            <div
              onMouseMove={handleCardMouseMove}
              onMouseLeave={resetTilt}
              style={{
                transform: `perspective(1100px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl border border-[#E5CAD3] bg-[#F7E6EC] shadow-[0_32px_70px_-28px_rgba(143,78,97,0.28)] lg:h-full lg:max-w-none"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.image}
                  initial={reducedMotion ? false : { opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reducedMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full"
                >
                  <EditorialImage
                    src={activeService.image}
                    alt={activeService.imageAlt}
                    fallbackTitle={activeService.title}
                    className="h-full w-full"
                    imgClassName="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Measured bottom gradient scrim for legible editorial caption */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2D1E24]/82 via-[#2D1E24]/35 to-transparent p-7 text-[#FFFDFC]">
                <div className="flex items-center gap-2 text-xs tracking-[0.18em] text-[#F5D6DF]">
                  <span>{activeService.index}</span>
                  <span aria-hidden="true">·</span>
                  <span>Illustrative Look</span>
                </div>
                <p className="mt-1.5 font-display text-2xl font-medium">
                  {activeService.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
