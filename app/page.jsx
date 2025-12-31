'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { Typography, Button, Box, Card, CardContent, Grid } from '@mui/material';
import Link from 'next/link';
import AnimatedBackground from '@/components/AnimatedBackground';
import ClientLayout from '@/components/ClientLayout';

const roles = ['Full Stack Developer', 'UI UX Designer'];

// Client-only scroll wrapper to prevent hydration mismatch
function ScrollHeroWrapper({ children }) {
  const [mounted, setMounted] = useState(false);
  const staticOpacity = useMotionValue(1);
  const staticScale = useMotionValue(1);
  
  // Always call hooks (required by React), but Framer Motion handles SSR gracefully
  const { scrollYProgress } = useScroll();
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use static values during SSR, scroll values after mount
  // Framer Motion's useScroll returns safe defaults during SSR
  const finalOpacity = mounted ? scrollOpacity : staticOpacity;
  const finalScale = mounted ? scrollScale : staticScale;

  return (
    <motion.div
      style={{ opacity: finalOpacity, scale: finalScale }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      suppressHydrationWarning
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [currentRole, setCurrentRole] = useState(0);
  const [visible, setVisible] = useState(true);
  const [viewportMargin, setViewportMargin] = useState('-100px');

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setVisible(true);
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Smooth scroll behavior
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.scrollBehavior = 'smooth';
      return () => {
        document.documentElement.style.scrollBehavior = 'auto';
      };
    }
  }, []);

  // Set viewport margin based on screen size
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateMargin = () => {
        const width = window.innerWidth;
        setViewportMargin(width < 600 ? '-50px' : '-100px');
      };
      
      updateMargin();
      window.addEventListener('resize', updateMargin);
      return () => window.removeEventListener('resize', updateMargin);
    }
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <ClientLayout>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          overflowX: 'hidden',
        }}
      >
        <AnimatedBackground />

        {/* Hero Section */}
        <ScrollHeroWrapper>
          <Box
            sx={{
              position: 'relative',
              zIndex: 3,
              minHeight: { xs: 'calc(100vh - 60px)', sm: 'calc(100vh - 60px)' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: { xs: 'center', sm: 'flex-start' },
              textAlign: 'center',
              px: { xs: 2, sm: 4, md: 8 },
              pt: { xs: 4, sm: 8, md: 16 },
              pb: { xs: 3, sm: 6, md: 8 },
              pointerEvents: 'none',
              marginTop: { xs: '1px', sm: '80px', md: '100px' }
            }}
          >
            <Box sx={{ 
              pointerEvents: 'auto', 
              maxWidth: '1000px', 
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '2rem', sm: '3rem', md: '4.5rem' },
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 900,
                    lineHeight: { xs: 1.2, sm: 1.1 },
                    letterSpacing: { xs: '-0.02em', sm: '-0.03em' },
                    background: 'var(--hero-text-gradient-1)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: 'var(--text-glow-primary)',
                    filter: 'drop-shadow(var(--text-shadow-accent))',
                    mb: { xs: 0.5, sm: 1 },
                    px: { xs: 1, sm: 0 }
                  }}
                >
                  Hi, I'm Jerophin
                </Typography>
              </motion.div>

              <Box sx={{ 
                minHeight: { xs: '4.5rem', sm: '5rem', md: '5.5rem' }, 
                height: { xs: '4.5rem', sm: '5rem', md: '5.5rem' },
                overflow: 'hidden', 
                mb: { xs: 1.5, sm: 2 }, 
                position: 'relative',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AnimatePresence mode="wait">
                  {visible && (
                    <motion.div
                      key={roles[currentRole]}
                      initial={{ 
                        opacity: 0, 
                        y: 30,
                        scale: 0.95,
                      }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        scale: 1,
                      }}
                      exit={{ 
                        opacity: 0, 
                        y: -30,
                        scale: 1.05,
                      }}
                      transition={{ 
                        duration: 0.7,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      style={{
                        position: 'absolute',
                        width: '100%',
                        textAlign: 'center'
                      }}
                    >
                      <Typography
                        variant="h2"
                        sx={{
                          fontSize: { xs: '1.75rem', sm: '2.5rem', md: '4.5rem' },
                          fontFamily: '"Poppins", sans-serif',
                          fontWeight: 900,
                          lineHeight: { xs: 1.3, sm: 1.2, md: 1.1 },
                          letterSpacing: { xs: '-0.02em', sm: '-0.03em' },
                          background: 'var(--hero-text-gradient-2)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          textShadow: 'var(--text-glow-primary)',
                          filter: 'drop-shadow(var(--text-shadow-accent))',
                          px: { xs: 1, sm: 0 },
                          pb: { xs: 0.25, sm: 0.25, md: 0.25 },
                          display: 'block'
                        }}
                      >
                        A {roles[currentRole]}
                      </Typography>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: 'var(--text-secondary)',
                    fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.4rem' },
                    maxWidth: '800px',
                    mx: 'auto',
                    mb: 3,
                    lineHeight: 1.7,
                    fontWeight: 400,
                    letterSpacing: '0.01em'
                  }}
                >
                  I craft high-impact digital products with pixel-perfect UI and scalable backend systems. Let's build something amazing together!
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    width: '100%'
                  }}
                >
                  <Button
                    variant="contained"
                    component={Link}
                    href="/about"
                    sx={{
                      px: { xs: 4, sm: 4 },
                      py: { xs: 1.5, sm: 1.5 },
                      fontFamily: '"Poppins", sans-serif',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      borderRadius: { xs: '20px', sm: '24px', md: '28px' },
                      background: 'var(--glass-bg)',
                      backdropFilter: 'var(--backdrop-blur-light)',
                      WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                      border: '1px solid var(--glass-border-hover)',
                      color: 'var(--accent)',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      minWidth: { xs: '100%', sm: 200 },
                      width: { xs: '100%', sm: 'auto' },
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
                        transform: { xs: 'scale(0.98)', sm: 'translateY(-4px) scale(1.03)' },
                        boxShadow: 'var(--glass-shadow-hover)',
                        borderColor: 'var(--glass-border-hover)'
                      },
                      '&:active': {
                        transform: { xs: 'scale(0.98)', sm: 'translateY(-2px) scale(1.01)' }
                      }
                    }}
                  >
                    Explore More
                  </Button>

                  <Button
                    variant="outlined"
                    component={Link}
                    href="/projects"
                    sx={{
                      px: { xs: 4, sm: 4 },
                      py: { xs: 1.5, sm: 1.5 },
                      fontFamily: '"Poppins", sans-serif',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      borderRadius: { xs: '20px', sm: '24px', md: '28px' },
                      background: 'var(--glass-bg)',
                      backdropFilter: 'var(--backdrop-blur-light)',
                      WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                      border: '1px solid var(--glass-border-light)',
                      color: 'var(--text-primary)',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      minWidth: { xs: '100%', sm: 200 },
                      width: { xs: '100%', sm: 'auto' },
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
                        borderColor: 'var(--glass-border-hover)',
                        color: 'var(--accent)',
                        transform: { xs: 'scale(0.98)', sm: 'translateY(-4px) scale(1.03)' },
                        boxShadow: 'var(--glass-shadow-hover)'
                      },
                      '&:active': {
                        transform: { xs: 'scale(0.98)', sm: 'translateY(-2px) scale(1.01)' }
                      }
                    }}
                  >
                    See Projects
                  </Button>
                </Box>
              </motion.div>
            </Box>
          </Box>
        </ScrollHeroWrapper>

        {/* Content Sections */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 3,
            width: '100%',
            maxWidth: '1400px',
            mx: 'auto',
            px: { xs: 2, sm: 3, md: 6 },
            pb: { xs: 6, sm: 8, md: 12 },
            pointerEvents: 'auto',
            overflowX: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          {/* About Section Preview */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: viewportMargin }}
          >
            <Box sx={{ mb: { xs: 6, sm: 8, md: 16 }, pt: { xs: 2, sm: 4, md: 6 }, width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.div variants={cardVariants}>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 800,
                    fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
                    mb: { xs: 3, sm: 4, md: 5 },
                    textAlign: 'center',
                    background: 'var(--hero-text-gradient-2)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                    px: { xs: 1, sm: 0 }
                  }}
                >
                  About Me
                </Typography>
              </motion.div>
              <Grid container spacing={{ xs: 0, sm: 3, md: 4 }} sx={{ mb: { xs: 3, sm: 4 }, width: '100%', maxWidth: '100%', alignItems: 'stretch' }}>
                <Grid size={{ xs: 12, md: 6 }} sx={{ mb: { xs: 2, sm: 0 }, display: 'flex' }}>
                  <motion.div variants={cardVariants} style={{ width: '100%', display: 'flex' }}>
                    <Card
                      sx={{
                        background: 'var(--glass-bg)',
                        backdropFilter: 'var(--backdrop-blur)',
                        WebkitBackdropFilter: 'var(--backdrop-blur)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: { xs: '24px', sm: '28px', md: '32px' },
                        boxShadow: 'var(--glass-shadow)',
                        p: { xs: 3, sm: 4, md: 5 },
                        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        height: '100%',
                        width: '100%',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        mx: { xs: 0, sm: 'auto' },
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
                          transform: { xs: 'scale(0.98)', sm: 'translateY(-8px) scale(1.02)' },
                          borderColor: 'var(--glass-border-hover)',
                          boxShadow: 'var(--glass-shadow-hover)',
                          background: 'var(--glass-bg-hover)'
                        },
                        '&:active': {
                          transform: { xs: 'scale(0.98)', sm: 'translateY(-8px) scale(1.02)' }
                        }
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'var(--text-secondary)',
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          lineHeight: 1.8,
                          mb: 3
                        }}
                      >
                        I'm a dedicated                         <strong style={{ color: 'var(--accent)' }}>Full Stack Developer</strong> and{' '}
                        <strong style={{ color: 'var(--accent)' }}>UI/UX Designer</strong> with a focus on building scalable,
                        responsive web applications. I specialize in modern frameworks like React and FastAPI, and I turn
                        high-fidelity designs from tools like Figma into clean, accessible user interfaces.
                        My work blends engineering precision with intuitive design thinking.
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'var(--text-tertiary)',
                          fontSize: { xs: '0.95rem', md: '1rem' },
                          lineHeight: 1.8,
                          mb: 3
                        }}
                      >
                        Proficient in <span style={{ color: 'var(--accent)' }}>React.js, Next.js, FastAPI, Express.js, Python, Java, SQL, JavaScript</span> and many more, 
                        I apply strong backend and frontend skills to bridge the gap between design and engineering. 
                        I actively participate in hackathons, enjoy building practical, real-world solutions, and am open to
                        relocation for the right opportunity.
                      </Typography>
                      <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 2 }, flexWrap: 'wrap', mb: 3 }}>
                        <Box sx={{ 
                          px: { xs: 1.5, sm: 2 }, 
                          py: { xs: 0.75, sm: 1 }, 
                          borderRadius: { xs: '12px', sm: '16px' },
                          background: 'var(--glass-bg)',
                          border: '1px solid var(--glass-border-hover)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.75
                        }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--accent)' }}>
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                          </svg>
                          <Typography sx={{ color: 'var(--accent)', fontSize: { xs: '0.85rem', sm: '0.9rem' }, fontWeight: 600 }}>
                            Chennai, India
                          </Typography>
                        </Box>
                        <Box sx={{ 
                          px: { xs: 1.5, sm: 2 }, 
                          py: { xs: 0.75, sm: 1 }, 
                          borderRadius: { xs: '12px', sm: '16px' },
                          background: 'var(--glass-bg)',
                          border: '1px solid var(--glass-border-hover)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.75
                        }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--accent)' }}>
                            <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="currentColor"/>
                          </svg>
                          <Typography sx={{ color: 'var(--accent)', fontSize: { xs: '0.85rem', sm: '0.9rem' }, fontWeight: 600 }}>
                            BE Computer Science (CGPA: 8.4)
                          </Typography>
                        </Box>
                      </Box>
                      <Button
                        component={Link}
                        href="/about"
                        sx={{
                          borderRadius: { xs: '20px', sm: '24px', md: '28px' },
                          background: 'var(--glass-bg)',
                          backdropFilter: 'var(--backdrop-blur-light)',
                          WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                          border: '1px solid var(--glass-border-hover)',
                          color: 'var(--accent)',
                          fontWeight: 600,
                          px: { xs: 3, sm: 4 },
                          py: { xs: 1.25, sm: 1.5 },
                          fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          position: 'relative',
                          overflow: 'hidden',
                          boxShadow: 'var(--glass-shadow)',
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
                            transform: { xs: 'scale(0.98)', sm: 'translateY(-4px) scale(1.03)' },
                            boxShadow: 'var(--glass-shadow-hover)',
                            borderColor: 'var(--glass-border-hover)'
                          },
                          '&:active': {
                            transform: { xs: 'scale(0.98)', sm: 'translateY(-2px) scale(1.01)' }
                          }
                        }}
                      >
                        Learn More →
                      </Button>
                    </Card>
                  </motion.div>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
                  <motion.div variants={cardVariants} style={{ width: '100%', display: 'flex' }}>
                    <Card
                      sx={{
                        background: 'var(--glass-bg)',
                        backdropFilter: 'var(--backdrop-blur)',
                        WebkitBackdropFilter: 'var(--backdrop-blur)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: { xs: '24px', sm: '28px', md: '32px' },
                        boxShadow: 'var(--glass-shadow)',
                        p: { xs: 3, sm: 4, md: 5 },
                        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        height: '100%',
                        width: '100%',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        mx: { xs: 0, sm: 'auto' },
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
                          transform: { xs: 'scale(0.98)', sm: 'translateY(-8px) scale(1.02)' },
                          borderColor: 'var(--glass-border-hover)',
                          boxShadow: 'var(--glass-shadow-hover)',
                          background: 'var(--glass-bg-hover)'
                        },
                        '&:active': {
                          transform: { xs: 'scale(0.98)', sm: 'translateY(-8px) scale(1.02)' }
                        }
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'var(--accent)',
                          fontWeight: 700,
                          mb: { xs: 2, sm: 3, md: 4 },
                          textAlign: { xs: 'center', md: 'left' },
                          fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }
                        }}
                      >
                        Quick Stats
                      </Typography>
                      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr' }, gap: { xs: 2, sm: 2.5, md: 3 } }}>
                        <Box sx={{ 
                          p: { xs: 2, sm: 2.5, md: 3 },
                          borderRadius: { xs: '16px', sm: '20px', md: '24px' },
                          background: 'var(--glass-bg)',
                          border: '1px solid var(--glass-border-hover)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            borderColor: 'var(--glass-border-hover)',
                            background: 'var(--glass-bg-hover)'
                          }
                        }}>
                          <Typography sx={{ color: 'var(--accent)', fontWeight: 700, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, mb: 0.5, lineHeight: 1 }}>
                            13+
                          </Typography>
                          <Typography sx={{ color: 'var(--text-secondary)', fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: 500 }}>
                            Projects Completed
                          </Typography>
                        </Box>
                        <Box sx={{ 
                          p: { xs: 2, sm: 2.5, md: 3 },
                          borderRadius: { xs: '16px', sm: '20px', md: '24px' },
                          background: 'var(--glass-bg)',
                          border: '1px solid var(--glass-border-hover)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            borderColor: 'var(--glass-border-hover)',
                            background: 'var(--glass-bg-hover)'
                          }
                        }}>
                          <Typography sx={{ color: 'var(--accent)', fontWeight: 700, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, mb: 0.5, lineHeight: 1 }}>
                            12+
                          </Typography>
                          <Typography sx={{ color: 'var(--text-secondary)', fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: 500 }}>
                            Certifications
                          </Typography>
                        </Box>
                        <Box sx={{ 
                          p: { xs: 2, sm: 2.5, md: 3 },
                          borderRadius: { xs: '16px', sm: '20px', md: '24px' },
                          background: 'var(--glass-bg)',
                          border: '1px solid var(--glass-border-hover)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            borderColor: 'var(--glass-border-hover)',
                            background: 'var(--glass-bg-hover)'
                          }
                        }}>
                          <Typography sx={{ color: 'var(--accent)', fontWeight: 700, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, mb: 0.5, lineHeight: 1 }}>
                            8+
                          </Typography>
                          <Typography sx={{ color: 'var(--text-secondary)', fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: 500 }}>
                            Achievements
                          </Typography>
                        </Box>
                        <Box sx={{ 
                          p: { xs: 2, sm: 2.5, md: 3 },
                          borderRadius: { xs: '16px', sm: '20px', md: '24px' },
                          background: 'var(--glass-bg)',
                          border: '1px solid var(--glass-border-hover)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            borderColor: 'var(--glass-border-hover)',
                            background: 'var(--glass-bg-hover)'
                          }
                        }}>
                          <Typography sx={{ color: 'var(--accent)', fontWeight: 700, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, mb: 0.5, lineHeight: 1 }}>
                            2
                          </Typography>
                          <Typography sx={{ color: 'var(--text-secondary)', fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: 500 }}>
                            Years Experience
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              </Grid>
            </Box>
          </motion.section>

          {/* Skills Section Preview */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: viewportMargin }}
          >
            <Box sx={{ mb: { xs: 6, sm: 8, md: 16 }, width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.div variants={cardVariants}>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 800,
                    fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
                    mb: { xs: 3, sm: 4, md: 5 },
                    textAlign: 'center',
                    background: 'var(--hero-text-gradient-2)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                    px: { xs: 1, sm: 0 }
                  }}
                >
                  Skills & Technologies
                </Typography>
              </motion.div>
              <Grid container spacing={{ xs: 0, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 }, width: '100%', maxWidth: '100%' }}>
                {[
                  { 
                    title: 'Full-Stack Development', 
                    desc: 'React, Next.js, Vue, Angular, Node.js, Express, FastAPI, Django, Flask, NestJS, Spring Boot' 
                  },
                  { 
                    title: 'Cloud & DevOps', 
                    desc: 'AWS, Google Cloud, Azure, Firebase, Vercel, Heroku, Cloudflare, Docker, Jenkins, CI/CD' 
                  },
                  { 
                    title: 'Data & Databases', 
                    desc: 'MySQL, PostgreSQL, MongoDB, SQLite, MariaDB, Apache Hadoop, Query Optimization' 
                  },
                  { 
                    title: 'API Design & Integration', 
                    desc: 'RESTful APIs, JWT Authentication, OpenAPI/Swagger, Socket.IO, Versioning' 
                  },
                  { 
                    title: 'Programming Languages', 
                    desc: 'C, C++, Java, JavaScript (ES6+), Python, R, PHP, SQL, Bash' 
                  },
                  { 
                    title: 'UI/UX & Design', 
                    desc: 'Figma, Adobe XD, Illustrator, Canva, Creative Cloud, GIMP, Inkscape, SketchUp' 
                  },
                  { 
                    title: 'Data Science & ML', 
                    desc: 'Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, TensorFlow, PyTorch, OpenCV' 
                  },
                  { 
                    title: 'Security & Networking', 
                    desc: 'VPN, Firewall, IPS/IDS, IPSec, TLS, HTTP/HTTPS, Cisco Tools, Tor Browser Security' 
                  }
                ].map((skill, idx) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx} sx={{ mb: { xs: 2, sm: 0 } }}>
                    <motion.div
                      variants={cardVariants}
                      whileHover={{ scale: 1.05, y: -8 }}
                      transition={{ duration: 0.3 }}
                      style={{ width: '100%' }}
                    >
                      <Card
                        sx={{
                          background: 'var(--glass-bg)',
                          backdropFilter: 'var(--backdrop-blur)',
                          WebkitBackdropFilter: 'var(--backdrop-blur)',
                          border: '1px solid var(--glass-border)',
                          borderRadius: { xs: '20px', sm: '24px', md: '28px' },
                          boxShadow: 'var(--glass-shadow)',
                          p: { xs: 2.5, sm: 3 },
                          textAlign: 'center',
                          height: '100%',
                          width: '100%',
                          boxSizing: 'border-box',
                          mx: { xs: 0, sm: 'auto' },
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
                            transform: { xs: 'scale(0.98)', sm: 'translateY(-8px) scale(1.02)' },
                            borderColor: 'var(--glass-border-hover)',
                            boxShadow: 'var(--glass-shadow-hover)',
                            background: 'var(--glass-bg-hover)'
                          },
                          '&:active': {
                            transform: { xs: 'scale(0.98)', sm: 'translateY(-8px) scale(1.02)' }
                          }
                        }}
                      >
                        <Typography
                          sx={{
                            color: 'var(--accent)',
                            fontWeight: 700,
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                            mb: { xs: 2, sm: 2.5 }
                          }}
                        >
                          {skill.title}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: { xs: 1, sm: 1.25, md: 1.5 },
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%'
                          }}
                        >
                          {skill.desc.split(',').map((skillName, skillIndex) => {
                            const trimmedSkill = skillName.trim();
                            return trimmedSkill ? (
                              <Box
                                key={skillIndex}
                                sx={{
                                  px: { xs: 1.25, sm: 1.5, md: 2 },
                                  py: { xs: 0.5, sm: 0.75, md: 1 },
                                  background: 'var(--glass-bg)',
                                  backdropFilter: 'var(--backdrop-blur-light)',
                                  WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                                  border: '1px solid var(--glass-border-hover)',
                                  borderRadius: { xs: '16px', sm: '18px', md: '20px' },
                                  boxShadow: 'var(--glass-shadow)',
                                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                  position: 'relative',
                                  overflow: 'hidden',
                                  maxWidth: '100%',
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
                                  },
                                  '&:hover': {
                                    transform: { xs: 'none', sm: 'translateY(-2px) scale(1.05)' },
                                    background: { xs: 'var(--glass-bg)', sm: 'var(--glass-bg-hover)' },
                                    borderColor: { xs: 'var(--glass-border-hover)', sm: 'var(--glass-border-hover)' },
                                    boxShadow: { xs: 'var(--glass-shadow)', sm: 'var(--glass-shadow-hover)' }
                                  },
                                  '&:active': {
                                    transform: { xs: 'scale(0.98)', sm: 'translateY(-1px) scale(1.03)' }
                                  }
                                }}
                              >
                                <Typography
                                  sx={{
                                    color: 'var(--accent)',
                                    fontFamily: '"Poppins", sans-serif',
                                    fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.85rem' },
                                    fontWeight: 500,
                                    whiteSpace: { xs: 'normal', sm: 'nowrap' },
                                    wordBreak: { xs: 'break-word', sm: 'normal' },
                                    position: 'relative',
                                    zIndex: 2,
                                    lineHeight: { xs: 1.3, sm: 1.4, md: 1.5 }
                                  }}
                                >
                                  {trimmedSkill}
                                </Typography>
                              </Box>
                            ) : null;
                          })}
                        </Box>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ textAlign: 'center' }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    component={Link}
                    href="/skills"
                    sx={{
                      borderRadius: { xs: '20px', sm: '24px', md: '28px' },
                      background: 'var(--glass-bg)',
                      backdropFilter: 'var(--backdrop-blur-light)',
                      WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                      border: '1px solid var(--glass-border-hover)',
                      color: 'var(--accent)',
                      fontWeight: 600,
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1.25, sm: 1.5 },
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: 'var(--glass-shadow)',
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
                        transform: { xs: 'scale(0.98)', sm: 'translateY(-4px) scale(1.03)' },
                        boxShadow: 'var(--glass-shadow-hover)',
                        borderColor: 'var(--glass-border-hover)'
                      },
                      '&:active': {
                        transform: { xs: 'scale(0.98)', sm: 'translateY(-2px) scale(1.01)' }
                      }
                    }}
                  >
                    View All Skills →
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </motion.section>

          {/* Experience Section Preview */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: viewportMargin }}
          >
            <Box sx={{ mb: { xs: 6, sm: 8, md: 16 }, width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.div variants={cardVariants}>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 800,
                    fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
                    mb: { xs: 3, sm: 4, md: 5 },
                    textAlign: 'center',
                    background: 'var(--hero-text-gradient-2)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                    px: { xs: 1, sm: 0 }
                  }}
                >
                  Professional Experience
                </Typography>
              </motion.div>
              <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 }, width: '100%', maxWidth: '100%' }}>
                {[
                  {
                    company: 'Trios Technologies',
                    role: 'Full Stack Developer & UI/UX Designer',
                    period: 'Jan 2024 - Present',
                    location: 'Chennai, India',
                    highlights: [
                      'Developed responsive web applications using React, Next.js, and FastAPI',
                      'Designed intuitive user interfaces with modern design principles',
                      'Collaborated with cross-functional teams to deliver high-quality products'
                    ]
                  },
                  {
                    company: 'Delphin Associates',
                    role: 'Full Stack Developer',
                    period: 'Jun 2023 - Dec 2023',
                    location: 'Chennai, India',
                    highlights: [
                      'Built scalable backend systems with Node.js and Express',
                      'Implemented RESTful APIs and database optimization',
                      'Contributed to frontend development with React and Vue.js'
                    ]
                  }
                ].map((exp, idx) => (
                  <Grid size={{ xs: 12, md: 6 }} key={idx}>
                    <motion.div
                      variants={cardVariants}
                      whileHover={{ scale: 1.02, y: -8 }}
                      transition={{ duration: 0.3 }}
                      style={{ width: '100%' }}
                    >
                      <Card
                        sx={{
                          background: 'var(--glass-bg)',
                          backdropFilter: 'var(--backdrop-blur)',
                          WebkitBackdropFilter: 'var(--backdrop-blur)',
                          border: '1px solid var(--glass-border)',
                          borderRadius: { xs: '24px', sm: '28px', md: '32px' },
                          boxShadow: 'var(--glass-shadow)',
                          p: { xs: 3, sm: 4, md: 6 },
                          height: '100%',
                          width: '100%',
                          boxSizing: 'border-box',
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
                            transform: { xs: 'scale(0.98)', sm: 'translateY(-8px) scale(1.02)' },
                            borderColor: 'var(--glass-border-hover)',
                            boxShadow: 'var(--glass-shadow-hover)',
                            background: 'var(--glass-bg-hover)'
                          },
                          '&:active': {
                            transform: { xs: 'scale(0.98)', sm: 'translateY(-8px) scale(1.02)' }
                          }
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            color: 'var(--accent)',
                            fontWeight: 700,
                            fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                            mb: { xs: 0.75, sm: 1 }
                          }}
                        >
                          {exp.role}
                        </Typography>
                        <Typography
                          sx={{
                            color: 'var(--text-primary)',
                            fontWeight: 600,
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                            mb: { xs: 0.5, sm: 0.5 }
                          }}
                        >
                          {exp.company}
                        </Typography>
                        <Typography
                          sx={{
                            color: 'var(--text-tertiary)',
                            fontSize: { xs: '0.85rem', sm: '0.9rem' },
                            mb: { xs: 2, sm: 3 }
                          }}
                        >
                          {exp.period} • {exp.location}
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, mb: 3 }}>
                          {exp.highlights.map((highlight, i) => (
                            <Typography
                              key={i}
                              component="li"
                              sx={{
                                color: 'var(--text-secondary)',
                                fontSize: { xs: '0.9rem', sm: '0.95rem' },
                                lineHeight: { xs: 1.6, sm: 1.8 },
                                mb: { xs: 0.75, sm: 1 }
                              }}
                            >
                              {highlight}
                            </Typography>
                          ))}
                        </Box>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ textAlign: 'center' }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    component={Link}
                    href="/experience"
                    sx={{
                      borderRadius: { xs: '20px', sm: '24px', md: '28px' },
                      background: 'var(--glass-bg)',
                      backdropFilter: 'var(--backdrop-blur-light)',
                      WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                      border: '1px solid var(--glass-border-hover)',
                      color: 'var(--accent)',
                      fontWeight: 600,
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1.25, sm: 1.5 },
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: 'var(--glass-shadow)',
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
                        transform: { xs: 'scale(0.98)', sm: 'translateY(-4px) scale(1.03)' },
                        boxShadow: 'var(--glass-shadow-hover)',
                        borderColor: 'var(--glass-border-hover)'
                      },
                      '&:active': {
                        transform: { xs: 'scale(0.98)', sm: 'translateY(-2px) scale(1.01)' }
                      }
                    }}
                  >
                    View Full Experience →
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </motion.section>

          {/* Projects Section Preview */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: viewportMargin }}
          >
            <Box sx={{ mb: { xs: 6, sm: 8, md: 16 }, width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.div variants={cardVariants}>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 800,
                    fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
                    mb: { xs: 3, sm: 4, md: 5 },
                    textAlign: 'center',
                    background: 'var(--hero-text-gradient-2)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                    px: { xs: 1, sm: 0 }
                  }}
                >
                  Featured Projects
                </Typography>
              </motion.div>
              <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 }, width: '100%', maxWidth: '100%' }}>
                {[
                  { 
                    title: 'Waste Management System', 
                    desc: 'AI-based smart waste classification system using deep learning for automated sorting and recycling optimization.',
                    tech: 'Python, TensorFlow, React, FastAPI'
                  },
                  { 
                    title: 'RV Diagnose', 
                    desc: 'Plant disease detection application using Deep Learning and computer vision to help farmers identify crop issues early.',
                    tech: 'Python, PyTorch, OpenCV, Flask'
                  },
                  { 
                    title: 'Welinzo', 
                    desc: 'Modern e-commerce platform with liquid glass design, featuring seamless shopping experience and real-time inventory management.',
                    tech: 'Next.js, Node.js, MongoDB, Stripe'
                  },
                  { 
                    title: 'Portfolio Website', 
                    desc: 'Responsive portfolio website showcasing projects, skills, and achievements with modern glassmorphism design.',
                    tech: 'Next.js, React, Material-UI, Framer Motion'
                  },
                  { 
                    title: 'Task Management App', 
                    desc: 'Collaborative task management application with real-time updates, team collaboration, and project tracking features.',
                    tech: 'React, Node.js, Socket.IO, PostgreSQL'
                  },
                  { 
                    title: 'Weather Dashboard', 
                    desc: 'Interactive weather dashboard with location-based forecasts, weather maps, and detailed meteorological data visualization.',
                    tech: 'React, Chart.js, OpenWeather API, Tailwind CSS'
                  }
                ].map((project, idx) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                    <motion.div
                      variants={cardVariants}
                      whileHover={{ scale: 1.05, y: -8 }}
                      transition={{ duration: 0.3 }}
                      style={{ width: '100%' }}
                    >
                      <Card
                        sx={{
                          background: 'var(--glass-bg)',
                          backdropFilter: 'var(--backdrop-blur)',
                          WebkitBackdropFilter: 'var(--backdrop-blur)',
                          border: '1px solid var(--glass-border)',
                          borderRadius: { xs: '20px', sm: '24px', md: '28px' },
                          boxShadow: 'var(--glass-shadow)',
                          p: { xs: 2.5, sm: 3 },
                          height: '100%',
                          width: '100%',
                          boxSizing: 'border-box',
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
                            transform: { xs: 'scale(0.98)', sm: 'translateY(-8px) scale(1.02)' },
                            borderColor: 'var(--glass-border-hover)',
                            boxShadow: 'var(--glass-shadow-hover)',
                            background: 'var(--glass-bg-hover)'
                          },
                          '&:active': {
                            transform: { xs: 'scale(0.98)', sm: 'translateY(-8px) scale(1.02)' }
                          }
                        }}
                      >
                        <Typography
                          sx={{
                            color: 'var(--accent)',
                            fontWeight: 700,
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                            mb: { xs: 1, sm: 1.5 }
                          }}
                        >
                          {project.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: 'var(--text-secondary)',
                            fontSize: { xs: '0.9rem', sm: '0.95rem' },
                            lineHeight: { xs: 1.6, sm: 1.7 },
                            mb: { xs: 1.5, sm: 2 }
                          }}
                        >
                          {project.desc}
                        </Typography>
                        <Typography
                          sx={{
                            color: 'var(--text-accent)',
                            fontSize: { xs: '0.8rem', sm: '0.85rem' },
                            fontStyle: 'italic'
                          }}
                        >
                          {project.tech}
                        </Typography>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ textAlign: 'center' }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    component={Link}
                    href="/projects"
                    sx={{
                      borderRadius: { xs: '20px', sm: '24px', md: '28px' },
                      background: 'var(--glass-bg)',
                      backdropFilter: 'var(--backdrop-blur-light)',
                      WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                      border: '1px solid var(--glass-border-hover)',
                      color: 'var(--accent)',
                      fontWeight: 600,
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1.25, sm: 1.5 },
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: 'var(--glass-shadow)',
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
                        transform: { xs: 'scale(0.98)', sm: 'translateY(-4px) scale(1.03)' },
                        boxShadow: 'var(--glass-shadow-hover)',
                        borderColor: 'var(--glass-border-hover)'
                      },
                      '&:active': {
                        transform: { xs: 'scale(0.98)', sm: 'translateY(-2px) scale(1.01)' }
                      }
                    }}
                  >
                    View All Projects →
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </motion.section>

          {/* Certifications Section Preview */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: viewportMargin }}
          >
            <Box sx={{ mb: { xs: 6, sm: 8, md: 16 }, width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.div variants={cardVariants}>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 800,
                    fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
                    mb: { xs: 3, sm: 4, md: 5 },
                    textAlign: 'center',
                    background: 'var(--hero-text-gradient-2)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                    px: { xs: 1, sm: 0 }
                  }}
                >
                  Certifications
                </Typography>
              </motion.div>
              <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 }, width: '100%', maxWidth: '100%' }}>
                {[
                  { 
                    title: 'Linguaskill', 
                    issuer: 'Cambridge Assessment English',
                    desc: 'Comprehensive English language proficiency assessment covering reading, writing, listening, and speaking skills.'
                  },
                  { 
                    title: 'Introduction to Git and GitHub', 
                    issuer: 'Coursera',
                    desc: 'Mastered version control fundamentals, branching strategies, and collaborative development workflows using Git and GitHub.'
                  },
                  { 
                    title: 'MongoDB Essentials', 
                    issuer: 'Self Learning',
                    desc: 'Comprehensive understanding of NoSQL database design, querying, indexing, and aggregation pipelines in MongoDB.'
                  },
                  { 
                    title: 'Cisco CCNA – Introduction to Networks', 
                    issuer: 'Cisco',
                    desc: 'Fundamentals of networking, IP addressing, subnetting, routing protocols, and network infrastructure design.'
                  },
                  { 
                    title: 'AWS Cloud Practitioner', 
                    issuer: 'Amazon Web Services',
                    desc: 'Cloud computing fundamentals, AWS services overview, and best practices for cloud architecture and security.'
                  },
                  { 
                    title: 'React Development', 
                    issuer: 'Meta (Facebook)',
                    desc: 'Advanced React concepts including hooks, context API, performance optimization, and modern React patterns.'
                  }
                ].map((cert, idx) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                    <motion.div
                      variants={cardVariants}
                      whileHover={{ scale: 1.02, y: -4 }}
                      transition={{ duration: 0.3 }}
                      style={{ width: '100%' }}
                    >
                      <Card
                        sx={{
                          background: 'var(--glass-bg)',
                          backdropFilter: 'var(--backdrop-blur)',
                          WebkitBackdropFilter: 'var(--backdrop-blur)',
                          border: '1px solid var(--glass-border)',
                          borderRadius: { xs: '20px', sm: '24px', md: '28px' },
                          boxShadow: 'var(--glass-shadow)',
                          p: { xs: 2.5, sm: 3 },
                          height: '100%',
                          width: '100%',
                          boxSizing: 'border-box',
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
                            transform: { xs: 'scale(0.98)', sm: 'translateY(-8px) scale(1.02)' },
                            borderColor: 'var(--glass-border-hover)',
                            boxShadow: 'var(--glass-shadow-hover)',
                            background: 'var(--glass-bg-hover)'
                          },
                          '&:active': {
                            transform: { xs: 'scale(0.98)', sm: 'translateY(-8px) scale(1.02)' }
                          }
                        }}
                      >
                        <Typography
                          sx={{
                            color: 'var(--accent)',
                            fontWeight: 700,
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                            mb: { xs: 0.5, sm: 0.5 }
                          }}
                        >
                          {cert.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: 'var(--text-tertiary)',
                            fontSize: { xs: '0.8rem', sm: '0.85rem' },
                            mb: { xs: 1, sm: 1.5 }
                          }}
                        >
                          {cert.issuer}
                        </Typography>
                        <Typography
                          sx={{
                            color: 'var(--text-secondary)',
                            fontSize: { xs: '0.85rem', sm: '0.9rem' },
                            lineHeight: { xs: 1.5, sm: 1.6 }
                          }}
                        >
                          {cert.desc}
                        </Typography>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ textAlign: 'center' }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    component={Link}
                    href="/certifications"
                    sx={{
                      borderRadius: { xs: '20px', sm: '24px', md: '28px' },
                      background: 'var(--glass-bg)',
                      backdropFilter: 'var(--backdrop-blur-light)',
                      WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                      border: '1px solid var(--glass-border-hover)',
                      color: 'var(--accent)',
                      fontWeight: 600,
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1.25, sm: 1.5 },
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: 'var(--glass-shadow)',
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
                        transform: { xs: 'scale(0.98)', sm: 'translateY(-4px) scale(1.03)' },
                        boxShadow: 'var(--glass-shadow-hover)',
                        borderColor: 'var(--glass-border-hover)'
                      },
                      '&:active': {
                        transform: { xs: 'scale(0.98)', sm: 'translateY(-2px) scale(1.01)' }
                      }
                    }}
                  >
                    View All Certifications →
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </motion.section>

          {/* Achievements Section Preview */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: viewportMargin }}
          >
            <Box sx={{ mb: { xs: 6, sm: 8, md: 16 }, width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.div variants={cardVariants}>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 800,
                    fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
                    mb: { xs: 3, sm: 4, md: 5 },
                    textAlign: 'center',
                    background: 'var(--hero-text-gradient-2)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                    px: { xs: 1, sm: 0 }
                  }}
                >
                  Achievements
                </Typography>
              </motion.div>
              <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 }, width: '100%', maxWidth: '100%' }}>
                {[
                  {
                    title: '2nd Place: IEEE Code Debugging Event',
                    desc: 'Excelled in competitive debugging, earning 2nd place.',
                    type: 'Competition'
                  },
                  {
                    title: '2nd Place: Paper Presentation at Guru Nanak College',
                    desc: 'Presented innovative research ideas. Secured 2nd place.',
                    type: 'Academic'
                  },
                  {
                    title: 'Hackathon: Hack-o-Mania 5.0 (SJIT)',
                    desc: 'Completed 24-hour hackathon. Built working prototype.',
                    type: 'Hackathon'
                  },
                  {
                    title: 'NCAT 2025 – Career Aptitude Test',
                    desc: 'Scored 28/60 with 100% attempt rate; secured 56.79 percentile in Tamil Nadu.',
                    type: 'Assessment'
                  }
                ].map((achievement, idx) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                    <motion.div
                      variants={cardVariants}
                      whileHover={{ scale: 1.05, y: -8 }}
                      transition={{ duration: 0.3 }}
                      style={{ width: '100%' }}
                    >
                      <Card
                        sx={{
                          background: 'var(--glass-bg)',
                          backdropFilter: 'var(--backdrop-blur)',
                          WebkitBackdropFilter: 'var(--backdrop-blur)',
                          border: '1px solid var(--glass-border)',
                          borderRadius: { xs: '20px', sm: '24px', md: '28px' },
                          boxShadow: 'var(--glass-shadow)',
                          p: { xs: 2.5, sm: 3 },
                          height: '100%',
                          width: '100%',
                          boxSizing: 'border-box',
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
                            transform: { xs: 'scale(0.98)', sm: 'translateY(-8px) scale(1.02)' },
                            borderColor: 'var(--glass-border-hover)',
                            boxShadow: 'var(--glass-shadow-hover)',
                            background: 'var(--glass-bg-hover)'
                          },
                          '&:active': {
                            transform: { xs: 'scale(0.98)', sm: 'translateY(-8px) scale(1.02)' }
                          }
                        }}
                      >
                        <Typography
                          sx={{
                            color: 'var(--text-accent)',
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            mb: { xs: 0.75, sm: 1 }
                          }}
                        >
                          {achievement.type}
                        </Typography>
                        <Typography
                          sx={{
                            color: 'var(--accent)',
                            fontWeight: 700,
                            fontSize: { xs: '0.95rem', sm: '1rem' },
                            mb: { xs: 1, sm: 1.5 },
                            lineHeight: { xs: 1.3, sm: 1.4 }
                          }}
                        >
                          {achievement.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: 'var(--text-secondary)',
                            fontSize: { xs: '0.85rem', sm: '0.9rem' },
                            lineHeight: { xs: 1.5, sm: 1.6 }
                          }}
                        >
                          {achievement.desc}
                        </Typography>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ textAlign: 'center' }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    component={Link}
                    href="/achievements"
                    sx={{
                      borderRadius: { xs: '20px', sm: '24px', md: '28px' },
                      background: 'var(--glass-bg)',
                      backdropFilter: 'var(--backdrop-blur-light)',
                      WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                      border: '1px solid var(--glass-border-hover)',
                      color: 'var(--accent)',
                      fontWeight: 600,
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1.25, sm: 1.5 },
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: 'var(--glass-shadow)',
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
                        transform: { xs: 'scale(0.98)', sm: 'translateY(-4px) scale(1.03)' },
                        boxShadow: 'var(--glass-shadow-hover)',
                        borderColor: 'var(--glass-border-hover)'
                      },
                      '&:active': {
                        transform: { xs: 'scale(0.98)', sm: 'translateY(-2px) scale(1.01)' }
                      }
                    }}
                  >
                    View All Achievements →
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </motion.section>

          {/* Connect Section Preview */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: viewportMargin }}
          >
            <Box sx={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.div variants={cardVariants}>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 800,
                    fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
                    mb: { xs: 3, sm: 4, md: 5 },
                    textAlign: 'center',
                    background: 'var(--hero-text-gradient-2)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                    px: { xs: 1, sm: 0 }
                  }}
                >
                  Connect With Me
                </Typography>
              </motion.div>
              <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 }, width: '100%', maxWidth: '100%' }}>
                {[
                  {
                    platform: 'LinkedIn',
                    desc: 'Professional network and career updates',
                    link: 'https://linkedin.com/in/jerophin-d-r-b9a73b257/',
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 128 128" style={{ color: 'var(--accent)' }}>
                        <path d="M116 3H12a8.91 8.91 0 0 0-9 8.8v104.42a8.91 8.91 0 0 0 9 8.78h104a8.93 8.93 0 0 0 9-8.81V11.77A8.93 8.93 0 0 0 116 3M39.17 107H21.06V48.73h18.11zm-9-66.21a10.5 10.5 0 1 1 10.49-10.5a10.5 10.5 0 0 1-10.54 10.48zM107 107H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53V48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75z" fill="currentColor" />
                      </svg>
                    )
                  },
                  {
                    platform: 'GitHub',
                    desc: 'Open source projects and code repositories',
                    link: 'https://github.com/Jerophin123',
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" style={{ color: 'var(--accent)' }}>
                        <path d="M12 2.247a10 10 0 0 0-3.162 19.487c.5.088.687-.212.687-.475c0-.237-.012-1.025-.012-1.862c-2.513.462-3.163-.613-3.363-1.175a3.64 3.64 0 0 0-1.025-1.413c-.35-.187-.85-.65-.013-.662a2 2 0 0 1 1.538 1.025a2.137 2.137 0 0 0 2.912.825a2.1 2.1 0 0 1 .638-1.338c-2.225-.25-4.55-1.112-4.55-4.937a3.9 3.9 0 0 1 1.025-2.688a3.6 3.6 0 0 1 .1-2.65s.837-.262 2.75 1.025a9.43 9.43 0 0 1 5 0c1.912-1.3 2.75-1.025 2.75-1.025a3.6 3.6 0 0 1 .1 2.65a3.87 3.87 0 0 1 1.025 2.688c0 3.837-2.338 4.687-4.562 4.937a2.37 2.37 0 0 1 .674 1.85c0 1.338-.012 2.413-.012 2.75c0 .263.187.575.687.475A10.005 10.005 0 0 0 12 2.247" fill="currentColor" />
                      </svg>
                    )
                  },
                  {
                    platform: 'LeetCode',
                    desc: 'Problem solving and coding challenges',
                    link: 'https://leetcode.com/u/codecrackerX08/',
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" style={{ color: 'var(--accent)' }}>
                        <path d="M13.483 0a1.37 1.37 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.3 5.3 0 0 0-1.209 2.104a5 5 0 0 0-.125.513a5.5 5.5 0 0 0 .062 2.362a6 6 0 0 0 .349 1.017a5.9 5.9 0 0 0 1.271 1.818l4.277 4.193l.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.38 1.38 0 0 0-1.951-.003l-2.396 2.392a3.02 3.02 0 0 1-4.205.038l-.02-.019l-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.7 2.7 0 0 1 .066-.523a2.55 2.55 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0m-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382a1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382a1.38 1.38 0 0 0-1.38-1.382z" fill="currentColor" />
                      </svg>
                    )
                  },
                  {
                    platform: 'Linktree',
                    desc: 'All my links in one place',
                    link: 'https://linktr.ee/Jerophin',
                    icon: (
                      <svg viewBox="0 0 80 97.7" width="48" height="48" style={{ color: 'var(--accent)' }}>
                        <g>
                          <path d="M0.2,33.1h24.2L7.1,16.7l9.5-9.6L33,23.8V0h14.2v23.8L63.6,7.1l9.5,9.6L55.8,33H80v13.5H55.7l17.3,16.7
                            l-9.5,9.4L40,49.1L16.5,72.7L7,63.2l17.3-16.7H0V33.1H0.2z M33.1,65.8h14.2v32H33.1V65.8z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    )
                  }
                ].map((profile, idx) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                    <motion.div
                      variants={cardVariants}
                      whileHover={{ scale: 1.05, y: -8 }}
                      transition={{ duration: 0.3 }}
                      style={{ width: '100%' }}
                    >
                      <Card
                        component="a"
                        href={profile.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          background: 'var(--glass-bg)',
                          backdropFilter: 'var(--backdrop-blur)',
                          WebkitBackdropFilter: 'var(--backdrop-blur)',
                          border: '1px solid var(--glass-border)',
                          borderRadius: { xs: '20px', sm: '24px', md: '28px' },
                          boxShadow: 'var(--glass-shadow)',
                          p: { xs: 2.5, sm: 3 },
                          height: '100%',
                          width: '100%',
                          boxSizing: 'border-box',
                          textAlign: 'center',
                          textDecoration: 'none',
                          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
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
                            transform: { xs: 'scale(0.98)', sm: 'translateY(-8px) scale(1.02)' },
                            borderColor: 'var(--glass-border-hover)',
                            boxShadow: 'var(--glass-shadow-hover)',
                            background: 'var(--glass-bg-hover)'
                          },
                          '&:active': {
                            transform: { xs: 'scale(0.98)', sm: 'translateY(-8px) scale(1.02)' }
                          }
                        }}
                      >
                        <Box
                          sx={{
                            mb: { xs: 1.5, sm: 2 },
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '& svg': {
                              width: { xs: '40px', sm: '48px' },
                              height: { xs: '40px', sm: '48px' }
                            }
                          }}
                        >
                          {profile.icon}
                        </Box>
                        <Typography
                          sx={{
                            color: 'var(--accent)',
                            fontWeight: 700,
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                            mb: { xs: 0.75, sm: 1 },
                            fontFamily: '"Poppins", sans-serif'
                          }}
                        >
                          {profile.platform}
                        </Typography>
                        <Typography
                          sx={{
                            color: 'var(--text-tertiary)',
                            fontSize: { xs: '0.85rem', sm: '0.9rem' },
                            lineHeight: { xs: 1.5, sm: 1.6 },
                            fontFamily: '"Poppins", sans-serif'
                          }}
                        >
                          {profile.desc}
                        </Typography>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ textAlign: 'center' }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    component={Link}
                    href="/otherprofiles"
                    sx={{
                      borderRadius: { xs: '20px', sm: '24px', md: '28px' },
                      background: 'var(--glass-bg)',
                      backdropFilter: 'var(--backdrop-blur-light)',
                      WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                      border: '1px solid var(--glass-border-hover)',
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1.25, sm: 1.5 },
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: 'var(--glass-shadow)',
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
                        transform: { xs: 'scale(0.98)', sm: 'translateY(-4px) scale(1.03)' },
                        boxShadow: 'var(--glass-shadow-hover)',
                        borderColor: 'var(--glass-border-hover)'
                      },
                      '&:active': {
                        transform: { xs: 'scale(0.98)', sm: 'translateY(-2px) scale(1.01)' }
                      }
                    }}
                  >
                    VIEW ALL PROFILES
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </motion.section>
        </Box>
      </Box>
    </ClientLayout>
  );
}
