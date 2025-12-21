'use client';

import { motion } from 'framer-motion';
import { Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import ClientLayout from '@/components/ClientLayout';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function NotFound() {
  return (
    <ClientLayout>
      <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
        {/* Custom Animated Background */}
        <AnimatedBackground />

        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'var(--overlay)',
            zIndex: 1
          }}
        />

        {/* Foreground Content */}
        <Box sx={{ 
          position: 'relative', 
          zIndex: 2, 
          py: { xs: 2, sm: 6, md: 8 }, 
          marginTop: { xs: '72px', sm: '80px', md: '96px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: { xs: 'calc(100vh - 150px)', sm: 'calc(100vh - 200px)' }
        }}>
          <Box
            sx={{
              width: '100%',
              maxWidth: { xs: '85%', sm: '700px', md: '800px' },
              mx: 'auto',
              px: { xs: 1.5, sm: 3, md: 4 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transform: { xs: 'translateX(-15px)', md: 'translateX(-20px)' }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ width: '100%', maxWidth: '100%', textAlign: 'center' }}
            >
              <Box
                sx={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'var(--backdrop-blur)',
                  WebkitBackdropFilter: 'var(--backdrop-blur)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: { xs: '24px', sm: '32px' },
                  boxShadow: 'var(--glass-shadow)',
                  position: 'relative',
                  overflow: 'hidden',
                  p: { xs: 4, sm: 5, md: 6 },
                  width: { xs: '90%', sm: '100%' },
                  minHeight: { xs: '400px', sm: 'auto' },
                  mx: 'auto',
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
                {/* 404 Number */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8, type: 'spring', stiffness: 200 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: { xs: 1, sm: 2 },
                      mb: { xs: 2, sm: 3 }
                    }}
                  >
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: { xs: '48px', sm: '80px', md: '100px' },
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 50%, var(--accent) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontFamily: '"Poppins", sans-serif',
                        lineHeight: 1,
                        mb: { xs: 1.5, sm: 2, md: 0 }
                      }}
                    >
                      404
                    </Typography>
                  </Box>
                </motion.div>

                {/* Error Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: '1.25rem', sm: '2rem', md: '2.5rem' },
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      fontFamily: '"Poppins", sans-serif',
                      mb: { xs: 1.5, sm: 2 },
                      px: { xs: 1, sm: 0 }
                    }}
                  >
                    Page Not Found
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '0.875rem', sm: '1.1rem' },
                      color: 'var(--text-secondary)',
                      fontFamily: '"Poppins", sans-serif',
                      mb: { xs: 3, sm: 4 },
                      lineHeight: 1.6,
                      maxWidth: '500px',
                      mx: 'auto',
                      px: { xs: 0.5, sm: 0 }
                    }}
                  >
                    The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                  </Typography>
                </motion.div>

                {/* Action Buttons */}
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 1.5, sm: 2 },
                    width: '100%',
                    maxWidth: { xs: '100%', sm: 'auto' }
                  }}
                >
                  <Button
                    component={Link}
                    href="/"
                    fullWidth={true}
                    sx={{
                      background: 'var(--glass-bg)',
                      backdropFilter: 'var(--backdrop-blur-light)',
                      WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: { xs: '20px', sm: '24px' },
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1.5, sm: 1.5 },
                      color: 'var(--text-primary)',
                      fontFamily: '"Poppins", sans-serif',
                      fontWeight: 600,
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      textTransform: 'none',
                      boxShadow: 'var(--glass-shadow)',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
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
                        boxShadow: 'var(--glass-shadow-hover)',
                        borderColor: 'var(--glass-border-hover)',
                        color: 'var(--accent)'
                      },
                      '&:active': {
                        transform: { xs: 'scale(0.98)', sm: 'translateY(-1px) scale(0.98)' }
                      }
                    }}
                  >
                    Go Home
                  </Button>
                  <Button
                    component={Link}
                    href="/about"
                    fullWidth={true}
                    sx={{
                      background: 'var(--glass-bg)',
                      backdropFilter: 'var(--backdrop-blur-light)',
                      WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: { xs: '20px', sm: '24px' },
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1.5, sm: 1.5 },
                      color: 'var(--text-secondary)',
                      fontFamily: '"Poppins", sans-serif',
                      fontWeight: 600,
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      textTransform: 'none',
                      boxShadow: 'var(--glass-shadow)',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
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
                        boxShadow: 'var(--glass-shadow-hover)',
                        borderColor: 'var(--glass-border-hover)',
                        color: 'var(--accent)'
                      },
                      '&:active': {
                        transform: { xs: 'scale(0.98)', sm: 'translateY(-1px) scale(0.98)' }
                      }
                    }}
                  >
                    About Me
                  </Button>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </ClientLayout>
  );
}

