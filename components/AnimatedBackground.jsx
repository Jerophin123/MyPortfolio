'use client';

import React from 'react';
import { Box, keyframes } from '@mui/material';

// Animated gradient keyframes
const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Optimized floating particles animation
const float = keyframes`
  0%, 100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
    opacity: 0.6;
  }
  50% {
    transform: translate3d(0, -15px, 0) rotate(90deg);
    opacity: 1;
  }
`;

// Optimized pulse animation
const pulse = keyframes`
  0%, 100% {
    transform: scale3d(1, 1, 1);
    opacity: 0.4;
  }
  50% {
    transform: scale3d(1.05, 1.05, 1);
    opacity: 0.8;
  }
`;

// Optimized rotate animation
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// New optimized shimmer animation
const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
`;

// New optimized drift animation
const drift = keyframes`
  0%, 100% {
    transform: translate3d(0, 0, 0);
  }
  33% {
    transform: translate3d(10px, -5px, 0);
  }
  66% {
    transform: translate3d(-5px, 10px, 0);
  }
`;

const AnimatedBackground = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        // Optimized gradient background - adapts to theme
        background: `
          radial-gradient(ellipse at top, var(--bg-secondary) 0%, var(--bg-primary) 50%),
          radial-gradient(ellipse at bottom, var(--bg-tertiary) 0%, var(--bg-primary) 50%),
          linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)
        `,
        backgroundSize: '100% 100%, 100% 100%, 200% 200%',
        backgroundPosition: 'center top, center bottom, 0% 50%',
        animation: `${gradientShift} 25s ease infinite`,
        willChange: 'background-position',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, var(--particle-accent-very-light) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, var(--particle-white-very-light) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, var(--particle-accent-very-light) 0%, transparent 60%)
          `,
          animation: `${gradientShift} 35s ease infinite reverse`,
          willChange: 'background-position',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          right: '-50%',
          bottom: '-50%',
          width: '200%',
          height: '200%',
          background: `
            linear-gradient(45deg, 
              transparent 30%, 
              var(--particle-accent-very-light) 50%, 
              transparent 70%
            )
          `,
          animation: `${rotate} 60s linear infinite`,
          willChange: 'transform',
          pointerEvents: 'none',
        }
      }}
    >
      {/* Optimized floating particles - reduced count for performance */}
      {[...Array(8)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: { xs: '3px', sm: '5px', md: '6px' },
            height: { xs: '3px', sm: '5px', md: '6px' },
            background: 'var(--particle-accent)',
            borderRadius: '50%',
            left: `${12 + i * 10}%`,
            top: `${20 + (i % 3) * 25}%`,
            animation: `${float} ${5 + i * 0.6}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
            filter: 'blur(0.5px)',
            willChange: 'transform',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Optimized small dots - reduced count */}
      {[...Array(5)].map((_, i) => (
        <Box
          key={`small-dot-${i}`}
          sx={{
            position: 'absolute',
            width: '2px',
            height: '2px',
            background: 'var(--particle-white)',
            borderRadius: '50%',
            left: `${25 + i * 12}%`,
            top: `${25 + (i % 2) * 30}%`,
            animation: `${pulse} ${4 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.6}s`,
            willChange: 'transform',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Optimized large orbs - reduced blur for performance */}
      {[...Array(2)].map((_, i) => (
        <Box
          key={`orb-${i}`}
          sx={{
            position: 'absolute',
            width: { xs: '120px', sm: '180px', md: '240px' },
            height: { xs: '120px', sm: '180px', md: '240px' },
            background: `radial-gradient(circle, var(--particle-accent-very-light) 0%, transparent 70%)`,
            borderRadius: '50%',
            left: `${25 + i * 50}%`,
            top: `${15 + i * 35}%`,
            animation: `${pulse} ${8 + i * 2}s ease-in-out infinite`,
            filter: 'blur(2px)',
            willChange: 'transform',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Optimized medium orbs - reduced count */}
      {[...Array(2)].map((_, i) => (
        <Box
          key={`medium-orb-${i}`}
          sx={{
            position: 'absolute',
            width: { xs: '60px', sm: '100px', md: '120px' },
            height: { xs: '60px', sm: '100px', md: '120px' },
            background: `radial-gradient(circle, var(--particle-white-very-light) 0%, transparent 70%)`,
            borderRadius: '50%',
            left: `${20 + i * 60}%`,
            top: `${50 + i * 25}%`,
            animation: `${drift} ${6 + i * 1.5}s ease-in-out infinite`,
            animationDelay: `${i * 2}s`,
            filter: 'blur(1.5px)',
            willChange: 'transform',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Optimized animated lines - reduced count */}
      {[...Array(2)].map((_, i) => (
        <Box
          key={`line-${i}`}
          sx={{
            position: 'absolute',
            width: '1px',
            height: '120px',
            background: `linear-gradient(to bottom, 
              transparent 0%, 
              var(--particle-accent-light) 50%, 
              transparent 100%
            )`,
            left: `${30 + i * 40}%`,
            top: `${20 + i * 30}%`,
            animation: `${float} ${8 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 1.5}s`,
            transform: `rotate(${i * 60}deg)`,
            willChange: 'transform',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Optimized horizontal lines - reduced count */}
      {[...Array(2)].map((_, i) => (
        <Box
          key={`h-line-${i}`}
          sx={{
            position: 'absolute',
            width: '100px',
            height: '1px',
            background: `linear-gradient(to right, 
              transparent 0%, 
              var(--particle-white) 50%, 
              transparent 100%
            )`,
            left: `${25 + i * 50}%`,
            top: `${35 + i * 30}%`,
            animation: `${drift} ${7 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 1.2}s`,
            transform: `rotate(${i * 45}deg)`,
            willChange: 'transform',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Optimized glowing dots - reduced count */}
      {[...Array(4)].map((_, i) => (
        <Box
          key={`dot-${i}`}
          sx={{
            position: 'absolute',
            width: '3px',
            height: '3px',
            background: 'var(--particle-white-light)',
            borderRadius: '50%',
            left: `${20 + i * 20}%`,
            top: `${30 + (i % 2) * 35}%`,
            animation: `${pulse} ${4 + i * 0.8}s ease-in-out infinite`,
            animationDelay: `${i * 0.6}s`,
            boxShadow: '0 0 6px var(--particle-glow)',
            willChange: 'transform',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Optimized shimmer effects - reduced count */}
      {[...Array(2)].map((_, i) => (
        <Box
          key={`shimmer-${i}`}
          sx={{
            position: 'absolute',
            width: '250px',
            height: '1px',
            background: `linear-gradient(90deg, 
              transparent 0%, 
              var(--particle-accent-light) 50%, 
              transparent 100%
            )`,
            left: `${15 + i * 70}%`,
            top: `${25 + i * 40}%`,
            animation: `${shimmer} ${12 + i * 3}s ease-in-out infinite`,
            animationDelay: `${i * 3}s`,
            transform: `rotate(${i * 45}deg)`,
            willChange: 'transform',
            pointerEvents: 'none',
          }}
        />
      ))}
    </Box>
  );
};

export default AnimatedBackground;
