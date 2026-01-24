export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [],
      },
    ],
    sitemap: 'https://jerophin-portfolio.vercel.app/sitemap.xml',
  };
}

