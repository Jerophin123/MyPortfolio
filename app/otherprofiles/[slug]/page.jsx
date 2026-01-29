'use client';

import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import AnimatedBackground from '@/components/AnimatedBackground';
import ClientLayout from '@/components/ClientLayout';
import Section from '@/components/Section';
import { getProfileBySlug } from '@/app/data/otherprofiles';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { use } from 'react';

export default function OtherProfileSlugPage({ params }) {
  const { slug } = use(params);
  const profile = getProfileBySlug(slug);
  const router = useRouter();

  useEffect(() => {
    if (!profile) {
      router.push('/otherprofiles');
    }
  }, [profile, router]);

  if (!profile) {
    return null;
  }

  return (
    <ClientLayout>
      <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
        <AnimatedBackground />
        <Section bg="transparent">
          <Box
            sx={{
              fontFamily: '"Poppins", sans-serif',
              maxWidth: '1200px',
              marginTop: { xs: '60px', sm: '60px', md: '60px' },
              mx: 'auto',
              px: { xs: 2, sm: 3, md: 4 },
              py: { xs: 4, sm: 6, md: 8 },
              zIndex: 2,
              position: 'relative',
              color: 'var(--text-color)',
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                textAlign: 'center',
                fontWeight: 700,
                color: 'var(--text-color)',
                mb: 4,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              }}
            >
              {profile.title}
            </Typography>
            <Card
              sx={{
                background: 'var(--glass-bg)',
                backdropFilter: 'var(--backdrop-blur)',
                WebkitBackdropFilter: 'var(--backdrop-blur)',
                border: '1px solid var(--glass-border)',
                borderRadius: { xs: '20px', sm: '24px', md: '32px' },
                boxShadow: 'var(--glass-shadow)',
                p: { xs: 3, sm: 4, md: 5 },
                mt: 4,
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, color: 'var(--text-color)' }}>
                  Description
                </Typography>
                <Typography variant="body1" paragraph sx={{ color: 'var(--text-color-secondary)' }}>
                  {profile.description}
                </Typography>
                {profile.link && (
                  <Box mt={3} textAlign="center">
                    <Button
                      variant="contained"
                      component={Link}
                      href={profile.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        background: 'var(--button-bg)',
                        color: 'var(--button-text)',
                        '&:hover': {
                          background: 'var(--button-hover-bg)',
                        },
                      }}
                    >
                      Visit Profile
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="outlined"
                component={Link}
                href="/otherprofiles"
                sx={{
                  borderColor: 'var(--button-bg)',
                  color: 'var(--button-bg)',
                  '&:hover': {
                    borderColor: 'var(--button-hover-bg)',
                    color: 'var(--button-hover-bg)',
                    background: 'rgba(var(--button-bg-rgb), 0.1)',
                  },
                }}
              >
                Back to Other Profiles
              </Button>
            </Box>
          </Box>
        </Section>
      </Box>
    </ClientLayout>
  );
}

