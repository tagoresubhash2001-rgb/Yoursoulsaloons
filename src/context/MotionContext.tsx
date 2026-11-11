import React, { createContext, useContext, useState, useEffect } from 'react';
import { MotionConfig } from 'motion/react';

interface MotionContextType {
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  setReducedMotion: (enabled: boolean) => void;
}

const MotionContext = createContext<MotionContextType | undefined>(undefined);

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reducedMotion, setReducedMotionState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('yoursoul_reduced_motion');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
    localStorage.setItem('yoursoul_reduced_motion', String(reducedMotion));
  }, [reducedMotion]);

  const toggleReducedMotion = () => {
    setReducedMotionState((prev) => !prev);
  };

  const setReducedMotion = (enabled: boolean) => {
    setReducedMotionState(enabled);
  };

  return (
    <MotionContext.Provider value={{ reducedMotion, toggleReducedMotion, setReducedMotion }}>
      <MotionConfig reducedMotion={reducedMotion ? 'always' : 'user'}>
        {children}
      </MotionConfig>
    </MotionContext.Provider>
  );
};

export const useMotionPreferences = () => {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error('useMotionPreferences must be used within a MotionProvider');
  }
  return context;
};
