import React, { useState, memo } from 'react';
import { EditorialSectionData } from '../types';
import { useAssets } from '../context/AssetContext';
import { motion } from 'motion/react';

interface EditorialSectionProps {
  section: EditorialSectionData;
  isFirst?: boolean;
}

export const EditorialSection: React.FC<EditorialSectionProps> = memo(({ section, isFirst = false }) => {
  const { customSlots } = useAssets();
  const [imgError, setImgError] = useState(false);

  const customUrl = customSlots[section.imageSlot.slotId];
  const effectiveSrc = !imgError && (customUrl || section.imageSlot.imageSrc);

  const isLeft = section.imagePosition === 'left';

  return (
    <article className="w-full py-20 md:py-32 border-t border-surface-2 bg-light overflow-hidden">
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
              className="relative group overflow-hidden rounded-[14px] card-thick-border border-dark-line bg-dark shadow-xs hover:shadow-xl hover:border-dark transition-all duration-300"
            >
              <div className="relative aspect-[4/3] w-full">
                {effectiveSrc ? (
                  <img
                    src={effectiveSrc}
                    srcSet={customUrl ? undefined : section.imageSlot.imageSrcSet}
                    sizes="(max-width: 1024px) 100vw, 600px"
                    alt={section.imageSlot.altText}
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-[1.018]"
                  />
                ) : (
                  /* Editorial Architectural Slot Plate (Zero-Broken-Image Fallback) */
                  <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 bg-dark text-mist select-none">
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono uppercase text-brass">
                        <span>CHAPTER {section.indexNumber}</span>
                      </div>
                      <span className="text-[10px] font-mono tracking-widest uppercase border border-dark-line px-2 py-0.5 bg-dark/80 text-mist">
                        {section.imageSlot.aspectRatio}
                      </span>
                    </div>

                    <div className="my-auto text-center py-4">
                      <p className="font-serif text-lg text-light">
                        {section.imageSlot.title}
                      </p>
                      <p className="mt-1 text-xs text-mist-dim font-light max-w-xs mx-auto leading-relaxed">
                        {section.imageSlot.altText}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-dark-line text-[11px]">
                      <span className="font-mono text-mist-dim">
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
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-subtle font-medium font-editorial-kicker">
              <span className="font-mono text-[13px] text-dark font-semibold">{section.indexNumber}</span>
              <span aria-hidden="true" className="text-border-strong">/</span>
              <span>{section.kicker}</span>
            </div>

            {/* Primary Headline */}
            <h2 className="mt-3 font-editorial-heading text-dark">
              {section.title}
            </h2>

            {/* Lead Narrative */}
            <p className="mt-4 font-editorial-lead text-base sm:text-lg text-dark">
              {section.leadNarrative}
            </p>

            {/* Body Narrative */}
            <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed max-w-prose font-light">
              {section.bodyNarrative}
            </p>

            {/* Key Pillars */}
            {section.keyPillars && section.keyPillars.length > 0 && (
              <div className="mt-6 pt-6 border-t border-surface-2">
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {section.keyPillars.map((pillar, i) => (
                    <li
                      key={i}
                      className="card-hover rounded-[12px] border border-border bg-surface px-4 py-3.5 text-sm text-text-soft leading-snug hover:border-primary/50"
                    >
                      <span className="block text-[11px] font-semibold tracking-wider text-primary mb-1">0{i + 1}</span>
                      {pillar}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pull Quote */}
            {section.quote && (
              <blockquote className="mt-8 pt-6 border-t border-border">
                <p className="font-editorial-quote text-base sm:text-lg text-dark-soft">
                  "{section.quote.text}"
                </p>
                <footer className="mt-2 font-editorial-kicker text-xs text-subtle">
                  — {section.quote.author}
                </footer>
              </blockquote>
            )}

          </motion.div>

        </div>

      </div>
    </article>
  );
});

EditorialSection.displayName = 'EditorialSection';
