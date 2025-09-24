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
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        // Main gradient background - darker
        background: `
          linear-gradient(135deg, 
            #000000 0%, 
            #0a0a0a 25%, 
            #0f0f0f 50%, 
            #1a1a1a 75%, 
            #000000 100%
          )
        `,
        backgroundSize: '400% 400%',
        animation: `${gradientShift} 20s ease infinite`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(77, 184, 255, 0.04) 0%, transparent 60%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 60%),
            radial-gradient(circle at 40% 40%, rgba(77, 184, 255, 0.05) 0%, transparent 60%)
          `,
          animation: `${gradientShift} 30s ease infinite reverse`,
          willChange: 'background-position',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(45deg, 
              transparent 20%, 
              rgba(77, 184, 255, 0.02) 50%, 
              transparent 80%
            )
          `,
          animation: `${rotate} 40s linear infinite`,
          willChange: 'transform',
        }
      }}
    >
      {/* Optimized floating particles */}
      {[...Array(12)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: { xs: '4px', sm: '6px', md: '8px' },
            height: { xs: '4px', sm: '6px', md: '8px' },
            background: 'rgba(77, 184, 255, 0.3)',
            borderRadius: '50%',
            left: `${10 + i * 8}%`,
            top: `${15 + (i % 3) * 25}%`,
            animation: `${float} ${4 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
            filter: 'blur(0.3px)',
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Optimized small dots */}
      {[...Array(8)].map((_, i) => (
        <Box
          key={`small-dot-${i}`}
          sx={{
            position: 'absolute',
            width: '2px',
            height: '2px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            left: `${20 + i * 10}%`,
            top: `${20 + (i % 2) * 30}%`,
            animation: `${pulse} ${3 + i * 0.4}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Optimized large orbs */}
      {[...Array(3)].map((_, i) => (
        <Box
          key={`orb-${i}`}
          sx={{
            position: 'absolute',
            width: { xs: '100px', sm: '150px', md: '200px' },
            height: { xs: '100px', sm: '150px', md: '200px' },
            background: `radial-gradient(circle, rgba(77, 184, 255, 0.04) 0%, transparent 70%)`,
            borderRadius: '50%',
            left: `${20 + i * 30}%`,
            top: `${20 + i * 25}%`,
            animation: `${pulse} ${5 + i}s ease-in-out infinite`,
            filter: 'blur(1.5px)',
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Optimized medium orbs */}
      {[...Array(3)].map((_, i) => (
        <Box
          key={`medium-orb-${i}`}
          sx={{
            position: 'absolute',
            width: { xs: '50px', sm: '80px', md: '100px' },
            height: { xs: '50px', sm: '80px', md: '100px' },
            background: `radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)`,
            borderRadius: '50%',
            left: `${15 + i * 30}%`,
            top: `${40 + i * 20}%`,
            animation: `${drift} ${4 + i * 0.8}s ease-in-out infinite`,
            animationDelay: `${i * 1.2}s`,
            filter: 'blur(1px)',
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Optimized animated lines */}
      {[...Array(4)].map((_, i) => (
        <Box
          key={`line-${i}`}
          sx={{
            position: 'absolute',
            width: '2px',
            height: '100px',
            background: `linear-gradient(to bottom, 
              transparent 0%, 
              rgba(77, 184, 255, 0.15) 50%, 
              transparent 100%
            )`,
            left: `${15 + i * 25}%`,
            top: `${15 + i * 20}%`,
            animation: `${float} ${6 + i * 1.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
            transform: `rotate(${i * 45}deg)`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Optimized horizontal lines */}
      {[...Array(3)].map((_, i) => (
        <Box
          key={`h-line-${i}`}
          sx={{
            position: 'absolute',
            width: '80px',
            height: '1px',
            background: `linear-gradient(to right, 
              transparent 0%, 
              rgba(255, 255, 255, 0.1) 50%, 
              transparent 100%
            )`,
            left: `${20 + i * 30}%`,
            top: `${30 + i * 20}%`,
            animation: `${drift} ${5 + i * 1.2}s ease-in-out infinite`,
            animationDelay: `${i * 0.6}s`,
            transform: `rotate(${i * 60}deg)`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Optimized glowing dots */}
      {[...Array(6)].map((_, i) => (
        <Box
          key={`dot-${i}`}
          sx={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.4)',
            borderRadius: '50%',
            left: `${15 + i * 15}%`,
            top: `${25 + (i % 2) * 30}%`,
            animation: `${pulse} ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
            boxShadow: '0 0 8px rgba(77, 184, 255, 0.3)',
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Optimized shimmer effects */}
      {[...Array(3)].map((_, i) => (
        <Box
          key={`shimmer-${i}`}
          sx={{
            position: 'absolute',
            width: '200px',
            height: '2px',
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(77, 184, 255, 0.2) 50%, 
              transparent 100%
            )`,
            left: `${10 + i * 30}%`,
            top: `${20 + i * 25}%`,
            animation: `${shimmer} ${8 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 2}s`,
            transform: `rotate(${i * 30}deg)`,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </Box>
  );
};

export default AnimatedBackground;
