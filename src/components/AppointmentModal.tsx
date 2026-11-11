import React, { useState, useEffect } from 'react';
import { DivisionMode, SalonService, AcademyCourse } from '../types';
import { SALON_SERVICES, ACADEMY_COURSES } from '../config/siteContent';
import { X, CheckCircle2, Calendar, BookOpen, Clock, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: DivisionMode;
  preselectedServiceId?: string;
  preselectedCourseId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  mode,
  preselectedServiceId,
  preselectedCourseId,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedItem, setSelectedItem] = useState(
    mode === 'salon'
      ? preselectedServiceId || SALON_SERVICES[0]?.id || ''
      : preselectedCourseId || ACADEMY_COURSES[0]?.id || ''
  );
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (10:00 - 13:00)');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Sync preselected items
  useEffect(() => {
    if (preselectedServiceId && mode === 'salon') {
      setSelectedItem(preselectedServiceId);
    } else if (preselectedCourseId && mode === 'academy') {
      setSelectedItem(preselectedCourseId);
    }
  }, [preselectedServiceId, preselectedCourseId, mode]);

  if (!isOpen) return null;

  const isSalon = mode === 'salon';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    // Simulate verified submission handling
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setErrorMsg('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14171A]/70 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleResetAndClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[20px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] p-6 sm:p-10 text-[#14171A] shadow-2xl"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 p-2 rounded-full text-[#7D7164] hover:text-[#14171A] hover:bg-[#EAE2D7]/60 focus-visible:outline-2 focus-visible:outline-[#D95A1E] cursor-pointer transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>

          {submitted ? (
            /* Success Screen */
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EAE2D7] text-[#0E2E54]">
                <CheckCircle2 className="h-8 w-8 stroke-[1.5]" />
              </div>

              <span className="inline-block font-editorial-kicker text-[11px] text-[#7D7164]">
                {isSalon ? 'Salon Reservation Inquiry Received' : 'Academy Admissions Inquiry Logged'}
              </span>

              <h2 id="modal-headline" className="font-editorial-heading text-2xl sm:text-3xl text-[#14171A]">
                Thank you, {fullName}
              </h2>

              <p className="font-editorial-lead text-sm text-[#524B43] max-w-md mx-auto">
                {isSalon
                  ? 'Our concierge will review your treatment request and contact you via phone or email within 3 business hours to confirm your suite reservation.'
                  : 'An academic advisor has been assigned to your profile. You will receive course prospectus documents and campus tour availability shortly.'}
              </p>

              <div className="mt-6 pt-6 border-t border-[#EAE3D9] text-xs font-mono text-[#7D7164] space-y-1">
                <div>REFERENCE CODE: <span className="font-semibold text-[#14171A]">YS-{Math.floor(100000 + Math.random() * 900000)}</span></div>
                <div>DIRECT LINE: <span className="text-[#0E2E54] font-semibold">095538 88432</span></div>
              </div>

              <div className="pt-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleResetAndClose}
                  className="btn-brand-navy min-h-[44px]"
                >
                  Close Window
                </motion.button>
              </div>
            </div>
          ) : (
            /* Form Screen */
            <div>
              <div className="mb-6">
                <span className="font-editorial-kicker text-[10px] text-[#7D7164]">
                  {isSalon ? 'Your Soul Salon · Private Booking' : 'Your Soul Academy · Admissions Enrollment'}
                </span>
                <h2 id="modal-headline" className="mt-1 font-editorial-heading text-2xl sm:text-3xl text-[#14171A]">
                  {isSalon ? 'Reserve Your Treatment' : 'Request Course Admission'}
                </h2>
                <p className="mt-2 font-editorial-lead text-xs sm:text-sm text-[#524B43]">
                  {isSalon
                    ? 'Complete this reservation inquiry. Our concierge will curate your personalized appointment schedule.'
                    : 'Submit your profile to request the comprehensive syllabus, schedule details, and faculty counseling.'}
                </p>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 border border-red-300 bg-red-50 text-xs text-red-800">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label htmlFor="modal-name" className="block text-xs font-medium uppercase tracking-wider text-[#3E3832] mb-1">
                    Full Name <span className="text-[#D95A1E]">*</span>
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full rounded-[8px] border border-[#D5CABC] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#14171A] placeholder-[#A69C90] focus:border-[#D95A1E] focus:ring-1 focus:ring-[#D95A1E] focus:outline-hidden min-h-[44px]"
                  />
                </div>

                {/* Contact Grid: Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="modal-phone" className="block text-xs font-medium uppercase tracking-wider text-[#3E3832] mb-1">
                      Phone Number <span className="text-[#D95A1E]">*</span>
                    </label>
                    <input
                      id="modal-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="095538 88432"
                      className="w-full rounded-[8px] border border-[#D5CABC] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#14171A] placeholder-[#A69C90] focus:border-[#D95A1E] focus:ring-1 focus:ring-[#D95A1E] focus:outline-hidden min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label htmlFor="modal-email" className="block text-xs font-medium uppercase tracking-wider text-[#3E3832] mb-1">
                      Email Address <span className="text-[#D95A1E]">*</span>
                    </label>
                    <input
                      id="modal-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ananya@example.com"
                      className="w-full rounded-[8px] border border-[#D5CABC] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#14171A] placeholder-[#A69C90] focus:border-[#D95A1E] focus:ring-1 focus:ring-[#D95A1E] focus:outline-hidden min-h-[44px]"
                    />
                  </div>
                </div>

                {/* Service or Course Dropdown Selection */}
                <div>
                  <label htmlFor="modal-item" className="block text-xs font-medium uppercase tracking-wider text-[#3E3832] mb-1">
                    {isSalon ? 'Desired Treatment or Ritual' : 'Program of Interest'} <span className="text-[#D95A1E]">*</span>
                  </label>
                  <select
                    id="modal-item"
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    className="w-full rounded-[8px] border border-[#D5CABC] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#14171A] focus:border-[#D95A1E] focus:ring-1 focus:ring-[#D95A1E] focus:outline-hidden min-h-[44px]"
                  >
                    {isSalon
                      ? SALON_SERVICES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.duration})
                          </option>
                        ))
                      : ACADEMY_COURSES.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.title} — {c.level}
                          </option>
                        ))}
                  </select>
                </div>

                {/* Preferred Date & Time for Salon, or Start Intake for Academy */}
                {isSalon ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="modal-date" className="block text-xs font-medium uppercase tracking-wider text-[#3E3832] mb-1">
                        Preferred Date
                      </label>
                      <input
                        id="modal-date"
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full rounded-[8px] border border-[#D5CABC] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#14171A] focus:border-[#D95A1E] focus:ring-1 focus:ring-[#D95A1E] focus:outline-hidden min-h-[44px]"
                      />
                    </div>
                    <div>
                      <label htmlFor="modal-time" className="block text-xs font-medium uppercase tracking-wider text-[#3E3832] mb-1">
                        Preferred Time Window
                      </label>
                      <select
                        id="modal-time"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full rounded-[8px] border border-[#D5CABC] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#14171A] focus:border-[#D95A1E] focus:ring-1 focus:ring-[#D95A1E] focus:outline-hidden min-h-[44px]"
                      >
                        <option>Morning (09:30 – 12:30)</option>
                        <option>Afternoon (13:00 – 16:30)</option>
                        <option>Evening (17:00 – 20:00)</option>
                        <option>Flexible / First Available</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label htmlFor="modal-intake" className="block text-xs font-medium uppercase tracking-wider text-[#3E3832] mb-1">
                      Target Enrollment Term
                    </label>
                    <select
                      id="modal-intake"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full rounded-[8px] border border-[#D5CABC] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#14171A] focus:border-[#D95A1E] focus:ring-1 focus:ring-[#D95A1E] focus:outline-hidden min-h-[44px]"
                    >
                      <option>Upcoming Spring Intake</option>
                      <option>Upcoming Summer Intensive</option>
                      <option>Upcoming Autumn Cohort</option>
                      <option>Next Year / Advance Planning</option>
                    </select>
                  </div>
                )}

                {/* Notes */}
                <div>
                  <label htmlFor="modal-notes" className="block text-xs font-medium uppercase tracking-wider text-[#3E3832] mb-1">
                    {isSalon ? 'Hair/Skin Notes or Special Requests' : 'Prior Experience or Questions'}
                  </label>
                  <textarea
                    id="modal-notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={
                      isSalon
                        ? 'E.g., sensitive scalp, past bleaching history, bridal trial inquiry...'
                        : 'E.g., beginner looking for career change, licensed stylist seeking balayage mastery...'
                    }
                    className="w-full rounded-[8px] border border-[#D5CABC] bg-[#FAF8F5] px-3.5 py-2 text-sm text-[#14171A] placeholder-[#A69C90] focus:border-[#D95A1E] focus:ring-1 focus:ring-[#D95A1E] focus:outline-hidden resize-none min-h-[64px]"
                  />
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    className={`w-full min-h-[48px] justify-center ${isSalon ? 'btn-brand-primary' : 'btn-brand-navy'}`}
                  >
                    {isSubmitting
                      ? 'Processing Inquiry...'
                      : isSalon
                      ? 'Submit Reservation Inquiry'
                      : 'Submit Admissions Inquiry'}
                  </motion.button>
                  <p className="mt-2 text-center text-[11px] text-[#7A6F62]">
                    No upfront charge. Our concierge will verify schedule availability.
                  </p>
                </div>

              </form>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
