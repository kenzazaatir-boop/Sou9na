/**
 * SEO Configuration & Meta Tags Service
 * Handles all SEO-related metadata for pages
 */

export interface SEOMetaData {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterCreator?: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  alternateLanguages?: Array<{ lang: string; url: string }>;
}

type SchemaOrgValue = string | number | boolean | null | undefined | SchemaOrgObject | SchemaOrgValue[];

interface SchemaOrgObject {
  [key: string]: SchemaOrgValue;
}

export interface SchemaOrg extends SchemaOrgObject {
  "@context": string;
  "@type": string;
}

// Base URL for the website
const BASE_URL = import.meta.env.VITE_SITE_URL || "https://soukna.com";

/**
 * SEO Configuration for each page
 */
export const SEO_CONFIG: Record<string, SEOMetaData> = {
  home: {
    title: "Soukna - Marketplace Artisans Tunisiens | Produits Authentiques",
    description:
      "Découvrez des produits artisanaux tunisiens authentiques directement des artisans. Textiles, céramique, cuirs, bijoux et plus. Livraison en Tunisie.",
    keywords: [
      "artisans tunisiens",
      "produits artisanaux",
      "marketplace tunisie",
      "textile tunisien",
      "céramique artisanale",
      "commerce électronique tunisien",
    ],
    canonicalUrl: `${BASE_URL}/`,
    ogTitle: "Soukna - Produits Artisanaux Tunisiens Authentiques",
    ogDescription:
      "Connectez-vous directement aux artisans tunisiens pour des produits uniques et authentiques.",
    ogImage: `${BASE_URL}/og-image-home.jpg`,
    ogType: "website",
  },

  catalog: {
    title: "Catalogue Produits - Soukna | Artisanat Tunisien",
    description:
      "Parcourez notre catalogue complet de produits artisanaux tunisiens. Filtrez par catégorie, région, prix et notation. Trouvez votre produit parfait.",
    keywords: [
      "catalogue artisanat",
      "produits artisanaux tunisiens",
      "shopping artisanat",
      "commerce équitable",
      "produits durables",
    ],
    canonicalUrl: `${BASE_URL}/catalog`,
    ogTitle: "Catalogue Complet - Soukna",
    ogDescription:
      "Explorez des centaines de produits artisanaux de qualité supérieure.",
  },

  cart: {
    title: "Panier - Soukna | Achetez des Produits Artisanaux",
    description:
      "Vérifiez votre panier et procédez au paiement en toute sécurité. Livraison gratuite à partir de 100 TND.",
    canonicalUrl: `${BASE_URL}/cart`,
    ogTitle: "Votre Panier - Soukna",
  },

  artisans: {
    title: "Artisans - Soukna | Rencontrez nos Créateurs",
    description:
      "Découvrez les artisans talenttueux de Soukna. Parcourez leurs histoires, produits et spécialités. Soutien direct aux artisans locaux.",
    keywords: [
      "artisans tunisiens",
      "créateurs artisanaux",
      "commerce équitable",
      "soutien artisans",
    ],
    canonicalUrl: `${BASE_URL}/artisans`,
    ogTitle: "Nos Artisans - Soukna",
    ogDescription: "Rencontrez les créateurs derrière chaque produit.",
  },

  contact: {
    title: "Contact - Soukna | Nous Vous Écoutons",
    description:
      "Contactez l'équipe Soukna pour des questions, support client ou partenariats. Réponse rapide garantie.",
    canonicalUrl: `${BASE_URL}/contact`,
    ogTitle: "Contactez-Nous - Soukna",
  },

  training: {
    title: "Formation & Support - Soukna | Développez vos Compétences",
    description:
      "Programmes de formation pour artisans et entrepreneurs. Apprentissage en ligne et workshops pratiques.",
    keywords: [
      "formation artisans",
      "e-learning",
      "développement compétences",
      "workshops artisanat",
    ],
    canonicalUrl: `${BASE_URL}/training`,
    ogTitle: "Formation - Soukna",
  },

  impact: {
    title: "Impact Social - Soukna | Artisanat Durable & Développement",
    description:
      "Découvrez l'impact social et environnemental de Soukna. Chiffres, témoignages et initiative d'artisanat durable.",
    keywords: [
      "impact social",
      "artisanat durable",
      "développement durable",
      "artisanat durable",
    ],
    canonicalUrl: `${BASE_URL}/impact`,
    ogTitle: "Impact Social - Soukna",
  },

  videos: {
    title: "Vidéos - Soukna | Découvrez nos Histoires",
    description:
      "Vidéos documentaires des artisans, tutoriels et guides d'utilisation des produits Soukna.",
    keywords: ["vidéos", "documentaires", "tutoriels", "artisanat"],
    canonicalUrl: `${BASE_URL}/videos`,
    ogTitle: "Vidéos - Soukna",
  },

  login: {
    title: "Connexion - Soukna | Accédez à votre Compte",
    description:
      "Connectez-vous à votre compte Soukna pour accéder à votre panier, commandes et favoris.",
    canonicalUrl: `${BASE_URL}/login`,
    ogTitle: "Connexion - Soukna",
  },

  register: {
    title: "Inscription - Soukna | Créez votre Compte",
    description:
      "Créez un compte Soukna gratuitement. Accédez aux favoris, panier persistant et historique de commandes.",
    canonicalUrl: `${BASE_URL}/register`,
    ogTitle: "Inscription - Soukna",
  },
};

/**
 * Generate Product Page SEO
 */
export const getProductSEO = (product: {
  id: string;
  name: string;
  description: string;
  image: string;
  artisan?: string;
  price?: number;
}): SEOMetaData => ({
  title: `${product.name} - Artisant Tunisien | Soukna`,
  description: product.description.substring(0, 160),
  keywords: [
    product.name,
    product.artisan || "artisan",
    "artisanat",
    "product tunisien",
  ],
  canonicalUrl: `${BASE_URL}/product/${product.id}`,
  ogTitle: product.name,
  ogDescription: product.description.substring(0, 160),
  ogImage: product.image,
  ogType: "product",
});

/**
 * Generate Organization Schema
 */
export const getOrganizationSchema = (): SchemaOrg => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Soukna",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "Marketplace d'artisanat tunisien connectant directly artisans et consommateurs.",
  foundingDate: "2020",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    email: "support@soukna.com",
    availableLanguage: ["fr", "ar", "en"],
  },
  sameAs: [
    "https://facebook.com/soukna",
    "https://instagram.com/soukna",
    "https://twitter.com/soukna",
  ],
});

/**
 * Generate Product Schema (for Product pages)
 */
export const getProductSchema = (product: {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  rating?: number;
  reviews?: number;
  artisan: string;
  inStock?: boolean;
}): SchemaOrg => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  image: product.image,
  description: product.description,
  brand: {
    "@type": "Brand",
    name: product.artisan,
  },
  offers: {
    "@type": "Offer",
    url: `${BASE_URL}/product/${product.id}`,
    priceCurrency: "TND",
    price: product.price.toString(),
    availability: product.inStock ? "InStock" : "OutOfStock",
  },
  ...(product.rating && {
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.toString(),
      reviewCount: product.reviews || 0,
    },
  }),
});

/**
 * Generate BreadcrumbList Schema
 */
export const getBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
): SchemaOrg => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${BASE_URL}${item.url}`,
  })),
});

/**
 * Generate Breadcrumb Navigation
 */
export const getBreadcrumb = (pathname: string): Array<{ name: string; url: string }> => {
  const segments = pathname.slice(1).split("/").filter(Boolean);
  
  const breadcrumbs = [{ name: "Accueil", url: "/" }];
  
  let currentUrl = "";
  for (const segment of segments) {
    currentUrl += `/${segment}`;
    const name = segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbs.push({ name, url: currentUrl });
  }
  
  return breadcrumbs;
};

/**
 * Get SEO config for a page by route
 */
export const getPageSEO = (route: string): SEOMetaData => {
  return SEO_CONFIG[route] || SEO_CONFIG.home;
};
