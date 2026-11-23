import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { BannerSlot } from '../components/BannerSlot';
import { EditorialSection } from '../components/EditorialSection';
import { FAQSection } from '../components/FAQSection';
import { BrandMarquee } from '../components/BrandMarquee';
import { DualRowTestimonials } from '../components/DualRowTestimonials';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import { AcademyModulesSection } from '../components/AcademyModulesSection';
import { BANNERS, ACADEMY_COURSES, ACADEMY_ABOUT_SECTIONS } from '../config/siteContent';
import { IMAGES, SiteImage } from '../config/images';
import { SHOW_SPECIALIST_COURSES } from '../config/features';
import { buildWhatsAppLink, openWhatsAppLink, normalizeIndianPhone, validateIndianPhone } from '../utils/whatsapp';
import { useBooking, prefetchBookingModal } from '../context/BookingContext';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import {
  ArrowRight,
  Sparkles,
  Phone,
  Building2,
  CheckCircle2,
  Send,
  ChevronRight,
  Scissors,
  MessageCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal, ScrollRevealItem } from '../components/ScrollReveal';
import { FeaturePill } from '../components/FeaturePill';

interface HomePageProps {
  onOpenBookingModal: (serviceId?: string, courseId?: string) => void;
}

// 6 Major Salon Service Categories for Section 2
type ServiceGroup = 'Hair' | 'Bridal & Makeup' | 'Skin & Scalp' | 'Nails' | 'Men';
const SERVICE_GROUPS: Array<'All' | ServiceGroup> = ['All', 'Hair', 'Bridal & Makeup', 'Skin & Scalp', 'Nails', 'Men'];

interface ServiceCategoryCard {
  id: string;
  group: ServiceGroup;
  serviceId: string;
  title: string;
  subtitle: string;
  description: string;
  image: SiteImage;
  highlights: string[];
}

const SALON_SIX_CATEGORIES: ServiceCategoryCard[] = [
  {
    id: 'cat-1',
    group: 'Hair',
    serviceId: 'srv-1',
    title: 'Hair Styling & Haircuts',
    subtitle: 'Architectural Cuts & Precision Shaping',
    description: 'Precision Vidal Sassoon and French atelier techniques calibrated to bone structure, growth whorls, and lifestyle for effortless home maintenance.',
    image: IMAGES.homeHairStyling,
    highlights: ['Micro-texture evaluation', 'Sensory scalp shampoo', 'Editorial blowout finish'],
  },
  {
    id: 'cat-2',
    group: 'Hair',
    serviceId: 'srv-3',
    title: 'Hair Colouring & Highlights',
    subtitle: 'French Balayage & Low-Damage Formulations',
    description: 'Artisanal hand-painted balayage, dimensional foilayage, root shadows, and acidic glosses with ammonia-free European pigments that safeguard hair fibers.',
    image: IMAGES.homeHairColour,
    highlights: ['Olaplex bond protection', 'Soft natural regrowth', 'Custom tone calibration'],
  },
  {
    id: 'cat-3',
    group: 'Bridal & Makeup',
    serviceId: 'srv-8',
    title: 'Bridal Makeup & Occasion Styling',
    subtitle: 'Signature Indian Bridal & High-Definition Artistry',
    description: 'Bespoke bridal consultations, airbrush HD makeup, dupatta draping, and jewelry setting designed to remain pristine through celebratory ceremonies.',
    image: IMAGES.homeBridal,
    highlights: ['Pre-wedding skin prep', 'Water-resistant HD finish', 'Private bridal suite'],
  },
  {
    id: 'cat-4',
    group: 'Hair',
    serviceId: 'srv-1',
    title: 'Hair Extensions & Enhancements',
    subtitle: '100% Remy Human Hair Integration',
    description: 'Seamless tape-in, micro-ring, and invisible weft human hair extensions that add natural volume, density, and length without straining natural roots.',
    image: IMAGES.homeExtensions,
    highlights: ['Exact shade blending', 'Undetectable flat bonds', 'Re-usable premium hair'],
  },
  {
    id: 'cat-5',
    group: 'Nails',
    serviceId: 'srv-5',
    title: 'Nail Care & Extensions',
    subtitle: 'Russian Dry Manicures & BIAB Overlays',
    description: 'Sterile medical-grade cuticle restoration, Builder-In-A-Bottle (BIAB) nail strengthening, sculpted gel extensions, and artisanal minimalist nail art.',
    image: IMAGES.homeNails,
    highlights: ['Autoclaved instruments', 'Non-chipping 4-week wear', 'Nourishing keratin cuticle oil'],
  },
  {
    id: 'cat-6',
    group: 'Skin & Scalp',
    serviceId: 'srv-5',
    title: 'Skin Care & Beauty Treatments',
    subtitle: 'Cellular Facials & Lymphatic Buccal Sculpting',
    description: 'Deep pore hydro-infusions, probiotic resurfacing peels, and buccal intra-oral facial sculpting that drain fluid retention and awaken luminous dermal glow.',
    image: IMAGES.homeSkin,
    highlights: ['Non-comedogenic botanicals', 'Facial lymphatic drainage', 'Barrier repair hydration'],
  },
  {
    id: 'cat-7',
    group: 'Skin & Scalp',
    serviceId: 'srv-2',
    title: 'Scalp Detox & Trichology Therapy',
    subtitle: 'Micro-Mist Steam & Basalt Head Spa',
    description: 'Microscopic scalp scanning, warm volcanic stone neck therapy, and high-frequency ozone steam that purifies follicular build-up and stimulates growth.',
    image: IMAGES.homeScalp,
    highlights: ['Digital follicular scan', 'Volcanic basalt basin', 'Ozone peptide mist'],
  },
  {
    id: 'cat-8',
    group: 'Hair',
    serviceId: 'srv-4',
    title: 'Texture Realignment & Cysteine',
    subtitle: 'Formaldehyde-Free Botanical Smoothing',
    description: 'Silk protein infusions and botanical keratin that tame coastal humidity frizz while preserving hair body, bounce, and natural wave integrity.',
    image: IMAGES.homeTexture,
    highlights: ['Zero harsh chemicals', 'Monsoon humidity guard', 'High-gloss mirror finish'],
  },
  {
    id: 'cat-9',
    group: 'Men',
    serviceId: 'srv-1',
    title: "Men's Atelier Grooming & Beard Design",
    subtitle: 'Hot Towel Rituals & Bespoke Scissor Shaping',
    description: 'Precision scissor fades, botanical hot towel shaves, beard contour sculpting, and calming scalp clarify rituals designed for the modern gentleman.',
    image: IMAGES.homeMens,
    highlights: ['Hot botanical compress', 'Razor precision lines', 'Scalp invigorating tonic'],
  },
];

// 8 Numbered Steps of "Our Approach" for Section 3
interface ApproachStep {
  step: string;
  title: string;
  description: string;
}

const APPROACH_STEPS: ApproachStep[] = [
  {
    step: '01',
    title: 'Discover Needs',
    description: 'We listen attentively to your hair journey, lifestyle, styling routine, past sensitivities, and aesthetic aspirations.',
  },
  {
    step: '02',
    title: 'Personal Consultation',
    description: 'A 15-minute dialogue analyzing facial symmetry, bone structure, eye undertones, and natural wave patterns.',
  },
  {
    step: '03',
    title: 'Assessment',
    description: 'Diagnostic examination of hair porosity, follicular health, and dermal moisture under calibrated daylight lighting.',
  },
  {
    step: '04',
    title: 'Personalised Planning',
    description: 'Custom formulation strategy and precision cut blueprint shared transparently during your consultation.',
  },
  {
    step: '05',
    title: 'Product Selection',
    description: 'Curating cruelty-free European formulations and bond rebuilders specifically matched to your hair density.',
  },
  {
    step: '06',
    title: 'Delivery',
    description: 'Unhurried execution in tranquil private bays with sensory warm towels, scalp acupressure, and artisan beverages.',
  },
  {
    step: '07',
    title: 'Aftercare',
    description: 'Clear personalized home maintenance regimen explaining washing techniques and humidity defense for longevity.',
  },
  {
    step: '08',
    title: 'Maintenance',
    description: 'Scheduled follow-up touchups and gloss refreshes to preserve hair vitality without stressful damage.',
  },
];

export const HomePage: React.FC<HomePageProps> = ({ onOpenBookingModal }) => {
  const { mode, navigateTo } = useNavigation();
  const { openBooking } = useBooking();
  const isSalon = mode === 'salon';
  const [activeGroup, setActiveGroup] = useState<'All' | ServiceGroup>('All');
  const visibleCategories =
    activeGroup === 'All' ? SALON_SIX_CATEGORIES : SALON_SIX_CATEGORIES.filter((c) => c.group === activeGroup);

  // Franchise inquiry form state for Section 11
  const [franchiseSubmitted, setFranchiseSubmitted] = useState(false);
  const [franchiseForm, setFranchiseForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Guntur',
    experience: 'Salon Owner / Entrepreneur',
    notes: '',
  });

  const [franchiseError, setFranchiseError] = useState('');
  const handleFranchiseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!franchiseForm.name.trim() || !franchiseForm.phone.trim()) {
      setFranchiseError('Please enter your name and phone number.');
      return;
    }
    if (!validateIndianPhone(franchiseForm.phone)) {
      setFranchiseError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    setFranchiseError('');
    openWhatsAppLink(
      buildWhatsAppLink('franchise', {
        name: franchiseForm.name,
        phone: normalizeIndianPhone(franchiseForm.phone) ?? franchiseForm.phone,
        email: franchiseForm.email,
        city: franchiseForm.city,
        background: franchiseForm.experience,
        note: franchiseForm.notes,
      })
    );
    setFranchiseSubmitted(true);
  };

  // =========================================================================
  // ACADEMY HOME EXPERIENCE (Strictly Dedicated Mode Separation)
  // =========================================================================
  if (!isSalon) {
    const heroBanner = BANNERS.academy_home_hero;
    const featuredCourses = ACADEMY_COURSES;
    // The About page shows these sections with their own photos, so the home page
    // uses different photos to keep every image unique across the site.
    const academyEditorialSections = [
      { section: ACADEMY_ABOUT_SECTIONS[0], image: IMAGES.acadHomeTrainers },
      { section: ACADEMY_ABOUT_SECTIONS[3], image: IMAGES.acadHomeApproach },
    ].map(({ section, image }) => ({
      ...section,
      id: `${section.id}-home`,
      imageSlot: {
        ...section.imageSlot,
        slotId: `${section.imageSlot.slotId}_home`,
        imageSrc: image.src,
        imageSrcSet: image.srcSet,
        altText: image.alt,
      },
    }));

    return (
      <div className="w-full">
        {/* Academy Hero Banner */}
        <BannerSlot
          banner={heroBanner}
          priority={true}
          isHero={true}
          showScrollIndicator={true}
          ctaText="Apply for Intake"
          onCtaClick={() => navigateTo('services')}
          secondaryCtaText="Schedule Campus Tour"
          onSecondaryCtaClick={() => navigateTo('contact')}
        />

        {/* Academy Manifesto Statement */}
        <section className="relative w-full py-20 sm:py-28 border-t border-surface-2 bg-light">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal direction="up" distance={25} duration={0.7}>
              <span className="font-editorial-kicker text-xs text-accent">
                The Academy Standard · Masterclass Rigor
              </span>
              <h2 className="mt-4 font-editorial-heading text-3xl sm:text-4xl md:text-5xl text-dark">
                Empowering future beauty leaders through geometric precision and commercial clinic mastery.
              </h2>
              <p className="mt-6 font-editorial-lead text-base sm:text-lg text-muted max-w-3xl mx-auto">
                Guided by active runway directors and clinical estheticians, our students train on live models in our public clinic laboratory, mastering client psychology, chemical safety, and salon business acumen.
              </p>

            </ScrollReveal>
          </div>
        </section>

        {/* Academy 4 Learning Mode Cards + Comparison Section */}
        <AcademyModulesSection onExploreCourses={() => navigateTo('services', 'academy')} />

        {/* Academy Flagship Programs — the 6 specialist diplomas (hidden while SHOW_SPECIALIST_COURSES is off) */}
        {SHOW_SPECIALIST_COURSES && (
        <section className="w-full py-20 sm:py-28 border-t border-surface-2 bg-surface">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up" distance={20} duration={0.6}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <span className="font-editorial-kicker text-xs text-accent">
                    Featured Syllabi &amp; Diplomas
                  </span>
                  <h3 className="mt-2 font-editorial-heading text-3xl sm:text-4xl text-dark">
                    Professional Cosmetology Programs
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('services')}
                  className="inline-flex items-center gap-2 min-h-[44px] text-xs font-mono uppercase tracking-wider text-accent hover:text-primary cursor-pointer group font-semibold"
                >
                  <span>Explore All Programs</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {featuredCourses.map((course, cIdx) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: cIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                  className="h-full flex flex-col justify-between rounded-[16px] card-thick-border border-border bg-light p-8 shadow-xs hover:border-accent hover:shadow-lg transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-subtle font-mono">
                      <span className="uppercase tracking-wider text-accent font-semibold">{course.discipline}</span>
                      <span>{course.duration}</span>
                    </div>
                    <h4 className="mt-3 font-serif text-2xl text-dark leading-snug">
                      {course.title}
                    </h4>
                    <p className="mt-3 text-xs sm:text-sm text-muted font-light leading-relaxed">
                      {course.description}
                    </p>
                    <div className="mt-4 text-xs font-mono text-accent font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                      <span>{course.practicalHours}</span>
                    </div>
                  </div>
                  <div className="mt-8 pt-5 border-t border-surface-2 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-subtle">{course.level}</span>
                    <button
                      type="button"
                      onClick={() => onOpenBookingModal(undefined, course.id)}
                      className="btn-brand-navy min-h-[44px] px-4 py-1.5 text-xs"
                    >
                      <span>Enquire Now</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* Academy Alternating Storytelling */}
        {academyEditorialSections.map((section, idx) => (
          <EditorialSection key={section.id} section={section} isFirst={idx === 0} />
        ))}

        {/* Student Testimonials Carousel */}
        <TestimonialCarousel currentMode="academy" onOpenBookingModal={onOpenBookingModal} />

        {/* Academy FAQ */}
        <FAQSection onOpenBookingModal={onOpenBookingModal} currentMode="academy" />

        {/* Academy Admissions CTA */}
        <section className="relative w-full py-20 sm:py-24 border-t border-border bg-light">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="font-editorial-kicker text-xs text-accent">Admissions Concierge</span>
            <h3 className="font-serif text-3xl sm:text-4xl text-dark">
              Visit the Campus in Guntur
            </h3>
            <p className="text-sm sm:text-base text-muted max-w-xl mx-auto">
              Schedule a personalized walkthrough of our hair studios, dermal clinic lab, and student lounge. Admissions advisors are available Tuesday to Sunday.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => openBooking({ kind: 'course', note: 'I would like to schedule a campus walkthrough.' })}
                className="btn-brand-primary"
              >
                Schedule Campus Walkthrough
              </button>
              <button
                type="button"
                onClick={() => navigateTo('contact')}
                className="btn-brand-outline"
              >
                Contact Admissions Office
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // =========================================================================
  // SALON HOME EXPERIENCE (Exact 12-Section Architecture in Strict Sequence)
  // =========================================================================
  return (
    <div className="w-full">
      
      {/* -------------------------------------------------------------------
          SECTION 1: HERO BANNER (SLOT 1)
          Primary CTA: 'Book Slot Now' -> onOpenBookingModal()
          Secondary CTA: 'Explore Services' -> navigateTo('services')
          ------------------------------------------------------------------- */}
      <BannerSlot
        banner={BANNERS.salon_home_hero}
        priority={true}
        isHero={true}
        showScrollIndicator={true}
        ctaText="Book Slot Now"
        onCtaClick={() => onOpenBookingModal()}
        secondaryCtaText="Explore Services"
        onSecondaryCtaClick={() => navigateTo('services')}
      />

      {/* -------------------------------------------------------------------
          SECTION 2: SIX MAJOR SALON SERVICE CATEGORIES
          With images, descriptions, starting prices, and 'Book Slot Now' preselection
          ------------------------------------------------------------------- */}
      <section className="w-full py-20 sm:py-28 bg-light border-t border-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal direction="up" distance={22} duration={0.65}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-editorial-kicker text-xs text-subtle">
                Curated Menu · Bespoke Beauty Artistry
              </span>
              <h2 className="mt-3 font-editorial-heading text-3xl sm:text-4xl md:text-5xl text-dark">
                Signature Salon Categories
              </h2>
              <p className="mt-4 font-editorial-lead text-base sm:text-lg text-muted">
                Every treatment is crafted with unhurried devotion, botanical chemistry, and medical-grade sanitation in private or semi-private styling bays.
              </p>
            </div>
          </ScrollReveal>

          {/* Category filter chips */}
          <div role="toolbar" aria-label="Filter services by category" className="-mx-4 px-4 mb-10 flex gap-2 overflow-x-auto sm:flex-wrap sm:justify-center sm:overflow-visible [scrollbar-width:none]">
            {SERVICE_GROUPS.map((g) => (
              <button
                key={g}
                type="button"
                aria-pressed={activeGroup === g}
                onClick={() => setActiveGroup(g)}
                className="chip shrink-0"
              >
                {g}
              </button>
            ))}
          </div>

          {/* Category Cards Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
            {visibleCategories.map((cat, idx) => (
              <motion.article
                layout
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (idx % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group card-hover flex flex-col justify-between rounded-[16px] card-thick-border border-border bg-light overflow-hidden shadow-2xs hover:border-primary/60"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2">
                    <img
                      src={cat.image.src}
                      srcSet={cat.image.srcSet}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                      alt={cat.image.alt}
                      width={cat.image.width}
                      height={cat.image.height}
                      decoding="async"
                      style={{ objectPosition: cat.image.position }}
                      className="card-media w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-light">
                      <span className="text-[11px] font-semibold tracking-wider uppercase bg-dark/70 backdrop-blur-xs px-2.5 py-1 rounded-[6px]">
                        {cat.group}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <span className="font-editorial-kicker text-[11px] text-primary font-semibold">
                      {cat.subtitle}
                    </span>
                    <h3 className="mt-1.5 font-serif text-2xl text-dark group-hover:text-primary transition-colors duration-250">
                      {cat.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted font-light leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="mt-5 pt-4 border-t border-surface-2">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-subtle mb-2.5">
                        Ritual Highlights:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.highlights.map((item, hIdx) => (
                          <FeaturePill
                            key={hIdx}
                            label={item}
                            variant="warm"
                            size="sm"
                            onClick={() => openBooking({ kind: 'service', service: cat.title })}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => openBooking({ kind: 'service', service: cat.title })}
                    onPointerEnter={prefetchBookingModal}
                    aria-label={`Book ${cat.title} on WhatsApp`}
                    className="w-full btn-brand-primary text-xs justify-between"
                  >
                    <span className="inline-flex items-center gap-2"><WhatsAppIcon className="h-4 w-4" />Book Slot Now</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-250 group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.article>
            ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => navigateTo('services')}
              className="btn-brand-outline min-h-[44px]"
            >
              <span>Explore Complete 24+ Treatment Menu</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------------
          SECTION 3: OUR APPROACH (8 Numbered Steps)
          ------------------------------------------------------------------- */}
      <section className="w-full py-20 sm:py-28 bg-surface border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal direction="up" distance={22} duration={0.65}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-editorial-kicker text-xs text-subtle">
                The Methodical Discipline · 8-Step Blueprint
              </span>
              <h2 className="mt-3 font-editorial-heading text-3xl sm:text-4xl md:text-5xl text-dark">
                Our Consultation &amp; Care Approach
              </h2>
              <p className="mt-4 font-editorial-lead text-base sm:text-lg text-muted">
                We eliminated hasty turnover in favor of an unhurried, diagnostic protocol. Every visit follows this structured, personalized standard.
              </p>
            </div>
          </ScrollReveal>

          {/* 8 Step Cards (4 cols on lg, 2 on md, 1 on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {APPROACH_STEPS.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="rounded-[14px] bg-light card-thick-border border-border p-6 sm:p-7 shadow-xs hover:border-primary hover:shadow-md transition-all flex flex-col justify-between group cursor-default"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-surface-2">
                    <span className="font-serif text-3xl font-light text-primary group-hover:scale-105 transition-transform inline-block origin-left">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-subtle">
                      PHASE {idx + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-dark font-normal group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------------
          SECTION 4: PURCHASE OPPORTUNITY / RETAIL EXPERIENCE (Aftercare Desk)
          Honest aftercare consultation, zero fake checkout
          ------------------------------------------------------------------- */}
      <section className="w-full py-20 sm:py-28 bg-light border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[20px] bg-gradient-to-br from-surface via-light to-surface card-thick-border border-border p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-5">
                <span className="font-editorial-kicker text-xs text-primary font-semibold">
                  Atelier Retail Desk · Prescribed Aftercare
                </span>
                <h2 className="font-editorial-heading text-3xl sm:text-4xl text-dark">
                  Take the Sanctuary Home: Curated Aftercare Formulations
                </h2>
                <p className="text-sm sm:text-base text-muted font-light leading-relaxed">
                  Hair color longevity and dermal clarity rely on how hair is treated between atelier visits. During your appointment, our stylists evaluate your home water hardness, heat styling habits, and scalp biome to formulate a bespoke aftercare regimen.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.08 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="p-5 rounded-[12px] bg-light card-thick-border border-border shadow-xs hover:border-primary hover:shadow-sm transition-all"
                  >
                    <div className="font-semibold text-xs text-dark font-sans">
                      Authentic Global Formulations
                    </div>
                    <div className="text-xs text-muted mt-1 font-light leading-relaxed">
                      Directly sourced from Kérastase, Olaplex, Moroccanoil, and Dyson Professional.
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.14 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="p-5 rounded-[12px] bg-light card-thick-border border-border shadow-xs hover:border-primary hover:shadow-sm transition-all"
                  >
                    <div className="font-semibold text-xs text-dark font-sans">
                      Diagnostic Retail Desk
                    </div>
                    <div className="text-xs text-muted mt-1 font-light leading-relaxed">
                      No automated generic checkout. Pick up your tailored regimen after your ritual or request a concierge consultation.
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.2 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="p-5 rounded-[12px] bg-light card-thick-border border-border shadow-xs hover:border-primary hover:shadow-sm transition-all"
                  >
                    <div className="font-semibold text-xs text-dark font-sans">
                      Water Hardness Defense
                    </div>
                    <div className="text-xs text-muted mt-1 font-light leading-relaxed">
                      Chelating shampoos and acidifying rinses formulated to prevent mineral buildup and copper brassiness.
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.26 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="p-5 rounded-[12px] bg-light card-thick-border border-border shadow-xs hover:border-primary hover:shadow-sm transition-all"
                  >
                    <div className="font-semibold text-xs text-dark font-sans">
                      Thermal &amp; UV Shields
                    </div>
                    <div className="text-xs text-muted mt-1 font-light leading-relaxed">
                      Invisible barrier serums protecting hair cuticle lipids up to 230°C against blow-driers and direct sunlight.
                    </div>
                  </motion.div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onOpenBookingModal()}
                    className="btn-brand-primary"
                  >
                    <span>Book Slot &amp; Request Aftercare Plan</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <a
                    href="tel:09553888432"
                    className="btn-brand-outline"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Call Concierge: 095538 88432</span>
                  </a>
                </div>
              </div>

              {/* Retail Visual Showcase */}
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group relative rounded-[16px] overflow-hidden card-thick-border border-border aspect-[4/3] bg-surface-2 shadow-md hover:shadow-xl hover:border-primary transition-all duration-300"
                >
                  <img
                    src={IMAGES.homeRetail.src}
                    srcSet={IMAGES.homeRetail.srcSet}
                    sizes="(max-width: 1024px) 100vw, 560px"
                    alt={IMAGES.homeRetail.alt}
                    width={IMAGES.homeRetail.width}
                    height={IMAGES.homeRetail.height}
                    decoding="async"
                    className="w-full h-full object-cover card-media"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent flex items-end p-6">
                    <div className="text-light text-xs font-mono">
                      <div className="text-primary font-semibold uppercase tracking-wider">YOUR SOUL Atelier Dispensary</div>
                      <div>Prescribed directly by your senior stylist</div>
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------
          SECTION 5: OUR APPROACH — VISUAL EXPLANATION (Alternating Editorial Rows)
          Row 1: The Diagnostic Consultation & Precision Cut
          Row 2: The Dermal Barrier & Restorative Basin
          ------------------------------------------------------------------- */}
      <section className="w-full py-20 sm:py-28 bg-surface border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
          
          <ScrollReveal direction="up" distance={20} duration={0.65}>
            <div className="text-center max-w-3xl mx-auto">
              <span className="font-editorial-kicker text-xs text-subtle">
                In-Depth Rituals · Architectural Execution
              </span>
              <h2 className="mt-3 font-editorial-heading text-3xl sm:text-4xl text-dark">
                The Anatomy of a Your Soul Appointment
              </h2>
            </div>
          </ScrollReveal>

          {/* Row 1: The Diagnostic Consultation & Precision Cut */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1 space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider">
                <Scissors className="h-4 w-4" />
                <span>Phase I · Diagnostic Consultation &amp; Cut</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-dark">
                Sculpting Form to Facial Geometry
              </h3>
              <p className="text-sm sm:text-base text-muted font-light leading-relaxed">
                We believe a haircut should not require 45 minutes of round-brush wrestling every morning. By dissecting hair density, hairline growth directions, and skull contours dry before washing, our senior stylists create precision architectural lines that naturally fall into place as hair air-dries.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <li className="card-hover rounded-[12px] border border-border bg-light px-4 py-3.5 text-sm text-text-soft leading-snug hover:border-primary/50">
                  <span className="block text-[11px] font-semibold tracking-wider text-primary mb-1">01</span>
                  Dry geometric hair analysis before wet sectioning
                </li>
                <li className="card-hover rounded-[12px] border border-border bg-light px-4 py-3.5 text-sm text-text-soft leading-snug hover:border-primary/50">
                  <span className="block text-[11px] font-semibold tracking-wider text-primary mb-1">02</span>
                  Handcrafted Japanese steel shears for zero cuticle split
                </li>
                <li className="card-hover rounded-[12px] border border-border bg-light px-4 py-3.5 text-sm text-text-soft leading-snug hover:border-primary/50">
                  <span className="block text-[11px] font-semibold tracking-wider text-primary mb-1">03</span>
                  Complete lifestyle and morning styling speed alignment
                </li>
              </ul>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openBooking({ kind: 'service', service: 'Bespoke Architectural Haircut & Blow-Dry' })}
                  className="btn-brand-primary"
                >
                  Book Precision Haircut Slot
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group rounded-[16px] overflow-hidden card-thick-border border-border aspect-[4/3] shadow-md hover:shadow-xl hover:border-primary transition-all duration-300"
              >
                <img
                  src={IMAGES.homeApproachCut.src}
                  srcSet={IMAGES.homeApproachCut.srcSet}
                  sizes="(max-width: 1024px) 100vw, 560px"
                  alt={IMAGES.homeApproachCut.alt}
                  width={IMAGES.homeApproachCut.width}
                  height={IMAGES.homeApproachCut.height}
                  decoding="async"
                  className="w-full h-full object-cover card-media"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>

          {/* Row 2: The Dermal Barrier & Restorative Basin */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group rounded-[16px] overflow-hidden card-thick-border border-border aspect-[4/3] shadow-md hover:shadow-xl hover:border-accent transition-all duration-300"
              >
                <img
                  src={IMAGES.homeApproachBasin.src}
                  srcSet={IMAGES.homeApproachBasin.srcSet}
                  sizes="(max-width: 1024px) 100vw, 560px"
                  alt={IMAGES.homeApproachBasin.alt}
                  width={IMAGES.homeApproachBasin.width}
                  height={IMAGES.homeApproachBasin.height}
                  decoding="async"
                  className="w-full h-full object-cover card-media"
                  loading="lazy"
                />
              </motion.div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider">
                <Sparkles className="h-4 w-4" />
                <span>Phase II · The Basin Sanctuary &amp; Scalp Detox</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-dark">
                Warm Basalt Stones, Ozone Vapor &amp; Pure Silence
              </h3>
              <p className="text-sm sm:text-base text-muted font-light leading-relaxed">
                Step into our dimmed washing sanctuary where soft water is purified and filtered to eliminate mineral buildup. Heated Icelandic basalt stones are placed along the neck and shoulders to release cranial tension, while warm micro-steam infuses botanical peptides deep into follicles.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <li className="card-hover rounded-[12px] border border-border bg-light px-4 py-3.5 text-sm text-text-soft leading-snug hover:border-accent/50">
                  <span className="block text-[11px] font-semibold tracking-wider text-accent mb-1">01</span>
                  Filtered softened water calibrated for Deccan region minerals
                </li>
                <li className="card-hover rounded-[12px] border border-border bg-light px-4 py-3.5 text-sm text-text-soft leading-snug hover:border-accent/50">
                  <span className="block text-[11px] font-semibold tracking-wider text-accent mb-1">02</span>
                  Japanese scalp acupressure relieving tension and migraine strain
                </li>
                <li className="card-hover rounded-[12px] border border-border bg-light px-4 py-3.5 text-sm text-text-soft leading-snug hover:border-accent/50">
                  <span className="block text-[11px] font-semibold tracking-wider text-accent mb-1">03</span>
                  Zero chemical smell, quiet acoustic environment with sensory tea
                </li>
              </ul>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openBooking({ kind: 'service', service: 'Microbiome Scalp Detox & High-Frequency Therapy' })}
                  className="btn-brand-navy"
                >
                  Book Scalp &amp; Basin Ritual
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------------
          SECTION 6: OUR PARTNERS / BRANDS WE FEATURE (12-Brand Marquee)
          ------------------------------------------------------------------- */}
      <BrandMarquee />

      {/* -------------------------------------------------------------------
          SECTION 7: SIGNATURE SANCTUARY EXPERIENCE (Basalt hot stone basins)
          ------------------------------------------------------------------- */}
      <section className="relative w-full py-24 sm:py-32 border-y border-dark-line bg-dark text-light overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `radial-gradient(circle at 80% 20%, var(--color-primary) 0%, transparent 40%), radial-gradient(circle at 20% 80%, var(--color-accent) 0%, transparent 45%)`
          }}
          aria-hidden="true" 
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <ScrollReveal direction="up" distance={25} duration={0.7} className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs tracking-widest uppercase text-brass">
                The Sanctuary Protocol · Guntur Atelier
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-light">
                Basalt hot stone basins, silica vapor, and pure silence.
              </h2>

              <p className="text-sm sm:text-base text-mist font-light leading-relaxed max-w-xl">
                Our scalp and dermal treatments combine mineral-rich clays, ozone steam baths, and unhurried acoustic stillness. Step away from the daily rush into an architectural retreat calibrated for restorative sensory renewal.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenBookingModal()}
                  className="btn-brand-primary min-h-[44px]"
                >
                  <span>Book Slot Now</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
                <a
                  href="tel:09553888432"
                  className="btn-hero-secondary min-h-[44px]"
                >
                  <Phone className="h-4 w-4 mr-1.5" />
                  <span>Call 095538 88432</span>
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={20} staggerChildren={0.12} className="lg:col-span-6 space-y-4">
              <ScrollRevealItem>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-6 rounded-[12px] card-thick-border border-dark-line bg-dark-soft/90 backdrop-blur-xs transition-colors hover:border-primary-bright hover:bg-dark-soft shadow-sm cursor-default"
                >
                  <div className="flex items-center gap-3 text-xs font-mono text-brass mb-2">
                    <span className="font-bold text-primary-bright">Phase 01</span>
                    <span>·</span>
                    <span className="uppercase tracking-wider">Volcanic Ash &amp; Scalp Micro-Circulation</span>
                  </div>
                  <p className="text-xs sm:text-sm text-mist-dim font-light leading-relaxed">
                    Deep follicular detoxifying clay combined with micro-massaging stimulation that relieves cranial tension and prepares hair fibers for pure absorption.
                  </p>
                </motion.div>
              </ScrollRevealItem>

              <ScrollRevealItem>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-6 rounded-[12px] card-thick-border border-dark-line bg-dark-soft/90 backdrop-blur-xs transition-colors hover:border-primary-bright hover:bg-dark-soft shadow-sm cursor-default"
                >
                  <div className="flex items-center gap-3 text-xs font-mono text-brass mb-2">
                    <span className="font-bold text-primary-bright">Phase 02</span>
                    <span>·</span>
                    <span className="uppercase tracking-wider">Ozone Vapor &amp; Dermal Lipid Seal</span>
                  </div>
                  <p className="text-xs sm:text-sm text-mist-dim font-light leading-relaxed">
                    Custom thermal steam calibrated to open hair cuticles and dermal pores before infusing bio-dynamic peptide serums formulated for your specific water hardness.
                  </p>
                </motion.div>
              </ScrollRevealItem>

              <ScrollRevealItem>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-6 rounded-[12px] card-thick-border border-dark-line bg-dark-soft/90 backdrop-blur-xs transition-colors hover:border-primary-bright hover:bg-dark-soft shadow-sm cursor-default"
                >
                  <div className="flex items-center gap-3 text-xs font-mono text-brass mb-2">
                    <span className="font-bold text-primary-bright">Phase 03</span>
                    <span>·</span>
                    <span className="uppercase tracking-wider">Sculptural Buccal &amp; Lymphatic Lift</span>
                  </div>
                  <p className="text-xs sm:text-sm text-mist-dim font-light leading-relaxed">
                    Internal and external facial muscle sculpting that drains lymphatic fluids, releases jaw clenching, and reveals defined facial bone contours.
                  </p>
                </motion.div>
              </ScrollRevealItem>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------
          SECTION 8: TESTIMONIALS — TWO INDEPENDENTLY SCROLLING ROWS
          Row 1: RTL (8 cards) | Row 2: LTR (8 cards) = 16 cards total
          ------------------------------------------------------------------- */}
      <DualRowTestimonials />

      {/* -------------------------------------------------------------------
          SECTION 9: FAQ ACCORDION
          Salon policies: booking, trials, hygiene, aftercare
          ------------------------------------------------------------------- */}
      <FAQSection onOpenBookingModal={onOpenBookingModal} currentMode="salon" />

      {/* -------------------------------------------------------------------
          SECTION 10: BOOK CONSULTATION CTA BLOCK
          ------------------------------------------------------------------- */}
      <section className="relative w-full py-20 sm:py-24 border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={25} duration={0.65}>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
              <div>
                <span className="font-mono text-xs tracking-widest uppercase text-subtle">
                  Sanctuary Appointments · Guntur, AP
                </span>
                <h3 className="mt-2 font-serif text-3xl sm:text-4xl text-dark">
                  Reserve Your Private Suite Consultation
                </h3>
                <p className="mt-2 text-sm text-muted max-w-xl">
                  Step in for bespoke haircutting, French balayage, or bridal styling. Our concierge is standing by to match you with a dedicated senior artist.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenBookingModal()}
                  className="btn-brand-primary min-h-[44px]"
                >
                  <span>Book Slot Now</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href="tel:09553888432"
                  className="btn-brand-outline min-h-[44px]"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call 095538 88432</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* -------------------------------------------------------------------
          ACADEMY COURSES MODULE (4 Learning Modes + 4-Mode Comparison)
          Accessible directly on landing & routes to full Academy Courses page
          ------------------------------------------------------------------- */}
      <AcademyModulesSection photoVariant="salon" onExploreCourses={() => navigateTo('services', 'academy')} />

      {/* -------------------------------------------------------------------
          SECTION 11: FRANCHISE OPPORTUNITY BLOCK
          Truthful inquiry concept for entrepreneurs & salon operators
          ------------------------------------------------------------------- */}
      <section className="w-full py-20 sm:py-28 bg-light border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[20px] bg-surface card-thick-border border-border p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider">
                  <Building2 className="h-4 w-4 text-accent" />
                  <span>Business Partnerships · Pan-India Expansion</span>
                </div>
                <h2 className="font-editorial-heading text-3xl sm:text-4xl text-dark">
                  Franchise &amp; Atelier Partnership Opportunities
                </h2>
                <p className="text-sm sm:text-base text-muted font-light leading-relaxed">
                  YOUR SOUL is expanding its luxury salon and academy footprint into Tier 1 and metropolitan markets across India. We partner with visionaries seeking an architectural, high-retention salon brand with proven operational blueprints.
                </p>

                <div className="space-y-3 pt-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                    <div>
                      <div className="text-xs font-semibold text-dark">Turnkey Architectural Design</div>
                      <div className="text-xs text-muted">Biophilic salon blueprints, custom acoustic layouts, and equipment sourcing.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                    <div>
                      <div className="text-xs font-semibold text-dark">Pre-Trained Talent Pipeline</div>
                      <div className="text-xs text-muted">Stylists, colorists, and estheticians certified directly by YOUR SOUL Academy.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                    <div>
                      <div className="text-xs font-semibold text-dark">Global Product Direct Partnerships</div>
                      <div className="text-xs text-muted">Direct salon procurement contracts with L'Oréal, Schwarzkopf, and Kérastase.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Franchise Inquiry Form Card */}
              <div className="lg:col-span-6">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-[16px] bg-light card-thick-border border-border p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow"
                >
                  {franchiseSubmitted ? (
                    <div className="text-center py-8 space-y-3">
                      <div className="h-12 w-12 rounded-full bg-accent text-white flex items-center justify-center mx-auto">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <h4 className="font-serif text-2xl text-dark">Inquiry Received</h4>
                      <p className="text-xs sm:text-sm text-muted max-w-md mx-auto">
                        Thank you, <span className="font-medium text-dark">{franchiseForm.name}</span>. WhatsApp has opened with your details pre-filled — tap <strong>Send</strong> so our partnerships desk receives it. We'll reply at {franchiseForm.phone}.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setFranchiseSubmitted(false);
                          setFranchiseForm({ name: '', phone: '', email: '', city: 'Guntur', experience: 'Salon Owner / Entrepreneur', notes: '' });
                        }}
                        className="btn-brand-outline text-xs mt-4"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFranchiseSubmit} className="space-y-4">
                      <div>
                        <h3 className="font-serif text-xl text-dark">Discuss Franchise Opportunity</h3>
                        <p className="text-xs text-muted mt-1">Connect directly with our expansion leadership.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div>
                          <label className="block text-[11px] font-mono text-muted uppercase mb-1">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={franchiseForm.name}
                            onChange={(e) => setFranchiseForm({ ...franchiseForm, name: e.target.value })}
                            placeholder="Anand Rao"
                            className="w-full text-xs bg-light border border-border rounded-[8px] px-3 py-2 min-h-[44px] text-dark focus:outline-hidden focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-muted uppercase mb-1">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            value={franchiseForm.phone}
                            onChange={(e) => setFranchiseForm({ ...franchiseForm, phone: e.target.value })}
                            placeholder="095538 88432"
                            className="w-full text-xs bg-light border border-border rounded-[8px] px-3 py-2 min-h-[44px] text-dark focus:outline-hidden focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono text-muted uppercase mb-1">Email Address</label>
                          <input
                            type="email"
                            value={franchiseForm.email}
                            onChange={(e) => setFranchiseForm({ ...franchiseForm, email: e.target.value })}
                            placeholder="anand@example.com"
                            className="w-full text-xs bg-light border border-border rounded-[8px] px-3 py-2 min-h-[44px] text-dark focus:outline-hidden focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-muted uppercase mb-1">Proposed Location / City</label>
                          <input
                            type="text"
                            value={franchiseForm.city}
                            onChange={(e) => setFranchiseForm({ ...franchiseForm, city: e.target.value })}
                            placeholder="Guntur / Vijayawada / Amaravati"
                            className="w-full text-xs bg-light border border-border rounded-[8px] px-3 py-2 min-h-[44px] text-dark focus:outline-hidden focus:border-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-muted uppercase mb-1">Background / Business Vision</label>
                        <textarea
                          rows={2}
                          value={franchiseForm.notes}
                          onChange={(e) => setFranchiseForm({ ...franchiseForm, notes: e.target.value })}
                          placeholder="Tell us about your proposed space or retail experience..."
                          className="w-full text-xs bg-light border border-border rounded-[8px] px-3 py-2 min-h-[44px] text-dark focus:outline-hidden focus:border-primary"
                        />
                      </div>

                      {franchiseError && (
                        <p role="alert" className="text-xs text-primary-hover font-medium">{franchiseError}</p>
                      )}
                      <button
                        type="submit"
                        className="w-full btn-brand-primary min-h-[44px]"
                      >
                        <Send className="h-3.5 w-3.5" />
                        <span>Discuss Franchise Opportunity</span>
                      </button>
                    </form>
                  )}
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: FOOTER (Rendered globally in App.tsx) */}
    </div>
  );
};
