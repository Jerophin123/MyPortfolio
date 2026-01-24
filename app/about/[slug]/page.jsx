import { notFound } from 'next/navigation';
import { getEducationBySlug, getAllEducationSlugs } from '@/app/data/about';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import AnimatedBackground from '@/components/AnimatedBackground';
import ClientLayout from '@/components/ClientLayout';
import Section from '@/components/Section';
import Link from 'next/link';
import Image from 'next/image';

export async function generateStaticParams() {
  const slugs = getAllEducationSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const education = getEducationBySlug(slug);
  
  if (!education) {
    return {
      title: 'Education Not Found',
    };
  }

  return {
    title: `${education.title} | Jerophin D R Portfolio`,
    description: `${education.title} at ${education.institute}. ${education.score}. ${education.date}`,
    keywords: `${education.title}, ${education.institute}, Education, Portfolio, Jerophin D R`,
    openGraph: {
      title: `${education.title} | Jerophin D R Portfolio`,
      description: `${education.title} at ${education.institute}. ${education.score}. ${education.date}`,
      type: 'website',
      url: `https://jerophin-portfolio.vercel.app/about/${education.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${education.title} | Jerophin D R Portfolio`,
      description: `${education.title} at ${education.institute}. ${education.score}. ${education.date}`,
    },
    alternates: {
      canonical: `https://jerophin-portfolio.vercel.app/about/${education.slug}`,
    },
  };
}

export default async function EducationPage({ params }) {
  const { slug } = await params;
  const education = getEducationBySlug(slug);

  if (!education) {
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
          <Section title={education.title} bg="transparent">
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
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        width: { xs: '100px', sm: '120px', md: '150px' },
                        height: { xs: '100px', sm: '120px', md: '150px' },
                        background: 'var(--glass-bg)',
                        backdropFilter: 'var(--backdrop-blur-light)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: { xs: '12px', sm: '16px' },
                        p: { xs: 1, sm: 1.5 },
                        boxShadow: 'var(--glass-shadow)',
                      }}
                    >
                      <Image
                        src={education.logo}
                        alt={`${education.title} Logo`}
                        width={150}
                        height={150}
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: '8px',
                        }}
                      />
                    </Box>
                  </Box>

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
                    {education.title}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      color: 'var(--accent)',
                      fontWeight: 600,
                      fontFamily: '"Poppins", sans-serif',
                      mb: 1,
                      textAlign: 'center',
                    }}
                  >
                    {education.score}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: 'var(--text-light)',
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                      fontFamily: '"Poppins", sans-serif',
                      lineHeight: 1.8,
                      mb: 2,
                      textAlign: 'center',
                    }}
                  >
                    {education.institute}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: 'var(--text-light)',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      fontFamily: '"Poppins", sans-serif',
                      mb: 3,
                      textAlign: 'center',
                    }}
                  >
                    {education.date.includes(':') ? (
                      <>
                        {education.date.split(':')[0]}:{' '}
                        <span style={{ color: 'var(--accent)' }}>{education.date.split(':')[1]}</span>
                      </>
                    ) : (
                      education.date
                    )}
                  </Typography>

                  {education.link && (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                      <Button
                        component="a"
                        href={education.link}
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
                        Visit Institution
                      </Button>
                    </Box>
                  )}

                  <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Link href="/about" style={{ textDecoration: 'none' }}>
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
                        ← Back to About
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
            "name": education.title,
            "description": `${education.title} at ${education.institute}`,
            "credentialCategory": "Educational",
            "educationalLevel": education.title,
            "recognizedBy": {
              "@type": "Organization",
              "name": education.institute,
              "url": education.link
            },
            "url": education.link || `https://jerophin-portfolio.vercel.app/about/${education.slug}`,
          }),
        }}
      />
    </ClientLayout>
  );
}
