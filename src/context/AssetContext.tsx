import React, { createContext, useContext, useState, useEffect } from 'react';
import { BANNERS } from '../config/siteContent';

interface AssetContextType {
  customSlots: Record<string, string>;
  setSlotImage: (slotId: string, url: string) => void;
  resetSlots: () => void;
  isAssetDrawerOpen: boolean;
  setIsAssetDrawerOpen: (open: boolean) => void;
  selectedSlotId: string | null;
  setSelectedSlotId: (slotId: string | null) => void;
}

const STORAGE_KEY = 'yoursoul_custom_assets_v1';

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customSlots, setCustomSlots] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isAssetDrawerOpen, setIsAssetDrawerOpen] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customSlots));
    } catch (e) {
      console.warn('Could not save custom assets to localStorage', e);
    }
  }, [customSlots]);

  const setSlotImage = (slotId: string, url: string) => {
    setCustomSlots((prev) => ({
      ...prev,
      [slotId]: url.trim(),
    }));
  };

  const resetSlots = () => {
    setCustomSlots({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <AssetContext.Provider
      value={{
        customSlots,
        setSlotImage,
        resetSlots,
        isAssetDrawerOpen,
        setIsAssetDrawerOpen,
        selectedSlotId,
        setSelectedSlotId,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

export const useAssets = () => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error('useAssets must be used within an AssetProvider');
  }
  return context;
};
