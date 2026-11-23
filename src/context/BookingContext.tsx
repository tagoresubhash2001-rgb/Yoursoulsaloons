import React, { createContext, useCallback, useContext, useMemo, useState, lazy, Suspense } from 'react';
import type { ServiceCategory } from '../utils/whatsapp';

/** What a CTA pre-selects when it opens the booking modal. Omit to ask "Salon Service or Academy Course?" first. */
export type BookingPreset =
  | { kind: 'service'; service?: string; category?: ServiceCategory; note?: string }
  | { kind: 'course'; course?: string; note?: string };

interface BookingContextType {
  openBooking: (preset?: BookingPreset) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const WhatsAppBookingModal = lazy(() =>
  import('../components/WhatsAppBookingModal').then((m) => ({ default: m.WhatsAppBookingModal }))
);

// Warm the modal chunk on first user intent so it opens instantly.
let prefetched = false;
export function prefetchBookingModal() {
  if (prefetched) return;
  prefetched = true;
  void import('../components/WhatsAppBookingModal');
}

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<{ open: boolean; preset?: BookingPreset; key: number }>({ open: false, key: 0 });

  const openBooking = useCallback((preset?: BookingPreset) => {
    setState((s) => ({ open: true, preset, key: s.key + 1 }));
  }, []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);

  const value = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      {state.open && (
        <Suspense fallback={null}>
          <WhatsAppBookingModal key={state.key} preset={state.preset} onClose={close} />
        </Suspense>
      )}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within a BookingProvider');
  return ctx;
};
