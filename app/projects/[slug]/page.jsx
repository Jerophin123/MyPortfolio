import { getProjectBySlug, getAllProjectSlugs } from '@/app/data/projects';
import ProjectSlugClient from './ProjectSlugClient';

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

    if (!project) {
    return {
      title: 'Project Not Found | Jerophin D R Portfolio',
      description: 'The requested project could not be found.',
    };
  }

  const techStackStr = project.techStack ? project.techStack.join(', ') : '';
  const fullDescription = `${project.description} ${techStackStr ? `Technologies: ${techStackStr}.` : ''}`;

  return {
    title: `${project.title} | Jerophin D R Portfolio`,
    description: fullDescription,
    keywords: `${project.title}, ${techStackStr}, Portfolio Project, Jerophin D R, Full Stack Developer`,
    robots: 'index, follow',
    alternates: {
      canonical: `https://jerophin-portfolio.vercel.app/projects/${slug}`,
    },
    openGraph: {
      type: 'website',
      url: `https://jerophin-portfolio.vercel.app/projects/${slug}`,
      title: `${project.title} | Jerophin D R Portfolio`,
      description: project.description,
      images: [
        {
          url: 'https://jerophin-portfolio.vercel.app/preview.png',
          type: 'image/png',
          width: 1200,
          height: 630,
          alt: `${project.title} - Portfolio Project`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Jerophin D R Portfolio`,
      description: project.description,
      images: ['https://jerophin-portfolio.vercel.app/preview.png'],
    },
  };
}

export default async function ProjectSlugPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return null;
  }

  return <ProjectSlugClient project={project} />;
}

