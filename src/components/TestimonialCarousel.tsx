import React, { useState, useEffect, useCallback } from 'react';
import { TESTIMONIALS } from '../config/siteContent';
import { Testimonial, DivisionMode } from '../types';
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';

interface TestimonialCarouselProps {
  currentMode: DivisionMode;
  onOpenBookingModal: (serviceId?: string, courseId?: string) => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  currentMode,
  onOpenBookingModal,
}) => {
  const [filter, setFilter] = useState<'all' | 'salon' | 'academy'>(currentMode);
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);

  // Sync default filter if currentMode changes
  useEffect(() => {
    setFilter(currentMode);
    setPage([0, 0]);
  }, [currentMode]);

  const filteredTestimonials: Testimonial[] =
    filter === 'all'
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.category === filter);

  const activeIndex =
    ((page % filteredTestimonials.length) + filteredTestimonials.length) %
    filteredTestimonials.length;
  const currentTestimonial = filteredTestimonials[activeIndex] || filteredTestimonials[0];

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
    },
    []
  );

  const handleFilterChange = (newFilter: 'all' | 'salon' | 'academy') => {
    setFilter(newFilter);
    setPage([0, 0]);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') paginate(-1);
    if (e.key === 'ArrowRight') paginate(1);
  };

  return (
    <section
      className="w-full py-20 sm:py-28 border-t border-[#E8E1D7] bg-[#FAF8F5] overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Client and Student Testimonials Carousel"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Kicker and Header */}
        <ScrollReveal direction="up" distance={20} duration={0.65}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-editorial-kicker text-xs text-[#7D7164]">
                {currentMode === 'salon' ? 'Sanctuary Stories · Verified Reviews' : 'Alumni Voices · Career Impact'}
              </span>
              <h2 className="mt-2 font-editorial-heading text-3xl sm:text-4xl lg:text-5xl text-[#14171A]">
                {currentMode === 'salon'
                  ? 'Client Reflections & Craft Endorsements'
                  : 'Graduate Journeys & Commercial Success'}
              </h2>
            </div>

            {/* Segmented Filter Controls (Interactive Buttons) */}
            <div className="flex items-center gap-1.5 p-1 bg-[#ECE5DA] rounded-[10px] border border-[#DDD3C6] self-start md:self-auto">
              <button
                type="button"
                onClick={() => handleFilterChange('all')}
                className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-[8px] transition-all min-h-[36px] cursor-pointer ${
                  filter === 'all'
                    ? 'bg-[#FAF8F5] text-[#14171A] shadow-xs font-semibold'
                    : 'text-[#5C5349] hover:text-[#14171A]'
                }`}
              >
                All Stories
              </button>
              <button
                type="button"
                onClick={() => handleFilterChange('salon')}
                className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-[8px] transition-all min-h-[36px] cursor-pointer ${
                  filter === 'salon'
                    ? 'bg-[#0E2E54] text-white shadow-xs font-semibold'
                    : 'text-[#5C5349] hover:text-[#14171A]'
                }`}
              >
                Salon Clients
              </button>
              <button
                type="button"
                onClick={() => handleFilterChange('academy')}
                className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-[8px] transition-all min-h-[36px] cursor-pointer ${
                  filter === 'academy'
                    ? 'bg-[#D95A1E] text-white shadow-xs font-semibold'
                    : 'text-[#5C5349] hover:text-[#14171A]'
                }`}
              >
                Academy Alumni
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Carousel Viewport Container */}
        <div className="relative mx-auto max-w-5xl">
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.25 } }}
            className="relative min-h-[340px] sm:min-h-[300px] md:min-h-[280px] rounded-[18px] card-thick-border border-2 border-[#14171A] bg-[#FBF9F7] p-8 sm:p-12 md:p-14 shadow-xs hover:shadow-xl hover:border-[#0E2E54] transition-all"
          >
            {/* Ambient Background Watermark Quote Icon */}
            <div
              className="absolute top-6 right-8 text-[#E8E1D7]/60 pointer-events-none"
              aria-hidden="true"
            >
              <Quote className="h-20 w-20 stroke-[1]" />
            </div>

            <AnimatePresence initial={false} custom={direction} mode="wait">
              {currentTestimonial && (
                <motion.div
                  key={currentTestimonial.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative z-10 flex flex-col justify-between h-full"
                >
                  {/* Rating & Category Line */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#7D7164] mb-4">
                      <div className="flex items-center gap-1 text-[#D95A1E]">
                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>

                      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#524B43]">
                        <span>{currentTestimonial.category === 'salon' ? 'Salon Experience' : 'Academy Graduate'}</span>
                        <span aria-hidden="true" className="text-[#C4B9AC]">·</span>
                        <span className="text-[#0E2E54] font-medium">{currentTestimonial.serviceOrCourse}</span>
                      </div>
                    </div>

                    {/* Editorial Serif Quote */}
                    <blockquote className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#14171A] leading-relaxed max-w-3xl">
                      “{currentTestimonial.quote}”
                    </blockquote>
                  </div>

                  {/* Author Metadata */}
                  <div className="mt-8 pt-6 border-t border-[#EAE3D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-medium text-base text-[#14171A]">
                          {currentTestimonial.name}
                        </span>
                        {currentTestimonial.verified && (
                          <span
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-[#0E2E54] bg-[#0E2E54]/8 px-2 py-0.5 rounded-md"
                            title="Verified Guest / Graduate"
                          >
                            <CheckCircle2 className="h-3 w-3 text-[#D95A1E]" />
                            <span>Verified</span>
                          </span>
                        )}
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#524B43] font-light">
                        <span>{currentTestimonial.role}</span>
                        <span aria-hidden="true" className="text-[#C4B9AC]">·</span>
                        <span>{currentTestimonial.location}</span>
                        <span aria-hidden="true" className="text-[#C4B9AC]">·</span>
                        <span className="font-mono text-[11px] text-[#7D7164]">{currentTestimonial.date}</span>
                      </div>
                    </div>

                    {/* Action button inside card */}
                    <button
                      type="button"
                      onClick={() =>
                        currentTestimonial.category === 'salon'
                          ? onOpenBookingModal()
                          : onOpenBookingModal(undefined, 'crs-1')
                      }
                      className="self-start sm:self-auto text-xs font-mono uppercase tracking-wider text-[#0E2E54] hover:text-[#D95A1E] transition-colors py-1 cursor-pointer font-medium"
                    >
                      {currentTestimonial.category === 'salon'
                        ? 'Reserve Similar Ritual →'
                        : 'Explore This Curriculum →'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Carousel Controls: Arrows and Dots */}
          <div className="mt-8 flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {filteredTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    const diff = idx - activeIndex;
                    if (diff !== 0) paginate(diff);
                  }}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-2 transition-all rounded-full cursor-pointer ${
                    idx === activeIndex
                      ? 'w-8 bg-[#0E2E54]'
                      : 'w-2 bg-[#D5CABC] hover:bg-[#8C7A65]'
                  }`}
                />
              ))}
              <span className="ml-3 font-mono text-xs text-[#7D7164] tabular-nums">
                {activeIndex + 1} / {filteredTestimonials.length}
              </span>
            </div>

            {/* Prev / Next Buttons (Min 44px touch targets) */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous testimonial"
                className="h-11 w-11 rounded-[10px] border border-[#DFD6CB] bg-[#FAF8F5] text-[#14171A] hover:bg-[#0E2E54] hover:text-white hover:border-[#0E2E54] flex items-center justify-center transition-colors cursor-pointer shadow-2xs focus-visible:outline-2 focus-visible:outline-[#D95A1E]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next testimonial"
                className="h-11 w-11 rounded-[10px] border border-[#DFD6CB] bg-[#FAF8F5] text-[#14171A] hover:bg-[#0E2E54] hover:text-white hover:border-[#0E2E54] flex items-center justify-center transition-colors cursor-pointer shadow-2xs focus-visible:outline-2 focus-visible:outline-[#D95A1E]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
