'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Typography, Button, Box } from '@mui/material';

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
          background: 'var(--bg-primary)',
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
                background: 'var(--glass-bg)',
                backdropFilter: 'var(--backdrop-blur)',
                WebkitBackdropFilter: 'var(--backdrop-blur)',
                border: '1px solid var(--glass-border)',
                borderRadius: '32px',
                boxShadow: 'var(--glass-shadow)',
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
                  background: 'var(--glass-shine)',
                  zIndex: 1
                }
              }}
            >
              {/* Error Icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: -180 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}
              >
                <Box
                  sx={{
                    width: { xs: '100px', sm: '120px' },
                    height: { xs: '100px', sm: '120px' },
                    color: 'var(--accent)',
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
                    color: 'var(--text-primary)',
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
                    color: 'var(--text-secondary)',
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
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
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
                        color: 'var(--accent)',
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
                    background: 'var(--glass-bg)',
                    backdropFilter: 'var(--backdrop-blur-light)',
                    WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '24px',
                    px: { xs: 3, sm: 4 },
                    py: { xs: 1.2, sm: 1.5 },
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
                      transform: 'translateY(-3px) scale(1.02)',
                      boxShadow: 'var(--glass-shadow-hover)',
                      borderColor: 'var(--glass-border-hover)',
                      color: 'var(--accent)'
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
                    background: 'var(--glass-bg)',
                    backdropFilter: 'var(--backdrop-blur-light)',
                    WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '24px',
                    px: { xs: 3, sm: 4 },
                    py: { xs: 1.2, sm: 1.5 },
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
                      transform: 'translateY(-3px) scale(1.02)',
                      boxShadow: 'var(--glass-shadow-hover)',
                      borderColor: 'var(--glass-border-hover)',
                      color: 'var(--accent)'
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

