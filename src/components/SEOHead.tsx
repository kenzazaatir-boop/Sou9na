/**
 * SEO Head Component
 * Manages all meta tags, structured data, and head content
 */

import React from "react";
import { Helmet } from "react-helmet-async";
import type { SEOMetaData, SchemaOrg } from "@/lib/seo";

interface SEOHeadProps {
  seo: SEOMetaData;
  schemas?: SchemaOrg[];
  children?: React.ReactNode;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ seo, schemas = [] }) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      {seo.keywords && seo.keywords.length > 0 && (
        <meta name="keywords" content={seo.keywords.join(", ")} />
      )}
      {seo.author && <meta name="author" content={seo.author} />}

      {/* Canonical URL */}
      {seo.canonicalUrl && <link rel="canonical" href={seo.canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seo.ogType || "website"} />
      <meta property="og:title" content={seo.ogTitle || seo.title} />
      <meta
        property="og:description"
        content={seo.ogDescription || seo.description}
      />
      {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
      {seo.ogImage && <meta property="og:image:width" content="1200" />}
      {seo.ogImage && <meta property="og:image:height" content="630" />}
      {seo.canonicalUrl && <meta property="og:url" content={seo.canonicalUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content={seo.twitterCard || "summary_large_image"} />
      <meta name="twitter:title" content={seo.ogTitle || seo.title} />
      <meta
        name="twitter:description"
        content={seo.ogDescription || seo.description}
      />
      {seo.ogImage && <meta name="twitter:image" content={seo.ogImage} />}
      {seo.twitterCreator && (
        <meta name="twitter:creator" content={seo.twitterCreator} />
      )}

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#92623b" />
      <meta name="color-scheme" content="light dark" />

      {/* Language Alternates */}
      {seo.alternateLanguages && seo.alternateLanguages.length > 0 && (
        <>
          {seo.alternateLanguages.map((alt) => (
            <link
              key={alt.lang}
              rel="alternate"
              hrefLang={alt.lang}
              href={alt.url}
            />
          ))}
        </>
      )}

      {/* Published/Modified Date */}
      {seo.publishedDate && (
        <meta property="article:published_time" content={seo.publishedDate} />
      )}
      {seo.modifiedDate && (
        <meta property="article:modified_time" content={seo.modifiedDate} />
      )}

      {/* Structured Data (Schema.org) */}
      {schemas &&
        schemas.length > 0 &&
        schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

      {/* Preconnect to External Domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEOHead;
