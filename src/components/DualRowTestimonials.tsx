import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface TestimonialCardData {
  id: string;
  name: string;
  location: string;
  service: string;
  quote: string;
  stylist?: string;
  rating: number;
}

const ROW_1_TESTIMONIALS: TestimonialCardData[] = [
  {
    id: 't-1',
    name: 'Ananya Reddy',
    location: 'Vijayapuri Colony, Guntur',
    service: 'Bespoke Balayage & Gloss',
    stylist: 'Senior Master Colorist',
    quote: 'The consultation changed how I view hair color. They analyzed our local water hardness and formulated a tone that stayed glossy for over 10 weeks.',
    rating: 5,
  },
  {
    id: 't-2',
    name: 'Pooja Kulkarni',
    location: 'Lakshmipuram, Guntur',
    service: 'Bridal Occasion Makeup & Hair',
    stylist: 'Bridal Atelier Director',
    quote: 'For my wedding celebration, the makeup was immaculate. Zero heavy cakey feeling, completely radiant under 4K lenses all night.',
    rating: 5,
  },
  {
    id: 't-3',
    name: 'Rhea Verghese',
    location: 'Brodipet, Guntur',
    service: 'Architectural Vidal Sassoon Cut',
    stylist: 'Creative Director',
    quote: 'No rushing, no aggressive product upselling. The stylist studied my crown cowlick and carved a textured bob that falls into place without styling tools.',
    rating: 5,
  },
  {
    id: 't-4',
    name: 'Sneha Singhania',
    location: 'Arundelpet, Guntur',
    service: 'Hydra Infusion & Buccal Lift',
    stylist: 'Dermal Therapist',
    quote: 'The basalt stone facial drainage drained all fluid retention and jaw tightness. My skin had glass-like clarity before my brother’s engagement.',
    rating: 5,
  },
  {
    id: 't-5',
    name: 'Kavita Menon',
    location: 'Benz Circle, Vijayawada',
    service: 'Trichology Scalp Detox & Basalt Basin',
    stylist: 'Trichology Specialist',
    quote: 'I drive down from Vijayawada specifically for their head spa basin. The warm basalt stones and ozonated steam feel like a Japanese thermal retreat.',
    rating: 5,
  },
  {
    id: 't-6',
    name: 'Divya Rao',
    location: 'Vidhyadharapuram, Vijayawada',
    service: 'Russian Dry Manicure & BIAB Gel',
    stylist: 'Senior Nail Artist',
    quote: 'The precision cuticle cleanup is exceptional. Clean, sterile autoclaved tools opened in front of you. My gel overlay stayed intact for 4 weeks.',
    rating: 5,
  },
  {
    id: 't-7',
    name: 'Shweta Choudhary',
    location: 'Amaravati, AP',
    service: 'Seamless Tape-In Extensions',
    stylist: 'Extensions Master',
    quote: 'Seamless 100% human hair blend. The color matching to my dark brown roots with golden undertones was completely undetectable.',
    rating: 5,
  },
  {
    id: 't-8',
    name: 'Tara Nambiar',
    location: 'Pattabhipuram, Guntur',
    service: 'Olaplex Molecular Bond Repair',
    stylist: 'Hair Restoration Artist',
    quote: 'Rescued my bleach-damaged hair in two sessions. The home aftercare basket they recommended preserved the strength beautifully.',
    rating: 5,
  },
];

const ROW_2_TESTIMONIALS: TestimonialCardData[] = [
  {
    id: 't-9',
    name: 'Meera Chidambaram',
    location: 'JKC College Rd, Guntur',
    service: 'French Balayage & Face Frame',
    stylist: 'Master Colorist',
    quote: 'The sunlit atelier on JKC College Road in Guntur is gorgeous. Coffee, silence, and hair color that grows out naturally without harsh demarcation lines.',
    rating: 5,
  },
  {
    id: 't-10',
    name: 'Dr. Radhika Sharma',
    location: 'Syamala Nagar, Guntur',
    service: 'Enzyme Peeling & Cellular Facial',
    stylist: 'Clinical Esthetician',
    quote: 'As a dermatologist, I am very cautious with salon facials. YOUR SOUL follows sterile, medical-grade skin hygiene with non-comedogenic serums.',
    rating: 5,
  },
  {
    id: 't-11',
    name: 'Zoya Merchant',
    location: 'MG Road, Vijayawada',
    service: 'Cocktail Sangeet Hair Styling',
    stylist: 'Runway Stylist',
    quote: 'Modern Hollywood glam waves that held their bounce through 6 hours of dancing without feeling stiff or crispy from hairspray.',
    rating: 5,
  },
  {
    id: 't-12',
    name: 'Aishwarya Deshmukh',
    location: 'Vijayapuri Colony, Guntur',
    service: 'Cysteine Smoothing Treatment',
    stylist: 'Texture Specialist',
    quote: 'Zero formaldehyde smell or eye burning. Tamed coastal humidity and monsoon frizz while preserving my natural wave pattern and movement.',
    rating: 5,
  },
  {
    id: 't-13',
    name: 'Natasha Bharucha',
    location: 'Governorpet, Vijayawada',
    service: 'Micro-Mist Scalp & Hair Ritual',
    stylist: 'Scalp Therapist',
    quote: 'The scalp diagnostic camera showed my clogged follicles before and after. The results are undeniable—light, buoyant roots and soothed skin.',
    rating: 5,
  },
  {
    id: 't-14',
    name: 'Pallavi Varma',
    location: 'Kothapet, Guntur',
    service: 'Pre-Bridal Glow Program',
    stylist: 'Aesthetic Team',
    quote: 'Booked their 3-week pre-bridal journey. Every ritual was carefully timed so my skin barrier was plump and calmed on my wedding morning.',
    rating: 5,
  },
  {
    id: 't-15',
    name: 'Isha Sen',
    location: 'Vijayapuri Colony, Guntur',
    service: 'Full Set Sculpted Acrylic Nails',
    stylist: 'Nail Atelier Director',
    quote: 'The cleanest French chrome finish in the city. The nail technicians work with micro-brushes like fine artists. Exceptional hospitality.',
    rating: 5,
  },
  {
    id: 't-16',
    name: 'Sunita Agarwal',
    location: 'Brodipet, Guntur',
    service: 'Editorial Cut & Grey Blending',
    stylist: 'Creative Director',
    quote: 'Instead of dark blanket dye, they blended silver highlights through my grey hair. I received endless compliments from friends.',
    rating: 5,
  },
];

const TestimonialCard: React.FC<{ item: TestimonialCardData }> = ({ item }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="w-[340px] sm:w-[400px] shrink-0 rounded-[14px] bg-[#FAF8F5] card-thick-border border-2 border-[#14171A] p-6 sm:p-7 shadow-xs flex flex-col justify-between transition-colors duration-200 hover:border-[#E85D1A] hover:shadow-lg cursor-default select-none"
    >
      <div>
        {/* Rating stars & verified chip */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-1 text-[#E85D1A]" aria-label="5 out of 5 stars">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-[#E85D1A]" />
            ))}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-[#0E2E54]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#0E2E54]" />
            <span>Verified Client</span>
          </div>
        </div>

        {/* Quote */}
        <p className="text-xs sm:text-sm text-[#3A332C] font-light leading-relaxed font-sans line-clamp-4">
          “{item.quote}”
        </p>
      </div>

      {/* Author & Service metadata */}
      <div className="mt-5 pt-4 border-t border-[#EAE1D5] flex items-center justify-between text-xs">
        <div>
          <div className="font-semibold text-[#14171A] font-sans">{item.name}</div>
          <div className="text-[11px] font-mono text-[#7D7164]">{item.location}</div>
        </div>
        <div className="text-right">
          <div className="text-[11px] font-mono text-[#0E2E54] font-medium">{item.service}</div>
          {item.stylist && (
            <div className="text-[10px] font-mono text-[#8C8072]">{item.stylist}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const DualRowTestimonials: React.FC = () => {
  const row1List = [...ROW_1_TESTIMONIALS, ...ROW_1_TESTIMONIALS];
  const row2List = [...ROW_2_TESTIMONIALS, ...ROW_2_TESTIMONIALS];

  return (
    <section className="w-full py-20 sm:py-28 bg-[#FAF8F5] border-t border-[#DFD6CB] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <span className="font-editorial-kicker text-xs text-[#7D7164]">
          Real Voices · Unhurried Experiences
        </span>
        <h2 className="mt-2 font-editorial-heading text-3xl sm:text-4xl text-[#14171A]">
          Client Reflections &amp; Stories
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#524B43] max-w-2xl mx-auto">
          From Guntur & Andhra Pradesh brides to regular atelier visitors, explore unfiltered experiences across hair design, scalp therapy, and dermal science.
        </p>
      </div>

      {/* Row 1: Right to Left Marquee */}
      <div className="relative w-full overflow-hidden group mb-6">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
        <div className="flex w-max gap-6 animate-marquee group-hover:[animation-play-state:paused] py-2">
          {row1List.map((item, idx) => (
            <TestimonialCard key={`r1-${item.id}-${idx}`} item={item} />
          ))}
        </div>
      </div>

      {/* Row 2: Left to Right Marquee */}
      <div className="relative w-full overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
        <div className="flex w-max gap-6 animate-marquee-reverse group-hover:[animation-play-state:paused] py-2">
          {row2List.map((item, idx) => (
            <TestimonialCard key={`r2-${item.id}-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
