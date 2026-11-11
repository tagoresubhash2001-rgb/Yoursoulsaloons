# Security Specification: YOUR SOUL Appointment & Reservation System

## 1. Data Invariants

1. **Atomic Concurrency Protection**:
   A slot reservation must uniquely bind a single date and hourly slot key (e.g., `2026-11-12_09:00`). Two customers cannot book the same slot key.
2. **Strict Status Hierarchy**:
   A booking starts strictly in `pending` status. Only authorized salon staff or admin can transition it to `confirmed` or `cancelled`.
3. **Data Integrity & Key Whitelisting**:
   Neither `appointments` nor `slot_reservations` can contain undeclared ghost fields or oversized payloads.
4. **Valid Schema Formats**:
   - `appointmentDate`: strict ISO `YYYY-MM-DD` string.
   - `slotKey`: strict `YYYY-MM-DD_HH:MM` compound string matching the document ID.
   - `customerPhone`: minimum 10 characters, valid string.
   - `bookingId`: valid alphanumeric document ID.
5. **Customer Privacy Isolation**:
   Individual customer appointment details (full name, phone, message) are accessible by document ID for the booking confirmation reference, or by authorized salon staff. Unauthenticated public users can only check public slot availability status (`slot_reservations` documents) to see which slots are available vs booked on a given date.

## 2. The "Dirty Dozen" Threat Payloads

1. **Ghost Field Injection**: Adding `isAdmin: true` or `discountCode: "100_PERCENT"` to an appointment creation. (Expected: DENIED)
2. **Direct Confirmed Status Bypass**: Submitting a new appointment with `bookingStatus: "confirmed"` rather than `"pending"`. (Expected: DENIED)
3. **Slot Key Mismatch**: Setting document ID as `2026-11-12_09:00` but putting `slotKey: "2026-11-12_10:00"` inside the body. (Expected: DENIED)
4. **Oversized String DOS**: Injecting a 500KB string into `additionalMessage` or `customerName`. (Expected: DENIED)
5. **Invalid ID Characters**: Supplying path variable containing directory traversal or punctuation (e.g. `../bad_id`). (Expected: DENIED)
6. **Date Format Violation**: Submitting `appointmentDate: "yesterday"` or `"12/11/2026"` instead of `YYYY-MM-DD`. (Expected: DENIED)
7. **Unauthorized Status Escalation**: An anonymous client attempting to update a pending appointment to `confirmed`. (Expected: DENIED)
8. **Slot Hijacking**: Overwriting an existing active slot reservation without a transaction or staff role. (Expected: DENIED)
9. **Deletion of Slot Reservations**: An unauthenticated user attempting to `delete` another user's reservation. (Expected: DENIED)
10. **Arbitrary Collection Write**: Attempting to write to an undeclared collection `/system_configs/`. (Expected: DENIED)
11. **Phone Number Truncation**: Submitting single-digit or empty customer phone number. (Expected: DENIED)
12. **Blanket Query Scraping**: Attempting an unrestricted list query across all customer appointments. (Expected: DENIED)
