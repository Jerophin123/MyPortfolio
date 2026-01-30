import { getAllProjectSlugs } from '@/app/data/projects';
import { getAllCertificationSlugs } from '@/app/data/certifications';
import { getAllSkillSlugs } from '@/app/data/skills';
import { getAllEducationSlugs } from '@/app/data/about';
import { getAllProfileSlugs } from '@/app/data/otherprofiles';

const baseUrl = 'https://jerophin-portfolio.vercel.app';

export default function sitemap() {
  const currentDate = new Date().toISOString();

  // Main pages
  const routes = [
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
      url: `${baseUrl}/skills`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
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
      url: `${baseUrl}/otherprofiles`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic project pages
  const projectRoutes = getAllProjectSlugs().map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Dynamic certification pages
  const certificationRoutes = getAllCertificationSlugs().map((slug) => ({
    url: `${baseUrl}/certifications/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Dynamic skill pages
  const skillRoutes = getAllSkillSlugs().map((slug) => ({
    url: `${baseUrl}/skills/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Dynamic about/education pages
  const educationRoutes = getAllEducationSlugs().map((slug) => ({
    url: `${baseUrl}/about/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Dynamic otherprofiles pages
  const profileRoutes = getAllProfileSlugs().map((slug) => ({
    url: `${baseUrl}/otherprofiles/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...routes,
    ...projectRoutes,
    ...certificationRoutes,
    ...skillRoutes,
    ...educationRoutes,
    ...profileRoutes,
  ];
}

