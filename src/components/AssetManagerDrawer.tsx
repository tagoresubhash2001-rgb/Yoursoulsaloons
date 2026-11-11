import React, { useState, useEffect } from 'react';
import { useAssets } from '../context/AssetContext';
import { useNavigation } from '../context/NavigationContext';
import { BANNERS } from '../config/siteContent';
import { X, SlidersHorizontal, Check, RefreshCw, Info, ExternalLink, Image as ImageIcon, MapPin, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AssetManagerDrawer: React.FC = () => {
  const {
    isAssetDrawerOpen,
    setIsAssetDrawerOpen,
    selectedSlotId,
    setSelectedSlotId,
    customSlots,
    setSlotImage,
    resetSlots,
  } = useAssets();

  const { navigateTo, currentPath } = useNavigation();

  const [activeTab, setActiveTab] = useState<'all' | 'salon' | 'academy'>('all');
  const [inputUrls, setInputUrls] = useState<Record<string, string>>({});
  const [successSaved, setSuccessSaved] = useState<string | null>(null);
  const [previewBreakpoint, setPreviewBreakpoint] = useState<Record<string, 'mobile' | 'tablet' | 'desktop'>>({});

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAssetDrawerOpen) {
        setIsAssetDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAssetDrawerOpen, setIsAssetDrawerOpen]);

  if (!isAssetDrawerOpen) return null;

  const bannerList = Object.values(BANNERS).sort((a, b) => a.slotNumber - b.slotNumber);

  const filteredBanners = bannerList.filter((b) => {
    if (activeTab === 'salon') return b.division === 'salon';
    if (activeTab === 'academy') return b.division === 'academy';
    return true;
  });

  const handleSaveSlot = (slotId: string) => {
    const url = inputUrls[slotId] ?? (customSlots[slotId] || '');
    setSlotImage(slotId, url);
    setSuccessSaved(slotId);
    setTimeout(() => setSuccessSaved(null), 2500);
  };

  const handleClearSlot = (slotId: string) => {
    setSlotImage(slotId, '');
    setInputUrls((prev) => ({ ...prev, [slotId]: '' }));
  };

  const handleNavigateToRoute = (banner: typeof bannerList[0]) => {
    navigateTo(banner.page, banner.division);
    setIsAssetDrawerOpen(false);
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="asset-drawer-title"
        className="fixed inset-0 z-50 flex justify-end bg-[#14171A]/60 backdrop-blur-xs"
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsAssetDrawerOpen(false);
        }}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#FAF8F5] text-[#14171A] h-full shadow-2xl flex flex-col border-l border-[#DCD3C7]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#E8E0D5] bg-[#F2EDE5]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center border border-[#14171A] bg-[#14171A] text-[#FAF8F5]">
                <SlidersHorizontal className="h-4 w-4" />
              </div>
              <div>
                <h2 id="asset-drawer-title" className="font-editorial-heading text-xl text-[#14171A] font-medium">
                  Photo Asset Slot Inspector &amp; Route Registry
                </h2>
                <p className="text-xs text-[#7D7164] font-mono">
                  8 Mandatory Banners · Verified Local Photography &amp; Focal Points
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsAssetDrawerOpen(false)}
              className="p-2 text-[#7D7164] hover:text-[#14171A] cursor-pointer transition-colors"
              aria-label="Close inspector"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Tab Filters */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-[#E8E0D5] bg-[#FAF8F5] text-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 font-mono uppercase tracking-wider text-[11px] cursor-pointer transition-colors ${
                  activeTab === 'all' ? 'bg-[#14171A] text-[#FAF8F5]' : 'bg-[#EAE2D7] text-[#5C5349]'
                }`}
              >
                All 8 Slots
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('salon')}
                className={`px-3 py-1.5 rounded-[8px] font-mono uppercase tracking-wider text-[11px] cursor-pointer transition-colors ${
                  activeTab === 'salon' ? 'bg-[#0E2E54] text-[#FAF8F5]' : 'bg-[#EAE2D7] text-[#5C5349] hover:text-[#0E2E54]'
                }`}
              >
                Salon (/salon/*)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('academy')}
                className={`px-3 py-1.5 rounded-[8px] font-mono uppercase tracking-wider text-[11px] cursor-pointer transition-colors ${
                  activeTab === 'academy' ? 'bg-[#D95A1E] text-[#FAF8F5]' : 'bg-[#EAE2D7] text-[#5C5349] hover:text-[#D95A1E]'
                }`}
              >
                Academy (/academy/*)
              </button>
            </div>

            <button
              type="button"
              onClick={resetSlots}
              className="flex items-center gap-1.5 text-[11px] font-mono text-[#7D7164] hover:text-red-700 cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Reset Overrides</span>
            </button>
          </div>

          {/* Instruction Note */}
          <div className="p-4 mx-6 mt-4 border border-[#DFD6CB] bg-[#F2EDE5] text-xs text-[#524B43] flex items-start gap-3">
            <Info className="h-4 w-4 text-[#B89B7D] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#14171A]">Verified Photographic Manifest: </span>
              All 8 slots are mapped to their respective routes with calibrated breakpoint focal points (Mobile, Tablet, Desktop) for optimal portrait and landscape framing.
            </div>
          </div>

          {/* Scrollable Slots List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {filteredBanners.map((banner) => {
              const hasCustom = Boolean(customSlots[banner.slotId]);
              const isHighlighted = selectedSlotId === banner.slotId;
              const isCurrentRoute = currentPath === banner.route;
              const currentUrl = inputUrls[banner.slotId] ?? (customSlots[banner.slotId] || '');
              const bp = previewBreakpoint[banner.slotId] || 'desktop';
              const activeFocal = bp === 'mobile' ? banner.focalPoint.mobile : (bp === 'tablet' ? banner.focalPoint.tablet : banner.focalPoint.desktop);

              return (
                <div
                  key={banner.slotId}
                  id={`slot-${banner.slotId}`}
                  className={`border p-5 transition-all ${
                    isHighlighted
                      ? 'border-[#14171A] bg-[#F4EFEB] ring-1 ring-[#14171A]'
                      : 'border-[#E0D7CB] bg-[#FBF9F7]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#7D7164]">
                        <span className="font-bold text-[#14171A]">SLOT #{banner.slotNumber.toString().padStart(2, '0')}</span>
                        <span>·</span>
                        <span className="uppercase text-[#634E35] font-semibold">
                          {banner.division === 'salon' ? 'Salon Division' : 'Academy Division'}
                        </span>
                        <span>·</span>
                        <span className="px-1.5 py-0.5 bg-[#E6DDD1] text-[#14171A] font-bold rounded-xs">
                          {banner.route}
                        </span>
                      </div>

                      <h3 className="mt-1 font-editorial-heading text-lg text-[#14171A]">
                        {banner.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleNavigateToRoute(banner)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider cursor-pointer transition-colors ${
                          isCurrentRoute
                            ? 'bg-[#14171A] text-[#FAF8F5]'
                            : 'bg-[#EAE2D7] hover:bg-[#14171A] hover:text-[#FAF8F5] text-[#14171A]'
                        }`}
                        title={`Navigate to ${banner.route}`}
                      >
                        <Eye className="h-3 w-3" />
                        <span>{isCurrentRoute ? 'Active Page' : 'Go to Page'}</span>
                      </button>
                      <span className="text-[10px] font-mono tracking-widest uppercase border border-[#D5CABC] px-2 py-0.5 bg-[#FAF8F5] text-[#5C5349]">
                        {banner.aspectRatio} · {banner.recommendedResolution}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail / Artwork Preview with Active Breakpoint Focal Point */}
                  <div className="mt-3 relative aspect-[16/9] w-full border border-[#D6CBBF] overflow-hidden bg-[#181B20]">
                    <img
                      src={customSlots[banner.slotId] || banner.imageSrc}
                      alt={banner.altText}
                      style={{ objectPosition: activeFocal }}
                      className="w-full h-full object-cover transition-all duration-300"
                    />
                    <div className="absolute bottom-2 left-2 bg-[#14171A]/90 text-[#FAF8F5] px-2 py-0.5 text-[10px] font-mono flex items-center gap-2">
                      <span>{banner.imageSrc}</span>
                      <span className="text-[#B89B7D]">·</span>
                      <span>Focal ({bp}): {activeFocal}</span>
                    </div>
                  </div>

                  {/* Responsive Focal Point Breakpoint Switcher */}
                  <div className="mt-2.5 flex items-center justify-between text-xs bg-[#EAE2D7]/60 px-3 py-1.5 border border-[#DFD6CB]">
                    <span className="font-mono text-[11px] text-[#6E6457]">Preview Breakpoint Focal:</span>
                    <div className="flex items-center gap-1.5 font-mono text-[10px]">
                      {(['mobile', 'tablet', 'desktop'] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setPreviewBreakpoint((prev) => ({ ...prev, [banner.slotId]: mode }))}
                          className={`px-2 py-0.5 uppercase tracking-wider cursor-pointer ${
                            bp === mode
                              ? 'bg-[#14171A] text-[#FAF8F5]'
                              : 'bg-[#FAF8F5] text-[#5C5349] hover:bg-[#DFD6CB]'
                          }`}
                        >
                          {mode}: {banner.focalPoint[mode]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-[#524B43] space-y-1">
                    <div>
                      <span className="font-mono text-[#7D7164]">LOCAL PRODUCTION ASSET:</span>{' '}
                      <code className="bg-[#EAE2D7] px-1.5 py-0.5 font-mono text-[11px] text-[#14171A]">
                        public/banners/{banner.slotId}.jpg (1920 × 1080)
                      </code>
                    </div>
                    <div>
                      <span className="font-mono text-[#7D7164]">MAPPED ROUTE:</span>{' '}
                      <span className="font-mono text-[#14171A] font-semibold">{banner.route}</span>
                      <span className="mx-2 text-[#C4B9AC]">·</span>
                      <span className="font-mono text-[#7D7164]">DIVISION:</span>{' '}
                      <span className="capitalize">{banner.division}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[#7D7164]">PHOTO BRIEF:</span> {banner.altText}
                    </div>
                  </div>

                  {/* Input for custom URL / local path */}
                  <div className="mt-4 pt-3 border-t border-[#EAE3D9] flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="text"
                      value={currentUrl}
                      onChange={(e) =>
                        setInputUrls((prev) => ({ ...prev, [banner.slotId]: e.target.value }))
                      }
                      placeholder="Paste image URL (https://...) or local path (/banners/...)"
                      className="flex-1 rounded-[8px] border border-[#D5CABC] bg-[#FAF8F5] px-3 py-1.5 text-xs text-[#14171A] focus:border-[#D95A1E] focus:ring-1 focus:ring-[#D95A1E] focus:outline-hidden"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSaveSlot(banner.slotId)}
                        className="btn-brand-primary min-h-[36px] px-3 py-1 text-xs"
                      >
                        {successSaved === banner.slotId ? 'Saved!' : 'Apply'}
                      </button>
                      {hasCustom && (
                        <button
                          type="button"
                          onClick={() => handleClearSlot(banner.slotId)}
                          className="px-2.5 py-1.5 rounded-[8px] text-xs font-medium text-[#7D7164] hover:text-red-700 border border-[#D5CABC] cursor-pointer whitespace-nowrap min-h-[36px]"
                          title="Revert to architectural plate"
                        >
                          Revert
                        </button>
                      )}
                    </div>
                  </div>

                  {hasCustom && (
                    <div className="mt-2 text-[11px] font-mono text-emerald-800 flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5" />
                      <span>Custom image override currently active</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#E8E0D5] bg-[#F2EDE5] flex items-center justify-between text-xs text-[#7D7164]">
            <span className="font-mono text-[11px]">YOUR SOUL ASSET REGISTRY v2.0</span>
            <button
              type="button"
              onClick={() => setIsAssetDrawerOpen(false)}
              className="btn-brand-navy min-h-[38px] px-4 py-2 text-xs"
            >
              Done Inspecting
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
