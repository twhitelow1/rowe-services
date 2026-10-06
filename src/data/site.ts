// Single source of truth for NAP, hours, links, reviews and tracking.
// NAP must match the Google Business Profile character-for-character.
// Open launch items are marked TODO and listed in README.md → "Open items".

export const site = {
  name: 'Rowe Services & Maintenance',
  legalName: 'Rowe Services & Maintenance, LLC',
  shortName: 'Rowe Services',
  url: 'https://rowe-services.com',
  founded: 2013,
  owner: { name: 'Justin Rowe', title: 'Owner & operator' },

  // Primary number shown in the live site's header on every page.
  phone: '(352) 706-8913',
  phoneE164: '+13527068913',
  // TODO: the live /contact-us page also lists (352) 572-0650. Confirm which number is on the GBP and whether to keep the second line.
  altPhone: '(352) 572-0650',
  email: 'team@roweservices.com', // TODO: confirm this mailbox (note: domain differs from rowe-services.com)

  // Service-area business: city only (no street shown on the live site).
  address: { locality: 'Grand Island', region: 'FL', postalCode: '32735', country: 'US' },
  geo: { lat: 28.8872, lng: -81.7298 },
  counties: ['Lake County', 'Marion County', 'Sumter County', 'Orange County'],

  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], label: 'Mon – Fri', opens: '09:00', closes: '18:00' },
    { days: ['Saturday'], label: 'Saturday', opens: '10:00', closes: '18:00' },
  ],

  facebook: 'https://www.facebook.com/roweservicesandmaintenance/',
  // TODO: add the Google Business Profile URL + "write a review" link once confirmed.
  gbp: { url: '', reviewUrl: '' },
  sameAs: ['https://www.facebook.com/roweservicesandmaintenance/'],

  // Brand promises — all taken from the live site's copy. Do not add new claims here.
  warrantyYears: 15,
  usps: [
    { icon: 'shield', title: 'Backed for 15 years', text: "Most companies warranty their work for 1 to 5 years. We warranty ours for 15, because our sealant process has earned it. Report a leak down the road and we come back out — even if it turns out it wasn't our fault." },
    { icon: 'user', title: 'The owner is on every job', text: "Justin quotes it, Justin manages it, Justin follows up. You'll know my name, my number, my face and my word from the first call to the final walkthrough." },
    { icon: 'clock', title: 'Quality takes time. We take the time.', text: 'Our crews are never overloaded. If proper installation needs an extra day, it gets an extra day. No shortcuts, no "good enough."' },
    { icon: 'check', title: 'The job ends when you say it does', text: "A couple of weeks after we wrap, I come back and double-check the work personally. Anything that isn't right gets fixed — no questions asked." },
  ],

  // Verbatim customer reviews only. Never edit or invent.
  reviews: [
    { quote: 'Great Crew! Great Job! Great Value! Could not be happier, and would recommend Rowe to anyone!', author: 'John Y.', source: 'Customer review' },
    // TODO: add verbatim Google reviews (text, first name + initial, date) from the GBP.
  ],

  tracking: {
    gtmId: '', // TODO
    ga4Id: '', // TODO
    clarityId: '', // TODO
    googleSiteVerification: '',
    bingSiteVerification: '',
  },

  lastReviewed: '2026-10-06',
};

export const telHref = `tel:${site.phoneE164}`;
export const smsHref = `sms:${site.phoneE164}`;
export const quoteHref = '/contact-us#quote';
export const yearsInBusiness = new Date(site.lastReviewed).getFullYear() - site.founded;
