import { notFound } from 'next/navigation';
import { getCertificationBySlug, getAllCertificationSlugs } from '@/app/data/certifications';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import AnimatedBackground from '@/components/AnimatedBackground';
import ClientLayout from '@/components/ClientLayout';
import Section from '@/components/Section';
import Link from 'next/link';

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
      title: 'Certification Not Found',
    };
  }

  return {
    title: `${certification.title} | Jerophin D R Portfolio`,
    description: certification.description,
    keywords: `${certification.title}, Certification, Portfolio, Jerophin D R`,
    openGraph: {
      title: `${certification.title} | Jerophin D R Portfolio`,
      description: certification.description,
      type: 'website',
      url: `https://jerophin-portfolio.vercel.app/certifications/${certification.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${certification.title} | Jerophin D R Portfolio`,
      description: certification.description,
    },
    alternates: {
      canonical: `https://jerophin-portfolio.vercel.app/certifications/${certification.slug}`,
    },
  };
}

export default async function CertificationPage({ params }) {
  const { slug } = await params;
  const certification = getCertificationBySlug(slug);

  if (!certification) {
    notFound();
  }

  return (
    <ClientLayout>
      <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
        <AnimatedBackground />
        
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'var(--overlay)',
            zIndex: 1,
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 2, marginTop: { xs: '60px', sm: '60px', md: '60px' }, py: { xs: 4, sm: 6, md: 8 } }}>
          <Section title={certification.title} bg="transparent">
            <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, sm: 3, md: 6 } }}>
              <Card
                sx={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'var(--backdrop-blur)',
                  WebkitBackdropFilter: 'var(--backdrop-blur)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: { xs: '20px', sm: '24px', md: '32px' },
                  boxShadow: 'var(--glass-shadow)',
                  mb: 4,
                }}
              >
                <CardContent sx={{ px: { xs: 2, sm: 2.5, md: 3 }, py: { xs: 2.5, sm: 3, md: 3.5 } }}>
                  <Typography
                    variant="h4"
                    sx={{
                      color: 'var(--accent)',
                      fontWeight: 700,
                      fontFamily: '"Poppins", sans-serif',
                      mb: 2,
                      textAlign: 'center',
                    }}
                  >
                    {certification.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: 'var(--text-light)',
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                      fontFamily: '"Poppins", sans-serif',
                      lineHeight: 1.8,
                      mb: 3,
                      textAlign: 'center',
                    }}
                  >
                    {certification.description}
                  </Typography>

                  {certification.link && (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                      <Button
                        component="a"
                        href={certification.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="contained"
                        sx={{
                          background: 'var(--accent)',
                          color: 'var(--bg)',
                          px: 4,
                          py: 1.5,
                          borderRadius: '12px',
                          fontFamily: '"Poppins", sans-serif',
                          fontWeight: 600,
                          '&:hover': {
                            background: 'var(--accent-hover)',
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        View Certification
                      </Button>
                    </Box>
                  )}

                  <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Link href="/certifications" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: 'var(--glass-border)',
                          color: 'var(--accent)',
                          fontFamily: '"Poppins", sans-serif',
                          '&:hover': {
                            borderColor: 'var(--glass-border-hover)',
                            background: 'var(--glass-bg-hover)',
                          },
                        }}
                      >
                        ← Back to Certifications
                      </Button>
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Section>
        </Box>
      </Box>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOccupationalCredential",
            "name": certification.title,
            "description": certification.description,
            "credentialCategory": "Certification",
            "recognizedBy": {
              "@type": "Organization"
            },
            "url": certification.link || `https://jerophin-portfolio.vercel.app/certifications/${certification.slug}`,
          }),
        }}
      />
    </ClientLayout>
  );
}

