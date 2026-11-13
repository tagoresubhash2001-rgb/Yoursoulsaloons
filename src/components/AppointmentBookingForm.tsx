import React, { useState, useEffect } from 'react';
import {
  HOURLY_APPOINTMENT_SLOTS,
  HourlySlot,
  SALON_SERVICE_OPTIONS,
  getTodayDateIST,
  getDayOfWeekIST,
  formatReadableDateIST,
  isSlotPastCurrentIST,
  reserveAppointmentSlot,
  subscribeToDateReservations,
  buildWhatsAppClickToChatUrl,
  SlotReservationRecord,
  getBusinessWhatsAppNumber
} from '../firebase';
import { SALON_SERVICES } from '../config/siteContent';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AppointmentBookingFormProps {
  preselectedServiceId?: string;
  onBookingSuccess?: (bookingId: string) => void;
}

export const AppointmentBookingForm: React.FC<AppointmentBookingFormProps> = ({
  preselectedServiceId,
  onBookingSuccess,
}) => {
  const todayIST = getTodayDateIST();

  // Form State
  const [selectedServiceId, setSelectedServiceId] = useState<string>('srv-1');
  const [selectedDate, setSelectedDate] = useState<string>(todayIST);
  const [selectedSlot, setSelectedSlot] = useState<HourlySlot | null>(null);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [additionalMessage, setAdditionalMessage] = useState<string>('');

  // Live Slot Availability State from Firestore
  const [reservations, setReservations] = useState<Record<string, SlotReservationRecord>>({});
  const [loadingSlots, setLoadingSlots] = useState<boolean>(true);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [submittedBooking, setSubmittedBooking] = useState<{
    bookingId: string;
    customerName: string;
    customerPhone: string;
    serviceName: string;
    appointmentDate: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    additionalMessage?: string;
  } | null>(null);

  const [copiedText, setCopiedText] = useState<boolean>(false);

  // Sync preselectedServiceId from props or parent context
  useEffect(() => {
    if (preselectedServiceId) {
      // Check if it matches a catalog service or category
      const foundService = SALON_SERVICES.find(
        (s) => s.id === preselectedServiceId || s.category.toLowerCase().includes(preselectedServiceId.toLowerCase())
      );
      if (foundService) {
        setSelectedServiceId(foundService.id);
      } else {
        const foundOption = SALON_SERVICE_OPTIONS.find((o) => o.id === preselectedServiceId);
        if (foundOption) {
          setSelectedServiceId(foundOption.id);
        }
      }
    }
  }, [preselectedServiceId]);

  // Real-time subscription to reservations for the selected date
  useEffect(() => {
    let active = true;
    setLoadingSlots(true);
    // Reset selected slot if changing date
    setSelectedSlot(null);

    const fallbackTimer = window.setTimeout(() => {
      if (active) {
        setLoadingSlots(false);
      }
    }, 6000);

    const unsubscribe = subscribeToDateReservations(
      selectedDate,
      (updatedReservations) => {
        if (!active) return;
        window.clearTimeout(fallbackTimer);
        setReservations(updatedReservations);
        setLoadingSlots(false);
      },
      (err) => {
        if (!active) return;
        window.clearTimeout(fallbackTimer);
        console.warn('Realtime reservation listener fallback:', err);
        setLoadingSlots(false);
      }
    );

    return () => {
      active = false;
      window.clearTimeout(fallbackTimer);
      unsubscribe();
    };
  }, [selectedDate]);

  // Get active service display name
  const getSelectedServiceName = (): string => {
    const catalogItem = SALON_SERVICES.find((s) => s.id === selectedServiceId);
    if (catalogItem) return catalogItem.name;
    const optionItem = SALON_SERVICE_OPTIONS.find((o) => o.id === selectedServiceId);
    if (optionItem) return optionItem.name;
    return 'Bespoke Atelier Treatment';
  };

  // Mobile number validation: Indian 10-digit format
  const validatePhone = (phoneStr: string): boolean => {
    const clean = phoneStr.replace(/[\s\-+]/g, '');
    // Standard 10 digit or 12 digit with 91 prefix
    if (/^[6-9]\d{9}$/.test(clean)) return true;
    if (/^91[6-9]\d{9}$/.test(clean)) return true;
    return false;
  };

  const handleSlotSelect = (slot: HourlySlot) => {
    setErrorMessage('');
    const slotKey = `${selectedDate}_${slot.startMilitary}`;
    const reservation = reservations[slotKey];

    if (reservation && (reservation.status === 'confirmed' || reservation.status === 'pending')) {
      return; // Disabled slot
    }

    if (isSlotPastCurrentIST(selectedDate, slot.startHour24)) {
      return; // Past hour on today
    }

    setSelectedSlot(slot);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Field Validations
    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!customerPhone.trim()) {
      setErrorMessage('Please enter your mobile telephone number.');
      return;
    }
    if (!validatePhone(customerPhone)) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number (e.g., 95538 88432 or +91 9553888432).');
      return;
    }
    if (!selectedDate) {
      setErrorMessage('Please select a valid appointment date.');
      return;
    }
    if (selectedDate < todayIST) {
      setErrorMessage('Past dates cannot be selected. Please choose today or a future date.');
      return;
    }
    if (!selectedSlot) {
      setErrorMessage('Please select one of the 12 hourly appointment slots.');
      return;
    }

    const slotKey = `${selectedDate}_${selectedSlot.startMilitary}`;
    if (isSlotPastCurrentIST(selectedDate, selectedSlot.startHour24)) {
      setErrorMessage('This hourly slot has already passed for today. Please pick a later time or tomorrow.');
      return;
    }

    // Generate reference ID: YS-BK-xxxxxx
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const bookingId = `YS-BK-${randomSuffix}`;
    const dayOfWeek = getDayOfWeekIST(selectedDate);
    const serviceName = getSelectedServiceName();

    setIsSubmitting(true);

    try {
      await reserveAppointmentSlot({
        bookingId,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || undefined,
        serviceId: selectedServiceId,
        serviceName,
        appointmentDate: selectedDate,
        dayOfWeek,
        slotId: selectedSlot.slotId,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        slotKey,
        timezone: 'Asia/Kolkata',
        additionalMessage: additionalMessage.trim() || undefined,
        bookingStatus: 'pending',
      });

      const bookingDetails = {
        bookingId,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        serviceName,
        appointmentDate: selectedDate,
        dayOfWeek,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        additionalMessage: additionalMessage.trim() || undefined,
      };

      setSubmittedBooking(bookingDetails);
      if (onBookingSuccess) {
        onBookingSuccess(bookingId);
      }

      // Automatically launch WhatsApp click-to-chat with prefilled text
      const { url } = buildWhatsAppClickToChatUrl(bookingDetails);
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes('no longer available')) {
        setErrorMessage('This appointment slot is no longer available. Please select another time.');
      } else {
        setErrorMessage(
          err instanceof Error
            ? err.message
            : 'Could not reserve appointment slot. Please verify your connection and try again.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyWhatsAppMessage = () => {
    if (!submittedBooking) return;
    const { rawMessage } = buildWhatsAppClickToChatUrl(submittedBooking);
    navigator.clipboard.writeText(rawMessage);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 3000);
  };

  const handleResetForm = () => {
    setSubmittedBooking(null);
    setSelectedSlot(null);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setAdditionalMessage('');
    setErrorMessage('');
  };

  // If successfully submitted, render the comprehensive Pending Confirmation screen
  if (submittedBooking) {
    const { url, businessNumber } = buildWhatsAppClickToChatUrl(submittedBooking);

    return (
      <div className="rounded-[18px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] p-6 sm:p-10 text-[#14171A] shadow-lg space-y-6">
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAE2D7] text-[#0E2E54]">
            <CheckCircle2 className="h-9 w-9 text-[#E85D1A] stroke-[1.8]" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] border border-[#F59E0B] text-xs font-mono font-semibold text-[#92400E]">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
            <span>STATUS: PENDING CONFIRMATION</span>
          </div>

          <h3 className="font-editorial-heading text-2xl sm:text-3xl text-[#14171A]">
            Appointment Request Submitted
          </h3>

          <p className="font-editorial-lead text-xs sm:text-sm text-[#524B43] max-w-lg mx-auto leading-relaxed">
            Your appointment request has been submitted successfully. Please send the prefilled WhatsApp message to YOUR SOUL so our concierge team can review and confirm your selected slot.
          </p>
        </div>

        {/* Booking Summary Plate */}
        <div className="rounded-[14px] card-thick-border border-2 border-[#14171A] bg-[#F2EDE5] p-5 sm:p-6 space-y-3 text-xs">
          <div className="flex justify-between items-center pb-3 border-b border-[#D6CBBF]">
            <span className="font-mono text-[#7D7164] uppercase tracking-wider">Booking Reference</span>
            <span className="font-mono font-bold text-sm text-[#0E2E54]">{submittedBooking.bookingId}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <span className="text-[#7D7164] block font-mono text-[10px] uppercase">Client Name</span>
              <span className="font-semibold text-sm text-[#14171A]">{submittedBooking.customerName}</span>
            </div>
            <div>
              <span className="text-[#7D7164] block font-mono text-[10px] uppercase">Registered Mobile</span>
              <span className="font-mono font-semibold text-sm text-[#14171A]">{submittedBooking.customerPhone}</span>
            </div>
            <div>
              <span className="text-[#7D7164] block font-mono text-[10px] uppercase">Selected Service</span>
              <span className="font-semibold text-sm text-[#14171A]">{submittedBooking.serviceName}</span>
            </div>
            <div>
              <span className="text-[#7D7164] block font-mono text-[10px] uppercase">Date &amp; Time (IST)</span>
              <span className="font-semibold text-sm text-[#E85D1A]">
                {submittedBooking.dayOfWeek}, {submittedBooking.appointmentDate}
                <span className="block font-mono text-xs text-[#14171A]">
                  {submittedBooking.startTime} – {submittedBooking.endTime}
                </span>
              </span>
            </div>
          </div>

          {submittedBooking.additionalMessage && (
            <div className="pt-2 border-t border-[#D6CBBF]">
              <span className="text-[#7D7164] block font-mono text-[10px] uppercase">Client Note</span>
              <span className="text-xs text-[#524B43] italic">{submittedBooking.additionalMessage}</span>
            </div>
          )}
        </div>

        {/* WhatsApp Transmission Banner */}
        <div className="p-4 rounded-[12px] bg-[#E8F5E9] border border-[#A5D6A7] text-xs text-[#2E7D32] space-y-2">
          <div className="flex items-center gap-2 font-semibold">
            <MessageCircle className="h-4 w-4 text-[#2E7D32]" />
            <span>Next Step: Send Prefilled WhatsApp Message</span>
          </div>
          <p className="text-[11px] text-[#1B5E20] leading-relaxed">
            WhatsApp click-to-chat opens with your prefilled appointment details directed to the verified salon desk (<span className="font-mono font-bold">+{businessNumber}</span>). Simply tap <strong className="font-semibold">Send</strong> in WhatsApp.
          </p>
        </div>

        {/* Actions Strip */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand-primary min-h-[48px] flex-1 justify-center text-sm shadow-md"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Open WhatsApp to Confirm</span>
          </a>

          <button
            type="button"
            onClick={handleCopyWhatsAppMessage}
            className="btn-brand-outline min-h-[48px] px-5 text-xs justify-center"
          >
            {copiedText ? (
              <>
                <Check className="h-4 w-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Details Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-[#14171A]" />
                <span>Copy Message Details</span>
              </>
            )}
          </button>
        </div>

        <div className="pt-4 text-center border-t border-[#EAE1D5]">
          <button
            type="button"
            onClick={handleResetForm}
            className="text-xs text-[#7D7164] hover:text-[#14171A] underline underline-offset-4 cursor-pointer"
          >
            Make Another Appointment Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      id="appointment-booking"
      className="rounded-[18px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] p-6 sm:p-10 text-[#14171A] shadow-md scroll-mt-24"
    >
      {/* Form Header */}
      <div className="mb-8 border-b border-[#EAE1D5] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#E85D1A] mb-1 font-semibold">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Central Reservation Atelier</span>
        </div>
        <h3 className="font-editorial-heading text-2xl sm:text-3xl text-[#14171A]">
          Reserve Your Appointment
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-[#524B43] leading-relaxed">
          Open 7 days a week (09:00 AM – 09:00 PM IST). 12 hourly slots available daily with real-time reservation protection.
        </p>
      </div>

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-[10px] bg-red-50 border border-red-300 text-xs text-red-900 flex items-start gap-2.5 shadow-xs"
        >
          <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{errorMessage}</div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* A. SELECT SERVICE */}
        <div>
          <label htmlFor="booking-service" className="block text-xs font-mono uppercase tracking-wider text-[#14171A] mb-1.5 font-semibold">
            1. Select Service or Treatment <span className="text-[#E85D1A]">*</span>
          </label>
          <div className="relative">
            <select
              id="booking-service"
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full rounded-[10px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] px-4 py-3 text-sm text-[#14171A] focus:outline-hidden focus:border-[#E85D1A] min-h-[46px] cursor-pointer"
            >
              <optgroup label="── Haute Atelier Menu (Catalog) ──">
                {SALON_SERVICES.map((srv) => (
                  <option key={srv.id} value={srv.id}>
                    {srv.name} ({srv.duration})
                  </option>
                ))}
              </optgroup>
              <optgroup label="── Service Categories ──">
                {SALON_SERVICE_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name} — {opt.group}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
          <p className="mt-1 text-[11px] text-[#7D7164]">
            Every treatment includes unhurried texture intake and filtered water rinse.
          </p>
        </div>

        {/* B. SELECT APPOINTMENT DATE */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="booking-date" className="block text-xs font-mono uppercase tracking-wider text-[#14171A] font-semibold">
              2. Select Appointment Date (All 7 Days Open) <span className="text-[#E85D1A]">*</span>
            </label>
            <span className="text-[11px] font-mono text-[#0E2E54] font-medium">
              {formatReadableDateIST(selectedDate)}
            </span>
          </div>

          <div className="relative flex items-center">
            <input
              id="booking-date"
              type="date"
              min={todayIST}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-[10px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] px-4 py-3 text-sm text-[#14171A] focus:outline-hidden focus:border-[#E85D1A] min-h-[46px] font-mono cursor-pointer"
            />
          </div>
          <div className="mt-1 flex items-center gap-2 text-[11px] text-[#7D7164]">
            <Calendar className="h-3 w-3 text-[#E85D1A]" />
            <span>Salon opens Mon–Sun: 09:00 AM – 09:00 PM IST (Asia/Kolkata).</span>
          </div>
        </div>

        {/* C. SELECT APPOINTMENT TIME (12 HOURLY SLOTS) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#14171A] font-semibold">
              3. Select Hourly Time Slot (12 Slots Daily) <span className="text-[#E85D1A]">*</span>
            </label>
            {selectedSlot && (
              <span className="text-xs font-mono font-bold text-[#E85D1A] bg-[#EAE2D7] px-2 py-0.5 rounded-[6px]">
                {selectedSlot.startTime} – {selectedSlot.endTime}
              </span>
            )}
          </div>

          {loadingSlots ? (
            <div className="py-8 text-center text-xs font-mono text-[#7D7164] flex items-center justify-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full border-2 border-[#E85D1A] border-t-transparent animate-spin" />
              <span>Verifying live slot availability for {selectedDate}...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {HOURLY_APPOINTMENT_SLOTS.map((slot) => {
                const slotKey = `${selectedDate}_${slot.startMilitary}`;
                const reservation = reservations[slotKey];
                const isBooked = Boolean(
                  reservation && (reservation.status === 'confirmed' || reservation.status === 'pending')
                );
                const isPast = isSlotPastCurrentIST(selectedDate, slot.startHour24);
                const isSelected = selectedSlot?.slotId === slot.slotId;

                let cardClasses =
                  'relative p-3 rounded-[10px] card-thick-border border-2 text-left transition-all duration-200 select-none min-h-[58px] flex flex-col justify-between ';

                if (isBooked) {
                  cardClasses +=
                    'bg-[#EAE4DC] border-[#B8ADA0] text-[#8C8072] cursor-not-allowed opacity-75';
                } else if (isPast) {
                  cardClasses +=
                    'bg-[#EFEAE2] border-[#CFC5B8] text-[#9C8F80] cursor-not-allowed opacity-60';
                } else if (isSelected) {
                  cardClasses +=
                    'bg-[#E85D1A] border-[#14171A] text-white shadow-md scale-[1.02] ring-2 ring-[#E85D1A]';
                } else {
                  cardClasses +=
                    'bg-[#FAF8F5] border-[#14171A] text-[#14171A] hover:border-[#E85D1A] hover:bg-[#F2EDE5] cursor-pointer shadow-2xs';
                }

                return (
                  <button
                    key={slot.slotId}
                    type="button"
                    disabled={isBooked || isPast}
                    onClick={() => handleSlotSelect(slot)}
                    className={cardClasses}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className={isSelected ? 'text-white/80' : 'text-[#7D7164]'}>
                        Slot {slot.slotNumber}
                      </span>
                      {isBooked ? (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-red-700 bg-red-100 px-1 rounded-xs">
                          Booked
                        </span>
                      ) : isPast ? (
                        <span className="text-[9px] uppercase tracking-wider text-[#7D7164]">
                          Passed
                        </span>
                      ) : isSelected ? (
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      ) : (
                        <span className="text-[9px] uppercase tracking-wider text-emerald-700 font-semibold">
                          Open
                        </span>
                      )}
                    </div>

                    <div className="mt-1 font-mono text-xs font-semibold leading-tight">
                      <div>{slot.startTime}</div>
                      <div className="text-[10px] font-normal opacity-90">to {slot.endTime}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Slot Legend */}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] font-mono text-[#7D7164] pt-2 border-t border-[#EAE1D5]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-[3px] bg-[#FAF8F5] card-thick-border border-2 border-[#14171A]" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-[3px] bg-[#E85D1A] card-thick-border border-2 border-[#14171A]" />
              <span className="text-[#14171A] font-semibold">Selected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-[3px] bg-[#EAE4DC] border border-[#B8ADA0]" />
              <span>Reserved / Unavailable</span>
            </div>
          </div>
        </div>

        {/* D. CUSTOMER DETAILS */}
        <div className="pt-2 border-t border-[#EAE1D5] space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-[#14171A] font-semibold">
            4. Customer Contact Information
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="customer-name" className="block text-xs font-medium uppercase tracking-wider text-[#3E3832] mb-1">
              Full Name <span className="text-[#E85D1A]">*</span>
            </label>
            <div className="relative">
              <input
                id="customer-name"
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Subhash Tagore"
                className="w-full rounded-[10px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#14171A] focus:outline-hidden focus:border-[#E85D1A] min-h-[44px]"
              />
            </div>
          </div>

          {/* Phone and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="customer-phone" className="block text-xs font-medium uppercase tracking-wider text-[#3E3832] mb-1">
                Indian Mobile Number <span className="text-[#E85D1A]">*</span>
              </label>
              <div className="relative">
                <input
                  id="customer-phone"
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="095538 88432"
                  className="w-full rounded-[10px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#14171A] focus:outline-hidden focus:border-[#E85D1A] min-h-[44px] font-mono"
                />
              </div>
              <span className="mt-1 block text-[10px] text-[#7D7164]">
                Direct line for WhatsApp reservation confirmation.
              </span>
            </div>

            <div>
              <label htmlFor="customer-email" className="block text-xs font-medium uppercase tracking-wider text-[#3E3832] mb-1">
                Email Address <span className="text-[#7D7164] font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  id="customer-email"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="tagoresubhash2001@gmail.com"
                  className="w-full rounded-[10px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#14171A] focus:outline-hidden focus:border-[#E85D1A] min-h-[44px]"
                />
              </div>
              <span className="mt-1 block text-[10px] text-[#7D7164]">
                For digital receipt and appointment calendar sync.
              </span>
            </div>
          </div>

          {/* Additional Message */}
          <div>
            <label htmlFor="customer-notes" className="block text-xs font-medium uppercase tracking-wider text-[#3E3832] mb-1">
              Additional Details / Requests <span className="text-[#7D7164] font-normal">(Optional)</span>
            </label>
            <textarea
              id="customer-notes"
              rows={3}
              value={additionalMessage}
              onChange={(e) => setAdditionalMessage(e.target.value)}
              placeholder="Allergies, prior hair processing, specific requested stylist, or event date..."
              className="w-full rounded-[10px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#14171A] focus:outline-hidden focus:border-[#E85D1A] resize-none min-h-[72px]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="btn-brand-primary w-full min-h-[50px] text-sm sm:text-base justify-center shadow-md cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Reserving Atomic Slot...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>Submit Appointment Request &amp; Open WhatsApp</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </motion.button>

          <p className="mt-2 text-center text-[11px] text-[#7D7164]">
            Atomically locks your requested hour in Firestore and opens official WhatsApp confirmation.
          </p>
        </div>
      </form>
    </div>
  );
};
