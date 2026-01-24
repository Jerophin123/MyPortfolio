import { getAllProjectSlugs } from '@/app/data/projects';
import { getAllCertificationSlugs } from '@/app/data/certifications';
import { getAllAchievementSlugs } from '@/app/data/achievements';
import { getAllSkillSlugs } from '@/app/data/skills';
import { getAllEducationSlugs } from '@/app/data/about';
import { getAllProfileSlugs } from '@/app/data/otherprofiles';

const baseUrl = 'https://jerophin-portfolio.vercel.app';

export default function sitemap() {
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/certifications`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/achievements`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/otherprofiles`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic project pages
  const projectPages = getAllProjectSlugs().map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Dynamic certification pages
  const certificationPages = getAllCertificationSlugs().map((slug) => ({
    url: `${baseUrl}/certifications/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Dynamic achievement pages
  const achievementPages = getAllAchievementSlugs().map((slug) => ({
    url: `${baseUrl}/achievements/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Dynamic skill pages
  const skillPages = getAllSkillSlugs().map((slug) => ({
    url: `${baseUrl}/skills/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Dynamic education/about pages
  const educationPages = getAllEducationSlugs().map((slug) => ({
    url: `${baseUrl}/about/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  // Dynamic profile pages
  const profilePages = getAllProfileSlugs().map((slug) => ({
    url: `${baseUrl}/otherprofiles/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...projectPages,
    ...certificationPages,
    ...achievementPages,
    ...skillPages,
    ...educationPages,
    ...profilePages,
  ];
}

