export const metadata = {
  title: 'Skills | Jerophin D R Portfolio',
  description: 'Technical skills and expertise in Full-Stack Development, Cloud & DevOps, Data Science, Machine Learning, UI/UX Design, and more.',
  keywords: 'Technical Skills, Programming Languages, Full Stack Development, Cloud Computing, Data Science, Machine Learning, UI/UX Design, Jerophin D R',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://jerophin-portfolio.vercel.app/skills',
  },
  openGraph: {
    type: 'website',
    url: 'https://jerophin-portfolio.vercel.app/skills',
    title: 'Skills | Jerophin D R Portfolio',
    description: 'Technical skills and expertise in Full-Stack Development, Cloud & DevOps, Data Science, Machine Learning, and UI/UX Design.',
    images: [
      {
        url: 'https://jerophin-portfolio.vercel.app/preview.png',
        type: 'image/png',
        width: 1200,
        height: 630,
        alt: 'Jerophin Portfolio Skills',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skills | Jerophin D R Portfolio',
    description: 'Technical skills and expertise in Full-Stack Development, Cloud & DevOps, Data Science, Machine Learning, and UI/UX Design.',
    images: ['https://jerophin-portfolio.vercel.app/preview.png'],
  },
};

export default function SkillsLayout({ children }) {
  return children;
}

