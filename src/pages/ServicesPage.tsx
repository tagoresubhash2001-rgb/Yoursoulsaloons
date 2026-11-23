import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { BannerSlot } from '../components/BannerSlot';
import { ServicesListing } from '../components/ServicesListing';
import { AcademyModulesSection } from '../components/AcademyModulesSection';
import { BANNERS, ACADEMY_SYLLABUS_PDF_PATH } from '../config/siteContent';
import { motion } from 'motion/react';
import { ScrollReveal } from '../components/ScrollReveal';

interface ServicesPageProps {
  onOpenBookingModal: (serviceId?: string, courseId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBookingModal }) => {
  const { mode, navigateTo } = useNavigation();
  const isSalon = mode === 'salon';

  // Slot 3 for Salon, Slot 7 for Academy
  const servicesBanner = isSalon ? BANNERS.salon_services_banner : BANNERS.academy_services_banner;

  const handleSelectService = (serviceId: string) => {
    onOpenBookingModal(serviceId, undefined);
  };

  const handleSelectCourse = (courseId: string) => {
    onOpenBookingModal(undefined, courseId);
  };

  return (
    <div className="w-full">
      {/* 1. SERVICES BANNER (SLOT 3 OR SLOT 7) */}
      <BannerSlot
        banner={servicesBanner}
        priority={true}
        ctaText={isSalon ? 'Consultation & Service Guide' : 'View Official Syllabus PDF'}
        onCtaClick={() => {
          if (isSalon) {
            onOpenBookingModal();
          } else {
            window.open(ACADEMY_SYLLABUS_PDF_PATH, '_blank', 'noopener,noreferrer');
          }
        }}
        secondaryCtaText={isSalon ? 'Speak to Concierge' : 'Admissions Inquiries'}
        onSecondaryCtaClick={() => navigateTo('contact')}
      />

      {/* 1B. ACADEMY 4 LEARNING MODES & COMPARISON (Academy Mode Only) */}
      {!isSalon && <AcademyModulesSection showExploreButton={false} photoVariant="services" />}

      {/* 2. SERVICES & COURSES INTERACTIVE LISTING */}
      <ServicesListing
        mode={mode}
        onSelectService={handleSelectService}
        onSelectCourse={handleSelectCourse}
      />

      {/* 3. FOUR SERVICE COMMITMENT CARDS (Additional Cards) */}
      <section className="w-full py-16 sm:py-20 border-t border-surface-2 bg-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-editorial-kicker text-xs text-primary font-semibold">
              {isSalon ? 'The Atelier Protocol' : 'Student Academic Framework'}
            </span>
            <h3 className="mt-2 font-editorial-heading text-3xl sm:text-4xl text-dark">
              {isSalon ? 'Four Diagnostic Commitments' : 'Four Tenets of Practical Training'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-6 rounded-[14px] bg-light card-thick-border border-border shadow-xs hover:border-primary hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono text-primary uppercase tracking-wider font-semibold mb-2">
                  01 · Diagnostic Intake
                </div>
                <h4 className="font-serif text-xl text-dark mb-2">
                  {isSalon ? 'Cranial & Follicular Scan' : 'Aptitude Assessment'}
                </h4>
                <p className="text-xs text-muted font-light leading-relaxed">
                  {isSalon
                    ? '15-minute examination of hair porosity, scalp biome, and bone contours before selecting any treatment formula.'
                    : 'Individual faculty dialogue assessing creative background, career timeline, and dexterity strengths.'}
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-6 rounded-[14px] bg-light card-thick-border border-border shadow-xs hover:border-primary hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono text-accent uppercase tracking-wider font-semibold mb-2">
                  02 · Water Calibration
                </div>
                <h4 className="font-serif text-xl text-dark mb-2">
                  {isSalon ? 'Chelated Mineral Defense' : 'Product Chemistry'}
                </h4>
                <p className="text-xs text-muted font-light leading-relaxed">
                  {isSalon
                    ? 'Filtered and softened basin water to protect bleached hair from heavy local mineral deposits and brassy shifts.'
                    : 'Mastering developer calibration, pH scale balancing, and cuticular lipid science on diverse Indian hair textures.'}
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-6 rounded-[14px] bg-light card-thick-border border-border shadow-xs hover:border-primary hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono text-primary uppercase tracking-wider font-semibold mb-2">
                  03 · Sterile Cleanliness
                </div>
                <h4 className="font-serif text-xl text-dark mb-2">
                  {isSalon ? 'Autoclaved Instruments' : 'Hospital-Grade Hygiene'}
                </h4>
                <p className="text-xs text-muted font-light leading-relaxed">
                  {isSalon
                    ? 'All shears, nail bits, and combs are sanitized in medical-grade autoclaves and unsealed in your direct view.'
                    : '100% adherence to clinical sanitation, cross-contamination prevention, and safety regulatory guidelines.'}
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-6 rounded-[14px] bg-light card-thick-border border-border shadow-xs hover:border-primary hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono text-accent uppercase tracking-wider font-semibold mb-2">
                  04 · Home Prescription
                </div>
                <h4 className="font-serif text-xl text-dark mb-2">
                  {isSalon ? 'Prescribed Regimens' : 'Client Care Consultation'}
                </h4>
                <p className="text-xs text-muted font-light leading-relaxed">
                  {isSalon
                    ? 'Customized aftercare regimen instructions ensuring salon gloss and texture longevity last for weeks at home.'
                    : 'Training future stylists in unhurried client consultation psychology, home prescriptions, and retention ethics.'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. CONSULTATION / DIAGNOSTIC STANDARDS NOTICE */}
      <section className="w-full py-12 border-t border-surface-2 bg-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={16} duration={0.55}>
            <motion.div
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="rounded-[14px] bg-light card-thick-border border-border p-6 sm:p-8 text-center text-xs text-subtle space-y-2 shadow-xs hover:shadow-sm hover:border-dark transition-all cursor-default"
            >
              <p className="font-mono uppercase tracking-wider text-dark font-semibold">
                {isSalon ? 'Service Standards & Consultation Notice' : 'Enrollment & Academic Policy Notice'}
              </p>
              <p className="font-light leading-relaxed max-w-2xl mx-auto text-muted">
                {isSalon
                  ? 'All rituals include our signature botanical clarifying wash and personalized home prescription. Every service is customized to your individual hair density, porosity, and aesthetic goals confirmed during your initial diagnostic dialogue.'
                  : 'Course syllabi, cohort calendars, and kit inclusions are governed by our Academic Board. Practical clinic hours require 100% attendance for accredited certification.'}
              </p>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. BOTTOM ACTION STRIP */}
      <section className="w-full py-16 sm:py-20 border-t border-surface-2 bg-surface-2">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <ScrollReveal direction="up" distance={24} duration={0.65}>
            <h3 className="font-serif text-3xl sm:text-4xl text-dark">
              {isSalon
                ? 'Personalized Consultation Awaits'
                : 'Have Questions About Course Requirements?'}
            </h3>
            <p className="text-sm text-muted max-w-xl mx-auto">
              {isSalon
                ? 'Our front-of-house team will guide you to the specialist best suited to your styling goals.'
                : 'Schedule a 20-minute 1-on-1 advisor call or visit our studio floor in person.'}
            </p>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenBookingModal()}
              className="btn-brand-primary min-h-[44px] mt-2"
            >
              <span>{isSalon ? 'Reserve Your Treatment' : 'Contact Admissions Advisor'}</span>
            </motion.button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
