// JSON-LD builders. Every page references one Organization @id so Google and LLM crawlers
// resolve a single entity: Rowe Services & Maintenance, Grand Island, FL.
import { site } from '../data/site';
import { services, type Faq, type Service } from '../data/services';
import { locations, type Location } from '../data/locations';

const U = site.url;
export const ORG_ID = `${U}/#organization`;
export const SITE_ID = `${U}/#website`;
export const OWNER_ID = `${U}/about#justin-rowe`;

const county = (c: string) => ({ '@type': 'AdministrativeArea', name: `${c}, Florida` });

export function areaServed() {
  return [
    ...site.counties.map(county),
    ...locations.map((l) => ({ '@type': 'City', name: `${l.town}, FL`, geo: { '@type': 'GeoCoordinates', latitude: l.geo.lat, longitude: l.geo.lng } })),
  ];
}

export function organization() {
  return {
    '@type': ['HomeAndConstructionBusiness', 'GeneralContractor'],
    '@id': ORG_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: ["Rowe Service's", 'Rowe Services', 'Rowe Services and Maintenance LLC'],
    slogan: 'Seamless Gutters & More',
    description: `Rowe Services & Maintenance is an owner-operated exterior contractor based in Grand Island, Florida, founded in ${site.founded} by ${site.owner.name}. It installs 6-inch seamless aluminum K-style gutters and gutter guards, soffit and fascia, vinyl siding and skirting, and screen porches and enclosures for homes in The Villages and across Lake, Marion, Sumter and Orange County, with a 15-year warranty on installs.`,
    url: `${U}/`,
    logo: { '@type': 'ImageObject', url: `${U}/logo.png`, width: 512, height: 512 },
    image: `${U}/og-default.png`,
    telephone: site.phoneE164,
    contactPoint: { '@type': 'ContactPoint', telephone: site.phoneE164, contactType: 'customer service', areaServed: 'US-FL', availableLanguage: 'English' },
    ...(site.email ? { email: site.email } : {}),
    foundingDate: String(site.founded),
    priceRange: '$$',
    currenciesAccepted: 'USD',
    address: { '@type': 'PostalAddress', addressLocality: site.address.locality, addressRegion: site.address.region, postalCode: site.address.postalCode, addressCountry: site.address.country },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: areaServed(),
    openingHoursSpecification: site.hours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
    founder: { '@id': OWNER_ID },
    sameAs: site.sameAs,
    ...(site.gbp.url ? { hasMap: site.gbp.url } : {}),
    knowsAbout: ['Seamless gutters', 'Gutter guards', 'Gutter repair', 'Downspouts and drainage', 'Soffit and fascia', 'Attic ventilation', 'Vinyl siding', 'Mobile home skirting', 'Screen enclosures', 'Birdcage pool enclosures', 'Porch close-ins', 'Florida storm preparation'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Exterior home services',
      itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: `${U}/services/${s.slug}` } })),
    },
  };
}

export function website() {
  return { '@type': 'WebSite', '@id': SITE_ID, url: `${U}/`, name: site.name, publisher: { '@id': ORG_ID }, inLanguage: 'en-US' };
}

export function owner() {
  return {
    '@type': 'Person',
    '@id': OWNER_ID,
    name: site.owner.name,
    jobTitle: 'Owner',
    url: `${U}/about`,
    worksFor: { '@id': ORG_ID },
    knowsAbout: ['Seamless gutter installation', 'Soffit and fascia', 'Vinyl siding', 'Screen enclosures'],
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${U}${it.path === '/' ? '/' : it.path}` })),
  };
}

export function faqPage(faqs: Faq[], path: string) {
  return {
    '@type': 'FAQPage',
    '@id': `${U}${path}#faq`,
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function webPage(path: string, name: string, description: string, type = 'WebPage', extra: object = {}) {
  return {
    ...extra,
    '@type': type,
    '@id': `${U}${path}#webpage`,
    url: `${U}${path === '/' ? '/' : path}`,
    name,
    description,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    dateModified: site.lastReviewed,
    reviewedBy: { '@id': ORG_ID },
    inLanguage: 'en-US',
  };
}

export function serviceSchema(s: Service) {
  return {
    '@type': 'Service',
    '@id': `${U}/services/${s.slug}#service`,
    name: s.name,
    serviceType: s.name,
    description: s.answer,
    url: `${U}/services/${s.slug}`,
    provider: { '@id': ORG_ID },
    areaServed: areaServed(),
    audience: { '@type': 'Audience', audienceType: 'Homeowners' },
    hasOfferCatalog: { '@type': 'OfferCatalog', name: s.name, itemListElement: s.offerings.map((o) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: o.title } })) },
  };
}

export function localServiceSchema(l: Location) {
  return {
    '@type': 'Service',
    '@id': `${U}/service-areas/${l.slug}#service`,
    name: `Seamless gutters and exterior services in ${l.town}, FL`,
    serviceType: 'Seamless gutter installation and exterior home services',
    description: l.answer,
    url: `${U}/service-areas/${l.slug}`,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'City', name: `${l.town}, FL`, containedInPlace: county(`${l.county} County`), geo: { '@type': 'GeoCoordinates', latitude: l.geo.lat, longitude: l.geo.lng } },
  };
}

export function article(p: { slug: string; title: string; description: string; pubDate: Date; updatedDate?: Date; service?: string; towns?: Location[] }) {
  const url = `${U}/blogs/${p.slug}`;
  return {
    isPartOf: { '@id': `${U}/blogs#blog` },
    ...(p.service ? { about: { '@id': `${U}/services/${p.service}#service` } } : {}),
    ...(p.towns?.length ? { mentions: p.towns.map((t) => ({ '@type': 'City', name: `${t.town}, FL`, url: `${U}/service-areas/${t.slug}` })) } : {}),
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: p.title,
    description: p.description,
    url,
    mainEntityOfPage: url,
    datePublished: p.pubDate.toISOString().slice(0, 10),
    dateModified: (p.updatedDate ?? p.pubDate).toISOString().slice(0, 10),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    image: `${U}/og-default.png`,
    inLanguage: 'en-US',
  };
}

export function itemList(path: string, name: string, items: { name: string; path: string }[]) {
  return {
    '@type': 'ItemList',
    '@id': `${U}${path}#list`,
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: `${U}${it.path}` })),
  };
}

export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
