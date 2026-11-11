import {
  BannerConfig,
  EditorialSectionData,
  SalonService,
  AcademyCourse,
  ContactInfo,
  FAQItem,
  Testimonial,
} from '../types';

// ==========================================
// 8 MANDATORY INDEPENDENT BANNER CONFIGURATIONS
// ==========================================

export const LOGO_ASSET_PATH = '/assets/aistudio/OurSoul_Beauty_Salon_Logo_b48198f6.png';

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
    imageSrc: '/banners/salon_home_hero.jpg',
    altText: 'Luxury modern salon interior with professional stylist styling client hair in front of an elegant arch mirror',
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
    imageSrc: '/banners/salon_about_banner.jpg',
    altText: 'Professional salon team and founders in an authentic creative atelier styling session',
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
    imageSrc: '/banners/salon_services_banner.jpg',
    altText: 'Close-up professional hairstyling with shears, blow-dry styling, and botanical hair care',
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
    imageSrc: '/banners/salon_contact_banner.jpg',
    altText: 'Welcoming salon reception and consultation lounge with warm natural lighting',
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
    imageSrc: '/banners/academy_home_hero.jpg',
    altText: 'Professional beauty academy studio with students and master trainers in session',
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
    imageSrc: '/banners/academy_about_banner.jpg',
    altText: 'Master beauty educator demonstrating live hairstyling technique to apprentices',
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
    imageSrc: '/banners/academy_services_banner.jpg',
    altText: 'Cosmetology training equipment, professional brushes, and masterclass styling kit',
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
    imageSrc: '/banners/academy_contact_banner.jpg',
    altText: 'Modern academy admissions gallery and welcoming student consultation lounge',
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
      imageSrc: '/banners/salon_about_banner.jpg',
      altText: 'Editorial portrait of Your Soul Salon founders in clean tailored studio attire',
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
      imageSrc: '/banners/salon_home_hero.jpg',
      altText: 'Architectural details of Your Soul Salon stone wash basin with natural plant shadow',
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
      imageSrc: '/banners/salon_services_banner.jpg',
      altText: 'Stylist hand evaluating silk hair texture with precision comb',
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
      imageSrc: '/banners/salon_contact_banner.jpg',
      altText: 'Botanical oils and warm towels prepared for hair treatment',
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
      imageSrc: '/banners/academy_about_banner.jpg',
      altText: 'Senior academy trainers inspecting haircut geometry on mannequin with student',
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
      imageSrc: '/banners/academy_home_hero.jpg',
      altText: 'Student examining cosmetic chemistry test tubes and hair fiber microscope',
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
      imageSrc: '/banners/academy_services_banner.jpg',
      altText: 'Academy student performing professional blow-dry technique on clinic guest',
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
      imageSrc: '/banners/academy_contact_banner.jpg',
      altText: 'Technical diagram and cutting angle guide drawn on studio mirror',
      caption: 'Geometric Blueprint — Sectioning Angles & Elevation Studies'
    },
    imagePosition: 'right',
  },
];

// ==========================================
// SALON SERVICES CATALOG
// ==========================================

export const SALON_SERVICES: SalonService[] = [
  {
    id: 'srv-1',
    category: 'Hair Design & Cut',
    name: 'Bespoke Architectural Haircut & Blow-Dry',
    duration: '75 min',
    description: 'A tailored cut sculpted to your individual bone structure, natural cowlicks, and hair density. Includes botanical scalp clarification and custom blowout.',
    includes: ['Sensory Scalp Clarifying Ritual', 'Precision Dry & Wet Sculpting', 'Custom Thermal Styling & Prescription']
  },
  {
    id: 'srv-2',
    category: 'Hair Design & Cut',
    name: 'Restorative Hair Dusting & Split-End Resurfacing',
    duration: '45 min',
    description: 'Preserves long hair lengths while removing micro-damaged split ends without sacrificing hair volume or structural density.',
    includes: ['Micro-scissor dusting technique', 'Amino acid bond infusion', 'Velvet shine polish']
  },
  {
    id: 'srv-3',
    category: 'Colour & Balayage',
    name: 'Dimensional French Balayage & Gloss Melting',
    duration: '180 min',
    description: 'Freehand painted highlights calibrated for Indian hair undertones, creating a seamless sun-kissed transition with customized tonal gloss.',
    includes: ['Porosity balance pre-treatment', 'Organic clay-based lightener', 'Custom peptide glaze finish']
  },
  {
    id: 'srv-4',
    category: 'Colour & Balayage',
    name: 'Root Retouch & Rich Monochrome Toning',
    duration: '90 min',
    description: '100% ammonia-free micro-pigment grey coverage or single-process depth enhancement with radiant light reflectivity.',
    includes: ['Scalp barrier protection oil', 'Micro-pigment blend', 'Colour-locking cold-water rinse']
  },
  {
    id: 'srv-5',
    category: 'Dermal & Facial Rituals',
    name: 'Cellular Hydration & Lymphatic Dermal Lift',
    duration: '90 min',
    description: 'Sculptural buccal massage, ultrasound nutrient infusion, and cryo-globe tightening to restore radiance and lymphatic drainage.',
    includes: ['Double oil cleanse', 'Gua sha facial sculpting', 'Medical-grade oxygen infusion']
  },
  {
    id: 'srv-6',
    category: 'Dermal & Facial Rituals',
    name: 'Herbal Enzyme Resurfacing & Barrier Repair',
    duration: '60 min',
    description: 'Gentle fruit enzyme exfoliation paired with ceramide barrier replenishing masks designed specifically for reactive or pollution-stressed skin.',
    includes: ['Papaya & pomegranate peel', 'Blue LED soothing therapy', 'Botanical lipid seal']
  },
  {
    id: 'srv-7',
    category: 'Trichology & Scalp',
    name: 'Microbiome Scalp Detox & High-Frequency Therapy',
    duration: '60 min',
    description: 'Microscopic scalp imaging followed by volcanic clay exfoliation, ozone steam, and high-frequency wand stimulation to promote follicular vigor and combat hard water buildup.',
    includes: ['Digital trichoscope analysis', 'Volcanic clay peel', 'Rosemary-peptide growth serum']
  },
  {
    id: 'srv-8',
    category: 'Bridal & Editorial',
    name: 'Haute Bridal Consultation & Trial Session',
    duration: '120 min',
    description: 'Comprehensive styling exploration for wedding ceremonies (Sangeet, Muhurtham, Reception). Includes dupatta/veil draping, jewelry placement, and 4K camera testing.',
    includes: ['Two distinct trial looks', 'HD camera flash test', 'Bridal timeline coordination']
  }
];

// ==========================================
// ACADEMY COURSES CATALOG
// ==========================================

export const ACADEMY_COURSES: AcademyCourse[] = [
  {
    id: 'crs-1',
    discipline: 'Hair Artistry',
    title: 'Diploma in Precision Haircutting & Modern Architecture',
    level: 'Professional Diploma',
    duration: '16 Weeks · Full Time',
    intake: 'Quarterly (Jan, Apr, Jul, Oct)',
    practicalHours: '320 Clinic Hours',
    eligibility: 'High School Diploma or equivalent; interview required',
    certification: 'Accredited Master Stylist Certification',
    description: 'A comprehensive immersion in classic geometric precision, freehand carving, disconnection methods, and modern European scissor ergonomics.',
    syllabus: [
      'Module 1: Cranial Anatomy, Bone Structure & Line Geometry',
      'Module 2: The Three Foundational Techniques: Lines, Graduation & Layers',
      'Module 3: Scissor-Over-Comb, Texturizing & Dry Razor Carving',
      'Module 4: Men\'s Grooming, Fades & Modern Barbering Lines',
      'Module 5: Live Public Salon Apprenticeship & Portfolio Photography'
    ],
    careerOutcomes: [
      'Senior Haircut Specialist at Premier Salons',
      'Editorial & Fashion Week Session Stylist',
      'Independent Atelier Studio Founder'
    ]
  },
  {
    id: 'crs-2',
    discipline: 'Hair Artistry',
    title: 'Masterclass in Advanced Balayage, Bleach Science & Color Correction',
    level: 'Advanced Masterclass',
    duration: '8 Weeks · Part Time / Weekend',
    intake: 'Bi-Monthly',
    practicalHours: '120 Hands-On Hours',
    eligibility: 'Minimum 1 year salon experience or licensed hairdresser',
    certification: 'Advanced Master Colorist Credential',
    description: 'Deep dive into color chemistry, pH balance, developer calibration, freehand balayage sweeps, foilayage, and high-stakes color correction scenarios.',
    syllabus: [
      'Module 1: Lightener Chemistry & Hair Fiber Lipid Protection',
      'Module 2: French Freehand Balayage vs American Foil Placement',
      'Module 3: Formulating Glazes & Root Melt Color Chemistry',
      'Module 4: Color Correction: Reversing Bands, Box Dye & Green Shifts',
      'Module 5: Commercial Pricing Strategy & Client Consultation Mastery'
    ],
    careerOutcomes: [
      'Lead Color Director & Balayage Specialist',
      'Brand Educator & Technical Ambassador',
      'High-Ticket Colorist'
    ]
  },
  {
    id: 'crs-3',
    discipline: 'Dermal Science',
    title: 'Professional Diploma in Clinical Esthetics & Dermal Therapy',
    level: 'Professional Diploma',
    duration: '20 Weeks · Full Time',
    intake: 'Spring & Autumn',
    practicalHours: '400 Practical Clinic Hours',
    eligibility: 'High School Diploma; biology background beneficial',
    certification: 'Licensed Clinical Esthetician Diploma',
    description: 'Combines physiological skin science, cosmetic chemistry, facial lymphatic drainage, micro-needling protocols, and gentle medical peeling techniques.',
    syllabus: [
      'Module 1: Epidermal Barrier Biology, Histology & Skin Disorders',
      'Module 2: Active Ingredients: Retinoids, Peptides, AHAs & Antioxidants',
      'Module 3: Facial Sculpting: Gua Sha, Buccal Massage & Lymphatic Drainage',
      'Module 4: Aesthetic Machines: LED, Ultrasound & Oxygen Infusion',
      'Module 5: Clinic Hygiene, Sanitation Protocols & Client Record Keeping'
    ],
    careerOutcomes: [
      'Clinical Esthetician at Medical Spas & Wellness Resorts',
      'Private Dermal Practitioner',
      'Cosmeceutical Brand Consultant'
    ]
  },
  {
    id: 'crs-4',
    discipline: 'Makeup & High Fashion',
    title: 'Bridal & Editorial High-Fashion Makeup Artistry Masterclass',
    level: 'Advanced Masterclass',
    duration: '6 Weeks · Intensive',
    intake: 'Monthly',
    practicalHours: '90 Hands-on Studio Hours',
    eligibility: 'Open to passionate beginners and working artists',
    certification: 'Certified Editorial Makeup Artist',
    description: 'Master the art of second-skin complexion work, bridal longevity, camera flash calibration, high-fashion contouring, and runway moodboard translation.',
    syllabus: [
      'Module 1: Skin Prep, Complexion Undertones & Color Matching',
      'Module 2: Bridal Longevity: Waterproofing & Tear-Proof Setting',
      'Module 3: Studio Lighting & HD Camera Color Response',
      'Module 4: Graphic Eye Artistry, Lash Customization & Brow Lamination',
      'Module 5: Building a High-End Bridal Client Roster'
    ],
    careerOutcomes: [
      'Luxury Wedding Makeup Artist',
      'Runway & Commercial Studio Stylist',
      'Celebrity & Red Carpet Makeup Artist'
    ]
  },
  {
    id: 'crs-5',
    discipline: 'Dermal Science',
    title: 'Diploma in Advanced Trichology & Therapeutic Head Spa Protocols',
    level: 'Professional Diploma',
    duration: '10 Weeks · Modular',
    intake: 'Quarterly',
    practicalHours: '150 Practical Clinical Hours',
    eligibility: 'Open to licensed stylists and wellness practitioners',
    certification: 'Certified Clinical Trichology Practitioner',
    description: 'Master microscopic scalp diagnostics, follicular detoxification, high-frequency ozone therapy, Japanese head spa acupressure, and custom botanical scalp formulas.',
    syllabus: [
      'Module 1: Trichology Anatomy, Follicular Cycles & Sebum Pathologies',
      'Module 2: Microscopic Digital Scalp Diagnosis & Follicle Mapping',
      'Module 3: Japanese Head Spa Protocols & Cranial Acupressure',
      'Module 4: Ozone Steam & Botanical Peptide Infusion Chemistry',
      'Module 5: Designing Clinical Trichology Client Consultation Programs'
    ],
    careerOutcomes: [
      'Head Spa Sanctuary Director',
      'Trichology Specialist at Luxury Salons',
      'Scalp Clinic Practitioner'
    ]
  },
  {
    id: 'crs-6',
    discipline: 'Comprehensive Cosmetology',
    title: 'Master Certificate in Russian Dry Manicure & BIAB Gel Architecture',
    level: 'Advanced Masterclass',
    duration: '4 Weeks · Intensive',
    intake: 'Monthly',
    practicalHours: '60 Hands-on Studio Hours',
    eligibility: 'Open to nail artists and beauty professionals',
    certification: 'Certified Master Nail Architect',
    description: 'Master safe e-file Russian dry manicuring, precision diamond cuticle cleanup, apex alignment with Builder-In-A-Bottle (BIAB), and sterile autoclave protocols.',
    syllabus: [
      'Module 1: Nail Anatomy, Cuticle Chemistry & Safe E-File Bit Selection',
      'Module 2: Precision Russian Dry Cuticle Cleanup Techniques',
      'Module 3: Apex Architecture & Self-Leveling BIAB Gel Overlays',
      'Module 4: Chrome Powders, Minimalist French & Artisanal Finishes',
      'Module 5: Medical-Grade Autoclave Sterilization & Hygiene Protocol'
    ],
    careerOutcomes: [
      'Senior Nail Architect at Premium Salons',
      'Independent BIAB Specialist',
      'Editorial Nail Stylist'
    ]
  }
];

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
  whatsappUrl: 'https://wa.me/919553888432',
  instagramUrl: 'https://www.instagram.com/yoursoul_saloons/',
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
  whatsappUrl: 'https://wa.me/919553888432',
  instagramUrl: 'https://www.instagram.com/yoursoul_saloons/',
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

