import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { PageRoute, DivisionMode } from '../types';
import { Menu, X, ArrowUpRight, Phone, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onOpenBookingModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBookingModal }) => {
  const { mode, page, setMode, navigateTo } = useNavigation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; pageId: PageRoute }[] = [
    { label: 'Home', pageId: 'home' },
    { label: 'About', pageId: 'about' },
    { label: mode === 'salon' ? 'Services' : 'Courses & Programs', pageId: 'services' },
    { label: 'Contact Us', pageId: 'contact' },
  ];

  const handleNavClick = (pageId: PageRoute) => {
    navigateTo(pageId);
    setMobileMenuOpen(false);
  };

  const handleModeSwitch = (targetMode: DivisionMode) => {
    setMode(targetMode);
    setMobileMenuOpen(false);
  };

  const primaryCtaLabel = mode === 'salon' ? 'Book Appointment' : 'Admissions Enquiry';

  return (
    <>
      {/* Top Spacer to prevent floating island from covering initial hero content */}
      <div className="h-20 sm:h-24 w-full shrink-0" aria-hidden="true" />

      {/* APPLE-INSPIRED DYNAMIC ISLAND FLOATING NAVIGATION */}
      <header className="fixed top-2.5 sm:top-4 left-0 right-0 z-50 flex flex-col items-center px-3 sm:px-6 pointer-events-none">
        
        {/* Dynamic Island Floating Pill Container */}
        <motion.div
          layout
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto w-full max-w-5xl rounded-full border transition-all duration-300 flex items-center justify-between gap-2.5 sm:gap-4 lg:gap-6 ${
            isScrolled
              ? 'py-2 px-3.5 sm:px-4.5 bg-[#FAF8F5]/94 backdrop-blur-2xl border-[#D8CFC3] shadow-[0_12px_36px_rgba(14,46,84,0.12)]'
              : 'py-2.5 px-4 sm:px-5 bg-[#FAF8F5]/88 backdrop-blur-xl border-[#E2D9CE] shadow-[0_6px_24px_rgba(20,23,26,0.06)]'
          }`}
        >
          {/* ZONE 1: BRAND ORIGINAL LOGO */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="group flex items-center gap-2 sm:gap-2.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D95A1E] rounded-full p-0.5"
              aria-label="YOUR SOUL — Salon & Academy Home"
            >
              <img
                src="/assets/aistudio/OurSoul_Beauty_Salon_Logo_b48198f6.png"
                alt="YOUR SOUL — Hair | Beauty | Nails | Makeup"
                className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                width={136}
                height={40}
              />
            </button>
          </div>

          {/* ZONE 2: PRIMARY NAVIGATION LINKS (DESKTOP DYNAMIC ISLAND CENTER) */}
          <nav 
            aria-label="Main Navigation" 
            className="hidden lg:flex items-center gap-1 xl:gap-2"
          >
            {navItems.map((item) => {
              const isActive = page === item.pageId;
              return (
                <button
                  key={item.pageId}
                  type="button"
                  onClick={() => handleNavClick(item.pageId)}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase transition-colors cursor-pointer min-h-[38px] flex items-center whitespace-nowrap ${
                    isActive
                      ? 'text-[#0E2E54] font-semibold'
                      : 'text-[#524B43] hover:text-[#14171A] hover:bg-[#EFE8DF]/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="islandNavPill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#EAE2D7]/80 border border-[#D5CABC]/70 -z-10"
                    />
                  )}
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-[#D95A1E]" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ZONE 3: DUAL-MODE SWITCHER & PRIMARY ACTION BUTTON (ROUNDED RECTANGULAR 8-12px) */}
          <div className="hidden sm:flex items-center gap-2.5 sm:gap-3 shrink-0">
            
            {/* Dynamic Island Mode Segmented Switcher */}
            <div 
              role="group" 
              aria-label="Select Division Mode" 
              className="relative flex items-center p-1 rounded-full border border-[#D5CABC] bg-[#ECE5DA]/80"
            >
              <button
                type="button"
                onClick={() => handleModeSwitch('salon')}
                aria-pressed={mode === 'salon'}
                className={`relative z-10 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer min-h-[32px] flex items-center ${
                  mode === 'salon'
                    ? 'text-[#FAF8F5] font-semibold'
                    : 'text-[#5C5349] hover:text-[#14171A]'
                }`}
              >
                {mode === 'salon' && (
                  <motion.div
                    layoutId="islandActiveMode"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute inset-0 rounded-full bg-[#0E2E54] shadow-xs"
                  />
                )}
                <span className="relative z-20">Salon</span>
              </button>

              <button
                type="button"
                onClick={() => handleModeSwitch('academy')}
                aria-pressed={mode === 'academy'}
                className={`relative z-10 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer min-h-[32px] flex items-center ${
                  mode === 'academy'
                    ? 'text-[#FAF8F5] font-semibold'
                    : 'text-[#5C5349] hover:text-[#14171A]'
                }`}
              >
                {mode === 'academy' && (
                  <motion.div
                    layoutId="islandActiveMode"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute inset-0 rounded-full bg-[#D95A1E] shadow-xs"
                  />
                )}
                <span className="relative z-20">Academy</span>
              </button>
            </div>

            {/* Standardized Rounded Rectangular Primary CTA (Mode-Aware: Orange in Salon, Navy in Academy) */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenBookingModal}
              className={`${
                mode === 'salon' ? 'btn-brand-primary' : 'btn-brand-navy'
              } min-h-[40px] px-4 py-2 text-xs`}
            >
              <span>{primaryCtaLabel}</span>
              <ArrowUpRight className="h-3.5 w-3.5 stroke-[2]" />
            </motion.button>
          </div>

          {/* MOBILE ISLAND CONTROLS */}
          <div className="flex sm:hidden items-center gap-1.5 shrink-0">
            {/* Quick Mode Toggle in Island */}
            <button
              type="button"
              onClick={() => handleModeSwitch(mode === 'salon' ? 'academy' : 'salon')}
              className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-white flex items-center gap-1 min-h-[34px] cursor-pointer ${
                mode === 'salon' ? 'bg-[#0E2E54]' : 'bg-[#D95A1E]'
              }`}
            >
              <span>{mode === 'salon' ? 'Salon' : 'Academy'}</span>
            </button>

            {/* Island Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="p-1.5 rounded-full bg-[#ECE5DA] text-[#14171A] hover:bg-[#E2D9CE] focus-visible:outline-2 focus-visible:outline-[#D95A1E] cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </motion.div>

        {/* EXPANDED DYNAMIC ISLAND MOBILE / TABLET DRAWER */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto w-full max-w-lg mt-2.5 rounded-[20px] border border-[#D5CABC] bg-[#FAF8F5]/96 backdrop-blur-2xl shadow-[0_20px_48px_rgba(14,46,84,0.18)] p-5 overflow-hidden"
            >
              {/* Division Mode Switcher in Drawer */}
              <div className="pb-4 border-b border-[#E8E0D5]">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#7D7164] mb-2 flex items-center justify-between">
                  <span>Current Experience</span>
                  <span className="text-[#0E2E54] font-semibold">{mode === 'salon' ? 'Salon Division' : 'Academy Division'}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#ECE5DA]/80 border border-[#DDD3C6]">
                  <button
                    type="button"
                    onClick={() => handleModeSwitch('salon')}
                    className={`py-2 px-3 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer min-h-[40px] ${
                      mode === 'salon'
                        ? 'bg-[#0E2E54] text-white shadow-xs'
                        : 'text-[#5C5349] hover:text-[#14171A]'
                    }`}
                  >
                    Your Soul Salon
                  </button>
                  <button
                    type="button"
                    onClick={() => handleModeSwitch('academy')}
                    className={`py-2 px-3 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer min-h-[40px] ${
                      mode === 'academy'
                        ? 'bg-[#D95A1E] text-white shadow-xs'
                        : 'text-[#5C5349] hover:text-[#14171A]'
                    }`}
                  >
                    Your Soul Academy
                  </button>
                </div>
              </div>

              {/* Navigation Items */}
              <nav aria-label="Mobile Navigation" className="py-3 flex flex-col space-y-1">
                {navItems.map((item) => {
                  const isActive = page === item.pageId;
                  return (
                    <button
                      key={item.pageId}
                      type="button"
                      onClick={() => handleNavClick(item.pageId)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm uppercase tracking-wider transition-colors min-h-[44px] cursor-pointer ${
                        isActive
                          ? 'bg-[#EAE2D7] text-[#0E2E54] font-semibold'
                          : 'text-[#4A433A] hover:bg-[#F2ECE4] hover:text-[#14171A]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive ? (
                        <span className="h-2 w-2 rounded-full bg-[#D95A1E]" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-[#A89D8E]" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Primary Mobile Action Button */}
              <div className="pt-3 border-t border-[#E8E0D5] flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBookingModal();
                  }}
                  className={`${
                    mode === 'salon' ? 'btn-brand-primary' : 'btn-brand-navy'
                  } w-full justify-center min-h-[44px]`}
                >
                  <span>{primaryCtaLabel}</span>
                  <ArrowUpRight className="h-4 w-4 stroke-[2]" />
                </button>

                {/* Direct Concierge Line */}
                <a
                  href="tel:09553888432"
                  className="flex items-center justify-center gap-2 py-2 text-xs font-mono text-[#524B43] hover:text-[#D95A1E] transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-[#D95A1E]" />
                  <span>095538 88432</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </header>
    </>
  );
};
