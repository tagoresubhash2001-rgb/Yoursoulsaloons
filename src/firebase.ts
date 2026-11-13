import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  Firestore,
  initializeFirestore,
  getFirestore,
  doc,
  getDocFromServer,
  runTransaction,
  collection,
  query,
  where,
  getDocs,
  onSnapshot
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// 1. Initialize Firebase and Firestore Enterprise instance
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

function createFirestoreInstance(): Firestore {
  if (typeof window !== 'undefined') {
    try {
      return initializeFirestore(
        app,
        {
          experimentalForceLongPolling: true,
          ignoreUndefinedProperties: true,
        },
        firebaseConfig.firestoreDatabaseId
      );
    } catch {
      return getFirestore(app, firebaseConfig.firestoreDatabaseId);
    }
  }
  return getFirestore(app, firebaseConfig.firestoreDatabaseId);
}

export const db = createFirestoreInstance();
export const auth = getAuth(app);

// 2. Validate Connection to Firestore on initial boot
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'slot_reservations', 'connection_probe'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore offline notice:', error.message);
    }
    return false;
  }
}

// 3. Hardened Error Handling conforming to Firebase Integration Skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// 4. Exact 12 Hourly Slots (09:00 AM to 09:00 PM IST)
export interface HourlySlot {
  slotId: string; // 'slot-01' to 'slot-12'
  slotNumber: string; // '01' to '12'
  startTime: string; // '09:00 AM'
  endTime: string; // '10:00 AM'
  startHour24: number; // 9 to 20
  startMilitary: string; // '09:00' to '20:00'
  label: string; // '09:00 AM – 10:00 AM'
}

export const HOURLY_APPOINTMENT_SLOTS: HourlySlot[] = [
  { slotId: 'slot-01', slotNumber: '01', startTime: '09:00 AM', endTime: '10:00 AM', startHour24: 9, startMilitary: '09:00', label: '09:00 AM – 10:00 AM' },
  { slotId: 'slot-02', slotNumber: '02', startTime: '10:00 AM', endTime: '11:00 AM', startHour24: 10, startMilitary: '10:00', label: '10:00 AM – 11:00 AM' },
  { slotId: 'slot-03', slotNumber: '03', startTime: '11:00 AM', endTime: '12:00 PM', startHour24: 11, startMilitary: '11:00', label: '11:00 AM – 12:00 PM' },
  { slotId: 'slot-04', slotNumber: '04', startTime: '12:00 PM', endTime: '01:00 PM', startHour24: 12, startMilitary: '12:00', label: '12:00 PM – 01:00 PM' },
  { slotId: 'slot-05', slotNumber: '05', startTime: '01:00 PM', endTime: '02:00 PM', startHour24: 13, startMilitary: '13:00', label: '01:00 PM – 02:00 PM' },
  { slotId: 'slot-06', slotNumber: '06', startTime: '02:00 PM', endTime: '03:00 PM', startHour24: 14, startMilitary: '14:00', label: '02:00 PM – 03:00 PM' },
  { slotId: 'slot-07', slotNumber: '07', startTime: '03:00 PM', endTime: '04:00 PM', startHour24: 15, startMilitary: '15:00', label: '03:00 PM – 04:00 PM' },
  { slotId: 'slot-08', slotNumber: '08', startTime: '04:00 PM', endTime: '05:00 PM', startHour24: 16, startMilitary: '16:00', label: '04:00 PM – 05:00 PM' },
  { slotId: 'slot-09', slotNumber: '09', startTime: '05:00 PM', endTime: '06:00 PM', startHour24: 17, startMilitary: '17:00', label: '05:00 PM – 06:00 PM' },
  { slotId: 'slot-10', slotNumber: '10', startTime: '06:00 PM', endTime: '07:00 PM', startHour24: 18, startMilitary: '18:00', label: '06:00 PM – 07:00 PM' },
  { slotId: 'slot-11', slotNumber: '11', startTime: '07:00 PM', endTime: '08:00 PM', startHour24: 19, startMilitary: '19:00', label: '07:00 PM – 08:00 PM' },
  { slotId: 'slot-12', slotNumber: '12', startTime: '08:00 PM', endTime: '09:00 PM', startHour24: 20, startMilitary: '20:00', label: '08:00 PM – 09:00 PM' },
];

export const SALON_SERVICE_OPTIONS = [
  { id: 'cat-styling', name: 'Hair Styling & Haircuts', group: 'Hair Artistry' },
  { id: 'cat-colouring', name: 'Hair Colouring & Highlights', group: 'Hair Artistry' },
  { id: 'cat-bridal', name: 'Bridal Makeup', group: 'Occasion & Runway' },
  { id: 'cat-extensions', name: 'Hair Extensions', group: 'Hair Artistry' },
  { id: 'cat-nails', name: 'Nail Care & Nail Art', group: 'Atelier Nail Lounge' },
  { id: 'cat-skin', name: 'Skin Care & Beauty Treatments', group: 'Dermal Sanctuary' },
  { id: 'cat-consultation', name: 'Other / General Consultation', group: 'Diagnostic Intake' },
];

// 5. IST Date Helpers
export function getTodayDateIST(): string {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(now); // "YYYY-MM-DD"
}

export function getDayOfWeekIST(dateStr: string): string {
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
    return date.toLocaleDateString('en-IN', { weekday: 'long', timeZone: 'Asia/Kolkata' });
  } catch {
    return 'Monday';
  }
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

export function isSlotPastCurrentIST(dateStr: string, startHour24: number): boolean {
  const todayIST = getTodayDateIST();
  if (dateStr < todayIST) return true;
  if (dateStr > todayIST) return false;

  // On current day in IST, check hour
  const now = new Date();
  const hourStr = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    hour12: false,
  }).format(now);
  const currentHour = parseInt(hourStr, 10);
  return currentHour >= startHour24;
}

// 6. Data interfaces
export interface AppointmentBookingRequest {
  bookingId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  serviceId: string;
  serviceName: string;
  appointmentDate: string; // YYYY-MM-DD
  dayOfWeek: string;
  slotId: string;
  startTime: string;
  endTime: string;
  slotKey: string; // e.g. "2026-11-12_09:00"
  timezone: string; // "Asia/Kolkata"
  additionalMessage?: string;
  bookingStatus: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface SlotReservationRecord {
  slotKey: string;
  bookingId: string;
  appointmentDate: string;
  slotId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  customerPhone: string;
  createdAt: string;
}

export type SlotStatus = 'available' | 'selected' | 'pending' | 'unavailable' | 'past';

// 7. Atomic Transaction Slot Reservation
export async function reserveAppointmentSlot(
  data: Omit<AppointmentBookingRequest, 'createdAt'>
): Promise<{ success: boolean; bookingId: string }> {
  const { slotKey, bookingId } = data;
  const reservationRef = doc(db, 'slot_reservations', slotKey);
  const appointmentRef = doc(db, 'appointments', bookingId);
  const nowIso = new Date().toISOString();

  try {
    await runTransaction(db, async (transaction) => {
      // 1. Read existing reservation lock
      const existingDoc = await transaction.get(reservationRef);
      if (existingDoc.exists()) {
        const existingData = existingDoc.data() as SlotReservationRecord;
        if (existingData.status === 'pending' || existingData.status === 'confirmed') {
          throw new Error('This appointment slot is no longer available. Please select another time.');
        }
      }

      // 2. Write atomic slot reservation document
      const reservationPayload: SlotReservationRecord = {
        slotKey: data.slotKey,
        bookingId: data.bookingId,
        appointmentDate: data.appointmentDate,
        slotId: data.slotId,
        status: 'pending',
        customerPhone: data.customerPhone,
        createdAt: nowIso,
      };

      // 3. Write customer appointment document (omit undefined optional fields)
      const appointmentPayload: AppointmentBookingRequest = {
        bookingId: data.bookingId,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        serviceId: data.serviceId,
        serviceName: data.serviceName,
        appointmentDate: data.appointmentDate,
        dayOfWeek: data.dayOfWeek,
        slotId: data.slotId,
        startTime: data.startTime,
        endTime: data.endTime,
        slotKey: data.slotKey,
        timezone: data.timezone,
        bookingStatus: data.bookingStatus,
        createdAt: nowIso,
      };
      if (data.customerEmail) {
        appointmentPayload.customerEmail = data.customerEmail;
      }
      if (data.additionalMessage) {
        appointmentPayload.additionalMessage = data.additionalMessage;
      }

      transaction.set(reservationRef, reservationPayload);
      transaction.set(appointmentRef, appointmentPayload);
    });

    return { success: true, bookingId };
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes('no longer available')) {
      throw err;
    }
    handleFirestoreError(err, OperationType.WRITE, `slot_reservations/${slotKey}`);
  }
}

// 8. Fetch real-time reservations for a given date
export async function fetchDateSlotReservations(
  dateStr: string
): Promise<Record<string, SlotReservationRecord>> {
  const path = 'slot_reservations';
  try {
    const q = query(collection(db, path), where('appointmentDate', '==', dateStr));
    const snapshot = await getDocs(q);
    const result: Record<string, SlotReservationRecord> = {};
    snapshot.forEach((docSnap) => {
      const item = docSnap.data() as SlotReservationRecord;
      result[item.slotKey] = item;
    });
    return result;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

// 9. Subscribe to real-time reservations for a date
export function subscribeToDateReservations(
  dateStr: string,
  onUpdate: (reservations: Record<string, SlotReservationRecord>) => void,
  onError?: (err: Error) => void
): () => void {
  const path = 'slot_reservations';
  const q = query(collection(db, path), where('appointmentDate', '==', dateStr));

  return onSnapshot(
    q,
    (snapshot) => {
      const result: Record<string, SlotReservationRecord> = {};
      snapshot.forEach((docSnap) => {
        const item = docSnap.data() as SlotReservationRecord;
        result[item.slotKey] = item;
      });
      onUpdate(result);
    },
    (error) => {
      if (onError) {
        onError(error);
      } else {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    }
  );
}

// 10. WhatsApp Integration & Message Generator
export function getBusinessWhatsAppNumber(): string {
  let envNumber: string | undefined;
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    envNumber = import.meta.env.VITE_YOUR_SOUL_WHATSAPP_NUMBER as string | undefined;
  } else if (typeof process !== 'undefined' && process.env) {
    envNumber = process.env.VITE_YOUR_SOUL_WHATSAPP_NUMBER;
  }
  const sanitized = (envNumber?.trim() || '919553888432').replace(/[^0-9]/g, '');
  return sanitized;
}

export function buildWhatsAppAppointmentMessage(booking: {
  customerName: string;
  customerPhone: string;
  serviceName: string;
  appointmentDate: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  additionalMessage?: string;
  bookingId: string;
}): string {
  const msgNote = booking.additionalMessage?.trim() || 'None provided';
  const formattedDate = formatReadableDateIST(booking.appointmentDate);

  return (
    `YOUR SOUL — NEW APPOINTMENT REQUEST\n\n` +
    `Hello YOUR SOUL Team,\n\n` +
    `I would like to request an appointment.\n\n` +
    `CUSTOMER DETAILS\n\n` +
    `Name: ${booking.customerName}\n` +
    `Mobile: ${booking.customerPhone}\n\n` +
    `APPOINTMENT DETAILS\n\n` +
    `Service: ${booking.serviceName}\n` +
    `Date: ${formattedDate} (${booking.appointmentDate})\n` +
    `Day: ${booking.dayOfWeek}\n` +
    `Time: ${booking.startTime} – ${booking.endTime}\n\n` +
    `Additional Message: ${msgNote}\n\n` +
    `Booking Reference: ${booking.bookingId}\n\n` +
    `Status: PENDING CONFIRMATION\n\n` +
    `Please check availability and confirm my appointment.\n\n` +
    `Thank you.\n` +
    `YOUR SOUL Customer`
  );
}

export function buildWhatsAppClickToChatUrl(booking: {
  customerName: string;
  customerPhone: string;
  serviceName: string;
  appointmentDate: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  additionalMessage?: string;
  bookingId: string;
}): { url: string; rawMessage: string; businessNumber: string } {
  const businessNumber = getBusinessWhatsAppNumber();
  const rawMessage = buildWhatsAppAppointmentMessage(booking);
  const encodedText = encodeURIComponent(rawMessage);
  const url = `https://wa.me/${businessNumber}?text=${encodedText}`;

  return { url, rawMessage, businessNumber };
}
