export const metadata = {
  title: 'Certifications | Jerophin D R Portfolio',
  description: 'Professional certifications and credentials including Oracle Cloud Infrastructure, Deloitte Technology Simulation, Coursera, LinkedIn Learning, and more.',
  keywords: 'Certifications, Professional Credentials, Oracle, Deloitte, Coursera, LinkedIn Learning, Jerophin D R, IT Certifications',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://jerophin-portfolio.vercel.app/certifications',
  },
  openGraph: {
    type: 'website',
    url: 'https://jerophin-portfolio.vercel.app/certifications',
    title: 'Certifications | Jerophin D R Portfolio',
    description: 'Professional certifications and credentials including Oracle Cloud Infrastructure, Deloitte Technology Simulation, and more.',
    images: [
      {
        url: 'https://jerophin-portfolio.vercel.app/preview.png',
        type: 'image/png',
        width: 1200,
        height: 630,
        alt: 'Jerophin Portfolio Certifications',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certifications | Jerophin D R Portfolio',
    description: 'Professional certifications and credentials including Oracle Cloud Infrastructure, Deloitte Technology Simulation, and more.',
    images: ['https://jerophin-portfolio.vercel.app/preview.png'],
  },
};

export default function CertificationsLayout({ children }) {
  return children;
}

