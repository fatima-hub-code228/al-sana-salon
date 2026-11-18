import { useEffect, useState, type FormEvent } from 'react';
import { Calendar, CheckCircle2, Clock, ExternalLink, MapPin, MessageCircle, Phone } from 'lucide-react';
import { buildWhatsAppBookingUrl, SALON_CONFIG } from '@/src/config/salonConfig';

interface BookingSectionProps {
  preselectedService: string;
}

export function BookingSection({ preselectedService }: BookingSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(
    preselectedService || SALON_CONFIG.services[0].title
  );
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (name.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }
    if (phone.trim().length < 7) {
      setError('Please enter a valid contact phone or WhatsApp number.');
      return;
    }

    const url = buildWhatsAppBookingUrl({
      name,
      phone,
      service,
      preferredDate,
      message,
    });
    setSubmittedUrl(url);

    // Open WhatsApp safely via synthetic link click (avoiding window.open)
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="booking"
      className="relative z-10 border-t border-[#EEDCE2] bg-[#FAF2EE] px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Salon Information & Rawalpindi Location */}
        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium tracking-[0.22em] text-[#8F4E61]">
              <span>Private Concierge</span>
              <span aria-hidden="true">·</span>
              <span>{SALON_CONFIG.brand.city}</span>
            </div>

            <h2 className="mt-3 text-balance font-display text-4xl font-medium text-[#2D1E24] sm:text-5xl">
              Reserve Your Visit
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#664D56]">
              Send your preferred ritual and date directly to our Rawalpindi reception via
              WhatsApp for swift confirmation and bridal consultation scheduling.
            </p>

            <div className="mt-8 space-y-5 border-t border-[#E5CFD7] pt-7 text-sm">
              <div className="flex items-start gap-3.5">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#8F4E61]" aria-hidden="true" />
                <div>
                  <p className="font-medium text-[#2D1E24]">Location</p>
                  <p className="mt-0.5 text-[#664D56]">{SALON_CONFIG.contact.address.value}</p>
                  {SALON_CONFIG.contact.address.needsOwnerVerification && (
                    <p className="mt-1 text-xs text-[#8F4E61]">
                      Owner verification needed: {SALON_CONFIG.contact.address.verificationNote}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#8F4E61]" aria-hidden="true" />
                <div>
                  <p className="font-medium text-[#2D1E24]">WhatsApp &amp; Reception</p>
                  <p className="mt-0.5 tabular-nums text-[#664D56]">
                    {SALON_CONFIG.contact.whatsappNumber.display}
                  </p>
                  {SALON_CONFIG.contact.whatsappNumber.needsOwnerVerification && (
                    <p className="mt-1 text-xs text-[#8F4E61]">
                      Owner verification needed: {SALON_CONFIG.contact.whatsappNumber.verificationNote}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#8F4E61]" aria-hidden="true" />
                <div>
                  <p className="font-medium text-[#2D1E24]">Atelier Hours</p>
                  <p className="mt-0.5 text-[#664D56]">{SALON_CONFIG.contact.hours.value}</p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 border-t border-[#E5CFD7] pt-5 text-xs leading-relaxed text-[#664D56]">
            All salon address, phone, and schedule details are centralized in{' '}
            <code className="rounded bg-[#F0DEE4] px-1.5 py-0.5 text-[#2D1E24]">
              src/config/salonConfig.ts
            </code>{' '}
            for immediate owner updates before launch.
          </p>
        </div>

        {/* Right Appointment Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[#E6CFD7] bg-[#FFFDFC] p-6 shadow-[0_24px_60px_-28px_rgba(143,78,97,0.2)] sm:p-10"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="booking-name"
                  className="block text-xs font-medium tracking-wider text-[#2D1E24]"
                >
                  Full Name
                </label>
                <input
                  id="booking-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ayesha Khan"
                  className="mt-2 min-h-[44px] w-full rounded-lg border border-[#E4CBD4] bg-[#FDF9F7] px-4 py-2.5 text-sm text-[#2D1E24] placeholder:text-[#9D828C] focus:border-[#8F4E61] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="booking-phone"
                  className="block text-xs font-medium tracking-wider text-[#2D1E24]"
                >
                  Phone / WhatsApp
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 300 1234567"
                  className="mt-2 min-h-[44px] w-full rounded-lg border border-[#E4CBD4] bg-[#FDF9F7] px-4 py-2.5 text-sm text-[#2D1E24] placeholder:text-[#9D828C] focus:border-[#8F4E61] focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="booking-service"
                  className="block text-xs font-medium tracking-wider text-[#2D1E24]"
                >
                  Desired Service
                </label>
                <select
                  id="booking-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="mt-2 min-h-[44px] w-full rounded-lg border border-[#E4CBD4] bg-[#FDF9F7] px-4 py-2.5 text-sm text-[#2D1E24] focus:border-[#8F4E61] focus:outline-none"
                >
                  {SALON_CONFIG.services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Full Bridal Package Inquiry">
                    Full Bridal Package Inquiry
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="booking-date"
                  className="block text-xs font-medium tracking-wider text-[#2D1E24]"
                >
                  Preferred Date
                </label>
                <div className="relative mt-2">
                  <input
                    id="booking-date"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="min-h-[44px] w-full rounded-lg border border-[#E4CBD4] bg-[#FDF9F7] px-4 py-2.5 text-sm text-[#2D1E24] focus:border-[#8F4E61] focus:outline-none"
                  />
                  <Calendar
                    className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-[#9D828C] sm:hidden"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="booking-message"
                className="block text-xs font-medium tracking-wider text-[#2D1E24]"
              >
                Notes or Bridal Event Details
              </label>
              <textarea
                id="booking-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share preferred time, Barat/Walima date, or skincare preferences..."
                className="mt-2 w-full rounded-lg border border-[#E4CBD4] bg-[#FDF9F7] px-4 py-3 text-sm text-[#2D1E24] placeholder:text-[#9D828C] focus:border-[#8F4E61] focus:outline-none"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="mt-4 rounded-lg border border-[#D497A6] bg-[#FBEEF2] px-4 py-2.5 text-sm text-[#7A2D41]"
              >
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <button
                type="submit"
                className="inline-flex min-h-[46px] items-center gap-2.5 rounded-lg bg-[#8F4E61] px-7 py-3 text-sm font-medium text-[#FFFDFC] transition-colors duration-150 hover:bg-[#7A3F50] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F4E61]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Request via WhatsApp</span>
              </button>

              <span className="text-xs text-[#664D56]">
                Prefills your request in WhatsApp
              </span>
            </div>

            {submittedUrl && (
              <div className="mt-6 rounded-xl border border-[#D8C5CC] bg-[#FDF9F7] p-4 text-sm text-[#2D1E24]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#8F4E61]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-medium">
                      Your WhatsApp appointment draft is ready.
                    </p>
                    <p className="mt-1 text-xs text-[#664D56]">
                      If WhatsApp did not open automatically, tap the direct link below:
                    </p>
                    <a
                      href={submittedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-[#8F4E61] underline underline-offset-4 hover:text-[#6E3647]"
                    >
                      <span>Open WhatsApp Appointment Message</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
