'use client';

import { motion } from 'framer-motion';
import { Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import AnimatedBackground from '@/components/AnimatedBackground';
import ClientLayout from '@/components/ClientLayout';

export default function NotFound() {
  return (
    <ClientLayout>
      <AnimatedBackground />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 4, sm: 6, md: 8 }
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          sx={{ width: '100%', maxWidth: { xs: '600px', md: '900px' } }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.08) 100%)',
              backdropFilter: 'blur(60px) saturate(180%) brightness(110%) contrast(120%)',
              WebkitBackdropFilter: 'blur(60px) saturate(180%) brightness(110%) contrast(120%)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              p: { xs: 4, sm: 5, md: 6 },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
                zIndex: 1
              }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'center', md: 'center' },
                gap: { xs: 3, md: 4 },
                width: '100%'
              }}
            >
              {/* Left Side - 404 Number Only (Desktop) / Top (Mobile) */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: { xs: '100%', md: '40%' },
                  flexShrink: 0
                }}
              >
                {/* 404 Number */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '60px', sm: '80px', md: '100px' },
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(77, 184, 255, 0.8) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontFamily: '"Poppins", sans-serif',
                      lineHeight: 1,
                      mb: { xs: 1, md: 0 }
                    }}
                  >
                    404
                  </Typography>
                </motion.div>
              </Box>

              {/* Right Side - Icon, Error Message & Buttons (Desktop) / Bottom (Mobile) */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'center', md: 'center' },
                  textAlign: { xs: 'center', md: 'center' },
                  width: { xs: '100%', md: '60%' },
                  flex: 1
                }}
              >
                  {/* Error Icon */}
                  <motion.div
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    style={{ marginBottom: '24px' }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Box
                        sx={{
                          width: { xs: '70px', sm: '80px', md: '90px' },
                          height: { xs: '70px', sm: '80px', md: '90px' },
                          color: 'rgba(77, 184, 255, 0.8)',
                          opacity: 0.9
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 17q.425 0 .713-.288T13 16v-4q0-.425-.288-.712T12 11t-.712.288T11 12v4q0 .425.288.713T12 17m0-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                        </svg>
                      </Box>
                    </Box>
                  </motion.div>

                  {/* Error Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    style={{ width: '100%' }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                        fontWeight: 700,
                        color: 'rgba(255, 255, 255, 0.95)',
                        fontFamily: '"Poppins", sans-serif',
                        mb: 2
                      }}
                    >
                      Page Not Found
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: '0.95rem', sm: '1.1rem' },
                        color: 'rgba(255, 255, 255, 0.75)',
                        fontFamily: '"Poppins", sans-serif',
                        mb: 4,
                        lineHeight: 1.6
                      }}
                    >
                      Oops! The page you're looking for doesn't exist or has been moved.
                    </Typography>
                  </motion.div>

                  {/* Action Buttons */}
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    sx={{
                      display: 'flex',
                      gap: '16px',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                      width: '100%'
                    }}
                  >
              <Button
                component={Link}
                href="/"
                sx={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.1) 100%)',
                  backdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: '24px',
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1.2, sm: 1.5 },
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  textTransform: 'none',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
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
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
                    zIndex: 1
                  },
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(77, 184, 255, 0.15) 0%, rgba(77, 184, 255, 0.12) 50%, rgba(77, 184, 255, 0.14) 100%)',
                    transform: 'translateY(-3px) scale(1.02)',
                    boxShadow: '0 15px 40px rgba(77, 184, 255, 0.2), 0 2px 0 rgba(255, 255, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                    borderColor: 'rgba(77, 184, 255, 0.25)',
                    color: '#4db8ff'
                  },
                  '&:active': {
                    transform: 'translateY(-1px) scale(0.98)'
                  }
                }}
              >
                Go Home
              </Button>
              <Button
                onClick={() => window.history.back()}
                sx={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.07) 100%)',
                  backdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '24px',
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1.2, sm: 1.5 },
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  textTransform: 'none',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1), 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
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
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                    zIndex: 1
                  },
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.1) 100%)',
                    transform: 'translateY(-3px) scale(1.02)',
                    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15), 0 2px 0 rgba(255, 255, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.28)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'rgba(255, 255, 255, 0.95)'
                  },
                  '&:active': {
                    transform: 'translateY(-1px) scale(0.98)'
                  }
                }}
              >
                Go Back
              </Button>
                  </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ClientLayout>
  );
}

