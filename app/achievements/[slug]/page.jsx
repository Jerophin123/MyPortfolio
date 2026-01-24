import { notFound } from 'next/navigation';
import { getAchievementBySlug, getAllAchievementSlugs } from '@/app/data/achievements';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import AnimatedBackground from '@/components/AnimatedBackground';
import ClientLayout from '@/components/ClientLayout';
import Section from '@/components/Section';
import Link from 'next/link';

export async function generateStaticParams() {
  const slugs = getAllAchievementSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }) {
  const achievement = getAchievementBySlug(params.slug);
  
  if (!achievement) {
    return {
      title: 'Achievement Not Found',
    };
  }

  return {
    title: `${achievement.title} | Jerophin D R Portfolio`,
    description: achievement.description,
    keywords: `${achievement.title}, Achievement, Portfolio, Jerophin D R`,
    openGraph: {
      title: `${achievement.title} | Jerophin D R Portfolio`,
      description: achievement.description,
      type: 'website',
      url: `https://jerophin-portfolio.vercel.app/achievements/${achievement.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${achievement.title} | Jerophin D R Portfolio`,
      description: achievement.description,
    },
    alternates: {
      canonical: `https://jerophin-portfolio.vercel.app/achievements/${achievement.slug}`,
    },
  };
}

export default function AchievementPage({ params }) {
  const achievement = getAchievementBySlug(params.slug);

  if (!achievement) {
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
          <Section title={achievement.title} bg="transparent">
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
                    {achievement.title}
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
                    {achievement.description}
                  </Typography>

                  {achievement.link && (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                      <Button
                        component="a"
                        href={achievement.link}
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
                        View Achievement
                      </Button>
                    </Box>
                  )}

                  <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Link href="/achievements" style={{ textDecoration: 'none' }}>
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
                        ← Back to Achievements
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
            "@type": "AchievementAction",
            "name": achievement.title,
            "description": achievement.description,
            "url": achievement.link || `https://jerophin-portfolio.vercel.app/achievements/${achievement.slug}`,
          }),
        }}
      />
    </ClientLayout>
  );
}

