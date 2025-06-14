import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
  Tooltip
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Skills', path: '/skills' },
  { label: 'Experience', path: '/experience' },
  { label: 'Projects', path: '/projects' },
  { label: 'Certifications', path: '/certifications' },
  { label: 'Achievements', path: '/achievements' },
  { label: 'Profiles & Contact', path: '/otherprofiles' }
];

const Appbar = ({ handleClick, showText, setDrawerOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMoreOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMoreClose = () => setAnchorEl(null);

  const mainLinks = navLinks.slice(0, 3);
  const moreLinks = navLinks.slice(3);

  return (
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: {
            xs: 'rgba(0, 25, 47, 0.96)', // bluish for mobile (xs breakpoint)
            sm: 'rgba(7, 7, 7, 0.96)'    // dark for tablets and above
          },
          backdropFilter: 'blur(10px)',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.65)',
          zIndex: 1300
        }}
      >



      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: { xs: 2, sm: 3, md: 6 },
          minHeight: { xs: 56, md: 72 }
        }}
      >
 <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'center'  // 👈 control layout manually
    }}
  >

        {/* 🔷 Logo + Name */}
<Box
  sx={{
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    mr: { md: '600px', xs: 0 }, // ✅ apply spacing between logo & nav on desktop only
    '&:hover .brand-text': {
      ...(isMobile ? {} : {
        opacity: 1,
        transform: 'translateX(10px)'
      })
    }
  }}
  onClick={handleClick}
>




          <Box
            component="img"
            src="/favicon.png"
            alt="Jerophin Logo"
            sx={{
              height: { xs: 28, sm: 32, md: 36 },
              width: 'auto',
              objectFit: 'contain',
              border: '2px solid #4db8ff',
              borderRadius: '30%',
              padding: '6px',
              backgroundColor: '#121212',
              boxShadow: '0 4px 12px rgba(77, 184, 255, 0.3)',
              transition: 'all 0.3s ease'

            }}
          />
          <Typography
            className="brand-text"
            sx={{
              ml: 1.5,
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 700,
              fontSize: { xs: '1rem', sm: '1.3rem', md: '1.5rem' },
              opacity: isMobile ? (showText ? 1 : 0) : 0,
              whiteSpace: 'nowrap',
              transition: 'all 0.4s ease-in-out',
              transform: isMobile
                ? (showText ? 'translateX(10px)' : 'translateX(0)')
                : 'translateX(0)'
            }}
          >
            <Box component="span" sx={{ color: '#4db8ff' }}>
              Jerophin D R
            </Box>{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(90deg, #4db8ff, #ffffff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mx: 0.5 // margin to balance spacing
              }}
            >
              |
            </Box>{' '}
            <Box component="span" sx={{ color: '#ffffff' }}>
              Portfolio
            </Box>
          </Typography>

        </Box>

        {/* 🌐 Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 ,ml: { xs: 'auto', md: 2 } }}>
          {/* 🖥 Desktop Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {mainLinks.map((link, i) => (
              <Button
                key={i}
                component={Link}
                to={link.path}
                sx={{
                  position: 'relative',
                  color: '#dddddd',
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  px: 1,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -3,
                    left: 0,
                    width: '0%',
                    height: '2px',
                    backgroundColor: '#4db8ff',
                    transition: 'width 0.15s ease-in-out'
                  },
                  '&:hover': {
                    color: '#4db8ff'
                  },
                  '&:hover::after': {
                    width: '100%'
                  }
                }}
              >
                {link.label}
              </Button>
            ))}

            {/* ➕ More Button */}
            <Button
              onClick={handleMoreOpen}
              sx={{
                color: '#dddddd',
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 500,
                fontSize: '0.95rem',
                textTransform: 'none',
                px: 1,
                '&:hover': {
                  color: '#4db8ff'
                }
              }}
            >
              More ▾
            </Button>

            {/* Menu under More */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMoreClose}
              PaperProps={{
                sx: {
                  backgroundColor: '#121212',
                  border: '1px solid #4db8ff',
                  borderRadius: 2
                }
              }}
            >
              {moreLinks.map((link, i) => (
                <MenuItem
                  key={i}
                  component={Link}
                  to={link.path}
                  onClick={handleMoreClose}
                  sx={{
                    color: '#c0c0c0',
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: '0.9rem',
                    '&:hover': {
                      backgroundColor: 'rgba(77,184,255,0.1)',
                      color: '#4db8ff'
                    }
                  }}
                >
                  {link.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          </Box>

          {/* 📱 Mobile Hamburger */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Button
              onClick={() => setDrawerOpen(prev => !prev)}
              sx={{
                color: '#4db8ff',
                px: 2,
                py: 0.5,
                textTransform: 'none',
                height: 36,
                minWidth: 40,
                '&:hover': {
                  backgroundColor: 'rgba(77, 184, 255, 0.1)'
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
