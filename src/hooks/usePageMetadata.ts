import { useEffect } from 'react';
import { DivisionMode, PageRoute } from '../types';

interface MetaConfig {
  title: string;
  description: string;
  keywords: string;
}

const METADATA_MAP: Record<DivisionMode, Record<PageRoute, MetaConfig>> = {
  salon: {
    home: {
      title: 'YOUR SOUL SALON — Luxury Hair & Beauty Sanctuary Guntur',
      description: 'Experience haute coiffure, bespoke haircutting, French balayage, and restorative skin rituals at YOUR SOUL Salon in Vijayapuri Colony, Guntur.',
      keywords: 'luxury salon guntur, hair salon vijayapuri colony, bridal makeup guntur, balayage hair color, skin treatments guntur',
    },
    about: {
      title: 'About Our Master Stylists & Atelier Story — YOUR SOUL SALON',
      description: 'Discover the artisanal philosophy, European hair techniques, and skin care mastery behind YOUR SOUL Salon in Vijayapuri Colony, Guntur.',
      keywords: 'hair salon founders guntur, master hair stylists, luxury salon story, bespoke hair salon andhra pradesh',
    },
    services: {
      title: 'Curated Hair, Skin & Scalp Services — YOUR SOUL SALON',
      description: 'Explore our full menu of architectural haircutting, dimensional balayage, bridal occasion styling, hair extensions, and botanical skin therapies.',
      keywords: 'salon services guntur, haircutting services, bridal makeup booking, hair styling packages guntur',
    },
    contact: {
      title: 'Book an Appointment & Private Concierge — YOUR SOUL SALON',
      description: 'Reserve your personalized hair or skin consultation at YOUR SOUL Salon, Vijayapuri Colony, Guntur. Call 095538 88432 or message on WhatsApp.',
      keywords: 'book salon appointment guntur, vijayapuri colony salon contact, bridal hair consultation guntur',
    },
  },
  academy: {
    home: {
      title: 'YOUR SOUL ACADEMY — Professional Beauty & Cosmetology Education Guntur',
      description: 'Certified cosmetology diplomas, precision haircutting, masterclasses, and runway styling mentorship in Vijayapuri Colony, Guntur.',
      keywords: 'beauty academy guntur, cosmetology courses andhra pradesh, professional makeup classes guntur, hair styling diploma',
    },
    about: {
      title: 'About Our Trainers & Pedagogy — YOUR SOUL ACADEMY',
      description: 'Meet our world-class academy mentors, international master colorists, and clinical estheticians training the next generation of stylists in Guntur.',
      keywords: 'cosmetology trainers guntur, makeup academy faculty, beauty education mentors andhra pradesh',
    },
    services: {
      title: 'Professional Beauty Courses & Syllabi — YOUR SOUL ACADEMY',
      description: 'Browse our accredited beauty programs, advanced hair design, cosmetology diplomas, and bridal masterclasses with hands-on clinic practice in Guntur.',
      keywords: 'hair dressing course guntur, beauty diploma syllabus, bridal makeup certification andhra pradesh',
    },
    contact: {
      title: 'Admissions Office & Campus Tours — YOUR SOUL ACADEMY',
      description: 'Schedule a campus tour, attend a workshop preview, or speak with an admissions counselor at YOUR SOUL Academy, Guntur. Call 095538 88432.',
      keywords: 'academy admissions guntur, cosmetology admission vijayapuri colony, beauty course enquiry andhra pradesh',
    },
  },
};

export function usePageMetadata(mode: DivisionMode, page: PageRoute) {
  useEffect(() => {
    const meta = METADATA_MAP[mode]?.[page] || METADATA_MAP.salon.home;
    
    // Set document title
    document.title = meta.title;

    // Helper to safely set or create meta tag
    const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Primary meta description and keywords
    setMetaTag('name', 'description', meta.description);
    setMetaTag('name', 'keywords', meta.keywords);

    // OpenGraph meta tags
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', 'YOUR SOUL — Salon & Academy');
    setMetaTag('property', 'og:url', window.location.href);

    // Twitter Card meta tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + (page === 'home' ? `/${mode}` : `/${mode}/${page}`));
  }, [mode, page]);
}
