import React, { useState } from 'react';
import { BannerConfig } from '../types';
import { useAssets } from '../context/AssetContext';
import { SlidersHorizontal, ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface BannerSlotProps {
  banner: BannerConfig;
  priority?: boolean;
  isHero?: boolean;
  onCtaClick?: () => void;
  ctaText?: string;
  secondaryCtaText?: string;
  onSecondaryCtaClick?: () => void;
  showScrollIndicator?: boolean;
}

export const BannerSlot: React.FC<BannerSlotProps> = ({
  banner,
  priority = false,
  isHero = false,
  onCtaClick,
  ctaText,
  secondaryCtaText,
  onSecondaryCtaClick,
  showScrollIndicator = false,
}) => {
  const { customSlots, setSelectedSlotId, setIsAssetDrawerOpen } = useAssets();
  const [imgError, setImgError] = useState(false);

  const customUrl = customSlots[banner.slotId];
  const effectiveSrc = !imgError && (customUrl || banner.imageSrc);

  const handleOpenConfig = () => {
    setSelectedSlotId(banner.slotId);
    setIsAssetDrawerOpen(true);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF8F5] px-4 sm:px-6 lg:px-8 py-3 sm:py-5">
      <div className="mx-auto max-w-7xl">
        
        {/* ====================================================================
            CAMPAIGN PHOTOGRAPHIC HERO CANVAS WITH DIRECT TEXT OVERLAY
            Text, heading, narrative, and CTAs appear directly ON the photograph.
            ==================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative group w-full overflow-hidden rounded-[18px] sm:rounded-[22px] border border-[#DFD6CB] bg-[#173451] shadow-[0_12px_36px_rgba(23,52,81,0.1)] aspect-[2.4/1] lg:aspect-[2.5/1] min-h-[460px] sm:min-h-[490px] lg:min-h-[520px] max-h-[560px]"
          style={
            {
              '--focal-m': banner.focalPoint?.mobile || '50% 35%',
              '--focal-t': banner.focalPoint?.tablet || '50% 35%',
              '--focal-d': banner.focalPoint?.desktop || '50% 40%',
            } as React.CSSProperties
          }
        >
          {/* Real High-Resolution Photographic Canvas */}
          {effectiveSrc ? (
            <img
              src={effectiveSrc}
              alt={banner.altText}
              width={1920}
              height={1080}
              referrerPolicy="no-referrer"
              loading={priority ? 'eager' : 'lazy'}
              onError={() => setImgError(true)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-[1.018]"
              style={{
                objectPosition: 'var(--focal-m)',
              }}
            />
          ) : (
            /* Architectural Fallback Canvas */
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 bg-[#0E1724] text-[#E2EDF5]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D95A1E]">
                  SLOT-{banner.slotNumber}: {banner.slotId}
                </span>
                <span className="text-xs font-mono text-[#8C9AA8]">1920 × 1080 PX</span>
              </div>
            </div>
          )}

          {/* Directional Cinematic Scrim Overlay (Ensures WCAG AAA text legibility while preserving photographic vibrance) */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-[#0A121E]/95 via-[#0A121E]/55 to-[#0A121E]/20" 
            aria-hidden="true" 
          />
          <div 
            className="absolute inset-0 bg-gradient-to-r from-[#0A121E]/75 via-transparent to-transparent hidden md:block" 
            aria-hidden="true" 
          />



          {/* ====================================================================
              DIRECT HERO TEXT & CTA OVERLAY (Inside the Photographic Area)
              ==================================================================== */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 sm:p-10 md:p-14 lg:p-16">
            <div className="max-w-4xl">
              
              {/* Kicker Tag */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 mb-3.5 sm:mb-4"
              >
                <span className="font-editorial-kicker text-xs font-semibold tracking-widest uppercase text-[#F3C7B0] drop-shadow-xs">
                  {banner.kicker}
                </span>
              </motion.div>

              {/* Main Headline (Directly Overlaid on Photo) */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className={`text-white text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] ${
                  isHero ? 'font-editorial-display' : 'font-editorial-heading'
                }`}
              >
                {banner.title}
              </motion.h1>

              {/* Supporting Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 font-editorial-lead text-sm sm:text-base lg:text-lg text-[#F2EDE5]/90 max-w-2xl leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]"
              >
                {banner.subtitle}
              </motion.p>

              {/* Primary & Secondary Action CTAs (Standardized 8-12px rounded rectangles) */}
              {(ctaText || secondaryCtaText) && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
                >
                  {ctaText && onCtaClick && (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onCtaClick}
                      className="btn-brand-primary"
                    >
                      <span>{ctaText}</span>
                      <ArrowUpRight className="h-4 w-4 stroke-[2]" />
                    </motion.button>
                  )}

                  {secondaryCtaText && onSecondaryCtaClick && (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onSecondaryCtaClick}
                      className="btn-hero-secondary"
                    >
                      <span>{secondaryCtaText}</span>
                    </motion.button>
                  )}
                </motion.div>
              )}

            </div>

            {/* Scroll Indicator (Hero Only) */}
            {isHero && showScrollIndicator && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="hidden md:flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#E2EDF5]/75 absolute bottom-8 right-10"
              >
                <span>Scroll to Explore</span>
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                >
                  <ArrowDown className="h-3.5 w-3.5 text-[#D95A1E]" />
                </motion.div>
              </motion.div>
            )}

          </div>

        </motion.div>

      </div>
    </section>
  );
};
