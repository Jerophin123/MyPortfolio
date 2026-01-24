// Achievements data for SEO and individual pages
import { generateSlug } from './utils';

export const achievements = [
  {
    slug: generateSlug('1st Place: Code Debugging at Dr. MGR Research Institute'),
    title: '1st Place: Code Debugging at Dr. MGR Research Institute',
    description: 'Secured 1st in national debugging.'
  },
  {
    slug: generateSlug('1st Place: Code Debugging at Jerusalem College Of Engineering'),
    title: '1st Place: Code Debugging at Jerusalem College Of Engineering',
    description: 'Secured 1st in national debugging.'
  },
  {
    slug: generateSlug('2nd Place: IEEE Code Debugging Event'),
    title: '2nd Place: IEEE Code Debugging Event',
    description: 'Excelled in competitive debugging earning 2nd place.'
  },
  {
    slug: generateSlug('2nd Place: Paper Presentation at Guru Nanak College'),
    title: '2nd Place: Paper Presentation at Guru Nanak College',
    description: 'Presented innovative research ideas and Secured 2nd place.'
  },
  {
    slug: generateSlug('2nd Place: Overall Runner-up at GNC Symposium'),
    title: '2nd Place: Overall Runner-up at GNC Symposium',
    description: 'Contributed to the team Performed well overall and Secured 2nd place.'
  },
  {
    slug: generateSlug('2nd Place: Data Preprocessing Event'),
    title: '2nd Place: Data Preprocessing Event',
    description: 'Showcased data analysis skills to win 2nd place.'
  },
  {
    slug: generateSlug('3rd Place: Code Debugging at Dr. MGR Research Institute'),
    title: '3rd Place: Code Debugging at Dr. MGR Research Institute',
    description: 'Secured 3rd in national debugging.'
  },
  {
    slug: generateSlug('Hackathon: Hack-o-Mania 5.0 (SJIT)'),
    title: 'Hackathon: Hack-o-Mania 5.0 (SJIT)',
    description: 'Completed 24-hour hackathon by Built working prototype.'
  },
  {
    slug: generateSlug('Hackathon: Blaze-A-Trail 1.0 (SJIT)'),
    title: 'Hackathon: Blaze-A-Trail 1.0 (SJIT)',
    description: 'Delivered an innovative solution within 24 hours of intensive coding.'
  },
  {
    slug: generateSlug('Hackathon: Blaze-A-Trail 2.0 (SJIT)'),
    title: 'Hackathon: Blaze-A-Trail 2.0 (SJIT)',
    description: 'Delivered an innovative solution within 24 hours of intensive coding.'
  },
  {
    slug: generateSlug('Hackathon: Hack2Skills – UN SDG'),
    title: 'Hackathon: Hack2Skills – UN SDG',
    description: 'Built a project which Aligned with UN SDGs.'
  },
  {
    slug: generateSlug('NCAT 2025: Naukri Campus All India Career Aptitude Test'),
    title: 'NCAT 2025: Naukri Campus All India Career Aptitude Test',
    description: 'Scored 28/60 with 100% attempt rate; secured 56.79 percentile in Tamil Nadu with top scores in Verbal & Reasoning.'
  },
  {
    slug: generateSlug('Paper Publication: IEEE Explore'),
    title: 'Paper Publication: IEEE Explore',
    description: 'Published a paper on the title Waste Managaemnt System Using Deep Learning.'
  }
];

// Get achievement by slug
export function getAchievementBySlug(slug) {
  return achievements.find(a => a.slug === slug);
}

// Get all achievement slugs for sitemap
export function getAllAchievementSlugs() {
  return achievements.map(a => a.slug);
}

