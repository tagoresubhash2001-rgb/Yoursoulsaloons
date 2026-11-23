import React, { memo } from 'react';
import { motion } from 'motion/react';

interface Brand {
  name: string;
  tagline: string;
  country: string;
}

const BRANDS: Brand[] = [
  { name: "L'Oréal Professionnel", tagline: 'Majirel & Metal Detox', country: 'Paris' },
  { name: 'Schwarzkopf Professional', tagline: 'Igora Royal & Fibre Clinix', country: 'Germany' },
  { name: 'Wella Professionals', tagline: 'Koleston Perfect & Illumina', country: 'Germany' },
  { name: 'Olaplex', tagline: 'Patented Bond Building', country: 'USA' },
  { name: 'Kérastase', tagline: 'Chronologiste & Fusio-Dose', country: 'Paris' },
  { name: 'Moroccanoil', tagline: 'Argan Oil Nourishment', country: 'Israel' },
  { name: 'Redken 5th Avenue', tagline: 'Acidic Bonding Concentrate', country: 'New York' },
  { name: 'Matrix Biolage', tagline: 'Botanical Fiber Strengthening', country: 'USA' },
  { name: 'Revlon Professional', tagline: 'Nutri Color Filters', country: 'Spain' },
  { name: 'TIGI Bed Head', tagline: 'Creative Runway Texturing', country: 'UK' },
  { name: 'Dyson Professional', tagline: 'Intelligent Thermal Styling', country: 'UK' },
  { name: 'YOUR SOUL Botanical Lab', tagline: 'Custom Dermal Formulations', country: 'In-House' },
];

export const BrandMarquee: React.FC = memo(() => {
  // Double the array for seamless infinite marquee loop
  const marqueeList = [...BRANDS, ...BRANDS];

  return (
    <section className="w-full py-16 sm:py-20 bg-surface border-y border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <span className="font-editorial-kicker text-xs text-subtle">
          Our Partners · World-Class Formulations
        </span>
        <h2 className="mt-2 font-editorial-heading text-2xl sm:text-3xl text-dark">
          Brands We Feature &amp; Formulate With
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-muted max-w-2xl mx-auto">
          We strictly work with certified, low-damage, and cruelty-free global beauty houses calibrated to Indian hair textures and water conditions.
        </p>
      </div>

      {/* Infinite scrolling track with pause-on-hover */}
      <div className="relative w-full overflow-hidden group">
        {/* Soft edge gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] py-2">
          {marqueeList.map((brand, idx) => (
            <motion.div
              key={`${brand.name}-${idx}`}
              whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
              className="mx-4 sm:mx-6 flex items-center gap-3 px-6 py-4 rounded-[12px] bg-light card-thick-border border-border shadow-xs min-w-[220px] transition-colors duration-200 hover:border-primary hover:shadow-md cursor-default select-none"
            >
              <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
              <div>
                <div className="text-sm font-semibold text-dark font-sans whitespace-nowrap">
                  {brand.name}
                </div>
                <div className="text-[11px] font-mono text-subtle flex items-center gap-1.5 whitespace-nowrap">
                  <span>{brand.tagline}</span>
                  <span className="text-border-strong">·</span>
                  <span className="text-accent">{brand.country}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

BrandMarquee.displayName = 'BrandMarquee';
