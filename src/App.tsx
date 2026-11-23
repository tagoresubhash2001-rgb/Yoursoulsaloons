import React, { useState, useCallback, lazy, Suspense } from 'react';
import { AssetProvider } from './context/AssetContext';
import { MotionProvider } from './context/MotionContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageSkeleton } from './components/Skeleton';
import { usePageMetadata } from './hooks/usePageMetadata';
import { motion, AnimatePresence } from 'motion/react';

// Route-based and modal code splitting — defers heavy chunks (including Firebase SDK on ContactPage)
const HomePage = lazy(() =>
  import('./pages/HomePage').then((m) => ({ default: m.HomePage }))
);
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const AppointmentModal = lazy(() =>
  import('./components/AppointmentModal').then((m) => ({ default: m.AppointmentModal }))
);
const AssetManagerDrawer = lazy(() =>
  import('./components/AssetManagerDrawer').then((m) => ({ default: m.AssetManagerDrawer }))
);

function AppContent() {
  const { mode, page, navigateToBooking, navigateTo } = useNavigation();

  // Dynamically update document title and meta description per active mode and page
  usePageMetadata(mode, page);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [preselectedCourse, setPreselectedCourse] = useState<string | undefined>(undefined);

  // All appointment-related CTAs route directly to the single central booking form on Salon Contact page
  const handleOpenBooking = useCallback(
    (serviceId?: string, courseId?: string) => {
      if (courseId) {
        navigateTo('contact', 'academy');
      } else {
        navigateToBooking(serviceId);
      }
    },
    [navigateTo, navigateToBooking]
  );

  const handleCloseBooking = useCallback(() => {
    setBookingModalOpen(false);
    setPreselectedService(undefined);
    setPreselectedCourse(undefined);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#14171A] selection:bg-[#EAE1D5] selection:text-[#14171A]">
      {/* Skip to Main Content Link (Accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#14171A] focus:text-[#FAF8F5] text-xs uppercase tracking-wider"
      >
        Skip to main content
      </a>

      {/* Main Header with Top Bar Contract & Dual-Mode Switch */}
      <Header onOpenBookingModal={() => handleOpenBooking()} />

      {/* Main Dynamic View with GPU-Composited Route Transitions & Lazy Code Splitting */}
      <main id="main-content" className="flex-1 focus:outline-hidden overflow-x-clip">
        <Suspense fallback={<PageSkeleton variant={page} />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${mode}-${page}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              {page === 'home' && <HomePage onOpenBookingModal={handleOpenBooking} />}
              {page === 'about' && <AboutPage onOpenBookingModal={() => handleOpenBooking()} />}
              {page === 'services' && <ServicesPage onOpenBookingModal={handleOpenBooking} />}
              {page === 'contact' && <ContactPage />}
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Lazy-Loaded Interactive Modal (mounted only when needed) */}
      {bookingModalOpen && (
        <Suspense fallback={null}>
          <AppointmentModal
            isOpen={bookingModalOpen}
            onClose={handleCloseBooking}
            mode={mode}
            preselectedServiceId={preselectedService}
            preselectedCourseId={preselectedCourse}
          />
        </Suspense>
      )}

      {/* Lazy-Loaded Asset Inspector Drawer */}
      <Suspense fallback={null}>
        <AssetManagerDrawer />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <AssetProvider>
      <MotionProvider>
        <NavigationProvider>
          <AppContent />
        </NavigationProvider>
      </MotionProvider>
    </AssetProvider>
  );
}
