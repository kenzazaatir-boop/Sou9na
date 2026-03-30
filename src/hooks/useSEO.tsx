/**
 * useSEO Hook
 * Convenient hook for managing page SEO metadata
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import {
  getPageSEO,
  getOrganizationSchema,
  getBreadcrumbSchema,
  getBreadcrumb,
} from "@/lib/seo";
import type { SEOMetaData, SchemaOrg } from "@/lib/seo";

interface UseSEOOptions {
  customMeta?: Partial<SEOMetaData>;
  schemas?: SchemaOrg[];
  includeBreadcrumb?: boolean;
}

/**
 * Hook to manage SEO for a page
 * Returns the SEOHead component configured for the current page
 */
export const useSEO = (options: UseSEOOptions = {}) => {
  const location = useLocation();
  const routeName = location.pathname.replace(/\//g, "").split("/")[0] || "home";

  // Get default SEO for this route
  const defaultSeo = getPageSEO(routeName);

  // Merge with custom metadata if provided
  const finalSeo: SEOMetaData = {
    ...defaultSeo,
    ...options.customMeta,
  };

  // Build schema array
  const schemas: SchemaOrg[] = [getOrganizationSchema(), ...(options.schemas || [])];

  // Add breadcrumb if enabled
  if (options.includeBreadcrumb) {
    const breadcrumbs = getBreadcrumb(location.pathname);
    schemas.push(getBreadcrumbSchema(breadcrumbs));
  }

  // Update document title immediately
  useEffect(() => {
    document.title = finalSeo.title;
  }, [finalSeo.title]);

  // Update canonical URL if provided
  useEffect(() => {
    if (finalSeo.canonicalUrl) {
      // Remove existing canonical tag
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical) {
        existingCanonical.remove();
      }

      // Add new canonical tag
      const canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      canonicalLink.href = finalSeo.canonicalUrl;
      document.head.appendChild(canonicalLink);
    }
  }, [finalSeo.canonicalUrl]);

  return {
    SEOComponent: <SEOHead seo={finalSeo} schemas={schemas} />,
    seo: finalSeo,
    schemas,
  };
};

export default useSEO;
