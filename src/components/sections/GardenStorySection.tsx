export function GardenStorySection() {
  return (
    <section
      id="garden"
      className="relative z-10 flex min-h-[85vh] items-center px-6 py-24 sm:px-10"
    >
      <div className="mx-auto flex w-full max-w-6xl justify-start">
        <div className="gsap-reveal max-w-lg rounded-2xl border border-[#ECD6DE] bg-[#FDF9F7]/88 p-8 shadow-[0_20px_50px_-24px_rgba(143,78,97,0.18)] sm:p-10">
          <div className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-[#8F4E61]">
            <span>Chapter 01</span>
            <span aria-hidden="true">·</span>
            <span>The Enchanted Sanctuary</span>
          </div>

          <h2 className="mt-3 text-balance font-display text-3xl font-medium leading-tight text-[#2D1E24] sm:text-5xl">
            Beyond the Rose-Gold Mirror
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#664D56]">
            Step past velvet salons and sunlit marble into a serene world of blooming
            Damascus roses, luminous botanical rituals, and unhurried artistry tailored
            for Rawalpindi’s most cherished celebrations.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#EEDCE2] pt-5 text-xs text-[#664D56]">
            <span>Private Bridal Suites</span>
            <span aria-hidden="true">·</span>
            <span>Botanical Skin Preparation</span>
            <span aria-hidden="true">·</span>
            <span>Rose-Gold Atelier</span>
          </div>
        </div>
      </div>
    </section>
  );
}
