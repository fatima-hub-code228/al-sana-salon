import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SalonExperienceCanvas } from '@/src/components/three/SalonExperienceCanvas';
import { CinematicLoader } from '@/src/components/layout/CinematicLoader';
import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';
import { HeroSection } from '@/src/components/sections/HeroSection';
import { GardenStorySection } from '@/src/components/sections/GardenStorySection';
import { ServicesSection } from '@/src/components/sections/ServicesSection';
import { BridalSection } from '@/src/components/sections/BridalSection';
import { GallerySection } from '@/src/components/sections/GallerySection';
import { BookingSection } from '@/src/components/sections/BookingSection';
import { ExperienceControls } from '@/src/components/ui/ExperienceControls';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const scrollProgressRef = useRef(0);
  const mainRef = useRef<HTMLDivElement>(null);

  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [forceFallback2D, setForceFallback2D] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const [selectedService, setSelectedService] = useState('Bridal Makeup');

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true);
  }, []);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const target = document.getElementById(sectionId);
      if (!target) return;
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    },
    [reducedMotion]
  );

  const handleSelectServiceForBooking = useCallback(
    (serviceTitle: string) => {
      setSelectedService(serviceTitle);
      scrollToSection('booking');
    },
    [scrollToSection]
  );

  useEffect(() => {
    const updateScrollProgress = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      scrollProgressRef.current = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || !mainRef.current) return;

    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>('.gsap-reveal');
      blocks.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 26, opacity: 0.92 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 86%',
              once: true,
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, [reducedMotion, loaderDone]);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-[#FDF9F7] text-[#2D1E24]">
      <CinematicLoader
        reducedMotion={reducedMotion}
        onComplete={handleLoaderComplete}
      />

      {/* Full-Screen Persistent Real-Time 3D Salon & Enchanted Garden */}
      <SalonExperienceCanvas
        scrollProgressRef={scrollProgressRef}
        reducedMotion={reducedMotion}
        forceFallback2D={forceFallback2D}
      />

      <Navbar onNavigate={scrollToSection} />

      <main className="relative z-10">
        {/* Scene 1: Cinematic 3D Salon Entrance & Hero Reveal */}
        <HeroSection
          onEnterWorld={() => scrollToSection('garden')}
          reducedMotion={reducedMotion}
        />

        {/* Scene 2: Enchanted Rose Garden Transition */}
        <GardenStorySection />

        {/* Scene 3: Interactive Beauty Services */}
        <ServicesSection
          onSelectServiceForBooking={handleSelectServiceForBooking}
          reducedMotion={reducedMotion}
        />

        {/* Scene 4: Bridal Beauty Experience */}
        <BridalSection
          onReserveBridal={() => handleSelectServiceForBooking('Full Bridal Package Inquiry')}
          reducedMotion={reducedMotion}
        />

        {/* Scene 5: Luxury Gallery */}
        <GallerySection reducedMotion={reducedMotion} />

        {/* Scene 6: WhatsApp Booking & Rawalpindi Location */}
        <BookingSection preselectedService={selectedService} />
      </main>

      <Footer />

      <ExperienceControls
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion((prev) => !prev)}
        forceFallback2D={forceFallback2D}
        onToggleFallback2D={() => setForceFallback2D((prev) => !prev)}
      />
    </div>
  );
}
