// About/Education data for SEO and individual pages
import { generateSlug } from './utils';

export const education = [
  {
    slug: generateSlug('Bachelor of Engineering in Computer Science'),
    title: 'Bachelor of Engineering in Computer Science',
    score: 'CGPA: 8.4',
    institute: "St. Joseph's Institute of Technology, OMR, Chennai",
    date: 'Expected Graduation: May 2026',
    logo: '/engglogo.png',
    link: 'https://stjosephstechnology.ac.in/'
  },
  {
    slug: generateSlug('Higher Secondary Certificate (HSC)'),
    title: 'Higher Secondary Certificate (HSC)',
    score: '77.5%',
    institute: 'Holy Family Convent Matriculation Hr. Sec. School, Keelkattalai, Chennai',
    date: 'Graduation: May 2022',
    logo: '/hsclogo.webp',
    link: 'https://holyfamilyschool.edu.in/'
  },
  {
    slug: generateSlug('Secondary School Leaving Certificate (SSLC)'),
    title: 'Secondary School Leaving Certificate (SSLC)',
    score: '71.6%',
    institute: 'Holy Family Convent Matriculation Hr. Sec. School, Keelkattalai, Chennai',
    date: 'Graduation: March 2020',
    logo: '/sslc-logo.webp',
    link: 'https://holyfamilyschool.edu.in/'
  }
];

// Get education by slug
export function getEducationBySlug(slug) {
  return education.find(e => e.slug === slug);
}

// Get all education slugs for sitemap
export function getAllEducationSlugs() {
  return education.map(e => e.slug);
}

