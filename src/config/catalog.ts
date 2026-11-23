import type { SalonService, AcademyCourse } from '../types';

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

