import { getSkillBySlug, getAllSkillSlugs } from '@/app/data/skills';
import SkillSlugClient from './SkillSlugClient';

export async function generateStaticParams() {
  const slugs = getAllSkillSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);

  if (!skill) {
    return {
      title: 'Skill Not Found | Jerophin D R Portfolio',
      description: 'The requested skill could not be found.',
    };
  }

  const skillsList = skill.description.split('\n').map(line => {
    const cleanLine = line.replace(/^[^–]+–\s*/, '').trim();
    return cleanLine ? cleanLine.split(',').map(s => s.trim()).filter(s => s) : [];
  }).flat();

  return {
    title: `${skill.title} | Jerophin D R Portfolio`,
    description: `${skill.title}: ${skill.description.replace(/\n/g, ' ')}`,
    keywords: `${skill.title}, ${skillsList.join(', ')}, Skills, Jerophin D R, Technical Skills, Portfolio`,
    robots: 'index, follow',
    alternates: {
      canonical: `https://jerophin-portfolio.vercel.app/skills/${slug}`,
    },
    openGraph: {
      type: 'website',
      url: `https://jerophin-portfolio.vercel.app/skills/${slug}`,
      title: `${skill.title} | Jerophin D R Portfolio`,
      description: skill.description.replace(/\n/g, ' '),
      images: [
        {
          url: 'https://jerophin-portfolio.vercel.app/preview.png',
          type: 'image/png',
          width: 1200,
          height: 630,
          alt: `${skill.title} - Technical Skills`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${skill.title} | Jerophin D R Portfolio`,
      description: skill.description.replace(/\n/g, ' '),
      images: ['https://jerophin-portfolio.vercel.app/preview.png'],
    },
  };
}

export default async function SkillSlugPage({ params }) {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);

  if (!skill) {
    return null;
  }

  return <SkillSlugClient skill={skill} />;
}

