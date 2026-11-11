import React from 'react';
import { motion, useReducedMotion, Variants } from 'motion/react';

export interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number | 'some' | 'all';
  staggerChildren?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  distance = 28,
  delay = 0,
  duration = 0.65,
  className = '',
  once = true,
  amount = 0.15,
  staggerChildren,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (shouldReduceMotion || direction === 'none') return { x: 0, y: 0 };
    switch (direction) {
      case 'up':
        return { x: 0, y: distance };
      case 'down':
        return { x: 0, y: -distance };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialOffset = getInitialPosition();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: initialOffset.x,
      y: initialOffset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Apple-style deceleration curve
        when: 'beforeChildren',
        staggerChildren: staggerChildren || 0,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: '-40px 0px -40px 0px' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScrollRevealItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  distance?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}> = ({ children, className = '', distance = 24, direction = 'up' }) => {
  const shouldReduceMotion = useReducedMotion();

  const initialY = shouldReduceMotion || direction === 'none' ? 0 : direction === 'up' ? distance : direction === 'down' ? -distance : 0;
  const initialX = shouldReduceMotion || direction === 'none' ? 0 : direction === 'left' ? distance : direction === 'right' ? -distance : 0;

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: initialY, x: initialX },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};
