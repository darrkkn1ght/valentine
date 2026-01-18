import { useEffect } from 'react';

interface SEOConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
}

export const useSEO = (config: SEOConfig) => {
  useEffect(() => {
    // Update title
    document.title = config.title + ' | Digital Moment Studio';

    // Update meta tags
    const metaTags = {
      description: config.description,
      'og:title': config.title,
      'og:description': config.description,
      'og:type': config.type || 'website',
      'og:url': config.url || window.location.href,
      'og:image': config.image || 'https://digital-moment-studio.onrender.com/valentine-ask-preview.jpg',
      'twitter:title': config.title,
      'twitter:description': config.description,
      'twitter:image': config.image || 'https://digital-moment-studio.onrender.com/valentine-ask-preview.jpg',
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      if (name.startsWith('og:') || name.startsWith('twitter:')) {
        let element = document.querySelector(`meta[property="${name}"]`);
        if (!element) {
          element = document.querySelector(`meta[name="${name}"]`);
        }
        if (!element) {
          element = document.createElement('meta');
          if (name.startsWith('og:')) {
            element.setAttribute('property', name);
          } else {
            element.setAttribute('name', name);
          }
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
      } else {
        let element = document.querySelector(`meta[name="${name}"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute('name', name);
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
      }
    });
  }, [config]);
};

export const addSchemaMarkup = (schema: Record<string, any>) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'Digital Moment Studio',
  'url': 'https://digital-moment-studio.onrender.com',
  'logo': 'https://digital-moment-studio.onrender.com/dms-logo.png',
  'description': 'Create unforgettable digital experiences for Valentine\'s Day with personalized interactive moments',
  'sameAs': [
    'https://instagram.com/digitalmoment',
    'https://tiktok.com/@digitalmoment',
    'https://twitter.com/@digitalmoment'
  ],
  'contactPoint': {
    '@type': 'ContactPoint',
    'contactType': 'Customer Service',
    'email': 'support@digitalmoment.studio',
    'availableLanguage': 'en'
  }
};

export const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  'name': 'Valentine Ask Digital Experience',
  'description': 'Personalized digital experience with music, animations, and celebration for Valentine\'s Day proposals',
  'image': 'https://digital-moment-studio.onrender.com/valentine-ask-preview.jpg',
  'brand': {
    '@type': 'Brand',
    'name': 'Digital Moment Studio'
  },
  'offers': {
    '@type': 'Offer',
    'price': '8000',
    'priceCurrency': 'NGN',
    'availability': 'https://schema.org/InStock',
    'url': 'https://digital-moment-studio.onrender.com/order'
  },
  'aggregateRating': {
    '@type': 'AggregateRating',
    'ratingValue': '4.9',
    'ratingCount': '47'
  }
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  'name': 'Digital Moment Studio',
  'description': 'Digital experience creation and personalized Valentine\'s Day moments',
  'url': 'https://digital-moment-studio.onrender.com',
  'address': {
    '@type': 'PostalAddress',
    'addressCountry': 'NG',
    'addressLocality': 'Lagos'
  },
  'priceRange': '₦8,000 - ₦50,000',
  'telephone': '+234-xxx-xxx-xxxx',
  'email': 'hello@digitalmoment.studio',
  'openingHours': 'Mo-Su 07:00-23:00'
};
