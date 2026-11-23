import {
  BannerConfig,
  EditorialSectionData,
  SalonService,
  AcademyCourse,
  ContactInfo,
  FAQItem,
  Testimonial,
  AcademyLearningMode,
  AcademyComparisonRow,
} from '../types';

// ==========================================
// 8 MANDATORY INDEPENDENT BANNER CONFIGURATIONS
// ==========================================

import { IMAGES } from './images';
import { buildWhatsAppLink } from '../utils/whatsapp';


export const LOGO_ASSET_PATH = '/images/brand/your-soul-logo-480.webp';

export const BANNERS: Record<string, BannerConfig> = {
  // --- SALON BANNERS (1 - 4) ---
  salon_home_hero: {
    slotId: 'salon_home_hero',
    slotNumber: 1,
    route: '/salon',
    division: 'salon',
    page: 'home',
    kicker: 'Your Soul Salon · Haute Coiffure & Dermal Sanctuary',
    title: 'The Art of Refined Beauty & Personal Harmony',
    subtitle: 'An architectural sanctuary devoted to bespoke hair sculpting, advanced dermal therapy, and holistic self-renewal.',
    aspectRatio: '16:9',
    recommendedResolution: '1920 × 1080px',
    imageSrc: IMAGES.heroSalonHome.src,
    imageSrcSet: IMAGES.heroSalonHome.srcSet,
    altText: IMAGES.heroSalonHome.alt,
    focalPoint: {
      mobile: '50% 32%',
      tablet: '50% 36%',
      desktop: '50% 38%',
    },
  },
  salon_about_banner: {
    slotId: 'salon_about_banner',
    slotNumber: 2,
    route: '/salon/about',
    division: 'salon',
    page: 'about',
    kicker: 'Our Heritage & Philosophy',
    title: 'Crafted on Principles of Reverence, Purity, and Mastery',
    subtitle: 'From a single studio atelier to an enduring standard for conscious beauty and individualized care.',
    aspectRatio: '16:9',
    recommendedResolution: '1920 × 1080px',
    imageSrc: IMAGES.heroSalonAbout.src,
    imageSrcSet: IMAGES.heroSalonAbout.srcSet,
    altText: IMAGES.heroSalonAbout.alt,
    caption: 'The Atelier Dialogue — Founders and Senior Art Directors',
    focalPoint: {
      mobile: '50% 28%',
      tablet: '50% 32%',
      desktop: '50% 35%',
    },
  },
  salon_services_banner: {
    slotId: 'salon_services_banner',
    slotNumber: 3,
    route: '/salon/services',
    division: 'salon',
    page: 'services',
    kicker: 'Curated Treatments',
    title: 'Precision Craftsmanship for Hair, Skin, and Senses',
    subtitle: 'Every treatment is an intentional ritual combining botanical science, French balayage technique, and custom scalp rejuvenation.',
    aspectRatio: '16:9',
    recommendedResolution: '1920 × 1080px',
    imageSrc: IMAGES.heroSalonServices.src,
    imageSrcSet: IMAGES.heroSalonServices.srcSet,
    altText: IMAGES.heroSalonServices.alt,
    caption: 'Handcrafted Precision — Balayage & Botanical Dermal Treatment',
    focalPoint: {
      mobile: '50% 35%',
      tablet: '50% 38%',
      desktop: '50% 40%',
    },
  },
  salon_contact_banner: {
    slotId: 'salon_contact_banner',
    slotNumber: 4,
    route: '/salon/contact',
    division: 'salon',
    page: 'contact',
    kicker: 'Reservations & Concierge',
    title: 'Begin Your Consultation at Our Sanctuary',
    subtitle: 'Private suites, unhurried appointments, and warm architectural hospitality in the city center.',
    aspectRatio: '16:9',
    recommendedResolution: '1920 × 1080px',
    imageSrc: IMAGES.heroSalonContact.src,
    imageSrcSet: IMAGES.heroSalonContact.srcSet,
    altText: IMAGES.heroSalonContact.alt,
    caption: 'Guest Lounge & Private Consultation Alcove',
    focalPoint: {
      mobile: '50% 45%',
      tablet: '50% 48%',
      desktop: '50% 50%',
    },
  },

  // --- ACADEMY BANNERS (5 - 8) ---
  academy_home_hero: {
    slotId: 'academy_home_hero',
    slotNumber: 5,
    route: '/academy',
    division: 'academy',
    page: 'home',
    kicker: 'Your Soul Academy · Professional Beauty Education',
    title: 'Educating the Next Generation of Global Beauty Innovators',
    subtitle: 'Masterclasses, certified diplomas, and intensive hands-on clinic training led by active industry directors.',
    aspectRatio: '16:9',
    recommendedResolution: '1920 × 1080px',
    imageSrc: IMAGES.heroAcademyHome.src,
    imageSrcSet: IMAGES.heroAcademyHome.srcSet,
    altText: IMAGES.heroAcademyHome.alt,
    caption: 'Main Studio Lab — Individual Master Styling Workstations',
    focalPoint: {
      mobile: '50% 30%',
      tablet: '50% 35%',
      desktop: '50% 40%',
    },
  },
  academy_about_banner: {
    slotId: 'academy_about_banner',
    slotNumber: 6,
    route: '/academy/about',
    division: 'academy',
    page: 'about',
    kicker: 'Faculty & Pedagogy',
    title: 'Taught by Practicing Masters, Grounded in Real Artistry',
    subtitle: 'Our instructors remain active runway directors, trichology researchers, and acclaimed salon founders.',
    aspectRatio: '16:9',
    recommendedResolution: '1920 × 1080px',
    imageSrc: IMAGES.heroAcademyAbout.src,
    imageSrcSet: IMAGES.heroAcademyAbout.srcSet,
    altText: IMAGES.heroAcademyAbout.alt,
    caption: 'The Masterclass Floor — Direct Mentorship and Real-Time Critique',
    focalPoint: {
      mobile: '50% 28%',
      tablet: '50% 32%',
      desktop: '50% 35%',
    },
  },
  academy_services_banner: {
    slotId: 'academy_services_banner',
    slotNumber: 7,
    route: '/academy/services',
    division: 'academy',
    page: 'services',
    kicker: 'Curriculum & Diplomas',
    title: 'Rigorous Programs Engineered for Industry Leadership',
    subtitle: 'From foundation hair precision to clinical aesthetic sciences and high-fashion runway makeup.',
    aspectRatio: '16:9',
    recommendedResolution: '1920 × 1080px',
    imageSrc: IMAGES.heroAcademyServices.src,
    imageSrcSet: IMAGES.heroAcademyServices.srcSet,
    altText: IMAGES.heroAcademyServices.alt,
    caption: 'Clinical Aesthetics Lab — Student Practical Training',
    focalPoint: {
      mobile: '50% 42%',
      tablet: '50% 45%',
      desktop: '50% 48%',
    },
  },
  academy_contact_banner: {
    slotId: 'academy_contact_banner',
    slotNumber: 8,
    route: '/academy/contact',
    division: 'academy',
    page: 'contact',
    kicker: 'Admissions & Campus Visits',
    title: 'Take the First Step Toward Your Professional Career',
    subtitle: 'Book a campus tour, meet with an admissions advisor, or schedule a portfolio review session.',
    aspectRatio: '16:9',
    recommendedResolution: '1920 × 1080px',
    imageSrc: IMAGES.heroAcademyContact.src,
    imageSrcSet: IMAGES.heroAcademyContact.srcSet,
    altText: IMAGES.heroAcademyContact.alt,
    caption: 'Admissions Hall & Student Exhibition Gallery',
    focalPoint: {
      mobile: '50% 40%',
      tablet: '50% 45%',
      desktop: '50% 48%',
    },
  },
};

// ==========================================
// SALON ABOUT EDITORIAL SECTIONS (Alternating)
// ==========================================

export const SALON_ABOUT_SECTIONS: EditorialSectionData[] = [
  {
    id: 'salon-founders',
    indexNumber: '01',
    kicker: 'Leadership & Origins',
    title: 'About Our Founders',
    leadNarrative: 'Founded on the belief that beauty is an intimate dialogue between personal essence and masterful craftsmanship.',
    bodyNarrative: 'Your Soul Salon was conceived by industry pioneers who sought to strip away the haste and sensory noise of conventional salons. Guided by architectural balance, pure botanical compounds, and European editorial disciplines, our founders created an environment where clients are not rushed through chairs, but welcomed into a bespoke aesthetic retreat. Every stylist in our space is personally mentored to listen first and sculpt with intent.',
    quote: {
      text: 'True luxury lies in the precision of the unseen cut and the calm stillness of unhurried attention.',
      author: 'Founding Creative Directors',
    },
    keyPillars: [
      'Over 20 years of international salon and runway leadership',
      'Commitment to low-toxin, cruelty-free, bio-dynamic formulations',
      'Bespoke consultation tailored to individual bone structure and lifestyle'
    ],
    imageSlot: {
      slotId: 'salon_founder_portrait',
      title: 'Founders Portrait & Atelier Craft',
      aspectRatio: '4:3',
      imageSrc: IMAGES.aboutFounders.src,
      imageSrcSet: IMAGES.aboutFounders.srcSet,
      altText: IMAGES.aboutFounders.alt,
      caption: 'Founders & Creative Directors — The Atelier Studio'
    },
    imagePosition: 'left',
  },
  {
    id: 'salon-vision',
    indexNumber: '02',
    kicker: 'Long-Term Purpose',
    title: 'Our Vision',
    leadNarrative: 'To elevate personal care from routine maintenance into an art of enduring rejuvenation and mindful elegance.',
    bodyNarrative: 'We envision a future where personal beauty honors natural biology rather than masking it. By pairing sustainable trichology science with refined architectural styling, we aspire to set the global benchmark for conscious luxury. Our space serves as a cultural nexus where artistry, wellness, and bespoke care converge seamlessly.',
    quote: {
      text: 'We do not impose a standard of beauty; we reveal the architecture already inherent in every soul.',
      author: 'Salon Vision Manifesto',
    },
    keyPillars: [
      'Biophilic salon spaces that lower heart rates and restore clarity',
      'Continuous education in cellular dermal wellness and scalp micro-circulation',
      'Zero-landfill chemical disposal and water-conservation washing basins'
    ],
    imageSlot: {
      slotId: 'salon_vision_sculpture',
      title: 'Architectural Vision & Spatial Balance',
      aspectRatio: '4:3',
      imageSrc: IMAGES.aboutVision.src,
      imageSrcSet: IMAGES.aboutVision.srcSet,
      altText: IMAGES.aboutVision.alt,
      caption: 'Quiet Light — The Spa Wash Lounge'
    },
    imagePosition: 'right',
  },
  {
    id: 'salon-mission',
    indexNumber: '03',
    kicker: 'Guiding Commitments',
    title: 'Our Mission',
    leadNarrative: 'To deliver uncompromising technical perfection, transparent service ethics, and genuine client restoration on every visit.',
    bodyNarrative: 'Every cut, colour formulation, and dermal peel begins with a thorough 15-minute diagnostic consultation. We evaluate hair porosity, skin barrier health, facial harmony, and daily maintenance routines before selecting our scissors or mixing a pigment. We believe luxury is measured by how effortless and healthy your hair and skin feel weeks after leaving our chairs.',
    quote: {
      text: 'A haircut should look as extraordinary during week seven as it did on the afternoon it was shaped.',
      author: 'Head of Technical Craft',
    },
    keyPillars: [
      'Single-chair dedicated attention with zero double-booking overlap',
      'Pharmaceutical-grade sterilization and bespoke single-use organic linens',
      'Tailored home maintenance regimens formulated for your exact water hardness'
    ],
    imageSlot: {
      slotId: 'salon_mission_craft',
      title: 'Handcraft Standards & Diagnostic Diagnostics',
      aspectRatio: '4:3',
      imageSrc: IMAGES.aboutMission.src,
      imageSrcSet: IMAGES.aboutMission.srcSet,
      altText: IMAGES.aboutMission.alt,
      caption: 'Diagnostic Touch — Precision Texture Evaluation'
    },
    imagePosition: 'left',
  },
  {
    id: 'salon-approach',
    indexNumber: '04',
    kicker: 'The Client Journey',
    title: 'Our Approach',
    leadNarrative: 'A holistic four-stage methodology balancing science, intuition, and aesthetic restraint.',
    bodyNarrative: 'From the moment you step through our limestone entryway, the pace shifts. You are welcomed with an adaptogenic herbal infusion, guided through sensory aroma selection for your scalp massage, and provided a transparent breakdown of all recommendations. No hidden upsells, no rushed appointments—only deliberate, refined care.',
    quote: {
      text: 'Artistry without empathy is merely technique. At Your Soul, both are indivisible.',
      author: 'Master Esthetician',
    },
    keyPillars: [
      'Phase I: Anatomical & Lifestyle Consultation',
      'Phase II: Thermal & Botanical Hair/Skin Preparation',
      'Phase III: Micro-Precision Sculpting & Pigment Application',
      'Phase IV: Prescriptive Home Ritual Formulation'
    ],
    imageSlot: {
      slotId: 'salon_approach_ritual',
      title: 'The Ritual Experience',
      aspectRatio: '4:3',
      imageSrc: IMAGES.aboutApproach.src,
      imageSrcSet: IMAGES.aboutApproach.srcSet,
      altText: IMAGES.aboutApproach.alt,
      caption: 'Aromatic Preparation — Organic Botanical Formulations'
    },
    imagePosition: 'right',
  },
];

// ==========================================
// ACADEMY ABOUT EDITORIAL SECTIONS (Alternating)
// ==========================================

export const ACADEMY_ABOUT_SECTIONS: EditorialSectionData[] = [
  {
    id: 'academy-trainers',
    indexNumber: '01',
    kicker: 'Educators & Masters',
    title: 'About Our Trainers',
    leadNarrative: 'Our faculty is comprised exclusively of active salon directors, editorial stylists, and licensed dermal scientists.',
    bodyNarrative: 'Unlike traditional beauty schools where instructors rely on decades-old textbooks, Your Soul Academy mentors work actively at fashion weeks, manage thriving salon studios, and continually innovate behind the chair. They impart real commercial acumen alongside technical mastery—teaching students not just how to pass a state exam, but how to command premium clientele and build an enduring reputation.',
    quote: {
      text: 'We do not train salon staff. We mentor the next wave of creative directors and independent studio owners.',
      author: 'Director of Academic Education',
    },
    keyPillars: [
      'Low 1:8 teacher-to-student ratio ensuring intensive 1-on-1 practical feedback',
      'Mentors hold credentials from Paris, London, and New York fashion circuits',
      'Direct client case studies and portfolio critique from day one'
    ],
    imageSlot: {
      slotId: 'academy_trainers_group',
      title: 'Master Educators & Faculty',
      aspectRatio: '4:3',
      imageSrc: IMAGES.acadTrainers.src,
      imageSrcSet: IMAGES.acadTrainers.srcSet,
      altText: IMAGES.acadTrainers.alt,
      caption: 'The Faculty Studio — Live Demonstration & Precision Critique'
    },
    imagePosition: 'left',
  },
  {
    id: 'academy-vision',
    indexNumber: '02',
    kicker: 'Future of Education',
    title: 'Academy Vision',
    leadNarrative: 'To establish an internationally recognized standard for contemporary beauty education, rooted in scientific rigor and creative freedom.',
    bodyNarrative: 'The beauty industry is evolving rapidly into clinical dermal health, sustainable chemical management, and customized identity design. Our vision is to produce graduates who possess both medical-grade skin understanding and avant-garde styling versatility. We cultivate artists who think critically, communicate with empathy, and lead the industry forward.',
    quote: {
      text: 'Education should liberate your intuition through infallible technical discipline.',
      author: 'Dean of Dermal Sciences',
    },
    keyPillars: [
      'Curricula updated biannually to reflect the newest global styling technologies',
      'Incubation program supporting graduates opening their own studio spaces',
      'Lifelong alumni masterclass access and continuing education seminars'
    ],
    imageSlot: {
      slotId: 'academy_vision_lab',
      title: 'Cosmetology Science & Innovation',
      aspectRatio: '4:3',
      imageSrc: IMAGES.acadVision.src,
      imageSrcSet: IMAGES.acadVision.srcSet,
      altText: IMAGES.acadVision.alt,
      caption: 'Cosmetic Biology Lab — Fiber Science and Trichology Analysis'
    },
    imagePosition: 'right',
  },
  {
    id: 'academy-mission',
    indexNumber: '03',
    kicker: 'Educational Mandate',
    title: 'Academy Mission',
    leadNarrative: 'To provide rigorous, hands-on, high-standard professional training that translates immediately into career success.',
    bodyNarrative: 'We reject passive rote memorization. From their very first term, students at Your Soul Academy work on live models under close faculty supervision in our public student salon. They learn client psychology, consultation linguistics, precision ergonomics, and digital portfolio branding, ensuring they graduate fully job-ready with zero gap between study and practice.',
    quote: {
      text: 'Excellence is not an accident. It is muscle memory, geometric understanding, and genuine hospitality.',
      author: 'Senior Colorist & Educator',
    },
    keyPillars: [
      'Over 600 hours of live client practical experience in our teaching salon',
      'Complete professional styling toolkit and ergonomic shears included in enrollment',
      '100% internship placement support at premier salons across the country'
    ],
    imageSlot: {
      slotId: 'academy_mission_hands',
      title: 'Hands-On Client Clinic',
      aspectRatio: '4:3',
      imageSrc: IMAGES.acadMission.src,
      imageSrcSet: IMAGES.acadMission.srcSet,
      altText: IMAGES.acadMission.alt,
      caption: 'Clinic Floor — Real Client Experience Under Master Oversight'
    },
    imagePosition: 'left',
  },
  {
    id: 'academy-approach',
    indexNumber: '04',
    kicker: 'Pedagogical Framework',
    title: 'Our Teaching Approach',
    leadNarrative: 'A structured tri-pillar curriculum combining geometric theory, live practical clinic, and business mastery.',
    bodyNarrative: 'Our curriculum divides into three complementary dimensions: Theoretical Foundation (anatomy, trichology, color wheel physics), Supervised Studio Practice (mannequin drills and precision line work), and Commercial Apprenticeship (running a salon chair, time management, social media styling photography). This ensures complete, 360-degree career readiness.',
    quote: {
      text: 'When technical confidence becomes second nature, authentic artistic voice finally emerges.',
      author: 'Head of Hair Design Pedagogy',
    },
    keyPillars: [
      'Pillar I: Anatomical Precision & Formulation Chemistry',
      'Pillar II: Ergonomic Body Mechanics & Tool Mastery',
      'Pillar III: Salon Entrepreneurship & Client Retention Ethics'
    ],
    imageSlot: {
      slotId: 'academy_approach_method',
      title: 'Pedagogy & Geometric Blueprint',
      aspectRatio: '4:3',
      imageSrc: IMAGES.acadApproach.src,
      imageSrcSet: IMAGES.acadApproach.srcSet,
      altText: IMAGES.acadApproach.alt,
      caption: 'Geometric Blueprint — Sectioning Angles & Elevation Studies'
    },
    imagePosition: 'right',
  },
];

export { SALON_SERVICES, ACADEMY_COURSES } from './catalog';
export { INSTAGRAM_URL, INSTAGRAM_HANDLE, GOOGLE_REVIEW_URL } from './links';
import { INSTAGRAM_URL } from './links';

// ==========================================
// CONTACT & LOCATION METADATA (Indian Localization)
// Source of truth: Guntur, Andhra Pradesh | 095538 88432
// ==========================================

export const SALON_CONTACT: ContactInfo = {
  division: 'salon',
  headline: 'Salon Appointments & Concierge',
  subheadline: 'Step into an oasis of calm. Our front-of-house team is pleased to coordinate your bespoke service schedule.',
  addressLines: [
    'YOUR SOUL — Salon & Academy',
    '1st Floor, JKC College Rd, Main Rd, 6th Line',
    'Vijayapuri Colony, Guntur, Andhra Pradesh 522006'
  ],
  phone: '095538 88432',
  whatsappNumber: '095538 88432',
  whatsappUrl: buildWhatsAppLink('chat'),
  instagramUrl: INSTAGRAM_URL,
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=1st+Floor,+JKC+College+Rd,+Main+Rd,+6th+Line,+Vijayapuri+Colony,+Guntur,+Andhra+Pradesh+522006',
  email: 'salon@yoursoul.in',
  hours: [
    { day: 'Monday – Sunday (7 Days a Week)', time: '09:00 AM – 09:00 PM IST' },
    { day: 'Hourly Booking Windows', time: '12 Hourly Slots (09:00 AM to 09:00 PM)' },
  ],
  note: 'Located on JKC College Road, Vijayapuri Colony, Guntur. Dedicated client parking available at the entrance.'
};

export const ACADEMY_CONTACT: ContactInfo = {
  division: 'academy',
  headline: 'Admissions Office & Campus Tour Desk',
  subheadline: 'Speak with our admissions counselors, schedule an in-person campus walkthrough, or submit your enrollment application.',
  addressLines: [
    'YOUR SOUL — Salon & Academy',
    '1st Floor, JKC College Rd, Main Rd, 6th Line',
    'Vijayapuri Colony, Guntur, Andhra Pradesh 522006'
  ],
  phone: '095538 88432',
  whatsappNumber: '095538 88432',
  whatsappUrl: buildWhatsAppLink('chat'),
  instagramUrl: INSTAGRAM_URL,
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=1st+Floor,+JKC+College+Rd,+Main+Rd,+6th+Line,+Vijayapuri+Colony,+Guntur,+Andhra+Pradesh+522006',
  email: 'admissions@yoursoul.in',
  hours: [
    { day: 'Monday – Friday', time: '9:30 AM – 6:00 PM IST' },
    { day: 'Saturday', time: '10:00 AM – 4:00 PM IST' },
    { day: 'Sunday', time: 'Closed (Student Practice Labs Only)' },
  ],
  note: 'Admissions interviews and campus tours are scheduled by prior appointment. Application prospectuses are available at our front desk.'
};

// ==========================================
// HIGH-TRUST FREQUENTLY ASKED QUESTIONS (FAQS)
// ==========================================

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'salon',
    question: 'How do I book an appointment and is advance reservation mandatory?',
    answer: 'Advance appointments are highly recommended to ensure dedicated 1-on-1 time with your senior stylist or esthetician. We operate on an unhurried sanctuary schedule with zero overlapping client bookings. You can reserve online through our portal or speak directly with our studio concierge via phone or WhatsApp.',
    tags: ['Booking', 'Reservations', 'Salon']
  },
  {
    id: 'faq-2',
    category: 'salon',
    question: 'Do you require a patch test prior to hair colouring or chemical treatments?',
    answer: 'Yes. For your safety, a mandatory 48-hour skin sensitivity and strand patch test is required for all first-time colour clients. We formulate exclusively with premium, ammonia-free European pigments calibrated for sensitive scalps and Indian hair undertones.',
    tags: ['Safety', 'Colour', 'Patch Test']
  },
  {
    id: 'faq-3',
    category: 'salon',
    question: 'What is included in the Haute Bridal consultation and trial session?',
    answer: 'Our bridal trial includes two comprehensive styling directions (for Sangeet, Muhurtham, or Reception), veil/dupatta draping, bespoke headpiece testing, and a camera flash check under warm and cool studio lights to guarantee 4K photographic longevity.',
    tags: ['Bridal', 'Trials', 'Weddings']
  },
  {
    id: 'faq-4',
    category: 'salon',
    question: 'How are customized balayage and dermal treatments planned?',
    answer: 'Every bespoke treatment begins with a complimentary diagnostic evaluation. We evaluate your hair length, natural density, porosity, past chemical history, and tonal objectives before crafting a personalized service blueprint.',
    tags: ['Consultation', 'Personalization', 'Diagnostic']
  },
  {
    id: 'faq-5',
    category: 'salon',
    question: 'What hygiene and sterilization protocols are observed in the atelier?',
    answer: 'We maintain medical-grade sanitation. All metal scissors, clips, and implements are autoclaved and sealed in sterile pouches. Stations are disinfected between each guest, and single-use biodegradable organic capes and towels are standard.',
    tags: ['Hygiene', 'Sanitization', 'Safety']
  },
  {
    id: 'faq-6',
    category: 'academy',
    question: 'Are Your Soul Academy diplomas government or internationally accredited?',
    answer: 'Yes. Our professional diplomas are benchmarked against international standards (aligned with CIDESCO and National Skill Development frameworks). Graduates receive accredited certifications recognized by premier luxury salon networks, film production studios, and international cosmetic brands.',
    tags: ['Accreditation', 'Certification', 'Academy']
  },
  {
    id: 'faq-7',
    category: 'academy',
    question: 'Do students practice on real clients or only mannequin doll heads?',
    answer: 'While initial foundational angles and lines are practiced on premium human-hair mannequins, over 65% of your practical curriculum (300+ clinic hours) is conducted on live models in our public student training salon under direct master faculty supervision.',
    tags: ['Practical Training', 'Live Models', 'Clinic']
  },
  {
    id: 'faq-8',
    category: 'academy',
    question: 'What is the student-to-mentor ratio in each training cohort?',
    answer: 'We strictly cap cohorts at a 1:8 mentor-to-student ratio. This ensures every student receives personalized daily critique on scissor ergonomics, color formulation chemistry, and live client consultation linguistics.',
    tags: ['Batch Size', 'Faculty', 'Mentorship']
  },
  {
    id: 'faq-9',
    category: 'academy',
    question: 'What admissions and enrollment assistance is available for programs?',
    answer: 'Our admissions desk provides personalized counseling on course prerequisites, curriculum schedules, kit materials, and scholarship qualification windows.',
    tags: ['Admissions', 'Enrollment', 'Counseling']
  },
  {
    id: 'faq-10',
    category: 'academy',
    question: 'What career placement and internship support is provided upon graduation?',
    answer: 'Our dedicated student incubation cell coordinates verified salon internships, editorial fashion week assistantships, and commercial portfolio reviews. Over 94% of our diploma graduates secure placements within 60 days of course completion.',
    tags: ['Placements', 'Careers', 'Internships']
  }
];

// ==========================================
// AUTHENTIC CLIENT & ALUMNI TESTIMONIALS
// ==========================================

export const TESTIMONIALS: Testimonial[] = [
  // --- SALON CLIENT STORIES ---
  {
    id: 'test-1',
    name: 'Aditi Reddy',
    role: 'Creative Director & Founder',
    location: 'Vijayapuri Colony, Guntur',
    category: 'salon',
    serviceOrCourse: 'Dimensional French Balayage & Gloss Melting',
    rating: 5,
    quote: 'Finding colorists in Andhra Pradesh who understand dark hair undertones without lifting to brassy warmth is rare. Your Soul’s balayage technique was completely seamless, and even after 10 weeks of local water, my hair retained its cool caramel tone and mirror shine.',
    date: 'February 2026',
    verified: true,
  },
  {
    id: 'test-2',
    name: 'Dr. Priya Varma',
    role: 'Dermatologist & Clinical Researcher',
    location: 'Lakshmipuram, Guntur',
    category: 'salon',
    serviceOrCourse: 'Microbiome Scalp Detox & High-Frequency Therapy',
    rating: 5,
    quote: 'As someone who studies skin physiology, I am extremely particular about salon treatments. Their trichology protocol was medically sound: zero harsh sulfates, accurate digital imaging, and volcanic clay application that noticeably calmed my follicular irritation in one session.',
    date: 'January 2026',
    verified: true,
  },
  {
    id: 'test-3',
    name: 'Sneha Kulkarni',
    role: 'Architect & Bride',
    location: 'Brodipet, Guntur',
    category: 'salon',
    serviceOrCourse: 'Haute Bridal Consultation & Trial Session',
    rating: 5,
    quote: 'The unhurried sanctuary atmosphere made all the difference during wedding preparations. The team tested my Muhurtham and Reception looks under 4K camera flash, matched my jewelry weight with hair pins seamlessly, and ensured my skin looked radiant without heavy cakey makeup.',
    date: 'March 2026',
    verified: true,
  },

  // --- ACADEMY ALUMNI OUTCOMES ---
  {
    id: 'test-4',
    name: 'Kavya Menon',
    role: 'Senior Hair Specialist, Atelier 36',
    location: 'Guntur & Vijayawada',
    category: 'academy',
    serviceOrCourse: 'Diploma in Precision Haircutting & Modern Architecture',
    rating: 5,
    quote: 'The 1:8 mentor ratio at Your Soul Academy transformed my confidence. Instead of just learning rote cuts, we studied skull geometry, weight lines, and European disconnection. Within two months of graduating, I was placed as a senior stylist handling high-profile client consultations.',
    date: 'Class of Autumn 2025',
    verified: true,
  },
  {
    id: 'test-5',
    name: 'Rohan Sen',
    role: 'Founder & Head Colorist, Studio Forma',
    location: 'Vijayapuri Colony, Guntur',
    category: 'academy',
    serviceOrCourse: 'Masterclass in Advanced Balayage, Bleach Science & Color Correction',
    rating: 5,
    quote: 'The bleach chemistry module and developer calibration curriculum alone was an extraordinary foundation. Learning how to formulate custom toner glazes for Indian hair textures gave me the exact commercial edge needed to launch my own salon atelier.',
    date: 'Class of Summer 2025',
    verified: true,
  },
  {
    id: 'test-6',
    name: 'Meera Nambiar',
    role: 'Lead Bridal & Runway Makeup Artist',
    location: 'Guntur & Vijayawada',
    category: 'academy',
    serviceOrCourse: 'Bridal & Editorial High-Fashion Makeup Artistry',
    rating: 5,
    quote: 'Practicing on real models in the student clinic gave me real client communication skills from week two. The instructors are active fashion week directors who taught us tear-proof bridal longevity and HD camera color theory. My bridal diary is now fully booked six months ahead.',
    date: 'Class of Winter 2025',
    verified: true,
  },
];

// ==========================================
// ACADEMY 4 LEARNING MODES (Verified from Your_Soul_Academy_Modules.pdf)
// Hair | Skin | Body — Structured Progression: Basic -> Standard -> Advanced -> Expert
// ==========================================

export const ACADEMY_SYLLABUS_PDF_PATH = '/downloads/your-soul-academy-modules.pdf';

export const ACADEMY_LEARNING_MODES: AcademyLearningMode[] = [
  {
    id: 'mode-basic',
    moduleNumber: 'Module 01',
    title: 'BASIC',
    roleSubtitle: 'Salon Assistant · Beginner Level',
    levelBadge: 'Beginner Level',
    description:
      'Learn the foundations and perform basic salon services safely and hygienically across hair, skin, and body care.',
    duration: 'Contact for details',
    learningFormat: 'In-Studio Foundational Theory + Guided Demonstration',
    availableCourses: [
      'Salon Hygiene, Sterilization & Safety Etiquette',
      'Skin Basics, CTM, Threading & Waxing',
      'Hair Basics, Shampoo, Blow-Dry & Straight/U/V Cuts',
      'Basic Manicure, Pedicure & Nail Care',
    ],
    curriculumGroups: [
      {
        name: 'Foundation',
        topics: [
          'Salon hygiene & sterilization',
          'Tools: scissors & trimmers (types, parts, care)',
          'Client consultation & patch test',
          'Salon safety & etiquette',
        ],
      },
      {
        name: 'Skin',
        topics: [
          'Skin layers & skin types identification',
          'CTM routine (cleanse, tone, moisturise)',
          'Clean-up & bleach',
          'Threading & normal / honey waxing',
          'Basic face massage',
        ],
      },
      {
        name: 'Hair',
        topics: [
          'Hair & follicle structure, scalp types',
          'Shampoo, conditioning & head massage',
          'Blow-dry basics',
          'Basic cuts: straight, U, V',
          "Men's basic cut, beard trim & shave",
        ],
      },
      {
        name: 'Body',
        topics: [
          'Basic manicure & pedicure',
          'Hand & foot massage',
          'Nail shaping & cuticle care',
        ],
      },
    ],
    trainingMethodology:
      'Step-by-step foundational demonstrations covering hygiene protocols, tool handling, skin & scalp anatomy, and guided mannequin/partner drills.',
    practicalTraining:
      'Supervised studio practice on essential salon prep, patch testing, CTM routines, basic cuts, waxing, and manicure/pedicure procedures.',
    certification: 'YOUR SOUL Academy Certificate of Completion — Basic (Salon Assistant Level)',
    eligibility: 'Open to absolute beginners with passion for beauty; no prior salon experience required.',
    courseFeeNote: 'Contact for details',
    benefits: [
      'Build safe, hygienic salon habits from day one',
      'Master essential Hair, Skin & Body fundamentals',
      'Entry-ready skillset for Salon Assistant roles',
    ],
    photo: IMAGES.modeBasicHome,
    servicesPhoto: IMAGES.modeBasicSvc,
    salonPhoto: IMAGES.modeBasicSalon,
    accentColor: 'navy',
  },
  {
    id: 'mode-standard',
    moduleNumber: 'Module 02',
    title: 'STANDARD',
    roleSubtitle: 'Junior Stylist · Beautician Level',
    levelBadge: 'Junior Stylist',
    description:
      'Independently perform the most popular salon services on real clients with strong product knowledge and client communication.',
    includesPreviousNote: 'Includes everything in Basic',
    duration: 'Contact for details',
    learningFormat: 'Classroom Science + Supervised Real-Client Floor Sessions',
    availableCourses: [
      'Skin Concerns, Fruit/Gold/D-Tan Facials & Rica Waxing',
      'Layer/Step/Feather/Bob Cuts, Fades & Colour Theory',
      'Spa Manicure/Pedicure, Swedish Massage & Body Polishing',
      'Client Handling, Service Recommendation & Billing Basics',
    ],
    curriculumGroups: [
      {
        name: 'Skin',
        topics: [
          'Skin problems: whiteheads, blackheads, pimples, tan',
          'Pigmentation & acne basics',
          'Why & how skin concerns form',
          'Facials: fruit, gold, D-tan, hydrating',
          'Rica / chocolate wax & full body waxing',
          'Reading products & ingredients',
        ],
      },
      {
        name: 'Hair',
        topics: [
          'Layer, step, feather & bob cuts',
          "Men's fade & taper cuts",
          'Colour theory: levels & tones',
          'Global colour & root touch-up',
          'Highlights',
          'Hair spa, dandruff & hair-fall treatments',
          'Ironing, curling & basic updos',
        ],
      },
      {
        name: 'Body',
        topics: [
          'Spa manicure & pedicure',
          'Swedish body massage',
          'Body polishing & scrubs',
          'Back treatment',
        ],
      },
      {
        name: 'Client Skills',
        topics: [
          'Client handling & communication',
          'Service recommendation & upselling',
          'Billing & appointment basics',
        ],
      },
    ],
    trainingMethodology:
      'Ingredient-led skin & colour theory combined with structured chair drills and commercial client-handling roleplays.',
    practicalTraining:
      'Hands-on execution of popular salon facials, global hair colour, layered cuts, fades, spa therapies, and real-client consultations.',
    certification: 'YOUR SOUL Academy Diploma — Standard (Junior Stylist / Beautician Level)',
    eligibility: 'Beginners enrolling in full career track or Basic-level learners advancing to independent client services.',
    courseFeeNote: 'Contact for details',
    benefits: [
      'Perform high-demand salon services independently',
      'Understand colour levels, tones & skincare ingredients',
      'Develop consultation, billing & client retention skills',
    ],
    photo: IMAGES.modeStandardHome,
    servicesPhoto: IMAGES.modeStandardSvc,
    salonPhoto: IMAGES.modeStandardSalon,
    accentColor: 'orange',
  },
  {
    id: 'mode-advanced',
    moduleNumber: 'Module 03',
    title: 'ADVANCED',
    roleSubtitle: 'Stylist · Specialist Level',
    levelBadge: 'Specialist Level',
    description:
      'Master premium treatments, chemical hair services, therapeutic body work, and occasion/bridal styling.',
    includesPreviousNote: 'Includes everything in Basic & Standard',
    duration: 'Contact for details',
    learningFormat: 'Specialist Workshops + Chemical Lab + Live Model Clinic',
    availableCourses: [
      'O3+, HydraFacial, Pigmentation, Acne & Anti-Ageing Plans',
      'Highlights, Balayage, Ombré, Keratin, Botox & Rebonding',
      'Deep Tissue, Aromatherapy & Detox Body Wraps',
      'Day/Party Makeup, Saree Draping & Basic Nail Art',
    ],
    curriculumGroups: [
      {
        name: 'Skin',
        topics: [
          'Advanced facials: O3+, HydraFacial',
          'Pigmentation & de-tan treatments',
          'Acne care & skin-type based treatment plans',
          'Under-eye & anti-ageing treatments',
        ],
      },
      {
        name: 'Hair',
        topics: [
          'Highlights, balayage & ombré',
          'Keratin, smoothening & hair botox',
          'Rebonding & perming',
          'Dandruff & hair-fall treatments',
          'Bridal & party hairstyles',
        ],
      },
      {
        name: 'Body',
        topics: [
          'Deep tissue massage',
          'Aromatherapy massage',
          'Body wraps & detox treatments',
        ],
      },
      {
        name: 'Makeup & Styling',
        topics: [
          'Day & party makeup',
          'Saree draping styles',
          'Basic nail art',
        ],
      },
    ],
    trainingMethodology:
      'Advanced formulation labs, skin-type treatment planning, chemical hair texture control, and supervised specialist assessments.',
    practicalTraining:
      'Live model execution across balayage, keratin/botox, HydraFacial/O3+, therapeutic massage, occasion makeup, and saree draping.',
    certification: 'YOUR SOUL Academy Specialist Diploma — Advanced (Stylist / Specialist Level)',
    eligibility: 'Aspiring specialists enrolling directly in comprehensive training or practicing junior stylists upgrading skills.',
    courseFeeNote: 'Contact for details',
    benefits: [
      'Command high-value chemical colour & texture services',
      'Deliver targeted clinical-grade facial & scalp plans',
      'Expand into party makeup, draping & specialist body therapy',
    ],
    photo: IMAGES.modeAdvancedHome,
    servicesPhoto: IMAGES.modeAdvancedSvc,
    salonPhoto: IMAGES.modeAdvancedSalon,
    accentColor: 'navy',
  },
  {
    id: 'mode-expert',
    moduleNumber: 'Module 04',
    title: 'EXPERT',
    roleSubtitle: 'Senior Stylist · 1 Year+ Industry Level',
    levelBadge: 'Senior Industry Level',
    description:
      'Graduate with the skill, speed and confidence of a professional with 1+ year of salon experience, backed by live salon internship.',
    includesPreviousNote: 'Includes everything in Basic, Standard & Advanced',
    duration: 'Contact for details',
    learningFormat: 'Master Mentorship + Clinical Science + Live Salon Internship',
    availableCourses: [
      'Skin Science, Chemical Peels, Microdermabrasion & First Aid',
      'Precision/Razor Cuts, Colour Correction, Extensions & Trichology',
      'Reflexology, Potli Massage & Bridal Body Packages',
      'Bridal & HD Makeup, Gel/Acrylic Nails & Salon Management',
    ],
    curriculumGroups: [
      {
        name: 'Skin Science',
        topics: [
          'Hormones & vitamins and their effect on skin',
          'Acne grading & skin analysis',
          'Chemical peels & microdermabrasion',
          'Reactions, contraindications & first aid',
          'Cosmetic science & ingredients',
        ],
      },
      {
        name: 'Hair Mastery',
        topics: [
          'Precision, razor & texturizing cuts',
          'Skin fade & hair designs',
          'Colour correction',
          'Hair extensions',
          'Trichology basics: hair-fall types',
        ],
      },
      {
        name: 'Body Therapy',
        topics: [
          'Reflexology & pressure points',
          'Potli massage',
          'Complete bridal body packages',
        ],
      },
      {
        name: 'Bridal & Nails',
        topics: [
          'Bridal & HD makeup',
          'Gel & acrylic nails',
          'Advanced nail art',
        ],
      },
      {
        name: 'Professional Training',
        topics: [
          'Live salon internship at Your Soul with real clients',
          'Service logbook & timed practical assessment',
          'Treatment planning, complaint handling & salon management',
          'Portfolio building & social media presence',
        ],
      },
    ],
    trainingMethodology:
      'Intensive 1-on-1 master mentorship combining cosmetic biology, high-stakes colour correction, timed floor speed drills, and salon operations.',
    practicalTraining:
      'Mandatory live salon internship at Your Soul serving real clients, verified service logbook, timed assessments, and commercial portfolio shoot.',
    certification: 'YOUR SOUL Academy Master Certification — Expert (Senior Stylist Industry Level)',
    eligibility: 'Career-focused candidates targeting senior stylist placement, freelance bridal mastery, or salon ownership.',
    courseFeeNote: 'Contact for details',
    benefits: [
      'Graduate with 1+ year equivalent speed & floor confidence',
      'Complete live salon internship at Your Soul with real clients',
      'Includes portfolio building, salon management & social media training',
    ],
    photo: IMAGES.modeExpertHome,
    servicesPhoto: IMAGES.modeExpertSvc,
    salonPhoto: IMAGES.modeExpertSalon,
    accentColor: 'orange',
  },
];

// Skill-by-skill comparison of the four learning modes (✓ = covered at this level, — = not covered).
// Built only from the curriculum above; duration and fee show "Contact for details" until confirmed by the salon.
export const ACADEMY_COMPARISON_ROWS: AcademyComparisonRow[] = [
  {
    criteria: 'Skin Care',
    basic: '✓ CTM, clean-up, bleach, threading, waxing',
    standard: '✓ Fruit, gold, D-tan & hydrating facials',
    advanced: '✓ O3+ / HydraFacial, pigmentation & acne plans',
    expert: '✓ Chemical peels, microdermabrasion, skin science',
  },
  {
    criteria: 'Hair Cutting',
    basic: '✓ Straight / U / V, men\'s basic cut, beard trim & shave',
    standard: '✓ Layer, step, feather & bob; men\'s fade & taper',
    advanced: '✓ Included from Standard',
    expert: '✓ Precision, razor & texturizing cuts; skin fade & designs',
  },
  {
    criteria: 'Hair Colour',
    basic: '—',
    standard: '✓ Colour theory, global colour, root touch-up, highlights',
    advanced: '✓ Balayage & ombré',
    expert: '✓ Colour correction',
  },
  {
    criteria: 'Hair Treatments (keratin / smoothening)',
    basic: '—',
    standard: '✓ Hair spa, dandruff & hair-fall treatments',
    advanced: '✓ Keratin, smoothening, botox, rebonding, perm',
    expert: '✓ Hair extensions & trichology basics',
  },
  {
    criteria: 'Body Massage & Spa',
    basic: '✓ Hand & foot massage',
    standard: '✓ Swedish massage, body polishing & scrubs',
    advanced: '✓ Deep tissue, aromatherapy, body wraps',
    expert: '✓ Reflexology, pressure points, potli, bridal body packages',
  },
  {
    criteria: 'Makeup & Saree Draping',
    basic: '—',
    standard: '—',
    advanced: '✓ Day / party makeup & saree draping',
    expert: '✓ Bridal & HD makeup',
  },
  {
    criteria: 'Nails (gel / acrylic / art)',
    basic: '✓ Basic manicure & pedicure',
    standard: '✓ Spa manicure & pedicure',
    advanced: '✓ Basic nail art',
    expert: '✓ Gel & acrylic nails, advanced nail art',
  },
  {
    criteria: 'Live Salon Internship',
    basic: '—',
    standard: '—',
    advanced: '—',
    expert: '✓ At Your Soul, with real clients',
  },
  {
    criteria: 'Practical Assessment & Certificate',
    basic: '✓ Certificate of Completion',
    standard: '✓ Standard Diploma',
    advanced: '✓ Advanced Specialist Diploma',
    expert: '✓ Service logbook, timed practical assessment & Expert Master Certification',
  },
  {
    criteria: 'Career Level',
    basic: 'Salon Assistant',
    standard: 'Junior Stylist / Beautician',
    advanced: 'Stylist',
    expert: 'Senior Stylist (1 year+ level)',
  },
  {
    criteria: 'Course duration',
    basic: 'Contact for details',
    standard: 'Contact for details',
    advanced: 'Contact for details',
    expert: 'Contact for details',
  },
  {
    criteria: 'Course fee',
    basic: 'Contact for details',
    standard: 'Contact for details',
    advanced: 'Contact for details',
    expert: 'Contact for details',
  },
];


