import React, { useState, useCallback, memo } from 'react';
import {
  ACADEMY_LEARNING_MODES,
  ACADEMY_COMPARISON_ROWS,
  ACADEMY_SYLLABUS_PDF_PATH,
} from '../config/siteContent';
import { AcademyLearningMode } from '../types';
import {
  buildAcademyEnquiryWhatsAppUrl,
  validateIndianPhone,
  WhatsAppPayloadResult,
} from '../utils/whatsapp';
import { ScrollReveal } from './ScrollReveal';
import {
  ArrowRight,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Copy,
  FileDown,
  GraduationCap,
  Layers,
  MessageCircle,
  Sparkles,
  Users,
  X,
  AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AcademyModulesSectionProps {
  onExploreCourses?: () => void;
  showExploreButton?: boolean;
}

interface EnquiryModalState {
  isOpen: boolean;
  selectedMode: AcademyLearningMode;
  selectedCourse: string;
}

export const AcademyModulesSection: React.FC<AcademyModulesSectionProps> = memo(
  ({ onExploreCourses, showExploreButton = true }) => {
    const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>(null);
    const [modalState, setModalState] = useState<EnquiryModalState>({
      isOpen: false,
      selectedMode: ACADEMY_LEARNING_MODES[0],
      selectedCourse: ACADEMY_LEARNING_MODES[0].availableCourses[0],
    });

    // Modal form fields
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [enquiryDetails, setEnquiryDetails] = useState('');
    const [formError, setFormError] = useState('');
    const [submittedPayload, setSubmittedPayload] = useState<WhatsAppPayloadResult | null>(null);
    const [copied, setCopied] = useState(false);

    const openEnquiryModal = useCallback((learningMode: AcademyLearningMode, preferredCourse?: string) => {
      setModalState({
        isOpen: true,
        selectedMode: learningMode,
        selectedCourse: preferredCourse || learningMode.availableCourses[0],
      });
      setFormError('');
      setSubmittedPayload(null);
      setCopied(false);
    }, []);

    const closeEnquiryModal = useCallback(() => {
      setModalState((prev) => ({ ...prev, isOpen: false }));
      setFormError('');
    }, []);

    const handleModeChangeInModal = (modeId: string) => {
      const found = ACADEMY_LEARNING_MODES.find((m) => m.id === modeId);
      if (found) {
        setModalState((prev) => ({
          ...prev,
          selectedMode: found,
          selectedCourse: found.availableCourses[0],
        }));
      }
    };

    const handleEnquirySubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setFormError('');

      if (!customerName.trim()) {
        setFormError('Please enter your full name.');
        return;
      }
      if (!customerPhone.trim() || !validateIndianPhone(customerPhone)) {
        setFormError('Please enter a valid 10-digit Indian mobile number (e.g., 95538 88432).');
        return;
      }

      const payload = buildAcademyEnquiryWhatsAppUrl({
        customerName,
        customerPhone,
        learningMode: `${modalState.selectedMode.moduleNumber}: ${modalState.selectedMode.title} (${modalState.selectedMode.roleSubtitle})`,
        courseName: modalState.selectedCourse,
        enquiryDetails,
      });

      setSubmittedPayload(payload);
      window.open(payload.url, '_blank', 'noopener,noreferrer');
    };

    const handleCopyDetails = () => {
      if (!submittedPayload) return;
      navigator.clipboard?.writeText(submittedPayload.rawMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3000);
    };

    return (
      <section
        id="academy-learning-modes"
        className="w-full py-20 sm:py-28 border-t border-[#DFD6CB] bg-[#FAF8F5] scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
          {/* =================================================================
              PART 1: SECTION HEADER + FOUR LEARNING MODE CARDS
              ================================================================= */}
          <div>
            <ScrollReveal
              direction="up"
              distance={22}
              duration={0.6}
              className="text-center max-w-3xl mx-auto mb-14 space-y-3"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2EADF] border border-[#DFD6CB]">
                <GraduationCap className="h-3.5 w-3.5 text-[#E85D1A]" />
                <span className="font-editorial-kicker text-[11px] text-[#0E2E54] font-semibold">
                  Your Soul Academy · Hair | Skin | Body
                </span>
              </div>

              <h2 className="font-editorial-heading text-3xl sm:text-4xl lg:text-5xl text-[#14171A]">
                Four Structured Academy Learning Modes
              </h2>

              <p className="font-editorial-lead text-sm sm:text-base text-[#524B43] leading-relaxed">
                Progress step by step from beginner foundations to senior salon mastery with live client internship. Select any learning mode below to explore its complete syllabus and reserve your seat via WhatsApp.
              </p>
            </ScrollReveal>

            {/* 4 EQUAL-SIZED PREMIUM CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-7 items-stretch">
              {ACADEMY_LEARNING_MODES.map((item, idx) => {
                const isExpanded = expandedSyllabusId === item.id;
                const isOrange = item.accentColor === 'orange';

                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -6, transition: { duration: 0.22, ease: 'easeOut' } }}
                    className="group h-full flex flex-col justify-between rounded-[18px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] overflow-hidden shadow-xs hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* TOP CONTENT AREA */}
                    <div className="flex flex-col flex-1">
                      {/* Consistent 16:10 Photographic Header */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#173451]">
                        <img
                          src={item.image}
                          alt={item.imageAlt}
                          width={800}
                          height={500}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-[#0A121E]/80 via-[#0A121E]/25 to-transparent"
                          aria-hidden="true"
                        />
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
                          <span className="font-mono text-[11px] uppercase tracking-widest text-[#F3C7B0] font-semibold">
                            {item.moduleNumber}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-[6px] text-[10px] font-mono font-semibold uppercase tracking-wider ${
                              isOrange
                                ? 'bg-[#E85D1A] text-[#FAF8F5]'
                                : 'bg-[#0E2E54] text-[#FAF8F5]'
                            }`}
                          >
                            {item.levelBadge}
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 sm:p-6 flex flex-col flex-1 space-y-4">
                        {/* Title & Role Subtitle */}
                        <div>
                          <h3 className="font-serif text-2xl sm:text-[26px] text-[#14171A] leading-tight">
                            {item.title}
                          </h3>
                          <p
                            className={`mt-1 text-xs font-mono font-semibold uppercase tracking-wider ${
                              isOrange ? 'text-[#E85D1A]' : 'text-[#0E2E54]'
                            }`}
                          >
                            {item.roleSubtitle}
                          </p>
                          {item.includesPreviousNote && (
                            <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-[#0E2E54] bg-[#EFE8DF] px-2.5 py-0.5 rounded-[6px]">
                              <Sparkles className="h-3 w-3 text-[#E85D1A]" />
                              <span>{item.includesPreviousNote}</span>
                            </p>
                          )}
                        </div>

                        {/* Course Description */}
                        <p className="text-xs sm:text-[13px] text-[#524B43] font-light leading-relaxed">
                          {item.description}
                        </p>

                        {/* Structured Metadata Specs */}
                        <div className="space-y-2.5 pt-3 border-t border-[#EAE1D5] text-xs">
                          <div className="flex items-start gap-2">
                            <Clock className="h-3.5 w-3.5 text-[#E85D1A] shrink-0 mt-0.5" />
                            <div>
                              <span className="font-mono text-[10px] uppercase tracking-wider text-[#7D7164] block">
                                Duration
                              </span>
                              <span className="text-[#14171A] font-medium leading-snug block">
                                {item.duration}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <BookOpen className="h-3.5 w-3.5 text-[#0E2E54] shrink-0 mt-0.5" />
                            <div>
                              <span className="font-mono text-[10px] uppercase tracking-wider text-[#7D7164] block">
                                Training Methodology
                              </span>
                              <span className="text-[#524B43] leading-snug block">
                                {item.trainingMethodology}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <Layers className="h-3.5 w-3.5 text-[#E85D1A] shrink-0 mt-0.5" />
                            <div>
                              <span className="font-mono text-[10px] uppercase tracking-wider text-[#7D7164] block">
                                Practical Training
                              </span>
                              <span className="text-[#524B43] leading-snug block">
                                {item.practicalTraining}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <Award className="h-3.5 w-3.5 text-[#0E2E54] shrink-0 mt-0.5" />
                            <div>
                              <span className="font-mono text-[10px] uppercase tracking-wider text-[#7D7164] block">
                                Certification
                              </span>
                              <span className="text-[#14171A] font-medium leading-snug block">
                                {item.certification}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <Users className="h-3.5 w-3.5 text-[#E85D1A] shrink-0 mt-0.5" />
                            <div>
                              <span className="font-mono text-[10px] uppercase tracking-wider text-[#7D7164] block">
                                Eligibility
                              </span>
                              <span className="text-[#524B43] leading-snug block">
                                {item.eligibility}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Available Courses / Focus Tracks */}
                        <div className="pt-3 border-t border-[#EAE1D5]">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#7D7164] block mb-2">
                            Available Courses &amp; Tracks
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.curriculumGroups.map((grp) => (
                              <button
                                key={grp.name}
                                type="button"
                                onClick={() => openEnquiryModal(item, `${grp.name} — ${item.title} Module`)}
                                className="px-2.5 py-1 rounded-[7px] text-[11px] font-medium bg-[#F2EADF] text-[#14171A] border border-[#DFD6CB] hover:bg-[#0E2E54] hover:text-[#FAF8F5] hover:border-[#0E2E54] transition-colors cursor-pointer"
                              >
                                {grp.name}
                              </button>
                            ))}
                          </div>

                          {/* Expandable Full Syllabus Toggle */}
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedSyllabusId((prev) => (prev === item.id ? null : item.id))
                            }
                            aria-expanded={isExpanded}
                            className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#0E2E54] hover:text-[#E85D1A] transition-colors cursor-pointer font-semibold"
                          >
                            <span>{isExpanded ? 'Hide Detailed Topics' : 'View Full Module Syllabus'}</span>
                            <ChevronDown
                              className={`h-3.5 w-3.5 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="mt-3 p-3.5 rounded-[10px] bg-[#F2EDE5] border border-[#DFD6CB] space-y-3 text-xs">
                                  {item.curriculumGroups.map((group) => (
                                    <div key={group.name}>
                                      <div className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#0E2E54] mb-1">
                                        {group.name}
                                      </div>
                                      <ul className="space-y-1 text-[11px] text-[#3E3832]">
                                        {group.topics.map((topic) => (
                                          <li key={topic} className="flex items-start gap-1.5">
                                            <span className="text-[#E85D1A] font-bold mt-0.5">·</span>
                                            <span>{topic}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Benefits of the Learning Mode */}
                        <div className="pt-3 border-t border-[#EAE1D5] space-y-1.5">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#7D7164] block">
                            Key Benefits
                          </span>
                          <ul className="space-y-1.5">
                            {item.benefits.map((benefit) => (
                              <li
                                key={benefit}
                                className="flex items-start gap-2 text-xs text-[#3E3832] leading-snug"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 text-[#E85D1A] shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* CARD FOOTER: COURSE FEE NOTE + PRIMARY CTA */}
                    <div className="p-5 sm:p-6 pt-4 bg-[#F2EDE5] border-t border-[#DFD6CB] space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-[#7D7164] uppercase tracking-wider">Course Fee</span>
                        <span className="text-[#0E2E54] font-semibold">{item.courseFeeNote}</span>
                      </div>

                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={() => openEnquiryModal(item)}
                        className={`${
                          isOrange ? 'btn-brand-primary' : 'btn-brand-navy'
                        } w-full justify-center min-h-[44px] text-xs`}
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Enquire Now / Book Your Seat</span>
                      </motion.button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          {/* =================================================================
              PART 2: FOUR-MODE COMPARISON SECTION
              Desktop: 5-Column Clean Table
              Tablet: Horizontally Scrollable Table
              Mobile: Stacked Comparison Cards (Zero Overflow)
              ================================================================= */}
          <div className="pt-4">
            <ScrollReveal
              direction="up"
              distance={22}
              duration={0.6}
              className="text-center max-w-3xl mx-auto mb-10 space-y-2.5"
            >
              <span className="font-editorial-kicker text-xs text-[#E85D1A] font-semibold">
                Side-by-Side Curriculum Guide
              </span>
              <h3 className="font-editorial-heading text-2xl sm:text-3xl lg:text-4xl text-[#14171A]">
                Compare All Four Academy Learning Modes
              </h3>
              <p className="text-xs sm:text-sm text-[#524B43] leading-relaxed">
                Evaluate duration, learning format, practical floor exposure, trainer interaction, flexibility, and certification across Basic, Standard, Advanced, and Expert tracks.
              </p>
            </ScrollReveal>

            {/* DESKTOP & TABLET COMPARISON TABLE (md and up) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:block rounded-[18px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] shadow-sm overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[780px] border-collapse text-left">
                  <thead>
                    <tr className="bg-[#0E2E54] text-[#FAF8F5]">
                      <th
                        scope="col"
                        className="p-4 lg:p-5 text-xs font-mono uppercase tracking-wider w-[18%] border-r border-white/15"
                      >
                        Comparison Criteria
                      </th>
                      {ACADEMY_LEARNING_MODES.map((m) => (
                        <th
                          key={m.id}
                          scope="col"
                          className="p-4 lg:p-5 w-[20.5%] border-r border-white/15 last:border-r-0"
                        >
                          <div className="text-[10px] font-mono uppercase tracking-widest text-[#F3C7B0]">
                            {m.moduleNumber}
                          </div>
                          <div className="font-serif text-xl text-white mt-0.5">{m.title}</div>
                          <div className="text-[11px] font-sans font-normal text-[#E2EDF5]/80 mt-0.5">
                            {m.levelBadge}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ACADEMY_COMPARISON_ROWS.map((row, rIdx) => (
                      <tr
                        key={row.criteria}
                        className={`border-t border-[#DFD6CB] transition-colors hover:bg-[#EFE8DF]/60 ${
                          rIdx % 2 === 0 ? 'bg-[#FAF8F5]' : 'bg-[#F4EFE7]'
                        }`}
                      >
                        <th
                          scope="row"
                          className="p-4 lg:p-5 text-xs font-mono font-semibold uppercase tracking-wider text-[#0E2E54] align-top border-r border-[#DFD6CB]"
                        >
                          {row.criteria}
                        </th>
                        <td className="p-4 lg:p-5 text-xs sm:text-[13px] text-[#3E3832] leading-relaxed align-top border-r border-[#DFD6CB]">
                          {row.basic}
                        </td>
                        <td className="p-4 lg:p-5 text-xs sm:text-[13px] text-[#3E3832] leading-relaxed align-top border-r border-[#DFD6CB]">
                          {row.standard}
                        </td>
                        <td className="p-4 lg:p-5 text-xs sm:text-[13px] text-[#3E3832] leading-relaxed align-top border-r border-[#DFD6CB]">
                          {row.advanced}
                        </td>
                        <td className="p-4 lg:p-5 text-xs sm:text-[13px] text-[#14171A] font-medium leading-relaxed align-top">
                          {row.expert}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="lg:hidden px-4 py-2 bg-[#F2EDE5] border-t border-[#DFD6CB] text-[11px] font-mono text-[#7D7164] text-center">
                Scroll horizontally to compare all four learning modes →
              </div>
            </motion.div>

            {/* MOBILE STACKED COMPARISON CARDS (< md) */}
            <div className="md:hidden space-y-5">
              {ACADEMY_LEARNING_MODES.map((m, mIdx) => {
                const modeKey = (['basic', 'standard', 'advanced', 'expert'] as const)[mIdx];
                return (
                  <motion.div
                    key={`mobile-cmp-${m.id}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: mIdx * 0.06 }}
                    className="rounded-[16px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] overflow-hidden shadow-xs"
                  >
                    <div className="px-5 py-4 bg-[#0E2E54] text-[#FAF8F5] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#F3C7B0] block">
                          {m.moduleNumber}
                        </span>
                        <h4 className="font-serif text-xl text-white">
                          {m.title} — {m.levelBadge}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => openEnquiryModal(m)}
                        className="px-3 py-1.5 rounded-[8px] bg-[#E85D1A] text-[#FAF8F5] hover:text-[#14171A] text-[11px] font-semibold uppercase tracking-wider cursor-pointer min-h-[36px]"
                      >
                        Enquire
                      </button>
                    </div>
                    <dl className="divide-y divide-[#EAE1D5] p-5 space-y-0">
                      {ACADEMY_COMPARISON_ROWS.map((row) => (
                        <div key={`${m.id}-${row.criteria}`} className="py-2.5 first:pt-0 last:pb-0">
                          <dt className="text-[10px] font-mono uppercase tracking-wider text-[#7D7164] font-semibold">
                            {row.criteria}
                          </dt>
                          <dd className="mt-0.5 text-xs text-[#14171A] leading-relaxed">
                            {row[modeKey]}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA STRIP BELOW COMPARISON */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              {showExploreButton && onExploreCourses && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onExploreCourses}
                  className="btn-brand-primary min-h-[48px] px-7 w-full sm:w-auto justify-center"
                >
                  <span>Explore Academy Courses</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              )}

              <a
                href={ACADEMY_SYLLABUS_PDF_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand-outline min-h-[48px] px-6 w-full sm:w-auto justify-center"
              >
                <FileDown className="h-4 w-4" />
                <span>View Official Modules Syllabus (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* =================================================================
            INTERACTIVE ACADEMY WHATSAPP ENQUIRY MODAL
            ================================================================= */}
        <AnimatePresence>
          {modalState.isOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#14171A]/65 backdrop-blur-xs"
              role="dialog"
              aria-modal="true"
              aria-labelledby="academy-enquiry-title"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[18px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] shadow-2xl p-6 sm:p-8 text-[#14171A]"
              >
                <button
                  type="button"
                  onClick={closeEnquiryModal}
                  aria-label="Close Academy enquiry dialog"
                  className="absolute top-4 right-4 h-9 w-9 rounded-full bg-[#EFE8DF] text-[#14171A] hover:bg-[#0E2E54] hover:text-[#FAF8F5] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>

                {submittedPayload ? (
                  <div className="space-y-5 text-center pt-2">
                    <div className="mx-auto h-14 w-14 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <h4 id="academy-enquiry-title" className="font-serif text-2xl sm:text-3xl text-[#14171A]">
                        WhatsApp Enquiry Ready
                      </h4>
                      <p className="text-xs sm:text-sm text-[#524B43] leading-relaxed">
                        Your prefilled enquiry for{' '}
                        <strong className="text-[#14171A] font-semibold">
                          {modalState.selectedMode.moduleNumber}: {modalState.selectedMode.title}
                        </strong>{' '}
                        opens in WhatsApp directed to YOUR SOUL Academy (+{submittedPayload.businessNumber}). Please tap{' '}
                        <strong className="font-semibold text-[#14171A]">Send</strong> inside WhatsApp to deliver your message.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <a
                        href={submittedPayload.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-brand-primary flex-1 justify-center min-h-[46px]"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Open WhatsApp Chat</span>
                      </a>

                      <button
                        type="button"
                        onClick={handleCopyDetails}
                        className="btn-brand-outline px-4 min-h-[46px] justify-center text-xs"
                      >
                        {copied ? (
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

                    <button
                      type="button"
                      onClick={() => setSubmittedPayload(null)}
                      className="text-xs text-[#7D7164] hover:text-[#14171A] underline underline-offset-4 cursor-pointer"
                    >
                      Edit Enquiry Details
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-4">
                    <div className="pr-8">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#E85D1A] font-semibold">
                        Academy Seat Reservation &amp; Enquiry
                      </span>
                      <h4 id="academy-enquiry-title" className="mt-1 font-serif text-2xl sm:text-3xl text-[#14171A]">
                        Enquire via WhatsApp
                      </h4>
                      <p className="mt-1 text-xs text-[#524B43]">
                        Complete your details below to open a prefilled WhatsApp message directly with our Guntur Admissions Desk (+91 9553888432).
                      </p>
                    </div>

                    {formError && (
                      <div className="p-3 rounded-[10px] bg-red-50 border border-red-300 text-xs text-red-900 flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="acad-mode-select"
                        className="block text-xs font-mono uppercase tracking-wider text-[#14171A] font-semibold mb-1"
                      >
                        Selected Learning Mode *
                      </label>
                      <select
                        id="acad-mode-select"
                        value={modalState.selectedMode.id}
                        onChange={(e) => handleModeChangeInModal(e.target.value)}
                        className="w-full rounded-[10px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#14171A] min-h-[44px] cursor-pointer"
                      >
                        {ACADEMY_LEARNING_MODES.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.moduleNumber}: {m.title} — {m.roleSubtitle}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="acad-course-select"
                        className="block text-xs font-mono uppercase tracking-wider text-[#14171A] font-semibold mb-1"
                      >
                        Course / Focus Track *
                      </label>
                      <select
                        id="acad-course-select"
                        value={modalState.selectedCourse}
                        onChange={(e) =>
                          setModalState((prev) => ({ ...prev, selectedCourse: e.target.value }))
                        }
                        className="w-full rounded-[10px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#14171A] min-h-[44px] cursor-pointer"
                      >
                        <option value={`Complete ${modalState.selectedMode.title} Module (All Tracks)`}>
                          Complete {modalState.selectedMode.title} Module (All Tracks)
                        </option>
                        {modalState.selectedMode.availableCourses.map((course) => (
                          <option key={course} value={course}>
                            {course}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label
                          htmlFor="acad-student-name"
                          className="block text-xs font-mono uppercase tracking-wider text-[#14171A] font-semibold mb-1"
                        >
                          Your Full Name *
                        </label>
                        <input
                          id="acad-student-name"
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. Ananya Sharma"
                          className="w-full rounded-[10px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#14171A] min-h-[44px]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="acad-student-phone"
                          className="block text-xs font-mono uppercase tracking-wider text-[#14171A] font-semibold mb-1"
                        >
                          Mobile Number *
                        </label>
                        <input
                          id="acad-student-phone"
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="95538 88432"
                          className="w-full rounded-[10px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] px-3.5 py-2.5 text-sm font-mono text-[#14171A] min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="acad-enquiry-notes"
                        className="block text-xs font-mono uppercase tracking-wider text-[#14171A] font-semibold mb-1"
                      >
                        Enquiry Details (Optional)
                      </label>
                      <textarea
                        id="acad-enquiry-notes"
                        rows={2}
                        value={enquiryDetails}
                        onChange={(e) => setEnquiryDetails(e.target.value)}
                        placeholder="Preferred batch start month, prior experience, or fee & campus tour questions..."
                        className="w-full rounded-[10px] card-thick-border border-2 border-[#14171A] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#14171A] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-brand-primary w-full justify-center min-h-[48px] text-sm"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Continue to WhatsApp Admissions</span>
                    </button>

                    <p className="text-[11px] text-center text-[#7D7164]">
                      Opens official WhatsApp Click-to-Chat with prefilled details. Press Send inside WhatsApp to connect.
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    );
  }
);

AcademyModulesSection.displayName = 'AcademyModulesSection';
