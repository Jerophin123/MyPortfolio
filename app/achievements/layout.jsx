export const metadata = {
  title: 'Achievements | Jerophin D R Portfolio',
  description: 'Awards, hackathons, competitions, and achievements including code debugging championships, paper publications, and hackathon victories.',
  keywords: 'Achievements, Awards, Hackathons, Code Debugging, Paper Publication, IEEE, Competitions, Jerophin D R',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://jerophin-portfolio.vercel.app/achievements',
  },
  openGraph: {
    type: 'website',
    url: 'https://jerophin-portfolio.vercel.app/achievements',
    title: 'Achievements | Jerophin D R Portfolio',
    description: 'Awards, hackathons, competitions, and achievements including code debugging championships and paper publications.',
    images: [
      {
        url: 'https://jerophin-portfolio.vercel.app/preview.png',
        type: 'image/png',
        width: 1200,
        height: 630,
        alt: 'Jerophin Portfolio Achievements',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Achievements | Jerophin D R Portfolio',
    description: 'Awards, hackathons, competitions, and achievements including code debugging championships and paper publications.',
    images: ['https://jerophin-portfolio.vercel.app/preview.png'],
  },
};

export default function AchievementsLayout({ children }) {
  return children;
}

