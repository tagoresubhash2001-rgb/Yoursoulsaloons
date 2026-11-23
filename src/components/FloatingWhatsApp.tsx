import React, { memo } from 'react';
import { useBooking, prefetchBookingModal } from '../context/BookingContext';
import { WhatsAppIcon } from './WhatsAppIcon';

/** Brand-styled floating WhatsApp button, bottom-right on every page. Opens the booking form (Service or Course). */
export const FloatingWhatsApp: React.FC = memo(() => {
  const { openBooking } = useBooking();

  return (
    <button
      type="button"
      onClick={() => openBooking()}
      onPointerEnter={prefetchBookingModal}
      onFocus={prefetchBookingModal}
      aria-label="Book or enquire on WhatsApp"
      title="Book or enquire on WhatsApp"
      className="group fixed z-40 right-4 sm:right-6 bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-6 flex items-center gap-2 rounded-full bg-primary text-light shadow-[0_10px_28px_-6px_color-mix(in_srgb,var(--color-primary)_60%,transparent)] pl-4 pr-4 sm:pr-5 h-14 min-w-14 justify-center wa-pulse cursor-pointer transition-[background-color,transform] duration-250 ease-out hover:bg-primary-hover hover:-translate-y-0.5 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <WhatsAppIcon className="h-6 w-6 shrink-0" />
      <span className="hidden sm:inline text-xs font-semibold uppercase tracking-[0.08em]">Book on WhatsApp</span>
    </button>
  );
});

FloatingWhatsApp.displayName = 'FloatingWhatsApp';
