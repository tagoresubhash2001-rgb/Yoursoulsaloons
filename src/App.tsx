import React, { useState, useEffect } from 'react';
import { AssetProvider } from './context/AssetContext';
import { MotionProvider } from './context/MotionContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { AppointmentModal } from './components/AppointmentModal';
import { AssetManagerDrawer } from './components/AssetManagerDrawer';
import { usePageMetadata } from './hooks/usePageMetadata';
import { testFirestoreConnection } from './firebase';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  const { mode, page, navigateToBooking, navigateTo } = useNavigation();

  // Dynamically update document title and meta description per active mode and page
  usePageMetadata(mode, page);

  // Validate Firestore connection on boot
  useEffect(() => {
    testFirestoreConnection();
  }, []);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [preselectedCourse, setPreselectedCourse] = useState<string | undefined>(undefined);

  // All appointment-related CTAs route directly to the single central booking form on Salon Contact page
  const handleOpenBooking = (serviceId?: string, courseId?: string) => {
    if (courseId) {
      // In Academy mode with a specific course, route to Academy Admissions contact
      navigateTo('contact', 'academy');
    } else {
      // In Salon mode or general booking CTA, route to central booking form preserving selected service
      navigateToBooking(serviceId);
    }
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
    setPreselectedService(undefined);
    setPreselectedCourse(undefined);
  };

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

      {/* Main Dynamic View with Apple-Style Route Transitions */}
      <main id="main-content" className="flex-1 focus:outline-hidden overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${mode}-${page}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            {page === 'home' && <HomePage onOpenBookingModal={handleOpenBooking} />}
            {page === 'about' && <AboutPage onOpenBookingModal={() => handleOpenBooking()} />}
            {page === 'services' && <ServicesPage onOpenBookingModal={handleOpenBooking} />}
            {page === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Interactive Reservation / Admissions Modal */}
      <AppointmentModal
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
        mode={mode}
        preselectedServiceId={preselectedService}
        preselectedCourseId={preselectedCourse}
      />

      {/* 8-Banner Photo Asset Slot Inspector Drawer */}
      <AssetManagerDrawer />
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
