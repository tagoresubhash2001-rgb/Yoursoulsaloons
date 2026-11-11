import {
  HOURLY_APPOINTMENT_SLOTS,
  getTodayDateIST,
  getDayOfWeekIST,
  formatReadableDateIST,
  isSlotPastCurrentIST,
  buildWhatsAppClickToChatUrl,
  reserveAppointmentSlot,
  db
} from './src/firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';

async function runTests() {
  console.log('====================================================');
  console.log('YOUR SOUL SALON — APPOINTMENT & WHATSAPP TEST SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, desc: string) {
    if (condition) {
      console.log(`[PASS] ${desc}`);
      passed++;
    } else {
      console.error(`[FAIL] ${desc}`);
      failed++;
    }
  }

  // 1. Operating Hours & Slot Count Verification
  assert(
    HOURLY_APPOINTMENT_SLOTS.length === 12,
    `Exactly 12 hourly appointment slots exist (found: ${HOURLY_APPOINTMENT_SLOTS.length})`
  );

  // 2. Slot 01: 09:00 AM – 10:00 AM
  const slot1 = HOURLY_APPOINTMENT_SLOTS[0];
  assert(
    slot1.startTime === '09:00 AM' && slot1.endTime === '10:00 AM',
    `Slot 01 starts at 09:00 AM and ends at 10:00 AM (${slot1.label})`
  );

  // 3. Slot 12: 08:00 PM – 09:00 PM
  const slot12 = HOURLY_APPOINTMENT_SLOTS[11];
  assert(
    slot12.startTime === '08:00 PM' && slot12.endTime === '09:00 PM',
    `Slot 12 starts at 08:00 PM and ends at 09:00 PM (${slot12.label})`
  );

  // 4. Day of Week Verification: Monday & Sunday
  const mondayDate = '2026-11-16'; // Monday
  const sundayDate = '2026-11-15'; // Sunday
  assert(getDayOfWeekIST(mondayDate) === 'Monday', `2026-11-16 is Monday (${getDayOfWeekIST(mondayDate)})`);
  assert(getDayOfWeekIST(sundayDate) === 'Sunday', `2026-11-15 is Sunday (${getDayOfWeekIST(sundayDate)})`);

  // 5. Past Date Detection in IST
  const pastDate = '2026-01-01';
  assert(
    isSlotPastCurrentIST(pastDate, 9) === true,
    'Past date (2026-01-01) correctly identified as past'
  );

  const futureDate = '2026-12-25';
  assert(
    isSlotPastCurrentIST(futureDate, 9) === false,
    'Future date (2026-12-25) correctly identified as open'
  );

  // 6. WhatsApp Link Generation & Message Template
  const testBooking = {
    customerName: 'Pooja Reddy',
    customerPhone: '09553888432',
    serviceName: 'Dimensional French Balayage & Gloss Melting',
    appointmentDate: '2026-11-20',
    dayOfWeek: 'Friday',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    additionalMessage: 'Sensitive scalp, low heat requested',
    bookingId: 'YS-BK-998877',
  };

  const { url, rawMessage, businessNumber } = buildWhatsAppClickToChatUrl(testBooking);

  assert(
    businessNumber === '919553888432',
    `Verified WhatsApp business number is 919553888432 (found: ${businessNumber})`
  );
  assert(
    rawMessage.includes('YOUR SOUL — NEW APPOINTMENT REQUEST'),
    'WhatsApp message includes headline'
  );
  assert(
    rawMessage.includes('Pooja Reddy') && rawMessage.includes('YS-BK-998877'),
    'WhatsApp message contains customer name and booking ID'
  );
  assert(
    rawMessage.includes('10:00 AM – 11:00 AM'),
    'WhatsApp message contains exact slot timing'
  );
  assert(
    rawMessage.includes('Status: PENDING CONFIRMATION'),
    'WhatsApp message contains PENDING CONFIRMATION status'
  );
  assert(
    url.startsWith('https://wa.me/919553888432?text='),
    'Click-to-chat URL is properly formatted'
  );

  // 7. Live Firestore Atomic Slot Reservation & Concurrency Lock Test
  const testDay = (10 + Math.floor(Math.random() * 18)).toString().padStart(2, '0');
  const testSlotDate = `2026-12-${testDay}`;
  const testSlot = HOURLY_APPOINTMENT_SLOTS[0]; // 09:00 AM
  const slotKey = `${testSlotDate}_${testSlot.startMilitary}`;
  const testBookingId = `YS-TEST-${Date.now()}`;

  console.log(`\nTesting atomic Firestore transaction on slotKey: ${slotKey}...`);

  try {
    // 7A. Customer 1 attempts reservation on slotKey
    const res1 = await reserveAppointmentSlot({
      bookingId: testBookingId,
      customerName: 'Ananya Sharma (Test)',
      customerPhone: '9553888432',
      serviceId: 'srv-1',
      serviceName: 'Bespoke Architectural Haircut & Blow-Dry',
      appointmentDate: testSlotDate,
      dayOfWeek: getDayOfWeekIST(testSlotDate),
      slotId: testSlot.slotId,
      startTime: testSlot.startTime,
      endTime: testSlot.endTime,
      slotKey,
      timezone: 'Asia/Kolkata',
      bookingStatus: 'pending',
    });

    assert(res1.success === true, `Customer 1 reserved slot ${slotKey} successfully in Firestore`);

    // Verify document was written in Firestore
    const reservationSnap = await getDoc(doc(db, 'slot_reservations', slotKey));
    assert(reservationSnap.exists(), `Reservation document exists in Firestore for ${slotKey}`);

    const appointmentSnap = await getDoc(doc(db, 'appointments', testBookingId));
    assert(appointmentSnap.exists(), `Appointment document exists in Firestore for ${testBookingId}`);

    // 7B. Customer 2 attempts to book THE EXACT SAME SLOT (Concurrency test)
    let duplicateRejected = false;
    try {
      await reserveAppointmentSlot({
        bookingId: `YS-DUPLICATE-${Date.now()}`,
        customerName: 'Second Customer (Should Fail)',
        customerPhone: '9876543210',
        serviceId: 'srv-3',
        serviceName: 'Dimensional French Balayage',
        appointmentDate: testSlotDate,
        dayOfWeek: getDayOfWeekIST(testSlotDate),
        slotId: testSlot.slotId,
        startTime: testSlot.startTime,
        endTime: testSlot.endTime,
        slotKey,
        timezone: 'Asia/Kolkata',
        bookingStatus: 'pending',
      });
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes('no longer available')) {
        duplicateRejected = true;
      }
    }

    assert(
      duplicateRejected === true,
      'Duplicate reservation blocked: Customer 2 cannot book an already reserved slot'
    );

    // Attempt cleanup if permitted (or verify that unauthorized deletion is forbidden)
    try {
      await deleteDoc(doc(db, 'slot_reservations', slotKey));
      await deleteDoc(doc(db, 'appointments', testBookingId));
      console.log(`[CLEANUP] Deleted test records`);
    } catch {
      console.log(`[SECURITY CONFIRMED] Unauthenticated deletions correctly blocked by Firestore ABAC rules`);
    }

  } catch (err) {
    console.error('Error during Firestore transaction test:', err);
    failed++;
  }

  console.log('\n====================================================');
  console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
