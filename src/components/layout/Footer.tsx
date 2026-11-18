import { SALON_CONFIG } from '@/src/config/salonConfig';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#EEDCE2] bg-[#FDF9F7] px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <span className="font-display text-2xl font-semibold tracking-[0.2em] text-[#2D1E24]">
            {SALON_CONFIG.brand.name}
          </span>
          <p className="mt-1 text-xs text-[#664D56]">
            {SALON_CONFIG.brand.subtitle} · {SALON_CONFIG.brand.city} · “{SALON_CONFIG.brand.tagline}”
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-[#664D56]">
          <a href="#services" className="hover:text-[#2D1E24]">
            Services
          </a>
          <a href="#bridal" className="hover:text-[#2D1E24]">
            Bridal
          </a>
          <a href="#gallery" className="hover:text-[#2D1E24]">
            Gallery
          </a>
          <a href="#booking" className="hover:text-[#2D1E24]">
            Book Visit
          </a>
          <span>© {new Date().getFullYear()} ALSANA Beauty Salon</span>
        </div>
      </div>
    </footer>
  );
}
