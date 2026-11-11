export type DivisionMode = 'salon' | 'academy';

export type PageRoute = 'home' | 'about' | 'services' | 'contact';

export interface FocalPointConfig {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface BannerConfig {
  slotId: string;
  slotNumber: number; // 1 to 8
  route: string; // e.g. '/salon', '/salon/about', '/academy/services', etc.
  division: DivisionMode; // 'salon' | 'academy'
  page: PageRoute; // 'home' | 'about' | 'services' | 'contact'
  title: string;
  subtitle: string;
  kicker: string;
  aspectRatio: string;
  recommendedResolution: string;
  altText: string;
  imageSrc?: string;
  caption?: string;
  focalPoint: FocalPointConfig;
}

export interface EditorialSectionData {
  id: string;
  indexNumber: string;
  kicker: string;
  title: string;
  leadNarrative: string;
  bodyNarrative: string;
  quote?: {
    text: string;
    author: string;
  };
  keyPillars?: string[];
  imageSlot: {
    slotId: string;
    title: string;
    aspectRatio: string;
    altText: string;
    imageSrc?: string;
    caption?: string;
  };
  imagePosition: 'left' | 'right';
}

export interface SalonService {
  id: string;
  category: 'Hair Design & Cut' | 'Colour & Balayage' | 'Dermal & Facial Rituals' | 'Bridal & Editorial' | 'Trichology & Scalp';
  name: string;
  duration: string;
  description: string;
  includes: string[];
}

export interface AcademyCourse {
  id: string;
  discipline: 'Hair Artistry' | 'Dermal Science' | 'Makeup & High Fashion' | 'Comprehensive Cosmetology';
  title: string;
  level: 'Foundation' | 'Advanced Masterclass' | 'Professional Diploma';
  duration: string;
  intake: string;
  practicalHours: string;
  eligibility: string;
  certification: string;
  description: string;
  syllabus: string[];
  careerOutcomes: string[];
}

export interface ContactInfo {
  division: DivisionMode;
  headline: string;
  subheadline: string;
  addressLines: string[];
  phone: string;
  whatsappNumber: string;
  whatsappUrl: string;
  instagramUrl: string;
  mapUrl: string;
  email: string;
  hours: { day: string; time: string }[];
  note: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'salon' | 'academy' | 'general';
  tags?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  category: 'salon' | 'academy';
  serviceOrCourse: string;
  rating: number;
  quote: string;
  date: string;
  verified: boolean;
}


