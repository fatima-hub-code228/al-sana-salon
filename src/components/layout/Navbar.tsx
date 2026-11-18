import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SALON_CONFIG } from '@/src/config/salonConfig';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

const NAV_LINKS = [
  { id: 'garden', label: 'Sanctuary' },
  { id: 'services', label: 'Services' },
  { id: 'bridal', label: 'Bridal' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'booking', label: 'Contact' },
];

export function Navbar({ onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-[#EEDCE2] bg-[#FDF9F7]/92 transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-5 sm:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('hero');
          }}
          className="font-display text-2xl font-semibold tracking-[0.22em] text-[#2D1E24] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B87487]"
        >
          {SALON_CONFIG.brand.name}
        </a>

        {/* Zone 2: Clean Single-line Navigation Links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
          {NAV_LINKS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.id);
              }}
              className="group relative py-1 text-sm font-medium text-[#664D56] transition-colors duration-150 hover:text-[#2D1E24] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B87487]"
            >
              {item.label}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-[#C69674] transition-transform duration-200 group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('booking')}
            className="hidden sm:inline-flex min-h-[40px] items-center justify-center rounded-lg bg-[#8F4E61] px-5 py-2 text-xs font-medium tracking-wider text-[#FFFDFC] transition-colors duration-150 hover:bg-[#7A3F50] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F4E61]"
          >
            Book Visit
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#E6CFD7] text-[#2D1E24] md:hidden focus-visible:outline-2 focus-visible:outline-[#8F4E61]"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#EEDCE2] bg-[#FDF9F7] px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {NAV_LINKS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className="flex min-h-[44px] items-center border-b border-[#F3E5EA] text-base font-medium text-[#2D1E24] whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => handleLinkClick('booking')}
              className="mt-2 min-h-[44px] w-full rounded-lg bg-[#8F4E61] px-5 py-2.5 text-sm font-medium text-[#FFFDFC]"
            >
              Book Visit
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
