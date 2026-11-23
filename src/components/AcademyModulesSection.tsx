import React, { useState, useCallback, memo } from 'react';
import {
  ACADEMY_LEARNING_MODES,
  ACADEMY_COMPARISON_ROWS,
  ACADEMY_SYLLABUS_PDF_PATH,
} from '../config/siteContent';
import { AcademyLearningMode } from '../types';
import { useBooking, prefetchBookingModal } from '../context/BookingContext';
import { courseLevelLabel } from '../config/bookingMenu';
import { ScrollReveal } from './ScrollReveal';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  ArrowRight,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
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
  /** Which photo set to show — each page gets different photos so none repeat */
  photoVariant?: 'home' | 'services' | 'salon';
}

export const AcademyModulesSection: React.FC<AcademyModulesSectionProps> = memo(
  ({ onExploreCourses, showExploreButton = true, photoVariant = 'home' }) => {
    const photoFor = (item: AcademyLearningMode) =>
      photoVariant === 'services' ? item.servicesPhoto : photoVariant === 'salon' ? item.salonPhoto : item.photo;
    const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>(null);
    const { openBooking } = useBooking();

    // All enquiries go through the shared WhatsApp booking form, with the level pre-selected.
    const openEnquiryModal = useCallback(
      (learningMode: AcademyLearningMode, topic?: string) => {
        openBooking({
          kind: 'course',
          course: courseLevelLabel(learningMode.id) ?? learningMode.title,
          note: topic ? `Interested in: ${topic}` : undefined,
        });
      },
      [openBooking]
    );

    return (
      <section
        id="academy-courses"
        className="w-full py-20 sm:py-28 border-t border-border bg-light scroll-mt-24"
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface border border-border">
                <GraduationCap className="h-3.5 w-3.5 text-primary" />
                <span className="font-editorial-kicker text-[11px] text-accent font-semibold">
                  Four Structured Learning Modes
                </span>
              </div>

              <h2 className="font-editorial-heading text-3xl sm:text-4xl lg:text-5xl text-dark">
                Your Soul Academy – Hair | Skin | Body
              </h2>

              <p className="font-editorial-lead text-sm sm:text-base text-muted leading-relaxed">
                Progress step by step from beginner foundations to senior salon mastery with live client internship. Select any learning mode below to explore its complete syllabus and reserve your seat via WhatsApp.
              </p>
            </ScrollReveal>

            {/* 4 EQUAL-SIZED PREMIUM CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-7 items-stretch">
              {ACADEMY_LEARNING_MODES.map((item, idx) => {
                const isExpanded = expandedSyllabusId === item.id;
                const isOrange = item.accentColor === 'orange';
                const isMostComplete = item.id === 'mode-expert';

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
                    className={`group relative h-full flex flex-col justify-between rounded-[18px] bg-light overflow-hidden shadow-xs hover:shadow-xl transition-shadow duration-300 ${
                      isMostComplete ? 'border-2 border-brass ring-4 ring-brass/15' : 'card-thick-border border-border'
                    }`}
                  >
                    {isMostComplete && (
                      <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-brass px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-dark shadow-sm">
                        <Award className="h-3.5 w-3.5" aria-hidden="true" />
                        Most Complete
                      </span>
                    )}
                    {/* TOP CONTENT AREA */}
                    <div className="flex flex-col flex-1">
                      {/* Consistent 16:10 Photographic Header */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-accent">
                        <img
                          src={photoFor(item).src}
                          srcSet={photoFor(item).srcSet}
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 300px"
                          alt={photoFor(item).alt}
                          width={photoFor(item).width}
                          height={photoFor(item).height}
                          loading="lazy"
                          decoding="async"
                          style={{ objectPosition: photoFor(item).position }}
                          className="card-media h-full w-full object-cover"
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/25 to-transparent"
                          aria-hidden="true"
                        />
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
                          <span className="font-mono text-[11px] uppercase tracking-widest text-primary-soft font-semibold">
                            {item.moduleNumber}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-[6px] text-[10px] font-mono font-semibold uppercase tracking-wider ${
                              isOrange
                                ? 'bg-primary text-light'
                                : 'bg-accent text-light'
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
                          <h3 className="font-serif text-2xl sm:text-[26px] text-dark leading-tight">
                            {item.title}
                          </h3>
                          <p
                            className={`mt-1 text-xs font-mono font-semibold uppercase tracking-wider ${
                              isOrange ? 'text-primary' : 'text-accent'
                            }`}
                          >
                            {item.roleSubtitle}
                          </p>
                          {item.includesPreviousNote && (
                            <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-accent bg-surface px-2.5 py-0.5 rounded-[6px]">
                              <Sparkles className="h-3 w-3 text-primary" />
                              <span>{item.includesPreviousNote}</span>
                            </p>
                          )}
                        </div>

                        {/* Course Description */}
                        <p className="text-xs sm:text-[13px] text-muted font-light leading-relaxed">
                          {item.description}
                        </p>

                        {/* Structured Metadata Specs */}
                        <div className="space-y-2.5 pt-3 border-t border-surface-2 text-xs">
                          <div className="flex items-start gap-2">
                            <BookOpen className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                            <div>
                              <span className="font-mono text-[10px] uppercase tracking-wider text-subtle block">
                                Training Methodology
                              </span>
                              <span className="text-muted leading-snug block">
                                {item.trainingMethodology}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <Layers className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                            <div>
                              <span className="font-mono text-[10px] uppercase tracking-wider text-subtle block">
                                Practical Training
                              </span>
                              <span className="text-muted leading-snug block">
                                {item.practicalTraining}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <Award className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                            <div>
                              <span className="font-mono text-[10px] uppercase tracking-wider text-subtle block">
                                Certification
                              </span>
                              <span className="text-dark font-medium leading-snug block">
                                {item.certification}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <Users className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                            <div>
                              <span className="font-mono text-[10px] uppercase tracking-wider text-subtle block">
                                Eligibility
                              </span>
                              <span className="text-muted leading-snug block">
                                {item.eligibility}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Available Courses / Focus Tracks */}
                        <div className="pt-3 border-t border-surface-2">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-subtle block mb-2">
                            Available Courses &amp; Tracks
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.curriculumGroups.map((grp) => (
                              <button
                                key={grp.name}
                                type="button"
                                onClick={() => openEnquiryModal(item, `${grp.name} — ${item.title} Module`)}
                                className="min-h-[44px] px-3 py-1.5 rounded-[8px] text-[11px] font-medium bg-surface text-dark border border-border hover:bg-accent hover:text-light hover:border-accent transition-colors cursor-pointer"
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
                            className="mt-1 min-h-[44px] inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-accent hover:text-primary transition-colors cursor-pointer font-semibold"
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
                                <div className="mt-3 p-3.5 rounded-[10px] bg-surface border border-border space-y-3 text-xs">
                                  {item.curriculumGroups.map((group) => (
                                    <div key={group.name}>
                                      <div className="font-mono text-[10px] uppercase tracking-wider font-bold text-accent mb-1">
                                        {group.name}
                                      </div>
                                      <ul className="space-y-1 text-[11px] text-text-soft">
                                        {group.topics.map((topic) => (
                                          <li key={topic} className="flex items-start gap-1.5">
                                            <span className="text-primary font-bold mt-0.5">·</span>
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
                        <div className="pt-3 border-t border-surface-2 space-y-1.5">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-subtle block">
                            Key Benefits
                          </span>
                          <ul className="space-y-1.5">
                            {item.benefits.map((benefit) => (
                              <li
                                key={benefit}
                                className="flex items-start gap-2 text-xs text-text-soft leading-snug"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* CARD FOOTER: CONTACT LINE + PRIMARY CTA */}
                    <div className="p-5 sm:p-6 pt-4 bg-surface border-t border-border space-y-3">
                      <p className="text-center text-xs font-semibold text-accent">Contact for more details</p>

                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={() => openEnquiryModal(item)}
                        onPointerEnter={prefetchBookingModal}
                        aria-label={`Enquire about ${item.title} on WhatsApp`}
                        className={`${
                          isOrange ? 'btn-brand-primary' : 'btn-brand-navy'
                        } w-full justify-center min-h-[44px] text-xs`}
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        <span>Enquire on WhatsApp</span>
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
              <span className="font-editorial-kicker text-xs text-primary font-semibold">
                Side-by-Side Curriculum Guide
              </span>
              <h3 className="font-editorial-heading text-2xl sm:text-3xl lg:text-4xl text-dark">
                Compare All Four Academy Learning Modes
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                See exactly which skills each level covers — skin, hair, body, makeup, nails, internship and certification — across Basic, Standard, Advanced and Expert.
              </p>
            </ScrollReveal>

            {/* COMPARISON TABLE — one table at every width. On narrow screens it scrolls
                horizontally inside its own box (the page never overflows) and the first
                column stays pinned so each row stays readable. */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[18px] card-thick-border border-border bg-light shadow-sm overflow-hidden"
            >
              <div
                className="overflow-x-auto overscroll-x-contain focus-visible:outline-2 focus-visible:outline-primary"
                tabIndex={0}
                role="region"
                aria-label="Academy learning modes comparison (scrolls sideways on small screens)"
              >
                <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left">
                  <caption className="sr-only">
                    Comparison of Basic, Standard, Advanced and Expert learning modes. ✓ means covered, — means not covered.
                  </caption>
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="sticky left-0 z-20 bg-accent text-light p-3 sm:p-4 lg:p-5 text-[11px] font-semibold uppercase tracking-wider w-[150px] sm:w-[190px] border-r border-white/15"
                      >
                        What you learn
                      </th>
                      {ACADEMY_LEARNING_MODES.map((m) => (
                        <th
                          key={m.id}
                          scope="col"
                          className={`p-3 sm:p-4 lg:p-5 align-bottom border-r border-white/15 last:border-r-0 ${
                            m.id === 'mode-expert' ? 'bg-dark text-light' : 'bg-accent text-light'
                          }`}
                        >
                          {m.id === 'mode-expert' && (
                            <span className="mb-1.5 inline-block rounded-full bg-brass px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-dark">
                              Most Complete
                            </span>
                          )}
                          <div className="text-[10px] uppercase tracking-widest text-primary-soft">{m.moduleNumber}</div>
                          <div className="font-serif text-lg sm:text-xl text-white mt-0.5">{m.title}</div>
                          <div className="text-[11px] font-normal text-light/80 mt-0.5">{m.levelBadge}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ACADEMY_COMPARISON_ROWS.map((row, rIdx) => {
                      const zebra = rIdx % 2 === 0 ? 'bg-light' : 'bg-surface';
                      return (
                        <tr key={row.criteria} className="group/row">
                          <th
                            scope="row"
                            className={`sticky left-0 z-10 ${zebra} p-3 sm:p-4 lg:p-5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-accent align-top border-t border-r border-border shadow-[4px_0_8px_-6px_color-mix(in_srgb,var(--color-dark)_25%,transparent)]`}
                          >
                            {row.criteria}
                          </th>
                          {(['basic', 'standard', 'advanced', 'expert'] as const).map((k) => {
                            const value = row[k];
                            const covered = value.startsWith('✓');
                            const missing = value.trim() === '—';
                            const text = covered ? value.replace(/^✓\s*/, '') : value;
                            return (
                              <td
                                key={k}
                                className={`${zebra} group-hover/row:bg-surface-2/60 transition-colors duration-200 p-3 sm:p-4 lg:p-5 text-xs sm:text-[13px] leading-relaxed align-top border-t border-r border-border last:border-r-0 ${
                                  k === 'expert' ? 'text-dark font-medium' : 'text-text-soft'
                                }`}
                              >
                                {missing ? (
                                  <span className="text-subtle" aria-label="Not included">—</span>
                                ) : covered ? (
                                  <span className="flex items-start gap-1.5">
                                    <Check className="h-4 w-4 shrink-0 mt-0.5 text-success" aria-label="Included" />
                                    <span>{text}</span>
                                  </span>
                                ) : (
                                  text
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="lg:hidden px-4 py-2.5 bg-surface border-t border-border text-[11px] text-subtle text-center">
                Swipe sideways to compare all four levels →
              </div>
            </motion.div>

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

      </section>
    );
  }
);

AcademyModulesSection.displayName = 'AcademyModulesSection';
