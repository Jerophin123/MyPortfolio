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
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2))',
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
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.08) 100%)',
                  backdropFilter: 'blur(60px) saturate(180%) brightness(110%) contrast(120%)',
                  WebkitBackdropFilter: 'blur(60px) saturate(180%) brightness(110%) contrast(120%)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: { xs: '24px', sm: '32px' },
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(255, 255, 255, 0.25), 0 -1px 0 rgba(255, 255, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.03), inset 1px 0 0 rgba(255, 255, 255, 0.08), inset -1px 0 0 rgba(255, 255, 255, 0.08)',
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
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
                    zIndex: 1
                  },
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.03)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 2px 0 rgba(255, 255, 255, 0.3), 0 -2px 0 rgba(255, 255, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(255, 255, 255, 0.05), inset 1px 0 0 rgba(255, 255, 255, 0.12), inset -1px 0 0 rgba(255, 255, 255, 0.12)',
                    borderColor: 'rgba(77, 184, 255, 0.3)',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.12) 100%)'
                  },
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  px: { xs: 3, sm: 4 },
                  py: { xs: 3, sm: 3 },
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                <CardContent sx={{ textAlign: 'center', color: '#4db8ff' }}>
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
                        <path fill="#4db8ff" d="M0.2,33.1h24.2L7.1,16.7l9.5-9.6L33,23.8V0h14.2v23.8L63.6,7.1l9.5,9.6L55.8,33H80v13.5H55.7l17.3,16.7
                        l-9.5,9.4L40,49.1L16.5,72.7L7,63.2l17.3-16.7H0V33.1H0.2z M33.1,65.8h14.2v32H33.1V65.8z">
                        </path>
                      </g>
                    </svg>
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#4db8ff',
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
                      color: '#c0c0c0',
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
                      color: '#999',
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
