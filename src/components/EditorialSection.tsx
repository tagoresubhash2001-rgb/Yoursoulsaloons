import React, { useState } from 'react';
import { EditorialSectionData } from '../types';
import { useAssets } from '../context/AssetContext';
import { SlidersHorizontal, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface EditorialSectionProps {
  section: EditorialSectionData;
  isFirst?: boolean;
}

export const EditorialSection: React.FC<EditorialSectionProps> = ({ section, isFirst = false }) => {
  const { customSlots, setSelectedSlotId, setIsAssetDrawerOpen } = useAssets();
  const [imgError, setImgError] = useState(false);

  const customUrl = customSlots[section.imageSlot.slotId];
  const effectiveSrc = !imgError && (customUrl || section.imageSlot.imageSrc);

  const isLeft = section.imagePosition === 'left';

  const handleOpenSlotConfig = () => {
    setSelectedSlotId(section.imageSlot.slotId);
    setIsAssetDrawerOpen(true);
  };

  return (
    <article className="w-full py-20 md:py-32 border-t border-[#E8E1D7] bg-[#FAF8F5] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
          isLeft ? '' : 'lg:flex-row-reverse'
        }`}>

          {/* Media Column (6 cols) with Apple-smooth Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-6 ${isLeft ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <motion.div
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
              className="relative group overflow-hidden rounded-[14px] card-thick-border border-2 border-[#14171A] bg-[#171B20] shadow-xs hover:shadow-xl hover:border-[#14171A] transition-all duration-300"
            >
              <div className="relative aspect-[4/3] w-full">
                {effectiveSrc ? (
                  <img
                    src={effectiveSrc}
                    alt={section.imageSlot.altText}
                    width={1200}
                    height={900}
                    referrerPolicy="no-referrer"
                    loading={isFirst ? 'eager' : 'lazy'}
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-[1.018]"
                  />
                ) : (
                  /* Editorial Architectural Slot Plate (Zero-Broken-Image Fallback) */
                  <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 bg-[#181C21] text-[#C4D0D9] select-none">
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono uppercase text-[#B89B7D]">
                        <span>CHAPTER {section.indexNumber}</span>
                      </div>
                      <span className="text-[10px] font-mono tracking-widest uppercase border border-[#3A4654] px-2 py-0.5 bg-[#12161B]/80 text-[#A2B6C6]">
                        {section.imageSlot.aspectRatio}
                      </span>
                    </div>

                    <div className="my-auto text-center py-4">
                      <p className="font-serif text-lg text-[#FAF8F5]">
                        {section.imageSlot.title}
                      </p>
                      <p className="mt-1 text-xs text-[#8A98A6] font-light max-w-xs mx-auto leading-relaxed">
                        {section.imageSlot.altText}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#29323E] text-[11px]">
                      <span className="font-mono text-[#7D8F9E]">
                        YOUR SOUL EDITORIAL ARCHIVE
                      </span>
                    </div>

                  </div>
                )}
              </div>


            </motion.div>
          </motion.div>

          {/* Narrative Text Column (6 cols) with Staggered Entrance */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-6 flex flex-col justify-center ${isLeft ? 'lg:order-2' : 'lg:order-1'}`}
          >
            
            {/* Editorial Number & Kicker */}
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#7D7164] font-medium font-editorial-kicker">
              <span className="font-mono text-[13px] text-[#14171A] font-semibold">{section.indexNumber}</span>
              <span aria-hidden="true" className="text-[#C4B9AC]">/</span>
              <span>{section.kicker}</span>
            </div>

            {/* Primary Headline */}
            <h2 className="mt-3 font-editorial-heading text-[#14171A]">
              {section.title}
            </h2>

            {/* Lead Narrative */}
            <p className="mt-4 font-editorial-lead text-base sm:text-lg text-[#262A30]">
              {section.leadNarrative}
            </p>

            {/* Body Narrative */}
            <p className="mt-4 text-sm sm:text-base text-[#524B43] leading-relaxed max-w-prose font-light">
              {section.bodyNarrative}
            </p>

            {/* Key Pillars */}
            {section.keyPillars && section.keyPillars.length > 0 && (
              <div className="mt-6 pt-6 border-t border-[#EAE3D9]">
                <ul className="space-y-3">
                  {section.keyPillars.map((pillar, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#3E3832]">
                      <span className="text-[#B89B7D] font-serif font-bold text-sm leading-none mt-0.5">·</span>
                      <span className="leading-snug">{pillar}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pull Quote */}
            {section.quote && (
              <blockquote className="mt-8 pt-6 border-t border-[#E2D9CE]">
                <p className="font-editorial-quote text-base sm:text-lg text-[#1C2026]">
                  "{section.quote.text}"
                </p>
                <footer className="mt-2 font-editorial-kicker text-xs text-[#7D7164]">
                  — {section.quote.author}
                </footer>
              </blockquote>
            )}

          </motion.div>

        </div>

      </div>
    </article>
  );
};
