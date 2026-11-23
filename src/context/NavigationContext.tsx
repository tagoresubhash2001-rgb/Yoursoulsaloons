import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DivisionMode, PageRoute } from '../types';

interface NavigationContextType {
  mode: DivisionMode;
  page: PageRoute;
  setMode: (newMode: DivisionMode) => void;
  navigateTo: (page: PageRoute, targetMode?: DivisionMode) => void;
  navigateToBooking: (serviceId?: string) => void;
  /** Navigate to a page and smoothly scroll to an element id on it (e.g. 'academy-courses'). */
  navigateToSection: (page: PageRoute, mode: DivisionMode, sectionId: string) => void;
  selectedServiceId?: string;
  setSelectedServiceId: (serviceId?: string) => void;
  currentPath: string;
}

/**
 * Scroll to #id once it has rendered on the NEW page.
 * Pages are lazy-loaded and cross-fade (the old page stays mounted for ~240ms), and the same section id
 * can exist on both pages — so wait out the transition, scroll only once the target's position is stable,
 * then do one correction pass in case images/fonts above it changed the layout.
 */
function scrollToIdWhenReady(id: string, { initialDelay = 320, timeoutMs = 4000 } = {}) {
  const start = Date.now();
  let lastTop: number | null = null;
  const headerOffset = () => {
    const el = document.getElementById(id);
    return el ? parseFloat(getComputedStyle(el).scrollMarginTop) || 0 : 0;
  };
  const scrollNow = (behavior: ScrollBehavior) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior, block: 'start' });
  };
  const tick = () => {
    const el = document.getElementById(id);
    if (el) {
      const top = Math.round(el.getBoundingClientRect().top + window.scrollY);
      if (lastTop !== null && Math.abs(top - lastTop) <= 2) {
        scrollNow('smooth');
        window.setTimeout(() => {
          const now = document.getElementById(id)?.getBoundingClientRect().top ?? 0;
          if (Math.abs(now - headerOffset()) > 8) scrollNow('smooth');
        }, 900);
        return;
      }
      lastTop = top;
    }
    if (Date.now() - start < timeoutMs) window.setTimeout(tick, 120);
  };
  window.setTimeout(tick, initialDelay);
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

function parsePath(pathname: string): { mode: DivisionMode; page: PageRoute } {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  if (!clean) {
    return { mode: 'salon', page: 'home' };
  }

  const segments = clean.split('/');
  const rawMode = segments[0]?.toLowerCase();
  const rawPage = segments[1]?.toLowerCase();

  const mode: DivisionMode = rawMode === 'academy' ? 'academy' : 'salon';
  let page: PageRoute = 'home';

  if (rawPage === 'about') page = 'about';
  else if (rawPage === 'services') page = 'services';
  else if (rawPage === 'contact') page = 'contact';

  return { mode, page };
}

function buildPath(mode: DivisionMode, page: PageRoute): string {
  if (page === 'home') {
    return `/${mode}`;
  }
  return `/${mode}/${page}`;
}

const PAGE_TITLES: Record<DivisionMode, Record<PageRoute, string>> = {
  salon: {
    home: 'YOUR SOUL SALON — Haute Coiffure & Dermal Sanctuary',
    about: 'About Our Founders & Atelier Story — YOUR SOUL SALON',
    services: 'Curated Hair, Skin & Scalp Services — YOUR SOUL SALON',
    contact: 'Appointments & Concierge — YOUR SOUL SALON',
  },
  academy: {
    home: 'YOUR SOUL ACADEMY — Professional Beauty Education & Masterclasses',
    about: 'About Our Trainers & Educational Pedagogy — YOUR SOUL ACADEMY',
    services: 'Professional Beauty Courses & Syllabi — YOUR SOUL ACADEMY',
    contact: 'Admissions Office & Campus Visits — YOUR SOUL ACADEMY',
  },
};

const PAGE_DESCRIPTIONS: Record<DivisionMode, Record<PageRoute, string>> = {
  salon: {
    home: 'An architectural beauty sanctuary in the city center. Bespoke haircutting, French balayage, and restorative skin rituals.',
    about: 'Meet the founding creative directors behind Your Soul Salon. Guided by botanical science, European discipline, and unhurried client care.',
    services: 'Explore our full menu of architectural haircutting, dimensional balayage, cellular dermal facials, and trichology scalp therapies.',
    contact: 'Book a private consultation at Your Soul Salon. Convenient valet parking, private styling suites, and sensory tea service.',
  },
  academy: {
    home: 'Accredited beauty and cosmetology diplomas taught by active runway directors, master colorists, and clinical estheticians.',
    about: 'Discover the master educators of Your Soul Academy. Practical hands-on mentorship, low 1:8 student-to-teacher ratio, and commercial clinic experience.',
    services: 'Comprehensive cosmetology diplomas, precision cutting certifications, and masterclasses in advanced balayage and clinical esthetics.',
    contact: 'Schedule an admissions tour or portfolio interview at Your Soul Academy. Request syllabi and speak with financial advisors.',
  },
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<DivisionMode>('salon');
  const [page, setPageState] = useState<PageRoute>('home');
  const [currentPath, setCurrentPath] = useState<string>('/salon');
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

  // Sync state from window.location
  const syncFromLocation = useCallback(() => {
    if (typeof window === 'undefined') return;
    const { mode: parsedMode, page: parsedPage } = parsePath(window.location.pathname);
    setModeState(parsedMode);
    setPageState(parsedPage);
    setCurrentPath(buildPath(parsedMode, parsedPage) + (window.location.hash || ''));

    // Check URL search params for service
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    if (serviceParam) {
      setSelectedServiceId(serviceParam);
    }

    // Scroll to any #section in the URL (e.g. #appointment-booking, #academy-courses)
    if (window.location.hash.length > 1) {
      scrollToIdWhenReady(decodeURIComponent(window.location.hash.slice(1)));
    }

    // Update document title and meta description
    const title = PAGE_TITLES[parsedMode][parsedPage];
    const desc = PAGE_DESCRIPTIONS[parsedMode][parsedPage];
    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);
  }, []);

  useEffect(() => {
    syncFromLocation();

    const handlePopState = () => {
      syncFromLocation();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [syncFromLocation]);

  // Navigate to route
  const navigateTo = useCallback(
    (targetPage: PageRoute, targetMode?: DivisionMode) => {
      const nextMode = targetMode || mode;
      const nextPath = buildPath(nextMode, targetPage);

      if (window.location.pathname !== nextPath) {
        window.history.pushState(null, '', nextPath);
      }

      setModeState(nextMode);
      setPageState(targetPage);
      setCurrentPath(nextPath);

      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Update titles
      const title = PAGE_TITLES[nextMode][targetPage];
      const desc = PAGE_DESCRIPTIONS[nextMode][targetPage];
      document.title = title;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', desc);
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', title);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', desc);
    },
    [mode]
  );

  // Centralized booking navigation: every appointment button directs to Salon Contact #appointment-booking
  const navigateToBooking = useCallback(
    (serviceId?: string) => {
      const nextMode: DivisionMode = 'salon';
      const targetPage: PageRoute = 'contact';
      if (serviceId) {
        setSelectedServiceId(serviceId);
      }

      const hash = '#appointment-booking';
      const search = serviceId ? `?service=${encodeURIComponent(serviceId)}` : '';
      const nextPath = `/salon/contact${search}${hash}`;

      window.history.pushState(null, '', nextPath);
      setModeState(nextMode);
      setPageState(targetPage);
      setCurrentPath(nextPath);

      // Smoothly scroll to the central booking form
      setTimeout(() => {
        const el = document.getElementById('appointment-booking');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

      // Update titles
      const title = PAGE_TITLES[nextMode][targetPage];
      const desc = PAGE_DESCRIPTIONS[nextMode][targetPage];
      document.title = title;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', desc);
    },
    []
  );

  const navigateToSection = useCallback(
    (targetPage: PageRoute, targetMode: DivisionMode, sectionId: string) => {
      const nextPath = `${buildPath(targetMode, targetPage)}#${sectionId}`;
      window.history.pushState(null, '', nextPath);
      setModeState(targetMode);
      setPageState(targetPage);
      setCurrentPath(nextPath);
      document.title = PAGE_TITLES[targetMode][targetPage];
      scrollToIdWhenReady(sectionId);
    },
    []
  );

  // Switch mode while retaining the current page
  const setMode = useCallback(
    (newMode: DivisionMode) => {
      if (newMode === mode) return;
      navigateTo(page, newMode);
    },
    [mode, page, navigateTo]
  );

  return (
    <NavigationContext.Provider
      value={{
        mode,
        page,
        setMode,
        navigateTo,
        navigateToBooking,
        navigateToSection,
        selectedServiceId,
        setSelectedServiceId,
        currentPath,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
