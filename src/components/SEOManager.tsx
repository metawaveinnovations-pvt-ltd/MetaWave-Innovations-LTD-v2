import React, { useEffect } from 'react';
import { getRouteMetadata, SITE_DOMAIN, DEFAULT_OG_IMAGE } from '../data/routesData';

interface SEOManagerProps {
  currentPath?: string;
}

export const SEOManager: React.FC<SEOManagerProps> = ({ currentPath }) => {
  useEffect(() => {
    const rawPath = currentPath || window.location.pathname + window.location.hash;
    
    // Normalize path from hash or pathname
    let path = window.location.pathname;
    const hash = window.location.hash.replace('#', '');

    if (hash && hash !== 'home') {
      if (hash.startsWith('blog-post-')) {
        const blogSlug = hash.replace('blog-post-', '');
        path = `/blog/${blogSlug}`;
      } else if (['privacy', 'terms', 'cookie', 'about', 'services', 'solutions', 'portfolio', 'contact', 'careers', 'faqs', 'shop', 'web-development', 'mobile-app-development', 'custom-software-development', 'ai-machine-learning', 'cloud-solutions', 'ui-ux-design', 'digital-marketing', 'seo-services'].includes(hash)) {
        if (hash === 'privacy') path = '/privacy-policy';
        else if (hash === 'terms') path = '/terms-and-conditions';
        else if (hash === 'cookie') path = '/cookie-policy';
        else path = `/${hash}`;
      }
    }

    const meta = getRouteMetadata(path);

    // 1. Update Document Title
    document.title = meta.title;

    // Helper to update or create meta tags
    const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to update or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // 2. Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', meta.description);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', meta.keywords);
    setMetaTag('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('meta[name="author"]', 'name', 'author', 'MetaWave Innovations Pvt Ltd');

    // 3. Canonical Tag
    setLinkTag('canonical', meta.canonical);

    // 4. Open Graph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', meta.title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', meta.description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', meta.canonical);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', meta.ogType || 'website');
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', meta.ogImage || DEFAULT_OG_IMAGE);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'MetaWave Innovations');
    setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'en_US');

    // 5. Twitter Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:site"]', 'name', 'twitter:site', '@MetaWaveTech');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', meta.ogImage || DEFAULT_OG_IMAGE);

    // 6. JSON-LD Schema Generation
    let schemaObj: any = null;

    if (meta.schemaType === 'Organization' || meta.path === '/') {
      schemaObj = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${SITE_DOMAIN}/#organization`,
            'name': 'MetaWave Innovations (Private) Limited',
            'legalName': 'MetaWave Innovations (Private) Limited',
            'url': SITE_DOMAIN,
            'logo': `${SITE_DOMAIN}/icon.png`,
            'description': 'MetaWave Innovations is a leading global technology, software development, AI, automation, and digital transformation company.',
            'foundingDate': '2024',
            'sameAs': [
              'https://github.com/metawaveinnovations',
              'https://linkedin.com/company/metawaveinnovations',
              'https://twitter.com/metawavetech'
            ],
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Islamabad R&D Hub, SECP Registered Company',
              'addressLocality': 'Islamabad',
              'addressRegion': 'Federal Capital',
              'postalCode': '44000',
              'addressCountry': 'PK'
            },
            'contactPoint': [
              {
                '@type': 'ContactPoint',
                'telephone': '+92-51-0000000',
                'contactType': 'customer support',
                'email': 'contact@metawaveinnovations.com',
                'areaServed': ['Global', 'PK', 'UK', 'UAE', 'SA', 'US'],
                'availableLanguage': ['English', 'Urdu', 'Arabic']
              }
            ]
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE_DOMAIN}/#website`,
            'url': SITE_DOMAIN,
            'name': 'MetaWave Innovations',
            'description': meta.description,
            'publisher': { '@id': `${SITE_DOMAIN}/#organization` },
            'inLanguage': 'en-US'
          }
        ]
      };
    } else if (meta.schemaType === 'Service') {
      schemaObj = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': meta.title,
        'serviceType': meta.h1Heading || meta.title,
        'description': meta.description,
        'provider': {
          '@type': 'Organization',
          'name': 'MetaWave Innovations (Private) Limited',
          'url': SITE_DOMAIN
        },
        'areaServed': 'Global',
        'url': meta.canonical
      };
    } else if (meta.schemaType === 'BlogPosting') {
      schemaObj = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': meta.h1Heading || meta.title,
        'description': meta.description,
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': meta.canonical
        },
        'url': meta.canonical,
        'datePublished': meta.lastmod,
        'dateModified': meta.lastmod,
        'author': {
          '@type': 'Person',
          'name': 'MetaWave Engineering Team',
          'url': `${SITE_DOMAIN}/about`
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'MetaWave Innovations',
          'logo': {
            '@type': 'ImageObject',
            'url': `${SITE_DOMAIN}/icon.png`
          }
        },
        'image': meta.ogImage || DEFAULT_OG_IMAGE
      };
    } else if (meta.schemaType === 'FAQPage') {
      schemaObj = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What services does MetaWave Innovations provide?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'MetaWave Innovations provides enterprise custom software development, web application engineering, mobile app development (iOS/Android), AI & Machine Learning solutions, cloud DevOps, CRM/ERP development, and technical consulting.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Where is MetaWave Innovations headquartered?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'MetaWave Innovations (Private) Limited is headquartered in Islamabad, Pakistan, serving enterprise clients across the United Kingdom, United Arab Emirates, Saudi Arabia, and North America.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How does MetaWave ensure software security and compliance?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'We enforce ISO 27001 & SOC 2 security protocols, complete non-disclosure agreements (NDAs), full IP assignments to clients, sandboxed dependencies, and rigorous vulnerability scanning.'
            }
          }
        ]
      };
    } else if (meta.schemaType === 'LocalBusiness') {
      schemaObj = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        'name': meta.title,
        'image': meta.ogImage || DEFAULT_OG_IMAGE,
        '@id': meta.canonical,
        'url': meta.canonical,
        'telephone': '+92-51-0000000',
        'priceRange': '$$$',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'MetaWave R&D Center',
          'addressLocality': 'Islamabad',
          'addressRegion': 'Federal Capital',
          'postalCode': '44000',
          'addressCountry': 'PK'
        }
      };
    } else {
      schemaObj = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': meta.title,
        'description': meta.description,
        'url': meta.canonical
      };
    }

    // Inject JSON-LD Script tag
    let scriptTag = document.getElementById('json-ld-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-schema';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaObj, null, 2);

  }, [currentPath]);

  return null;
};
