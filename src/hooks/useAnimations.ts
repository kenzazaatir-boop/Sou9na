import { useRef, useEffect, useState } from 'react';
import { useAnimation, useInView } from 'framer-motion';

/**
 * Hook for element reveal animation on scroll
 * Enhanced version of useReveal with Framer Motion
 */
export function useRevealAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return {
    ref,
    controls,
    isInView,
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 100,
          damping: 15,
        },
      },
    },
  };
}

/**
 * Hook for smooth scroll animations
 */
export function useSmoothScroll() {
  const ref = useRef<HTMLDivElement>(null);

  const scrollToView = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return {
    ref,
    scrollToView,
  };
}

/**
 * Hook for parallax scroll effect
 */
export function useParallax() {
  const ref = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    ref,
    y: scrollY * 0.5,
    style: {
      transform: `translateY(${scrollY * 0.5}px)`,
    },
  };
}

/**
 * Hook for counting animation
 */
export function useCountAnimation(target: number, duration = 1, shouldCount = true) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView || !shouldCount) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      setCount(Math.floor(target * progress));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration, isInView, shouldCount]);

  return { count, ref };
}

/**
 * Hook for fade in animation on mount
 */
export function useFadeInAnimation(duration = 0.5, delay = 0) {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration,
      delay,
      ease: 'easeOut',
    },
  };
}

/**
 * Hook for slide in animation
 */
export function useSlideInAnimation(
  direction: 'left' | 'right' | 'up' | 'down' = 'up',
  duration = 0.5,
  delay = 0
) {
  const directionMap = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 },
  };

  const offset = directionMap[direction];

  return {
    initial: { opacity: 0, ...offset },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: {
      duration,
      delay,
      ease: 'easeOut',
    },
  };
}

/**
 * Hook for scale animation
 */
export function useScaleAnimation(duration = 0.5, delay = 0) {
  return {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration,
      delay,
      ease: 'easeOut',
    },
  };
}

/**
 * Hook for page transition animation
 */
export function usePageTransition() {
  return {
    variants: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: 'easeOut',
        },
      },
      exit: {
        opacity: 0,
        y: -20,
        transition: {
          duration: 0.3,
          ease: 'easeOut',
        },
      },
    },
  };
}
