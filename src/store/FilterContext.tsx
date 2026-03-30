import React, { createContext, useContext, useState, useCallback } from 'react';
import type { FilterState, FilterOptions } from '@/types';

interface FilterContextType {
  state: FilterState;
  setFilters: (filters: Partial<FilterOptions>) => void;
  resetFilters: () => void;
  setCategoryFilter: (categories: string[]) => void;
  setPriceFilter: (range: [number, number]) => void;
  setRatingFilter: (minRating: number) => void;
  setLocationFilter: (locations: string[]) => void;
  setSearchFilter: (search: string) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  clearFilters: () => void;
  hasActiveFilters: () => boolean;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const DEFAULT_FILTERS: FilterOptions = {
  categories: [],
  priceRange: [0, 500],
  minRating: 0,
  locations: [],
  ecoScore: 0,
  tags: [],
  search: '',
};

// ===== FILTER CONTEXT PROVIDER =====
export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<FilterState>({
    filters: DEFAULT_FILTERS,
    isLoading: false,
    error: null,
  });

  const setFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setState((prevState) => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        ...newFilters,
      },
    }));
  }, []);

  const setCategoryFilter = useCallback((categories: string[]) => {
    setFilters({ categories });
  }, [setFilters]);

  const setPriceFilter = useCallback((range: [number, number]) => {
    setFilters({ priceRange: range });
  }, [setFilters]);

  const setRatingFilter = useCallback((minRating: number) => {
    setFilters({ minRating });
  }, [setFilters]);

  const setLocationFilter = useCallback((locations: string[]) => {
    setFilters({ locations });
  }, [setFilters]);

  const setSearchFilter = useCallback((search: string) => {
    setFilters({ search });
  }, [setFilters]);

  const addTag = useCallback(
    (tag: string) => {
      setFilters({
        tags: Array.from(new Set([...state.filters.tags, tag])),
      });
    },
    [state.filters.tags, setFilters]
  );

  const removeTag = useCallback(
    (tag: string) => {
      setFilters({
        tags: state.filters.tags.filter((t) => t !== tag),
      });
    },
    [state.filters.tags, setFilters]
  );

  const resetFilters = useCallback(() => {
    setState({
      filters: DEFAULT_FILTERS,
      isLoading: false,
      error: null,
    });
  }, []);

  const clearFilters = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  const hasActiveFilters = useCallback(() => {
    const { categories, minRating, locations, ecoScore, tags, search, priceRange } =
      state.filters;
    return (
      categories.length > 0 ||
      minRating > 0 ||
      locations.length > 0 ||
      ecoScore > 0 ||
      tags.length > 0 ||
      search.length > 0 ||
      priceRange[0] > 0 ||
      priceRange[1] < 500
    );
  }, [state.filters]);

  return (
    <FilterContext.Provider
      value={{
        state,
        setFilters,
        resetFilters,
        setCategoryFilter,
        setPriceFilter,
        setRatingFilter,
        setLocationFilter,
        setSearchFilter,
        addTag,
        removeTag,
        clearFilters,
        hasActiveFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

// ===== USE FILTER HOOK =====
export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within FilterProvider');
  }
  return context;
}
