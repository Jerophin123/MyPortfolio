import { getCertificationBySlug, getAllCertificationSlugs } from '@/app/data/certifications';
import CertificationSlugClient from './CertificationSlugClient';

export async function generateStaticParams() {
  const slugs = getAllCertificationSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const certification = getCertificationBySlug(slug);

  if (!certification) {
    return {
      title: 'Certification Not Found | Jerophin D R Portfolio',
      description: 'The requested certification could not be found.',
    };
  }

  return {
    title: `${certification.title} | Jerophin D R Portfolio`,
    description: certification.description,
    keywords: `${certification.title}, Certification, Jerophin D R, Professional Certification, Portfolio`,
    robots: 'index, follow',
    alternates: {
      canonical: `https://jerophin-portfolio.vercel.app/certifications/${slug}`,
    },
    openGraph: {
      type: 'website',
      url: `https://jerophin-portfolio.vercel.app/certifications/${slug}`,
      title: `${certification.title} | Jerophin D R Portfolio`,
      description: certification.description,
      images: [
        {
          url: 'https://jerophin-portfolio.vercel.app/preview.png',
          type: 'image/png',
          width: 1200,
          height: 630,
          alt: `${certification.title} - Professional Certification`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${certification.title} | Jerophin D R Portfolio`,
      description: certification.description,
      images: ['https://jerophin-portfolio.vercel.app/preview.png'],
    },
  };
}

export default async function CertificationSlugPage({ params }) {
  const { slug } = await params;
  const certification = getCertificationBySlug(slug);

  if (!certification) {
    return null;
  }

  return <CertificationSlugClient certification={certification} />;
}

