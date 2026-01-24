// Other profiles data for SEO and individual pages
import { generateSlug } from './utils';

export const otherProfiles = [
  {
    slug: generateSlug('Linktree'),
    title: 'Linktree',
    description: 'Connect with me on all platforms. Click to access all my social links, contact info, and more',
    link: 'https://linktr.ee/Jerophin'
  }
];

// Get profile by slug
export function getProfileBySlug(slug) {
  return otherProfiles.find(p => p.slug === slug);
}

// Get all profile slugs for sitemap
export function getAllProfileSlugs() {
  return otherProfiles.map(p => p.slug);
}

