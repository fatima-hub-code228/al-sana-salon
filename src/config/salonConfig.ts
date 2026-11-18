export interface ServiceOffering {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  rituals: string[];
  image: string;
  imageAlt: string;
  accentNote: string;
}

export interface GalleryPiece {
  id: string;
  title: string;
  category: 'Atelier' | 'Bridal' | 'Rituals';
  aspect: 'wide' | 'portrait' | 'square';
  caption: string;
  image: string;
  imageAlt: string;
  isIllustrative: boolean;
}

export interface EditableField {
  value: string;
  needsOwnerVerification: boolean;
  verificationNote?: string;
}

export const SALON_CONFIG = {
  brand: {
    name: 'ALSANA',
    subtitle: 'BEAUTY SALON',
    tagline: 'Where Beauty Becomes Magic',
    city: 'Rawalpindi, Pakistan',
    establishedNote: 'Private Beauty Atelier · Rawalpindi',
  },
  contact: {
    // Update the WhatsApp number (international format without '+' or spaces) before launch.
    whatsappNumber: {
      value: '923000000000',
      display: '+92 300 000 0000',
      needsOwnerVerification: true,
      verificationNote: 'Placeholder WhatsApp number — replace with official ALSANA salon number.',
    },
    address: {
      value: 'Rawalpindi, Punjab, Pakistan (Exact Street & Plaza Pending Owner Confirmation)',
      shortLabel: 'Rawalpindi, Pakistan',
      needsOwnerVerification: true,
      verificationNote: 'Confirm exact sector / street address (e.g., Bahria Town / Chaklala Scheme III / Saddar).',
    },
    hours: {
      value: 'Tuesday – Sunday · 11:00 AM – 8:30 PM',
      needsOwnerVerification: true,
      verificationNote: 'Confirm seasonal and bridal booking hours.',
    },
    email: {
      value: 'concierge@alsanabeauty.pk',
      needsOwnerVerification: true,
      verificationNote: 'Confirm official booking email address.',
    },
    instagram: {
      handle: '@alsanabeautysalon.rwp',
      url: 'https://instagram.com',
      needsOwnerVerification: true,
      verificationNote: 'Confirm official Instagram profile link.',
    },
  },
  hero: {
    kicker: 'Rawalpindi · Pakistan',
    ctaLabel: 'Enter Our World',
    secondaryLabel: 'Reserve Appointment',
  },
  imageryDisclosure:
    'Editorial imagery displayed across this preview is illustrative of the ALSANA aesthetic direction. Authentic salon portfolio photography will replace illustrative frames upon owner release.',
  bridalFeatureImage: '/src/assets/images/bridal_experience_hero_1794991949039.jpg',
  atelierGalleryHeroImage: '/src/assets/images/gallery_salon_atelier_1794991949817.jpg',
  services: [
    {
      id: 'bridal-makeup',
      index: '01',
      title: 'Bridal Makeup',
      subtitle: 'Barat · Walima · Nikah Couture',
      duration: '150 – 180 min',
      description:
        'Bespoke bridal artistry crafted for radiant candlelight and flash photography—balancing luminous glass-skin preparation, sculpted rose-gold eyes, and traditional dupatta and jewellery setting.',
      rituals: [
        'Personal shade & undertone consultation',
        'Hydrating pearl-prep skincare priming',
        'Custom soft-glam or heritage bridal finish',
        'Precision dupatta, jhoomar & tikka pinning',
      ],
      image: '/src/assets/images/service_bridal_makeup_1794991949422.jpg',
      imageAlt: 'Illustrative South Asian bridal makeup portrait in warm rose-gold tones',
      accentNote: 'Private Bridal Suite Available',
    },
    {
      id: 'hair-styling',
      index: '02',
      title: 'Hair Styling & Treatments',
      subtitle: 'Couture Updos · Gloss & Keratin',
      duration: '75 – 150 min',
      description:
        'Architectural waves, floral bridal chignons, and restorative botanical hair baths designed to leave every strand silk-smooth, weightless, and luminous.',
      rituals: [
        'Signature bouncy blowout & Hollywood waves',
        'Botanical keratin & moisture-seal therapy',
        'Bridal bun sculpting with pearl & floral pins',
        'Scalp relaxation aromatherapy massage',
      ],
      image: '/src/assets/images/service_hair_styling_1794991949119.jpg',
      imageAlt: 'Illustrative luxury glossy waves styled with pearl and rose-gold hairpins',
      accentNote: 'Botanical Shine Infusion',
    },
    {
      id: 'facials-skincare',
      index: '03',
      title: 'Facials & Skincare',
      subtitle: 'Rose-Quartz Glow · Hydra Renewal',
      duration: '60 – 90 min',
      description:
        'Quiet restorative facial rituals combining rose-water lymphatic sculpting, gentle enzymatic resurfacing, and botanical serums for a calm, lit-from-within complexion.',
      rituals: [
        'Chilled rose-quartz gua sha drainage',
        'Deep botanical pore purification',
        '24K pearl-essence brightening mask',
        'Pre-bridal radiance series planning',
      ],
      image: '/src/assets/images/service_facials_skincare_1794991948263.jpg',
      imageAlt: 'Illustrative frosted serum bottle, rose quartz gua sha, and blush rose petals on marble',
      accentNote: 'Dermatologically Gentle Rituals',
    },
    {
      id: 'manicure-pedicure',
      index: '04',
      title: 'Manicure & Pedicure',
      subtitle: 'Pearl Nail Couture · Rose Spa',
      duration: '60 – 90 min',
      description:
        'Unhurried hand and foot care featuring warm rose-petal mineral soaks, delicate cuticle refinement, sheer champagne polishes, and subtle gold-leaf nail artistry.',
      rituals: [
        'Warm Damascus rose & milk mineral soak',
        'Precision cuticle care & shea butter wrap',
        'Sheer pearl, French & bespoke bridal nails',
        'Heated stone calf & forearm massage',
      ],
      image: '/src/assets/images/service_manicure_pedicure_1794991948501.jpg',
      imageAlt: 'Illustrative pearl-blush manicure resting on champagne silk beside peonies',
      accentNote: 'Sterilized Atelier Instruments',
    },
    {
      id: 'waxing-beauty-care',
      index: '05',
      title: 'Waxing & Beauty Care',
      subtitle: 'Chamomile Silk Wax · Brow Artistry',
      duration: '30 – 75 min',
      description:
        'Gentle full-body waxing with soothing rose and chamomile resins, paired with bespoke brow shaping and calming botanical post-care.',
      rituals: [
        'Low-temperature soothing rose-cream wax',
        'Sensitive-skin chamomile oil calming finish',
        'Precision brow mapping & soft tinting',
        'Full pre-event satin body polish',
      ],
      image: '/src/assets/images/service_waxing_care_1794991948521.jpg',
      imageAlt: 'Illustrative warm linen towels, botanical spa oil, and rose-quartz stones',
      accentNote: 'Hypoallergenic Rose Resin',
    },
  ] as ServiceOffering[],
  gallery: [
    {
      id: 'gal-atelier',
      title: 'The Blush & Marble Atelier',
      category: 'Atelier',
      aspect: 'wide',
      caption: 'Curved rose-velvet styling suites bathed in sunlit arched windows and crystal reflections.',
      image: '/src/assets/images/gallery_salon_atelier_1794991949817.jpg',
      imageAlt: 'Illustrative luxury blush pink beauty salon interior with marble counters and rose-gold mirrors',
      isIllustrative: true,
    },
    {
      id: 'gal-bridal-look',
      title: 'Champagne Bridal Radiance',
      category: 'Bridal',
      aspect: 'portrait',
      caption: 'Luminous bridal complexion paired with pearl passa ornaments and soft rose-gold shimmer.',
      image: '/src/assets/images/service_bridal_makeup_1794991949422.jpg',
      imageAlt: 'Illustrative bridal makeup portrait with pearl jewellery',
      isIllustrative: true,
    },
    {
      id: 'gal-bridal-suite',
      title: 'The Private Bridal Mirror',
      category: 'Bridal',
      aspect: 'wide',
      caption: 'A tranquil sanctuary framed in fresh garden roses for your Nikah, Barat, and Walima morning.',
      image: '/src/assets/images/bridal_experience_hero_1794991949039.jpg',
      imageAlt: 'Illustrative bridal dressing suite with rose-gold mirror and fresh roses',
      isIllustrative: true,
    },
    {
      id: 'gal-vanity',
      title: 'Elixirs & Rose-Gold Brushes',
      category: 'Rituals',
      aspect: 'square',
      caption: 'Curated botanical fragrances and silk-soft artistry tools arranged on pearl-veined marble.',
      image: '/src/assets/images/gallery_rose_elixir_1794991950200.jpg',
      imageAlt: 'Illustrative perfume bottles, rose-gold makeup brushes, and fresh pink roses on marble',
      isIllustrative: true,
    },
    {
      id: 'gal-hair',
      title: 'Sunlit Couture Waves',
      category: 'Rituals',
      aspect: 'portrait',
      caption: 'Silk-treated waves finished with delicate rose-gold and freshwater pearl hairpins.',
      image: '/src/assets/images/service_hair_styling_1794991949119.jpg',
      imageAlt: 'Illustrative glossy waves styled with pearl pins',
      isIllustrative: true,
    },
    {
      id: 'gal-nails',
      title: 'Pearl Almond Manicure',
      category: 'Rituals',
      aspect: 'portrait',
      caption: 'Delicate champagne nail glazing with micro gold-leaf detail beside blush peonies.',
      image: '/src/assets/images/service_manicure_pedicure_1794991948501.jpg',
      imageAlt: 'Illustrative pearl manicure with flowers',
      isIllustrative: true,
    },
  ] as GalleryPiece[],
};

export function buildWhatsAppBookingUrl(params: {
  name: string;
  phone: string;
  service: string;
  preferredDate: string;
  message: string;
}): string {
  const cleanDigits = SALON_CONFIG.contact.whatsappNumber.value.replace(/\D/g, '');
  const lines = [
    'Assalam-o-Alaikum ALSANA Beauty Salon,',
    'I would like to request an appointment:',
    '',
    `Name: ${params.name.trim()}`,
    `Phone: ${params.phone.trim()}`,
    `Service: ${params.service}`,
    `Preferred Date: ${params.preferredDate || 'Flexible'}`,
  ];
  if (params.message.trim()) {
    lines.push(`Notes: ${params.message.trim()}`);
  }
  lines.push('', 'Sent via ALSANA Beauty Salon website.');

  return `https://wa.me/${cleanDigits}?text=${encodeURIComponent(lines.join('\n'))}`;
}
