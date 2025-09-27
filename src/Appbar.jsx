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
  { label: 'Connect', path: '/otherprofiles' }
];

const Appbar = ({ handleClick, showText, setDrawerOpen, drawerOpen }) => {
   const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(prev => !prev);
    setDrawerOpen(prev => !prev); // update parent too
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMoreOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMoreClose = () => setAnchorEl(null);

  const mainLinks = navLinks.slice(0, 3);
  const moreLinks = navLinks.slice(3);

  return (
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(8px) saturate(120%)',
          WebkitBackdropFilter: 'blur(8px) saturate(120%)',
          boxShadow: 'none',
          border: '1px solid rgba(255, 255, 255, 0.03)',
          zIndex: 1300,
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >



      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: { xs: 2, sm: 3, md: 6 },
          minHeight: { xs: 72, sm: 80, md: 96 }
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
              height: { xs: 40, sm: 44, md: 48 },
              width: { xs: 40, sm: 44, md: 48 },
              objectFit: 'contain',
              border: '1px solid rgba(77, 184, 255, 0.1)',
              borderRadius: '50%',
              padding: '6px',
              background: 'rgba(77, 184, 255, 0.03)',
              backdropFilter: 'blur(6px) saturate(110%)',
              WebkitBackdropFilter: 'blur(6px) saturate(110%)',
              boxShadow: '0 4px 12px rgba(77, 184, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              '&:hover': {
                transform: 'scale(1.05)',
                background: 'rgba(77, 184, 255, 0.08)',
                boxShadow: '0 8px 20px rgba(77, 184, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px) saturate(130%)',
                WebkitBackdropFilter: 'blur(10px) saturate(130%)'
              }
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
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  px: 2.5,
                  py: 1.2,
                  borderRadius: '24px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(6px) saturate(120%)',
                  WebkitBackdropFilter: 'blur(6px) saturate(120%)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                    zIndex: 1
                  },
                  '&:hover': {
                    background: 'rgba(77, 184, 255, 0.08)',
                    color: '#4db8ff',
                    transform: 'translateY(-2px) scale(1.01)',
                    boxShadow: '0 8px 20px rgba(77, 184, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    borderColor: 'rgba(77, 184, 255, 0.15)',
                    backdropFilter: 'blur(10px) saturate(140%)',
                    WebkitBackdropFilter: 'blur(10px) saturate(140%)'
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
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 500,
                fontSize: '0.95rem',
                textTransform: 'none',
                px: 2.5,
                py: 1.2,
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(6px) saturate(120%)',
                WebkitBackdropFilter: 'blur(6px) saturate(120%)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
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
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                  zIndex: 1
                },
                '&:hover': {
                  background: 'rgba(77, 184, 255, 0.08)',
                  color: '#4db8ff',
                  transform: 'translateY(-2px) scale(1.01)',
                  boxShadow: '0 8px 20px rgba(77, 184, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  borderColor: 'rgba(77, 184, 255, 0.15)',
                  backdropFilter: 'blur(10px) saturate(140%)',
                  WebkitBackdropFilter: 'blur(10px) saturate(140%)'
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
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1,
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(8px) saturate(120%)',
                    WebkitBackdropFilter: 'blur(8px) saturate(120%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                    overflow: 'hidden'
                  }
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
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    borderRadius: '8px',
                    margin: '2px 8px',
                    '&:hover': {
                      background: 'rgba(77, 184, 255, 0.12)',
                      color: '#4db8ff',
                      transform: 'translateX(2px)',
                      backdropFilter: 'blur(6px) saturate(130%)',
                      WebkitBackdropFilter: 'blur(6px) saturate(130%)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px'
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
    disableRipple
    disableElevation
    onClick={() => setDrawerOpen(prev => !prev)}
    sx={{
      color: '#4db8ff',
      px: 2.5,
      py: 1.2,
      textTransform: 'none',
      outline: 'none',
      height: 48,
      minWidth: 48,
      borderRadius: '24px',
      background: 'rgba(77, 184, 255, 0.03)',
      backdropFilter: 'blur(6px) saturate(120%)',
      WebkitBackdropFilter: 'blur(6px) saturate(120%)',
      border: '1px solid rgba(77, 184, 255, 0.1)',
      boxShadow: '0 4px 12px rgba(77, 184, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
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
        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
        zIndex: 1
      },
      '&:hover': {
        background: 'rgba(77, 184, 255, 0.08)',
        transform: 'translateY(-2px) scale(1.01)',
        boxShadow: '0 8px 20px rgba(77, 184, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        borderColor: 'rgba(77, 184, 255, 0.15)',
        backdropFilter: 'blur(10px) saturate(140%)',
        WebkitBackdropFilter: 'blur(10px) saturate(140%)'
      }
    }}
  >
    {drawerOpen ? (
      // Cross icon
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M6 6L18 18M6 18L18 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      // Hamburger icon
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
    )}
  </Button>
</Box>


        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
