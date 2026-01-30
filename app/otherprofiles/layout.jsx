export const metadata = {
  title: 'Connect | Jerophin D R Portfolio',
  description: 'Connect with Jerophin D R on social media and professional platforms including GitHub, LinkedIn, LeetCode, and more.',
  keywords: 'Connect, Social Media, GitHub, LinkedIn, LeetCode, Contact, Jerophin D R, Professional Links',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://jerophin-portfolio.vercel.app/otherprofiles',
  },
  openGraph: {
    type: 'website',
    url: 'https://jerophin-portfolio.vercel.app/otherprofiles',
    title: 'Connect | Jerophin D R Portfolio',
    description: 'Connect with Jerophin D R on social media and professional platforms including GitHub, LinkedIn, and LeetCode.',
    images: [
      {
        url: 'https://jerophin-portfolio.vercel.app/preview.png',
        type: 'image/png',
        width: 1200,
        height: 630,
        alt: 'Jerophin Portfolio Connect',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Connect | Jerophin D R Portfolio',
    description: 'Connect with Jerophin D R on social media and professional platforms including GitHub, LinkedIn, and LeetCode.',
    images: ['https://jerophin-portfolio.vercel.app/preview.png'],
  },
};

export default function OtherProfilesLayout({ children }) {
  return children;
}

