'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1629 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Poppins", sans-serif'
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '600px',
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 4, sm: 6, md: 8 }
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                textAlign: 'center',
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
              {/* Error Icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: -180 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                style={{ display: 'flex', justifyContent: 'center', mb: 3 }}
              >
                <Box
                  sx={{
                    width: { xs: '100px', sm: '120px' },
                    height: { xs: '100px', sm: '120px' },
                    color: 'rgba(255, 87, 87, 0.9)',
                    opacity: 0.9
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2zm0-4h-2V7h2z"/>
                  </svg>
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
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                    fontWeight: 700,
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontFamily: '"Poppins", sans-serif',
                    mb: 2
                  }}
                >
                  Critical Error
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '0.95rem', sm: '1.1rem' },
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontFamily: '"Poppins", sans-serif',
                    mb: 3,
                    lineHeight: 1.6
                  }}
                >
                  A critical error occurred in the application. Please refresh the page or contact support if the problem persists.
                </Typography>
                {error?.message && (
                  <Box
                    sx={{
                      background: 'rgba(255, 87, 87, 0.1)',
                      border: '1px solid rgba(255, 87, 87, 0.2)',
                      borderRadius: '16px',
                      p: 2,
                      mb: 3,
                      textAlign: 'left'
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: '0.85rem', sm: '0.9rem' },
                        color: 'rgba(255, 87, 87, 0.9)',
                        fontFamily: '"Poppins", sans-serif',
                        wordBreak: 'break-word'
                      }}
                    >
                      <strong>Error:</strong> {error.message}
                    </Typography>
                  </Box>
                )}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
              >
                <Button
                  onClick={reset}
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
                  Try Again
                </Button>
                <Button
                  onClick={() => window.location.href = '/'}
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
                  Go Home
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </body>
    </html>
  );
}

