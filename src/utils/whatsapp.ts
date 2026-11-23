// ============================================================================
// OFFICIAL WHATSAPP CLICK-TO-CHAT UTILITIES (wa.me ONLY — NO PAID APIs)
// Verified Business Number: +91 9553888432 (919553888432)
// ============================================================================

export function getBusinessWhatsAppNumber(): string {
  let envNumber: string | undefined;
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    envNumber = import.meta.env.VITE_YOUR_SOUL_WHATSAPP_NUMBER as string | undefined;
  } else if (typeof process !== 'undefined' && process.env) {
    envNumber = process.env.VITE_YOUR_SOUL_WHATSAPP_NUMBER;
  }
  return (envNumber?.trim() || '919553888432').replace(/[^0-9]/g, '');
}

// ----------------------------------------------------------------------------
// CORE HELPERS — every WhatsApp link on the site is built through these.
// ----------------------------------------------------------------------------

/** Build a wa.me click-to-chat URL with an optional pre-filled message. */
export function buildWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${getBusinessWhatsAppNumber()}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Spread onto any <a> that opens WhatsApp: new tab, no opener access. */
export const WHATSAPP_LINK_PROPS = { target: '_blank', rel: 'noopener noreferrer' } as const;

/** "Hi Your Soul, I'd like to book: <Service> (<Category>). Please share available slots." */
export function buildBookingMessage(serviceName?: string, category?: string): string {
  if (!serviceName) {
    return "Hi Your Soul, I'd like to book an appointment. Please share available slots.";
  }
  const cat = category && category !== serviceName ? ` (${category})` : '';
  return `Hi Your Soul, I'd like to book: ${serviceName}${cat}. Please share available slots.`;
}

export function buildBookingLink(serviceName?: string, category?: string): string {
  return buildWhatsAppLink(buildBookingMessage(serviceName, category));
}

/** Academy course / admissions enquiry message. */
export function buildCourseEnquiryMessage(courseName?: string, discipline?: string): string {
  if (!courseName) {
    return "Hi Your Soul Academy, I'd like to enquire about your courses. Please share upcoming batch dates and admission details.";
  }
  const d = discipline ? ` (${discipline})` : '';
  return `Hi Your Soul Academy, I'd like to enquire about: ${courseName}${d}. Please share upcoming batch dates and admission details.`;
}

export function buildCourseEnquiryLink(courseName?: string, discipline?: string): string {
  return buildWhatsAppLink(buildCourseEnquiryMessage(courseName, discipline));
}

/** Open WhatsApp in a new tab. Call synchronously inside a click/submit handler so pop-up blockers allow it. */
export function openWhatsApp(message?: string): void {
  if (typeof window === 'undefined') return;
  window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
}

export function validateIndianPhone(phoneStr: string): boolean {
  const clean = phoneStr.replace(/[\s\-+()]/g, '');
  if (/^[6-9]\d{9}$/.test(clean)) return true;
  if (/^91[6-9]\d{9}$/.test(clean)) return true;
  if (/^0[6-9]\d{9}$/.test(clean)) return true;
  return false;
}

export function formatReadableDateIST(dateStr: string): string {
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
    return date.toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export interface WhatsAppPayloadResult {
  url: string;
  rawMessage: string;
  businessNumber: string;
}

// A. ACADEMY ENQUIRY WHATSAPP MESSAGE
export interface AcademyEnquiryPayload {
  customerName: string;
  customerPhone: string;
  learningMode: string;
  courseName: string;
  enquiryDetails?: string;
}

export function buildAcademyEnquiryWhatsAppUrl(
  enquiry: AcademyEnquiryPayload
): WhatsAppPayloadResult {
  const businessNumber = getBusinessWhatsAppNumber();
  const details = enquiry.enquiryDetails?.trim() || 'Requesting batch schedule, curriculum details, and seat availability.';

  const rawMessage =
    `YOUR SOUL ACADEMY — COURSE ENQUIRY\n\n` +
    `Hello YOUR SOUL Academy Admissions Team,\n\n` +
    `I would like to enquire and reserve a seat for an Academy program.\n\n` +
    `STUDENT DETAILS\n` +
    `Customer Name: ${enquiry.customerName.trim()}\n` +
    `Phone Number: ${enquiry.customerPhone.trim()}\n\n` +
    `PROGRAM SELECTION\n` +
    `Selected Learning Mode: ${enquiry.learningMode}\n` +
    `Course / Track Name: ${enquiry.courseName}\n\n` +
    `Enquiry Details: ${details}\n\n` +
    `Please share upcoming batch dates, eligibility guidance, and fee structure.\n\n` +
    `Thank you.\n` +
    `YOUR SOUL Academy Applicant`;

  const url = buildWhatsAppLink(rawMessage);
  return { url, rawMessage, businessNumber };
}

// B. SALON SERVICE ENQUIRY WHATSAPP MESSAGE
export interface ServiceEnquiryPayload {
  serviceName: string;
  category?: string;
  customerName?: string;
  customerPhone?: string;
  notes?: string;
}

export function buildServiceEnquiryWhatsAppUrl(
  enquiry: ServiceEnquiryPayload
): WhatsAppPayloadResult {
  const businessNumber = getBusinessWhatsAppNumber();
  const customerLines =
    enquiry.customerName || enquiry.customerPhone
      ? `\nCUSTOMER DETAILS\n` +
        (enquiry.customerName ? `Name: ${enquiry.customerName.trim()}\n` : '') +
        (enquiry.customerPhone ? `Phone: ${enquiry.customerPhone.trim()}\n` : '')
      : '';
  const extraNotes = enquiry.notes?.trim()
    ? `\nAdditional Notes: ${enquiry.notes.trim()}\n`
    : '';

  const rawMessage =
    `YOUR SOUL SALON — SERVICE ENQUIRY\n\n` +
    `Hello YOUR SOUL Salon Concierge,\n\n` +
    `I would like to enquire about the following salon service:\n\n` +
    `Selected Service: ${enquiry.serviceName}\n` +
    (enquiry.category ? `Category: ${enquiry.category}\n` : '') +
    customerLines +
    extraNotes +
    `\nPlease share consultation availability and treatment details.\n\n` +
    `Thank you.`;

  const url = buildWhatsAppLink(rawMessage);
  return { url, rawMessage, businessNumber };
}

// C. APPOINTMENT BOOKING WHATSAPP MESSAGE
export interface AppointmentWhatsAppPayload {
  customerName: string;
  customerPhone: string;
  serviceName: string;
  appointmentDate: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  additionalMessage?: string;
  bookingId: string;
}

export function buildWhatsAppAppointmentMessage(booking: AppointmentWhatsAppPayload): string {
  const msgNote = booking.additionalMessage?.trim() || 'None provided';
  const formattedDate = formatReadableDateIST(booking.appointmentDate);

  return (
    `YOUR SOUL — NEW APPOINTMENT REQUEST\n\n` +
    `Hello YOUR SOUL Team,\n\n` +
    `I would like to request an appointment.\n\n` +
    `CUSTOMER DETAILS\n\n` +
    `Customer Name: ${booking.customerName}\n` +
    `Phone Number: ${booking.customerPhone}\n\n` +
    `APPOINTMENT DETAILS\n\n` +
    `Selected Service: ${booking.serviceName}\n` +
    `Appointment Date: ${formattedDate} (${booking.appointmentDate})\n` +
    `Day: ${booking.dayOfWeek}\n` +
    `Selected Time Slot: ${booking.startTime} – ${booking.endTime} IST\n\n` +
    `Additional Details: ${msgNote}\n\n` +
    `Booking Reference: ${booking.bookingId}\n\n` +
    `Status: PENDING CONFIRMATION\n\n` +
    `Please check availability and confirm my appointment.\n\n` +
    `Thank you.\n` +
    `YOUR SOUL Customer`
  );
}

export function buildWhatsAppClickToChatUrl(
  booking: AppointmentWhatsAppPayload
): WhatsAppPayloadResult {
  const businessNumber = getBusinessWhatsAppNumber();
  const rawMessage = buildWhatsAppAppointmentMessage(booking);
  const url = buildWhatsAppLink(rawMessage);
  return { url, rawMessage, businessNumber };
}
