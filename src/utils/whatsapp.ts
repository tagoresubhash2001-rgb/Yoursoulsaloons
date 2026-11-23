// ============================================================================
// WHATSAPP CLICK-TO-CHAT (wa.me only — no API key, no backend)
// Business number: +91 95538 88432 → 919553888432
//
// ONE helper builds every WhatsApp link on the site:
//   buildWhatsAppLink('service', {...})   → "New Appointment Request" message
//   buildWhatsAppLink('course', {...})    → "New Course Enquiry" message
//   buildWhatsAppLink('franchise', {...}) → "New Franchise Enquiry" message
//   buildWhatsAppLink('chat')             → plain chat, no pre-filled text
// Empty optional fields are left out of the message entirely.
// ============================================================================

export function getBusinessWhatsAppNumber(): string {
  let envNumber: string | undefined;
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    envNumber = import.meta.env.VITE_YOUR_SOUL_WHATSAPP_NUMBER as string | undefined;
  }
  return (envNumber?.trim() || '919553888432').replace(/[^0-9]/g, '');
}

/** Service categories shown to the salon in the message. */
export type ServiceCategory = 'Women' | 'Men' | 'Bridal' | 'Nails' | 'Skin' | 'Hair';

export interface ServiceBookingData {
  service: string;
  category: ServiceCategory;
  name: string;
  phone: string;
  /** Preferred date — ISO yyyy-mm-dd (formatted for the message) or already-readable text */
  date: string;
  /** Preferred time, e.g. "11:00 AM" */
  time: string;
  note?: string;
  /** Booking reference, e.g. "YS-BK-482913" — printed as the LAST line ("Ref: …") */
  ref?: string;
}

export interface CourseEnquiryData {
  course: string;
  name: string;
  phone: string;
  batch?: string;
  note?: string;
}

export interface FranchiseEnquiryData {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  background?: string;
  note?: string;
}

export type WhatsAppMessageType = 'service' | 'course' | 'franchise' | 'chat';

type DataFor<T extends WhatsAppMessageType> = T extends 'service'
  ? ServiceBookingData
  : T extends 'course'
    ? CourseEnquiryData
    : T extends 'franchise'
      ? FranchiseEnquiryData
      : undefined;

/** "Label: value" lines, skipping empty values. */
function lines(title: string, fields: Array<[string, string | undefined]>): string {
  const body = fields
    .map(([label, value]) => [label, value?.trim()] as const)
    .filter(([, value]) => !!value)
    .map(([label, value]) => `${label}: ${value}`);
  return [title, ...body].join('\n');
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2026-12-01" → "Tue, 1 Dec 2026" (locale-independent). Non-ISO input is returned unchanged. */
export function formatReadableDateIST(dateStr: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!m) return dateStr;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const wd = new Date(Date.UTC(y, mo - 1, d)).getUTCDay();
  return `${WEEKDAYS[wd]}, ${d} ${MONTHS[mo - 1]} ${y}`;
}

/** Build the plain-text message (with WhatsApp *bold* title). */
export function buildWhatsAppMessage<T extends WhatsAppMessageType>(type: T, data?: DataFor<T>): string {
  switch (type) {
    case 'service': {
      const d = data as ServiceBookingData;
      return lines('*New Appointment Request – Your Soul Salon*', [
        ['Type', 'Salon Service'],
        ['Service', d.service],
        ['Category', d.category],
        ['Name', d.name],
        ['Phone', d.phone],
        ['Preferred Date', formatReadableDateIST(d.date)],
        ['Preferred Time', d.time],
        ['Note', d.note],
        ['Ref', d.ref],
      ]);
    }
    case 'course': {
      const d = data as CourseEnquiryData;
      return lines('*New Course Enquiry – Your Soul Academy*', [
        ['Type', 'Academy Course'],
        ['Course', d.course],
        ['Name', d.name],
        ['Phone', d.phone],
        ['Preferred Batch / Start', d.batch],
        ['Note', d.note],
      ]);
    }
    case 'franchise': {
      const d = data as FranchiseEnquiryData;
      return lines('*New Franchise Enquiry – Your Soul*', [
        ['Type', 'Franchise / Partnership'],
        ['Name', d.name],
        ['Phone', d.phone],
        ['Email', d.email],
        ['City', d.city],
        ['Background', d.background],
        ['Note', d.note],
      ]);
    }
    default:
      return '';
  }
}

/** The single source of every wa.me link. Text is URI-encoded so line breaks and *bold* survive. */
export function buildWhatsAppLink<T extends WhatsAppMessageType>(type: T, data?: DataFor<T>): string {
  const base = `https://wa.me/${getBusinessWhatsAppNumber()}`;
  const message = buildWhatsAppMessage(type, data);
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** New salon booking reference: "YS-BK-" + 6 digits (same format as bookings saved from the Contact page). */
export function generateBookingRef(): string {
  return `YS-BK-${Math.floor(100000 + Math.random() * 900000)}`;
}

/** Spread onto any <a> that opens WhatsApp: new tab, no opener access. */
export const WHATSAPP_LINK_PROPS = { target: '_blank', rel: 'noopener noreferrer' } as const;

/** Open a link in a new tab. Call synchronously inside a click/submit handler so pop-up blockers allow it. */
export function openWhatsAppLink(url: string): void {
  if (typeof window === 'undefined') return;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/** Strip spaces/dashes/+91/leading 0 → 10 digits, or null if not a valid Indian mobile. */
export function normalizeIndianPhone(phoneStr: string): string | null {
  let clean = phoneStr.replace(/[\s\-+()]/g, '');
  if (/^91[6-9]\d{9}$/.test(clean)) clean = clean.slice(2);
  else if (/^0[6-9]\d{9}$/.test(clean)) clean = clean.slice(1);
  return /^[6-9]\d{9}$/.test(clean) ? clean : null;
}

export function validateIndianPhone(phoneStr: string): boolean {
  return normalizeIndianPhone(phoneStr) !== null;
}
