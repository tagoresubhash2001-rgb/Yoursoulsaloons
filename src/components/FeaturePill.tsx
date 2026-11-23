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
    warm: 'bg-surface text-dark border-border hover:bg-surface-2 hover:border-border-strong active:bg-border',
    orange: 'bg-primary/10 text-primary-hover border-primary/25 hover:bg-primary/18 hover:border-primary/40 active:bg-primary/25',
    navy: 'bg-accent/8 text-accent border-accent/20 hover:bg-accent/14 hover:border-accent/35 active:bg-accent/20',
    charcoal: 'bg-dark/6 text-dark border-dark/15 hover:bg-dark/12 hover:border-dark/25 active:bg-dark/18',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-3 py-1.5 min-h-[44px] gap-1.5',
    md: 'text-xs px-3.5 py-2 min-h-[44px] gap-2',
  };

  const Component = interactive ? motion.button : motion.div;

  return (
    <Component
      type={interactive ? 'button' : undefined}
      onClick={onClick}
      whileHover={interactive ? { y: -1.5, transition: { duration: 0.15 } } : undefined}
      whileTap={interactive ? { scale: 0.97, transition: { duration: 0.1 } } : undefined}
      className={`inline-flex items-center font-medium font-sans border rounded-[8px] transition-all duration-150 select-none text-left tracking-wide cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${className}`}
    >
      {icon ? (
        <span className="shrink-0">{icon}</span>
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 opacity-80" aria-hidden="true" />
      )}
      <span className="whitespace-normal leading-tight">{label}</span>
    </Component>
  );
};
