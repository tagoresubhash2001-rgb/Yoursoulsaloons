import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Scissors, GraduationCap, ArrowLeft, CheckCircle2, ExternalLink } from 'lucide-react';
import type { BookingPreset } from '../context/BookingContext';
import {
  buildWhatsAppLink,
  buildWhatsAppMessage,
  normalizeIndianPhone,
  generateBookingRef,
  openWhatsAppLink,
  WHATSAPP_LINK_PROPS,
  type ServiceCategory,
} from '../utils/whatsapp';
import { SIGNATURE_SERVICES, TREATMENT_MENU, COURSE_LEVELS, SPECIALIST_COURSES } from '../config/bookingMenu';
import { WhatsAppIcon } from './WhatsAppIcon';

// Salon hours: 09:00 AM – 09:00 PM → last appointment starts 08:00 PM.
const TIME_SLOTS = Array.from({ length: 12 }, (_, i) => {
  const h24 = 9 + i;
  const h12 = ((h24 + 11) % 12) + 1;
  return { h24, label: `${String(h12).padStart(2, '0')}:00 ${h24 < 12 ? 'AM' : 'PM'}` };
});

function nowIST() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  return { date: `${get('year')}-${get('month')}-${get('day')}`, hour: Number(get('hour')) % 24 };
}

type Kind = 'service' | 'course';
type Errors = Partial<Record<'service' | 'course' | 'name' | 'phone' | 'date' | 'time', string>>;

const fieldClass =
  'w-full min-h-[44px] rounded-[10px] border border-border bg-light px-3.5 py-2.5 text-sm text-dark placeholder:text-subtle/80 transition-colors duration-250 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:border-primary-hover';
const labelClass = 'block text-[11px] font-semibold uppercase tracking-wider text-text-soft mb-1.5';

interface Props {
  preset?: BookingPreset;
  onClose: () => void;
}

export const WhatsAppBookingModal: React.FC<Props> = ({ preset, onClose }) => {
  const uid = useId();
  const [visible, setVisible] = useState(true);
  const [kind, setKind] = useState<Kind | null>(preset?.kind ?? null);
  const [service, setService] = useState(preset?.kind === 'service' ? preset.service ?? '' : '');
  const [presetCategory] = useState<ServiceCategory | undefined>(preset?.kind === 'service' ? preset.category : undefined);
  const [course, setCourse] = useState(preset?.kind === 'course' ? preset.course ?? '' : '');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [batch, setBatch] = useState('');
  const [note, setNote] = useState(preset?.note ?? '');
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<{ url: string; message: string; ref?: string } | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const today = nowIST();

  const close = () => setVisible(false);

  // Esc closes, body scroll locked while open, focus moves into the dialog.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const prevFocus = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab' && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,select,textarea');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      prevFocus?.focus?.();
    };
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>('[data-autofocus], input, select, button')?.focus();
    }, 60);
    return () => window.clearTimeout(t);
  }, [kind, sent]);

  const serviceOptions = useMemo(() => {
    const known = [...SIGNATURE_SERVICES, ...TREATMENT_MENU];
    const extra = service && !known.some((o) => o.name === service) ? [{ name: service, category: presetCategory ?? 'Women' }] : [];
    return { extra, known };
  }, [service, presetCategory]);

  const courseExtra =
    course && !COURSE_LEVELS.some((l) => l.label === course) && !SPECIALIST_COURSES.includes(course) ? course : '';

  const availableTimes = TIME_SLOTS.filter((t) => date !== today.date || t.h24 > today.hour);

  const categoryFor = (svc: string): ServiceCategory =>
    [...serviceOptions.extra, ...serviceOptions.known].find((o) => o.name === svc)?.category ?? presetCategory ?? 'Women';

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Errors = {};
    const cleanPhone = normalizeIndianPhone(phone);
    if (!name.trim()) err.name = 'Please enter your name.';
    if (!phone.trim()) err.phone = 'Please enter your mobile number.';
    else if (!cleanPhone) err.phone = 'Enter a valid 10-digit mobile number (e.g. 95538 88432).';
    if (kind === 'service') {
      if (!service) err.service = 'Please choose a service.';
      if (!date) err.date = 'Please choose a date.';
      else if (date < today.date) err.date = 'Please choose today or a future date.';
      if (!time) err.time = 'Please choose a time.';
      else if (!availableTimes.some((t) => t.label === time)) err.time = 'That time has passed — please pick a later slot.';
    } else if (!course) err.course = 'Please choose a course.';
    setErrors(err);
    if (Object.keys(err).length) {
      dialogRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    const ref = kind === 'service' ? generateBookingRef() : undefined;
    const serviceData = { service, category: categoryFor(service), name, phone: cleanPhone!, date, time, note, ref };
    const courseData = { course, name, phone: cleanPhone!, batch, note };
    const url = kind === 'service' ? buildWhatsAppLink('service', serviceData) : buildWhatsAppLink('course', courseData);
    const message = kind === 'service' ? buildWhatsAppMessage('service', serviceData) : buildWhatsAppMessage('course', courseData);
    openWhatsAppLink(url); // synchronous inside the submit gesture → not blocked as a pop-up
    setSent({ url, message, ref });
  };

  const errId = (f: keyof Errors) => `${uid}-${f}-err`;
  const errorText = (f: keyof Errors) =>
    errors[f] ? (
      <p id={errId(f)} role="alert" className="mt-1 text-xs font-medium text-primary-hover">{errors[f]}</p>
    ) : null;
  const a11y = (f: keyof Errors) => ({ 'aria-invalid': !!errors[f], 'aria-describedby': errors[f] ? errId(f) : undefined });

  const title = sent
    ? 'WhatsApp is ready'
    : kind === 'service'
      ? 'Book a Salon Service'
      : kind === 'course'
        ? 'Enquire about an Academy Course'
        : 'How can we help?';

  return (
    <AnimatePresence onExitComplete={onClose}>
      {visible && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-dark/60 backdrop-blur-sm p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${uid}-title`}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full sm:max-w-lg max-h-[92dvh] overflow-y-auto rounded-t-[20px] sm:rounded-[20px] bg-light border border-border shadow-[0_24px_60px_-12px_color-mix(in_srgb,var(--color-dark)_45%,transparent)]"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center gap-3 px-5 sm:px-7 pt-5 pb-4 bg-light/95 backdrop-blur border-b border-surface-2">
              {kind && !sent && preset === undefined && (
                <button type="button" onClick={() => { setKind(null); setErrors({}); }} aria-label="Back to choose booking type" className="h-11 w-11 -ml-2 shrink-0 rounded-full flex items-center justify-center text-text-soft hover:bg-surface transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}
              <div className="min-w-0 flex-1">
                <span className="font-editorial-kicker text-[10px] text-primary font-semibold">Your Soul · WhatsApp Booking</span>
                <h2 id={`${uid}-title`} className="font-serif text-2xl text-dark leading-tight">{title}</h2>
              </div>
              <button type="button" onClick={close} aria-label="Close" className="h-11 w-11 -mr-2 shrink-0 rounded-full flex items-center justify-center text-text-soft hover:bg-surface hover:text-dark transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-5 sm:px-7 py-6">
              {sent ? (
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-success shrink-0 mt-0.5" />
                    <p className="text-sm text-muted leading-relaxed">
                      We opened WhatsApp with your details. Just tap <strong className="text-dark">Send</strong> and our team will confirm shortly.
                      {sent.ref && (
                        <span className="block mt-1">
                          Your booking reference: <strong className="font-mono text-accent">{sent.ref}</strong>
                        </span>
                      )}
                    </p>
                  </div>
                  <pre className="whitespace-pre-wrap break-words rounded-[12px] bg-surface border border-border p-4 text-xs leading-relaxed text-text-soft font-sans">{sent.message}</pre>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href={sent.url} {...WHATSAPP_LINK_PROPS} className="btn-brand-primary flex-1">
                      <WhatsAppIcon className="h-4 w-4" />
                      <span>Open WhatsApp again</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <button type="button" onClick={close} className="btn-brand-outline flex-1">Done</button>
                  </div>
                </div>
              ) : kind === null ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {([
                    { k: 'service' as const, label: 'Salon Service', sub: 'Hair, skin, nails, bridal & grooming', Icon: Scissors },
                    { k: 'course' as const, label: 'Academy Course', sub: 'Basic, Standard, Advanced & Expert', Icon: GraduationCap },
                  ]).map(({ k, label, sub, Icon }, i) => (
                    <button
                      key={k}
                      type="button"
                      data-autofocus={i === 0 ? true : undefined}
                      onClick={() => setKind(k)}
                      className="card-hover group text-left rounded-[14px] border border-border bg-surface p-5 min-h-[120px] hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <Icon className="h-6 w-6 text-primary" />
                      <span className="mt-3 block font-serif text-xl text-dark group-hover:text-primary transition-colors">{label}</span>
                      <span className="mt-1 block text-xs text-muted">{sub}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-4">
                  {kind === 'service' ? (
                    <div>
                      <label htmlFor={`${uid}-service`} className={labelClass}>Service *</label>
                      <select id={`${uid}-service`} value={service} onChange={(e) => setService(e.target.value)} className={fieldClass} {...a11y('service')}>
                        <option value="">Choose a service…</option>
                        {serviceOptions.extra.map((o) => <option key={o.name} value={o.name}>{o.name}</option>)}
                        <optgroup label="Signature services">
                          {SIGNATURE_SERVICES.map((o) => <option key={o.name} value={o.name}>{o.name}</option>)}
                        </optgroup>
                        <optgroup label="Treatment menu">
                          {TREATMENT_MENU.map((o) => <option key={o.name} value={o.name}>{o.name}</option>)}
                        </optgroup>
                      </select>
                      {errorText('service')}
                    </div>
                  ) : (
                    <div>
                      <label htmlFor={`${uid}-course`} className={labelClass}>Course *</label>
                      <select id={`${uid}-course`} value={course} onChange={(e) => setCourse(e.target.value)} className={fieldClass} {...a11y('course')}>
                        <option value="">Choose a course…</option>
                        {courseExtra && <option value={courseExtra}>{courseExtra}</option>}
                        <optgroup label="Academy levels (Hair | Skin | Body)">
                          {COURSE_LEVELS.map((l) => <option key={l.id} value={l.label}>{l.label}</option>)}
                        </optgroup>
                        <optgroup label="Specialist diplomas & masterclasses">
                          {SPECIALIST_COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </optgroup>
                      </select>
                      {errorText('course')}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`${uid}-name`} className={labelClass}>Your name *</label>
                      <input id={`${uid}-name`} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="e.g. Priya Sharma" className={fieldClass} {...a11y('name')} />
                      {errorText('name')}
                    </div>
                    <div>
                      <label htmlFor={`${uid}-phone`} className={labelClass}>Mobile number *</label>
                      <input id={`${uid}-phone`} type="tel" inputMode="numeric" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile" className={fieldClass} {...a11y('phone')} />
                      {errorText('phone')}
                    </div>
                  </div>

                  {kind === 'service' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={`${uid}-date`} className={labelClass}>Preferred date *</label>
                        <input id={`${uid}-date`} type="date" min={today.date} value={date} onChange={(e) => { setDate(e.target.value); setTime(''); }} className={fieldClass} {...a11y('date')} />
                        {errorText('date')}
                      </div>
                      <div>
                        <label htmlFor={`${uid}-time`} className={labelClass}>Preferred time *</label>
                        <select id={`${uid}-time`} value={time} onChange={(e) => setTime(e.target.value)} className={fieldClass} {...a11y('time')}>
                          <option value="">{date === today.date && availableTimes.length === 0 ? 'No slots left today' : 'Choose a time…'}</option>
                          {availableTimes.map((t) => <option key={t.label} value={t.label}>{t.label}</option>)}
                        </select>
                        {errorText('time')}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label htmlFor={`${uid}-batch`} className={labelClass}>Preferred batch / start <span className="normal-case tracking-normal font-normal text-subtle">(optional)</span></label>
                      <input id={`${uid}-batch`} value={batch} onChange={(e) => setBatch(e.target.value)} placeholder="e.g. January weekday batch" className={fieldClass} />
                    </div>
                  )}

                  <div>
                    <label htmlFor={`${uid}-note`} className={labelClass}>Note <span className="normal-case tracking-normal font-normal text-subtle">(optional)</span></label>
                    <textarea id={`${uid}-note`} rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder={kind === 'service' ? 'Allergies, preferred stylist, event date…' : 'Experience level, questions…'} className={`${fieldClass} resize-y`} />
                  </div>

                  <button type="submit" className="btn-brand-primary w-full">
                    <WhatsAppIcon className="h-4 w-4" />
                    <span>Send on WhatsApp</span>
                  </button>
                  <p className="text-center text-[11px] text-subtle">Opens WhatsApp with your details pre-filled to +91 95538 88432. Nothing is stored on our website.</p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
