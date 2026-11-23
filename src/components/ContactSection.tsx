import React, { useState } from 'react';
import { DivisionMode } from '../types';
import {
  SALON_CONTACT,
  ACADEMY_CONTACT,
  ACADEMY_COURSES,
  ACADEMY_LEARNING_MODES,
} from '../config/siteContent';
import { useNavigation } from '../context/NavigationContext';
import { AppointmentBookingForm } from './AppointmentBookingForm';
import {
  buildAcademyEnquiryWhatsAppUrl,
  validateIndianPhone,
  WhatsAppPayloadResult,
} from '../utils/whatsapp';
import { GOOGLE_REVIEW_URL } from '../config/siteContent';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  MessageCircle,
  Instagram,
  Star,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';

interface ContactSectionProps {
  mode: DivisionMode;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ mode }) => {
  const isSalon = mode === 'salon';
  const info = isSalon ? SALON_CONTACT : ACADEMY_CONTACT;
  const { selectedServiceId } = useNavigation();

  // Academy Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('Module 01: BASIC — Salon Assistant · Beginner Level');
  const [intake, setIntake] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [academyWhatsapp, setAcademyWhatsapp] = useState<WhatsAppPayloadResult | null>(null);
  const [copiedAcademy, setCopiedAcademy] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAcademySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg('Please complete all marked contact fields.');
      return;
    }
    if (!validateIndianPhone(phone)) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const payload = buildAcademyEnquiryWhatsAppUrl({
      customerName: fullName,
      customerPhone: phone,
      learningMode: interest || 'General Academy Admissions',
      courseName: interest || 'All Academy Modules',
      enquiryDetails: [
        email ? `Email: ${email.trim()}` : '',
        intake ? `Anticipated Start: ${intake.trim()}` : '',
        message ? `Notes: ${message.trim()}` : '',
      ]
        .filter(Boolean)
        .join(' | '),
    });

    setAcademyWhatsapp(payload);
    setIsSubmitting(false);
    setSubmitted(true);
    window.open(payload.url, '_blank', 'noopener,noreferrer');
  };

  const rawPhone = info.phone.replace(/[^0-9+]/g, '');

  return (
    <section className="w-full py-16 md:py-24 bg-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Contact details & Operational hours */}
          <ScrollReveal direction="up" distance={24} duration={0.65} className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <span className="font-editorial-kicker text-xs text-primary font-semibold">
                {isSalon ? 'Direct Concierge & Sanctuary' : 'Admissions Office & Campus'}
              </span>

              <h2 className="mt-2 font-editorial-heading text-3xl sm:text-4xl text-dark">
                {info.headline}
              </h2>

              <p className="mt-4 font-editorial-lead text-sm sm:text-base text-muted leading-relaxed">
                {info.subheadline}
              </p>

              {/* Physical Location & Verified Contact */}
              <div className="mt-8 pt-8 border-t border-surface-2 space-y-6">
                
                {/* 1. Verified Business Address */}
                <div className="flex items-start gap-3.5">
                  <MapPin className="h-4 w-4 text-primary shrink-0 mt-1" />
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-subtle">
                      Verified Business Address
                    </span>
                    <a
                      href={info.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-1 block text-sm text-dark hover:text-primary transition-colors space-y-0.5"
                    >
                      {info.addressLines.map((line, idx) => (
                        <p key={idx} className="leading-snug">{line}</p>
                      ))}
                      <span className="inline-flex items-center gap-1 text-xs text-primary font-medium underline underline-offset-2 pt-1">
                        Open in Google Maps <ExternalLink className="h-3 w-3" />
                      </span>
                    </a>
                  </div>
                </div>

                {/* 2. Clickable Phone Number */}
                <div className="flex items-start gap-3.5">
                  <Phone className="h-4 w-4 text-primary shrink-0 mt-1" />
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-subtle">
                      Direct Telephone Line
                    </span>
                    <a
                      href={`tel:${rawPhone}`}
                      className="inline-flex items-center min-h-[44px] text-sm font-mono text-dark hover:text-primary transition-colors font-semibold"
                    >
                      {info.phone}
                    </a>
                    <span className="block text-[11px] text-subtle">
                      Monday – Sunday · 09:00 AM – 09:00 PM IST
                    </span>
                  </div>
                </div>

                {/* 3. Verified Email Address */}
                <div className="flex items-start gap-3.5">
                  <Mail className="h-4 w-4 text-primary shrink-0 mt-1" />
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-subtle">
                      Verified Email Desk
                    </span>
                    <a
                      href={`mailto:${info.email}`}
                      className="inline-flex items-center min-h-[44px] text-sm font-mono text-dark hover:text-primary transition-colors"
                    >
                      {info.email}
                    </a>
                  </div>
                </div>

                {/* 4. Operating Hours */}
                <div className="flex items-start gap-3.5">
                  <Clock className="h-4 w-4 text-primary shrink-0 mt-1" />
                  <div className="w-full">
                    <span className="block text-xs font-mono uppercase tracking-wider text-subtle mb-1.5">
                      {isSalon ? 'Salon Operating Hours (7 Days Open)' : 'Admissions Desk Hours'}
                    </span>
                    <div className="space-y-1 text-xs">
                      {info.hours.map((h, i) => (
                        <div key={i} className="flex justify-between py-1 border-b border-surface last:border-0">
                          <span className="text-muted font-medium">{h.day}</span>
                          <span className="font-mono text-dark font-semibold">{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5. WhatsApp & Instagram Strip */}
                <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap gap-3 [&>a]:sm:basis-[calc(50%-0.375rem)]">
                  <a
                    href={info.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brand-primary min-h-[44px] px-4 py-2 text-xs flex-1 justify-center shadow-xs"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp Desk: 095538 88432</span>
                  </a>

                  <a
                    href={info.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brand-outline min-h-[44px] px-4 py-2 text-xs flex-1 justify-center"
                  >
                    <Instagram className="h-4 w-4 text-primary" />
                    <span>Instagram Profile</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>

                  <a
                    href={GOOGLE_REVIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brand-outline min-h-[44px] px-4 py-2 text-xs flex-1 justify-center"
                  >
                    <Star className="h-4 w-4 text-primary" />
                    <span>Google Reviews</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>

              </div>

              {/* Visitor Protocol Note */}
              <div className="mt-8 p-4 rounded-[10px] card-thick-border border-border bg-surface text-xs text-muted leading-relaxed shadow-xs">
                <span className="font-semibold text-dark">Visitor Protocol: </span>
                {info.note}
              </div>
            </div>

            {/* District Coordinate Plate */}
            <motion.div
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="rounded-[12px] card-thick-border border-border bg-surface-2 p-6 text-center text-xs text-muted shadow-xs hover:shadow-sm hover:border-dark transition-all cursor-default"
            >
              <span className="font-mono uppercase tracking-wider text-[11px] text-dark font-semibold">
                {isSalon ? 'Sanctuary Valet & District Map' : 'Academy Campus & Transit'}
              </span>
              <p className="mt-1 text-xs font-serif text-dark">
                1st Floor, JKC College Rd, Main Rd, 6th Line · Vijayapuri Colony, Guntur, AP 522006
              </p>
              <div className="mt-3 py-3 border-y border-border font-mono text-[11px] text-subtle">
                JKC COLLEGE ROAD · VIJAYAPURI COLONY · GUNTUR, ANDHRA PRADESH 522006
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Right Column: Central Booking Form in Salon Mode OR Admissions Form in Academy Mode */}
          <ScrollReveal direction="up" distance={28} delay={0.15} duration={0.65} className="lg:col-span-7">
            {isSalon ? (
              /* CENTRAL SALON APPOINTMENT BOOKING FORM */
              <AppointmentBookingForm preselectedServiceId={selectedServiceId} />
            ) : (
              /* ACADEMY ADMISSIONS INQUIRY FORM */
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="rounded-[18px] card-thick-border border-border bg-light p-8 sm:p-12 shadow-xs hover:shadow-lg hover:border-accent transition-all"
              >
                <div className="mb-8">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-subtle">
                    Admissions Application &amp; Campus Tour
                  </span>
                  <h3 className="mt-1 font-serif text-2xl sm:text-3xl text-dark">
                    Enrollment &amp; Studio Interview
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                    Speak with our academic team to discuss prerequisites, financial assistance options, and upcoming semester cohorts.
                  </p>
                </div>

                {submitted && academyWhatsapp ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface-2 text-accent">
                      <CheckCircle2 className="h-8 w-8 stroke-[1.5]" />
                    </div>
                    <h4 className="font-serif text-2xl text-dark">
                      Admissions WhatsApp Message Ready
                    </h4>
                    <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-dark">{fullName}</strong>. Please tap{' '}
                      <strong className="text-dark">Send</strong> in the opened WhatsApp chat (+{academyWhatsapp.businessNumber}) so our academic mentors receive your enquiry immediately.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <a
                        href={academyWhatsapp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-brand-primary min-h-[46px] w-full sm:w-auto justify-center"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Open WhatsApp Admissions</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText(academyWhatsapp.rawMessage);
                          setCopiedAcademy(true);
                          window.setTimeout(() => setCopiedAcademy(false), 3000);
                        }}
                        className="btn-brand-outline min-h-[46px] w-full sm:w-auto justify-center text-xs"
                      >
                        {copiedAcademy ? (
                          <>
                            <Check className="h-4 w-4 text-emerald-700" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            <span>Copy Message</span>
                          </>
                        )}
                      </button>
                    </div>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-subtle hover:text-dark underline underline-offset-4 cursor-pointer pt-2"
                    >
                      Submit Another Inquiry
                    </motion.button>
                  </div>
                ) : (
                  <form onSubmit={handleAcademySubmit} className="space-y-5">
                    {errorMsg && (
                      <div className="p-3 rounded-[8px] border border-red-300 bg-red-50 text-xs text-red-800">
                        {errorMsg}
                      </div>
                    )}

                    <div>
                      <label htmlFor="academy-name" className="block text-xs font-medium uppercase tracking-wider text-text-soft mb-1">
                        Full Name <span className="text-primary">*</span>
                      </label>
                      <input
                        id="academy-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ananya Sharma"
                        className="w-full rounded-[8px] card-thick-border border-border bg-light px-4 py-2.5 text-sm text-dark focus:outline-hidden min-h-[44px]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="academy-phone" className="block text-xs font-medium uppercase tracking-wider text-text-soft mb-1">
                          Phone Number <span className="text-primary">*</span>
                        </label>
                        <input
                          id="academy-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-[8px] card-thick-border border-border bg-light px-4 py-2.5 text-sm text-dark focus:outline-hidden min-h-[44px] font-mono"
                        />
                      </div>

                      <div>
                        <label htmlFor="academy-email" className="block text-xs font-medium uppercase tracking-wider text-text-soft mb-1">
                          Email Address <span className="text-primary">*</span>
                        </label>
                        <input
                          id="academy-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ananya@example.com"
                          className="w-full rounded-[8px] card-thick-border border-border bg-light px-4 py-2.5 text-sm text-dark focus:outline-hidden min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="academy-program" className="block text-xs font-medium uppercase tracking-wider text-text-soft mb-1">
                        Desired Academy Program
                      </label>
                      <select
                        id="academy-program"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full rounded-[8px] card-thick-border border-border bg-light px-4 py-2.5 text-sm text-dark focus:outline-hidden min-h-[44px]"
                      >
                        <optgroup label="── Four Structured Learning Modes ──">
                          {ACADEMY_LEARNING_MODES.map((m) => (
                            <option
                              key={m.id}
                              value={`${m.moduleNumber}: ${m.title} — ${m.roleSubtitle}`}
                            >
                              {m.moduleNumber}: {m.title} — {m.roleSubtitle}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="── Specialized Diplomas & Masterclasses ──">
                          {ACADEMY_COURSES.map((c) => (
                            <option key={c.id} value={c.title}>
                              {c.title} ({c.level})
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="academy-intake" className="block text-xs font-medium uppercase tracking-wider text-text-soft mb-1">
                        Anticipated Start Quarter
                      </label>
                      <input
                        id="academy-intake"
                        type="text"
                        value={intake}
                        onChange={(e) => setIntake(e.target.value)}
                        placeholder="e.g. Upcoming Autumn Cohort"
                        className="w-full rounded-[8px] card-thick-border border-border bg-light px-4 py-2.5 text-sm text-dark focus:outline-hidden min-h-[44px]"
                      />
                    </div>

                    <div>
                      <label htmlFor="academy-msg" className="block text-xs font-medium uppercase tracking-wider text-text-soft mb-1">
                        Educational Background &amp; Aspirations
                      </label>
                      <textarea
                        id="academy-msg"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Prior beauty training, styling goals, kit questions..."
                        className="w-full rounded-[8px] card-thick-border border-border bg-light px-4 py-2.5 text-sm text-dark focus:outline-hidden resize-none min-h-[72px]"
                      />
                    </div>

                    <div className="pt-2">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        className="btn-brand-navy w-full min-h-[48px] justify-center"
                      >
                        {isSubmitting ? 'Logging Application...' : 'Submit Admissions Application'}
                      </motion.button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
