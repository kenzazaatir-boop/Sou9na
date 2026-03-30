/**
 * Central export for all custom hooks
 */

// Existing hooks
export { useReveal } from './useReveal';
export { useIsMobile } from './use-mobile';

// Search and filtering
export { useSearch, useAdvancedSearch } from './useSearch';

// Pagination
export { usePagination, useInfiniteScroll } from './usePagination';

// Animations - re-export from useAnimations.ts
export {
  useRevealAnimation,
  useSmoothScroll,
  useParallax,
  useCountAnimation,
  useFadeInAnimation,
  useSlideInAnimation,
  useScaleAnimation,
  usePageTransition,
} from './useAnimations';

// SEO
export { useSEO } from './useSEO';

