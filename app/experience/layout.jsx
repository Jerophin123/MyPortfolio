export const metadata = {
  title: 'Experience | Jerophin D R Portfolio',
  description: 'Professional work experience, internships, and career journey as a Full-Stack Developer and UI/UX Designer.',
  keywords: 'Experience, Work History, Professional Experience, Internships, Career, Jerophin D R, Software Developer',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://jerophin-portfolio.vercel.app/experience',
  },
  openGraph: {
    type: 'website',
    url: 'https://jerophin-portfolio.vercel.app/experience',
    title: 'Experience | Jerophin D R Portfolio',
    description: 'Professional work experience, internships, and career journey as a Full-Stack Developer and UI/UX Designer.',
    images: [
      {
        url: 'https://jerophin-portfolio.vercel.app/preview.png',
        type: 'image/png',
        width: 1200,
        height: 630,
        alt: 'Jerophin Portfolio Experience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experience | Jerophin D R Portfolio',
    description: 'Professional work experience, internships, and career journey as a Full-Stack Developer and UI/UX Designer.',
    images: ['https://jerophin-portfolio.vercel.app/preview.png'],
  },
};

export default function ExperienceLayout({ children }) {
  return children;
}

