import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface FeaturePillProps {
  label: string;
  onClick?: () => void;
  variant?: 'warm' | 'navy' | 'orange' | 'charcoal';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  interactive?: boolean;
  className?: string;
}

export const FeaturePill: React.FC<FeaturePillProps> = ({
  label,
  onClick,
  variant = 'warm',
  size = 'md',
  icon,
  interactive = true,
  className = '',
}) => {
  const variantStyles = {
    warm: 'bg-[#F2EDE5] text-[#14171A] border-[#DFD6CB] hover:bg-[#EAE2D7] hover:border-[#CFC3B4] active:bg-[#E2D8CC]',
    orange: 'bg-[#E85D1A]/10 text-[#CF4E12] border-[#E85D1A]/25 hover:bg-[#E85D1A]/18 hover:border-[#E85D1A]/40 active:bg-[#E85D1A]/25',
    navy: 'bg-[#0E2E54]/8 text-[#0E2E54] border-[#0E2E54]/20 hover:bg-[#0E2E54]/14 hover:border-[#0E2E54]/35 active:bg-[#0E2E54]/20',
    charcoal: 'bg-[#14171A]/6 text-[#14171A] border-[#14171A]/15 hover:bg-[#14171A]/12 hover:border-[#14171A]/25 active:bg-[#14171A]/18',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-1 min-h-[28px] gap-1.5',
    md: 'text-xs px-3.5 py-1.5 min-h-[34px] gap-2',
  };

  const Component = interactive ? motion.button : motion.div;

  return (
    <Component
      type={interactive ? 'button' : undefined}
      onClick={onClick}
      whileHover={interactive ? { y: -1.5, transition: { duration: 0.15 } } : undefined}
      whileTap={interactive ? { scale: 0.97, transition: { duration: 0.1 } } : undefined}
      className={`inline-flex items-center font-medium font-sans border rounded-[8px] transition-all duration-150 select-none text-left tracking-wide cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#E85D1A] ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${className}`}
    >
      {icon ? (
        <span className="shrink-0">{icon}</span>
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-[#E85D1A] shrink-0 opacity-80" aria-hidden="true" />
      )}
      <span className="whitespace-normal leading-tight">{label}</span>
    </Component>
  );
};
