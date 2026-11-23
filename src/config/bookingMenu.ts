// Options shown in the WhatsApp booking modal's dropdowns.
// Kept small and separate from siteContent so the always-loaded app shell stays light.
import type { ServiceCategory } from '../utils/whatsapp';
import { SALON_SERVICES, ACADEMY_COURSES } from './catalog';
import type { SalonService } from '../types';

export interface ServiceOption {
  name: string;
  category: ServiceCategory;
}

/** Signature categories (home page cards). */
export const SIGNATURE_SERVICES: ServiceOption[] = [
  { name: 'Hair Styling & Haircuts', category: 'Hair' },
  { name: 'Hair Colouring & Highlights', category: 'Hair' },
  { name: 'Bridal Makeup & Occasion Styling', category: 'Bridal' },
  { name: 'Hair Extensions & Enhancements', category: 'Hair' },
  { name: 'Nail Care & Extensions', category: 'Nails' },
  { name: 'Skin Care & Beauty Treatments', category: 'Skin' },
  { name: 'Scalp Detox & Trichology Therapy', category: 'Hair' },
  { name: 'Texture Realignment & Cysteine', category: 'Hair' },
  { name: "Men's Atelier Grooming & Beard Design", category: 'Men' },
];

const CATALOG_CATEGORY: Record<SalonService['category'], ServiceCategory> = {
  'Hair Design & Cut': 'Hair',
  'Colour & Balayage': 'Hair',
  'Dermal & Facial Rituals': 'Skin',
  'Trichology & Scalp': 'Hair',
  'Bridal & Editorial': 'Bridal',
};

export function catalogCategory(category: SalonService['category']): ServiceCategory {
  return CATALOG_CATEGORY[category] ?? 'Hair';
}

/** Detailed treatment menu (same list as the Contact-page booking form). */
export const TREATMENT_MENU: ServiceOption[] = SALON_SERVICES.map((s) => ({
  name: s.name,
  category: catalogCategory(s.category),
}));

/** The four Academy learning levels, in order. */
export const COURSE_LEVELS = [
  { id: 'mode-basic', label: 'Basic – Salon Assistant' },
  { id: 'mode-standard', label: 'Standard – Junior Stylist / Beautician' },
  { id: 'mode-advanced', label: 'Advanced – Stylist' },
  { id: 'mode-expert', label: 'Expert – Senior Stylist' },
] as const;

export function courseLevelLabel(modeId: string): string | undefined {
  return COURSE_LEVELS.find((l) => l.id === modeId)?.label;
}

/** Specialist diplomas & masterclasses. */
export const SPECIALIST_COURSES: string[] = ACADEMY_COURSES.map((c) => c.title);
