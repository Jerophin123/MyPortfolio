'use client';

import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import AnimatedBackground from '@/components/AnimatedBackground';
import ClientLayout from '@/components/ClientLayout';
import Section from '@/components/Section';

export default function ExperiencePage() {
  return (
    <ClientLayout>
      <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
        {/* Custom Animated Background */}
        <AnimatedBackground />

        {/* 🔲 Optional Transparent Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2))',
            zIndex: 1
          }}
        />

        {/* 🎯 Foreground Experience Section */}
        <Box sx={{ position: 'relative', zIndex: 2, marginTop: '60px', px: { xs: 2, sm: 3, md: 0 } }}>
        <Section title="Experience" bg="transparent">
          
          <Card
  sx={{
    width: { xs: 'auto', sm: 'auto' },
    maxWidth: { xs: 'calc(100% - 10px)', sm: '800px' },
    ml: { xs: '-7px', sm: 'auto' },
    mr: { xs: '10px', sm: 'auto' },
    marginTop: { xs: '20px', sm: '30px', md: '40px' },
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.1) 100%)',
    backdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
    WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: { xs: '20px', sm: '24px', md: '28px' },
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.3), 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(255, 255, 255, 0.05), inset 1px 0 0 rgba(255, 255, 255, 0.1), inset -1px 0 0 rgba(255, 255, 255, 0.1)',
    px: { xs: 2.5, sm: 3.5, md: 4 },
    py: { xs: 3, sm: 3.5, md: 4 },
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box',
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
      transform: { xs: 'none', sm: 'translateY(-8px) scale(1.02)' },
      borderColor: { xs: 'rgba(255, 255, 255, 0.18)', sm: 'rgba(77, 184, 255, 0.25)' },
      boxShadow: { xs: '0 8px 32px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.3), 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(255, 255, 255, 0.05), inset 1px 0 0 rgba(255, 255, 255, 0.1), inset -1px 0 0 rgba(255, 255, 255, 0.1)', sm: '0 15px 50px rgba(0, 0, 0, 0.15), 0 2px 0 rgba(255, 255, 255, 0.4), 0 -2px 0 rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 1px 0 0 rgba(255, 255, 255, 0.15), inset -1px 0 0 rgba(255, 255, 255, 0.15)' }
    },
    '&:active': {
      transform: { xs: 'scale(0.98)', sm: 'translateY(-8px) scale(1.02)' },
    }
  }}
>
  <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'center', md: 'flex-start' },
        justifyContent: 'space-between',
        gap: { xs: 2.5, sm: 2.75, md: 3 }
      }}
    >
      {/* 📘 Left Content */}
      <Box sx={{ flex: 1, width: '100%', textAlign: { xs: 'center', md: 'left' } }}>
        <Typography
          variant="h5"
          sx={{
            color: '#4db8ff',
            fontWeight: 700,
            fontFamily: '"Poppins", sans-serif',
            fontSize: { xs: '1.15rem', sm: '1.3rem', md: '1.4rem' },
            mb: { xs: 0.75, sm: 0.875, md: 1 },
            textAlign: { xs: 'center', md: 'left' },
            lineHeight: { xs: 1.3, sm: 1.4, md: 1.5 }
          }}
        >
          Trios Technologies
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{
            color: '#bbbbbb',
            fontStyle: 'italic',
            fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
            mb: { xs: 2, sm: 2.5, md: 3 },
            fontFamily: '"Poppins", sans-serif',
            textAlign: { xs: 'center', md: 'left' },
            lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 }
          }}
        >
          Web Development Intern — June 2024 to July 2024
        </Typography>

        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            paddingLeft: 0,
            fontSize: { xs: '0.875rem', sm: '0.9rem', md: '0.95rem' },
            color: '#d0d0d0',
            lineHeight: { xs: 1.6, sm: 1.7, md: 1.8 },
            fontFamily: '"Poppins", sans-serif',
            textAlign: { xs: 'left', md: 'left' },
            width: '100%'
          }}
        >
          {[
            '1. Created responsive apps focused on accessibility & performance.',
            '2. Built a Student Management System reducing data errors by 50%.',
            '3. Enhanced interactivity via RESTful API integration.',
            '4. Improved load times through JS/CSS optimization.'
          ].map((item, index) => (
            <Box
              component="li"
              key={index}
              sx={{ mb: { xs: 1, sm: 1.1, md: 1.2 }, display: 'flex', alignItems: 'flex-start' }}
            >
              <Typography component="span" sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>{item}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* 🔗 Logo */}
      <Box
        component="a"
        href="https://triostechnology.com/"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          width: { xs: '110px', sm: '115px', md: '100px' },
          alignSelf: { xs: 'center', md: 'flex-start' },
          borderRadius: { xs: '10px', sm: '11px', md: '12px' },
          border: '2px solid #4db8ff',
          overflow: 'hidden',
          flexShrink: 0,
          mt: { xs: 0.5, md: 0 }
        }}
      >
        <Box
          component="img"
          src="/trios_technologies_pvt_ltd_logo.jpg"
          alt="Trios Technologies Logo"
          sx={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </Box>
    </Box>
  </CardContent>
</Card>

        <Card
  sx={{
    width: { xs: 'auto', sm: 'auto' },
    maxWidth: { xs: 'calc(100% - 10px)', sm: '800px' },
    ml: { xs: '-7px', sm: 'auto' },
    mr: { xs: '10px', sm: 'auto' },
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.1) 100%)',
    backdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
    WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: { xs: '20px', sm: '24px', md: '28px' },
    marginTop: { xs: '20px', sm: '25px', md: '30px' },
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.3), 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(255, 255, 255, 0.05), inset 1px 0 0 rgba(255, 255, 255, 0.1), inset -1px 0 0 rgba(255, 255, 255, 0.1)',
    px: { xs: 2.5, sm: 3.5, md: 4 },
    py: { xs: 3, sm: 3.5, md: 4 },
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box',
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
      transform: { xs: 'none', sm: 'translateY(-8px) scale(1.02)' },
      borderColor: { xs: 'rgba(255, 255, 255, 0.18)', sm: 'rgba(77, 184, 255, 0.25)' },
      boxShadow: { xs: '0 8px 32px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.3), 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(255, 255, 255, 0.05), inset 1px 0 0 rgba(255, 255, 255, 0.1), inset -1px 0 0 rgba(255, 255, 255, 0.1)', sm: '0 15px 50px rgba(0, 0, 0, 0.15), 0 2px 0 rgba(255, 255, 255, 0.4), 0 -2px 0 rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 1px 0 0 rgba(255, 255, 255, 0.15), inset -1px 0 0 rgba(255, 255, 255, 0.15)' }
    },
    '&:active': {
      transform: { xs: 'scale(0.98)', sm: 'translateY(-8px) scale(1.02)' },
    }
  }}
>
  <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'center', md: 'flex-start' },
        justifyContent: 'space-between',
        gap: { xs: 2.5, sm: 2.75, md: 3 }
      }}
    >
      {/* 📘 Left Content */}
      <Box sx={{ flex: 1, width: '100%', textAlign: { xs: 'center', md: 'left' } }}>
        <Typography
          variant="h5"
          sx={{
            color: '#4db8ff',
            fontWeight: 700,
            fontFamily: '"Poppins", sans-serif',
            fontSize: { xs: '1.15rem', sm: '1.3rem', md: '1.4rem' },
            mb: { xs: 0.75, sm: 0.875, md: 1 },
            textAlign: { xs: 'center', md: 'left' },
            lineHeight: { xs: 1.3, sm: 1.4, md: 1.5 }
          }}
        >
          Delphin Associates
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{
            color: '#bbbbbb',
            fontStyle: 'italic',
            fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
            mb: { xs: 2, sm: 2.5, md: 3 },
            fontFamily: '"Poppins", sans-serif',
            textAlign: { xs: 'center', md: 'left' },
            lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 }
          }}
        >
          Web Development Intern — May 2025 to June 2025
        </Typography>

        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            paddingLeft: 0,
            fontSize: { xs: '0.875rem', sm: '0.9rem', md: '0.95rem' },
            color: '#d0d0d0',
            lineHeight: { xs: 1.6, sm: 1.7, md: 1.8 },
            fontFamily: '"Poppins", sans-serif',
            textAlign: { xs: 'left', md: 'left' },
            width: '100%'
          }}
        >
          {[
            '1. Created Website for their Business Growth up to 75%',
            '2. Improved load times through JS/CSS optimization.',
            '3. Built and deployed a full-stack website using React, Vite, FastAPI, and MongoDB.',
            '4. Streamlined backend operations using FastAPI, reducing response time by 40%.',
            '5. Enhanced online visibility with SEO-friendly React structure and optimized routing.',
            '6. Boosted user engagement with a responsive UI and intuitive navigation design.'
          ].map((item, index) => (
            <Box
              component="li"
              key={index}
              sx={{ mb: { xs: 1, sm: 1.1, md: 1.2 }, display: 'flex', alignItems: 'flex-start' }}
            >
              <Typography component="span" sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>{item}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* 🔗 Logo */}
      <Box
        component="a"
        href="https://www.delphinassociates.com/"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          width: { xs: '110px', sm: '115px', md: '100px' },
          alignSelf: { xs: 'center', md: 'flex-start' },
          borderRadius: { xs: '10px', sm: '11px', md: '12px' },
          border: '2px solid #4db8ff',
          overflow: 'hidden',
          flexShrink: 0,
          mt: { xs: 0.5, md: 0 }
        }}
      >
        <Box
          component="img"
          src="/Delphin-Associates.jpg"
          alt="Delphin Logo"
          sx={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </Box>
    </Box>
  </CardContent>
</Card>

        </Section>
      </Box>
    </Box>
    </ClientLayout>
  );
}
