import React, { useState } from 'react';
import { FAQS } from '../config/siteContent';
import { FAQItem } from '../types';
import { ChevronDown, HelpCircle, Phone, MessageSquare, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';

interface FAQSectionProps {
  currentMode?: 'salon' | 'academy';
  onOpenBookingModal?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  currentMode = 'salon',
  onOpenBookingModal,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'salon' | 'academy'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const filteredFaqs = activeTab === 'all'
    ? FAQS
    : FAQS.filter((item) => item.category === activeTab);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full py-20 sm:py-28 border-t border-[#DFD6CB] bg-[#F8F5EF] overflow-hidden">
      
      {/* Background Ambience */}
      <div 
        className="absolute top-1/4 right-5 w-[500px] h-[350px] bg-gradient-to-br from-[#E85D1A]/5 via-[#B69A70]/10 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={24} duration={0.65} className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2EADF] border border-[#DFD6CB] mb-3">
            <HelpCircle className="h-3.5 w-3.5 text-[#E85D1A]" />
            <span className="font-editorial-kicker text-[11px] text-[#173451] font-semibold">
              Client &amp; Student Clarity
            </span>
          </div>

          <h2 className="font-editorial-heading text-3xl sm:text-4xl lg:text-5xl text-[#25282C] text-balance">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 font-editorial-lead text-sm sm:text-base text-[#524B43] leading-relaxed">
            Transparent answers regarding patch testing, consultation protocols, Indian bridal planning, accredited diplomas, and practical clinic hours.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-[12px] bg-[#EFE8DF] border border-[#DFD6CB] gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-[8px] transition-all cursor-pointer min-h-[38px] ${
                activeTab === 'all'
                  ? 'bg-[#173451] text-[#F8F5EF] shadow-xs'
                  : 'text-[#5C5349] hover:text-[#173451]'
              }`}
            >
              All Topics ({FAQS.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('salon')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-[8px] transition-all cursor-pointer min-h-[38px] flex items-center gap-1.5 ${
                activeTab === 'salon'
                  ? 'bg-[#E85D1A] text-[#F8F5EF] shadow-xs'
                  : 'text-[#5C5349] hover:text-[#E85D1A]'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              <span>Salon Services</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('academy')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-[8px] transition-all cursor-pointer min-h-[38px] flex items-center gap-1.5 ${
                activeTab === 'academy'
                  ? 'bg-[#173451] text-[#F8F5EF] shadow-xs'
                  : 'text-[#5C5349] hover:text-[#173451]'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              <span>Academy Admissions</span>
            </button>
          </div>
        </ScrollReveal>

        {/* FAQ Accordion Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isExpanded = expandedId === faq.id;

            return (
              <motion.div
                key={faq.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                transition={{ duration: 0.35, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-[16px] card-thick-border border-2 border-[#14171A] transition-all duration-300 ${
                  isExpanded
                    ? 'border-[#E85D1A] bg-[#FAF8F5] shadow-[0_8px_24px_rgba(232,93,26,0.12)]'
                    : 'bg-[#FBF9F7] hover:border-[#E85D1A] hover:bg-[#FAF8F5] hover:shadow-md'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full flex items-center justify-between text-left p-5 sm:p-6 cursor-pointer gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="shrink-0 mt-0.5 text-xs font-mono font-bold text-[#E85D1A]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl text-[#173451] leading-snug">
                        {faq.question}
                      </h3>
                      {faq.tags && faq.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {faq.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-block px-2 py-0.5 rounded-[6px] text-[10px] font-mono uppercase tracking-wider bg-[#F2EADF] text-[#524B43]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center border transition-colors ${
                      isExpanded
                        ? 'border-[#E85D1A] bg-[#E85D1A] text-white'
                        : 'border-[#DFD6CB] bg-[#F2EADF] text-[#173451]'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-question-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 pt-1 sm:px-6 sm:pb-7 border-t border-[#EAE3D9] text-sm sm:text-base text-[#524B43] font-light leading-relaxed pl-12 sm:pl-14">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* High-Trust Direct Concierge & Admissions Contact Card */}
        <ScrollReveal direction="up" distance={20} duration={0.65} className="mt-14 max-w-4xl mx-auto">
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="rounded-[18px] card-thick-border border-2 border-[#14171A] bg-[#F2EADF] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs hover:shadow-md hover:border-[#173451] transition-all"
          >
            <div className="space-y-1.5 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono uppercase tracking-wider text-[#E85D1A] font-semibold">
                <ShieldCheck className="h-4 w-4 text-[#E85D1A]" />
                <span>Need Specialized Guidance?</span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl text-[#173451]">
                Speak directly with our Vijayapuri Colony team
              </h4>
              <p className="text-xs sm:text-sm text-[#524B43]">
                Available Monday – Sunday, 09:30 AM – 8:30 PM IST · 1st Floor, JKC College Rd, 6th Line, Vijayapuri Colony, Guntur
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href="tel:09553888432"
                className="btn-brand-navy min-h-[44px] px-4 py-2 text-xs flex items-center gap-2"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Call 095538 88432</span>
              </a>

              {onOpenBookingModal && (
                <button
                  type="button"
                  onClick={onOpenBookingModal}
                  className="btn-brand-primary min-h-[44px] px-4 py-2 text-xs"
                >
                  <span>Reserve Appointment</span>
                </button>
              )}
            </div>
          </motion.div>
        </ScrollReveal>

      </div>
    </section>
  );
};
