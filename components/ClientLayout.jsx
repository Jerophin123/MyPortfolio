'use client';

import { useState, useEffect } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Typography, useMediaQuery, useTheme } from '@mui/material';
import { keyframes } from '@emotion/react';
import { motion, AnimatePresence } from 'framer-motion';
import Appbar from './Appbar';
import Link from 'next/link';

const navLinks = [
  { 
    label: 'Home', 
    path: '/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 19v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-3q-.425 0-.712-.288T14 20v-5q0-.425-.288-.712T13 14h-2q-.425 0-.712.288T10 15v5q0 .425-.288.713T9 21H6q-.825 0-1.412-.587T4 19"/>
      </svg>
    )
  },
  { 
    label: 'About', 
    path: '/about',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17q.425 0 .713-.288T13 16v-4q0-.425-.288-.712T12 11t-.712.288T11 12v4q0 .425.288.713T12 17m0-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
      </svg>
    )
  },
  { 
    label: 'Skills', 
    path: '/skills',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 18q-.825 0-1.412-.587T8 16v-1.25q-1.425-.975-2.212-2.5T5 9q0-2.925 2.038-4.962T12 2t4.963 2.038T19 9q0 1.725-.788 3.238T16 14.75V16q0 .825-.587 1.413T14 18zm0 4q-.425 0-.712-.288T9 21t.288-.712T10 20h4q.425 0 .713.288T15 21t-.288.713T14 22z"/>
      </svg>
    )
  },
  { 
    label: 'Experience', 
    path: '/experience',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 21q-.825 0-1.412-.587T2 19V8q0-.825.588-1.412T4 6h4V4q0-.825.588-1.412T10 2h4q.825 0 1.413.588T16 4v2h4q.825 0 1.413.588T22 8v11q0 .825-.587 1.413T20 21zm6-15h4V4h-4z"/>
      </svg>
    )
  },
  { 
    label: 'Projects', 
    path: '/projects',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.5 17q.625 0 1.063-.437T10 15.5t-.437-1.062T8.5 14t-1.062.438T7 15.5t.438 1.063T8.5 17m0-7q.625 0 1.063-.437T10 8.5t-.437-1.062T8.5 7t-1.062.438T7 8.5t.438 1.063T8.5 10m7 7q.625 0 1.063-.437T17 15.5t-.437-1.062T15.5 14t-1.062.438T14 15.5t.438 1.063T15.5 17m0-7q.625 0 1.063-.437T17 8.5t-.437-1.062T15.5 7t-1.062.438T14 8.5t.438 1.063T15.5 10M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z"/>
      </svg>
    )
  },
  { 
    label: 'Certifications', 
    path: '/certifications',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="m12 14.475l1.925 1.15q.275.175.538-.012t.187-.513l-.5-2.175l1.7-1.475q.25-.225.15-.537t-.45-.338l-2.225-.175l-.875-2.075q-.125-.3-.45-.3t-.45.3l-.875 2.075l-2.225.175q-.35.025-.45.338t.15.537l1.7 1.475l-.5 2.175q-.075.325.188.513t.537.012zM8.65 20H6q-.825 0-1.412-.587T4 18v-2.65L2.075 13.4q-.275-.3-.425-.662T1.5 12t.15-.737t.425-.663L4 8.65V6q0-.825.588-1.412T6 4h2.65l1.95-1.925q.3-.275.663-.425T12 1.5t.738.15t.662.425L15.35 4H18q.825 0 1.413.588T20 6v2.65l1.925 1.95q.275.3.425.663t.15.737t-.15.738t-.425.662L20 15.35V18q0 .825-.587 1.413T18 20h-2.65l-1.95 1.925q-.3.275-.662.425T12 22.5t-.737-.15t-.663-.425z"/>
      </svg>
    )
  },
  { 
    label: 'Achievements', 
    path: '/achievements',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 10.8V7H5v1q0 .95.55 1.713T7 10.8m10 0q.9-.325 1.45-1.088T19 8V7h-2zM11 19v-3.1q-1.225-.275-2.187-1.037T7.4 12.95q-1.875-.225-3.137-1.637T3 8V7q0-.825.588-1.412T5 5h2q0-.825.588-1.412T9 3h6q.825 0 1.413.588T17 5h2q.825 0 1.413.588T21 7v1q0 1.9-1.263 3.313T16.6 12.95q-.45 1.15-1.412 1.913T13 15.9V19h3q.425 0 .713.288T17 20t-.288.713T16 21H8q-.425 0-.712-.288T7 20t.288-.712T8 19z"/>
      </svg>
    )
  },
  { 
    label: 'Connect', 
    path: '/otherprofiles',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.625 22q-.425 0-.737-.312t-.313-.738v-2.625q0-2.25 1.4-3.975t3.6-2.2q-1 .7-1.55 1.762t-.55 2.288v4.75q0 .275.075.55t.25.5zM8.3 22q-.425 0-.737-.312t-.313-.738V16.2q0-1.75 1.238-2.975T11.475 12H16.2q1.75 0 2.975 1.225T20.4 16.2v1.6q0 1.75-1.225 2.975T16.2 22zM12 9.9q-1.65 0-2.8-1.15t-1.15-2.8t1.15-2.8T12 2t2.8 1.15t1.15 2.8t-1.15 2.8T12 9.9"/>
      </svg>
    )
  }
];

const fallIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// iOS 16-Inspired Top Sheet Component
function IOSBottomSheet({ open, onClose, navLinks }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: '72px', // Start below AppBar
              left: 0,
              right: 0,
              bottom: 0,
              background: 'transparent',
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
              zIndex: 1297, // Below menu but above content
            }}
          />
          
          {/* Top Sheet */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
            }}
            style={{
              position: 'fixed',
              top: '72px', // Start below AppBar (mobile height)
              left: 0,
              right: 0,
              zIndex: 1298, // Below AppBar (1300) but above backdrop (1299)
              maxHeight: 'calc(100vh - 72px)',
              overflow: 'auto',
            }}
          >
            <Box
              sx={{
                background: 'transparent',
                backdropFilter: 'var(--backdrop-blur-nav)',
                WebkitBackdropFilter: 'var(--backdrop-blur-nav)',
                border: 'none',
                borderTop: 'none',
                borderBottomLeftRadius: '28px',
                borderBottomRightRadius: '28px',
                boxShadow: 'none',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Menu Items - Grid Layout */}
              <Box 
                sx={{ 
                  px: 2, 
                  pt: 3, 
                  pb: 4,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 2
                }}
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <Box
                      component={Link}
                      href={link.path}
                      onClick={onClose}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100px',
                        py: 2.5,
                        px: 2,
                        borderRadius: '20px',
                        background: 'var(--glass-bg)',
                        backdropFilter: 'var(--backdrop-blur-light)',
                        WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                        border: '1px solid var(--glass-border)',
                        boxShadow: 'var(--glass-shadow)',
                        textDecoration: 'none',
                        color: 'var(--text-primary)',
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 600,
                        fontSize: { xs: '0.85rem', sm: '0.9rem' },
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        gap: 1,
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '1px',
                          background: 'var(--glass-shine)',
                          zIndex: 1,
                          opacity: 0.8
                        },
                        '& svg': {
                          width: { xs: '40px', sm: '44px' },
                          height: { xs: '40px', sm: '44px' },
                          color: 'var(--text-primary)',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          zIndex: 2
                        },
                        '&:active': {
                          transform: 'scale(0.95)',
                          background: 'var(--glass-bg-hover)',
                          borderColor: 'var(--glass-border-hover)',
                          boxShadow: 'var(--glass-shadow)',
                          '& svg': {
                            color: 'var(--accent)',
                            transform: 'scale(0.95)'
                          }
                        },
                        '&:hover': {
                          background: 'var(--glass-bg-hover)',
                          color: 'var(--accent)',
                          borderColor: 'var(--glass-border-hover)',
                          transform: 'translateY(-4px) scale(1.02)',
                          boxShadow: 'var(--glass-shadow-hover)',
                          '&::before': {
                            opacity: 1
                          },
                          '& svg': {
                            color: 'var(--accent)',
                            transform: 'scale(1.1)',
                            filter: 'drop-shadow(0 4px 8px var(--particle-glow))'
                          }
                        }
                      }}
                    >
                      {link.icon}
                      <Typography
                        component="span"
                        sx={{
                          fontSize: { xs: '0.8rem', sm: '0.85rem' },
                          fontWeight: 600,
                          mt: 0.5,
                          position: 'relative',
                          zIndex: 2
                        }}
                      >
                        {link.label}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ClientLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showText, setShowText] = useState(false);

  const handleClick = () => {
    setShowText((prev) => !prev);
  };

  return (
    <Box
      component="div"
      suppressHydrationWarning
      sx={{
        fontFamily: '"Poppins", sans-serif',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100vw',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
          display: 'none'
        },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      <Appbar
        handleClick={handleClick}
        showText={showText}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />

      {/* iOS 16-Inspired Top Sheet Menu (Mobile Only) */}
      <IOSBottomSheet
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navLinks={navLinks}
      />

      {children}

      <Box
        component="footer"
        sx={{
          background: 'linear-gradient(135deg, var(--footer-bg-start) 0%, var(--footer-bg-end) 100%)',
          backdropFilter: 'var(--backdrop-blur-light)',
          WebkitBackdropFilter: 'var(--backdrop-blur-light)',
          borderTop: '1px solid var(--glass-border)',
          boxShadow: 'var(--glass-shadow)',
          py: { xs: 5, sm: 6, md: 7 },
          px: { xs: 3, sm: 4, md: 6 },
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
          }
        }}
      >
        <Box
          sx={{
            maxWidth: '1400px',
            mx: 'auto',
            width: '100%',
          }}
        >
          {/* Main Footer Content */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
              gap: { xs: 4, sm: 5, md: 6 },
              mb: { xs: 4, sm: 5, md: 6 },
            }}
          >
            {/* About Section */}
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography 
                variant="h6"
                sx={{ 
                  mb: { xs: 1.5, sm: 2 },
                  color: 'var(--accent)',
                  fontWeight: 700,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                  fontFamily: '"Poppins", sans-serif'
                }}
              >
                About
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: { xs: 1.5, sm: 2 },
                  color: 'var(--text-secondary)',
                  lineHeight: { xs: 1.6, sm: 1.7 },
                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                  fontFamily: '"Poppins", sans-serif'
                }}
              >
                Passionate about building intuitive UIs and scalable backend systems. Let's build meaningful digital experiences together.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  justifyContent: { xs: 'center', sm: 'flex-start' }
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--accent)' }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                </svg>
                <Typography 
                  sx={{ 
                    fontSize: { xs: '0.8rem', sm: '0.85rem' }, 
                    color: 'var(--text-tertiary)',
                    lineHeight: { xs: 1.7, sm: 1.8 },
                    fontFamily: '"Poppins", sans-serif'
                  }}
                >
                  Chennai, India
                </Typography>
              </Box>
            </Box>

            {/* Quick Links Section */}
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography 
                variant="h6"
                sx={{ 
                  mb: { xs: 1.5, sm: 2 },
                  color: 'var(--accent)',
                  fontWeight: 700,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                  fontFamily: '"Poppins", sans-serif'
                }}
              >
                Quick Links
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: { xs: 1, sm: 1.25 },
                  alignItems: { xs: 'center', sm: 'flex-start' }
                }}
              >
                {[
                  { label: 'About', path: '/about' },
                  { label: 'Skills', path: '/skills' },
                  { label: 'Experience', path: '/experience' },
                  { label: 'Projects', path: '/projects' },
                  { label: 'Certifications', path: '/certifications' },
                  { label: 'Achievements', path: '/achievements' },
                ].map((link) => (
                  <Box
                    key={link.path}
                    component={Link}
                    href={link.path}
                    sx={{
                      textDecoration: 'none',
                      color: 'var(--text-secondary)',
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      fontFamily: '"Poppins", sans-serif',
                      transition: 'all 0.3s ease',
                      display: 'inline-block',
                      '&:hover': {
                        color: 'var(--accent)',
                        transform: 'translateX(4px)'
                      }
                    }}
                  >
                    {link.label}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Contact Section */}
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography 
                variant="h6"
                sx={{ 
                  mb: { xs: 1.5, sm: 2 },
                  color: 'var(--accent)',
                  fontWeight: 700,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                  fontFamily: '"Poppins", sans-serif'
                }}
              >
                Contact
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: { xs: 1.5, sm: 1.75 },
                  alignItems: { xs: 'center', sm: 'flex-start' }
                }}
              >
                <Box
                  component="a"
                  href="mailto:jerophinstanley47@gmail.com"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    textDecoration: 'none',
                    color: 'var(--text-secondary)',
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    fontFamily: '"Poppins", sans-serif',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'var(--accent)',
                      transform: 'translateX(4px)'
                    }
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
                  </svg>
                  jerophinstanley47@gmail.com
                </Box>
                <Box
                  component="a"
                  href="tel:+919940306399"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    textDecoration: 'none',
                    color: 'var(--text-secondary)',
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    fontFamily: '"Poppins", sans-serif',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'var(--accent)',
                      transform: 'translateX(4px)'
                    }
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
                  </svg>
                  +919940306399
                </Box>
                <Box
                  component="a"
                  href="https://linktr.ee/Jerophin"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    color: 'var(--accent)',
                    fontFamily: '"Poppins", sans-serif',
                    textDecoration: 'none',
                    mt: 0.5,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'var(--accent-hover)',
                      transform: 'translateX(4px)'
                    }
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" fill="currentColor"/>
                  </svg>
                  All Links
                </Box>
              </Box>
            </Box>

            {/* Social Media Section */}
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography 
                variant="h6"
                sx={{ 
                  mb: { xs: 1.5, sm: 2 },
                  color: 'var(--accent)',
                  fontWeight: 700,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                  fontFamily: '"Poppins", sans-serif'
                }}
              >
                Connect
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: { xs: 2, sm: 2.5 },
                  justifyContent: { xs: 'center', sm: 'flex-start' },
                  alignItems: 'center',
                }}
              >
            {/* LinkedIn */}
            <Box
              component="a"
              href="https://linkedin.com/in/jerophin-d-r-b9a73b257/"
              target="_blank"
              rel="noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: 44, sm: 48 },
                height: { xs: 44, sm: 48 },
                borderRadius: { xs: '14px', sm: '16px' },
                background: 'var(--glass-bg)',
                backdropFilter: 'var(--backdrop-blur-light)',
                WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                border: '1px solid var(--glass-border-hover)',
                color: 'var(--accent)',
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
                  transform: 'translateY(-4px) scale(1.1)',
                  background: 'var(--glass-bg-hover)',
                  boxShadow: 'var(--glass-shadow-hover)',
                  borderColor: 'var(--glass-border-hover)'
                },
                '&:active': {
                  transform: 'translateY(-2px) scale(1.05)'
                },
                '& svg': {
                  width: { xs: 22, sm: 24 },
                  height: { xs: 22, sm: 24 },
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  zIndex: 2
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 128 128" fill="currentColor">
                <path d="M116 3H12a8.91 8.91 0 0 0-9 8.8v104.42a8.91 8.91 0 0 0 9 8.78h104a8.93 8.93 0 0 0 9-8.81V11.77A8.93 8.93 0 0 0 116 3M39.17 107H21.06V48.73h18.11zm-9-66.21a10.5 10.5 0 1 1 10.49-10.5a10.5 10.5 0 0 1-10.54 10.48zM107 107H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53V48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75z" />
              </svg>
            </Box>

            {/* GitHub */}
            <Box
              component="a"
              href="https://github.com/Jerophin123"
              target="_blank"
              rel="noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: 44, sm: 48 },
                height: { xs: 44, sm: 48 },
                borderRadius: { xs: '14px', sm: '16px' },
                background: 'var(--glass-bg)',
                backdropFilter: 'var(--backdrop-blur-light)',
                WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                border: '1px solid var(--glass-border-hover)',
                color: 'var(--accent)',
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
                  transform: 'translateY(-4px) scale(1.1)',
                  background: 'var(--glass-bg-hover)',
                  boxShadow: 'var(--glass-shadow-hover)',
                  borderColor: 'var(--glass-border-hover)'
                },
                '&:active': {
                  transform: 'translateY(-2px) scale(1.05)'
                },
                '& svg': {
                  width: { xs: 22, sm: 24 },
                  height: { xs: 22, sm: 24 },
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  zIndex: 2
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.247a10 10 0 0 0-3.162 19.487c.5.088.687-.212.687-.475c0-.237-.012-1.025-.012-1.862c-2.513.462-3.163-.613-3.363-1.175a3.64 3.64 0 0 0-1.025-1.413c-.35-.187-.85-.65-.013-.662a2 2 0 0 1 1.538 1.025a2.137 2.137 0 0 0 2.912.825a2.1 2.1 0 0 1 .638-1.338c-2.225-.25-4.55-1.112-4.55-4.937a3.9 3.9 0 0 1 1.025-2.688a3.6 3.6 0 0 1 .1-2.65s.837-.262 2.75 1.025a9.43 9.43 0 0 1 5 0c1.912-1.3 2.75-1.025 2.75-1.025a3.6 3.6 0 0 1 .1 2.65a3.87 3.87 0 0 1 1.025 2.688c0 3.837-2.338 4.687-4.562 4.937a2.37 2.37 0 0 1 .674 1.85c0 1.338-.012 2.413-.012 2.75c0 .263.187.575.687.475A10.005 10.005 0 0 0 12 2.247" />
              </svg>
            </Box>

            {/* LeetCode */}
            <Box
              component="a"
              href="https://leetcode.com/u/Jerophinstanley/"
              target="_blank"
              rel="noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: 44, sm: 48 },
                height: { xs: 44, sm: 48 },
                borderRadius: { xs: '14px', sm: '16px' },
                background: 'var(--glass-bg)',
                backdropFilter: 'var(--backdrop-blur-light)',
                WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                border: '1px solid var(--glass-border-hover)',
                color: 'var(--accent)',
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
                  transform: 'translateY(-4px) scale(1.1)',
                  background: 'var(--glass-bg-hover)',
                  boxShadow: 'var(--glass-shadow-hover)',
                  borderColor: 'var(--glass-border-hover)'
                },
                '&:active': {
                  transform: 'translateY(-2px) scale(1.05)'
                },
                '& svg': {
                  width: { xs: 22, sm: 24 },
                  height: { xs: 22, sm: 24 },
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  zIndex: 2
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.483 0a1.37 1.37 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.3 5.3 0 0 0-1.209 2.104a5 5 0 0 0-.125.513a5.5 5.5 0 0 0 .062 2.362a6 6 0 0 0 .349 1.017a5.9 5.9 0 0 0 1.271 1.818l4.277 4.193l.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.38 1.38 0 0 0-1.951-.003l-2.396 2.392a3.02 3.02 0 0 1-4.205.038l-.02-.019l-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.7 2.7 0 0 1 .066-.523a2.55 2.55 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0m-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382a1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382a1.38 1.38 0 0 0-1.38-1.382z"/>
              </svg>
            </Box>

            {/* Linktree */}
            <Box
              component="a"
              href="https://linktr.ee/Jerophin"
              target="_blank"
              rel="noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: 44, sm: 48 },
                height: { xs: 44, sm: 48 },
                borderRadius: { xs: '14px', sm: '16px' },
                background: 'var(--glass-bg)',
                backdropFilter: 'var(--backdrop-blur-light)',
                WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                border: '1px solid var(--glass-border-hover)',
                color: 'var(--accent)',
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
                  transform: 'translateY(-4px) scale(1.1)',
                  background: 'var(--glass-bg-hover)',
                  boxShadow: 'var(--glass-shadow-hover)',
                  borderColor: 'var(--glass-border-hover)'
                },
                '&:active': {
                  transform: 'translateY(-2px) scale(1.05)'
                },
                '& svg': {
                  width: { xs: 22, sm: 24 },
                  height: { xs: 22, sm: 24 },
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  zIndex: 2
                }
              }}
            >
              <svg viewBox="0 0 80 97.7" width="24" height="24" fill="currentColor">
                <g>
                  <path d="M0.2,33.1h24.2L7.1,16.7l9.5-9.6L33,23.8V0h14.2v23.8L63.6,7.1l9.5,9.6L55.8,33H80v13.5H55.7l17.3,16.7
                    l-9.5,9.4L40,49.1L16.5,72.7L7,63.2l17.3-16.7H0V33.1H0.2z M33.1,65.8h14.2v32H33.1V65.8z">
                  </path>
                </g>
              </svg>
            </Box>
              </Box>
            </Box>
          </Box>

          {/* Copyright Section */}
          <Box
            sx={{
              borderTop: '1px solid var(--glass-border)',
              pt: { xs: 3, sm: 4 },
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: { xs: 2, sm: 0 },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            <Typography 
              sx={{ 
                fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                color: 'var(--text-tertiary)',
                fontFamily: '"Poppins", sans-serif'
              }}
            >
              &copy; 2025 JEROPHIN D R | All Rights Reserved
            </Typography>
            <Typography 
              sx={{ 
                fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
                color: 'var(--text-tertiary)',
                fontFamily: '"Poppins", sans-serif'
              }}
            >
              Built with Next.js, React & Material-UI
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

