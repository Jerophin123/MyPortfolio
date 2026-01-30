import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Script from 'next/script';
import VisitorTracking from '@/components/VisitorTracking';
import ClarityScript from '@/components/ClarityScript';
import './globals.css';

export const metadata = {
  title: 'Jerophin D R | Full-Stack & UI/UX Developer Portfolio',
  description: 'Explore Jerophin D R\'s professional portfolio: React, Vite, FastAPI, MongoDB, and UI/UX Design. AI projects, hackathons, responsive design. Built for speed, accessibility, and impact.',
  keywords: 'Jerophin D R, Portfolio, Full Stack Developer, React Developer, Vite, FastAPI, MongoDB, Python Developer, Frontend Developer, UI UX Designer, Material UI, GitHub, Figma, SEO Portfolio, Chennai Developer, Hackathon Projects, Accessibility Web Design, Resume Website, Developer Showcase',
  authors: [{ name: 'Jerophin D R' }],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://jerophin-portfolio.vercel.app/',
  },
  openGraph: {
    type: 'website',
    url: 'https://jerophin-portfolio.vercel.app/',
    title: 'Jerophin D R | Full-Stack Developer & UI/UX Designer',
    description: 'Portfolio of Jerophin D R: building fast, accessible web apps using React, MongoDB, and more.',
    images: [
      {
        url: 'https://jerophin-portfolio.vercel.app/preview.png',
        type: 'image/png',
        width: 1200,
        height: 630,
        alt: 'Jerophin Portfolio Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Jerophin583',
    creator: '@Jerophin583',
    title: 'Jerophin D R | Full-Stack Developer & UI/UX Designer',
    description: 'React + Vite + FastAPI portfolio with real-time projects and AI-based features. Explore now.',
    images: [
      {
        url: 'https://jerophin-portfolio.vercel.app/preview.png',
        alt: 'Preview of Jerophin\'s portfolio UI',
      },
    ],
  },
  other: {
    'msvalidate.01': 'C63DE252D84E4F2847C50CE603ADB4B6',
    'theme-color': 'rgba(0, 25, 47, 0.96)',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="canonical" href="https://jerophin-portfolio.vercel.app/" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Jerophin D R",
              "jobTitle": "Full-Stack Developer & UI/UX Designer",
              "description": "Responsive, accessible, and performance-optimized portfolio for a full-stack developer.",
              "image": "https://jerophin-portfolio.vercel.app/preview.png",
              "url": "https://jerophin-portfolio.vercel.app/",
              "sameAs": [
                "https://github.com/Jerophin123",
                "https://linkedin.com/in/jerophin-d-r-b9a73b257/",
                "https://leetcode.com/u/codecrackerX08/",
                "https://linktr.ee/Jerophin"
              ],
              "knowsAbout": [
                "Full-Stack Development",
                "React",
                "Next.js",
                "FastAPI",
                "MongoDB",
                "UI/UX Design",
                "Python",
                "JavaScript",
                "Machine Learning",
                "Cloud Computing"
              ],
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "St. Joseph's Institute of Technology"
              }
            }),
          }}
        />
      </head>
      <body>
        <h1 style={{ display: 'none' }}>
          Jerophin D R – Full-Stack Developer & UI/UX Designer Portfolio
        </h1>
        {children}
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2R9DJ8V1K2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-2R9DJ8V1K2',  {
              allow_google_signals: true
            });
          `}
        </Script>

        {/* Microsoft Clarity - loaded via client component with error handling */}
        <ClarityScript />

        <Analytics />
        <SpeedInsights />
        <VisitorTracking />
      </body>
    </html>
  );
}

