/**
 * Reusable animation components using Framer Motion
 */

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  useFadeInAnimation,
  useSlideInAnimation,
  useScaleAnimation,
} from '@/hooks';

// ===== FADE IN WRAPPER =====
interface FadeInProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}

export function FadeIn({ children, duration = 0.5, delay = 0, className }: FadeInProps) {
  const animation = useFadeInAnimation(duration, delay);

  return (
    <motion.div initial={animation.initial} animate={animation.animate} transition={animation.transition} className={className}>
      {children}
    </motion.div>
  );
}

// ===== SLIDE IN WRAPPER =====
interface SlideInProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  delay?: number;
  className?: string;
}

export function SlideIn({ children, direction = 'up', duration = 0.5, delay = 0, className }: SlideInProps) {
  const animation = useSlideInAnimation(direction, duration, delay);

  return (
    <motion.div initial={animation.initial} animate={animation.animate} transition={animation.transition} className={className}>
      {children}
    </motion.div>
  );
}

// ===== SCALE IN WRAPPER =====
interface ScaleInProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}

export function ScaleIn({ children, duration = 0.5, delay = 0, className }: ScaleInProps) {
  const animation = useScaleAnimation(duration, delay);

  return (
    <motion.div initial={animation.initial} animate={animation.animate} transition={animation.transition} className={className}>
      {children}
    </motion.div>
  );
}

// ===== STAGGER CONTAINER =====
interface StaggerProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Stagger({ children, delay = 0, className }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===== HOVER SCALE =====
interface HoverScaleProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

export function HoverScale({ children, scale = 1.05, className }: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===== BOUNCE IN =====
interface BounceInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function BounceIn({ children, delay = 0, className }: BounceInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay,
        type: 'spring',
        stiffness: 370,
        damping: 40,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===== ROTATE IN =====
interface RotateInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function RotateIn({ children, delay = 0, className }: RotateInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -10 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{
        delay,
        duration: 0.5,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===== FLIP CARD =====
interface FlipCardProps {
  children: ReactNode;
  className?: string;
}

export function FlipCard({ children, className }: FlipCardProps) {
  return (
    <motion.div
      whileHover={{ rotateY: 10, z: 100 }}
      whileTap={{ rotateY: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={className}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

// ===== GRADIENT ANIMATION =====
interface GradientAnimProps {
  children: ReactNode;
  className?: string;
}

export function GradientAnim({ children, className }: GradientAnimProps) {
  return (
    <motion.div
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 8,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
      className={className}
      style={{
        backgroundSize: '200% 200%',
      }}
    >
      {children}
    </motion.div>
  );
}
