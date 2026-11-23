import React, { memo } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useMotionPreferences } from '../context/MotionContext';
import { Instagram, Phone, MessageCircle, MapPin, ExternalLink, Sparkles, Star } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, GOOGLE_REVIEW_URL } from '../config/links';
import { buildWhatsAppLink } from '../utils/whatsapp';
import { motion } from 'motion/react';

export const Footer: React.FC = memo(() => {
  const { setMode, navigateTo, navigateToSection } = useNavigation();
  const { reducedMotion, toggleReducedMotion } = useMotionPreferences();

  return (
    <footer className="w-full border-t border-border bg-surface text-dark pt-16 sm:pt-20 pb-12 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-border">
          
          {/* Col 1: Brand & Philosophy (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Original YOUR SOUL Logo — Rendered transparently with zero white card or artificial box */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  navigateTo('home', 'salon');
                }}
                className="inline-block cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark"
                aria-label="YOUR SOUL — Salon & Academy Home"
              >
                <img
                  src="/images/brand/your-soul-logo-240.webp"
                srcSet="/images/brand/your-soul-logo-240.webp 1x, /images/brand/your-soul-logo-480.webp 2x"
                  alt="YOUR SOUL — Hair | Beauty | Nails | Makeup"
                  className="h-11 sm:h-12 w-auto object-contain transition-opacity hover:opacity-90"
                  width={156}
                  height={52}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            </div>
            
            <p className="text-sm text-muted font-light leading-relaxed max-w-md">
              An architectural beauty sanctuary and accredited education institution dedicated to bespoke hair sculpting, advanced dermal therapy, and professional mastery. Guided by European discipline, botanical science, and unhurried personal care.
            </p>

            {/* Social Links & Verified Channels */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <motion.a
                whileHover={{ y: -2, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.98 }}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-1.5 rounded-[8px] bg-light border border-border text-xs font-mono uppercase tracking-wider text-dark hover:text-primary hover:border-primary/50 transition-colors shadow-2xs hover:shadow-xs"
                aria-label={`${INSTAGRAM_HANDLE} on Instagram (opens in new tab)`}
              >
                <Instagram className="h-3.5 w-3.5 text-primary" />
                <span>{INSTAGRAM_HANDLE}</span>
                <ExternalLink className="h-3 w-3 text-subtle" />
              </motion.a>

              <motion.a
                whileHover={{ y: -2, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.98 }}
                href={buildWhatsAppLink('chat')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-1.5 rounded-[8px] bg-light border border-border text-xs font-mono uppercase tracking-wider text-dark hover:text-accent hover:border-accent/50 transition-colors shadow-2xs hover:shadow-xs"
                aria-label="WhatsApp: 095538 88432 (opens in new tab)"
              >
                <MessageCircle className="h-3.5 w-3.5 text-whatsapp" />
                <span>WhatsApp: 095538 88432</span>
              </motion.a>

              <motion.a
                whileHover={{ y: -2, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.98 }}
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-1.5 rounded-[8px] bg-light border border-border text-xs font-mono uppercase tracking-wider text-dark hover:text-primary hover:border-primary/50 transition-colors shadow-2xs hover:shadow-xs"
                aria-label="Google Reviews (opens in new tab)"
              >
                <Star className="h-3.5 w-3.5 text-primary" />
                <span>Google Reviews</span>
                <ExternalLink className="h-3 w-3 text-subtle" />
              </motion.a>
            </div>
          </div>

          {/* Col 2: Salon Division Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <span className="block font-editorial-kicker text-xs text-primary font-semibold">
              Your Soul Salon
            </span>
            <ul className="text-xs sm:text-sm text-muted">
              <li>
                <button
                  type="button"
                  onClick={() => { setMode('salon'); navigateTo('home', 'salon'); }}
                  className="min-h-[44px] inline-flex items-center hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Salon Introduction
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setMode('salon'); navigateTo('about', 'salon'); }}
                  className="min-h-[44px] inline-flex items-center hover:text-primary transition-colors cursor-pointer text-left"
                >
                  About Our Founders
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setMode('salon'); navigateTo('services', 'salon'); }}
                  className="min-h-[44px] inline-flex items-center hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Haute Hair &amp; Dermal Menu
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setMode('salon'); navigateTo('contact', 'salon'); }}
                  className="min-h-[44px] inline-flex items-center hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Appointments &amp; Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Academy Division Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <span className="block font-editorial-kicker text-xs text-accent font-semibold">
              Your Soul Academy
            </span>
            <ul className="text-xs sm:text-sm text-muted">
              <li>
                <button
                  type="button"
                  onClick={() => { setMode('academy'); navigateTo('home', 'academy'); }}
                  className="min-h-[44px] inline-flex items-center hover:text-accent transition-colors cursor-pointer text-left"
                >
                  Academy Overview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setMode('academy'); navigateTo('about', 'academy'); }}
                  className="min-h-[44px] inline-flex items-center hover:text-accent transition-colors cursor-pointer text-left"
                >
                  About Our Trainers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateToSection('services', 'academy', 'academy-courses')}
                  className="min-h-[44px] inline-flex items-center hover:text-dark transition-colors cursor-pointer text-left"
                >
                  Academy Courses (Basic – Expert)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setMode('academy'); navigateTo('services', 'academy'); }}
                  className="min-h-[44px] inline-flex items-center hover:text-dark transition-colors cursor-pointer text-left"
                >
                  Accredited Diplomas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setMode('academy'); navigateTo('contact', 'academy'); }}
                  className="min-h-[44px] inline-flex items-center hover:text-dark transition-colors cursor-pointer text-left"
                >
                  Admissions &amp; Campus
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Sanctuary & Campus Location (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5 text-xs text-muted">
            <span className="block font-editorial-kicker text-xs text-subtle">
              Atelier &amp; Concierge
            </span>
            <a
              href="https://www.google.com/maps/search/?api=1&query=1st+Floor,+JKC+College+Rd,+Main+Rd,+6th+Line,+Vijayapuri+Colony,+Guntur,+Andhra+Pradesh+522006"
              target="_blank"
              rel="noopener noreferrer"
              className="group block font-mono text-dark hover:text-primary transition-colors leading-relaxed"
            >
              <div className="flex items-start gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                <span>
                  1st Floor, JKC College Rd, Main Rd, 6th Line<br />
                  Vijayapuri Colony, Guntur<br />
                  Andhra Pradesh 522006
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] text-subtle group-hover:text-primary mt-1 underline underline-offset-2">
                Open in Google Maps <ExternalLink className="h-3 w-3" />
              </span>
            </a>

            <div className="pt-2 font-mono text-[11px] text-muted space-y-1.5">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span>Contact: </span>
                <a href="tel:09553888432" className="inline-flex items-center min-h-[44px] hover:text-primary text-dark font-semibold underline underline-offset-2">
                  095538 88432
                </a>
              </div>
              <div className="text-subtle">Mon–Sun: 09:00–21:00 IST (7 Days Open · 12 Hourly Slots)</div>
            </div>
          </div>

        </div>

        {/* Accessibility & Motion Settings Strip */}
        <div className="py-6 border-b border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted">
            <span className="font-semibold text-dark">Accessibility Preferences:</span> Adjust website motion and transitions to suit your comfort.
          </div>

          {/* Reduce Motion Toggle Switch */}
          <button
            type="button"
            role="switch"
            aria-checked={reducedMotion}
            onClick={toggleReducedMotion}
            className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-[10px] border text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer min-h-[44px] ${
              reducedMotion
                ? 'bg-accent text-light border-accent shadow-xs'
                : 'bg-light text-dark border-border hover:border-dark/40'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className={`h-3.5 w-3.5 ${reducedMotion ? 'text-light' : 'text-primary'}`} />
              <span>Reduce Motion</span>
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-[6px] ${
                reducedMotion
                  ? 'bg-white/20 text-white'
                  : 'bg-surface-2 text-muted'
              }`}
            >
              {reducedMotion ? 'ENABLED' : 'OFF'}
            </span>
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-subtle">
          <p>© {new Date().getFullYear()} YOUR SOUL — Salon &amp; Academy. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3">
            <span>Cruelty-Free European Formulations</span>
            <span aria-hidden="true" className="text-border-strong">·</span>
            <span>Licensed State Cosmetology Board</span>
            <span aria-hidden="true" className="text-border-strong">·</span>
            <span>Biophilic Architecture</span>
          </div>
        </div>

      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
