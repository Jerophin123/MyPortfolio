'use client';

import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import AnimatedBackground from '@/components/AnimatedBackground';
import ClientLayout from '@/components/ClientLayout';
import Section from '@/components/Section';
import Link from 'next/link';

export default function CertificationSlugClient({ certification }) {
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
              py: { xs: 3, sm: 6, md: 10 },
              px: { xs: 1.5, sm: 3, md: 6 },
              mx: 'auto',
              zIndex: 1,
              position: 'relative',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <Card
              sx={{
                background: 'var(--glass-bg)',
                backdropFilter: 'var(--backdrop-blur-light)',
                WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                border: '1px solid var(--glass-border-light)',
                borderRadius: { xs: '20px', sm: '24px', md: '32px' },
                boxShadow: 'var(--glass-shadow)',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                overflow: 'hidden',
                p: { xs: 2.5, sm: 4, md: 6 },
                position: 'relative',
                width: '100%',
                boxSizing: 'border-box',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'var(--glass-shine)',
                  zIndex: 1
                }
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ mb: { xs: 3, sm: 4, md: 5 } }}>
                  <Button
                    component={Link}
                    href="/certifications"
                    sx={{
                      mb: { xs: 3, sm: 4 },
                      px: { xs: 2, sm: 3 },
                      py: { xs: 1, sm: 1.5 },
                      fontFamily: '"Poppins", sans-serif',
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                      borderRadius: { xs: '16px', sm: '20px' },
                      background: 'var(--glass-bg-hover)',
                      backdropFilter: 'var(--backdrop-blur-light)',
                      WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                      border: '1px solid var(--glass-border-hover)',
                      color: 'var(--accent)',
                      textTransform: 'none',
                      fontWeight: 600,
                      boxShadow: 'var(--glass-shadow)',
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'var(--glass-shine)',
                        zIndex: 1
                      },
                      '&:hover': {
                        background: 'var(--glass-bg-hover)',
                        transform: { xs: 'none', sm: 'translateY(-3px) scale(1.02)' },
                        boxShadow: { xs: 'var(--glass-shadow)', sm: 'var(--glass-shadow-hover)' }
                      }
                    }}
                  >
                    ← Back to Certifications
                  </Button>

                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                      color: 'var(--accent)',
                      fontWeight: 700,
                      mb: { xs: 2, sm: 3 },
                      fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
                      lineHeight: { xs: 1.3, sm: 1.4, md: 1.5 }
                    }}
                  >
                    {certification.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: 'var(--text-light)',
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                      lineHeight: { xs: 1.7, sm: 1.8, md: 1.9 },
                      mb: { xs: 3, sm: 4 }
                    }}
                  >
                    {certification.description}
                  </Typography>

                  {certification.link && (
                    <Box sx={{ mt: { xs: 3, sm: 4 }, textAlign: 'center' }}>
                      <Button
                        variant="contained"
                        component={Link}
                        href={certification.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          px: { xs: 3, sm: 4 },
                          py: { xs: 1.5, sm: 2 },
                          fontFamily: '"Poppins", sans-serif',
                          fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                          borderRadius: { xs: '16px', sm: '20px' },
                          background: 'var(--button-bg)',
                          color: 'var(--button-text)',
                          textTransform: 'none',
                          fontWeight: 600,
                          boxShadow: 'var(--glass-shadow)',
                          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          '&:hover': {
                            background: 'var(--button-hover-bg)',
                            transform: { xs: 'none', sm: 'translateY(-3px) scale(1.02)' },
                            boxShadow: { xs: 'var(--glass-shadow)', sm: 'var(--glass-shadow-hover)' }
                          }
                        }}
                      >
                        View Certificate
                      </Button>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Section>
      </Box>
    </ClientLayout>
  );
}

