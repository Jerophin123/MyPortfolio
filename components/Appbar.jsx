import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import Link from 'next/link';

const navLinks = [
  { 
    label: 'Home', 
    path: '/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 19v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-3q-.425 0-.712-.288T14 20v-5q0-.425-.288-.712T13 14h-2q-.425 0-.712.288T10 15v5q0 .425-.288.713T9 21H6q-.825 0-1.412-.587T4 19"/>
      </svg>
    )
  },
  { 
    label: 'About', 
    path: '/about',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17q.425 0 .713-.288T13 16v-4q0-.425-.288-.712T12 11t-.712.288T11 12v4q0 .425.288.713T12 17m0-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
      </svg>
    )
  },
  { 
    label: 'Skills', 
    path: '/skills',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 18q-.825 0-1.412-.587T8 16v-1.25q-1.425-.975-2.212-2.5T5 9q0-2.925 2.038-4.962T12 2t4.963 2.038T19 9q0 1.725-.788 3.238T16 14.75V16q0 .825-.587 1.413T14 18zm0 4q-.425 0-.712-.288T9 21t.288-.712T10 20h4q.425 0 .713.288T15 21t-.288.713T14 22z"/>
      </svg>
    )
  },
  { 
    label: 'Experience', 
    path: '/experience',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 21q-.825 0-1.412-.587T2 19V8q0-.825.588-1.412T4 6h4V4q0-.825.588-1.412T10 2h4q.825 0 1.413.588T16 4v2h4q.825 0 1.413.588T22 8v11q0 .825-.587 1.413T20 21zm6-15h4V4h-4z"/>
      </svg>
    )
  },
  { 
    label: 'Projects', 
    path: '/projects',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.5 17q.625 0 1.063-.437T10 15.5t-.437-1.062T8.5 14t-1.062.438T7 15.5t.438 1.063T8.5 17m0-7q.625 0 1.063-.437T10 8.5t-.437-1.062T8.5 7t-1.062.438T7 8.5t.438 1.063T8.5 10m7 7q.625 0 1.063-.437T17 15.5t-.437-1.062T15.5 14t-1.062.438T14 15.5t.438 1.063T15.5 17m0-7q.625 0 1.063-.437T17 8.5t-.437-1.062T15.5 7t-1.062.438T14 8.5t.438 1.063T15.5 10M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z"/>
      </svg>
    )
  },
  { 
    label: 'Certifications', 
    path: '/certifications',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="m12 14.475l1.925 1.15q.275.175.538-.012t.187-.513l-.5-2.175l1.7-1.475q.25-.225.15-.537t-.45-.338l-2.225-.175l-.875-2.075q-.125-.3-.45-.3t-.45.3l-.875 2.075l-2.225.175q-.35.025-.45.338t.15.537l1.7 1.475l-.5 2.175q-.075.325.188.513t.537.012zM8.65 20H6q-.825 0-1.412-.587T4 18v-2.65L2.075 13.4q-.275-.3-.425-.662T1.5 12t.15-.737t.425-.663L4 8.65V6q0-.825.588-1.412T6 4h2.65l1.95-1.925q.3-.275.663-.425T12 1.5t.738.15t.662.425L15.35 4H18q.825 0 1.413.588T20 6v2.65l1.925 1.95q.275.3.425.663t.15.737t-.15.738t-.425.662L20 15.35V18q0 .825-.587 1.413T18 20h-2.65l-1.95 1.925q-.3.275-.662.425T12 22.5t-.737-.15t-.663-.425z"/>
      </svg>
    )
  },
  { 
    label: 'Achievements', 
    path: '/achievements',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 10.8V7H5v1q0 .95.55 1.713T7 10.8m10 0q.9-.325 1.45-1.088T19 8V7h-2zM11 19v-3.1q-1.225-.275-2.187-1.037T7.4 12.95q-1.875-.225-3.137-1.637T3 8V7q0-.825.588-1.412T5 5h2q0-.825.588-1.412T9 3h6q.825 0 1.413.588T17 5h2q.825 0 1.413.588T21 7v1q0 1.9-1.263 3.313T16.6 12.95q-.45 1.15-1.412 1.913T13 15.9V19h3q.425 0 .713.288T17 20t-.288.713T16 21H8q-.425 0-.712-.288T7 20t.288-.712T8 19z"/>
      </svg>
    )
  },
  { 
    label: 'Connect', 
    path: '/otherprofiles',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.625 22q-.425 0-.737-.312t-.313-.738v-2.625q0-2.25 1.4-3.975t3.6-2.2q-1 .7-1.55 1.762t-.55 2.288v4.75q0 .275.075.55t.25.5zM8.3 22q-.425 0-.737-.312t-.313-.738V16.2q0-1.75 1.238-2.975T11.475 12H16.2q1.75 0 2.975 1.225T20.4 16.2v1.6q0 1.75-1.225 2.975T16.2 22zM12 9.9q-1.65 0-2.8-1.15t-1.15-2.8t1.15-2.8T12 2t2.8 1.15t1.15 2.8t-1.15 2.8T12 9.9"/>
      </svg>
    )
  }
];

const Appbar = ({ handleClick, showText, setDrawerOpen, drawerOpen }) => {
   const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(prev => !prev);
    setDrawerOpen(prev => !prev); // update parent too
  };

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
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0.005) 100%)',
          backdropFilter: 'blur(30px) saturate(200%) brightness(105%)',
          WebkitBackdropFilter: 'blur(30px) saturate(200%) brightness(105%)',
          boxShadow: 'none',
          border: 'none',
          borderBottom: 'none',
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
      maxWidth: { md: '1400px', xs: '100%' },
      mx: 'auto',
      justifyContent: 'space-between',
      px: { md: 12, xs: 2 }
    }}
  >

        {/* 🔷 Logo + Name - Left Side */}
<Box
  sx={{
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    mr: { md: 35, xs: 0 },
    '&:hover .brand-text': {
      // Use media queries instead of isMobile to prevent hydration mismatch
      '@media (min-width: 900px)': {
        opacity: 1,
        transform: 'translateX(10px)'
      }
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
              // Use CSS to handle mobile vs desktop, avoiding isMobile to prevent hydration mismatch
              opacity: { 
                xs: showText ? 1 : 0, 
                md: 0 
              },
              whiteSpace: 'nowrap',
              transition: 'all 0.4s ease-in-out',
              transform: { 
                xs: showText ? 'translateX(10px)' : 'translateX(0)',
                md: 'translateX(0)'
              }
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

        {/* 🌐 Navigation - Right Side */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: { md: 4, xs: 0 } }}>
          {/* 🖥 Desktop Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {mainLinks.map((link, i) => (
              <Button
                key={i}
                component={Link}
                href={link.path}
                sx={{
                  position: 'relative',
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  px: 2.5,
                  py: 1.2,
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%)',
                  backdropFilter: 'blur(12px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(12px) saturate(150%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.25) 50%, transparent 100%)',
                    zIndex: 1
                  },
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(77, 184, 255, 0.12) 0%, rgba(77, 184, 255, 0.08) 100%)',
                    color: '#4db8ff',
                    transform: 'translateY(-3px) scale(1.02)',
                    boxShadow: '0 12px 32px rgba(77, 184, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
                    borderColor: 'rgba(77, 184, 255, 0.2)',
                    backdropFilter: 'blur(16px) saturate(160%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(160%)',
                    '& svg': {
                      color: '#4db8ff'
                    }
                  },
                  '& svg': {
                    transition: 'all 0.3s ease',
                    color: 'currentColor'
                  }
                }}
              >
                {link.icon}
                {link.label}
              </Button>
            ))}

            {/* ➕ More Button */}
            <Button
              onClick={handleMoreOpen}
              sx={{
                color: 'rgba(255, 255, 255, 0.85)',
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 600,
                fontSize: '0.95rem',
                textTransform: 'none',
                px: 2.5,
                py: 1.2,
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%)',
                backdropFilter: 'blur(12px) saturate(150%)',
                WebkitBackdropFilter: 'blur(12px) saturate(150%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.25) 50%, transparent 100%)',
                  zIndex: 1
                },
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(77, 184, 255, 0.12) 0%, rgba(77, 184, 255, 0.08) 100%)',
                  color: '#4db8ff',
                  transform: 'translateY(-3px) scale(1.02)',
                  boxShadow: '0 12px 32px rgba(77, 184, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
                  borderColor: 'rgba(77, 184, 255, 0.2)',
                  backdropFilter: 'blur(16px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(16px) saturate(160%)',
                  '& svg': {
                    color: '#4db8ff'
                  }
                },
                '& svg': {
                  transition: 'all 0.3s ease',
                  color: 'currentColor'
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 15.5q-.2 0-.375-.062T11.3 15.3l-4.6-4.6q-.3-.3-.3-.7t.3-.7t.7-.3t.7.3L12 13.1l3.9-3.9q.3-.3.7-.3t.7.3t.3.7t-.3.7l-4.6 4.6q-.15.15-.325.212T12 15.5"/>
              </svg>
              More
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
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.05) 100%)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '20px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    overflow: 'hidden'
                  }
                }
              }}
            >
              {moreLinks.map((link, i) => (
                <MenuItem
                  key={i}
                  component={Link}
                  href={link.path}
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
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(77, 184, 255, 0.15) 0%, rgba(77, 184, 255, 0.1) 100%)',
                      color: '#4db8ff',
                      transform: 'translateX(4px)',
                      backdropFilter: 'blur(12px) saturate(160%)',
                      WebkitBackdropFilter: 'blur(12px) saturate(160%)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 2px 8px rgba(77, 184, 255, 0.1)',
                      borderRadius: '12px',
                      '& svg': {
                        color: '#4db8ff'
                      }
                    },
                    '& svg': {
                      transition: 'all 0.3s ease',
                      color: 'currentColor'
                    }
                  }}
                >
                  {link.icon}
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
      borderRadius: '20px',
      background: 'linear-gradient(135deg, rgba(77, 184, 255, 0.06) 0%, rgba(77, 184, 255, 0.03) 100%)',
      backdropFilter: 'blur(12px) saturate(150%)',
      WebkitBackdropFilter: 'blur(12px) saturate(150%)',
      border: '1px solid rgba(77, 184, 255, 0.15)',
      boxShadow: '0 4px 16px rgba(77, 184, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
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
        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
        zIndex: 1
      },
      '&:hover': {
        background: 'linear-gradient(135deg, rgba(77, 184, 255, 0.12) 0%, rgba(77, 184, 255, 0.08) 100%)',
        transform: 'translateY(-3px) scale(1.02)',
        boxShadow: '0 12px 32px rgba(77, 184, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
        borderColor: 'rgba(77, 184, 255, 0.25)',
        backdropFilter: 'blur(16px) saturate(160%)',
        WebkitBackdropFilter: 'blur(16px) saturate(160%)'
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
