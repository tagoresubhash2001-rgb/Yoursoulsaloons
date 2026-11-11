import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { BannerSlot } from '../components/BannerSlot';
import { ContactSection } from '../components/ContactSection';
import { BANNERS } from '../config/siteContent';

export const ContactPage: React.FC = () => {
  const { mode } = useNavigation();
  const isSalon = mode === 'salon';

  // Slot 4 for Salon, Slot 8 for Academy
  const contactBanner = isSalon ? BANNERS.salon_contact_banner : BANNERS.academy_contact_banner;

  return (
    <div className="w-full">
      {/* 1. CONTACT BANNER (SLOT 4 OR SLOT 8) */}
      <BannerSlot
        banner={contactBanner}
        priority={true}
        ctaText={isSalon ? 'Inquire Via Direct Line' : 'Campus Admissions Hotline'}
        onCtaClick={() => {
          window.location.href = 'tel:09553888432';
        }}
      />

      {/* 2. CONTACT & LOCATION SECTION */}
      <ContactSection mode={mode} />
    </div>
  );
};
