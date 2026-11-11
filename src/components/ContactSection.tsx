import React, { useState } from 'react';
import { DivisionMode } from '../types';
import { SALON_CONTACT, ACADEMY_CONTACT, ACADEMY_COURSES } from '../config/siteContent';
import { useNavigation } from '../context/NavigationContext';
import { AppointmentBookingForm } from './AppointmentBookingForm';
import { MapPin, Phone, Mail, Clock, CheckCircle2, ArrowRight, MessageCircle, Instagram, ExternalLink } from 'lucide-react';
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
  const [interest, setInterest] = useState('');
  const [intake, setIntake] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAcademySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg('Please complete all marked contact fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const rawPhone = info.phone.replace(/[^0-9+]/g, '');

  return (
    <section className="w-full py-16 md:py-24 bg-[#FAF8F5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Contact details & Operational hours */}
          <ScrollReveal direction="up" distance={24} duration={0.65} className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <span className="font-editorial-kicker text-xs text-[#E85D1A] font-semibold">
                {isSalon ? 'Direct Concierge & Sanctuary' : 'Admissions Office & Campus'}
              </span>

              <h2 className="mt-2 font-editorial-heading text-3xl sm:text-4xl text-[#14171A]">
                {info.headline}
              </h2>

              <p className="mt-4 font-editorial-lead text-sm sm:text-base text-[#524B43] leading-relaxed">
                {info.subheadline}
              </p>

              {/* Physical Location & Verified Contact */}
              <div className="mt-8 pt-8 border-t border-[#E8E1D7] space-y-6">
                
                {/* 1. Verified Business Address */}
                <div className="flex items-start gap-3.5">
                  <MapPin className="h-4 w-4 text-[#E85D1A] shrink-0 mt-1" />
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-[#7D7164]">
                      Verified Business Address
                    </span>
                    <a
                      href={info.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-1 block text-sm text-[#14171A] hover:text-[#E85D1A] transition-colors space-y-0.5"
                    >
                      {info.addressLines.map((line, idx) => (
                        <p key={idx} className="leading-snug">{line}</p>
                      ))}
                      <span className="inline-flex items-center gap-1 text-xs text-[#E85D1A] font-medium underline underline-offset-2 pt-1">
                        Open in Google Maps <ExternalLink className="h-3 w-3" />
                      </span>
                    </a>
                  </div>
                </div>

                {/* 2. Clickable Phone Number */}
                <div className="flex items-start gap-3.5">
                  <Phone className="h-4 w-4 text-[#E85D1A] shrink-0 mt-1" />
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-[#7D7164]">
                      Direct Telephone Line
                    </span>
                    <a
                      href={`tel:${rawPhone}`}
                      className="mt-1 inline-block text-sm font-mono text-[#14171A] hover:text-[#E85D1A] transition-colors font-semibold"
                    >
                      {info.phone}
                    </a>
                    <span className="block text-[11px] text-[#7D7164]">
                      Monday – Sunday · 09:00 AM – 09:00 PM IST
                    </span>
                  </div>
                </div>

                {/* 3. Verified Email Address */}
                <div className="flex items-start gap-3.5">
                  <Mail className="h-4 w-4 text-[#E85D1A] shrink-0 mt-1" />
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-[#7D7164]">
                      Verified Email Desk
                    </span>
                    <a
                      href={`mailto:${info.email}`}
                      className="mt-1 inline-block text-sm font-mono text-[#14171A] hover:text-[#E85D1A] transition-colors"
                    >
                      {info.email}
                    </a>
                  </div>
                </div>

                {/* 4. Operating Hours */}
                <div className="flex items-start gap-3.5">
                  <Clock className="h-4 w-4 text-[#E85D1A] shrink-0 mt-1" />
                  <div className="w-full">
                    <span className="block text-xs font-mono uppercase tracking-wider text-[#7D7164] mb-1.5">
                      {isSalon ? 'Salon Operating Hours (7 Days Open)' : 'Admissions Desk Hours'}
                    </span>
                    <div className="space-y-1 text-xs">
                      {info.hours.map((h, i) => (
                        <div key={i} className="flex justify-between py-1 border-b border-[#F0EBE3] last:border-0">
                          <span className="text-[#524B43] font-medium">{h.day}</span>
                          <span className="font-mono text-[#14171A] font-semibold">{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5. WhatsApp & Instagram Strip */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
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
                    <Instagram className="h-4 w-4 text-[#E85D1A]" />
                    <span>Instagram Profile</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>

              </div>

              {/* Visitor Protocol Note */}
              <div className="mt-8 p-4 rounded-[10px] card-thick-border border-2 border-[#14171A] bg-[#F2EDE5] text-xs text-[#524B43] leading-relaxed shadow-xs">
                <span className="font-semibold text-[#14171A]">Visitor Protocol: </span>
                {info.note}
              </div>
            </div>

            {/* District Coordinate Plate */}
            <motion.div
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="rounded-[12px] card-thick-border border-2 border-[#14171A] bg-[#EAE2D7] p-6 text-center text-xs text-[#5C5349] shadow-xs hover:shadow-sm hover:border-[#14171A] transition-all cursor-default"
            >
              <span className="font-mono uppercase tracking-wider text-[11px] text-[#262A30] font-semibold">
                {isSalon ? 'Sanctuary Valet & District Map' : 'Academy Campus & Transit'}
              </span>
              <p className="mt-1 text-xs font-serif text-[#14171A]">
                1st Floor, JKC College Rd, Main Rd, 6th Line · Vijayapuri Colony, Guntur, AP 522006
              </p>
              <div className="mt-3 py-3 border-y border-[#D6CBBF] font-mono text-[11px] text-[#7A6F62]">
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
                className="rounded-[18px] card-thick-border border-2 border-[#14171A] bg-[#FBF9F7] p-8 sm:p-12 shadow-xs hover:shadow-lg hover:border-[#0E2E54] transition-all"
              >
                <div className="mb-8">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#7D7164]">
                    Admissions Application &amp; Campus Tour
                  </span>
                  <h3 className="mt-1 font-serif text-2xl sm:text-3xl text-[#14171A]">
                    Enrollment &amp; Studio Interview
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#524B43] leading-relaxed">
                    Speak with our academic team to discuss prerequisites, financial assistance options, and upcoming semester cohorts.
                  </p>
                </div>

                {submitted ? (
                  <div className="py-10 text-center space-y-4">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EAE2D7] text-[#0E2E54]">
                      <CheckCircle2 className="h-8 w-8 stroke-[1.5]" />
                    </div>
                    <h4 className="font-serif text-2xl text-[#14171A]">
                      Application Logged
                    </h4>
                    <p className="text-sm text-[#524B43] max-w-md mx-auto leading-relaxed">
                      Thank you, {fullName}. Your admissions inquiry has been recorded. An academic mentor will follow up with syllabus packets and tour timings.
                    </p>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSubmitted(false)}
                      className="btn-brand-navy min-h-[44px] mt-4"
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
                      <label htmlFor="academy-name" className="block text-xs font-medium uppercase tracking-wider text-[#3E3832] mb-1">
                        Full Name <span className="text-[#D95A1E]">*</span>
                      </label>
                      <input
                        id="academy-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ananya Sharma"
                        className="w-full rounded-[8px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#14171A] focus:outline-hidden min-h-[44px]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="academy-phone" className="block text-xs font-medium uppercase tracking-wider text-[#3E3832] mb-1">
                          Phone Number <span className="text-[#D95A1E]">*</span>
                        </label>
                        <input
                          id="academy-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-[8px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#14171A] focus:outline-hidden min-h-[44px] font-mono"
                        />
                      </div>

                      <div>
                        <label htmlFor="academy-email" className="block text-xs font-medium uppercase tracking-wider text-[#3E3832] mb-1">
                          Email Address <span className="text-[#D95A1E]">*</span>
                        </label>
                        <input
                          id="academy-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ananya@example.com"
                          className="w-full rounded-[8px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#14171A] focus:outline-hidden min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="academy-program" className="block text-xs font-medium uppercase tracking-wider text-[#3E3832] mb-1">
                        Desired Academy Program
                      </label>
                      <select
                        id="academy-program"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full rounded-[8px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#14171A] focus:outline-hidden min-h-[44px]"
                      >
                        <option value="">Select an accredited diploma...</option>
                        {ACADEMY_COURSES.map((c) => (
                          <option key={c.id} value={c.title}>
                            {c.title} ({c.level})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="academy-intake" className="block text-xs font-medium uppercase tracking-wider text-[#3E3832] mb-1">
                        Anticipated Start Quarter
                      </label>
                      <input
                        id="academy-intake"
                        type="text"
                        value={intake}
                        onChange={(e) => setIntake(e.target.value)}
                        placeholder="e.g. Upcoming Autumn Cohort"
                        className="w-full rounded-[8px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#14171A] focus:outline-hidden min-h-[44px]"
                      />
                    </div>

                    <div>
                      <label htmlFor="academy-msg" className="block text-xs font-medium uppercase tracking-wider text-[#3E3832] mb-1">
                        Educational Background &amp; Aspirations
                      </label>
                      <textarea
                        id="academy-msg"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Prior beauty training, styling goals, kit questions..."
                        className="w-full rounded-[8px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#14171A] focus:outline-hidden resize-none min-h-[72px]"
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
