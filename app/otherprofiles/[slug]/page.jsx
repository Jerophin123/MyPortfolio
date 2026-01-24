import { notFound } from 'next/navigation';
import { getProfileBySlug, getAllProfileSlugs } from '@/app/data/otherprofiles';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import AnimatedBackground from '@/components/AnimatedBackground';
import ClientLayout from '@/components/ClientLayout';
import Section from '@/components/Section';
import Link from 'next/link';

export async function generateStaticParams() {
  const slugs = getAllProfileSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const profile = getProfileBySlug(slug);
  
  if (!profile) {
    return {
      title: 'Profile Not Found',
    };
  }

  return {
    title: `${profile.title} | Jerophin D R Portfolio`,
    description: profile.description,
    keywords: `${profile.title}, Social Media, Portfolio, Jerophin D R`,
    openGraph: {
      title: `${profile.title} | Jerophin D R Portfolio`,
      description: profile.description,
      type: 'website',
      url: `https://jerophin-portfolio.vercel.app/otherprofiles/${profile.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${profile.title} | Jerophin D R Portfolio`,
      description: profile.description,
    },
    alternates: {
      canonical: `https://jerophin-portfolio.vercel.app/otherprofiles/${profile.slug}`,
    },
  };
}

export default async function ProfilePage({ params }) {
  const { slug } = await params;
  const profile = getProfileBySlug(slug);

  if (!profile) {
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
          <Section title={profile.title} bg="transparent">
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
                        display: 'flex',
                        justifyContent: 'center',
                        '& svg': {
                          width: { xs: '80px', sm: '100px', md: '120px' },
                          height: { xs: '80px', sm: '100px', md: '120px' },
                        }
                      }}
                    >
                      <svg viewBox="0 0 80 97.7" width="120" height="120">
                        <g>
                          <path fill="currentColor" d="M0.2,33.1h24.2L7.1,16.7l9.5-9.6L33,23.8V0h14.2v23.8L63.6,7.1l9.5,9.6L55.8,33H80v13.5H55.7l17.3,16.7
                            l-9.5,9.4L40,49.1L16.5,72.7L7,63.2l17.3-16.7H0V33.1H0.2z M33.1,65.8h14.2v32H33.1V65.8z">
                          </path>
                        </g>
                      </svg>
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
                    {profile.title}
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
                    {profile.description}
                  </Typography>

                  {profile.link && (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                      <Button
                        component="a"
                        href={profile.link}
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
                        Visit Profile
                      </Button>
                    </Box>
                  )}

                  <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Link href="/otherprofiles" style={{ textDecoration: 'none' }}>
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
                        ← Back to Connect
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
            "@type": "ProfilePage",
            "name": profile.title,
            "description": profile.description,
            "url": profile.link || `https://jerophin-portfolio.vercel.app/otherprofiles/${profile.slug}`,
          }),
        }}
      />
    </ClientLayout>
  );
}
