import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { BannerSlot } from '../components/BannerSlot';
import { EditorialSection } from '../components/EditorialSection';
import { BANNERS, SALON_ABOUT_SECTIONS, ACADEMY_ABOUT_SECTIONS } from '../config/siteContent';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollReveal } from '../components/ScrollReveal';

interface AboutPageProps {
  onOpenBookingModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBookingModal }) => {
  const { mode, navigateTo } = useNavigation();
  const isSalon = mode === 'salon';

  // Slot 2 for Salon, Slot 6 for Academy
  const aboutBanner = isSalon ? BANNERS.salon_about_banner : BANNERS.academy_about_banner;
  const sections = isSalon ? SALON_ABOUT_SECTIONS : ACADEMY_ABOUT_SECTIONS;

  return (
    <div className="w-full">
      {/* 1. ABOUT BANNER (SLOT 2 OR SLOT 6) */}
      <BannerSlot
        banner={aboutBanner}
        priority={true}
        ctaText={isSalon ? 'Consult Our Founders' : 'Meet Our Faculty'}
        onCtaClick={() => (isSalon ? onOpenBookingModal() : navigateTo('contact'))}
        secondaryCtaText={isSalon ? 'Our Services' : 'Our Courses'}
        onSecondaryCtaClick={() => navigateTo('services')}
      />

      {/* 2. EDITORIAL INTRO DUO */}
      <section className="w-full py-16 md:py-24 border-t border-[#E8E1D7] bg-[#FAF8F5]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="up" distance={24} duration={0.65}>
            <span className="font-editorial-kicker text-xs text-[#7D7164]">
              {isSalon ? 'Atelier Story & Principles' : 'Academic Foundation & Pedagogy'}
            </span>
            <h2 className="mt-3 font-editorial-heading text-3xl sm:text-4xl text-[#14171A]">
              {isSalon
                ? 'An architectural philosophy translated into hair and skin health.'
                : 'Bridging the gap between creative impulse and world-class technical execution.'}
            </h2>
            <p className="mt-4 font-editorial-lead text-sm sm:text-base text-[#524B43] max-w-2xl mx-auto">
              {isSalon
                ? 'Discover the four defining pillars of Your Soul Salon: our founders’ vision, our enduring purpose, our technical mission, and our holistic client consultation approach.'
                : 'Explore the four core tenets that shape every student at Your Soul Academy: master educators, visionary standards, rigorous clinic practice, and structured geometric pedagogy.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. FOUR EDITORIAL ALTERNATING SECTIONS (Mandatory alternating compositions) */}
      {/* Section 1: Founders / Trainers (Left) */}
      {/* Section 2: Vision (Right) */}
      {/* Section 3: Mission (Left) */}
      {/* Section 4: Approach / Teaching Approach (Right) */}
      {sections.map((section, idx) => (
        <EditorialSection
          key={section.id}
          section={section}
          isFirst={idx === 0}
        />
      ))}

      {/* 4. THREE CORE PILLARS CARDS (Additional Cards) */}
      <section className="w-full py-16 sm:py-20 border-t border-[#E8E1D7] bg-[#FAF8F5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-editorial-kicker text-xs text-[#E85D1A] font-semibold">
              {isSalon ? 'Our Foundational Principles' : 'Academic Standards & Code'}
            </span>
            <h3 className="mt-2 font-editorial-heading text-3xl sm:text-4xl text-[#14171A]">
              {isSalon ? 'Three Non-Negotiable Standards' : 'Three Pillars of Student Mastery'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-8 rounded-[16px] bg-[#FAF8F5] card-thick-border border-2 border-[#14171A] shadow-xs hover:border-[#E85D1A] hover:shadow-lg transition-all"
            >
              <div className="text-xs font-mono text-[#E85D1A] uppercase tracking-wider font-semibold mb-2">
                01 · Precision Geometry
              </div>
              <h4 className="font-serif text-2xl text-[#14171A] mb-3">
                {isSalon ? 'Bone-Calibrated Sculpting' : 'Anatomical Sectioning'}
              </h4>
              <p className="text-xs sm:text-sm text-[#524B43] font-light leading-relaxed">
                {isSalon
                  ? 'We dissect cranial growth cowlicks dry before applying water, creating haircuts that align naturally with individual movement.'
                  : 'Students learn strict European angles, elevation degrees, and disconnection geometry rather than rote repetitive cutting.'}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-8 rounded-[16px] bg-[#FAF8F5] card-thick-border border-2 border-[#14171A] shadow-xs hover:border-[#E85D1A] hover:shadow-lg transition-all"
            >
              <div className="text-xs font-mono text-[#0E2E54] uppercase tracking-wider font-semibold mb-2">
                02 · Pure Chemistry
              </div>
              <h4 className="font-serif text-2xl text-[#14171A] mb-3">
                {isSalon ? 'Low-Damage Formulations' : 'Bleach & Lipid Science'}
              </h4>
              <p className="text-xs sm:text-sm text-[#524B43] font-light leading-relaxed">
                {isSalon
                  ? 'Zero harsh sulfates, low-ammonia glosses, and bond-building protectors calibrated for regional water hardness.'
                  : 'Deep dive into developer ratios, pH balance, and cuticular lipid integrity before ever touching live client hair.'}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-8 rounded-[16px] bg-[#FAF8F5] card-thick-border border-2 border-[#14171A] shadow-xs hover:border-[#E85D1A] hover:shadow-lg transition-all"
            >
              <div className="text-xs font-mono text-[#E85D1A] uppercase tracking-wider font-semibold mb-2">
                03 · Unhurried Space
              </div>
              <h4 className="font-serif text-2xl text-[#14171A] mb-3">
                {isSalon ? 'Tranquil Acoustic Stillness' : 'Clinic Apprenticeship'}
              </h4>
              <p className="text-xs sm:text-sm text-[#524B43] font-light leading-relaxed">
                {isSalon
                  ? 'Deliberate buffering between appointments guarantees zero rushing, private styling suites, and deep sensory tea rituals.'
                  : 'Small mentor cohorts with real-world public salon hours, consultation psychology, and professional portfolio development.'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. FOUNDER / TRAINER VERIFICATION NOTICE PLATE */}
      <section className="w-full py-12 border-t border-[#E8E1D7] bg-[#F2EDE5]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" distance={16} duration={0.55}>
            <motion.div
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="rounded-[14px] bg-[#FAF8F5] card-thick-border border-2 border-[#14171A] p-6 sm:p-8 text-center text-xs text-[#7D7164] space-y-2 shadow-xs hover:shadow-sm hover:border-[#14171A] transition-all cursor-default"
            >
              <p className="font-mono uppercase tracking-wider text-[#262A30] font-semibold">
                Business Profile &amp; Verification Notice
              </p>
              <p className="font-light leading-relaxed max-w-2xl mx-auto text-[#524B43]">
                Biographies and faculty credentials represent our approved educational structure. Full individual master director profiles and published runway portfolios are accessible during your in-person studio consultation or academy admissions tour.
              </p>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. NEXT STEPS CTA */}
      <section className="w-full py-16 sm:py-24 border-t border-[#E8E1D7] bg-[#EAE3D7]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <ScrollReveal direction="up" distance={25} duration={0.65}>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#14171A]">
              {isSalon
                ? 'Step into the Atelier'
                : 'Begin Your Academy Application'}
            </h3>
            <p className="text-sm sm:text-base text-[#524B43] max-w-xl mx-auto">
              {isSalon
                ? 'Appointments are scheduled with deliberate space between guests to ensure an unhurried, serene sanctuary experience.'
                : 'Class sizes are capped at 8 students per intake to preserve direct, daily master faculty mentorship.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenBookingModal}
                className="btn-brand-primary min-h-[44px]"
              >
                <span>{isSalon ? 'Book a Private Consultation' : 'Schedule Admissions Interview'}</span>
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigateTo('services')}
                className="btn-brand-outline min-h-[44px]"
              >
                <span>{isSalon ? 'Explore Treatments Menu' : 'View Course Syllabi'}</span>
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
