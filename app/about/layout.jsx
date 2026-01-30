export const metadata = {
  title: 'About | Jerophin D R Portfolio',
  description: 'Learn about Jerophin D R, a Full-Stack Developer and UI/UX Designer. Education background, skills, and professional journey.',
  keywords: 'About, Jerophin D R, Full Stack Developer, UI/UX Designer, Education, Background, Portfolio',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://jerophin-portfolio.vercel.app/about',
  },
  openGraph: {
    type: 'website',
    url: 'https://jerophin-portfolio.vercel.app/about',
    title: 'About | Jerophin D R Portfolio',
    description: 'Learn about Jerophin D R, a Full-Stack Developer and UI/UX Designer. Education background and professional journey.',
    images: [
      {
        url: 'https://jerophin-portfolio.vercel.app/preview.png',
        type: 'image/png',
        width: 1200,
        height: 630,
        alt: 'Jerophin Portfolio About',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Jerophin D R Portfolio',
    description: 'Learn about Jerophin D R, a Full-Stack Developer and UI/UX Designer. Education background and professional journey.',
    images: ['https://jerophin-portfolio.vercel.app/preview.png'],
  },
};

export default function AboutLayout({ children }) {
  return children;
}

