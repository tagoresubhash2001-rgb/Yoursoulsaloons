import React from 'react';
import { DivisionMode } from '../types';
import { FeaturePill } from './FeaturePill';
import { ArrowRight, Clock, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';

interface ServicesListingProps {
  mode: DivisionMode;
  onSelectService: (serviceId: string) => void;
  onSelectCourse: (courseId: string) => void;
}

interface EditorialServiceCategory {
  id: string;
  serviceId: string;
  category: string;
  subtitle: string;
  description: string;
  duration: string;
  image: string;
  alt: string;
  features: string[];
  ctaLabel: string;
}

interface EditorialCourseGroup {
  id: string;
  courseId: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  practicalHours: string;
  image: string;
  alt: string;
  features: string[];
  ctaLabel: string;
}

const SALON_EDITORIAL_CATEGORIES: EditorialServiceCategory[] = [
  {
    id: 'grp-hair-cut',
    serviceId: 'srv-1',
    category: 'Hair Design & Architectural Haircuts',
    subtitle: 'Precision French Atelier & Vidal Sassoon Sculpting',
    description: 'Every haircut is sculpted to your individual bone structure, hairline whorls, and hair density. We combine dry geometric analysis before washing with hand-honed shears, concluding with an unhurried blowout that maintains shape effortlessly for weeks.',
    duration: '75 min',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80',
    alt: 'Master stylist performing precision haircutting in modern luxury salon',
    features: [
      'Micro-Texture Diagnostic',
      'Sensory Scalp Clarifying Ritual',
      'Precision Dry & Wet Sculpting',
      'Editorial Velvet Blowout'
    ],
    ctaLabel: 'Reserve Haircut Consultation',
  },
  {
    id: 'grp-hair-colour',
    serviceId: 'srv-3',
    category: 'Colour Chemistry & French Balayage',
    subtitle: 'Freehand Highlighting & Low-Damage Formulations',
    description: 'Artisanal hand-painted dimensional balayage, subtle root melting, and acidic toner glazes calibrated for dark and warm undertones. Formulated with ammonia-free European pigments and bond rebuilders that safeguard hair vitality and mirror shine.',
    duration: '180 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
    alt: 'Master colorist hand-painting dimensional French balayage highlights',
    features: [
      'Porosity Pre-Balancing Treatment',
      'Organic Clay-Based Lightener',
      'Custom Acidic Peptide Glaze',
      'Scalp Barrier Protective Oil'
    ],
    ctaLabel: 'Book Colour Consultation',
  },
  {
    id: 'grp-bridal',
    serviceId: 'srv-8',
    category: 'Bridal Makeup & Haute Occasion Styling',
    subtitle: '4K Camera Longevity & Personalized Dupatta Draping',
    description: 'Comprehensive styling exploration for wedding celebrations (Sangeet, Muhurtham, and Reception). We ensure waterproof HD airbrush longevity, custom veil and dupatta draping, and jewelry setting designed to withstand ceremony lights and cameras.',
    duration: '120 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80',
    alt: 'Luxury bridal hair and makeup artistry session in private studio suite',
    features: [
      'Pre-Wedding Dermal Preparation',
      'HD Camera Flash Calibration',
      'Dupatta & Headpiece Setting',
      'Private Bridal Suite Access'
    ],
    ctaLabel: 'Schedule Bridal Consultation',
  },
  {
    id: 'grp-extensions',
    serviceId: 'srv-1',
    category: 'Seamless Hair Extensions & Volume',
    subtitle: '100% Remy Human Hair Integration',
    description: 'Undetectable tape-in, micro-ring, and invisible weft human hair integration that adds natural volume, length, and movement without mechanical tension on native follicles. Each set is individually toned and texturized to blend seamlessly.',
    duration: '120 min',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1000&q=80',
    alt: 'Luxurious long natural hair extensions styling',
    features: [
      'Exact Shade & Texture Blending',
      '100% Remy Human Hair',
      'Zero-Tension Flat Micro-Bonds',
      'Long-Wear Reusability Plan'
    ],
    ctaLabel: 'Book Extensions Consultation',
  },
  {
    id: 'grp-dermal',
    serviceId: 'srv-5',
    category: 'Cellular Dermal Care & Sculptural Facials',
    subtitle: 'Lymphatic Gua Sha & Buccal Facial Sculpting',
    description: 'Deep pore ultrasound infusions, probiotic herbal enzyme resurfacing, and sculpting buccal massage that release facial clenching, drain lymphatic congestion, and restore glowing cellular barrier hydration.',
    duration: '90 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80',
    alt: 'Restorative cellular dermal treatment with facial lymphatic massage',
    features: [
      'Double Botanical Oil Cleanse',
      'Sculptural Buccal Facial Massage',
      'Medical-Grade Oxygen Infusion',
      'Ceramide Barrier Hydration Seal'
    ],
    ctaLabel: 'Reserve Dermal Ritual',
  },
  {
    id: 'grp-trichology',
    serviceId: 'srv-7',
    category: 'Trichology Scalp Therapy & Basalt Basins',
    subtitle: 'Volcanic Clay Exfoliation & Japanese Head Spa',
    description: 'Microscopic trichoscope imaging paired with detoxifying volcanic ash, ozone micro-steam, and warmed Icelandic basalt stones positioned along the neck and shoulders in our quiet basin sanctuary.',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1000&q=80',
    alt: 'Restorative Japanese head spa basin and scalp detoxification treatment',
    features: [
      'Digital Trichoscope Diagnostic',
      'Volcanic Ash Scalp Peel',
      'Ozone Micro-Steam Hydrotherapy',
      'Warm Basalt Stone Acupressure'
    ],
    ctaLabel: 'Book Scalp Therapy Slot',
  },
  {
    id: 'grp-nails',
    serviceId: 'srv-5',
    category: 'Nail Atelier & Sterile Dry Manicures',
    subtitle: 'Russian Cuticle Precision & BIAB Gel Overlays',
    description: 'Hospital-grade autoclave sterilization, precision electric filing, Builder-In-A-Bottle (BIAB) nail strengthening, and minimalist editorial nail art designed for durable, chip-resistant wear.',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1000&q=80',
    alt: 'Precision dry manicure and BIAB gel overlay application',
    features: [
      'Autoclave Pouched Implements',
      'Russian Precision E-File Method',
      'BIAB Keratin Reinforcement',
      'Nourishing Botanical Cuticle Elixir'
    ],
    ctaLabel: 'Book Nail Atelier Session',
  },
];

const ACADEMY_EDITORIAL_GROUPS: EditorialCourseGroup[] = [
  {
    id: 'acad-hair',
    courseId: 'crs-1',
    title: 'Diploma in Precision Haircutting & Modern Architecture',
    subtitle: 'Comprehensive Geometric Cutting & Live Clinic Apprenticeship',
    description: 'A complete immersion in classic geometric precision, freehand carving, disconnection methods, and modern European scissor ergonomics. Over 320 hours of supervised client clinic training with a 1:8 mentor-to-student ratio.',
    duration: '16 Weeks · Full Time',
    practicalHours: '320 Clinic Hours',
    image: '/banners/academy_services_banner.jpg',
    alt: 'Cosmetology students practicing precision sectioning and haircutting',
    features: [
      'Cranial Anatomy & Line Geometry',
      'Lines, Graduation & Layering',
      'Dry Razor & Texturizing Carving',
      'Live Public Salon Apprenticeship'
    ],
    ctaLabel: 'Enquire for Haircut Diploma',
  },
  {
    id: 'acad-colour',
    courseId: 'crs-2',
    title: 'Masterclass in Advanced Balayage & Color Correction',
    subtitle: 'Chemical Bleach Physics & High-Stakes Correction Strategy',
    description: 'Master the physics of hair lightening, developer titration, French freehand sweeps, foilayage placement, root melting, and reversing accidental bands or uneven tones on live clients.',
    duration: '8 Weeks · Part Time / Weekend',
    practicalHours: '120 Hands-On Hours',
    image: '/banners/academy_about_banner.jpg',
    alt: 'Master colorist demonstrating French balayage highlights formulation',
    features: [
      'Lightener Chemistry & Lipid Protection',
      'French Freehand Balayage Placement',
      'Acidic Glazes & Root Melt Formulation',
      'Band & Box Dye Correction Protocol'
    ],
    ctaLabel: 'Apply for Balayage Masterclass',
  },
  {
    id: 'acad-dermal',
    courseId: 'crs-3',
    title: 'Professional Diploma in Clinical Esthetics & Dermal Therapy',
    subtitle: 'Biological Skin Science & Advanced Facial Sculpting',
    description: 'Combines physiological skin biology, active peptide chemistry, sculptural buccal massage, ultrasound machines, and medical-grade clinic sanitation protocols.',
    duration: '20 Weeks · Full Time',
    practicalHours: '400 Practical Clinic Hours',
    image: '/banners/academy_home_hero.jpg',
    alt: 'Clinical esthetics students learning facial lymphatic drainage',
    features: [
      'Epidermal Biology & Histology',
      'Active Peptides, AHAs & Retinoids',
      'Facial Gua Sha & Buccal Sculpting',
      'Ultrasound & Oxygen Machines'
    ],
    ctaLabel: 'Request Esthetics Syllabus',
  },
  {
    id: 'acad-makeup',
    courseId: 'crs-4',
    title: 'Bridal & Editorial High-Fashion Makeup Masterclass',
    subtitle: 'Second-Skin Complexion Artistry & Runway Moodboards',
    description: 'Master the craft of second-skin complexion work, tear-proof bridal setting, studio lighting response, camera flash calibration, and building a high-ticket bridal roster.',
    duration: '6 Weeks · Intensive',
    practicalHours: '90 Hands-on Studio Hours',
    image: '/banners/academy_contact_banner.jpg',
    alt: 'High-fashion editorial makeup demonstration in masterclass studio',
    features: [
      'Undertone Calibration & Complexion',
      'Tear-Proof Bridal Setting Protocols',
      'Studio Lighting & 4K Flash Testing',
      'Editorial Portfolio Direction'
    ],
    ctaLabel: 'Book Admissions Interview',
  },
];

export const ServicesListing: React.FC<ServicesListingProps> = ({
  mode,
  onSelectService,
  onSelectCourse,
}) => {
  const isSalon = mode === 'salon';

  return (
    <section className="w-full py-16 md:py-24 bg-[#FAF8F5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={20} duration={0.6} className="text-center max-w-3xl mx-auto space-y-3">
          <span className="font-editorial-kicker text-xs text-[#7D7164]">
            {isSalon ? 'Haute Coiffure & Dermal Menu' : 'Accredited Curriculum & Syllabi'}
          </span>
          <h2 className="font-editorial-heading text-3xl sm:text-4xl md:text-5xl text-[#14171A]">
            {isSalon ? 'Curated Atelier Services & Rituals' : 'Professional Beauty Education Programs'}
          </h2>
          <p className="font-editorial-lead text-sm sm:text-base text-[#524B43]">
            {isSalon
              ? 'Every appointment begins with an unhurried diagnostic texture and scalp assessment. Tailored formulations, European discipline, and cruelty-free botanicals.'
              : 'Accredited diplomas and intensive masterclasses combining geometric hair theory, biological skin science, and live commercial clinic apprenticeships.'}
          </p>
        </ScrollReveal>

        {/* =========================================================================
            SALON EDITORIAL ALTERNATING LAYOUT
            Section A: Left Image | Right Content + 4 Feature Pills + CTA
            Section B: Right Image | Left Content + 4 Feature Pills + CTA
            ========================================================================= */}
        {isSalon && (
          <div className="space-y-20 md:space-y-28">
            {SALON_EDITORIAL_CATEGORIES.map((item, index) => {
              const isEven = index % 2 === 0; // Section A: Image Left, Section B: Image Right

              return (
                <div
                  key={item.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
                >
                  {/* Image Column */}
                  <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`lg:col-span-6 ${
                      isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'
                    }`}
                  >
                    <motion.div
                      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                      className="group relative rounded-[18px] overflow-hidden card-thick-border border-2 border-[#14171A] bg-[#EAE1D5] aspect-[4/3] shadow-xs hover:shadow-xl transition-all duration-300"
                    >
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#14171A]/40 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Duration Unboxed Badge */}
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] bg-[#FAF8F5]/90 backdrop-blur-md text-[11px] font-mono text-[#14171A] border border-[#DFD6CB] shadow-xs">
                        <Clock className="h-3.5 w-3.5 text-[#E85D1A]" />
                        <span>{item.duration}</span>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Content Column */}
                  <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`lg:col-span-6 space-y-4 ${
                      isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'
                    }`}
                  >
                    <span className="font-editorial-kicker text-xs text-[#E85D1A] font-semibold block">
                      {item.subtitle}
                    </span>

                    <h3 className="font-editorial-heading text-2xl sm:text-3xl text-[#14171A]">
                      {item.category}
                    </h3>

                    <p className="text-sm sm:text-base text-[#524B43] font-light leading-relaxed">
                      {item.description}
                    </p>

                    {/* Four Compact Treatment / Feature Pills or Buttons */}
                    <div className="pt-2">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#7D7164] mb-2.5">
                        Included Rituals &amp; Techniques:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.features.map((feat, fIdx) => (
                          <FeaturePill
                            key={fIdx}
                            label={feat}
                            variant={fIdx % 2 === 0 ? 'warm' : 'charcoal'}
                            size="md"
                            onClick={() => onSelectService(item.serviceId)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Single Clear CTA Button */}
                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() => onSelectService(item.serviceId)}
                        className="btn-brand-primary min-h-[44px]"
                      >
                        <span>{item.ctaLabel}</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        )}

        {/* =========================================================================
            ACADEMY EDITORIAL ALTERNATING LAYOUT
            Section A: Left Image | Right Content + 4 Feature Pills + CTA
            Section B: Right Image | Left Content + 4 Feature Pills + CTA
            ========================================================================= */}
        {!isSalon && (
          <div className="space-y-20 md:space-y-28">
            {ACADEMY_EDITORIAL_GROUPS.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
                >
                  {/* Image Column */}
                  <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`lg:col-span-6 ${
                      isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'
                    }`}
                  >
                    <motion.div
                      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                      className="group relative rounded-[18px] overflow-hidden card-thick-border border-2 border-[#14171A] bg-[#EAE1D5] aspect-[4/3] shadow-xs hover:shadow-xl transition-all duration-300"
                    >
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#14171A]/40 via-transparent to-transparent pointer-events-none" />

                      {/* Practical Clinic Hours Badge */}
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] bg-[#FAF8F5]/90 backdrop-blur-md text-[11px] font-mono text-[#0E2E54] border border-[#DFD6CB] font-semibold shadow-xs">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#0E2E54]" />
                        <span>{item.practicalHours}</span>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Content Column */}
                  <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`lg:col-span-6 space-y-4 ${
                      isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#0E2E54]">
                      <span className="font-semibold uppercase tracking-wider">{item.duration}</span>
                      <span>·</span>
                      <span className="text-[#7D7164]">{item.subtitle}</span>
                    </div>

                    <h3 className="font-editorial-heading text-2xl sm:text-3xl text-[#14171A]">
                      {item.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#524B43] font-light leading-relaxed">
                      {item.description}
                    </p>

                    {/* Four Compact Treatment / Feature Pills or Buttons */}
                    <div className="pt-2">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#7D7164] mb-2.5">
                        Core Syllabus Modules &amp; Standards:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.features.map((feat, fIdx) => (
                          <FeaturePill
                            key={fIdx}
                            label={feat}
                            variant={fIdx % 2 === 0 ? 'navy' : 'warm'}
                            size="md"
                            onClick={() => onSelectCourse(item.courseId)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Single Clear CTA Button */}
                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() => onSelectCourse(item.courseId)}
                        className="btn-brand-navy min-h-[44px]"
                      >
                        <span>{item.ctaLabel}</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
