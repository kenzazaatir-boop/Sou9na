import { useMemo } from 'react';
import Fuse from 'fuse.js';
import type { Product } from '@/types';

interface UseSearchOptions {
  threshold?: number;
  includeScore?: boolean;
}

/**
 * Advanced search hook using Fuse.js for fuzzy matching
 * Supports searching products by name, description, category, location, artisan
 */
export function useSearch(
  items: Product[],
  searchTerm: string,
  options: UseSearchOptions = {}
) {
  const { threshold = 0.4, includeScore = false } = options;

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ['name', 'description', 'category', 'location', 'artisan', 'tags'],
        threshold,
        includeScore,
      }),
    [items, threshold, includeScore]
  );

  const results = useMemo(() => {
    if (!searchTerm.trim()) return items;
    return fuse.search(searchTerm).map((result) => result.item);
  }, [searchTerm, fuse, items]);

  return {
    results,
    isSearching: searchTerm.length > 0,
    resultsCount: results.length,
  };
}

/**
 * Hook for advanced filtering & searching combined
 */
export function useAdvancedSearch(
  items: Product[],
  searchTerm: string,
  filters: {
    categories?: string[];
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    locations?: string[];
  } = {}
) {
  const { results: searchResults } = useSearch(items, searchTerm);

  const filteredResults = useMemo(() => {
    return searchResults.filter((item) => {
      // Category filter
      if (filters.categories && filters.categories.length > 0) {
        if (!filters.categories.includes(item.category)) return false;
      }

      // Price filter
      if (filters.minPrice !== undefined && item.price < filters.minPrice) return false;
      if (filters.maxPrice !== undefined && item.price > filters.maxPrice) return false;

      // Rating filter
      if (filters.minRating !== undefined && item.rating < filters.minRating) return false;

      // Location filter
      if (filters.locations && filters.locations.length > 0) {
        if (!filters.locations.includes(item.location)) return false;
      }

      return true;
    });
  }, [searchResults, filters]);

  return {
    results: filteredResults,
    isFiltering: Boolean(
      searchTerm ||
        (filters.categories && filters.categories.length > 0) ||
        filters.minPrice !== undefined ||
        filters.maxPrice !== undefined ||
        filters.minRating !== undefined ||
        (filters.locations && filters.locations.length > 0)
    ),
    resultsCount: filteredResults.length,
  };
}
