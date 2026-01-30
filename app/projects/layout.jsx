export const metadata = {
  title: 'Projects | Jerophin D R Portfolio',
  description: 'Explore my portfolio of full-stack web applications, AI projects, and UI/UX designs. Built with React, Next.js, FastAPI, MongoDB, and more.',
  keywords: 'Portfolio Projects, Web Development, Full Stack Projects, React Projects, AI Projects, Jerophin D R, Software Development',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://jerophin-portfolio.vercel.app/projects',
  },
  openGraph: {
    type: 'website',
    url: 'https://jerophin-portfolio.vercel.app/projects',
    title: 'Projects | Jerophin D R Portfolio',
    description: 'Explore my portfolio of full-stack web applications, AI projects, and UI/UX designs.',
    images: [
      {
        url: 'https://jerophin-portfolio.vercel.app/preview.png',
        type: 'image/png',
        width: 1200,
        height: 630,
        alt: 'Jerophin Portfolio Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Jerophin D R Portfolio',
    description: 'Explore my portfolio of full-stack web applications, AI projects, and UI/UX designs.',
    images: ['https://jerophin-portfolio.vercel.app/preview.png'],
  },
};

export default function ProjectsLayout({ children }) {
  return children;
}

