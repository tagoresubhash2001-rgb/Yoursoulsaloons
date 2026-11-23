import React, { useState } from 'react';
import { DivisionMode } from '../types';
import { FeaturePill } from './FeaturePill';
import type { ServiceCategory } from '../utils/whatsapp';
import { useBooking, prefetchBookingModal } from '../context/BookingContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ACADEMY_SYLLABUS_PDF_PATH } from '../config/siteContent';
import { ArrowRight, Clock, CheckCircle2, Phone, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';
import { IMAGES, SiteImage } from '../config/images';

interface ServicesListingProps {
  mode: DivisionMode;
  onSelectService: (serviceId: string) => void;
  onSelectCourse: (courseId: string) => void;
}

type SalonGroup = 'Hair' | 'Colour' | 'Bridal & Makeup' | 'Skin & Scalp' | 'Nails';
// WhatsApp "Category:" for each service row (women's hair/skin → Women; scalp/trichology → Hair).
const ROW_CATEGORY: Record<string, ServiceCategory> = {
  'grp-hair-cut': 'Women',
  'grp-hair-colour': 'Women',
  'grp-bridal': 'Bridal',
  'grp-extensions': 'Women',
  'grp-dermal': 'Women',
  'grp-trichology': 'Hair',
  'grp-nails': 'Nails',
};
const SALON_GROUPS: Array<'All' | SalonGroup> = ['All', 'Hair', 'Colour', 'Bridal & Makeup', 'Skin & Scalp', 'Nails'];

interface EditorialServiceCategory {
  id: string;
  group: SalonGroup;
  serviceId: string;
  category: string;
  subtitle: string;
  description: string;
  duration: string;
  image: SiteImage;
  features: string[];
  ctaLabel: string;
}

interface EditorialCourseGroup {
  id: string;
  courseId: string;
  title: string;
  subtitle: string;
  description: string;
  practicalHours: string;
  image: SiteImage;
  features: string[];
  ctaLabel: string;
}

const SALON_EDITORIAL_CATEGORIES: EditorialServiceCategory[] = [
  {
    id: 'grp-hair-cut',
    group: 'Hair',
    serviceId: 'srv-1',
    category: 'Hair Design & Architectural Haircuts',
    subtitle: 'Precision French Atelier & Vidal Sassoon Sculpting',
    description: 'Every haircut is sculpted to your individual bone structure, hairline whorls, and hair density. We combine dry geometric analysis before washing with hand-honed shears, concluding with an unhurried blowout that maintains shape effortlessly for weeks.',
    duration: '75 min',
    image: IMAGES.svcHaircut,
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
    group: 'Colour',
    serviceId: 'srv-3',
    category: 'Colour Chemistry & French Balayage',
    subtitle: 'Freehand Highlighting & Low-Damage Formulations',
    description: 'Artisanal hand-painted dimensional balayage, subtle root melting, and acidic toner glazes calibrated for dark and warm undertones. Formulated with ammonia-free European pigments and bond rebuilders that safeguard hair vitality and mirror shine.',
    duration: '180 min',
    image: IMAGES.svcColour,
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
    group: 'Bridal & Makeup',
    serviceId: 'srv-8',
    category: 'Bridal Makeup & Haute Occasion Styling',
    subtitle: '4K Camera Longevity & Personalized Dupatta Draping',
    description: 'Comprehensive styling exploration for wedding celebrations (Sangeet, Muhurtham, and Reception). We ensure waterproof HD airbrush longevity, custom veil and dupatta draping, and jewelry setting designed to withstand ceremony lights and cameras.',
    duration: '120 min',
    image: IMAGES.svcBridal,
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
    group: 'Hair',
    serviceId: 'srv-1',
    category: 'Seamless Hair Extensions & Volume',
    subtitle: '100% Remy Human Hair Integration',
    description: 'Undetectable tape-in, micro-ring, and invisible weft human hair integration that adds natural volume, length, and movement without mechanical tension on native follicles. Each set is individually toned and texturized to blend seamlessly.',
    duration: '120 min',
    image: IMAGES.svcExtensions,
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
    group: 'Skin & Scalp',
    serviceId: 'srv-5',
    category: 'Cellular Dermal Care & Sculptural Facials',
    subtitle: 'Lymphatic Gua Sha & Buccal Facial Sculpting',
    description: 'Deep pore ultrasound infusions, probiotic herbal enzyme resurfacing, and sculpting buccal massage that release facial clenching, drain lymphatic congestion, and restore glowing cellular barrier hydration.',
    duration: '90 min',
    image: IMAGES.svcDermal,
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
    group: 'Skin & Scalp',
    serviceId: 'srv-7',
    category: 'Trichology Scalp Therapy & Basalt Basins',
    subtitle: 'Volcanic Clay Exfoliation & Japanese Head Spa',
    description: 'Microscopic trichoscope imaging paired with detoxifying volcanic ash, ozone micro-steam, and warmed Icelandic basalt stones positioned along the neck and shoulders in our quiet basin sanctuary.',
    duration: '60 min',
    image: IMAGES.svcTrichology,
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
    group: 'Nails',
    serviceId: 'srv-5',
    category: 'Nail Atelier & Sterile Dry Manicures',
    subtitle: 'Russian Cuticle Precision & BIAB Gel Overlays',
    description: 'Hospital-grade autoclave sterilization, precision electric filing, Builder-In-A-Bottle (BIAB) nail strengthening, and minimalist editorial nail art designed for durable, chip-resistant wear.',
    duration: '60 min',
    image: IMAGES.svcNails,
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
    practicalHours: '320 Clinic Hours',
    image: IMAGES.courseHaircut,
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
    practicalHours: '120 Hands-On Hours',
    image: IMAGES.courseColour,
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
    practicalHours: '400 Practical Clinic Hours',
    image: IMAGES.courseEsthetics,
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
    practicalHours: '90 Hands-on Studio Hours',
    image: IMAGES.courseMakeup,
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
  const { openBooking } = useBooking();
  const [activeGroup, setActiveGroup] = useState<'All' | SalonGroup>('All');
  const visibleSalon =
    activeGroup === 'All' ? SALON_EDITORIAL_CATEGORIES : SALON_EDITORIAL_CATEGORIES.filter((c) => c.group === activeGroup);

  return (
    <section className="w-full py-16 md:py-24 bg-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={20} duration={0.6} className="text-center max-w-3xl mx-auto space-y-3">
          <span className="font-editorial-kicker text-xs text-subtle">
            {isSalon ? 'Haute Coiffure & Dermal Menu' : 'Accredited Curriculum & Syllabi'}
          </span>
          <h2 className="font-editorial-heading text-3xl sm:text-4xl md:text-5xl text-dark">
            {isSalon ? 'Curated Atelier Services & Rituals' : 'Professional Beauty Education Programs'}
          </h2>
          <p className="font-editorial-lead text-sm sm:text-base text-muted">
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
          <div
            role="toolbar"
            aria-label="Filter services by category"
            className="sticky top-[84px] sm:top-[104px] z-30 -mx-4 px-4 py-3 bg-light/90 backdrop-blur-md flex gap-2 overflow-x-auto sm:flex-wrap sm:justify-center [scrollbar-width:none] !-mt-10 md:!-mt-16"
          >
            {SALON_GROUPS.map((g) => (
              <button key={g} type="button" aria-pressed={activeGroup === g} onClick={() => setActiveGroup(g)} className="chip shrink-0">
                {g}
              </button>
            ))}
          </div>
        )}

        {isSalon && (
          <div className="space-y-20 md:space-y-28">
            {visibleSalon.map((item, index) => {
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
                      className="group relative rounded-[18px] overflow-hidden card-thick-border border-border bg-surface-2 aspect-[4/3] shadow-xs hover:shadow-xl transition-all duration-300"
                    >
                      <img
                        src={item.image.src}
                        srcSet={item.image.srcSet}
                        sizes="(max-width: 1024px) 100vw, 600px"
                        alt={item.image.alt}
                        width={item.image.width}
                        height={item.image.height}
                        decoding="async"
                        style={{ objectPosition: item.image.position }}
                        className="card-media w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Duration Unboxed Badge */}
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] bg-light/90 backdrop-blur-md text-[11px] font-mono text-dark border border-border shadow-xs">
                        <Clock className="h-3.5 w-3.5 text-primary" />
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
                    <span className="font-editorial-kicker text-xs text-primary font-semibold block">
                      {item.subtitle}
                    </span>

                    <h3 className="font-editorial-heading text-2xl sm:text-3xl text-dark">
                      {item.category}
                    </h3>

                    <p className="text-sm sm:text-base text-muted font-light leading-relaxed">
                      {item.description}
                    </p>

                    {/* Four Compact Treatment / Feature Pills or Buttons */}
                    <div className="pt-2">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-subtle mb-2.5">
                        Included Rituals &amp; Techniques:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.features.map((feat, fIdx) => (
                          <FeaturePill
                            key={fIdx}
                            label={feat}
                            variant={fIdx % 2 === 0 ? 'warm' : 'charcoal'}
                            size="md"
                            onClick={() => openBooking({ kind: 'service', service: item.category, category: ROW_CATEGORY[item.id] ?? 'Women' })}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Primary: book on WhatsApp · Secondary: call the salon */}
                    <div className="pt-3 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => openBooking({ kind: 'service', service: item.category, category: ROW_CATEGORY[item.id] ?? 'Women' })}
                        onPointerEnter={prefetchBookingModal}
                        aria-label={`${item.ctaLabel} on WhatsApp`}
                        className="btn-brand-primary"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        <span>{item.ctaLabel}</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <a href="tel:+919553888432" className="btn-brand-outline">
                        <Phone className="h-4 w-4" />
                        <span>Call 095538 88432</span>
                      </a>
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
                      className="group relative rounded-[18px] overflow-hidden card-thick-border border-border bg-surface-2 aspect-[4/3] shadow-xs hover:shadow-xl transition-all duration-300"
                    >
                      <img
                        src={item.image.src}
                        srcSet={item.image.srcSet}
                        sizes="(max-width: 1024px) 100vw, 600px"
                        alt={item.image.alt}
                        width={item.image.width}
                        height={item.image.height}
                        decoding="async"
                        style={{ objectPosition: item.image.position }}
                        className="card-media w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent pointer-events-none" />

                      {/* Practical Clinic Hours Badge */}
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] bg-light/90 backdrop-blur-md text-[11px] font-mono text-accent border border-border font-semibold shadow-xs">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
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
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-accent">
                      <span className="text-subtle">{item.subtitle}</span>
                    </div>

                    <h3 className="font-editorial-heading text-2xl sm:text-3xl text-dark">
                      {item.title}
                    </h3>

                    <p className="text-sm sm:text-base text-muted font-light leading-relaxed">
                      {item.description}
                    </p>

                    {/* Four Compact Treatment / Feature Pills or Buttons */}
                    <div className="pt-2">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-subtle mb-2.5">
                        Core Syllabus Modules &amp; Standards:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.features.map((feat, fIdx) => (
                          <FeaturePill
                            key={fIdx}
                            label={feat}
                            variant={fIdx % 2 === 0 ? 'navy' : 'warm'}
                            size="md"
                            onClick={() => openBooking({ kind: 'course', course: item.title })}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Primary: enquire on WhatsApp · Secondary: download the syllabus */}
                    <div className="pt-3 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => openBooking({ kind: 'course', course: item.title })}
                        onPointerEnter={prefetchBookingModal}
                        aria-label={`${item.ctaLabel} on WhatsApp`}
                        className="btn-brand-navy"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        <span>{item.ctaLabel}</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <a
                        href={ACADEMY_SYLLABUS_PDF_PATH}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-brand-outline"
                      >
                        <FileText className="h-4 w-4" />
                        <span>Syllabus PDF</span>
                      </a>
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
