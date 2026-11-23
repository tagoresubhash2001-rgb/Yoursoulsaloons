// Unit tests for the WhatsApp message helper. Run: npx tsx scripts/test-whatsapp.ts
import { buildWhatsAppLink, buildWhatsAppMessage, normalizeIndianPhone } from '../src/utils/whatsapp';

let failed = 0;
const check = (ok: boolean, desc: string) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${desc}`); if (!ok) failed++; };

const svc = buildWhatsAppMessage('service', {
  service: 'Nail Care & Extensions', category: 'Nails', name: 'Priya', phone: '9876543210', date: '2026-12-01', time: '11:00 AM', note: '',
});
check(svc.split('\n')[0] === '*New Appointment Request – Your Soul Salon*', 'service title is bold first line');
check(svc.includes('Type: Salon Service') && svc.includes('Category: Nails'), 'service type + category');
check(svc.includes('Preferred Date: Tue, 1 Dec 2026'), 'date formatted for humans');
check(!svc.includes('Note:'), 'empty note omitted');

const crs = buildWhatsAppMessage('course', { course: 'Expert – Senior Stylist', name: 'Ravi', phone: '9876543210', batch: '  ', note: undefined });
check(crs.split('\n')[0] === '*New Course Enquiry – Your Soul Academy*', 'course title');
check(crs.includes('Type: Academy Course') && crs.includes('Course: Expert – Senior Stylist'), 'course type + level');
check(!crs.includes('Preferred Batch') && !crs.includes('Note:'), 'blank batch / note omitted');

const url = buildWhatsAppLink('course', { course: 'Basic – Salon Assistant', name: 'A', phone: '9876543210' });
check(url.startsWith('https://wa.me/919553888432?text=*New%20Course%20Enquiry'), 'link uses wa.me + encodeURIComponent');
check(decodeURIComponent(url.split('?text=')[1]).includes('\nType: Academy Course\n'), 'line breaks survive encoding');
check(buildWhatsAppLink('chat') === 'https://wa.me/919553888432', 'plain chat link');

check(normalizeIndianPhone('+91 95538 88432') === '9553888432', 'phone +91 normalised');
check(normalizeIndianPhone('09553888432') === '9553888432', 'phone leading 0 normalised');
check(normalizeIndianPhone('12345') === null, 'short phone rejected');
check(normalizeIndianPhone('5553888432') === null, 'non-mobile prefix rejected');

console.log(failed ? `\n${failed} FAILED` : '\nAll WhatsApp helper tests passed');
process.exit(failed ? 1 : 0);
