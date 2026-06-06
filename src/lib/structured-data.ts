import type { JournalPost, Product } from '../data/products';

const SCHEMA = 'https://schema.org';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function siteOrigin(site: URL | string): string {
  return new URL('/', site).origin;
}

export function organizationJsonLd(site: URL | string) {
  const origin = siteOrigin(site);
  return {
    '@context': SCHEMA,
    '@type': 'Organization',
    name: 'STAK',
    url: origin,
    logo: `${origin}/og-image.svg`,
    sameAs: [] as string[],
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[], site: URL | string) {
  return {
    '@context': SCHEMA,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, site).href,
    })),
  };
}

export function productJsonLd(product: Product, site: URL | string, pageUrl: URL | string) {
  return {
    '@context': SCHEMA,
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: new URL(product.detailImage, site).href,
    brand: {
      '@type': 'Brand',
      name: 'STAK',
    },
    offers: {
      '@type': 'Offer',
      url: typeof pageUrl === 'string' ? pageUrl : pageUrl.href,
      priceCurrency: 'USD',
      price: product.price.toFixed(2),
      availability: product.available
        ? `${SCHEMA}/InStock`
        : `${SCHEMA}/OutOfStock`,
    },
  };
}

export function articleJsonLd(post: JournalPost, site: URL | string, pageUrl: URL | string) {
  const origin = siteOrigin(site);
  const image = post.image
    ? new URL(post.image, site).href
    : `${origin}/og-image.svg`;

  return {
    '@context': SCHEMA,
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: parseJournalDate(post.date),
    author: {
      '@type': 'Organization',
      name: 'STAK',
    },
    image,
    publisher: {
      '@type': 'Organization',
      name: 'STAK',
      logo: {
        '@type': 'ImageObject',
        url: `${origin}/og-image.svg`,
      },
    },
    mainEntityOfPage: typeof pageUrl === 'string' ? pageUrl : pageUrl.href,
  };
}

function parseJournalDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toISOString().split('T')[0];
}
