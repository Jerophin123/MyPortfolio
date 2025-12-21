'use client';

import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import AnimatedBackground from '@/components/AnimatedBackground';
import ClientLayout from '@/components/ClientLayout';
import Section from '@/components/Section';

export default function OtherProfilesPage() {
  return (
    <ClientLayout>
      <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
        {/* Custom Animated Background */}
        <AnimatedBackground />



      {/* 🎛 Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'var(--overlay)',
          zIndex: 1
        }}
      />

      {/* 🧾 Foreground Content */}
      <Box sx={{ position: 'relative', zIndex: 2, py: { xs: 1, md: 0 }, marginTop: '60px'}}>
        <Section title="Connect" bg="transparent">

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 4,
              px: { xs: 0.1, sm: 2 },
              py: { xs: 2, sm: 0 },
              maxWidth: { xs: '100%', sm: '600px' },
              mx: 'auto',
              width: '100%'
            }}
          >
            <a
              href="https://linktr.ee/Jerophin"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <Card
                sx={{
                  width: { xs: '280px', sm: '100%' },
                  maxWidth: { xs: '280px', sm: 400 },
                  minHeight: { xs: '400px', sm: 'auto' },
                  background: 'var(--glass-bg)',
                  backdropFilter: 'var(--backdrop-blur)',
                  WebkitBackdropFilter: 'var(--backdrop-blur)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: { xs: '24px', sm: '32px' },
                  boxShadow: 'var(--glass-shadow)',
                  display: 'flex',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  cursor: 'pointer',
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
                    transform: 'translateY(-12px) scale(1.03)',
                    boxShadow: 'var(--glass-shadow-hover)',
                    borderColor: 'var(--glass-border-hover)',
                    background: 'var(--glass-bg-hover)'
                  },
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  px: { xs: 3, sm: 4 },
                  py: { xs: 3, sm: 3 },
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                <CardContent sx={{ textAlign: 'center', color: 'var(--accent)' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: { xs: 1.5, sm: 2 },
                      '& svg': {
                        width: { xs: 60, sm: 80 },
                        height: { xs: 60, sm: 80 }
                      }
                    }}
                  >
                    <svg viewBox="0 0 80 97.7" width="80" height="80">
                      <g>
                        <path fill="currentColor" d="M0.2,33.1h24.2L7.1,16.7l9.5-9.6L33,23.8V0h14.2v23.8L63.6,7.1l9.5,9.6L55.8,33H80v13.5H55.7l17.3,16.7
                        l-9.5,9.4L40,49.1L16.5,72.7L7,63.2l17.3-16.7H0V33.1H0.2z M33.1,65.8h14.2v32H33.1V65.8z">
                        </path>
                      </g>
                    </svg>
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'var(--accent)',
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                      fontFamily: '"Poppins", sans-serif',
                      fontWeight: 600,
                      mb: { xs: 0.5, sm: 1 }
                    }}
                  >
                    Linktree
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'var(--text-secondary)',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      fontFamily: '"Poppins", sans-serif',
                      mb: { xs: 1, sm: 2 },
                      textAlign: 'center'
                    }}
                  >
                    Connect with me on all platforms
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'var(--text-tertiary)',
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                      fontFamily: '"Poppins", sans-serif',
                      textAlign: 'center',
                      lineHeight: 1.4
                    }}
                  >
                    Click to access all my social links, contact info, and more
                  </Typography>
                </CardContent>
              </Card>
            </a>
          </Box>
        </Section>
      </Box>
    </Box>
    </ClientLayout>
  );
}
