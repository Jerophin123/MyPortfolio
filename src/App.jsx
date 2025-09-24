import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AppBar, Toolbar, Fade, Typography, Button, Box, Grid, Card, CardContent, Avatar, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Menu, MenuItem, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import profileImage from './assets/profile.jpg';
import Appbar from './Appbar'; // adjust the path if it's in a different folder
import AnimatedBackground from './components/AnimatedBackground';
import { keyframes } from '@emotion/react';


const roles = ['Full Stack Developer', 'UI UX Designer'];

function App() {

const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [visible, setVisible] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showText, setShowText] = useState(false);

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

 
  const handleClick = () => {
    if (isMobile) {
      setShowText((prev) => !prev);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger exit animation
      setVisible(false);

      // After fade-out, change role and fade-in
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setVisible(true);
      }, 400); // Slightly longer to match new animation duration
    }, 3000); // Increased interval for better readability

    return () => clearInterval(interval);
  }, []);

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

  const NavMenu = ({ isMobile, drawerOpen, setDrawerOpen, navLinks }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  // Customize this logic as needed
  const mainLinks = navLinks.slice(0, 3); // Show 3 main bubbles
  const moreLinks = navLinks.slice(3);    // Rest inside menu

  return (
    <>
      {isMobile ? (
        <>
          {/* 📱 Mobile Menu Button */}
        <Button
          onClick={() => setDrawerOpen(!drawerOpen)}
          sx={{
            fontFamily: '"Poppins", sans-serif',
            fontSize: '1.2rem',
            color: '#4db8ff',
            fontWeight: 600,
            border: '1px solid #4db8ff',
            px: 2,
            py: 1,
            borderRadius: '8px',
            backgroundColor: 'transparent',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(77,184,255,0.1)'
            }
          }}
        >
          {drawerOpen ? '×' : '☰'}
        </Button>


          {/* 📜 Mobile Drawer */}
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
              sx: {
                backgroundColor: '#121212',
                color: '#fff',
                width: 260
              }
            }}
          >
            <List>
              {navLinks.map((link, i) => (
                <ListItem
                  button
                  key={i}
                  onClick={() => {
                    scrollToSection(link.path.replace('/', ''));
                    setDrawerOpen(false);
                  }}
                >
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{
                      sx: {
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 500,
                        fontSize: '1rem',
                        color: '#4db8ff'
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </>
      ) : (
        // 🖥️ Desktop Bubble Nav
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            right: '1.5rem',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            zIndex: 1000
          }}
        >
          {mainLinks.map((link, i) => (
            <Tooltip title={link.label} placement="left" arrow key={i}>
              <Button
                onClick={() => scrollToSection(link.path.replace('/', ''))}
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  minWidth: 0,
                  backgroundColor: '#1e1e1e',
                  color: '#4db8ff',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  boxShadow: '0 4px 12px rgba(77,184,255,0.4)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    backgroundColor: '#4db8ff',
                    color: '#121212',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                {link.label[0]}
              </Button>
            </Tooltip>
          ))}

          {/* ➕ More Button */}
          {moreLinks.length > 0 && (
            <>
              <Tooltip title="More" placement="left" arrow>
                <Button
                  onClick={handleOpenMenu}
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    minWidth: 0,
                    backgroundColor: '#1e1e1e',
                    color: '#4db8ff',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 12px rgba(77,184,255,0.4)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      backgroundColor: '#4db8ff',
                      color: '#121212',
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  More
                </Button>
              </Tooltip>

              {/* More Menu */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                PaperProps={{
                  style: {
                    backgroundColor: '#121212',
                    border: '1px solid #4db8ff',
                    borderRadius: 10,
                    boxShadow: '0 6px 18px rgba(0,0,0,0.5)'
                  }
                }}
              >
                {moreLinks.map((link, i) => (
                  <MenuItem
                    key={i}
                    onClick={() => {
                      scrollToSection(link.path.replace('/', ''));
                      handleCloseMenu();
                    }}
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
            </>
          )}
        </Box>
      )}
    </>
  );
};
  
  const Section = ({ title, children, bg = 'transparent' }) => (
    <Box
      sx={{
        bgcolor: bg,
        py: 10,
        width: '100vw',
        minHeight: '100vh',
        fontFamily: '"Poppins", sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ maxWidth: '1600px', mx: 'auto', px: 4 }}>
        <Typography
          variant="h4"
          color="#4db8ff"
          align="center"
          gutterBottom
          sx={{ 
            fontWeight: 700,
            textShadow: '0 2px 10px rgba(77, 184, 255, 0.3)',
            marginBottom: '48px',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          {title}
        </Typography>
        {children}
      </Box>
    </Box>
  );
  

  return (
    <Router>
      <Box
        sx={{
          fontFamily: '"Poppins", sans-serif',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100vw',
          overflowX: 'hidden'
        }}
      >
      <Appbar
  handleClick={handleClick}
  showText={showText}
  drawerOpen={drawerOpen}
  setDrawerOpen={setDrawerOpen}
/>


      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            width: "100%",
            height: "100%",
            pt: 17,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)'
          }
        }}
      >
        
        <List>
          {navLinks.map((link, i) => (
            <ListItem
              key={i}
              button
              component={Link}
              to={link.path}
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  sx: {
                    color: '#4db8ff',
                    marginTop: "15px",
                    fontWeight: 500,
                    fontSize: '1.2rem',
                    textAlign: 'center',
                    animation: `${fallIn} 0.6s ease-out`
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

 <h1 style={{ display: 'none' }}>
        Jerophin D R – Full-Stack Developer & UI/UX Designer Portfolio
      </h1>

        <Routes>
        <Route
  path="/"
  element={
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* ✅ Custom Animated Background */}
      <AnimatedBackground />

      {/* 🎯 Main Foreground Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 3,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '60px',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: { xs: 2, sm: 6, md: 8 },
          py: { xs: 0, sm: 0, md: 0 },
          pointerEvents: 'none',
          transform: 'translateY(-30px)'
        }}
      >
        <Box sx={{ pointerEvents: 'auto' }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', sm: '2.8rem', md: '3.2rem' },
            color: '#4db8ff',
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-0.5px',
            textShadow: '0 2px 10px rgba(77, 184, 255, 0.3)'
          }}
        >
          Hi, I'm Jerophin <br />
        </Typography>
        <Box sx={{ height: '4.5rem', overflow: 'hidden', mb: 3, position: 'relative' }}>
  <AnimatePresence mode="wait">
    {visible && (
      <motion.div
        key={roles[currentRole]}
        initial={{ 
          opacity: 0, 
          y: 30,
          scale: 0.95,
          rotateX: 15
        }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: 1,
          rotateX: 0
        }}
        exit={{ 
          opacity: 0, 
          y: -30,
          scale: 1.05,
          rotateX: -15
        }}
        transition={{ 
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 100,
          damping: 15
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
            fontSize: { xs: '2rem', sm: '2.8rem', md: '3.2rem' },
            color: '#4db8ff',
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-0.5px',
            textShadow: '0 4px 20px rgba(77, 184, 255, 0.4)',
            background: 'linear-gradient(135deg, #4db8ff 0%, #66c4ff 50%, #4db8ff 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 8px rgba(77, 184, 255, 0.3))'
          }}
        >
          A {roles[currentRole]}
        </Typography>
      </motion.div>
    )}
  </AnimatePresence>
</Box>


          <Typography
            variant="h6"
            sx={{
              color: '#bbbbbb',
              fontSize: { xs: '1rem', sm: '1.2rem' },
              maxWidth: '700px',
              mx: 'auto',
              mb: 5,
              lineHeight: 1.8
            }}
          >
            I craft high-impact digital products with pixel-perfect UI and scalable backend systems. Let’s build something amazing together!
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Button
              variant="contained"
              component={Link}
              to="/about"
              sx={{
                px: { xs: 3, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                fontFamily: '"Poppins", sans-serif',
                fontSize: { xs: '0.85rem', sm: '1rem' },
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(77, 184, 255, 0.2) 0%, rgba(77, 184, 255, 0.12) 50%, rgba(77, 184, 255, 0.18) 100%)',
                backdropFilter: 'blur(30px) saturate(150%)',
                WebkitBackdropFilter: 'blur(30px) saturate(150%)',
                border: '1px solid rgba(77, 184, 255, 0.25)',
                color: '#4db8ff',
                textTransform: 'uppercase',
                fontWeight: 600,
                minWidth: 180,
                boxShadow: '0 8px 25px rgba(77, 184, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.1)',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(77, 184, 255, 0.3) 0%, rgba(77, 184, 255, 0.2) 50%, rgba(77, 184, 255, 0.25) 100%)',
                  transform: 'translateY(-3px) scale(1.02)',
                  boxShadow: '0 15px 40px rgba(77, 184, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(255, 255, 255, 0.15)'
                }
              }}
            >
              Explore More
            </Button>

            <Button
              variant="outlined"
              component={Link}
              to="/projects"
              sx={{
                px: { xs: 3, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                fontFamily: '"Poppins", sans-serif',
                fontSize: { xs: '0.85rem', sm: '1rem' },
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.06) 100%)',
                backdropFilter: 'blur(30px) saturate(150%)',
                WebkitBackdropFilter: 'blur(30px) saturate(150%)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 600,
                minWidth: 180,
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.1)',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.12) 100%)',
                  borderColor: 'rgba(77, 184, 255, 0.3)',
                  color: '#4db8ff',
                  transform: 'translateY(-3px) scale(1.02)',
                  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(255, 255, 255, 0.15)'
                }
              }}
            >
              See Projects
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  }
/>

<Route
  path="/about"
  element={
    <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Custom Animated Background */}
      <AnimatedBackground />
      {/* Foreground Section Content */}
      <Section  bg="transparent">
        <Box
          sx={{
            fontFamily: '"Poppins", sans-serif',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '800px',
            marginTop: '60px',
            py: { xs: 6, sm: 10 },
            px: { xs: 2, sm: 4 },
            mx: 'auto',
            borderRadius: '28px',
            zIndex: 1,
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.1) 100%)',
            backdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.3), 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(255, 255, 255, 0.05), inset 1px 0 0 rgba(255, 255, 255, 0.1), inset -1px 0 0 rgba(255, 255, 255, 0.1)',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            overflow: 'hidden',
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
              transform: 'translateY(-8px) scale(1.02)',
              boxShadow: '0 15px 50px rgba(0, 0, 0, 0.15), 0 2px 0 rgba(255, 255, 255, 0.4), 0 -2px 0 rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 1px 0 0 rgba(255, 255, 255, 0.15), inset -1px 0 0 rgba(255, 255, 255, 0.15)'
            }
          }}
        >
          <Avatar
            src={profileImage}
            alt="Jerophin D R"
            sx={{
              width: 160,
              height: 160,
              mb: 4,
              border: '2px solid rgba(77, 184, 255, 0.2)',
              background: 'linear-gradient(135deg, rgba(77, 184, 255, 0.15) 0%, rgba(77, 184, 255, 0.08) 50%, rgba(77, 184, 255, 0.12) 100%)',
              backdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
              boxShadow: '0 12px 40px rgba(77, 184, 255, 0.2), 0 1px 0 rgba(255, 255, 255, 0.3), 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.05), inset 1px 0 0 rgba(255, 255, 255, 0.1), inset -1px 0 0 rgba(255, 255, 255, 0.1)',
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
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
                zIndex: 1
              },
              '&:hover': {
                transform: 'scale(1.05)',
                background: 'linear-gradient(135deg, rgba(77, 184, 255, 0.2) 0%, rgba(77, 184, 255, 0.12) 50%, rgba(77, 184, 255, 0.18) 100%)',
                boxShadow: '0 16px 50px rgba(77, 184, 255, 0.3), 0 2px 0 rgba(255, 255, 255, 0.4), 0 -2px 0 rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 1px 0 0 rgba(255, 255, 255, 0.15), inset -1px 0 0 rgba(255, 255, 255, 0.15)'
              }
            }}
          />

          <Typography
            variant="h5"
            sx={{
              color: '#4db8ff',
              fontWeight: 700,
              mb: 2,
              letterSpacing: '0.5px'
            }}
          >
            Hi, I'm Jerophin — Developer, Designer, and Dreamer.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#dddddd',
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.9,
              mb: 3
            }}
          >
            I'm a dedicated <strong style={{ color: '#4db8ff' }}>Full Stack Developer</strong> and{' '}
            <strong style={{ color: '#4db8ff' }}>UI/UX Designer</strong> with a focus on building scalable,
            responsive web applications. I specialize in modern frameworks like React and FastAPI, and I turn
            high-fidelity designs from tools like Figma into clean, accessible user interfaces.
            My work blends engineering precision with intuitive design thinking.
          </Typography>


         <Typography
          variant="body1"
          sx={{
            color: '#dddddd',
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.9
          }}
        >
          Proficient in <span style={{ color: '#4db8ff' }}>React.js, Vite, Next.js, FastAPI, Express.js, Angular, Vue, Python, Java, SQL, JavaScript</span> and many more, I apply
          strong backend and frontend skills to bridge the gap between design and engineering. I actively
          participate in hackathons, enjoy building practical, real-world solutions, and am open to
          relocation for the right opportunity in software development or product engineering.
        </Typography>
           <Button
              variant="contained"
              component={Link}
              to="https://drive.google.com/file/d/1BoebZhCMfeiN5B37gbJ9pbEjr8PT1gR_/view?usp=sharing"
              sx={{
                px: { xs: 3, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                fontFamily: '"Poppins", sans-serif',
                marginTop: "20px",
                fontSize: { xs: '0.85rem', sm: '1rem' },
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(77, 184, 255, 0.2) 0%, rgba(77, 184, 255, 0.12) 50%, rgba(77, 184, 255, 0.18) 100%)',
                backdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
                border: '1px solid rgba(77, 184, 255, 0.25)',
                color: '#4db8ff',
                textTransform: 'uppercase',
                fontWeight: 600,
                minWidth: 180,
                boxShadow: '0 8px 25px rgba(77, 184, 255, 0.2), 0 1px 0 rgba(255, 255, 255, 0.3), 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.05), inset 1px 0 0 rgba(255, 255, 255, 0.1), inset -1px 0 0 rgba(255, 255, 255, 0.1)',
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
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
                  zIndex: 1
                },
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(77, 184, 255, 0.3) 0%, rgba(77, 184, 255, 0.2) 50%, rgba(77, 184, 255, 0.25) 100%)',
                  transform: 'translateY(-3px) scale(1.02)',
                  boxShadow: '0 15px 40px rgba(77, 184, 255, 0.3), 0 2px 0 rgba(255, 255, 255, 0.4), 0 -2px 0 rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 1px 0 0 rgba(255, 255, 255, 0.15), inset -1px 0 0 rgba(255, 255, 255, 0.15)'
                }
              }}
            >
              Download Resume
            </Button>
          {/* Education Section */}
<Box
  sx={{
    mt: 6,
    width: '90%',
    textAlign: 'left',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.1) 100%)',
    backdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
    WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
    borderRadius: '28px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    p: { xs: 3, sm: 4 },
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.3), 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(255, 255, 255, 0.05), inset 1px 0 0 rgba(255, 255, 255, 0.1), inset -1px 0 0 rgba(255, 255, 255, 0.1)',
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
      background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
      zIndex: 1
    },
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: '0 15px 50px rgba(0, 0, 0, 0.15), 0 2px 0 rgba(255, 255, 255, 0.4), 0 -2px 0 rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 1px 0 0 rgba(255, 255, 255, 0.15), inset -1px 0 0 rgba(255, 255, 255, 0.15)'
    }
  }}
>
 <Typography
  variant="h6"
  sx={{
    color: '#4db8ff',
    fontWeight: 600,
    mb: 3,
    fontSize: { xs: '1.7rem', sm: '1.7rem' },
    textAlign: { xs: 'center', sm: 'left' } // 👈 Center on mobile, left on desktop
  }}
>
  Education
</Typography>


  {[
    {
      title: 'Bachelor of Engineering in Computer Science',
      score: 'CGPA: 8.4',
      institute: 'St. Joseph’s Institute of Technology, OMR, Chennai',
      date: 'Expected Graduation: May 2026',
      logo: '/engglogo.png',
      link: 'https://stjosephstechnology.ac.in/'
    },
    {
      title: 'Higher Secondary Certificate (HSC)',
      score: '77.5%',
      institute: 'Holy Family Convent Matriculation Hr. Sec. School, Keelkattalai, Chennai',
      date: 'Graduation: May 2022',
      logo: '/hsclogo.webp',
      link: 'https://holyfamilyschool.edu.in/'
    },
    {
      title: 'Secondary School Leaving Certificate (SSLC)',
      score: '71.6%',
      institute: 'Holy Family Convent Matriculation Hr. Sec. School, Keelkattalai, Chennai',
      date: 'Graduation: March 2020',
      logo: '/sslc-logo.webp',
      link: 'https://holyfamilyschool.edu.in/'
    }
  ].map(({ title, score, institute, date, logo, link }) => (
    <Box
      key={title}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'center', md: 'flex-start' },
        gap: 2,
        mb: 4,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.1) 100%)',
        backdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        borderRadius: '20px',
        p: 3,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.3), 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(255, 255, 255, 0.05), inset 1px 0 0 rgba(255, 255, 255, 0.1), inset -1px 0 0 rgba(255, 255, 255, 0.1)',
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
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
          zIndex: 1
        },
        '&:hover': {
          transform: 'translateY(-5px) scale(1.02)',
          boxShadow: '0 15px 50px rgba(0, 0, 0, 0.15), 0 2px 0 rgba(255, 255, 255, 0.4), 0 -2px 0 rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 1px 0 0 rgba(255, 255, 255, 0.15), inset -1px 0 0 rgba(255, 255, 255, 0.15)',
          borderColor: 'rgba(77, 184, 255, 0.25)'
        }
      }}
    >
      {/* 🎓 Logo */}
      <Box
        component="a"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          width: { xs: '100px', md: '100px' },
          flexShrink: 0,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.08) 100%)',
          backdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '12px',
          p: 1,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), 0 1px 0 rgba(255, 255, 255, 0.3), 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.05), inset 1px 0 0 rgba(255, 255, 255, 0.1), inset -1px 0 0 rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          position: 'relative',
          overflow: 'hidden',
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
            transform: 'scale(1.05)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), 0 2px 0 rgba(255, 255, 255, 0.4), 0 -2px 0 rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 1px 0 0 rgba(255, 255, 255, 0.15), inset -1px 0 0 rgba(255, 255, 255, 0.15)',
            borderColor: 'rgba(77, 184, 255, 0.3)'
          }
        }}
      >
        <Box
          component="img"
          src={logo}
          alt={`${title} Logo`}
          sx={{ 
            width: '100%', 
            height: 'auto', 
            borderRadius: '8px',
            filter: 'brightness(1.1) contrast(1.05)'
          }}
        />
      </Box>

      {/* 📚 Education Info */}
      <Box>
        <Typography sx={{ color: '#ffffff', fontWeight: 500 }}>
          {title} <span style={{ color: '#4db8ff' }}>({score})</span>
        </Typography>
        <Typography sx={{ color: '#bbbbbb', fontSize: '0.95rem' }}>
          {institute}
        </Typography>
        <Typography sx={{ color: '#888888', fontSize: '0.85rem', mt: 0.5 }}>
          {date.includes(':') ? (
            <>
              {date.split(':')[0]}:{' '}
              <span style={{ color: '#4db8ff' }}>{date.split(':')[1]}</span>
            </>
          ) : (
            date
          )}
        </Typography>
      </Box>
    </Box>
  ))}
</Box>

        </Box>
      </Section>
    </Box>
  }
/>


<Route
  path="/skills"
  element={
    <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
      
      {/* Custom Animated Background */}
      <AnimatedBackground />


      {/* 🔲 Optional Overlay (can be adjusted or removed) */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2))',
          zIndex: 1
        }}
      />

      {/* 🔤 Foreground Section Content */}
      <Box sx={{ position: 'relative', zIndex: 2 ,marginTop: '60px'}}>
        <Section title="Skills" bg="transparent">
          <Grid
            container
            spacing={4}
            justifyContent="center"
            sx={{
              mt: 4,
              px: { xs: 2, sm: 4, md: 6 }
            }}
          >
            {[
               ['<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g fill-rule="evenodd"><path fill="#ff8748" d="M87.011 403.744H28.24a7 7 0 0 1-7-7v-96.32h14v89.32h51.771z" opacity="1" data-original="#ff8748" class=""></path><path fill="#4eb1fc" d="M39.971 288.692c6.479 6.479 6.479 16.984 0 23.463s-16.984 6.479-23.463 0-6.479-16.984 0-23.463 16.984-6.479 23.463 0z" opacity="1" data-original="#4eb1fc"></path><path fill="#ff8748" d="M295.521 389.744h58.771a7 7 0 0 1 7 7v66.999h-14v-59.999h-51.771z" opacity="1" data-original="#ff8748" class=""></path><path fill="#4eb1fc" d="M366.023 452.012c6.479 6.479 6.479 16.984 0 23.463s-16.984 6.479-23.463 0-6.479-16.984 0-23.463 16.984-6.479 23.463 0z" opacity="1" data-original="#4eb1fc"></path><path fill="#85caff" d="M349.867 479.735a16.517 16.517 0 0 1-7.307-4.26c-6.479-6.479-6.479-16.984 0-23.463a16.502 16.502 0 0 1 7.307-4.26 16.517 16.517 0 0 1 7.307 4.26c6.479 6.479 6.479 16.984 0 23.463a16.507 16.507 0 0 1-7.307 4.26z" opacity="1" data-original="#85caff"></path><path fill="#ff8748" d="M177.117 54.207h29.925v14h-29.925zm103.347 75.465-36.027-36.027h-67.32v-14h70.218c1.862 0 3.632.734 4.949 2.051l38.078 38.078zm-103.347 26.287h29.925v14h-29.925zm0-25.438h29.925v14h-29.925zm0-25.438v14h29.925v-14zM116.013 40.925V11h14v29.925zm27.335 0V11h14v29.925zm-54.67 0V11h14v29.925zm-27.335 0V11h14v29.925zM11.649 54.207h29.925v14H11.649zm0 101.752h29.925v14H11.649zm0-25.438h29.925v14H11.649zm0-25.438h29.925v14H11.649zm0-25.438h29.925v14H11.649zM184.266 292.49v-25.891l-64.725-37.369a6.994 6.994 0 0 1-3.527-6.043v-39.944h14v35.938l64.162 37.044a7 7 0 0 1 4.091 6.368v29.898h-14zm-71.669 35.484 9.898-9.898-47.152-47.152v-87.682h-14v90.58c0 1.791.684 3.582 2.051 4.949zm30.751-114.807h14v-29.925h-14zm-54.67 0v-29.925h14v29.925z" opacity="1" data-original="#ff8748" class=""></path><path fill="#909cd1" d="m429.851 122.312 14.686-9.848a5.922 5.922 0 0 1 7.544.736l22.73 22.729a5.922 5.922 0 0 1 .737 7.545l-9.849 14.686 12.492 30.152 17.346 3.42a5.922 5.922 0 0 1 4.815 5.856v32.144a5.922 5.922 0 0 1-4.814 5.856l-17.346 3.42L465.7 269.16l9.849 14.686a5.922 5.922 0 0 1-.737 7.545l-22.729 22.729a5.924 5.924 0 0 1-7.545.737l-14.686-9.849L399.7 317.5l-3.42 17.347a5.922 5.922 0 0 1-5.856 4.814H358.28a5.922 5.922 0 0 1-5.856-4.814l-3.42-17.347-30.151-12.491-14.687 9.849a5.922 5.922 0 0 1-7.544-.737l-22.729-22.729a5.922 5.922 0 0 1-.737-7.545l9.849-14.686-12.492-30.152-17.346-3.42a5.922 5.922 0 0 1-4.814-5.856v-32.144a5.921 5.921 0 0 1 4.814-5.856l17.346-3.42 12.492-30.152-9.849-14.686a5.923 5.923 0 0 1 .737-7.545l22.73-22.729a5.922 5.922 0 0 1 7.544-.736l14.686 9.848 30.152-12.492 3.42-17.346a5.922 5.922 0 0 1 5.856-4.814h32.144a5.922 5.922 0 0 1 5.856 4.814l3.42 17.346 30.152 12.492z" opacity="1" data-original="#909cd1"></path><path fill="#bdc7f2" d="m429.851 122.312 10.657-7.147 24.235 24.233-12.582 18.762 12.492 30.152 22.16 4.369v41.958l-22.16 4.369-12.492 30.152 12.582 18.761-24.234 24.233-21.628-14.503-31.369 12.996-5.72 29.011h-23.513a5.923 5.923 0 0 1-5.856-4.814l-3.42-17.347-41.374-17.14-14.827 9.943-18.911-18.911a5.922 5.922 0 0 1-.737-7.545l9.849-14.686-12.492-30.152-17.346-3.42a5.923 5.923 0 0 1-4.814-5.856v-32.144a5.922 5.922 0 0 1 4.814-5.856l17.346-3.42 12.492-30.152-9.849-14.686a5.922 5.922 0 0 1 .737-7.545l18.911-18.911 14.827 9.943 11.222-4.649 30.152-12.492 3.42-17.345a5.923 5.923 0 0 1 5.856-4.815h23.513l5.72 29.012 31.369 12.996 10.97-7.356z" opacity="1" data-original="#bdc7f2" class=""></path></g><circle cx="365.514" cy="213.66" r="75.5" fill="#909cd1" transform="rotate(-45 365.503 213.743)" opacity="1" data-original="#909cd1"></circle><circle cx="374.351" cy="213.66" r="75.5" fill="#ffffff" transform="rotate(-45 374.34 213.745)" opacity="1" data-original="#ffffff" class=""></circle><path fill="#fdc72e" fill-rule="evenodd" d="M367.034 161.016h30.834l-18.473 31.996h34.674l-66.389 73.292 17.54-49.368h-30.587z" opacity="1" data-original="#fdc72e"></path><path fill="#fcdb35" fill-rule="evenodd" d="M367.034 161.016h20.334l-18.473 31.996h34.674l-49.113 54.219 10.764-30.295h-30.587z" opacity="1" data-original="#fcdb35"></path><path fill="#1176e8" fill-rule="evenodd" d="m237.188 321.161 12.151-8.149a4.902 4.902 0 0 1 6.243.609l18.807 18.807a4.9 4.9 0 0 1 .609 6.243l-8.149 12.152 10.336 24.949 14.352 2.83a4.9 4.9 0 0 1 3.984 4.845v26.597a4.9 4.9 0 0 1-3.983 4.845l-14.353 2.83-10.336 24.949 8.149 12.152a4.901 4.901 0 0 1-.609 6.243l-18.807 18.806a4.901 4.901 0 0 1-6.243.61l-12.152-8.149-24.948 10.336-2.83 14.353a4.9 4.9 0 0 1-4.845 3.983h-26.597a4.901 4.901 0 0 1-4.846-3.983l-2.83-14.353-24.948-10.336-12.152 8.149a4.901 4.901 0 0 1-6.243-.61l-18.806-18.806a4.901 4.901 0 0 1-.61-6.243l8.149-12.152-10.336-24.949-14.352-2.83a4.9 4.9 0 0 1-3.983-4.845v-26.597a4.9 4.9 0 0 1 3.984-4.845l14.352-2.83 10.336-24.949-8.149-12.152a4.9 4.9 0 0 1 .61-6.243l18.807-18.807a4.9 4.9 0 0 1 6.242-.609l12.152 8.149 24.949-10.336 2.83-14.352a4.9 4.9 0 0 1 4.845-3.983h26.597a4.9 4.9 0 0 1 4.845 3.983l2.83 14.352 24.949 10.336z" opacity="1" data-original="#1176e8"></path><path fill="#4eb1fc" fill-rule="evenodd" d="m237.188 321.161 8.818-5.913 20.052 20.051-10.41 15.524 10.336 24.948 18.336 3.615v34.718l-18.336 3.615-10.336 24.948 10.41 15.524-20.052 20.051-17.895-12-25.955 10.753L197.423 501h-19.456a4.9 4.9 0 0 1-4.845-3.983l-2.829-14.353-34.234-14.182-12.268 8.227-15.648-15.647a4.901 4.901 0 0 1-.61-6.243l8.149-12.152-10.336-24.948-14.353-2.829a4.9 4.9 0 0 1-3.983-4.846v-26.597a4.9 4.9 0 0 1 3.983-4.845l14.353-2.83 10.336-24.948-8.149-12.151a4.901 4.901 0 0 1 .61-6.243l15.648-15.647 12.268 8.227 9.285-3.847 24.949-10.336 2.829-14.352a4.9 4.9 0 0 1 4.845-3.983h19.456l4.733 24.005 25.955 10.753 9.077-6.087z" opacity="1" data-original="#4eb1fc"></path><circle cx="183.954" cy="396.744" r="53.415" fill="#1176e8" opacity="1" data-original="#1176e8"></circle><circle cx="191.266" cy="396.744" r="53.415" fill="#ffffff" transform="rotate(-80.85 191.238 396.818)" opacity="1" data-original="#ffffff" class=""></circle><path fill="#909cd1" fill-rule="evenodd" d="m192.503 405.404-33.733 33.732a53.744 53.744 0 0 1-9.898-9.898l33.733-33.732z" opacity="1" data-original="#909cd1"></path><path fill="#f2671f" fill-rule="evenodd" d="M204.283 383.727c7.189 7.189 7.189 18.844 0 26.033s-18.844 7.189-26.033 0-7.189-18.844 0-26.033 18.844-7.189 26.033 0z" opacity="1" data-original="#f2671f"></path><path fill="#ff8748" fill-rule="evenodd" d="M186.675 414.572a18.32 18.32 0 0 1-8.425-4.812c-7.189-7.189-7.189-18.844 0-26.033a18.319 18.319 0 0 1 8.425-4.811 18.314 18.314 0 0 1 8.425 4.811c7.189 7.189 7.189 18.844 0 26.033a18.32 18.32 0 0 1-8.425 4.812z" opacity="1" data-original="#ff8748" class=""></path><path fill="#85caff" fill-rule="evenodd" d="M23.815 316.416a16.517 16.517 0 0 1-7.307-4.26c-6.479-6.479-6.479-16.984 0-23.463a16.502 16.502 0 0 1 7.307-4.26 16.517 16.517 0 0 1 7.307 4.26c6.479 6.479 6.479 16.984 0 23.463a16.507 16.507 0 0 1-7.307 4.26z" opacity="1" data-original="#85caff"></path><rect width="138.178" height="145.083" x="40.257" y="39.542" fill="#fdc72e" rx="14.154" opacity="1" data-original="#fdc72e"></rect><rect width="127.378" height="145.083" x="40.257" y="39.542" fill="#fcdb35" rx="14.154" opacity="1" data-original="#fcdb35"></rect><path fill="#ffffff" d="M73.972 73.322h70.748v77.522H73.972z" opacity="1" data-original="#ffffff" class=""></path><path fill="#fdc72e" d="M65.915 73.322h8.057v77.522h-8.057z" opacity="1" data-original="#fdc72e"></path></g></svg>',
                'Platforms & Operating Systems', 
                'Windows, Linux (Ubuntu, XFCE)\n' + 
                'Cross-platform environments, Portfolio hosting'
                ],

                ['<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 60 60" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#97aab2" d="M44 55v1H16v-1s6-1 6-7v-1h16v1c0 6 6 7 6 7z" opacity="1" data-original="#97aab2"></path><rect width="32" height="4" x="14" y="55" fill="#b3c1c9" rx="2" opacity="1" data-original="#b3c1c9" class=""></rect><path fill="#b3c1c9" d="M59 41v4c0 1.66-1.34 3-3 3H4c-1.66 0-3-1.34-3-3v-4l1-2h56z" opacity="1" data-original="#b3c1c9" class=""></path><path fill="#18316d" d="M59 4v37H1V4c0-1.66 1.34-3 3-3h52c1.66 0 3 1.34 3 3z" opacity="1" data-original="#18316d" class=""></path><g fill="#fff"><path d="M24 17a.997.997 0 0 1-.707-.293l-5-5a.999.999 0 0 1 0-1.414l5-5a.999.999 0 1 1 1.414 1.414L20.414 11l4.293 4.293A.999.999 0 0 1 24 17zM36 17a.999.999 0 0 1-.707-1.707L39.586 11l-4.293-4.293a.999.999 0 1 1 1.414-1.414l5 5a.999.999 0 0 1 0 1.414l-5 5A.997.997 0 0 1 36 17zM28 18a1 1 0 0 1-.948-1.317l4-12a1 1 0 1 1 1.897.633l-4 12a1 1 0 0 1-.948.684zM8 22H7a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2z" fill="#ffffff" opacity="1" data-original="#ffffff" class=""></path></g><path fill="#4ed8d5" d="M28 22H13a1 1 0 1 1 0-2h15a1 1 0 1 1 0 2z" opacity="1" data-original="#4ed8d5"></path><path fill="#ff4d78" d="M39 22h-7a1 1 0 1 1 0-2h7a1 1 0 1 1 0 2z" opacity="1" data-original="#ff4d78"></path><path fill="#ffffff" d="M8 27H7a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2z" opacity="1" data-original="#ffffff" class=""></path><path fill="#f9dc4e" d="M31 27H16a1 1 0 1 1 0-2h15a1 1 0 1 1 0 2z" opacity="1" data-original="#f9dc4e"></path><path fill="#4ed8d5" d="M44 27h-9a1 1 0 1 1 0-2h9a1 1 0 1 1 0 2z" opacity="1" data-original="#4ed8d5"></path><path fill="#ffffff" d="M8 32H7a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2z" opacity="1" data-original="#ffffff" class=""></path><path fill="#4ed8d5" d="M28 32H13a1 1 0 1 1 0-2h15a1 1 0 1 1 0 2z" opacity="1" data-original="#4ed8d5"></path><path fill="#ff4d78" d="M39 32h-7a1 1 0 1 1 0-2h7a1 1 0 1 1 0 2z" opacity="1" data-original="#ff4d78"></path><path fill="#ffffff" d="M8 37H7a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2z" opacity="1" data-original="#ffffff" class=""></path><path fill="#ff4d78" d="M53 27h-5a1 1 0 1 1 0-2h5a1 1 0 1 1 0 2z" opacity="1" data-original="#ff4d78"></path><path fill="#f9dc4e" d="M31 37H16a1 1 0 1 1 0-2h15a1 1 0 1 1 0 2z" opacity="1" data-original="#f9dc4e"></path><path fill="#4ed8d5" d="M44 37h-9a1 1 0 1 1 0-2h9a1 1 0 1 1 0 2z" opacity="1" data-original="#4ed8d5"></path><path fill="#ff4d78" d="M53 37h-5a1 1 0 1 1 0-2h5a1 1 0 1 1 0 2z" opacity="1" data-original="#ff4d78"></path></g></svg>',
                  'Programming & Scripting Languages', 
                  'C, C++, Java, JavaScript (ES6+), Python\n' + 
                  'R, PHP, SQL, Bash'
                ],

                ['<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 50 50" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g fill="#e4e8f4"><path d="m6.965 6.825.01-4.5c0-.17.06-.3.16-.35.01-.01.02-.01.03-.01l.96-.57c.1-.06.24-.05.39.04l3.92 2.26c.3.17.54.59.54.94l-.01 4.5c-.01.17-.07.29-.16.35l-.98.57-.01.01c-.1.05-.24.05-.39-.04l-3.92-2.26c-.3-.18-.54-.6-.54-.94zM3.955 19.865l.01-4.51c0-.17.06-.29.16-.34.01-.01.02-.01.03-.01l.96-.57c.11-.06.24-.05.39.04l3.92 2.26c.3.17.55.59.54.94l-.01 4.5c0 .17-.06.29-.16.35l-.96.55c-.1.08-.26.09-.42-.01l-3.91-2.26c-.31-.18-.55-.6-.55-.94zM11.725 17.865l.01-4.5c0-.18.07-.3.17-.35l.01-.01.97-.57c.1-.05.24-.05.39.04l3.92 2.26c.3.18.54.6.54.94l-.01 4.5c0 .18-.06.3-.16.35l-.96.56c-.01.01-.02.02-.03.02-.1.06-.24.05-.39-.04l-3.92-2.26c-.3-.17-.54-.59-.54-.94z" fill="#e4e8f4" opacity="1" data-original="#e4e8f4"></path><path d="m48.415 26.135-.01 4.5c-.01.17-.07.29-.16.35l-1 .58c.01-.01.02-.01.02-.02-.01.01-.02.01-.04.02l-.02 5.47c0 .16-.06.27-.15.33l-.62.36c.05-.03.08-.07.11-.13-.08.13-.21.18-.39.1.12.08.18.17.19.27l-.01 1.43c0 .11-.07.22-.2.3l-10.08 5.86-7.29 3.31c-.28.15-.74.15-1.02 0l-25.94-14.98c-.15-.08-.22-.19-.22-.3l.01-.48v-.02h.01c0-.11.07-.21.2-.28l17.37-10.1c.26-.15.69-.15.97-.01-.28-.17-.51-.56-.5-.89l.05-20.08c0-.18.08-.3.19-.34l.57-.33c.09-.05.22-.04.36.03l16.26 9.39.01-2.28c0-.18.06-.3.16-.35.01-.01.02-.01.03-.01l.96-.57c.1-.05.24-.05.39.04l3.92 2.26c.3.18.54.6.54.94l-.01 3.43 3.67 2.12c.29.17.52.57.52.9l-.02 7.88.62.36c.3.17.55.59.55.94z" fill="#e4e8f4" opacity="1" data-original="#e4e8f4"></path></g><path fill="#cad0dd" d="m46.347 37.96-.009 1.438c0 .106-.07.22-.202.3l-10.081 5.857-7.288 3.305c-.282.159-.741.159-1.023 0L1.8 33.882c-.141-.08-.212-.186-.212-.3l.01-.509c0 .106.07.22.21.3l25.935 14.978c.282.159.75.159 1.023 0l17.369-10.09c.14-.08.211-.195.211-.301z" opacity="1" data-original="#cad0dd"></path><path fill="#e4e8f4" d="M46.134 37.685c.281.163.283.43.003.592L28.77 48.37c-.28.163-.74.163-1.022 0L1.807 33.394c-.282-.163-.283-.43-.003-.592l17.368-10.093c.28-.163.74-.163 1.021 0zM47.261 16.95l-.052 20.085c0 .16-.062.274-.15.327l-.627.361c.097-.053.15-.168.15-.326l.062-20.086c0-.326-.23-.723-.512-.89L20.2 1.45c-.142-.088-.274-.088-.37-.035l.625-.362c.089-.052.22-.044.362.035L46.75 16.06c.282.168.511.565.511.89z" opacity="1" data-original="#e4e8f4"></path><path fill="#e4e8f4" d="M46.146 16.402c.282.163.512.561.511.885L46.6 37.374c0 .324-.232.456-.514.293L20.151 22.694c-.287-.166-.512-.562-.51-.885l.056-20.088c.001-.323.227-.458.514-.292zm.139 20.79.057-20.087a.43.43 0 0 0-.197-.34L20.21 1.79c-.112-.065-.203-.014-.203.11l-.057 20.087c0 .13.09.278.202.343l25.935 14.974c.113.065.197.017.198-.113" opacity="1" data-original="#e4e8f4"></path><path fill="#5b5e71" d="M46.146 16.76 20.213 1.791c-.115-.062-.203-.017-.203.106l-.062 20.094c0 .124.088.274.203.344l25.934 14.97c.114.061.203.017.203-.115l.053-20.086a.437.437 0 0 0-.195-.344zm-.767 9.571-.026 8.918-24.461-14.122.053-17.827 24.46 14.122z" opacity="1" data-original="#5b5e71"></path><path fill="#748bfd" d="m20.945 3.3-.053 17.827 24.46 14.122.053-17.827z" opacity="1" data-original="#748bfd"></path><path fill="#5b5e71" d="M21.316 24.228c.113.066.109.17 0 .232l-.54.312a.43.43 0 0 1-.4 0l-1.16-.673c-.114-.067-.114-.167-.001-.232l.54-.313a.44.44 0 0 1 .4.001zM20.22 24.862c.114.066.108.17 0 .232l-1.16.672a.44.44 0 0 1-.4-.001l-1.161-.673c-.114-.066-.11-.17-.001-.232l1.16-.672a.44.44 0 0 1 .401.001zM28.36 28.313c.108.063.108.17 0 .232l-.54.312a.44.44 0 0 1-.4 0l-1.166-.677c-.108-.063-.109-.163.005-.229l.54-.312a.438.438 0 0 1 .395-.002zM26.597 27.29c.114.067.11.17.001.233l-.54.312a.43.43 0 0 1-.4 0l-1.16-.674c-.115-.066-.115-.166-.002-.232l.54-.312a.44.44 0 0 1 .4 0zM25.322 27.821c.114.066.109.17.001.232l-1.16.672a.44.44 0 0 1-.401-.001l-1.16-.673c-.114-.066-.11-.17-.001-.232l1.16-.672a.44.44 0 0 1 .4.001zM30.122 29.335c.108.063.109.17 0 .232l-.54.312a.44.44 0 0 1-.4 0l-1.166-.677c-.108-.063-.114-.166 0-.232l.54-.312a.45.45 0 0 1 .4 0zM32.128 31.768c.108.063.108.17 0 .232l-1.16.671a.45.45 0 0 1-.4 0l-1.167-.677c-.108-.063-.109-.169 0-.232l1.16-.671a.45.45 0 0 1 .4 0zM35.403 32.398c.109.063.11.17.001.232l-.54.312a.44.44 0 0 1-.4 0l-1.166-.677c-.108-.063-.114-.166 0-.232l.539-.312a.45.45 0 0 1 .4 0zM33.83 32.755c.109.063.103.167-.004.229l-1.161.672a.438.438 0 0 1-.395.002l-1.166-.676c-.114-.066-.109-.17 0-.232l1.16-.672a.44.44 0 0 1 .4.001zM19.397 26.318c.109.063.11.17.001.232l-1.16.671a.45.45 0 0 1-.401 0l-2.007-1.164c-.114-.066-.108-.17 0-.232l1.16-.671a.44.44 0 0 1 .4 0zM21.067 27.286c.109.063.11.17.001.232l-1.16.672a.45.45 0 0 1-.401 0l-1.166-.677c-.108-.063-.109-.17 0-.232l1.16-.671a.45.45 0 0 1 .4 0zM22.732 28.252c.108.063.109.17 0 .232l-1.16.671a.45.45 0 0 1-.4 0l-1.16-.673c-.115-.066-.11-.17-.002-.232l1.161-.672a.44.44 0 0 1 .4 0zM19.817 28.494c.108.063.103.166-.005.229l-1.16.671a.427.427 0 0 1-.39 0l-1.166-.677c-.109-.063-.115-.166-.007-.228l1.161-.672a.45.45 0 0 1 .4 0zM27.025 28.809c.108.062.109.17 0 .231l-1.16.672a.45.45 0 0 1-.4 0l-1.166-.677c-.109-.063-.11-.17-.001-.232l1.16-.671a.45.45 0 0 1 .401 0zM17.232 28.928c.108.063.103.166-.005.228l-1.155.669a.429.429 0 0 1-.395.002l-3.113-1.805c-.108-.063-.114-.166 0-.232l1.155-.668a.45.45 0 0 1 .4 0zM24.435 29.24c.108.062.109.169 0 .231l-1.16.672a.45.45 0 0 1-.4 0l-1.167-.677c-.108-.063-.108-.17 0-.232l1.16-.672a.45.45 0 0 1 .4.001zM21.481 29.46c.109.062.109.169.001.231l-1.16.672a.438.438 0 0 1-.396-.004l-1.166-.676c-.108-.063-.114-.167-.006-.23l1.161-.67a.45.45 0 0 1 .4 0zM28.728 29.796c.108.063.103.166-.005.229l-1.16.671a.438.438 0 0 1-.396.003l-1.166-.676c-.108-.063-.109-.17 0-.232l1.16-.672a.45.45 0 0 1 .4 0zM19.043 29.915c.114.066.108.17 0 .232l-1.16.672a.44.44 0 0 1-.4-.001l-1.161-.673c-.109-.063-.11-.17-.001-.232l1.16-.672a.45.45 0 0 1 .401.001zM26.132 30.224c.114.066.109.169 0 .231l-1.16.672a.44.44 0 0 1-.4 0l-1.161-.674c-.108-.062-.109-.17 0-.232l1.16-.671a.45.45 0 0 1 .4 0zM23.184 30.447c.108.062.109.17 0 .232l-1.16.671a.439.439 0 0 1-.395-.004l-1.166-.676c-.109-.063-.114-.166-.006-.229l1.16-.671a.45.45 0 0 1 .401 0zM16.897 30.723c.109.063.115.166.001.232l-1.3.753a.45.45 0 0 1-.401-.001l-1.16-.673c-.115-.066-.11-.17-.002-.232l1.302-.753a.43.43 0 0 1 .4 0zM20.745 30.903c.114.066.109.17.001.232l-1.16.671a.44.44 0 0 1-.401 0l-1.16-.674c-.114-.066-.11-.169-.001-.232l1.16-.671a.44.44 0 0 1 .4 0zM27.835 31.211c.113.066.108.17 0 .232l-1.16.672a.44.44 0 0 1-.4-.001l-1.161-.673c-.114-.066-.109-.17-.001-.232l1.16-.672a.44.44 0 0 1 .401.001zM24.881 31.43c.114.067.109.17.001.233l-1.16.671a.429.429 0 0 1-.396-.003l-1.16-.673c-.114-.066-.115-.167-.007-.23l1.161-.67a.44.44 0 0 1 .4 0zM22.448 31.89c.108.063.109.17 0 .232l-1.16.672a.45.45 0 0 1-.4-.001l-1.166-.676c-.109-.063-.11-.17-.001-.232l1.16-.672a.45.45 0 0 1 .401 0zM18.963 31.92c.109.064.11.164-.004.23l-1.301.753a.438.438 0 0 1-.395.002l-1.535-.89c-.108-.063-.109-.17 0-.232l1.3-.753a.44.44 0 0 1 .4.001zM29.537 32.198c.109.063.11.17.001.232l-1.16.672a.45.45 0 0 1-.401 0l-1.166-.677c-.109-.063-.109-.17 0-.232l1.16-.671a.45.45 0 0 1 .4 0zM26.584 32.418c.108.063.108.17 0 .232l-1.16.672a.438.438 0 0 1-.395-.004l-1.166-.676c-.109-.063-.114-.166-.006-.229l1.16-.672a.45.45 0 0 1 .401.001zM24.15 32.877c.11.063.11.17.002.232l-1.161.672a.45.45 0 0 1-.4 0l-1.167-.677c-.108-.063-.109-.17 0-.232l1.16-.671a.45.45 0 0 1 .4 0zM37.166 33.42c.108.063.109.17 0 .232l-.54.312a.44.44 0 0 1-.4 0l-1.166-.677c-.108-.063-.114-.166 0-.232l.54-.312a.45.45 0 0 1 .4 0zM31.24 33.186c.108.063.103.166-.005.229l-1.16.671a.439.439 0 0 1-.396.003l-1.165-.676c-.114-.067-.11-.17-.001-.232l1.16-.672a.44.44 0 0 1 .401 0zM28.281 33.403c.114.066.109.17 0 .232l-1.16.671a.43.43 0 0 1-.395-.004l-1.16-.673c-.109-.063-.115-.166-.007-.229l1.161-.671a.45.45 0 0 1 .4 0zM35.527 33.74c.114.065.11.169.001.231l-1.16.672a.44.44 0 0 1-.401 0l-1.16-.674c-.114-.066-.11-.17-.001-.232l1.16-.671a.44.44 0 0 1 .401 0zM25.848 33.862c.114.066.109.17 0 .232l-1.16.671a.44.44 0 0 1-.4 0l-1.161-.673c-.114-.066-.109-.17 0-.232l1.16-.672a.44.44 0 0 1 .4 0zM38.922 34.439c.114.066.11.17.001.232l-.54.312a.43.43 0 0 1-.4 0l-1.16-.674c-.114-.066-.115-.166-.001-.232l.54-.312a.44.44 0 0 1 .4 0zM32.937 34.17c.109.063.11.17.001.232l-1.16.672a.45.45 0 0 1-.401-.001l-1.16-.673c-.115-.066-.11-.17-.002-.232l1.161-.672a.44.44 0 0 1 .4.001zM29.984 34.39c.114.066.108.17 0 .232l-1.16.672a.429.429 0 0 1-.395-.004l-1.16-.673c-.115-.066-.115-.167-.007-.23l1.16-.67a.44.44 0 0 1 .401 0zM37.23 34.727c.109.063.109.17.001.232l-1.16.671a.45.45 0 0 1-.401 0l-1.166-.677c-.109-.062-.11-.169-.001-.231l1.16-.672a.45.45 0 0 1 .401 0zM27.55 34.85c.109.062.11.169.001.231l-1.16.672a.45.45 0 0 1-.4-.001l-1.167-.676c-.108-.063-.103-.166.005-.229l1.16-.672a.439.439 0 0 1 .396-.002zM40.685 35.46c.108.064.109.17 0 .233l-.54.312a.44.44 0 0 1-.4 0l-1.165-.677c-.109-.063-.11-.163.004-.229l.54-.312a.438.438 0 0 1 .395-.002zM34.64 35.158c.108.062.109.169 0 .231l-1.16.672a.45.45 0 0 1-.4 0l-1.167-.677c-.108-.063-.108-.17 0-.232l1.16-.671a.45.45 0 0 1 .4 0zM31.686 35.377c.109.063.11.17.001.232l-1.16.672a.439.439 0 0 1-.396-.004l-1.166-.676c-.108-.063-.114-.166-.006-.229l1.161-.671a.45.45 0 0 1 .4 0zM38.927 35.711c.114.066.109.17.001.232l-1.16.672a.44.44 0 0 1-.401-.001l-1.16-.673c-.109-.063-.11-.17-.001-.232l1.16-.672a.45.45 0 0 1 .401.001zM29.253 35.837c.109.062.103.166-.004.228l-1.161.672a.438.438 0 0 1-.395.002l-1.166-.676c-.108-.063-.109-.17 0-.232l1.16-.671a.45.45 0 0 1 .4 0zM42.447 36.483c.109.063.109.17 0 .232l-.539.312a.44.44 0 0 1-.4 0l-1.166-.677c-.109-.063-.114-.166-.001-.232l.54-.312a.45.45 0 0 1 .4 0zM36.337 36.142c.114.066.109.17 0 .232l-1.16.671a.44.44 0 0 1-.4 0l-1.16-.673c-.11-.063-.11-.17-.002-.232l1.161-.672a.45.45 0 0 1 .4 0zM33.39 36.365c.108.063.108.17 0 .232l-1.161.671a.438.438 0 0 1-.395-.003l-1.166-.676c-.108-.063-.114-.167-.006-.23l1.16-.671a.45.45 0 0 1 .401 0zM40.598 36.68c.108.063.108.17 0 .232l-1.16.671a.45.45 0 0 1-.4 0l-1.167-.677c-.108-.063-.109-.17 0-.232l1.16-.671a.45.45 0 0 1 .4 0zM27.455 36.846c.109.062.114.166 0 .231l-1.3.753a.45.45 0 0 1-.4 0l-7.923-4.595c-.108-.063-.109-.17 0-.232l1.3-.753a.44.44 0 0 1 .4.001zM38.04 37.13c.114.065.109.169 0 .231l-1.16.672a.44.44 0 0 1-.4 0l-1.167-.677c-.108-.063-.103-.166.005-.229l1.16-.671a.438.438 0 0 1 .396-.003zM35.086 37.35c.114.065.109.169.001.231l-1.16.672a.429.429 0 0 1-.396-.004l-1.16-.673c-.114-.066-.114-.166-.006-.229l1.16-.672a.44.44 0 0 1 .4.001zM32.653 37.808c.109.063.109.17.001.232l-1.16.672a.45.45 0 0 1-.401 0l-1.166-.677c-.109-.063-.11-.17-.001-.232l1.16-.672a.45.45 0 0 1 .401.001zM39.742 38.117c.109.063.11.17.001.232l-1.16.671a.45.45 0 0 1-.401 0l-1.166-.677c-.108-.063-.109-.17 0-.232l1.16-.671a.45.45 0 0 1 .4 0zM43.114 38.139c.108.063.103.166-.005.229l-1.16.671a.438.438 0 0 1-.396.003l-2.012-1.167c-.108-.063-.109-.17 0-.232l1.16-.672a.45.45 0 0 1 .4.001zM29.537 38.053c.109.063.115.166.001.232l-1.301.753a.45.45 0 0 1-.4-.001l-1.53-.887c-.113-.066-.109-.17 0-.232l1.3-.753a.43.43 0 0 1 .401.001zM36.789 38.337c.108.062.109.17 0 .231l-1.16.672a.439.439 0 0 1-.395-.004l-1.166-.676c-.108-.063-.114-.166-.006-.229l1.16-.671a.45.45 0 0 1 .401 0zM34.35 38.793c.114.066.109.17.001.231l-1.16.672a.44.44 0 0 1-.401 0l-1.16-.674c-.114-.066-.11-.169-.001-.232l1.16-.671a.44.44 0 0 1 .401 0zM41.445 39.104c.108.063.104.166-.005.229l-1.16.672a.439.439 0 0 1-.395.002l-1.166-.676c-.114-.066-.109-.17-.001-.232l1.16-.672a.44.44 0 0 1 .401.001zM31.321 39.088c.114.066.115.166.001.232l-1.301.752a.44.44 0 0 1-.4 0l-1.193-.692c-.109-.063-.11-.17-.001-.232l1.301-.753a.44.44 0 0 1 .4 0zM39.75 40.054c.108.062.108.17 0 .231l-1.16.672a.438.438 0 0 1-.396-.004l-2.407-1.396c-.114-.066-.114-.166-.006-.229l1.16-.671a.44.44 0 0 1 .401 0zM32.279 40.506c.114.066.114.167 0 .232l-.555.322a.44.44 0 0 1-.4 0l-1.194-.693c-.114-.066-.109-.17 0-.232l.555-.321a.43.43 0 0 1 .4 0zM38.081 41.019c.109.063.109.17.001.232l-1.155.668a.44.44 0 0 1-.4 0l-3.249-1.884c-.108-.063-.114-.167 0-.232l1.155-.669a.45.45 0 0 1 .4.001zM34.727 41.063c.108.062.114.166 0 .231l-1.3.753a.45.45 0 0 1-.401 0l-1.198-.695c-.109-.063-.11-.17-.001-.232l1.3-.753a.44.44 0 0 1 .401 0zM35.7 42.49c.114.067.115.167.001.232l-.556.322a.44.44 0 0 1-.4 0l-1.193-.692c-.114-.067-.11-.17-.001-.232l.556-.322a.43.43 0 0 1 .4 0zM18.13 27.516c.109.063.109.17.001.232l-1.16.671a.439.439 0 0 1-.396-.003l-2.408-1.397c-.113-.066-.114-.166-.006-.229l1.161-.671a.44.44 0 0 1 .4 0zM24.84 26.272c.109.063.104.166-.004.229l-.54.312a.429.429 0 0 1-.395.002l-1.166-.676c-.108-.062-.114-.166 0-.232l.539-.312a.45.45 0 0 1 .4 0zM23.078 25.25c.108.063.109.17 0 .232l-.54.312a.44.44 0 0 1-.4 0l-1.165-.677c-.109-.063-.115-.166-.001-.232l.54-.312a.45.45 0 0 1 .4 0zM23.625 26.837c.109.063.109.17.001.232l-1.16.671a.45.45 0 0 1-.401 0l-1.166-.676c-.109-.063-.11-.17-.001-.232l1.16-.672a.45.45 0 0 1 .401 0zM21.922 25.85c.109.062.11.169.001.231l-1.16.672a.45.45 0 0 1-.401 0l-1.166-.677c-.108-.063-.109-.17 0-.232l1.16-.671a.45.45 0 0 1 .4 0zM13.508 28.757c.109.063.115.167.001.232l-1.301.753a.45.45 0 0 1-.4 0l-1.166-.677c-.109-.063-.104-.166.004-.228l1.302-.753a.429.429 0 0 1 .395-.003zM15.206 29.742c.108.063.114.166 0 .232l-1.3.752a.45.45 0 0 1-.401 0l-1.166-.676c-.108-.063-.109-.17 0-.232l1.3-.753a.44.44 0 0 1 .4 0zM33.641 31.376c.114.066.109.17 0 .232l-.539.312a.43.43 0 0 1-.4 0l-1.16-.674c-.115-.066-.115-.166-.002-.232l.54-.312a.44.44 0 0 1 .4 0zM31.879 30.354c.114.066.109.17 0 .232l-.54.312a.43.43 0 0 1-.4 0l-1.16-.674c-.109-.063-.114-.166-.001-.232l.54-.312a.45.45 0 0 1 .4 0zM30.425 30.78c.114.066.109.17 0 .232l-1.16.672a.44.44 0 0 1-.4-.001l-1.161-.673c-.114-.066-.109-.17 0-.232l1.16-.671a.44.44 0 0 1 .4 0zM44.21 37.505c.108.063.103.166-.005.229l-.54.312a.429.429 0 0 1-.395.002l-1.166-.676c-.114-.066-.114-.166 0-.232l.54-.312a.44.44 0 0 1 .4 0zM30.95 36.82c.114.067.11.17.001.233l-1.16.671a.44.44 0 0 1-.401 0l-1.16-.673c-.114-.066-.11-.17-.001-.232l1.16-.672a.44.44 0 0 1 .401 0z" opacity="1" data-original="#5b5e71"></path><path fill="#cad0dd" d="M25.504 38.925c.199.115.2.296.003.41l-5.1 2.964a.772.772 0 0 1-.708 0l-8.816-5.083c-.195-.112-.2-.295-.002-.41l5.1-2.964a.778.778 0 0 1 .708 0z" opacity="1" data-original="#cad0dd"></path><path fill="#5b5e71" d="m44.207 39.827.002.64 1.43-.825-.001-.641zM42.529 40.796l.002.64 1.43-.825-.002-.641z" opacity="1" data-original="#5b5e71"></path><path fill="#ed435c" d="M22.86 7.48v.263l-.841-.485v-.263z" opacity="1" data-original="#ed435c"></path><path fill="#e4e8f4" d="M28.37 12.096v.262l-5.595-3.23.001-.262zM24.492 9.14l-.001.261-1.713-.99v-.26zM24.858 7.917l-.001.263-2.836-1.637V6.28z" opacity="1" data-original="#e4e8f4"></path><path fill="#efac41" d="m24.86 7.202-.001.263-2.836-1.637v-.263z" opacity="1" data-original="#efac41"></path><path fill="#ed435c" d="M32.544 14.505v.263l-3.818-2.204v-.262zM24.55 10.607v.263l-1.777-1.026.001-.263zM22.698 12.404l-.001.262-.692-.4v-.262z" opacity="1" data-original="#ed435c"></path><path fill="#3c5dd6" d="M25.813 18.504v.262l-1.418-.818v-.263z" opacity="1" data-original="#3c5dd6"></path><path fill="#ed435c" d="m23.437 16.415-.001.263-1.442-.832.001-.263z" opacity="1" data-original="#ed435c"></path><path fill="#e4e8f4" d="M24.132 17.533v.262l-2.14-1.234.001-.263z" opacity="1" data-original="#e4e8f4"></path><path fill="#efac41" d="M25.602 17.665v.263l-1.944-1.122v-.263z" opacity="1" data-original="#efac41"></path><path fill="#e4e8f4" d="M24.289 14.04v.261l-2.286-1.32v-.26zM26.085 16.51v.262l-4.086-2.358v-.263zM26.566 16.071l-.001.263L22 13.699v-.263zM25.98 14.3v.262l-2.976-1.719v-.262zM25.983 13.584v.263l-3.976-2.295v-.263z" opacity="1" data-original="#e4e8f4"></path><path fill="#3c5dd6" d="M27.445 15.863v.26l-2.925-1.688v-.26z" opacity="1" data-original="#3c5dd6"></path><path fill="#e4e8f4" d="M25.608 12.651v.263l-2.839-1.638.001-.263z" opacity="1" data-original="#e4e8f4"></path><path fill="#3c5dd6" d="M25.306 11.76v.262l-2.535-1.463.001-.263z" opacity="1" data-original="#3c5dd6"></path><path fill="#e4e8f4" d="M29.794 13.634v.263L24.81 11.02l.001-.263zM30.41 14.706l-.001.262-4.8-2.77v-.263zM32.542 15.22v.263l-2.175-1.255.001-.263zM32.546 13.79v.261l-5.29-3.053.002-.26z" opacity="1" data-original="#e4e8f4"></path><path fill="#efac41" d="M27.042 10.613v.26l-1.936-1.117.001-.26z" opacity="1" data-original="#efac41"></path><path fill="#e4e8f4" d="M32.54 15.936v.262l-1.754-1.012v-.263z" opacity="1" data-original="#e4e8f4"></path><path fill="#3c5dd6" d="M25.581 21.953v.262l-2.838-1.638v-.263z" opacity="1" data-original="#3c5dd6"></path><path fill="#e4e8f4" d="M26.726 21.897v.263l-3.98-2.298v-.263zM24.756 20.044v.262l-2.009-1.16v-.262zM27.54 20.934l-.001.261-2.836-1.637v-.261zM29.368 21.272v.263l-2.286-1.32v-.262z" opacity="1" data-original="#e4e8f4"></path><path fill="#ed435c" d="M33.383 20.724v.262L27.95 17.85v-.262z" opacity="1" data-original="#ed435c"></path><path fill="#e4e8f4" d="M26.83 19.807v.263l-1.148-.663.001-.263zM29.007 18.913v.263l-2.44-1.408.001-.263z" opacity="1" data-original="#e4e8f4"></path><path fill="#efac41" d="M40.048 24.571v.263l-2.586-1.493v-.262z" opacity="1" data-original="#efac41"></path><path fill="#e4e8f4" d="M30.768 21.364v.263l-2.958-1.708v-.262z" opacity="1" data-original="#e4e8f4"></path><path fill="#ed435c" d="m32.806 21.824-.001.263-5.145-2.97v-.263z" opacity="1" data-original="#ed435c"></path><path fill="#e4e8f4" d="M34.525 23.533v.263l-3.362-1.94v-.264z" opacity="1" data-original="#e4e8f4"></path><path fill="#efac41" d="M35.652 24.9v.263l-5.96-3.441v-.263z" opacity="1" data-original="#efac41"></path><path fill="#ed435c" d="M37.733 26.101v.263l-1.597-.922v-.262z" opacity="1" data-original="#ed435c"></path><path fill="#e4e8f4" d="M36.484 23.23v.263l-7.047-4.069v-.262zM37.122 22.882v.263l-3.524-2.035v-.262zM38.741 25.251v.263l-5.631-3.25V22zM40.042 26.718v.263l-5.186-2.993.001-.263zM40.044 26.003v.263l-1.008-.582v-.262zM40.046 25.286v.263l-3.304-1.907v-.263zM31.477 18.907v.262l-4.532-2.616.001-.262z" opacity="1" data-original="#e4e8f4"></path><path fill="#f9bb4a" d="m9.967 17.672-.01 4.501c-.004.173-.064.292-.159.349l-.993.577c.095-.056.159-.176.159-.348l.01-4.501c.004-.345-.243-.768-.542-.94l-3.916-2.261c-.151-.088-.289-.095-.39-.039l.992-.577c.102-.057.24-.05.391.038l3.916 2.261c.3.176.546.595.542.94z" opacity="1" data-original="#f9bb4a"></path><path fill="#efac41" d="M8.43 17.31c.302.174.547.594.546.94l-.013 4.501c-.001.346-.247.484-.548.31L4.5 20.8c-.301-.174-.545-.595-.544-.941l.012-4.5c.001-.347.247-.484.548-.31z" opacity="1" data-original="#efac41"></path><path fill="#ffffff" d="m5.322 17.775-.004 1.251-.253-.146.001-.514-.495-.286-.002.514-.25-.145.003-1.251.251.145-.001.493.495.286.001-.493zM6.405 18.4v.237l-.35-.202-.002 1.015-.251-.144.003-1.015-.35-.202.001-.237zM7.766 19.186v1.253l-.236-.136-.001-.752-.321.436-.114-.066-.317-.788-.002.734-.236-.136.004-1.251.205.118.407 1.015.405-.546zM8.28 19.482l-.004 1.015.547.316-.001.236-.797-.46.004-1.251z" opacity="1" data-original="#ffffff"></path><path fill="#75ca75" d="m12.973 4.633-.01 4.5c-.004.174-.064.293-.159.35l-.993.577c.095-.056.159-.176.159-.349l.01-4.5c.004-.345-.243-.768-.542-.94L7.522 2.01c-.151-.088-.289-.095-.39-.039l.992-.578c.102-.056.24-.049.391.04l3.916 2.26c.3.176.546.595.542.94z" opacity="1" data-original="#75ca75"></path><path fill="#65aa65" d="M11.437 4.27c.301.175.545.595.545.941l-.013 4.5c-.001.347-.247.485-.548.31l-3.915-2.26c-.301-.173-.545-.594-.544-.94l.012-4.5c.001-.347.247-.484.548-.31z" opacity="1" data-original="#65aa65"></path><path fill="#ffffff" d="M8.248 4.588c.128.074.24.161.343.272.1.108.188.232.255.367l-.216.106a.978.978 0 0 0-.367-.405.474.474 0 0 0-.24-.075.208.208 0 0 0-.168.096c-.04.06-.06.14-.061.241 0 .106.02.209.06.315.039.105.095.202.166.285a.862.862 0 0 0 .24.207c.148.085.268.09.368.015l.215.354a.373.373 0 0 1-.256.077.882.882 0 0 1-.348-.127 1.54 1.54 0 0 1-.403-.343 1.83 1.83 0 0 1-.283-.471 1.355 1.355 0 0 1-.099-.508c0-.165.033-.294.102-.388a.359.359 0 0 1 .284-.143.79.79 0 0 1 .408.125zM9.59 5.363c.096.055.188.117.276.196.088.078.167.16.231.243l-.104.234a1.53 1.53 0 0 0-.404-.366c-.095-.055-.163-.076-.211-.067-.045.011-.065.046-.065.101 0 .06.024.115.076.172.052.058.131.132.24.221.111.097.199.175.27.249.073.07.132.154.184.249.048.092.076.2.075.31 0 .096-.024.17-.072.22-.045.052-.117.075-.209.068s-.208-.051-.34-.127a2.129 2.129 0 0 1-.335-.244 1.708 1.708 0 0 1-.26-.293l.117-.227c.064.092.136.175.224.258.084.08.171.15.255.198.096.056.168.079.216.074.044-.006.068-.039.069-.094l-.04-.12a.646.646 0 0 0-.104-.123c-.044-.044-.1-.09-.171-.155a4.877 4.877 0 0 1-.276-.246 1.124 1.124 0 0 1-.18-.25.653.653 0 0 1-.074-.316c0-.096.02-.172.068-.222.044-.057.116-.075.209-.068a.84.84 0 0 1 .335.125zM10.92 6.13c.097.056.184.116.276.197.088.078.164.159.232.244l-.105.234a1.551 1.551 0 0 0-.403-.366c-.096-.056-.164-.077-.212-.068-.044.012-.068.044-.068.099 0 .06.027.117.08.175.051.057.13.13.239.22.111.097.2.175.271.25.072.068.132.153.183.248.048.092.076.2.076.31 0 .096-.025.17-.073.22-.044.053-.116.075-.208.068s-.208-.051-.34-.127a2.129 2.129 0 0 1-.336-.244 1.626 1.626 0 0 1-.259-.293l.117-.226c.06.09.135.174.223.257.084.08.172.15.256.198.096.056.168.079.216.074.044-.006.068-.039.068-.094l-.04-.12a.645.645 0 0 0-.103-.123c-.044-.044-.1-.09-.176-.157-.108-.09-.2-.175-.272-.244a1.154 1.154 0 0 1-.183-.253.694.694 0 0 1-.075-.315c0-.096.024-.17.073-.22.044-.057.112-.078.208-.068a.84.84 0 0 1 .336.125z" opacity="1" data-original="#ffffff"></path><path fill="#ebc5b2" d="m17.734 15.679-.01 4.5c-.004.173-.064.292-.159.349l-.993.577c.095-.056.159-.176.159-.348l.01-4.5c.004-.346-.243-.769-.542-.941l-3.916-2.261c-.152-.088-.289-.095-.391-.039l.993-.577c.102-.057.24-.05.391.039l3.916 2.26c.3.176.546.595.542.94z" opacity="1" data-original="#ebc5b2"></path><path fill="#ddaf9b" d="M16.198 15.316c.301.174.545.594.544.94l-.012 4.501c-.001.346-.247.484-.548.31l-3.915-2.26c-.301-.174-.546-.595-.545-.94l.013-4.502c.001-.346.247-.483.548-.31z" opacity="1" data-original="#ddaf9b"></path><path fill="#ffffff" d="m13.452 15.946-.002.435-1.014-.156 1.012 1.006-.001.435-1.442-1.47v-.448zM14.962 15.96l-1.01 2.708-.42-.242 1.011-2.707zM15.018 16.85l1.442 1.47-.001.448-1.446-.198.001-.435 1.009.16-1.006-1.01z" opacity="1" data-original="#ffffff"></path><path fill="#f25574" d="m48.411 26.133-.01 4.5c-.004.173-.064.293-.159.35l-.993.577c.095-.057.159-.176.159-.349l.01-4.5c.004-.346-.243-.768-.542-.94l-3.916-2.262c-.151-.088-.289-.095-.39-.038l.992-.578c.102-.056.24-.05.391.039l3.916 2.26c.3.177.546.596.542.94z" opacity="1" data-original="#f25574"></path><path fill="#ed435c" d="M46.875 25.77c.301.174.545.595.545.94l-.013 4.501c-.001.347-.247.484-.548.31l-3.915-2.26c-.301-.174-.545-.594-.544-.94l.012-4.501c.001-.346.247-.484.548-.31z" opacity="1" data-original="#ed435c"></path><path fill="#ffffff" d="M43.902 26.611a.787.787 0 0 1 .065.316c0 .108-.021.191-.066.245-.045.053-.108.077-.19.069a.677.677 0 0 1-.292-.105l-.255-.147-.002.401-.29-.168.004-1.45.546.315c.111.064.208.14.29.232.084.091.146.187.19.292zm-.298.293c.045-.017.07-.063.07-.146a.415.415 0 0 0-.07-.227.574.574 0 0 0-.2-.18l-.238-.137-.002.505.239.137c.086.05.156.066.2.048M45.335 27.191l-.004 1.451-.29-.168.001-.596-.574-.331-.002.596-.294-.17.004-1.45.294.17-.001.572.574.331.001-.572zM46.662 28.205a.788.788 0 0 1 .065.316c0 .107-.021.19-.066.244-.046.053-.108.077-.191.069a.677.677 0 0 1-.29-.104l-.257-.148v.402l-.291-.168.004-1.45.546.315c.11.064.208.14.29.231.083.092.146.187.19.293zm-.299.293c.046-.018.07-.064.07-.147a.415.415 0 0 0-.068-.227.563.563 0 0 0-.2-.179l-.24-.138v.505l.238.138c.09.052.155.066.2.048" opacity="1" data-original="#ffffff"></path><path fill="#576cfb" d="m43.086 10.506-.011 4.5c-.004.173-.063.293-.159.35l-.993.577c.095-.057.159-.176.159-.349l.01-4.5c.004-.346-.243-.768-.542-.94l-3.916-2.262c-.151-.088-.289-.095-.39-.038l.992-.578c.102-.056.24-.05.391.039l3.916 2.26c.3.177.546.596.543.941z" opacity="1" data-original="#576cfb"></path><path fill="#4562ef" d="M41.549 10.143c.301.174.546.595.545.94l-.013 4.501c-.001.347-.247.484-.548.31l-3.915-2.26c-.301-.174-.545-.594-.544-.94l.012-4.501c.001-.346.247-.484.548-.31z" opacity="1" data-original="#4562ef"></path><path fill="#ffffff" d="m39.235 9.638-.001.537-.073-.042c-.088-.05-.161-.068-.205-.034-.051.02-.073.092-.074.193l-.002.704c0 .151-.022.248-.059.294-.044.05-.11.063-.198.045a.845.845 0 0 1 .197.273c.036.097.058.219.058.37l-.002.696a.537.537 0 0 0 .276.487l.073.043-.001.529-.227-.131a1.422 1.422 0 0 1-.532-.51 1.29 1.29 0 0 1-.181-.684l.002-.788-.043-.185-.124-.122-.124-.072.001-.537.124.072.125.021.044-.125.002-.797c0-.252.06-.411.184-.474.118-.067.3-.028.534.107zM40.163 10.174c.24.139.416.307.54.513.123.206.18.432.18.684l-.002.797.043.177.124.121.124.072-.001.537-.124-.072-.124-.02-.045.133-.002.789c0 .251-.06.41-.184.473-.125.063-.3.03-.541-.11l-.22-.127.002-.528.073.042c.088.05.154.055.205.034.044-.033.074-.092.074-.2l.002-.697c0-.151.015-.252.06-.303.043-.05.102-.066.197-.045a.777.777 0 0 1-.197-.273.845.845 0 0 1-.057-.361l.002-.705c0-.1-.03-.201-.073-.277a.533.533 0 0 0-.204-.202l-.073-.042.002-.537z" opacity="1" data-original="#ffffff"></path><path fill="#e4e8f4" d="M11.925 9.931a.517.517 0 0 0 .044-.22l.006-2.123-.005 2.123c0 .088-.017.16-.045.22z" opacity="1" data-original="#e4e8f4"></path></g></svg>',
                  'Full-Stack Development', 
                'Frontend – HTML5, CSS3, Tailwind, Bootstrap, React, Vue, Angular\n' + 
                'React Native, Next.js, MUI, Vite, Web3.js, Context API, React Router, React Hook Form\n' +
                'Backend – Node.js, Express, Django, Flask, FastAPI, NestJS, Spring Boot, Apache, Tomcat, Gunicorn, Jinja'
                ],

                ['<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 60 60" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#2a2a49" d="M56 9v39a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9l1-1h50z" opacity="1" data-original="#2a2a49"></path><path fill="#444477" d="M56 6v3H4V6a5 5 0 0 1 5-5h42a5 5 0 0 1 5 5z" opacity="1" data-original="#444477"></path><path fill="#25e572" d="M25.872 47H24v10a2.006 2.006 0 0 1-2 2h-6a2.006 2.006 0 0 1-2-2V47h-1.872a2.16 2.16 0 0 1-1.57-3.609l6.872-7.68a2.087 2.087 0 0 1 3.14 0l6.872 7.68A2.16 2.16 0 0 1 25.872 47z" opacity="1" data-original="#25e572"></path><path fill="#ff4d4d" d="M34.128 47H36V37a2.006 2.006 0 0 1 2-2h6a2.006 2.006 0 0 1 2 2v10h1.871a2.16 2.16 0 0 1 1.57 3.609l-6.872 7.68a2.087 2.087 0 0 1-3.14 0l-6.872-7.68A2.16 2.16 0 0 1 34.128 47z" opacity="1" data-original="#ff4d4d"></path><g fill="#fff"><path d="M42 26h-2v-8h2a1 1 0 0 0 0-2h-6a1 1 0 0 0 0 2h2v8h-2a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2zM21.5 16a3.5 3.5 0 0 0-3.5 3.5V27a1 1 0 0 0 2 0v-4h3v4a1 1 0 0 0 2 0v-7.5a3.5 3.5 0 0 0-3.5-3.5zM20 21v-1.5a1.5 1.5 0 0 1 3 0V21zM30.5 16H28a1 1 0 0 0-1 1v10a1 1 0 0 0 2 0v-4h1.5a3.5 3.5 0 0 0 0-7zm0 5H29v-3h1.5a1.5 1.5 0 0 1 0 3z" fill="#ffffff" opacity="1" data-original="#ffffff"></path></g><path fill="#ff4d4d" d="M10 6H9a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2z" opacity="1" data-original="#ff4d4d"></path><path fill="#f7bb26" d="M15 6h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2z" opacity="1" data-original="#f7bb26"></path><path fill="#25e572" d="M20 6h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2z" opacity="1" data-original="#25e572"></path><path fill="#2a2a49" d="M46 6H30a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2z" opacity="1" data-original="#2a2a49"></path></g></svg>',
                  'API Design & Integration', 
                'RESTful API Development, JWT Authentication\n' + 
                'OpenAPI/Swagger, Versioning, Socket.IO'
                ],

                ['<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 60 60" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#60dcdd" d="M11 38a10 10 0 0 1-2.21-19.75.493.493 0 0 0 .38-.59 8.288 8.288 0 0 1-.13-2.45 7.988 7.988 0 0 1 11-6.61.5.5 0 0 0 .63-.23 14.022 14.022 0 0 1 26.29 5.19.5.5 0 0 0 .48.45 12 12 0 0 1 1.55 23.82z" opacity="1" data-original="#60dcdd"></path><path fill="#5498c8" d="M49 32v-6a3 3 0 0 0-3-3H14a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3 3 3 0 0 0-3 3v6a3 3 0 0 0 3 3 3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h32a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3 3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3 3 3 0 0 0 3-3z" opacity="1" data-original="#5498c8"></path><rect width="38" height="12" x="11" y="35" fill="#4184a9" rx="3" opacity="1" data-original="#4184a9"></rect><circle cx="17" cy="41" r="2" fill="#fde05e" opacity="1" data-original="#fde05e"></circle><circle cx="25" cy="41" r="2" fill="#60dcdd" opacity="1" data-original="#60dcdd"></circle><circle cx="17" cy="29" r="2" fill="#fde05e" opacity="1" data-original="#fde05e"></circle><circle cx="25" cy="29" r="2" fill="#60dcdd" opacity="1" data-original="#60dcdd"></circle><circle cx="17" cy="53" r="2" fill="#fde05e" opacity="1" data-original="#fde05e"></circle><circle cx="25" cy="53" r="2" fill="#60dcdd" opacity="1" data-original="#60dcdd"></circle><path fill="#ffffff" d="M25 19a1 1 0 0 1-.707-.293l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 1.414L23.414 15l2.293 2.293A1 1 0 0 1 25 19zM35 19a1 1 0 0 1-.707-1.707L36.586 15l-2.293-2.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3A1 1 0 0 1 35 19zM29 19a1 1 0 0 1-.948-1.316l2-6a1 1 0 0 1 1.9.632l-2 6A1 1 0 0 1 29 19z" opacity="1" data-original="#ffffff"></path><path fill="#255a6b" d="M35 40h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM35 44h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM40 40h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM40 44h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM45 40h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM45 44h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2z" opacity="1" data-original="#255a6b"></path><g fill="#35718a"><path d="M35 52h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM35 56h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM40 52h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM40 56h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM45 52h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM45 56h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM35 28h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM35 32h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM40 28h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM40 32h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM45 28h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM45 32h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2z" fill="#35718a" opacity="1" data-original="#35718a"></path></g></g></svg>',
                  'Cloud & DevOps', 
                'AWS, Google Cloud, Azure, Firebase, Vercel, Heroku\n'+ 
                'Cloudflare, Docker (Basic), Jenkins, CI/CD Pipelines'
                ],

                ['<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M20.757 53.941v403.6c0 29.791 105.322 53.941 235.243 53.941s235.243-24.15 235.243-53.941v-403.6H20.757z" style="" fill="#dfeaef" data-original="#dfeaef"></path><path d="M437.492 53.941v134.533c0 27.706-91.105 50.53-208.368 53.588 8.822.23 17.786.352 26.875.352 73.063 0 138.345-7.638 181.492-19.621v100.213c0 27.706-91.105 50.53-208.368 53.588 8.822.23 17.786.353 26.875.353 73.063 0 138.345-7.638 181.492-19.621v100.731c0 27.706-91.105 50.53-208.368 53.588 8.824.233 17.788.355 26.878.355 129.921 0 235.243-24.15 235.243-53.941V323.526h-.029c.007-.173.029-.345.029-.518V53.941h-53.751z" style="" fill="#bfcfd6" data-original="#bfcfd6" class=""></path><path d="M256 226.711c-129.921 0-235.243-24.15-235.243-53.941v15.704c0 29.791 105.322 53.941 235.243 53.941s235.243-24.15 235.243-53.941V172.77c0 29.791-105.322 53.941-235.243 53.941zM256 361.241c-129.921 0-235.243-24.15-235.243-53.941v15.704c0 29.791 105.322 53.941 235.243 53.941s235.243-24.15 235.243-53.941V307.3c0 29.791-105.322 53.941-235.243 53.941zM256 495.801c-129.921 0-235.243-24.15-235.243-53.941v15.704c0 29.791 105.322 53.941 235.243 53.941s235.243-24.15 235.243-53.941V441.86c0 29.791-105.322 53.941-235.243 53.941z" style="" fill="#86aebc" data-original="#86aebc" class=""></path><ellipse cx="256" cy="53.941" rx="235.24" ry="53.941" style="" fill="#9ebecc" data-original="#9ebecc"></ellipse><path d="M256 0c-9.09 0-18.054.122-26.875.352C346.387 3.411 437.493 26.234 437.493 53.94s-91.105 50.53-208.368 53.588c8.821.23 17.785.352 26.875.352 129.921 0 235.243-24.15 235.243-53.941C491.243 24.15 385.921 0 256 0z" style="" fill="#86aebc" data-original="#86aebc" class=""></path><circle cx="398.87" cy="162.29" r="22.385" style="" fill="#fc9f3d" data-original="#fc9f3d"></circle><path d="M256 183.327c-64.447 0-124.835-5.843-170.039-16.452a7.723 7.723 0 1 1 3.53-15.038c44.081 10.346 103.216 16.043 166.51 16.043 26.512 0 52.515-1.011 77.288-3.004a7.722 7.722 0 1 1 1.239 15.395c-25.184 2.028-51.605 3.056-78.528 3.056z" style="" fill="#9ebecc" data-original="#9ebecc"></path><circle cx="398.87" cy="295.05" r="22.385" style="" fill="#fc9f3d" data-original="#fc9f3d"></circle><path d="M256 316.09c-64.443 0-124.831-5.843-170.039-16.452a7.723 7.723 0 1 1 3.53-15.038c44.085 10.346 103.22 16.043 166.51 16.043 26.512 0 52.515-1.011 77.288-3.004 4.274-.356 7.975 2.828 8.317 7.078a7.722 7.722 0 0 1-7.078 8.317c-25.184 2.029-51.605 3.056-78.528 3.056z" style="" fill="#9ebecc" data-original="#9ebecc"></path><circle cx="398.87" cy="428.02" r="22.385" style="" fill="#fc9f3d" data-original="#fc9f3d"></circle><path d="M256 449.055c-64.447 0-124.835-5.843-170.039-16.452a7.723 7.723 0 0 1-5.754-9.284c.975-4.153 5.139-6.723 9.284-5.754 44.081 10.346 103.216 16.043 166.51 16.043 26.512 0 52.515-1.011 77.288-3.004 4.253-.35 7.975 2.827 8.317 7.078a7.722 7.722 0 0 1-7.078 8.317c-25.184 2.028-51.605 3.056-78.528 3.056z" style="" fill="#9ebecc" data-original="#9ebecc"></path></g></svg>',
                  'Data & Databases', 
                'MySQL, PostgreSQL, SQLite, MongoDB\n' +
                'MariaDB, Apache Hadoop, Relational Modeling, Query Optimization'
                ],

                ['<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 130 130" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g fill="#e4e8f4"><path d="M90.769 19.717c.02-.1.06-.21.06-.32l-.15 31.28c0 .77-.5 1.53-1.5 2.12-2.02 1.17-5.32 1.17-7.35 0-1.02-.59-1.53-1.36-1.53-2.14l.15-31.28c0-.77.5-1.54 1.51-2.12 2.01-1.18 5.31-1.18 7.34 0 1.16.67 1.64 1.59 1.47 2.46zM103.499 27.067c.02-.11.05-.22.05-.33l-.14 31.29c0 .76-.51 1.53-1.51 2.11-2.02 1.17-5.31 1.18-7.34.01-1.03-.59-1.54-1.37-1.54-2.15l.15-31.28c0-.77.5-1.53 1.51-2.12 2.02-1.17 5.31-1.17 7.35.01 1.16.67 1.64 1.58 1.47 2.46zM116.279 34.087l-.15 31.28c0 .77-.5 1.53-1.51 2.12-2.02 1.17-5.31 1.18-7.34 0-1.02-.59-1.53-1.36-1.53-2.13l.14-31.29s.01 0 .01.01c0-.77.5-1.54 1.51-2.13 2.02-1.17 5.3-1.17 7.34 0 1.16.67 1.63 1.58 1.47 2.45.02-.11.06-.21.06-.31zM128.999 41.437l-.14 31.28c0 .77-.51 1.53-1.51 2.12-2.02 1.17-5.32 1.17-7.35 0-1.02-.59-1.53-1.37-1.53-2.14l.15-31.28c0-.77.5-1.54 1.51-2.12 2.02-1.18 5.3-1.18 7.34 0 1.17.67 1.65 1.58 1.48 2.46.02-.1.05-.21.05-.32zM113.993 90.707 86.368 74.8c-.215-1.478-1.15-3.242-2.778-5.172a28.321 28.321 0 0 0-2.153-2.266 28.309 28.309 0 0 0 2.153-2.267c2.573-3.051 3.43-5.692 2.413-7.435-1.294-2.221-5.383-2.4-10.59-.834-1.27-5.287-3.483-8.73-6.054-8.73-2.572 0-4.784 3.443-6.054 8.73-5.207-1.564-9.295-1.387-10.59.834-1.304 2.237.592 5.916 4.574 9.702-2.784 2.647-4.548 5.24-4.908 7.327L24.719 90.805c-.423.247-.635.568-.64.89l-.002-.04v.053l-.008 3.515c0 .322.214.652.652.908l43.222 24.95c.858.495 2.253.495 3.112 0l42.933-24.95c.43-.247.644-.578.644-.9l.008-3.62-.001.004c.002-.33-.214-.658-.646-.908zm-47.755-28.7a52.561 52.561 0 0 1 3.112-1.673 52.012 52.012 0 0 1 3.13 1.672 51.906 51.906 0 0 1 2.957 1.861c.075 1.12.12 2.281.12 3.494 0 .41-.013.802-.022 1.2l-4.796-2.76c-.864-.499-2.256-.494-3.114.006l-4.445 2.59c-.007-.345-.02-.683-.02-1.036 0-1.212.046-2.373.12-3.492a52.52 52.52 0 0 1 2.958-1.863zm-2.855.597c.15-1.62.37-3.132.654-4.505a41.155 41.155 0 0 1 4.19 1.686 53.24 53.24 0 0 0-2.493 1.357c-.816.476-1.593.966-2.35 1.462zm7.111-2.817a41.266 41.266 0 0 1 4.187-1.688c.284 1.373.503 2.885.654 4.505-.763-.499-1.542-.99-2.351-1.462a53.258 53.258 0 0 0-2.49-1.355zm6.03 9.345c.02-.584.033-1.172.033-1.77 0-.944-.032-1.86-.079-2.764 1.257.9 2.423 1.826 3.475 2.764-.83.74-1.73 1.474-2.692 2.194zm-14.334-.159-.857.5a39.947 39.947 0 0 1-2.585-2.111 41.559 41.559 0 0 1 3.492-2.768c-.047.905-.08 1.823-.08 2.767 0 .545.014 1.08.03 1.612zm20.636 1.3c1.194 1.416 1.978 2.721 2.347 3.839l-6.974-4.016a40.987 40.987 0 0 0 2.496-2.059 27.483 27.483 0 0 1 2.13 2.235zm2.314-12.11c.776 1.331-.068 3.623-2.314 6.288a27.46 27.46 0 0 1-2.13 2.235 43.569 43.569 0 0 0-4.293-3.367 43.096 43.096 0 0 0-.772-5.52c4.939-1.497 8.545-1.288 9.51.365zM69.36 49.097c1.914 0 3.91 3.01 5.104 8.03a43.05 43.05 0 0 0-5.104 2.089 43.051 43.051 0 0 0-5.104-2.088c1.194-5.02 3.19-8.03 5.104-8.03zm-15.78 9.068c.527-.905 1.841-1.38 3.733-1.38 1.565 0 3.54.346 5.773 1.022a43.095 43.095 0 0 0-.77 5.508 43.284 43.284 0 0 0-4.297 3.37c-3.786-3.585-5.409-6.856-4.44-8.52zm4.44 9.875c.734.66 1.536 1.319 2.388 1.973l-6.818 3.973c.591-1.664 2.107-3.746 4.43-5.946zM24.191 92.094a.573.573 0 0 1-.111-.362.81.81 0 0 0 .11.362z" fill="#e4e8f4" opacity="1" data-original="#e4e8f4"></path><path d="M60.289 46.437c.01 1.96-1.36 4.33-3.06 5.31l-17.07 9.86c2.82-.21 5.19.05 6.44.77.93.55 1.28 1.36 1.11 2.35.03-.16.05-.32.05-.47v2.33c.01 2.21-3.01 4.61-8.04 7.52-6.82 3.94-14.74 5.71-17.77 3.95-.96-.56-1.46-1.5-1.46-2.66v-1.41c0-.35.05-.72.13-1.1l-13.58 7.84c-.96.55-1.8.53-2.37.08.05.06.1.11.18.16l-.91-.53-1.93-1.09c-.57-.35-.9-1.04-.9-2l-.02-3.48-.09-36.61c0-1.94 1.39-4.32 3.06-5.31l50.26-29c.85-.48 1.62-.55 2.17-.22l2.85 1.66h.01l.01.01c.55.31.89.99.89 1.95l.03 36.6zM77.51 55.147c.926 0 1.692-.756 1.692-1.693 0-.51-.223-.968-.585-1.277a1.699 1.699 0 0 0-2.81 1.277c0 .213.042.415.117.596a1.692 1.692 0 0 0 1.586 1.097zM53.255 69.334c.927 0 1.693-.756 1.693-1.692 0-.511-.224-.969-.585-1.278a1.699 1.699 0 0 0-2.81 1.277c0 .214.042.416.116.597a1.692 1.692 0 0 0 1.587 1.096zM42.019 115.627l-.02-3.61-3.28-.22.01-.02.02-4.28-4.4-2.54-3.79 1.74a17.33 17.33 0 0 0-3.41-.78l-.62-2.83-6.2.01-.59 2.97c-1.05.18-2.03.44-2.97.79l-4.22-1.9-4.37 2.54-.01 4.28.01.01-3.18.22-.02 4.29.02 2.24 4.92.36-1.67 1.23-.01 2.94 4.4 2.54 4.88-2.22c.69.22 1.43.42 2.18.54l.77 3.54 6.2.01.67-3.38c.89-.11 1.74-.29 2.59-.53l4.51 2.04 4.36-2.54.02-2.94-1.68-1.24 4.87-.32zm-12.81 1.48c-3.13 1.82-8.24 1.82-11.39 0-.75-.43-1.32-.93-1.71-1.47.39-.52.94-1.01 1.68-1.44 3.13-1.82 8.22-1.83 11.37-.01.76.44 1.33.94 1.73 1.48-.39.53-.95 1.02-1.68 1.44z" fill="#e4e8f4" opacity="1" data-original="#e4e8f4"></path></g><path fill="#f9bb4a" d="M90.827 19.396 90.68 50.68c-.002.765-.504 1.529-1.506 2.111-2.019 1.173-5.318 1.177-7.35.005-1.02-.59-1.529-1.365-1.527-2.14l.146-31.285c-.002.775.506 1.55 1.527 2.14 2.031 1.173 5.33 1.168 7.35-.005 1.002-.582 1.504-1.346 1.506-2.111z" opacity="1" data-original="#f9bb4a"></path><path fill="#fed57a" d="M89.296 17.255c2.032 1.173 2.042 3.08.024 4.252-2.018 1.173-5.318 1.178-7.35.005-2.03-1.173-2.034-3.084-.016-4.257 2.019-1.173 5.31-1.173 7.342 0z" opacity="1" data-original="#fed57a"></path><path fill="#75ca75" d="m103.553 26.74-.145 31.284c-.003.765-.506 1.53-1.51 2.114-2.02 1.173-5.311 1.18-7.343.008-1.025-.592-1.535-1.37-1.533-2.145l.145-31.285c-.002.776.509 1.553 1.534 2.145 2.031 1.173 5.323 1.165 7.342-.008 1.004-.584 1.508-1.349 1.51-2.114z" opacity="1" data-original="#75ca75"></path><path fill="#9ad898" d="M102.026 24.604c2.032 1.173 2.035 3.076.017 4.249-2.019 1.173-5.31 1.181-7.342.008-2.04-1.177-2.043-3.088-.024-4.261 2.018-1.173 5.31-1.173 7.349.004z" opacity="1" data-original="#9ad898"></path><path fill="#576cfb" d="m116.275 34.084-.145 31.285c-.002.766-.506 1.53-1.51 2.114-2.019 1.173-5.311 1.181-7.342.008-1.024-.59-1.532-1.365-1.53-2.138l.145-31.285c-.002.773.507 1.548 1.53 2.138 2.031 1.173 5.324 1.165 7.342-.008 1.004-.584 1.508-1.348 1.51-2.114z" opacity="1" data-original="#576cfb"></path><path fill="#748bfd" d="M114.748 31.95c2.032 1.172 2.035 3.075.017 4.248-2.018 1.173-5.31 1.181-7.342.008-2.039-1.177-2.035-3.084-.017-4.257 2.019-1.172 5.304-1.177 7.342 0z" opacity="1" data-original="#748bfd"></path><path fill="#fa5168" d="m129.001 41.436-.145 31.285c-.002.765-.504 1.529-1.507 2.111-2.018 1.173-5.318 1.178-7.35.005-1.022-.591-1.531-1.366-1.529-2.14l.146-31.284c-.003.773.506 1.548 1.53 2.139 2.031 1.173 5.33 1.168 7.349-.005 1.002-.582 1.504-1.346 1.506-2.111z" opacity="1" data-original="#fa5168"></path><path fill="#f9607f" d="M127.47 39.295c2.032 1.173 2.043 3.08.025 4.252-2.019 1.173-5.318 1.178-7.35.005-2.038-1.177-2.035-3.084-.016-4.257 2.018-1.173 5.303-1.177 7.342 0z" opacity="1" data-original="#f9607f"></path><path fill="#d4dae8" d="m114.64 91.612-.008 3.62c0 .321-.215.652-.644.9L71.055 121.08c-.859.495-2.254.495-3.112 0L24.721 96.13c-.438-.256-.652-.586-.652-.908l.008-3.567c0 .322.023.463.46.71l43.222 24.958c.859.495 2.253.495 3.112 0l42.933-24.95c.43-.247.836-.44.836-.762z" opacity="1" data-original="#d4dae8"></path><path fill="#e4e8f4" d="M113.992 90.707c.86.495.865 1.304.007 1.804L71.094 117.51c-.858.5-2.255.502-3.115.007L24.726 92.609c-.864-.498-.865-1.304-.007-1.804l42.906-24.998c.858-.5 2.25-.505 3.114-.007z" opacity="1" data-original="#e4e8f4"></path><path fill="#474b59" d="M81.16 83.75c-6.621-3.832-17.202-3.769-23.665 0-3.548 2.06-5.132 4.816-4.72 7.509.38-2.09 1.964-4.15 4.72-5.766 6.463-3.77 17.044-3.833 23.665 0 2.82 1.648 4.403 3.707 4.784 5.861.411-2.724-1.173-5.544-4.784-7.603z" opacity="1" data-original="#474b59"></path><path fill="#5b5e71" d="M85.943 91.356a3.56 3.56 0 0 1-.193.826c-.568 1.9-2.124 3.734-4.625 5.193-6.46 3.735-16.91 3.735-23.413 0-2.629-1.523-4.206-3.358-4.743-5.29-.064-.257-.129-.504-.193-.794v-.032c.376-2.092 1.964-4.153 4.721-5.762 6.46-3.777 17.04-3.841 23.66 0 2.823 1.642 4.41 3.702 4.786 5.859z" opacity="1" data-original="#5b5e71"></path><path fill="#f9607f" d="M69.359 86.627c-4.036 0-7.198-8.462-7.198-19.266 0-10.802 3.162-19.265 7.198-19.265s7.198 8.463 7.198 19.265c0 10.804-3.162 19.266-7.198 19.266zm0-37.53c-2.993 0-6.198 7.339-6.198 18.264 0 10.927 3.205 18.266 6.198 18.266s6.198-7.34 6.198-18.266c0-10.925-3.205-18.265-6.198-18.265z" opacity="1" data-original="#f9607f"></path><path fill="#748bfd" d="M81.4 78.93c-3.93 0-9.71-1.879-15.666-5.35-9.333-5.44-15.052-12.432-13.019-15.92 2.032-3.486 10.935-1.957 20.269 3.482 4.379 2.552 8.145 5.566 10.606 8.486 2.573 3.052 3.43 5.692 2.413 7.435-.735 1.262-2.372 1.867-4.602 1.867zM57.313 56.785c-1.892 0-3.206.474-3.733 1.379-1.507 2.586 3.22 9.051 12.659 14.552 9.442 5.503 17.395 6.43 18.902 3.843.776-1.33-.068-3.622-2.314-6.287-2.389-2.834-6.064-5.77-10.346-8.266-6.139-3.578-11.65-5.221-15.168-5.221z" opacity="1" data-original="#748bfd"></path><path fill="#68af68" d="M57.318 78.93c-2.232 0-3.867-.605-4.603-1.867-2.033-3.487 3.686-10.48 13.019-15.92 9.334-5.441 18.238-6.97 20.27-3.483 1.016 1.743.159 4.384-2.414 7.435-2.46 2.92-6.227 5.933-10.606 8.486-5.955 3.47-11.734 5.35-15.666 5.35zm8.92-16.924c-9.44 5.502-14.166 11.967-12.66 14.553 1.508 2.587 9.463 1.66 18.902-3.843 4.282-2.495 7.957-5.43 10.346-8.265 2.246-2.665 3.09-4.957 2.314-6.287-1.508-2.586-9.462-1.66-18.902 3.842z" opacity="1" data-original="#68af68"></path><path fill="#4e5161" d="M28.874 64.25 24.7 61.827l10.453-6.035 4.173 2.425z" opacity="1" data-original="#4e5161"></path><path fill="#3f434f" d="m20.485 73.948.004 1.45c.003 1.156.5 2.101 1.462 2.661 3.025 1.758 10.95-.014 17.769-3.951 5.033-2.906 8.044-5.307 8.038-7.525l-.004-2.325c.006 2.218-3.005 5.494-8.038 8.4-6.82 3.938-14.744 5.71-17.769 3.952-.963-.56-1.459-1.506-1.462-2.662z" opacity="1" data-original="#3f434f"></path><path fill="#525566" d="M27.302 65.444c-6.82 3.938-8.355 9.422-5.355 11.166 3.025 1.757 10.949-.014 17.769-3.952 6.795-3.923 9.904-8.521 6.88-10.279-3.001-1.744-12.498-.858-19.294 3.065z" opacity="1" data-original="#525566"></path><path fill="#bac1ce" d="M28.916 73.54 26.958 72.4l-.042-12.541 1.958 1.138z" opacity="1" data-original="#bac1ce"></path><path fill="#cad0dd" d="m39.327 54.963.042 12.541-10.453 6.035-.042-12.541z" opacity="1" data-original="#cad0dd"></path><path fill="#eaf0f6" d="m19.425 69.549 17.964-10.44 3.212 2.112-17.964 10.44z" opacity="1" data-original="#eaf0f6"></path><path fill="#5b5e71" d="M59.363 4.396c-.528-.286-1.27.155-2.105.661L7.384 34.347c-1.694.968-1.932 2.628-1.932 4.565l-.734 36.503v3.499c.022.968-.423 1.741.127 2.05l-.902-.529-1.93-1.09c-.572-.353-.902-1.035-.902-2.003l-.022-3.477-.088-36.613c0-1.936 1.387-4.312 3.059-5.302l50.255-29c.858-.484 1.628-.55 2.178-.22z" opacity="1" data-original="#5b5e71"></path><path fill="#3f434f" d="M60.281 42.95 3.943 75.506l-.11-36.59c0-1.937 1.386-4.313 3.08-5.303l50.255-29c1.694-.99 3.08-.198 3.08 1.738z" opacity="1" data-original="#3f434f"></path><path fill="#ffffff" d="M58.268 41.265 5.947 71.503 5.84 38.915c0-1.213 1.008-2.94 2.092-3.573L58.225 6.327z" opacity="1" data-original="#ffffff"></path><path fill="#e4e8f4" d="m60.281 42.95.01 3.49c.006 1.953-1.365 4.328-3.064 5.309L7.038 80.725c-1.708.986-3.088.2-3.094-1.752l-.01-3.49z" opacity="1" data-original="#e4e8f4"></path><path fill="#bac1ce" d="M33.333 61.836c0 .85-.595 1.85-1.318 2.274-.722.426-1.317.086-1.317-.743 0-.85.574-1.87 1.317-2.296.723-.403 1.318-.063 1.318.765z" opacity="1" data-original="#bac1ce"></path><path fill="#d83049" d="M79.202 53.454a1.692 1.692 0 0 1-3.279.596 1.566 1.566 0 0 1-.116-.596 1.699 1.699 0 0 1 3.395 0z" opacity="1" data-original="#d83049"></path><path fill="#f34858" d="M78.734 52.784c0 .936-.767 1.692-1.693 1.692-.425 0-.82-.16-1.117-.426a1.566 1.566 0 0 1-.117-.596 1.699 1.699 0 0 1 2.81-1.277c.074.191.117.394.117.607z" opacity="1" data-original="#f34858"></path><path fill="#efac41" d="M54.948 67.642c0 .936-.766 1.692-1.693 1.692a1.692 1.692 0 0 1-1.586-1.096 1.566 1.566 0 0 1-.117-.596 1.699 1.699 0 0 1 3.396 0z" opacity="1" data-original="#efac41"></path><path fill="#fed57a" d="M54.48 66.971c0 .937-.767 1.693-1.693 1.693-.426 0-.82-.16-1.118-.426a1.566 1.566 0 0 1-.117-.596 1.699 1.699 0 0 1 2.81-1.278c.075.192.118.394.118.607z" opacity="1" data-original="#fed57a"></path><path fill="#72747a" d="M49.942 15.995zM50.203 15.989z" opacity="1" data-original="#72747a"></path><path fill="#b0b3bd" d="M53.599 16.897a6.017 6.017 0 0 0-2.564-.868c1.61.173 2.982.902 4 2.122a5.947 5.947 0 0 0-1.436-1.254z" opacity="1" data-original="#b0b3bd"></path><path fill="#72747a" d="M55.066 18.188z" opacity="1" data-original="#72747a"></path><path fill="#fa5168" d="m44.894 31.528 7.935 5.938c-2.11 3.338-4.874 6.21-7.895 7.953-2.525 1.458-4.876 1.927-6.82 1.52z" opacity="1" data-original="#fa5168"></path><path fill="#748bfd" d="M53.599 16.897a6.016 6.016 0 0 1 1.77 1.687l.032.048.035.05.043.065.026.04c.02.028.038.058.057.088a8.424 8.424 0 0 1 .986 2.282 10.39 10.39 0 0 1 .23 1.025l.006.038.02.117.007.04a12.132 12.132 0 0 1 .024.16l.015.11.007.05a10.436 10.436 0 0 1 .032.262l.007.063.01.096.007.068.009.1.005.064.008.103.005.064a12.939 12.939 0 0 1 .011.171l.005.092.004.076.005.104.002.068.004.107.002.066.002.13.001.044.002.177-12.084 6.976z" opacity="1" data-original="#748bfd"></path><path fill="#72747a" d="M50.496 15.992zM51.025 16.028z" opacity="1" data-original="#72747a"></path><path fill="#f9bb4a" d="M56.978 24.552c.011 4.193-1.598 8.898-4.15 12.914l-7.934-5.938z" opacity="1" data-original="#f9bb4a"></path><path fill="#9ad898" d="m44.855 17.644.159-.09.16-.09.048-.026.106-.057.082-.043.074-.04c.028-.013.056-.027.083-.042l.073-.037.09-.044.064-.032.092-.044.064-.03c.03-.016.061-.03.092-.044l.062-.029.088-.04.066-.03.09-.04.063-.026.093-.04.057-.024a12.8 12.8 0 0 1 .102-.041l.048-.02.105-.041.044-.017.11-.042.04-.015a12.729 12.729 0 0 1 .707-.236 11.809 11.809 0 0 1 .582-.155 11.405 11.405 0 0 1 .567-.117 11.242 11.242 0 0 1 .277-.043l.039-.005a8.63 8.63 0 0 1 .237-.03l.053-.005.083-.008.095-.008.039-.003c1.48-.11 2.807.198 3.91.887l-8.705 14.631 12.084-6.976-12.084 6.976z" opacity="1" data-original="#9ad898"></path><path fill="#e4e8f4" d="m44.855 17.644.04 13.884-6.781 15.411c-3.194-.656-5.3-3.659-5.314-8.428-.022-7.665 5.374-17.01 12.055-20.867z" opacity="1" data-original="#e4e8f4"></path><path fill="#d4dae8" d="M28.274 35.008c.391-.226.712-.043.713.413l.051 18.084c.002.456-.317 1.008-.708 1.234L8.766 66.034c-.391.226-.712.043-.713-.413L8 47.537c-.001-.456.318-1.008.709-1.234z" opacity="1" data-original="#d4dae8"></path><path fill="#e4e8f4" d="M28.252 27.496c.392-.226.713-.043.714.413l.013 4.719c.001.456-.317 1.008-.709 1.234L8.707 45.157c-.392.226-.712.043-.714-.413l-.013-4.72c-.001-.455.317-1.007.709-1.233z" opacity="1" data-original="#e4e8f4"></path><path fill="#afb5bf" d="M28.185 36.518v.367L9.079 47.917v-.368zM28.188 37.796l.001.362L9.081 49.19v-.362zM28.195 40.345v.367L9.089 51.744v-.367zM28.228 53.106l.001.361L9.121 64.5v-.361zM28.225 51.83v.362L9.119 63.223l-.001-.361zM28.221 50.554l.001.362L9.115 61.948l-.001-.362zM28.218 49.278l.001.362L9.111 60.672v-.362zM28.215 48v.367L9.109 59.4l-.001-.367zM28.211 46.727l.001.361L9.105 58.12l-.001-.361zM28.208 45.451l.001.362L9.101 56.844v-.361zM28.205 44.172v.368L9.099 55.57l-.001-.367zM28.201 42.9l.001.361L9.095 54.293l-.001-.362zM28.198 41.624l.001.361L9.091 53.017v-.361zM28.191 39.072l.001.362L9.085 50.465l-.001-.361z" opacity="1" data-original="#afb5bf"></path><path fill="#576cfb" d="m38.744 107.498-.012 4.283-2.964 2.208.012-4.283zM11.74 110.113l-.013 4.283-3.56-2.615.013-4.283z" opacity="1" data-original="#576cfb"></path><path fill="#4562ef" d="m31.546 113.836-.01 3.674c.003-1.202-.79-2.406-2.375-3.321-3.15-1.82-8.241-1.81-11.372.008-1.558.906-2.34 2.092-2.344 3.279l.01-3.674c.004-1.187.786-2.373 2.345-3.278 3.13-1.82 8.22-1.828 11.372-.009 1.585.916 2.377 2.12 2.374 3.32z" opacity="1" data-original="#4562ef"></path><path fill="#e4e8f4" d="m5.015 115.595-.012 2.941-.02-2.241.012-4.284z" opacity="1" data-original="#e4e8f4"></path><path fill="#576cfb" d="m42.017 115.624-.012 2.94-5.132.34.013-2.941zM11.137 116.04l-.012 2.941-6.122-.445.012-2.941z" opacity="1" data-original="#576cfb"></path><path fill="#4562ef" d="m12.08 117.3-.012 4.283c-.386-.398-.723-.824-.943-1.26l.012-4.283c.22.436.557.862.943 1.26zM36.886 115.963l-.013 4.283c-.314.61-.779 1.172-1.361 1.724l.012-4.284c.582-.552 1.047-1.113 1.362-1.723zM19.709 120.989l-.012 2.941a15.27 15.27 0 0 1-2.177-.542l.012-2.941c.687.222 1.424.416 2.177.542zM29.94 120.621l-.013 2.941c-.851.242-1.703.426-2.588.533l.012-2.941a16.69 16.69 0 0 0 2.588-.533zM38.815 120.127l-.012 2.941-4.367 2.538.013-2.942z" opacity="1" data-original="#4562ef"></path><path fill="#576cfb" d="m34.449 122.664-.013 2.942-4.509-2.044.012-2.941z" opacity="1" data-original="#576cfb"></path><path fill="#4562ef" d="m12.646 122.665-.012 2.94-4.395-2.537.012-2.94z" opacity="1" data-original="#4562ef"></path><path fill="#576cfb" d="m17.532 120.447-.012 2.941-4.886 2.218.012-2.941zM27.35 121.154l-.011 2.941-.667 3.38.012-2.941zM20.481 124.524l-.012 2.941-.772-3.535.012-2.941z" opacity="1" data-original="#576cfb"></path><path fill="#748bfd" d="m34.449 122.664-4.51-2.043c-.851.242-1.703.426-2.588.533l-.667 3.38-6.203-.01-.772-3.535c-.753-.126-1.49-.32-2.177-.542l-4.886 2.218-4.395-2.538 3.83-2.828c-.387-.397-.724-.823-.944-1.259l-6.122-.445-.02-3.584 5.816-.407a4.948 4.948 0 0 1 .928-1.491l-3.56-2.615 4.367-2.537 4.224 1.898c.935-.349 1.92-.61 2.972-.794l.585-2.964 6.203-.01.618 2.828c1.188.146 2.36.417 3.415.775l3.786-1.733 4.395 2.537-2.964 2.208c.622.61 1.094 1.288 1.349 1.976l4.867.339.02 3.603-5.13.339c-.315.61-.78 1.171-1.362 1.723l3.291 2.441zm-16.626-5.553c3.15 1.819 8.256 1.819 11.386 0s3.113-4.777-.037-6.596c-3.151-1.819-8.242-1.81-11.372.009s-3.128 4.768.023 6.587" opacity="1" data-original="#748bfd"></path><path fill="#4562ef" d="m26.684 124.534-.012 2.941-6.203-.01.012-2.941z" opacity="1" data-original="#4562ef"></path><path fill="#cad0dd" d="M97.116 92.028c.212.671.768 1.315 1.661 1.834 2.376 1.38 6.24 1.376 8.626-.002 2.392-1.38 2.404-3.614.029-4.994-.921-.536-2.06-.862-3.258-.978l.197 1.83c.344.083.663.208.942.37 1.208.703 1.201 1.847-.014 2.549-1.216.702-3.196.704-4.403.002a2.248 2.248 0 0 1-.562-.447z" opacity="1" data-original="#cad0dd"></path><path fill="#f9607f" d="M98.81 88.866c-1.49.859-2.056 2.05-1.694 3.162l3.218.164c-.6-.679-.403-1.536.58-2.103.935-.54 2.32-.665 3.457-.371l-.197-1.83c-1.887-.195-3.904.134-5.365.978z" opacity="1" data-original="#f9607f"></path><path fill="#5b5e71" d="M84.373 102.95c.6.679.403 1.536-.584 2.106-.935.54-2.315.667-3.458.37l.198 1.83c1.89.192 3.904-.134 5.369-.98 1.488-.86 2.05-2.047 1.697-3.16z" opacity="1" data-original="#5b5e71"></path><path fill="#4c7891" d="M64.848 109.378c-.334 1.093.223 2.259 1.678 3.104 1.48.86 3.525 1.184 5.45.973l.298-1.867c-1.177.352-2.657.24-3.633-.327-.933-.542-1.144-1.343-.629-2.006z" opacity="1" data-original="#4c7891"></path><path fill="#f9607f" d="M75.149 112.482c-.902.526-2.018.848-3.176.977l.3-1.867c.279-.086.537-.194.773-.333 1.223-.698 1.212-1.846.01-2.543-1.212-.708-3.176-.708-4.4 0-.278.16-.493.343-.643.536l-3.165.13c.204-.698.772-1.353 1.706-1.89 2.393-1.384 6.245-1.384 8.616 0 2.372 1.374 2.36 3.617-.021 4.99z" opacity="1" data-original="#f9607f"></path><path fill="#cad0dd" d="M77.3 101.284c-2.388 1.379-2.397 3.614-.025 4.992.921.535 2.063.864 3.254.98l-.198-1.83a3.65 3.65 0 0 1-.937-.373c-1.208-.702-1.206-1.844.01-2.546 1.22-.704 3.2-.706 4.407-.004.231.134.423.287.562.447l3.222.167c-.212-.672-.772-1.314-1.67-1.835-2.371-1.378-6.234-1.378-8.626.002z" opacity="1" data-original="#cad0dd"></path><path fill="#fed57a" d="M96.652 100.067c-.901.526-2.017.848-3.176.977l.3-1.867c.28-.086.537-.193.773-.333 1.213-.697 1.223-1.846.01-2.543-1.212-.708-3.186-.708-4.399 0a2.196 2.196 0 0 0-.643.536l-3.166.13c.204-.698.783-1.364 1.706-1.89 2.382-1.384 6.245-1.384 8.617 0 2.371 1.374 2.36 3.617-.022 4.99z" opacity="1" data-original="#fed57a"></path><path fill="#75ca75" d="M86.354 96.962c-.338 1.095.22 2.26 1.674 3.106 1.479.86 3.529 1.182 5.45.973l.298-1.867c-1.174.35-2.653.239-3.63-.329-.932-.542-1.148-1.341-.632-2.004z" opacity="1" data-original="#75ca75"></path></g></svg>',
                  'Data Science & Machine Learning', 
                'Pandas, NumPy, Matplotlib, Seaborn, Chart.js, OpenCV\n' +
                'Scikit-learn, TensorFlow, PyTorch, SciPy, Anaconda'
                ],

                ['<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 58 58" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g fill="#9eebf9"><path d="M44 30a1 1 0 0 1-1-1c0-2.206 1.794-4 4-4h6c.551 0 1-.449 1-1v-5a1 1 0 0 1 2 0v5c0 1.654-1.346 3-3 3h-6c-1.103 0-2 .897-2 2a1 1 0 0 1-1 1zM16 19h-5c-4.963 0-9-4.038-9-9a1 1 0 0 1 2 0c0 3.86 3.14 7 7 7h5a1 1 0 0 1 0 2zM23 53h-8a1 1 0 0 1 0-2h8c2.757 0 5-2.243 5-5a1 1 0 0 1 2 0c0 3.86-3.14 7-7 7zM16 41H6a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2zM29 7a1 1 0 0 1-1-1c0-1.103-.897-2-2-2h-5a1 1 0 0 1 0-2h5c2.206 0 4 1.794 4 4a1 1 0 0 1-1 1z" fill="#9eebf9" opacity="1" data-original="#9eebf9"></path><path d="M29 13a1 1 0 0 1-1-1V6a1 1 0 0 1 2 0v6a1 1 0 0 1-1 1zM37 15a1 1 0 0 1-1-1c0-2.206 1.794-4 4-4h3c.551 0 1-.449 1-1V6a1 1 0 0 1 2 0v3c0 1.654-1.346 3-3 3h-3c-1.103 0-2 .897-2 2a1 1 0 0 1-1 1zM55 42a1 1 0 0 1-1-1v-3c0-.551-.449-1-1-1h-9.525C41.396 37 40 35.393 40 33a1 1 0 0 1 2 0c0 .602.144 2 1.475 2H53c1.654 0 3 1.346 3 3v3a1 1 0 0 1-1 1zM42 50a1 1 0 0 1-1-1c0-.551-.449-1-1-1-2.206 0-4-1.794-4-4a1 1 0 0 1 2 0c0 1.103.897 2 2 2 1.654 0 3 1.346 3 3a1 1 0 0 1-1 1z" fill="#9eebf9" opacity="1" data-original="#9eebf9"></path></g><circle cx="3" cy="7" r="3" fill="#5469e0" opacity="1" data-original="#5469e0"></circle><circle cx="18" cy="3" r="3" fill="#5469e0" opacity="1" data-original="#5469e0"></circle><circle cx="55" cy="16" r="3" fill="#5469e0" opacity="1" data-original="#5469e0"></circle><circle cx="55" cy="44" r="3" fill="#5469e0" opacity="1" data-original="#5469e0"></circle><circle cx="12" cy="52" r="3" fill="#5469e0" opacity="1" data-original="#5469e0"></circle><circle cx="3" cy="40" r="3" fill="#5469e0" opacity="1" data-original="#5469e0"></circle><circle cx="45" cy="3" r="3" fill="#5469e0" opacity="1" data-original="#5469e0"></circle><circle cx="29" cy="29" r="17" fill="#5469e0" opacity="1" data-original="#5469e0"></circle><path fill="#9eebf9" d="M42 53a1 1 0 0 1-1-1v-3a1 1 0 0 1 2 0v3a1 1 0 0 1-1 1zM21 27h16v12H21z" opacity="1" data-original="#9eebf9"></path><path fill="#ffffff" d="M26 31h6v4h-6zM29 17a6 6 0 0 0-6 6v4h4v-4a2 2 0 0 1 4 0v4h4v-4a6 6 0 0 0-6-6z" opacity="1" data-original="#ffffff"></path><circle cx="42" cy="55" r="3" fill="#5469e0" opacity="1" data-original="#5469e0"></circle></g></svg>',
                  'Security & Networking Fundamentals', 
                'VPN, Firewall, IPS/IDS, IPSec, TLS\n' + 
                'HTTP/HTTPS, Cisco Tools, Tor Browser Security'
                ],

                ['<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 60 60" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#e1eeff" d="M53 9v26.05L33.35 43h-6.7L7 35.05V9l1-1h44z" opacity="1" data-original="#e1eeff"></path><path fill="#49508e" d="M53 4v5H7V4a3 3 0 0 1 3-3h40a3 3 0 0 1 3 3z" opacity="1" data-original="#49508e"></path><g fill="#fff"><path d="M12 6h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM17 6h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM22 6h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2z" fill="#ffffff" opacity="1" data-original="#ffffff"></path></g><path fill="#b1cbdd" d="M12 14h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM12 18h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2z" opacity="1" data-original="#b1cbdd"></path><path fill="#eb6374" d="M48 18h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2z" opacity="1" data-original="#eb6374"></path><path fill="#b1cbdd" d="M12 22h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM12 26h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM12 30h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2z" opacity="1" data-original="#b1cbdd"></path><path fill="#2e3360" d="M49 6h-6a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2z" opacity="1" data-original="#2e3360"></path><path fill="#b1cbdd" d="M16 35a1 1 0 0 1-1-1V13a1 1 0 0 1 2 0v21a1 1 0 0 1-1 1z" opacity="1" data-original="#b1cbdd"></path><path fill="#66caa4" d="M30 14H20a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2zM32 18H22a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2z" opacity="1" data-original="#66caa4"></path><path fill="#f9c84e" d="M42 18h-6a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2z" opacity="1" data-original="#f9c84e"></path><path fill="#66caa4" d="M38 22H23a1 1 0 0 1 0-2h15a1 1 0 0 1 0 2zM30 26H20a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2zM32 30H22a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2z" opacity="1" data-original="#66caa4"></path><path fill="#f9c84e" d="M42 30h-6a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2z" opacity="1" data-original="#f9c84e"></path><path fill="#66caa4" d="M36 34H25a1 1 0 0 1 0-2h11a1 1 0 0 1 0 2z" opacity="1" data-original="#66caa4"></path><circle cx="14" cy="46" r="13" fill="#eb6374" opacity="1" data-original="#eb6374"></circle><circle cx="46" cy="46" r="13" fill="#66caa4" opacity="1" data-original="#66caa4"></circle><path fill="#ffffff" d="M19.707 40.293a1 1 0 0 0-1.414 0L14 44.586l-4.293-4.293a1 1 0 0 0-1.414 1.414L12.586 46l-4.293 4.293a1 1 0 1 0 1.414 1.414L14 47.414l4.293 4.293a1 1 0 0 0 1.414-1.414L15.414 46l4.293-4.293a1 1 0 0 0 0-1.414zM51.573 40.181a1 1 0 0 0-1.392.246l-6.317 9.023-2.157-2.157a1 1 0 0 0-1.414 1.414l3 3A1 1 0 0 0 44 52a.844.844 0 0 0 .087 0 1 1 0 0 0 .732-.423l7-10a1 1 0 0 0-.246-1.396z" opacity="1" data-original="#ffffff"></path></g></svg>',
                  'Testing & Quality Assurance', 
                'Jest, Mocha, Selenium Basics\n' + 
                'Manual Testing, Automation Frameworks'
                ],

                ['<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><circle cx="256" cy="256" r="245" style="" fill="#ffaf10" data-original="#ffaf10"></circle><path d="M174.63 379.83h108V426h-108z" style="" fill="#445ea0" data-original="#445ea0"></path><path d="M174.63 379.83h19.842V426H174.63z" style="" fill="#2e4c89" data-original="#2e4c89"></path><path d="M333.134 450c0 2.75-2.25 5-5 5H129.131c-2.75 0-5-2.25-5-5v-20c0-2.75 2.25-5 5-5h199.003c2.75 0 5 2.25 5 5v20z" style="" fill="#293d7c" data-original="#293d7c" class=""></path><path d="M143.973 450v-20c0-2.75 2.25-5 5-5h-19.842c-2.75 0-5 2.25-5 5v20c0 2.75 2.25 5 5 5h19.842c-2.75 0-5-2.25-5-5z" style="" fill="#1a2b63" data-original="#1a2b63"></path><path d="M0 370.834c0 5.5 4.5 10 10 10h300.175v-66.951H0v56.951z" style="" fill="#293d7c" data-original="#293d7c" class=""></path><path d="M19.842 370.834v-56.951H0v56.951c0 5.5 4.5 10 10 10h19.842c-5.5 0-10-4.5-10-10z" style="" fill="#1a2b63" data-original="#1a2b63"></path><path d="M310.175 286.987c0-2.206 1.794-4 4-4h143.09V66.465c0-6.046-4.946-10.992-10.991-10.992H10.992C4.946 55.473 0 60.419 0 66.465v248.418h310.175v-27.896z" style="" fill="#445ea0" data-original="#445ea0"></path><path d="M310.175 286.987c0-2.206 1.794-4 4-4h121.107V82.457c0-2.75-2.25-5-5-5H26.984c-2.75 0-5 2.25-5 5v205.441c0 2.75 2.25 5 5 5h283.19l.001-5.911z" style="" fill="#eef6ff" data-original="#eef6ff"></path><circle cx="228.63" cy="348.21" r="13.911" style="" fill="#445ea0" data-original="#445ea0"></circle><path d="M416.361 206.376c0 2.75-2.25 5-5 5H252.904c-2.75 0-5-2.25-5-5v-72.718c0-2.75 2.25-5 5-5h158.457c2.75 0 5 2.25 5 5v72.718z" style="" fill="#ffaf10" data-original="#ffaf10"></path><path d="M267.747 206.376v-72.718c0-2.75 2.25-5 5-5h-19.842c-2.75 0-5 2.25-5 5v72.718c0 2.75 2.25 5 5 5h19.842c-2.75 0-5-2.25-5-5z" style="" fill="#ff9518" data-original="#ff9518"></path><path d="M299.266 240.121h-43.112c-4.142 0-7.5-3.357-7.5-7.5s3.358-7.5 7.5-7.5h43.112c4.142 0 7.5 3.357 7.5 7.5s-3.358 7.5-7.5 7.5zM299.266 262.916h-43.112c-4.142 0-7.5-3.357-7.5-7.5s3.358-7.5 7.5-7.5h43.112c4.142 0 7.5 3.357 7.5 7.5s-3.358 7.5-7.5 7.5zM351.28 240.121h-32.06c-4.142 0-7.5-3.357-7.5-7.5s3.358-7.5 7.5-7.5h32.06c4.142 0 7.5 3.357 7.5 7.5s-3.358 7.5-7.5 7.5zM351.28 262.916h-32.06c-4.142 0-7.5-3.357-7.5-7.5s3.358-7.5 7.5-7.5h32.06c4.142 0 7.5 3.357 7.5 7.5s-3.358 7.5-7.5 7.5zM411.772 240.121h-40.836c-4.142 0-7.5-3.357-7.5-7.5s3.358-7.5 7.5-7.5h40.836c4.142 0 7.5 3.357 7.5 7.5s-3.358 7.5-7.5 7.5zM411.772 262.916h-40.836c-4.142 0-7.5-3.357-7.5-7.5s3.358-7.5 7.5-7.5h40.836c4.142 0 7.5 3.357 7.5 7.5s-3.358 7.5-7.5 7.5z" style="" fill="#c3ddf4" data-original="#c3ddf4"></path><path d="M359.365 111.084c0 2.75-2.25 5-5 5h-10.999c-2.75 0-5-2.25-5-5v-10.999c0-2.75 2.25-5 5-5h10.999c2.75 0 5 2.25 5 5v10.999zM387.363 111.084c0 2.75-2.25 5-5 5h-10.999c-2.75 0-5-2.25-5-5v-10.999c0-2.75 2.25-5 5-5h10.999c2.75 0 5 2.25 5 5v10.999zM415.361 111.084c0 2.75-2.25 5-5 5h-10.999c-2.75 0-5-2.25-5-5v-10.999c0-2.75 2.25-5 5-5h10.999c2.75 0 5 2.25 5 5v10.999z" style="" fill="#ef8318" data-original="#ef8318"></path><path d="M190.898 257.005h-9c-4.142 0-7.5-3.357-7.5-7.5s3.358-7.5 7.5-7.5h9a7.5 7.5 0 0 1 7.5 7.5 7.5 7.5 0 0 1-7.5 7.5zM156.898 257.005h-9c-4.142 0-7.5-3.357-7.5-7.5s3.358-7.5 7.5-7.5h9a7.5 7.5 0 0 1 7.5 7.5 7.5 7.5 0 0 1-7.5 7.5zM122.897 257.005h-9c-4.142 0-7.5-3.357-7.5-7.5s3.358-7.5 7.5-7.5h9a7.5 7.5 0 0 1 7.5 7.5 7.498 7.498 0 0 1-7.5 7.5zM88.897 257.005h-9c-4.142 0-7.5-3.357-7.5-7.5s3.358-7.5 7.5-7.5h9a7.5 7.5 0 0 1 7.5 7.5c0 4.143-3.357 7.5-7.5 7.5zM220.148 226.106a7.5 7.5 0 0 1-7.5-7.5v-9a7.5 7.5 0 0 1 15 0v9a7.5 7.5 0 0 1-7.5 7.5zM220.148 192.106a7.5 7.5 0 0 1-7.5-7.5v-9a7.5 7.5 0 0 1 15 0v9a7.5 7.5 0 0 1-7.5 7.5zM220.148 158.106a7.5 7.5 0 0 1-7.5-7.5v-9a7.5 7.5 0 0 1 15 0v9a7.5 7.5 0 0 1-7.5 7.5zM50.147 226.106a7.5 7.5 0 0 1-7.5-7.5v-9a7.5 7.5 0 0 1 15 0v9c0 4.143-3.357 7.5-7.5 7.5zM50.147 192.106a7.5 7.5 0 0 1-7.5-7.5v-9a7.5 7.5 0 0 1 15 0v9c0 4.143-3.357 7.5-7.5 7.5zM50.147 158.106a7.5 7.5 0 0 1-7.5-7.5v-9a7.5 7.5 0 0 1 15 0v9c0 4.143-3.357 7.5-7.5 7.5zM190.898 121.005h-9c-4.142 0-7.5-3.357-7.5-7.5s3.358-7.5 7.5-7.5h9c4.142 0 7.5 3.357 7.5 7.5s-3.358 7.5-7.5 7.5zM156.898 121.005h-9c-4.142 0-7.5-3.357-7.5-7.5s3.358-7.5 7.5-7.5h9c4.142 0 7.5 3.357 7.5 7.5s-3.358 7.5-7.5 7.5zM122.897 121.005h-9c-4.142 0-7.5-3.357-7.5-7.5s3.358-7.5 7.5-7.5h9c4.142 0 7.5 3.357 7.5 7.5s-3.357 7.5-7.5 7.5zM88.897 121.005h-9c-4.142 0-7.5-3.357-7.5-7.5s3.358-7.5 7.5-7.5h9c4.142 0 7.5 3.357 7.5 7.5s-3.357 7.5-7.5 7.5z" style="" fill="#69cdff" data-original="#69cdff"></path><path d="M200.148 224.505c0 2.75-2.25 5-5 5h-120c-2.75 0-5-2.25-5-5v-86c0-2.75 2.25-5 5-5h120c2.75 0 5 2.25 5 5v86z" style="" fill="#5dc1d8" data-original="#5dc1d8"></path><path d="M89.99 224.505v-86c0-2.75 2.25-5 5-5H75.147c-2.75 0-5 2.25-5 5v86c0 2.75 2.25 5 5 5H94.99c-2.75 0-5-2.25-5-5z" style="" fill="#28a5a5" data-original="#28a5a5"></path><path d="M234.145 121.009c0 2.75-2.25 5-5 5h-21c-2.75 0-5-2.25-5-5v-21c0-2.75 2.25-5 5-5h21c2.75 0 5 2.25 5 5v21zM68.145 123.009c0 2.75-2.25 5-5 5h-21c-2.75 0-5-2.25-5-5v-21c0-2.75 2.25-5 5-5h21c2.75 0 5 2.25 5 5v21zM234.145 260.883c0 2.75-2.25 5-5 5h-21c-2.75 0-5-2.25-5-5v-21c0-2.75 2.25-5 5-5h21c2.75 0 5 2.25 5 5v21zM68.145 260.883c0 2.75-2.25 5-5 5h-21c-2.75 0-5-2.25-5-5v-21c0-2.75 2.25-5 5-5h21c2.75 0 5 2.25 5 5v21z" style="" fill="#52bbef" data-original="#52bbef"></path><path d="M214.167 121.009v-21c0-2.75 2.25-5 5-5h-11.022c-2.75 0-5 2.25-5 5v21c0 2.75 2.25 5 5 5h11.022c-2.75 0-5-2.25-5-5zM48.167 123.009v-21c0-2.75 2.25-5 5-5H42.145c-2.75 0-5 2.25-5 5v21c0 2.75 2.25 5 5 5h11.022c-2.75 0-5-2.25-5-5zM214.167 260.883v-21c0-2.75 2.25-5 5-5h-11.022c-2.75 0-5 2.25-5 5v21c0 2.75 2.25 5 5 5h11.022c-2.75 0-5-2.25-5-5zM48.167 260.883v-21c0-2.75 2.25-5 5-5H42.145c-2.75 0-5 2.25-5 5v21c0 2.75 2.25 5 5 5h11.022c-2.75 0-5-2.25-5-5z" style="" fill="#1e99d6" data-original="#1e99d6"></path><path d="M435.458 366.773c-.155-.422-.143-.662-.121-.74.001 0 .062-.006.119-.006.114 0 .313.023.614.134l42.104 15.465v-94.638c0-2.75-2.25-5-5-5h-159c-2.75 0-5 2.25-5 5v114.8c0 2.75 2.25 5 5 5h135.98l-14.696-40.015z" style="" fill="#5dc1d8" data-original="#5dc1d8"></path><path d="M329.017 401.787v-114.8c0-2.75 2.25-5 5-5h-19.842c-2.75 0-5 2.25-5 5v114.8c0 2.75 2.25 5 5 5h19.842c-2.75 0-5-2.25-5-5z" style="" fill="#28a5a5" data-original="#28a5a5"></path><path d="M436.415 365.222c-1.647-.605-2.501.248-1.896 1.896l26.365 71.782c.605 1.648 2.116 1.98 3.357.739l13.997-13.997a3.203 3.203 0 0 1 4.515 0l16.128 16.13a3.202 3.202 0 0 0 4.514 0l7.674-7.674a3.202 3.202 0 0 0 0-4.514l-16.129-16.129a3.202 3.202 0 0 1 0-4.514l13.996-13.997c1.242-1.24.909-2.751-.739-3.356l-71.782-26.366z" style="" fill="#293d7c" data-original="#293d7c" class=""></path></g></svg>',
                  'UI/UX & Visual Design', 
                'Figma, Adobe XD, Illustrator, Fonts, Canva\n' +
                'Creative Cloud, GIMP, Inkscape, SketchUp, Dribbble'
                ],

                ['<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 500 500" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g fill-rule="evenodd" clip-rule="evenodd"><circle cx="250" cy="109.33" r="58.58" fill="#ffbf31" transform="rotate(-76.7 250.074 109.353)" opacity="1" data-original="#ffbf31"></circle><path fill="#ffe177" d="M240.522 166.375c-27.845-4.531-49.101-28.687-49.101-57.812s21.256-53.282 49.101-57.813c27.845 4.531 49.102 28.687 49.102 57.813-.001 29.125-21.258 53.282-49.102 57.812z" opacity="1" data-original="#ffe177"></path><circle cx="403.029" cy="353.639" r="58.58" fill="#ffbf31" transform="rotate(-70.68 402.829 353.51)" opacity="1" data-original="#ffbf31"></circle><path fill="#ffe177" d="M393.55 410.684c-27.845-4.531-49.101-28.687-49.101-57.812s21.256-53.282 49.101-57.813c27.845 4.531 49.102 28.687 49.102 57.813 0 29.125-21.257 53.281-49.102 57.812z" opacity="1" data-original="#ffe177"></path><path fill="#cf8c48" d="M250 115.339c9.027 0 16.345-7.318 16.345-16.345S259.027 82.649 250 82.649s-16.345 7.318-16.345 16.345 7.318 16.345 16.345 16.345z" opacity="1" data-original="#cf8c48"></path><path fill="#88c8fe" d="M278.703 160.403c-17.78 10.014-39.627 10.014-57.406 0v-16.362c0-15.787 12.916-28.703 28.704-28.703 15.787 0 28.703 12.916 28.703 28.703v16.362z" opacity="1" data-original="#88c8fe"></path><path fill="#cf8c48" d="M403.029 359.647c9.027 0 16.345-7.318 16.345-16.345s-7.318-16.345-16.345-16.345-16.345 7.318-16.345 16.345 7.318 16.345 16.345 16.345z" opacity="1" data-original="#cf8c48"></path><path fill="#fa6e85" d="M431.732 404.712c-17.779 10.013-39.627 10.014-57.406 0V388.35c0-15.787 12.917-28.703 28.703-28.703 15.787 0 28.703 12.916 28.703 28.703z" opacity="1" data-original="#fa6e85"></path><circle cx="96.971" cy="353.639" r="58.58" fill="#ffbf31" transform="rotate(-45 96.915 353.683)" opacity="1" data-original="#ffbf31"></circle><path fill="#ffe177" d="M87.493 411.451c-27.845-4.531-49.102-28.687-49.102-57.812s21.256-53.282 49.102-57.813c27.845 4.531 49.101 28.687 49.101 57.813.001 29.125-21.256 53.282-49.101 57.812z" opacity="1" data-original="#ffe177"></path><path fill="#cf8c48" d="M96.971 359.647c9.027 0 16.345-7.318 16.345-16.345s-7.318-16.345-16.345-16.345-16.345 7.318-16.345 16.345 7.318 16.345 16.345 16.345z" opacity="1" data-original="#cf8c48"></path><path fill="#14b5a2" d="M125.675 404.712c-17.779 10.014-39.627 10.013-57.407 0V388.35c0-15.787 12.916-28.703 28.704-28.703 15.787 0 28.703 12.916 28.703 28.703z" opacity="1" data-original="#14b5a2"></path><path fill="#88c8fe" d="M229.1 308.142h41.801v36.705H229.1z" opacity="1" data-original="#88c8fe"></path><path fill="#60b7fe" d="M177.541 210.776h144.917c5.608 0 10.195 4.588 10.195 10.195v85.895c0 5.898-4.825 10.724-10.724 10.724H177.812c-5.756 0-10.466-4.71-10.466-10.467v-86.152c0-5.607 4.588-10.195 10.195-10.195z" opacity="1" data-original="#60b7fe"></path><path fill="#88c8fe" d="M177.541 210.776h141.733a10.103 10.103 0 0 1 1.036 4.464v85.895c0 5.898-4.825 10.724-10.724 10.724h-141.1a10.376 10.376 0 0 1-1.14-4.735v-86.152c0-5.608 4.588-10.196 10.195-10.196z" opacity="1" data-original="#88c8fe"></path><path fill="#60b7fe" d="M219.508 250.192a6.158 6.158 0 0 1 7.474 9.788l-13.783 10.533 13.783 10.533a6.157 6.157 0 0 1-7.474 9.789l-20.097-15.357c-3.238-2.427-3.394-7.336-.091-9.858zm25.597 55.191a6.148 6.148 0 0 1-11.428-4.532l25.839-65.208a6.148 6.148 0 0 1 11.428 4.532zm32.535-45.403a6.157 6.157 0 0 1 7.474-9.789l20.188 15.427c3.303 2.523 3.146 7.432-.091 9.858l-20.097 15.357a6.158 6.158 0 0 1-7.474-9.789l13.784-10.533z" opacity="1" data-original="#60b7fe"></path><path fill="#41678a" d="M217.197 243.862a6.158 6.158 0 0 1 7.474 9.789l-13.783 10.533 13.783 10.533a6.157 6.157 0 1 1-7.474 9.788l-20.096-15.357c-3.238-2.427-3.394-7.336-.091-9.858zm25.597 55.192a6.148 6.148 0 0 1-11.428-4.532l25.839-65.208a6.148 6.148 0 0 1 11.428 4.532zm32.535-45.403a6.157 6.157 0 1 1 7.474-9.788l20.188 15.427c3.303 2.523 3.146 7.431-.091 9.858l-20.097 15.357a6.158 6.158 0 0 1-7.474-9.788l13.784-10.533z" opacity="1" data-original="#41678a"></path><path fill="#60b7fe" d="M200.163 351.459a6.613 6.613 0 0 1 0-13.226h99.674a6.613 6.613 0 0 1 0 13.226z" opacity="1" data-original="#60b7fe"></path><path fill="#19cfba" d="M395.213 246.368c-7.139-40.341-30.019-75.994-63.159-99.557a6.155 6.155 0 0 1 7.136-10.03c35.756 25.423 60.392 63.82 68.114 107.343l5.106-10.366a6.596 6.596 0 0 1 11.83 5.838l-13.849 28.114c-2.034 4.126-7.458 4.94-10.711 1.612l-20.976-20.728a6.594 6.594 0 1 1 9.247-9.402zM128.925 141.767a6.6 6.6 0 0 1-.827-13.173l31.272-2.064c4.395-.283 8.1 3.809 6.695 8.618l-7.425 28.387a6.591 6.591 0 1 1-12.761-3.307l2.849-10.894C113.982 175.48 91.315 215.238 87.3 259.135a6.148 6.148 0 1 1-12.247-1.109c4.256-46.528 27.83-88.682 64.198-116.939zm58.202 297.282a6.584 6.584 0 1 1-11.004 7.232l-17.979-27.312c-2.474-3.761-.496-8.789 3.747-9.964l-.002-.007 29.586-8.247a6.593 6.593 0 0 1 3.513 12.709l-11.286 3.146c31.231 13.029 67.147 15.819 99.734 7.28 12.197-3.196 24.05-7.901 36.822-13.872a6.147 6.147 0 1 1 5.208 11.138c-27.13 12.684-50.565 19.932-80.85 19.932-22.211 0-44.13-4.337-64.475-12.646z" opacity="1" data-original="#19cfba"></path></g></g></svg>',
                  'Office & Collaboration Tools', 
                'Microsoft Excel, Word, PowerPoint\n' + 
                'Jira, Trello, Notion, Git, GitHub, Gradle'
                ]
            ].map(([iconSVG, title, desc], index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.1) 100%)',
                    backdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    marginTop: '20px',
                    borderRadius: '28px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.3), 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(255, 255, 255, 0.05), inset 1px 0 0 rgba(255, 255, 255, 0.1), inset -1px 0 0 rgba(255, 255, 255, 0.1)',
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
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
                      zIndex: 1
                    },
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: '0 15px 50px rgba(0, 0, 0, 0.15), 0 2px 0 rgba(255, 255, 255, 0.4), 0 -2px 0 rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 1px 0 0 rgba(255, 255, 255, 0.15), inset -1px 0 0 rgba(255, 255, 255, 0.15)',
                      borderColor: 'rgba(77, 184, 255, 0.25)'
                    }
                  }}
                >
                 <CardContent sx={{ px: 3, py: 4, textAlign: 'center' }}>

                     {/* SVG Icon */}
                    <Box
                      sx={{
                        mb: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        '& svg': {
                          width: '100px',    // 👈 reduce to any size you want
                          height: '100px',
                        }
                      }}
                      dangerouslySetInnerHTML={{ __html: iconSVG }}
                    />

                    <Typography
                      variant="h6"
                      sx={{
                        color: '#4db8ff',
                        fontFamily: '"Poppins", sans-serif',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        mb: 2,
                        textAlign: 'center',
                        whiteSpace: 'pre-line'
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#d0d0d0',
                        fontFamily: '"Poppins", sans-serif',
                        fontSize: '0.95rem',
                        lineHeight: 1.8,
                        textAlign: 'center',
                        whiteSpace: 'pre-line'
                      }}
                    >
                      {desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Section>
      </Box>
    </Box>
  }
/>




<Route
  path="/experience"
  element={
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
      <Box sx={{ position: 'relative', zIndex: 2 ,marginTop: '60px'}}>
        <Section title="Experience" bg="transparent">
          
          <Card
  sx={{
    maxWidth: '800px',
    mx: 'auto',
    marginTop: '40px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.1) 100%)',
    backdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
    WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '28px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.3), 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(255, 255, 255, 0.05), inset 1px 0 0 rgba(255, 255, 255, 0.1), inset -1px 0 0 rgba(255, 255, 255, 0.1)',
    px: { xs: 2, sm: 4 },
    py: 4,
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
      background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
      zIndex: 1
    },
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      borderColor: 'rgba(77, 184, 255, 0.25)',
      boxShadow: '0 15px 50px rgba(0, 0, 0, 0.15), 0 2px 0 rgba(255, 255, 255, 0.4), 0 -2px 0 rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 1px 0 0 rgba(255, 255, 255, 0.15), inset -1px 0 0 rgba(255, 255, 255, 0.15)'
    }
  }}
>
  <CardContent>
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'center', md: 'flex-start' },
        justifyContent: 'space-between',
        gap: 3
      }}
    >
      {/* 📘 Left Content */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h5"
          sx={{
            color: '#4db8ff',
            fontWeight: 700,
            fontFamily: '"Poppins", sans-serif',
            fontSize: '1.4rem',
            mb: 1,
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          Trios Technologies
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{
            color: '#bbbbbb',
            fontStyle: 'italic',
            fontSize: '1rem',
            mb: 3,
            fontFamily: '"Poppins", sans-serif',
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          Web Development Intern — June 2024 to July 2024
        </Typography>

        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            paddingLeft: 0,
            fontSize: '0.95rem',
            color: '#d0d0d0',
            lineHeight: 1.8,
            fontFamily: '"Poppins", sans-serif'
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
              sx={{ mb: 1.2, display: 'flex', alignItems: 'flex-start' }}
            >
              <Typography component="span">{item}</Typography>
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
          width: { xs: '120px', md: '100px' },
          alignSelf: { xs: 'center', md: 'flex-start' },
          borderRadius: '12px',
          border: '2px solid #4db8ff',
          overflow: 'hidden',
          flexShrink: 0
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
    maxWidth: '800px',
    mx: 'auto',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.1) 100%)',
    backdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
    WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '28px',
    marginTop: '30px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.3), 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(255, 255, 255, 0.05), inset 1px 0 0 rgba(255, 255, 255, 0.1), inset -1px 0 0 rgba(255, 255, 255, 0.1)',
    px: { xs: 2, sm: 4 },
    py: 4,
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
      background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
      zIndex: 1
    },
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      borderColor: 'rgba(77, 184, 255, 0.25)',
      boxShadow: '0 15px 50px rgba(0, 0, 0, 0.15), 0 2px 0 rgba(255, 255, 255, 0.4), 0 -2px 0 rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 1px 0 0 rgba(255, 255, 255, 0.15), inset -1px 0 0 rgba(255, 255, 255, 0.15)'
    }
  }}
>
  <CardContent>
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'center', md: 'flex-start' },
        justifyContent: 'space-between',
        gap: 3
      }}
    >
      {/* 📘 Left Content */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h5"
          sx={{
            color: '#4db8ff',
            fontWeight: 700,
            fontFamily: '"Poppins", sans-serif',
            fontSize: '1.4rem',
            mb: 1,
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          Delphin Associates
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{
            color: '#bbbbbb',
            fontStyle: 'italic',
            fontSize: '1rem',
            mb: 3,
            fontFamily: '"Poppins", sans-serif',
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          Web Development Intern — May 2025 to June 2025
        </Typography>

        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            paddingLeft: 0,
            fontSize: '0.95rem',
            color: '#d0d0d0',
            lineHeight: 1.8,
            fontFamily: '"Poppins", sans-serif'
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
              sx={{ mb: 1.2, display: 'flex', alignItems: 'flex-start' }}
            >
              <Typography component="span">{item}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* 🔗 Logo */}
      <Box
        component="a"
        href="https://delphin-associates.odoo.com/"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          width: { xs: '120px', md: '100px' },
          alignSelf: { xs: 'center', md: 'flex-start' },
          borderRadius: '12px',
          border: '2px solid #4db8ff',
          overflow: 'hidden',
          flexShrink: 0
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
  }
/>




<Route
  path="/projects"
  element={
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100%',
        overflow: 'hidden',
        pb: 10,
      }}
    >
     {/* Custom Animated Background */}
      {/* Custom Animated Background */}
      <AnimatedBackground />


      {/* 🔲 Optional Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2))',
          zIndex: 1,
        }}
      />

      {/* 🔤 Foreground Content */}
      <Box sx={{ position: 'relative', zIndex: 2, py: 10 ,marginBottom: '-20px'}}>
       <Section title="Projects" bg="transparent">
        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ px: { xs: 2, sm: 4, md: 6 } }}
        >
          {[
            ['Waste Management System', 'AI-based smart waste classification (Deep Learning). Which is being integrated with Google.','https://github.com/Jerophin123/Waste_Management_System.git',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 64 64" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><rect width="26" height="4" x="35" y="17" fill="#ff675b" rx="2" opacity="1" data-original="#ff675b"></rect><rect width="4" height="6" x="51" y="55" fill="#898989" rx="1" transform="rotate(180 53 58)" opacity="1" data-original="#898989" class=""></rect><path fill="#e65d52" d="M59 21v26l-1.622 6.485A2 2 0 0 1 55.438 55H52a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1h-8v-4h-1.438a2 2 0 0 1-1.94-1.515L37 47V21z" opacity="1" data-original="#e65d52"></path><path fill="#cc5249" d="M52.438 13h-8.876a2 2 0 0 0-1.94 1.515L41 17h14l-.621-2.485A2 2 0 0 0 52.439 13z" opacity="1" data-original="#cc5249"></path><rect width="4" height="6" x="9" y="55" fill="#898989" rx="1" opacity="1" data-original="#898989" class=""></rect><rect width="26" height="4" x="3" y="17" fill="#82e28c" rx="2" opacity="1" data-original="#82e28c"></rect><path fill="#73c97c" d="M27 21v26l-1.621 6.485A2 2 0 0 1 23.439 55h-1.44L22 59h-8a1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1H8.562a2 2 0 0 1-1.94-1.515L5 47V21zM20.439 13h-8.877a2 2 0 0 0-1.94 1.515L9 17h14l-.621-2.485A2 2 0 0 0 20.439 13z" opacity="1" data-original="#73c97c"></path><rect width="38" height="4" x="13" y="7" fill="#ffde7e" rx="2" opacity="1" data-original="#ffde7e"></rect><rect width="4" height="6" x="20" y="55" fill="#a3a3a3" rx="1" opacity="1" data-original="#a3a3a3"></rect><path fill="#ffd04a" d="M48 11v28l-1.89 15.124a1 1 0 0 1-.993.876H41a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1H25a1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1h-4.117a1 1 0 0 1-.993-.876L16 39V11z" opacity="1" data-original="#ffd04a"></path><rect width="4" height="6" x="40" y="55" fill="#a3a3a3" rx="1" transform="rotate(180 42 58)" opacity="1" data-original="#a3a3a3"></rect><path fill="#e6bb43" d="M41.764 3H22.236a2 2 0 0 0-1.789 1.106L19 7h26l-1.447-2.894A2 2 0 0 0 41.763 3z" opacity="1" data-original="#e6bb43"></path><g fill="#efefef"><path d="M26 35h-2v-3a7.008 7.008 0 0 1 7-7h5v2h-5a5.006 5.006 0 0 0-5 5z" fill="#efefef" opacity="1" data-original="#efefef"></path><path d="m32.707 30.707-1.414-1.414L34.586 26l-3.293-3.293 1.414-1.414L37.414 26zM34 39h-5v-2h5a5.006 5.006 0 0 0 5-5v-3h2v3a7.008 7.008 0 0 1-7 7z" fill="#efefef" opacity="1" data-original="#efefef"></path><path d="M32.293 42.707 27.586 38l4.707-4.707 1.414 1.414L30.414 38l3.293 3.293z" fill="#efefef" opacity="1" data-original="#efefef"></path></g></g></svg>`],
            ['RV Diagnose', 'Built a plant disease detection system. It uses Deep Learning and TensorFlow.','https://github.com/Jerophin123/RV_Diagnose.git',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M6.922 505.078s240.085 47.299 392.77-105.386S505.078 6.922 505.078 6.922s-240.085-47.299-392.77 105.387S6.922 505.078 6.922 505.078z" style="" fill="#c3ea21" data-original="#c3ea21"></path><path d="M6.922 505.078s240.085 47.299 392.77-105.386S505.078 6.922 505.078 6.922L6.922 505.078z" style="" fill="#8adb53" data-original="#8adb53"></path></g></svg>`],
            ['Binger App', 'Designed an app Binger. an E-Commerce platform using Figma.','https://www.figma.com/proto/LEjitauzuzA5Dgc5ZM74w4/Binger-App?node-id=23-21&t=hXXnNf3LSjeX6Rg8-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=68%3A68',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#5d5360" d="M363.355 0h-214.71c-6.014 0-11.659 1.598-16.516 4.406l-7.828 28.626v441.436c0 18.243 14.789 33.032 33.032 33.032h206.021l28.622-12.016a32.892 32.892 0 0 0 4.411-16.516V33.032C396.387 14.789 381.598 0 363.355 0z" opacity="1" data-original="#5d5360"></path><path fill="#4b3f4e" d="M363.355 495.484 132.129 33.032V4.406c-9.832 5.722-16.516 16.43-16.516 28.626v445.936c0 18.243 14.789 33.032 33.032 33.032h214.71c12.196 0 22.9-6.685 28.622-16.516z" opacity="1" data-original="#4b3f4e"></path><path fill="#eceaec" d="M363.355 16.516h-37.493c-5.713 0-11.311 2.786-14.018 7.816-2.788 5.179-8.259 8.7-14.553 8.7H214.71c-6.294 0-11.766-3.521-14.553-8.7-2.708-5.031-8.305-7.816-14.018-7.816h-37.493c-9.122 0-16.516 7.395-16.516 16.516v445.935c0 9.122 7.395 16.516 16.516 16.516h214.71c9.122 0 16.516-7.395 16.516-16.516V33.032c-.001-9.121-7.396-16.516-16.517-16.516z" opacity="1" data-original="#eceaec"></path><path fill="#ffffff" d="M330.323 478.968H297.29L256 470.5l-41.29 8.468h-33.032c-18.243 0-33.032-14.789-33.032-33.032V82.581c0-18.243 14.789-33.032 33.032-33.032h148.645c18.243 0 33.032 14.789 33.032 33.032v363.355c0 18.243-14.789 33.032-33.032 33.032z" opacity="1" data-original="#ffffff"></path><path fill="#ff9a9f" d="M231.226 429.524H190.25c-9.122 0-16.516-7.395-16.516-16.516v-57.911l7.944-16.516h49.548c9.122 0 16.516 7.395 16.516 16.516v66.065z" opacity="1" data-original="#ff9a9f"></path><path fill="#ff8086" d="M181.677 404.645V338.58c-9.121 0-16.516 7.394-16.516 16.516v66.065c0 9.121 7.395 16.516 16.516 16.516h49.548c9.121 0 16.516-7.395 16.516-16.516h-49.548c-9.121 0-16.516-7.394-16.516-16.516z" opacity="1" data-original="#ff8086"></path><path fill="#c3ddff" d="M330.323 297.395h-40.976c-9.122 0-16.516-7.395-16.516-16.516v-57.911l7.944-16.516h49.548c9.122 0 16.516 7.395 16.516 16.516v66.065z" opacity="1" data-original="#c3ddff"></path><path fill="#a4ccff" d="M280.774 272.516v-66.065c-9.121 0-16.516 7.394-16.516 16.516v66.065c0 9.121 7.395 16.516 16.516 16.516h49.548c9.121 0 16.516-7.395 16.516-16.516H297.29c-9.121 0-16.516-7.394-16.516-16.516z" opacity="1" data-original="#a4ccff"></path><path fill="#ffffff" d="M214.71 400.516h-16.516a8.258 8.258 0 0 1-8.258-8.258V384a8.258 8.258 0 0 1 8.258-8.258h16.516a8.258 8.258 0 0 1 8.258 8.258v8.258a8.258 8.258 0 0 1-8.258 8.258z" opacity="1" data-original="#ffffff"></path><path fill="#c8c5c9" d="M297.29 478.968h-82.58c-4.565 0-8.258-3.698-8.258-8.258s3.694-8.258 8.258-8.258h82.581c4.565 0 8.258 3.698 8.258 8.258s-3.694 8.258-8.259 8.258z" opacity="1" data-original="#c8c5c9"></path><path fill="#b3e59f" d="M231.226 165.266H190.25c-9.122 0-16.516-7.395-16.516-16.516V90.839l7.944-16.516h49.548c9.122 0 16.516 7.395 16.516 16.516v66.065z" opacity="1" data-original="#b3e59f"></path><path fill="#ffffff" d="M313.806 247.742h-12.387c-4.565 0-8.258-3.698-8.258-8.258s3.694-8.258 8.258-8.258h12.387c4.565 0 8.258 3.698 8.258 8.258s-3.693 8.258-8.258 8.258zM313.806 280.774h-12.387c-4.565 0-8.258-3.698-8.258-8.258s3.694-8.258 8.258-8.258h12.387a8.256 8.256 0 0 1 8.258 8.258 8.255 8.255 0 0 1-8.258 8.258z" opacity="1" data-original="#ffffff"></path><path fill="#95d6a4" d="M181.677 140.387V74.323c-9.121 0-16.516 7.394-16.516 16.516v66.065c0 9.121 7.395 16.516 16.516 16.516h49.548c9.121 0 16.516-7.395 16.516-16.516h-49.548c-9.121-.001-16.516-7.395-16.516-16.517z" opacity="1" data-original="#95d6a4"></path><path fill="#ffffff" d="M214.71 136.258h-16.516a8.258 8.258 0 0 1-8.258-8.258v-8.258a8.258 8.258 0 0 1 8.258-8.258h16.516a8.258 8.258 0 0 1 8.258 8.258V128a8.258 8.258 0 0 1-8.258 8.258z" opacity="1" data-original="#ffffff"></path><path fill="#ffe07d" d="M330.323 165.266h-40.976c-9.122 0-16.516-7.395-16.516-16.516V90.839l7.944-16.516h49.548c9.122 0 16.516 7.395 16.516 16.516v66.065z" opacity="1" data-original="#ffe07d"></path><path fill="#ffd064" d="M280.774 140.387V74.323c-9.121 0-16.516 7.394-16.516 16.516v66.065c0 9.121 7.395 16.516 16.516 16.516h49.548c9.121 0 16.516-7.395 16.516-16.516H297.29c-9.121-.001-16.516-7.395-16.516-16.517z" opacity="1" data-original="#ffd064"></path><path fill="#ead1ff" d="M231.226 297.395H190.25c-9.122 0-16.516-7.395-16.516-16.516v-57.911l7.944-16.516h49.548c9.122 0 16.516 7.395 16.516 16.516v66.065z" opacity="1" data-original="#ead1ff"></path><path fill="#d6bdef" d="M181.677 272.516v-66.065c-9.121 0-16.516 7.394-16.516 16.516v66.065c0 9.121 7.395 16.516 16.516 16.516h49.548c9.121 0 16.516-7.395 16.516-16.516h-49.548c-9.121 0-16.516-7.394-16.516-16.516z" opacity="1" data-original="#d6bdef"></path><path fill="#e2a975" d="M330.323 429.524h-40.976c-9.122 0-16.516-7.395-16.516-16.516v-57.911l7.944-16.516h49.548c9.122 0 16.516 7.395 16.516 16.516v66.065z" opacity="1" data-original="#e2a975"></path><path fill="#d19a6e" d="M280.774 404.645V338.58c-9.121 0-16.516 7.394-16.516 16.516v66.065c0 9.121 7.395 16.516 16.516 16.516h49.548c9.121 0 16.516-7.395 16.516-16.516H297.29c-9.121 0-16.516-7.394-16.516-16.516z" opacity="1" data-original="#d19a6e"></path></g></svg>`],
            ['JDEL PC Factory', 'Designed a PC customization UI. that gained 200+ users in the first month.','https://www.figma.com/proto/HsaUcu8alpCAPzmRwV6DNa/Untitled?node-id=17-79&starting-point-node-id=17%3A79&scaling=scale-down-width&content-scaling=fixed&t=BNt8SYrLhIYaO9U7-1',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 58 58" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g fill="none" fill-rule="nonzero"><path fill="#285680" d="M30 58h26a2.006 2.006 0 0 0 2-2V2a2.006 2.006 0 0 0-2-2H30a2.006 2.006 0 0 0-2 2v54a2 2 0 0 0 2 2z" opacity="1" data-original="#285680" class=""></path><path fill="#547580" d="M16 47h12v8H16z" opacity="1" data-original="#547580"></path><path fill="#84b5cb" d="M44 43v1a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4v-1z" opacity="1" data-original="#84b5cb"></path><path fill="#2980ba" d="M44 18v25H0V18a4 4 0 0 1 4-4h36a4 4 0 0 1 4 4z" opacity="1" data-original="#2980ba" class=""></path><path fill="#84b5cb" d="M34 56a2.015 2.015 0 0 1-2 2H12a2.006 2.006 0 0 1-2-2 2.015 2.015 0 0 1 2-2h20a2.006 2.006 0 0 1 2 2z" opacity="1" data-original="#84b5cb"></path><rect width="22" height="4" x="32" y="5" fill="#2c3e50" rx="1" opacity="1" data-original="#2c3e50"></rect><circle cx="51" cy="16" r="2" fill="#fb7b76" opacity="1" data-original="#fb7b76"></circle><circle cx="51" cy="24" r="2" fill="#4fba6f" opacity="1" data-original="#4fba6f"></circle><g fill="#2c3e50"><path d="M38 55a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1zM42 55a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1zM46 55a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1zM50 55a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1zM54 55a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1z" fill="#2c3e50" opacity="1" data-original="#2c3e50"></path></g><path fill="#3b97d3" d="M36.82 14C36.65 20.09 34.86 38 0 38V18a4 4 0 0 1 4-4z" opacity="1" data-original="#3b97d3" class=""></path><path fill="#ffffff" d="M4 23a1 1 0 0 1-.707-1.707l4-4a1 1 0 0 1 1.414 1.414l-4 4A1 1 0 0 1 4 23zM4 29a1 1 0 0 1-.707-1.707l10-10a1 1 0 0 1 1.414 1.414l-10 10A1 1 0 0 1 4 29z" opacity="1" data-original="#ffffff"></path></g></g></svg>`],
            ['Student Intern Management System', 'Built a robust data handling system using JSP.','https://github.com/Jerophin123/Student-Intern-Management-System.git',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 16.933 16.933" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#5299d3" d="M2.117 15.731v.408c0 .146.117.265.263.265h12.173c.146 0 .264-.12.263-.265v-.408c0-2.172-1.628-3.954-3.705-4.083H5.822c-2.076.129-3.705 1.91-3.705 4.083z" paint-order="stroke fill markers" opacity="1" data-original="#5299d3"></path><path fill="#ffccaa" d="M7.145 9.922a.265.265 0 0 0-.267.263v2.501c.001.146.12.264.267.264h2.644a.265.265 0 0 0 .266-.264v-2.5a.265.265 0 0 0-.266-.264z" opacity="1" data-original="#ffccaa"></path><path fill="#ffb889" d="M7.145 9.922a.265.265 0 0 0-.266.263v.765a2.694 2.694 0 0 0 3.176 0v-.765a.265.265 0 0 0-.266-.263z" opacity="1" data-original="#ffb889"></path><path fill="#3385c8" d="M5.822 11.648c-2.076.129-3.705 1.911-3.705 4.083v.408c0 .146.117.265.263.265h.53a.265.265 0 0 1-.264-.265v-.408c0-2.172 1.63-3.954 3.706-4.083h-.53z" paint-order="stroke fill markers" opacity="1" data-original="#3385c8"></path><path fill="#a0c7e7" d="m6.427 10.926-.795.793a.265.265 0 0 0 0 .373l1.854 1.851c.103.103.27.103.373 0l.608-.605.607.605c.103.103.27.103.373 0l1.852-1.851a.265.265 0 0 0 0-.373l-.793-.793a.265.265 0 0 0-.375 0L8.467 12.59 6.8 10.926a.265.265 0 0 0-.189-.078.265.265 0 0 0-.184.078z" opacity="1" data-original="#a0c7e7"></path><path fill="#5299d3" d="m8.334.562-6.88 3.661a.234.234 0 0 0 .014.428l3.994 1.83.119-.218h5.77l.118.219 3.996-1.831a.234.234 0 0 0 .014-.428L8.599.563a.287.287 0 0 0-.266 0z" opacity="1" data-original="#5299d3"></path><path fill="#ffb889" d="M5.86 7.087c-.553 0-.987.478-.987 1.04 0 .56.434 1.04.986 1.04a.913.913 0 0 0 .227-.032V7.116a.938.938 0 0 0-.227-.029z" opacity="1" data-original="#ffb889"></path><path fill="#ffccaa" d="M12.061 8.127c0 .56-.434 1.04-.986 1.04a.913.913 0 0 1-.227-.032V7.116a.938.938 0 0 1 .227-.029c.552 0 .986.478.986 1.04z" opacity="1" data-original="#ffccaa"></path><path fill="#356287" d="M8.467 4.462c-.823 0-1.565.074-2.121.205-.278.066-.51.143-.694.248-.182.104-.354.264-.357.502-.016.078-.198 1.039.543 1.778l.078.078h5.101l.077-.078c.74-.74.56-1.7.545-1.778-.004-.238-.176-.398-.358-.502a2.613 2.613 0 0 0-.693-.248c-.556-.131-1.299-.205-2.121-.205z" opacity="1" data-original="#356287"></path><path fill="#2c5170" d="M6.346 4.667c-.278.066-.51.143-.694.248-.181.104-.354.264-.358.502-.015.078-.197 1.039.544 1.778l.078.078h.53l-.079-.078c-.74-.739-.559-1.7-.544-1.778.004-.238.177-.398.359-.502.183-.105.415-.182.693-.248.495-.117 1.141-.185 1.856-.2-.088-.001-.174-.005-.264-.005-.823 0-1.565.074-2.121.205z" opacity="1" data-original="#2c5170"></path><path fill="#ffccaa" d="M7.812 5.316a.265.265 0 0 0-.267.262 1.075 1.075 0 0 1-1.076 1.068h-.444a.265.265 0 0 0-.263.264v1.328c0 1.492 1.21 2.7 2.705 2.7a2.702 2.702 0 0 0 2.705-2.7V6.91a.265.265 0 0 0-.264-.264H9.353c-.643 0-1.185-.47-1.283-1.106a.265.265 0 0 0-.258-.224z" opacity="1" data-original="#ffccaa"></path><path fill="#eeeeee" d="m3.44 3.167-.53.282v3.694h.53z" opacity="1" data-original="#eeeeee"></path><path fill="#ffca28" d="M2.911 6.614a.265.265 0 0 0-.265.264v2.389c0 .147.119.266.265.265h.529c.146 0 .264-.119.263-.265v-2.39a.265.265 0 0 0-.263-.263z" opacity="1" data-original="#ffca28"></path><path fill="#a0c7e7" d="M8.467 2.91c-.823 0-1.565.076-2.12.202a2.746 2.746 0 0 0-.69.237.858.858 0 0 0-.24.182.477.477 0 0 0-.126.31v1.55c0 .008.003.015.004.023v.003c-.008.036-.05.266-.02.571.2-.196.299-.301.472-.422.146-.102.36-.24.827-.363.32-.085.728-.154 1.202-.19.222-.013.45-.021.69-.021s.47.008.691.02c.475.037.882.106 1.202.191.466.123.681.261.827.363.173.12.272.226.473.422a2.065 2.065 0 0 0-.02-.57l-.001-.004c0-.008.004-.015.004-.024V3.841a.477.477 0 0 0-.126-.31.858.858 0 0 0-.24-.182 2.745 2.745 0 0 0-.69-.237c-.555-.126-1.297-.201-2.12-.201z" opacity="1" data-original="#a0c7e7"></path><path fill="#ecb200" d="M2.911 6.614a.265.265 0 0 0-.265.264v2.39c0 .146.119.265.265.265h.529a.265.265 0 0 1-.265-.266v-2.39c0-.145.119-.263.265-.263z" opacity="1" data-original="#ecb200"></path><path fill="#74addc" d="M5.658 3.348a.86.86 0 0 0-.24.182.478.478 0 0 0-.127.311V5.39c0 .009.003.016.004.024v.003c-.008.036-.05.265-.02.57.2-.196.299-.3.472-.421l.062-.042.014-.107v-.003c0-.008-.003-.015-.003-.024V3.841c0-.123.058-.234.126-.31a.86.86 0 0 1 .241-.183c.183-.098.412-.172.69-.236.493-.112 1.14-.184 1.854-.198a12.811 12.811 0 0 0-.264-.003c-.823 0-1.565.075-2.12.201a2.746 2.746 0 0 0-.689.236z" opacity="1" data-original="#74addc"></path><path fill="#ffb889" d="M6.025 6.646a.265.265 0 0 0-.263.264v1.328c0 1.186.767 2.19 1.832 2.553a2.902 2.902 0 0 1-1.509-2.545V6.817c0-.062.021-.122.058-.17z" opacity="1" data-original="#ffb889"></path><g fill="#3385c8"><path d="M4.774 14.818a.265.265 0 0 0-.275.286v1.297h.527v-1.297a.265.265 0 0 0-.252-.286zM12.183 14.818a.265.265 0 0 0-.276.286v1.297h.527v-1.297a.265.265 0 0 0-.251-.286z" fill="#3385c8" opacity="1" data-original="#3385c8"></path></g></g></svg>`],
            ['Market Basket Analysis', 'Applied Apriori algorithm for consumer. Enabling trend analysis in Python.','https://github.com/Jerophin123/Market_Basket_Analysis_Sales.git',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 472 472" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M100 216h-8c-8.837 0-16 7.163-16 16v8c.026 22.08 17.92 39.974 40 40h8c8.837 0 16-7.163 16-16v-8c-.026-22.08-17.92-39.974-40-40z" style="" fill="#33bc00" data-original="#33bc00"></path><path d="M148 216h-8c-8.837 0-16 7.163-16 16v8c.026 22.08 17.92 39.974 40 40h8c8.837 0 16-7.163 16-16v-8c-.026-22.08-17.92-39.974-40-40z" style="" fill="#79d60d" data-original="#79d60d"></path><path d="M84 264h-8c-8.837 0-16 7.163-16 16v8c.026 22.08 17.92 39.974 40 40h8c8.837 0 16-7.163 16-16v-8c-.026-22.08-17.92-39.974-40-40z" style="" fill="#025902" data-original="#025902"></path><path d="M132 264h-8c-8.837 0-16 7.163-16 16v8c.026 22.08 17.92 39.974 40 40h8c8.837 0 16-7.163 16-16v-8c-.026-22.08-17.92-39.974-40-40z" style="" fill="#008100" data-original="#008100"></path><path d="M180 264h-8c-8.837 0-16 7.163-16 16v8c.026 22.08 17.92 39.974 40 40h8c8.837 0 16-7.163 16-16v-8c-.026-22.08-17.92-39.974-40-40z" style="" fill="#33bc00" data-original="#33bc00"></path><path d="m292.407 205.475 8.003-23.997 15.178 5.062-8.003 23.997-15.178-5.062zM324.411 205.439l8.003-23.997 15.178 5.062-8.003 23.997-15.178-5.062zM356.423 205.466l8.003-23.997 15.178 5.062-8.003 23.997-15.178-5.062z" style="" fill="#008100" data-original="#008100"></path><path d="M300 200c-13.255 0-24 10.745-24 24v40h48v-40c0-13.255-10.745-24-24-24z" style="" fill="#ff8800" data-original="#ff8800"></path><path d="M332 200c-13.255 0-24 10.745-24 24v40h48v-40c0-13.255-10.745-24-24-24z" style="" fill="#ff6536" data-original="#ff6536"></path><path d="M364 200c-13.255 0-24 10.745-24 24v40h48v-40c0-13.255-10.745-24-24-24z" style="" fill="#ff421d" data-original="#ff421d"></path><path d="M260 256h144v64H260v-64z" style="" fill="#ffa900" data-original="#ffa900"></path><path d="M444 328H28V136h16v176h384V136h16v192z" style="" fill="#763a02" data-original="#763a02"></path><path d="M212 0h48v112h-48V0zM164 112V0h-35.552L116 112h48z" style="" fill="#de0418" data-original="#de0418"></path><path d="M164 0h48v112h-48V0zM116 112 128.448 0h-35.56L68 112h48zM404 112 379.112 0h-35.56L356 112h48z" style="" fill="#fbbf00" data-original="#fbbf00"></path><path d="M92.888 0H68L20 96v16h48L92.888 0zM356 112 343.552 0H308v112h48z" style="" fill="#de0418" data-original="#de0418"></path><path d="M260 0h48v112h-48V0z" style="" fill="#fbbf00" data-original="#fbbf00"></path><path d="M404 0h-24.888L404 112h48V96L404 0z" style="" fill="#de0418" data-original="#de0418"></path><path d="M20 112v24c0 13.255 10.745 24 24 24s24-10.745 24-24v-24H20z" style="" fill="#ff421d" data-original="#ff421d"></path><path d="M68 112v24c0 13.255 10.745 24 24 24s24-10.745 24-24v-24H68z" style="" fill="#ffdb0c" data-original="#ffdb0c" class=""></path><path d="M116 112v24c0 13.255 10.745 24 24 24s24-10.745 24-24v-24h-48z" style="" fill="#ff421d" data-original="#ff421d"></path><path d="M164 112v24c0 13.255 10.745 24 24 24s24-10.745 24-24v-24h-48z" style="" fill="#ffdb0c" data-original="#ffdb0c" class=""></path><path d="M212 112v24c0 13.255 10.745 24 24 24s24-10.745 24-24v-24h-48z" style="" fill="#ff421d" data-original="#ff421d"></path><path d="M260 112v24c0 13.255 10.745 24 24 24s24-10.745 24-24v-24h-48z" style="" fill="#ffdb0c" data-original="#ffdb0c" class=""></path><path d="M308 112v24c0 13.255 10.745 24 24 24s24-10.745 24-24v-24h-48z" style="" fill="#ff421d" data-original="#ff421d"></path><path d="M356 112v24c0 13.255 10.745 24 24 24s24-10.745 24-24v-24h-48z" style="" fill="#ffdb0c" data-original="#ffdb0c" class=""></path><path d="M404 136c0 13.255 10.745 24 24 24s24-10.745 24-24v-24h-48v24z" style="" fill="#ff421d" data-original="#ff421d"></path><path d="M12 312h448v160H12V312z" style="" fill="#ffdb0c" data-original="#ffdb0c" class=""></path><path d="M284 280h96v16h-96v-16z" style="" fill="#e47700" data-original="#e47700"></path><path d="m294.343 362.363 24.002-24.002 11.314 11.314-24.002 24.002-11.314-11.314z" style="" fill="#33bc00" data-original="#33bc00"></path><path d="M308 368h24v16h-24v-16z" style="" fill="#33bc00" data-original="#33bc00"></path><path d="M283.28 352h-2.56a32.802 32.802 0 0 0-26.632 13.704l-30.344 42.488c-6.455 9.045-4.356 21.61 4.689 28.065A20.122 20.122 0 0 0 240.12 440h1.024a20.272 20.272 0 0 0 8.992-2.12l47.784-23.896c16.162-8.083 22.711-27.738 14.628-43.9A32.72 32.72 0 0 0 283.28 352z" style="" fill="#ff6536" data-original="#ff6536"></path><path d="M196 360h-8c-8.837 0-16 7.163-16 16v8c.035 30.913 25.087 55.965 56 56h8c8.837 0 16-7.163 16-16v-8c-.035-30.913-25.087-55.965-56-56z" style="" fill="#79d60d" data-original="#79d60d"></path></g></svg>`],
            ['Log Analyzer', 'Built a Python tool which Analyzed logs. It Visualized data.','https://github.com/Jerophin123/log_Analyser.git',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#a5c3dc" d="M136 496h240c17.673 0 32-14.327 32-32V96c0-17.673-14.327-32-32-32H184l-80 72v328c0 17.673 14.327 32 32 32z" opacity="1" data-original="#a5c3dc"></path><path fill="#d7e6f0" d="M88 448h240c17.673 0 32-14.327 32-32V48c0-17.673-14.327-32-32-32H136L56 88v328c0 17.673 14.327 32 32 32z" opacity="1" data-original="#d7e6f0"></path><path fill="#a5c3dc" d="M136 16v40c0 17.673-14.327 32-32 32H56zM112 184a8 8 0 0 1-8-8v-64a8 8 0 0 1 16 0v64a8 8 0 0 1-8 8zM160 184c-13.233 0-24-10.767-24-24v-32c0-13.233 10.767-24 24-24s24 10.767 24 24v32c0 13.233-10.767 24-24 24zm0-64c-4.411 0-8 3.589-8 8v32c0 4.411 3.589 8 8 8s8-3.589 8-8v-32c0-4.411-3.589-8-8-8zM160 280a8 8 0 0 1-8-8v-64a8 8 0 0 1 16 0v64a8 8 0 0 1-8 8zM112 280c-13.233 0-24-10.767-24-24v-32c0-13.233 10.767-24 24-24s24 10.767 24 24v32c0 13.233-10.767 24-24 24zm0-64c-4.411 0-8 3.589-8 8v32c0 4.411 3.589 8 8 8s8-3.589 8-8v-32c0-4.411-3.589-8-8-8zM256 280a8 8 0 0 1-8-8v-64a8 8 0 0 1 16 0v64a8 8 0 0 1-8 8zM208 280c-13.233 0-24-10.767-24-24v-32c0-13.233 10.767-24 24-24s24 10.767 24 24v32c0 13.233-10.767 24-24 24zm0-64c-4.411 0-8 3.589-8 8v32c0 4.411 3.589 8 8 8s8-3.589 8-8v-32c0-4.411-3.589-8-8-8zM304 280c-13.233 0-24-10.767-24-24v-32c0-13.233 10.767-24 24-24s24 10.767 24 24v32c0 13.233-10.767 24-24 24zm0-64c-4.411 0-8 3.589-8 8v32c0 4.411 3.589 8 8 8s8-3.589 8-8v-32c0-4.411-3.589-8-8-8zM208 184a8 8 0 0 1-8-8v-64a8 8 0 0 1 16 0v64a8 8 0 0 1-8 8zM256 184c-13.233 0-24-10.767-24-24v-32c0-13.233 10.767-24 24-24s24 10.767 24 24v32c0 13.233-10.767 24-24 24zm0-64c-4.411 0-8 3.589-8 8v32c0 4.411 3.589 8 8 8s8-3.589 8-8v-32c0-4.411-3.589-8-8-8zM304 184a8 8 0 0 1-8-8v-64a8 8 0 0 1 16 0v64a8 8 0 0 1-8 8zM112 376a8 8 0 0 1-8-8v-64a8 8 0 0 1 16 0v64a8 8 0 0 1-8 8zM160 376c-13.233 0-24-10.767-24-24v-32c0-13.233 10.767-24 24-24s24 10.767 24 24v32c0 13.233-10.767 24-24 24zm0-64c-4.411 0-8 3.589-8 8v32c0 4.411 3.589 8 8 8s8-3.589 8-8v-32c0-4.411-3.589-8-8-8zM208 376a8 8 0 0 1-8-8v-64a8 8 0 0 1 16 0v64a8 8 0 0 1-8 8zM256 376c-13.233 0-24-10.767-24-24v-32c0-13.233 10.767-24 24-24s24 10.767 24 24v32c0 13.233-10.767 24-24 24zm0-64c-4.411 0-8 3.589-8 8v32c0 4.411 3.589 8 8 8s8-3.589 8-8v-32c0-4.411-3.589-8-8-8zM304 376a8 8 0 0 1-8-8v-64a8 8 0 0 1 16 0v64a8 8 0 0 1-8 8z" opacity="1" data-original="#a5c3dc"></path><path fill="#2387c3" d="M216 384h224c8.837 0 16-7.163 16-16v-96c0-8.837-7.163-16-16-16H216c-8.837 0-16 7.163-16 16v96c0 8.837 7.163 16 16 16z" opacity="1" data-original="#2387c3"></path><path fill="#d7e6f0" d="M280 360h-32c-8.822 0-16-7.178-16-16v-56a8 8 0 0 1 16 0v56h32a8 8 0 0 1 0 16zM336 360h-24c-8.822 0-16-7.178-16-16v-48c0-8.822 7.178-16 16-16h24c8.822 0 16 7.178 16 16v48c0 8.822-7.178 16-16 16zm-24-64v48h24.01l-.01-48zM408 360h-24c-8.822 0-16-7.178-16-16v-48c0-8.822 7.178-16 16-16h32a8 8 0 0 1 0 16h-32v48h24v-16a8 8 0 0 1 0-16c8.822 0 16 7.178 16 16v16c0 8.822-7.178 16-16 16z" opacity="1" data-original="#d7e6f0"></path></g></svg>`],
            ['Fitness Tracking Dashboard', 'Intuitive health dashboard. Built in Figma. Especially for fitness lovers.','https://www.figma.com/proto/2oFTi1cFy7noVn5dwgYYUX/Untitled?node-id=1-2&t=ZiibMn9AUuK20g2q-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g fill-rule="evenodd" clip-rule="evenodd"><path fill="#64b5f6" d="M42.27 9h427.46C488.029 9 503 23.971 503 42.27v427.46c0 18.298-14.971 33.27-33.27 33.27H42.27C23.971 503 9 488.029 9 469.73V42.27C9 23.971 23.971 9 42.27 9z" opacity="1" data-original="#64b5f6" class=""></path><path fill="#e6f8ff" d="M49.57 128.861h412.862c3.3 0 6 2.7 6 6v327.57c0 3.3-2.7 6-6 6H49.57c-3.3 0-6-2.7-6-6v-327.57c0-3.3 2.7-6 6-6z" opacity="1" data-original="#e6f8ff" class=""></path><path fill="#004960" d="M9 94.292h494V42.27C503 23.971 488.029 9 469.73 9H42.27C23.971 9 9 23.971 9 42.27z" opacity="1" data-original="#004960" class=""></path><path fill="#fc685b" d="M63.702 62.647c6.058 0 11-4.941 11-11s-4.941-11-11-11-11 4.941-11 11c0 6.058 4.942 11 11 11z" opacity="1" data-original="#fc685b"></path><path fill="#ffda2d" d="M109.311 62.647c6.059 0 11-4.941 11-11s-4.941-11-11-11c-6.058 0-11 4.941-11 11 0 6.058 4.942 11 11 11z" opacity="1" data-original="#ffda2d"></path><circle cx="154.921" cy="51.646" r="11" fill="#72d561" transform="rotate(-2.06 153.384 51.18)" opacity="1" data-original="#72d561"></circle><path fill="#eff4f7" d="M454.223 43.646a8 8 0 0 1 0 16H309.424a8 8 0 0 1 0-16z" opacity="1" data-original="#eff4f7"></path><path fill="#64b5f6" d="M33.57 290.646H248V118.861h16v171.785h214.431v16H264v171.785h-16V306.646H33.57z" opacity="1" data-original="#64b5f6" class=""></path><path fill="#ffda2d" d="M362.216 150.366c46.674 0 84.512 37.837 84.512 84.512 0 15.396-4.119 29.83-11.313 42.262l-25.974-14.996c4.641-8.021 7.299-17.333 7.299-27.266 0-30.113-24.411-54.524-54.524-54.524s-54.524 24.411-54.524 54.524c0 9.933 2.657 19.244 7.298 27.265l-25.974 14.996c-7.193-12.432-11.312-26.865-11.312-42.261 0-46.674 37.837-84.512 84.512-84.512z" opacity="1" data-original="#ffda2d"></path><path fill="#ffc700" d="m334.949 187.651-14.997-25.974a84.924 84.924 0 0 0-30.938 30.939c-7.193 12.432-11.31 26.867-11.31 42.263h29.988c0-9.933 2.656-19.246 7.297-27.266a54.782 54.782 0 0 1 19.96-19.962z" opacity="1" data-original="#ffc700"></path><path fill="#72d561" d="M319.953 161.677a84.924 84.924 0 0 0-30.938 30.939l25.974 14.996a54.797 54.797 0 0 1 19.961-19.961c8.021-4.641 17.333-7.297 27.267-7.297v-29.988c-15.397 0-29.832 4.117-42.264 11.311z" opacity="1" data-original="#72d561"></path><path fill="#3cbe52" d="M362.216 156.926v-6.56c-15.396 0-29.831 4.117-42.263 11.311l14.997 25.974c8.021-4.641 17.333-7.297 27.267-7.297 9.933 0 19.245 2.656 27.266 7.297l14.996-25.975c-12.432-7.193-26.867-11.31-42.262-11.31v6.56z" opacity="1" data-original="#3cbe52"></path><path fill="#64b5f6" d="M404.479 161.677c-12.432-7.193-26.867-11.31-42.262-11.31v29.988c9.933 0 19.246 2.656 27.266 7.297a54.79 54.79 0 0 1 19.961 19.961l25.974-14.996a84.929 84.929 0 0 0-30.939-30.94z" opacity="1" data-original="#64b5f6" class=""></path><path fill="#42a5f5" d="M435.417 192.615a84.919 84.919 0 0 0-30.939-30.939l-14.996 25.975a54.79 54.79 0 0 1 19.961 19.961c4.641 8.021 7.297 17.333 7.297 27.266h29.988c-.001-15.396-4.118-29.83-11.311-42.263z" opacity="1" data-original="#42a5f5"></path><path fill="#fc685b" d="M446.727 234.878c0-15.396-4.117-29.831-11.31-42.263l-25.974 14.996c4.641 8.021 7.297 17.333 7.297 27.266 0 9.934-2.658 19.245-7.299 27.266l25.974 14.996c7.193-12.431 11.312-26.864 11.312-42.261z" opacity="1" data-original="#fc685b"></path><path fill="#f35244" d="M435.414 277.14c7.193-12.432 11.313-26.866 11.313-42.262h-29.988c0 9.934-2.658 19.245-7.299 27.266z" opacity="1" data-original="#f35244"></path><path fill="#8d9ca8" d="M389.578 209.883a7.966 7.966 0 0 1 7.937 13.813l-31.331 18.089a7.966 7.966 0 0 1-7.937-13.813z" opacity="1" data-original="#8d9ca8" class=""></path><path fill="#64b5f6" d="M362.216 250.002c8.33 0 15.124-6.794 15.124-15.124s-6.794-15.124-15.124-15.124-15.124 6.794-15.124 15.124c-.001 8.33 6.794 15.124 15.124 15.124z" opacity="1" data-original="#64b5f6" class=""></path><circle cx="149.785" cy="213.754" r="63.77" fill="#72d561" transform="rotate(-45 149.757 213.798)" opacity="1" data-original="#72d561"></circle><path fill="#ffda2d" d="M149.785 149.983v63.77l58.569 25.266c3.347-7.748 5.201-16.291 5.201-25.267 0-35.218-28.551-63.769-63.77-63.769z" opacity="1" data-original="#ffda2d"></path><path fill="#fc685b" d="m208.354 239.02-58.569-25.267-38.294 50.997c10.664 8.02 23.924 12.773 38.294 12.773 26.243 0 48.784-15.852 58.569-38.503z" opacity="1" data-original="#fc685b"></path><ellipse cx="149.785" cy="213.754" fill="#eff4f7" rx="26.765" ry="26.764" transform="rotate(-86.85 149.648 213.631)" opacity="1" data-original="#eff4f7"></ellipse><path fill="#fc685b" d="M296.683 420.292h14.228c2.203 0 4 1.797 4 4v19.969c0 2.203-1.797 4-4 4h-14.228c-2.203 0-4-1.797-4-4v-19.969c0-2.203 1.797-4 4-4z" opacity="1" data-original="#fc685b"></path><path fill="#ffda2d" d="M338.833 399.945h14.228c2.203 0 4 1.797 4 4v40.317c0 2.203-1.797 4-4 4h-14.228c-2.203 0-4-1.797-4-4v-40.317c0-2.203 1.797-4 4-4z" opacity="1" data-original="#ffda2d"></path><path fill="#72d561" d="M380.982 379.596h14.228c2.203 0 4 1.797 4 4v60.666c0 2.203-1.797 4-4 4h-14.228c-2.203 0-4-1.797-4-4v-60.666a4.009 4.009 0 0 1 4-4z" opacity="1" data-original="#72d561"></path><path fill="#64b5f6" d="M423.132 359.249h14.228c2.203 0 4 1.797 4 4v81.013c0 2.203-1.797 4-4 4h-14.228c-2.203 0-4-1.797-4-4v-81.013c0-2.203 1.797-4 4-4z" opacity="1" data-original="#64b5f6" class=""></path><path fill="#8d9ca8" d="m395.438 340.092-87.083 50.278a7.981 7.981 0 0 1-8-13.812l87.093-50.283a7.991 7.991 0 0 1 4.405-15.302l19.366 3.834a7.991 7.991 0 0 1 5.911 10.758l-6.242 18.338a7.985 7.985 0 0 1-15.45-3.811z" opacity="1" data-original="#8d9ca8" class=""></path><path fill="#e2e3e3" d="M82.823 328.103a4.58 4.58 0 0 0-4.571 4.57V445.55a4.58 4.58 0 0 0 4.571 4.57h133.924a4.58 4.58 0 0 0 4.571-4.57V332.673a4.578 4.578 0 0 0-4.57-4.57z" opacity="1" data-original="#e2e3e3"></path><path fill="#fc685b" d="M161.612 413.157a8 8 0 0 1 0-16h6.823a8 8 0 0 1 0 16zm30.476 23.179a8 8 0 0 1 0-16h6.823a8 8 0 0 1 0 16zm-30.476 0a8 8 0 0 1 0-16h6.823a8 8 0 0 1 0 16zm-30.477 0a8 8 0 0 1 0-16h6.823a8 8 0 0 1 0 16zm60.953-23.179a8 8 0 0 1 0-16h6.823a8 8 0 0 1 0 16z" opacity="1" data-original="#fc685b"></path><path fill="#64b5f6" d="M100.658 436.336a8 8 0 0 1 0-16h6.824a8 8 0 0 1 0 16zm0-46.359a8 8 0 0 1 0-16h6.824a8 8 0 0 1 0 16zm0 23.18a8 8 0 0 1 0-16h6.824a8 8 0 0 1 0 16zm30.477 0a8 8 0 0 1 0-16h6.823a8 8 0 0 1 0 16zm60.953-23.18a8 8 0 0 1 0-16h6.823a8 8 0 0 1 0 16zm-30.476 0a8 8 0 0 1 0-16h6.823a8 8 0 0 1 0 16zm-30.477 0a8 8 0 0 1 0-16h6.823a8 8 0 0 1 0 16z" opacity="1" data-original="#64b5f6" class=""></path><path fill="#004960" d="M221.318 361.249v-28.576a4.578 4.578 0 0 0-4.57-4.57H82.823a4.58 4.58 0 0 0-4.571 4.57v28.576z" opacity="1" data-original="#004960" class=""></path><path fill="#e2e3e3" d="M206.309 335.88a8 8 0 0 1-16 0v-15.556a8 8 0 0 1 16 0zm-97.047.001a8 8 0 0 1-16 0v-15.556a8 8 0 0 1 16 0zm24.261 0a8 8 0 0 1-16 0v-15.556a8 8 0 0 1 16 0zm24.262 0a8 8 0 0 1-16 0v-15.556a8 8 0 0 1 16 0zm24.262-.001a8 8 0 0 1-16 0v-15.556a8 8 0 0 1 16 0z" opacity="1" data-original="#e2e3e3"></path></g></g></svg>`],
            ['Geolocation Attendance', 'Python project combining GPS. With biometric authentication.','https://github.com/Jerophin123/Geo-Attendance.git',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 135.467 135.467" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g paint-order="markers fill stroke"><path fill="#5bb774" d="M25.225 90.63c-5 0-8.134 2.387-9.21 6.658l-6.972 27.71c-1.075 4.27 1.774 9.092 6.178 9.092h104.825c4.404 0 7.633-4.822 6.558-9.093l-6.972-27.709c-1.075-4.271-4.209-6.658-9.21-6.658z" opacity="1" data-original="#5bb774"></path><path fill="#ffc45c" d="M25.225 90.63c-5 0-8.134 2.387-9.21 6.658L11.9 113.645h83.944l5.871-23.015z" opacity="1" data-original="#ffc45c"></path><path fill="#2196f3" d="m11.9 113.645-2.857 11.352c-1.075 4.271 1.774 9.093 6.178 9.093h45.551l5.478-20.445z" opacity="1" data-original="#2196f3"></path><path fill="#d9defb" d="m94.878 90.63-3.95 16.188h-77.31l-3.335 13.25H57.88l-3.757 14.022H67.84l3.757-14.021h24.405a6.626 6.626 0 0 0 6.397-4.9l6.083-24.539z" opacity="1" data-original="#d9defb"></path><path fill="#ffa14e" d="M57.506 90.63c5.073 6.095 9.801 10.05 12.65 10.05 8.624 0 16.903-3.955 24.139-10.05z" opacity="1" data-original="#ffa14e"></path></g><path fill="#f45558" d="M107.733 41.579c0 22.091-31.04 58.943-40 58.943-8.243 0-40-36.852-40-58.943s17.91-40 40-40c22.091 0 40 17.909 40 40z" paint-order="markers fill stroke" opacity="1" data-original="#f45558"></path><path fill="#db375b" d="M87.034 43.387A15.714 15.714 0 0 1 71.32 59.101a15.714 15.714 0 0 1-15.714-15.714A15.714 15.714 0 0 1 71.32 27.673a15.714 15.714 0 0 1 15.714 15.714z" paint-order="markers fill stroke" opacity="1" data-original="#db375b"></path><path fill="#d9defb" d="M83.448 37.523a15.714 15.714 0 0 1-15.715 15.714A15.714 15.714 0 0 1 52.02 37.523 15.714 15.714 0 0 1 67.733 21.81a15.714 15.714 0 0 1 15.715 15.714z" paint-order="markers fill stroke" opacity="1" data-original="#d9defb"></path><path fill="#ec4676" d="M18.323 96.568v1.059h2.118v-1.059zm5.291 0v1.059h2.117v-1.059zm5.291 0v1.059h2.117v-1.059zm5.293 0v1.059h2.118v-1.059zm5.292 0v1.059h2.117v-1.059zm5.29 0v1.059h2.117v-1.059zm5.293 0v1.059h2.118v-1.059zm5.292 0v1.059h2.116v-1.059z" opacity="1" data-original="#ec4676"></path><path fill="#007858" d="M72.88 127v1.06h2.116V127zm5.293 0v1.06h2.117V127zm5.29 0v1.06h2.117V127zm5.291 0v1.06h2.117V127zm5.294 0v1.06h2.117V127zm5.29 0v1.06h2.117V127zm5.291 0v1.06h2.117V127zm5.294 0v1.06h2.117V127zm5.29 0v1.06h2.118V127zm5.291 0v1.06h2.117V127z" opacity="1" data-original="#007858"></path></g></svg>`],
            ['TorUnveil', 'Python tool to trace emails. Deanonymizes senders.','https://github.com/Jerophin123/Tor_Unveil.git',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#a04cd9" d="M477.74 127.99v19.35c0 61.21-24.81 116.62-64.92 156.74C372.7 344.19 317.28 369 256.07 369c-121.8 0-220.78-98.27-221.66-220.07l-.15-20.94C78.52 51.48 161.25 0 256 0s177.48 51.48 221.74 127.99z" opacity="1" data-original="#a04cd9"></path><path fill="#8a3cb8" d="M477.74 127.99C433.48 204.5 350.75 255.98 256 255.98S78.52 204.5 34.26 127.99C12.47 165.65 0 209.37 0 256c0 66.38 25.27 126.86 66.72 172.35h378.56C486.73 382.87 512 322.39 512 256c0-46.63-12.47-90.35-34.26-128.01z" opacity="1" data-original="#8a3cb8"></path><path fill="#e7f2ff" d="m256 125.48 44.264 204.056L256 512c-49.8 0-96.27-14.22-135.59-38.82-3.41-2.13-6.76-4.34-10.06-6.63-2.68-1.85-5.32-3.76-7.92-5.72-3.4-2.55-6.73-5.18-10-7.9a258.643 258.643 0 0 1-25.73-24.58V154.36z" opacity="1" data-original="#e7f2ff"></path><g fill="#392e6e"><circle cx="109.807" cy="371.811" r="20.135" fill="#392e6e" opacity="1" data-original="#392e6e"></circle><path d="M105.459 363.811H256.07v16H105.459z" fill="#392e6e" opacity="1" data-original="#392e6e"></path></g><path fill="#d0e8ff" d="M445.3 154.36v273.99c-7.58 8.32-15.7 16.13-24.31 23.39-3.09 2.6-6.23 5.13-9.43 7.59-.06.04-.11.09-.17.13a254.882 254.882 0 0 1-19.07 13.26C352.85 497.6 306.1 512 256 512V125.48z" opacity="1" data-original="#d0e8ff"></path><g fill="#392e6e"><path d="M188.695 290.056v-67.3h-50.647c-2.745-4.657-7.799-7.791-13.596-7.791-8.719 0-15.787 7.068-15.787 15.787s7.068 15.787 15.787 15.787c5.794 0 10.844-3.131 13.591-7.783h34.652v67.3h68.59v-16zM323.305 290.056v-67.3h50.647c2.745-4.657 7.799-7.791 13.596-7.791 8.719 0 15.787 7.068 15.787 15.787s-7.068 15.787-15.787 15.787c-5.794 0-10.844-3.131-13.591-7.783h-34.652v67.3h-68.59v-16z" fill="#392e6e" opacity="1" data-original="#392e6e"></path><circle cx="402.263" cy="371.811" r="20.135" fill="#392e6e" opacity="1" data-original="#392e6e"></circle><path d="M256 363.811h150.611v16H256z" fill="#392e6e" opacity="1" data-original="#392e6e"></path></g><path fill="#392e6e" d="m256 107.04 21.117 22.401L256 154.36H66.7v-47.32z" opacity="1" data-original="#392e6e"></path><path fill="#2b2256" d="M256 107.04h189.3v47.32H256z" opacity="1" data-original="#2b2256"></path><circle cx="372.356" cy="129.441" r="12.94" fill="#00eece" opacity="1" data-original="#00eece"></circle><circle cx="410.563" cy="129.441" r="12.94" fill="#ffdd46" opacity="1" data-original="#ffdd46"></circle><circle cx="331.544" cy="129.441" r="12.94" fill="#ff5b5a" opacity="1" data-original="#ff5b5a"></circle><path fill="#00ddc0" d="M282.057 447.96c-5.28-14.315-14.537-26.009-26.055-34.296-3.385 13.783-2.83 28.686 2.449 43.002 5.28 14.315 14.534 26.01 26.057 34.293 3.381-13.78 2.829-28.684-2.451-42.999z" opacity="1" data-original="#00ddc0"></path><path fill="#00eece" d="M229.945 447.96c5.279-14.315 14.537-26.009 26.055-34.296 3.385 13.783 2.83 28.686-2.449 43.002-5.28 14.315-14.535 26.01-26.057 34.293-3.381-13.78-2.828-28.684 2.451-42.999z" opacity="1" data-original="#00eece"></path><path fill="#00ddc0" d="m256.001 504.737 6.953-48.208-6.953-42.865c-8.782 13.001-13.908 28.671-13.908 45.539.001 16.867 5.127 32.538 13.908 45.534z" opacity="1" data-original="#00ddc0"></path><path fill="#00ccb1" d="M269.907 459.203c0-16.867-5.128-32.538-13.906-45.539v91.073c8.778-12.996 13.906-28.667 13.906-45.534z" opacity="1" data-original="#00ccb1"></path><path fill="#9dcfff" d="m256 232.938 40.974 128.733L256 453.753c-11.068 0-21.782-2.181-31.895-6.461-9.76-4.116-18.511-10.032-26.035-17.529-7.524-7.524-13.44-16.302-17.556-26.062-4.28-10.114-6.461-20.827-6.461-31.896a81.443 81.443 0 0 1 6.461-31.896c4.117-9.76 10.032-18.51 17.556-26.035a.822.822 0 0 1 .218-.218c15.757-15.648 25.162-36.558 25.162-58.775v-43.918z" opacity="1" data-original="#9dcfff"></path><path fill="#d0e8ff" d="M221.863 405.948c-9.117-9.117-14.141-21.242-14.141-34.139 0-12.893 5.023-25.018 14.141-34.135 9.117-9.117 21.242-14.141 34.139-14.141l5.763-7.914-5.763-8.916c-35.961 0-65.11 29.149-65.11 65.106 0 35.961 29.149 65.11 65.11 65.11l8.053-7.317-8.053-9.513c-12.897 0-25.022-5.023-34.139-14.141z" opacity="1" data-original="#d0e8ff"></path><path fill="#6e3096" d="M321.108 371.809c0-35.957-29.149-65.106-65.106-65.106v16.83c12.893 0 25.018 5.023 34.135 14.141 9.117 9.117 14.141 21.242 14.141 34.135 0 12.897-5.023 25.022-14.141 34.139-9.117 9.117-21.242 14.141-34.135 14.141v16.83c35.957 0 65.106-29.149 65.106-65.11z" opacity="1" data-original="#6e3096"></path><path fill="#d0e8ff" d="M245.663 382.149c-2.799-2.803-4.281-6.377-4.281-10.339 0-3.959 1.482-7.533 4.281-10.336 2.802-2.799 6.377-4.281 10.339-4.281l6.7-7.264-6.7-9.566c-8.4 0-16.299 3.271-22.237 9.212-5.942 5.938-9.213 13.837-9.213 22.234 0 8.4 3.271 16.299 9.213 22.237 5.938 5.942 13.837 9.212 22.237 9.212l6.7-10.167-6.7-6.663c-3.962.001-7.537-1.48-10.339-4.279z" opacity="1" data-original="#d0e8ff"></path><path fill="#6e3096" d="M287.448 371.809c0-8.397-3.271-16.296-9.213-22.234-5.938-5.942-13.837-9.212-22.234-9.212v16.83c3.959 0 7.533 1.482 10.336 4.281 2.799 2.802 4.281 6.377 4.281 10.336 0 3.962-1.482 7.537-4.281 10.339-2.802 2.799-6.377 4.281-10.336 4.281v16.83c8.397 0 16.296-3.271 22.234-9.212 5.942-5.939 9.213-13.838 9.213-22.239z" opacity="1" data-original="#6e3096"></path><path fill="#8a3cb8" d="M337.95 371.81c0 11.06-2.18 21.78-6.46 31.89-4.12 9.76-10.04 18.54-17.56 26.06-7.52 7.5-16.27 13.42-26.03 17.53-10.12 4.28-20.83 6.46-31.9 6.46V232.94l17.58-11.87 14.97-10.11v43.92c0 22.22 9.41 43.13 25.16 58.78.08.05.17.13.22.22 7.52 7.52 13.44 16.27 17.56 26.03 4.28 10.11 6.46 20.86 6.46 31.9z" opacity="1" data-original="#8a3cb8"></path><path fill="#a04cd9" d="M300.26 371.81c0 11.06-1.17 21.78-3.49 31.89-2.22 9.76-5.42 18.54-9.48 26.06-4.06 7.5-8.79 13.42-14.06 17.53-5.46 4.28-11.25 6.46-17.23 6.46V232.94l17.58-11.87v33.81c0 22.22 5.08 43.13 13.59 58.78.05.05.09.13.12.22 4.06 7.52 7.26 16.27 9.48 26.03 2.32 10.11 3.49 20.86 3.49 31.9z" opacity="1" data-original="#a04cd9"></path></g></svg>`],
            ['AUD', 'High-quality music player UI. Tailored for audiophiles.','https://www.behance.net/gallery/214231433/AUD-The-Music-Player-For-Audiophiles',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 64 64" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><linearGradient id="a" x1="5.6" x2="58.4" y1="32" y2="32" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffa68d"></stop><stop offset="1" stop-color="#fd3a84"></stop></linearGradient><path fill="url(#a)" d="M58.4 10.09v34.23a10.556 10.556 0 1 1-7.54-10.14V21.69a2.043 2.043 0 0 0-2.37-2.02l-20.01 3.18a2.043 2.043 0 0 0-1.73 2.02v24.56a10.569 10.569 0 1 1-7.76-10.2V14.76a6.067 6.067 0 0 1 5.06-5.99l27.22-4.68a6.092 6.092 0 0 1 7.13 6z" opacity="1" data-original="url(#a)"></path></g></svg>`],
            ['Shopsavyy','Modern e-commerce app with React & MUI. Real-time cart. Smooth shopping. Uname: admin , Pwd: admin','https://shopsavyy.vercel.app/',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#dadcde" d="M280 192a8 8 0 0 1-8-8v-80a56 56 0 0 0-112 0v80a8 8 0 0 1-16 0v-80a72 72 0 0 1 144 0v80a8 8 0 0 1-8 8z" opacity="1" data-original="#dadcde"></path><path fill="#eb423f" d="M296 472H24l16-320h240z" opacity="1" data-original="#eb423f"></path><path fill="#d13330" d="M360 472h-64l-16-320h64z" opacity="1" data-original="#d13330"></path><path fill="#a82a27" d="M328.47 431.99c-.16.01-.32.01-.48.01a8 8 0 0 1-7.98-7.53l-16-272c-.01-.16-.01-.31-.01-.47h16.02l15.97 271.53a8.007 8.007 0 0 1-7.52 8.46z" opacity="1" data-original="#a82a27"></path><path fill="#eba72e" d="M488 472h-64l-1-12.93v-.01L408 264h64l14.75 191.69v.01z" opacity="1" data-original="#eba72e"></path><path fill="#e09f2c" d="M456.8 431.96a7.322 7.322 0 0 1-.81.04 8 8 0 0 1-7.95-7.2l-.29-2.86-15.71-157.14a7.143 7.143 0 0 1-.04-.8h16.04l15.72 157.21.2 1.99a8 8 0 0 1-7.16 8.76z" opacity="1" data-original="#e09f2c"></path><path fill="#e09f2c" d="M488 472h-9.62L456 438.42 433.62 472H424l-1-12.93v-.01l24.75-37.12 1.59-2.38a8.01 8.01 0 0 1 13.32 0l1.1 1.65 22.99 34.48v.01z" opacity="1" data-original="#e09f2c"></path><path fill="#f7b030" d="M424 472H216l16-208h176z" opacity="1" data-original="#f7b030"></path><path fill="#e9eef2" d="M328 416h-16a40.045 40.045 0 0 1-40-40v-64a8 8 0 0 1 16 0v64a24.027 24.027 0 0 0 24 24h16a24.027 24.027 0 0 0 24-24v-64a8 8 0 0 1 16 0v64a40.045 40.045 0 0 1-40 40z" opacity="1" data-original="#e9eef2"></path><path fill="#dadcde" d="M96 184h16v48H96z" opacity="1" data-original="#dadcde"></path><path fill="#e9eef2" d="M104 192a8 8 0 0 1-8-8v-80a72 72 0 0 1 144 0v80a8 8 0 0 1-16 0v-80a56 56 0 0 0-112 0v80a8 8 0 0 1-8 8z" opacity="1" data-original="#e9eef2"></path><path fill="#f7b030" d="M128 296H80v-64l24-16 24 16z" opacity="1" data-original="#f7b030"></path></g></svg>`],
            ['Vote System','A Simple Online Voting Solution using block-chain','https://github.com/Jerophin123/Vote-System.git',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 60 60" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#bf3643" d="M52 39v18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V39z" opacity="1" data-original="#bf3643"></path><path fill="#dd3c44" d="M1 30.75V39a1 1 0 0 0 1 1h52a1 1 0 0 0 1-1v-8.25z" opacity="1" data-original="#dd3c44" class=""></path><path fill="#bf3643" d="M51.019 24a1.606 1.606 0 0 1 1.46.94l2.41 5.3a1.246 1.246 0 0 1-1.13 1.76H2.241a1.246 1.246 0 0 1-1.13-1.76l2.41-5.3a1.606 1.606 0 0 1 1.46-.94z" opacity="1" data-original="#bf3643"></path><path fill="#e6ebef" d="M18 28V7a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v21z" opacity="1" data-original="#e6ebef"></path><path fill="#e7bda0" d="M52 3h1v10h-1l-7 .97-9.14 3.35a2.265 2.265 0 0 1-.76.14 2.239 2.239 0 0 1-.76-4.34l6.38-2.34a1.921 1.921 0 0 0-.89-3.71L38 7.3V7a1 1 0 0 0-1-1h-8.84l.24-.31a3.852 3.852 0 0 1 1.5-1.18l7.07-3.17a3.869 3.869 0 0 1 2.15-.3z" opacity="1" data-original="#e7bda0"></path><rect width="7" height="12" x="52" y="2" fill="#152689" rx="1" opacity="1" data-original="#152689"></rect><path fill="#962c3b" d="M42 29H14a1 1 0 0 1 0-2h28a1 1 0 0 1 0 2z" opacity="1" data-original="#962c3b"></path></g></svg>`],
            ['Now Weather', 'Sleek React Native weather app. Real-time forecast. Offline ready.','https://github.com/Jerophin123/NowWeather.git',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 256 256" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g fill="none" stroke-miterlimit="10" stroke-width="0"><path fill="#ffbe00" d="M1.407 1.407h126.45v126.45H1.407z" opacity="1" data-original="#ffbe00"></path><path fill="#7bd8f7" d="M127.857 1.407h126.45v126.45h-126.45z" opacity="1" data-original="#7bd8f7"></path><path fill="#81bcda" d="M1.407 127.857h126.45v126.45H1.407z" opacity="1" data-original="#81bcda"></path><path fill="#4390b3" d="M127.857 127.857h126.45v126.45h-126.45z" opacity="1" data-original="#4390b3" class=""></path><g fill="#fff"><path d="M64.632 88.556c-13.471 0-24.427-10.959-24.427-24.427s10.959-24.427 24.427-24.427S89.059 50.66 89.059 64.129 78.103 88.556 64.632 88.556zm0-43.108c-10.299 0-18.68 8.38-18.68 18.681s8.379 18.68 18.68 18.68 18.68-8.379 18.68-18.68-8.381-18.68-18.68-18.68zM64.632 32.764a2.875 2.875 0 0 1-2.875-2.875v-8.868a2.875 2.875 0 1 1 5.75 0v8.871a2.874 2.874 0 0 1-2.875 2.872zM64.632 110.109a2.875 2.875 0 0 1-2.875-2.875v-8.87a2.875 2.875 0 1 1 5.75 0v8.87a2.875 2.875 0 0 1-2.875 2.875zM30.395 67h-8.871a2.875 2.875 0 1 1 0-5.748h8.871a2.875 2.875 0 1 1 0 5.749zM107.74 67H98.87a2.875 2.875 0 1 1 0-5.748h8.871a2.875 2.875 0 1 1 0 5.749zM88.843 42.793c-.736 0-1.47-.281-2.032-.843a2.87 2.87 0 0 1 0-4.064l6.272-6.272a2.87 2.87 0 0 1 4.064 0 2.87 2.87 0 0 1 0 4.064l-6.272 6.272a2.867 2.867 0 0 1-2.032.843zM34.15 97.484c-.737 0-1.47-.281-2.033-.843a2.87 2.87 0 0 1 0-4.064l6.272-6.271a2.87 2.87 0 0 1 4.064 0 2.87 2.87 0 0 1 0 4.063L36.18 96.64a2.857 2.857 0 0 1-2.032.843zM40.421 42.793c-.736 0-1.47-.281-2.032-.843l-6.272-6.272a2.87 2.87 0 0 1 0-4.063 2.87 2.87 0 0 1 4.064 0l6.272 6.271a2.87 2.87 0 0 1 0 4.064 2.857 2.857 0 0 1-2.032.843zM95.112 97.484c-.736 0-1.47-.281-2.032-.843l-6.271-6.272a2.87 2.87 0 0 1 0-4.063 2.87 2.87 0 0 1 4.063 0l6.272 6.271a2.87 2.87 0 0 1 0 4.064 2.857 2.857 0 0 1-2.032.843zM191.082 102.927c-12.15 0-22.033-11.08-22.033-24.697 0-11.353 5.35-20.008 10.523-28.373 4.44-7.182 8.635-13.968 8.635-21.648 0-1.588 1.285-2.875 2.875-2.875s2.875 1.287 2.875 2.875c0 7.682 4.195 14.466 8.635 21.648 5.176 8.368 10.523 17.02 10.523 28.373 0 13.617-9.883 24.697-22.033 24.697zm0-62.006c-1.804 4.165-4.232 8.093-6.62 11.957-4.752 7.685-9.667 15.632-9.667 25.352 0 10.447 7.306 18.95 16.287 18.95s16.287-8.5 16.287-18.95c0-9.72-4.915-17.667-9.667-25.352-2.388-3.864-4.816-7.792-6.62-11.957zM57.45 178.164a2.873 2.873 0 0 1-2.493-1.435l-10.776-18.667a2.873 2.873 0 0 1 1.054-3.926 2.87 2.87 0 0 1 3.925 1.054l10.776 18.667a2.873 2.873 0 0 1-2.486 4.307zM82.596 221.717a2.873 2.873 0 0 1-2.492-1.436l-10.776-18.667a2.873 2.873 0 0 1 1.053-3.926 2.87 2.87 0 0 1 3.926 1.054l10.776 18.667a2.873 2.873 0 0 1-2.487 4.308z" fill="#ffffff" opacity="1" data-original="#ffffff"></path><path d="M51.464 167.796c-.222 0-.444-.026-.668-.08l-7.478-1.78a2.875 2.875 0 0 1-2.13-3.46 2.882 2.882 0 0 1 3.462-2.13l7.478 1.782a2.873 2.873 0 0 1-.663 5.668z" fill="#ffffff" opacity="1" data-original="#ffffff"></path><path d="M51.462 167.796a2.872 2.872 0 0 1-2.757-3.692l2.195-7.369a2.872 2.872 0 0 1 5.507 1.639l-2.194 7.367a2.865 2.865 0 0 1-2.751 2.055zM75.61 220.79c-.272 0-.547-.04-.823-.122a2.872 2.872 0 0 1-1.933-3.571l2.195-7.368a2.876 2.876 0 0 1 3.574-1.933 2.872 2.872 0 0 1 1.933 3.571l-2.194 7.368a2.873 2.873 0 0 1-2.751 2.054z" fill="#ffffff" opacity="1" data-original="#ffffff"></path><path d="M85.283 215.203c-.222 0-.444-.025-.67-.079l-7.476-1.781a2.875 2.875 0 0 1-2.13-3.46 2.881 2.881 0 0 1 3.461-2.13l7.478 1.782a2.873 2.873 0 0 1-.663 5.668zM71.814 178.164a2.876 2.876 0 0 1-2.487-4.31l10.777-18.667a2.877 2.877 0 0 1 3.925-1.054 2.876 2.876 0 0 1 1.054 3.926l-10.776 18.667a2.874 2.874 0 0 1-2.493 1.438zM46.668 221.717a2.876 2.876 0 0 1-2.487-4.31l10.776-18.668a2.872 2.872 0 0 1 3.926-1.054 2.876 2.876 0 0 1 1.053 3.926L49.16 220.278a2.87 2.87 0 0 1-2.492 1.439z" fill="#ffffff" opacity="1" data-original="#ffffff"></path><path d="M77.8 167.796a2.876 2.876 0 0 1-2.793-2.21 2.87 2.87 0 0 1 2.13-3.458l7.477-1.782a2.875 2.875 0 0 1 3.462 2.13 2.87 2.87 0 0 1-2.13 3.46l-7.478 1.78a2.878 2.878 0 0 1-.668.08z" fill="#ffffff" opacity="1" data-original="#ffffff"></path><path d="M77.802 167.796a2.88 2.88 0 0 1-2.753-2.055l-2.195-7.367a2.87 2.87 0 0 1 1.933-3.572 2.875 2.875 0 0 1 3.575 1.933l2.194 7.368a2.87 2.87 0 0 1-2.754 3.693zM53.653 220.79a2.88 2.88 0 0 1-2.753-2.055l-2.195-7.368c-.452-1.52.413-3.122 1.933-3.571s3.122.41 3.575 1.933l2.194 7.368a2.87 2.87 0 0 1-2.754 3.692z" fill="#ffffff" opacity="1" data-original="#ffffff"></path><path d="M43.981 215.203a2.876 2.876 0 0 1-2.793-2.209 2.87 2.87 0 0 1 2.13-3.459l7.478-1.781a2.875 2.875 0 0 1 3.461 2.13 2.87 2.87 0 0 1-2.13 3.459l-7.477 1.781a2.878 2.878 0 0 1-.669.079zM50.262 190.607H28.709a2.875 2.875 0 1 1 0-5.75h21.553c1.587 0 2.874 1.285 2.874 2.875s-1.287 2.875-2.874 2.875zM100.555 190.607H79.002a2.875 2.875 0 1 1 0-5.75h21.553c1.588 0 2.875 1.285 2.875 2.875s-1.287 2.875-2.875 2.875z" fill="#ffffff" opacity="1" data-original="#ffffff"></path><path d="M33.008 196.193a2.876 2.876 0 0 1-2.088-4.85l5.28-5.586a2.878 2.878 0 0 1 4.064-.112 2.876 2.876 0 0 1 .112 4.063l-5.28 5.586c-.565.599-1.326.9-2.088.9z" fill="#ffffff" opacity="1" data-original="#ffffff"></path><path d="M38.288 190.607c-.761 0-1.523-.3-2.088-.9l-5.28-5.583a2.874 2.874 0 1 1 4.176-3.95l5.28 5.583a2.876 2.876 0 0 1-2.088 4.85zM96.256 196.193c-.762 0-1.523-.3-2.088-.899l-5.28-5.586a2.873 2.873 0 1 1 4.176-3.95l5.28 5.585a2.876 2.876 0 0 1-2.088 4.85z" fill="#ffffff" opacity="1" data-original="#ffffff"></path><path d="M90.976 190.607a2.876 2.876 0 0 1-2.088-4.85l5.28-5.583a2.878 2.878 0 0 1 4.063-.113 2.876 2.876 0 0 1 .113 4.063l-5.28 5.584c-.565.598-1.327.9-2.088.9zM71.817 203.053h-14.37a2.876 2.876 0 0 1-2.49-1.436l-7.185-12.446a2.885 2.885 0 0 1 0-2.874l7.185-12.443a2.87 2.87 0 0 1 2.49-1.436h14.37c1.029 0 1.976.548 2.49 1.436l7.185 12.443c.511.89.511 1.983 0 2.874l-7.185 12.443a2.876 2.876 0 0 1-2.49 1.439zm-12.712-5.75h11.051l5.525-9.57-5.525-9.571H59.105l-5.525 9.57zM201.695 229.14a2.873 2.873 0 0 1-2.874-2.874 2.873 2.873 0 0 1 2.874-2.875c4.977 0 9.023-4.049 9.023-9.025s-4.046-9.026-9.023-9.026h-35.04a2.873 2.873 0 0 1-2.875-2.875 2.873 2.873 0 0 1 2.875-2.874h35.04c8.144 0 14.77 6.626 14.77 14.772s-6.623 14.778-14.77 14.778zM215.105 193.552h-59.946a2.873 2.873 0 0 1-2.875-2.875 2.873 2.873 0 0 1 2.875-2.874h59.946c4.976 0 9.025-4.05 9.025-9.026s-4.049-9.026-9.025-9.026c-1.588 0-2.875-1.284-2.875-2.874s1.284-2.875 2.875-2.875c8.146 0 14.772 6.626 14.772 14.772.003 8.152-6.623 14.778-14.772 14.778z" fill="#ffffff" opacity="1" data-original="#ffffff"></path><path d="M203.775 182.003h-31.472c-1.588 0-2.875-1.284-2.875-2.875s1.284-2.874 2.875-2.874h31.472c1.587 0 2.874 1.284 2.874 2.874s-1.284 2.875-2.874 2.875z" fill="#ffffff" opacity="1" data-original="#ffffff"></path></g></g></g></svg>`],
            ['GPACGPA','React Native app to track grades. Smooth UI. Dark/light mode.','https://github.com/Jerophin123/GPACGPA.git',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#f7f7f7" d="M458.125 277.279H82.622c-15.876 0-28.746-12.872-28.746-28.749 0-15.878 12.87-28.749 28.746-28.749h375.503c-9.235 17.88-9.235 39.617 0 57.498z" opacity="1" data-original="#f7f7f7"></path><path fill="#efefef" d="M458.125 219.78H82.622 427.22c-9.235 17.881-9.235 39.618 0 57.499h30.905c-9.235-17.881-9.235-39.618 0-57.499z" opacity="1" data-original="#efefef"></path><path fill="#ff815c" d="M86.809 301.224c-14.151 0-27.441-5.551-37.424-15.631-9.979-10.078-15.4-23.425-15.264-37.581.28-28.77 24.175-52.176 53.268-52.176h374.923c8.585 0 15.568 6.984 15.568 15.569s-6.984 15.569-15.568 15.569H86.809c-11.884 0-21.553 9.67-21.553 21.555s9.669 21.555 21.553 21.555h375.504c8.585 0 15.568 6.984 15.568 15.569s-6.984 15.569-15.568 15.569H86.809z" opacity="1" data-original="#ff815c"></path><path fill="#f7f7f7" d="M493.218 488.055H55.903c-15.876 0-28.746-12.872-28.746-28.749 0-15.878 12.87-28.749 28.746-28.749h437.314c-9.234 17.88-9.234 39.618.001 57.498z" opacity="1" data-original="#f7f7f7"></path><path fill="#efefef" d="M493.218 430.557h-30.905c-9.235 17.881-9.235 39.618 0 57.499h30.905c-9.235-17.881-9.235-39.619 0-57.499z" opacity="1" data-original="#efefef"></path><path fill="#ffe66b" d="M55.903 512c-14.151 0-27.441-5.551-37.424-15.631-9.979-10.078-15.4-23.425-15.264-37.581.28-28.77 24.175-52.176 53.268-52.176h436.734c8.585 0 15.568 6.984 15.568 15.569s-6.984 15.569-15.568 15.569H55.903c-11.884 0-21.553 9.67-21.553 21.555 0 11.886 9.669 21.555 21.553 21.555h437.314c8.585 0 15.568 6.984 15.568 15.57 0 8.585-6.984 15.569-15.568 15.569H55.903z" opacity="1" data-original="#ffe66b"></path><path fill="#f7f7f7" d="M18.782 325.168h437.314c15.876 0 28.746 12.872 28.746 28.749 0 15.878-12.87 28.749-28.746 28.749H18.782c9.235-17.88 9.235-39.617 0-57.498z" opacity="1" data-original="#f7f7f7"></path><path fill="#c9f0ff" d="M18.782 406.612c-8.584 0-15.568-6.984-15.568-15.569s6.984-15.569 15.568-15.569h437.314c11.884 0 21.553-9.67 21.553-21.555 0-11.886-9.669-21.555-21.553-21.555H18.782c-8.584 0-15.568-6.984-15.568-15.569s6.984-15.569 15.568-15.569h437.315c14.151 0 27.441 5.551 37.423 15.631 9.98 10.079 15.399 23.425 15.264 37.581-.28 28.77-24.175 52.176-53.268 52.176H18.782z" opacity="1" data-original="#c9f0ff"></path><path fill="#b5eaff" d="M493.52 316.855c-9.982-10.079-23.272-15.631-37.423-15.631h-30.905c14.151 0 27.441 5.551 37.423 15.631 9.98 10.079 15.399 23.425 15.264 37.581-.28 28.77-24.175 52.176-53.268 52.176h30.905c29.093 0 52.988-23.406 53.268-52.176.135-14.156-5.284-27.502-15.264-37.581z" opacity="1" data-original="#b5eaff"></path><path fill="#288a9a" d="M400.225 195.836h-288.45L142.68 91.778h226.64z" opacity="1" data-original="#288a9a"></path><path fill="#3498ac" d="M229.363 3.44 24.348 57.29c-10.99 2.887-10.99 18.488 0 21.375l205.015 53.85a104.842 104.842 0 0 0 53.274 0l205.015-53.85c10.99-2.887 10.99-18.488 0-21.375L282.637 3.44a104.842 104.842 0 0 0-53.274 0z" opacity="1" data-original="#3498ac"></path><path fill="#288a9a" d="M487.652 57.29 282.637 3.44a104.842 104.842 0 0 0-53.274 0l-31.152 8.182c14.36-2.3 29.08-1.594 43.218 2.119l205.015 53.85c10.99 2.887 10.99 18.488 0 21.375l41.207-10.302c10.992-2.886 10.992-18.487.001-21.374z" opacity="1" data-original="#288a9a"></path><path fill="#f7f7f7" d="M325.935 204.82a7.726 7.726 0 0 1-7.726-7.726v-72.396L250.81 63.585a7.727 7.727 0 0 1 10.38-11.448l69.935 63.413a7.727 7.727 0 0 1 2.536 5.724v75.82a7.726 7.726 0 0 1-7.726 7.726z" opacity="1" data-original="#f7f7f7"></path><path fill="#ffe66b" d="M348.168 240.547h-44.467s0-67.104 22.233-67.104c22.234 0 22.234 67.104 22.234 67.104z" opacity="1" data-original="#ffe66b"></path><path fill="#3498ac" d="M124.831 437.75 88.08 457.031V332.362h36.751z" opacity="1" data-original="#3498ac"></path><path fill="#ffe66b" d="M271.275 272.411c-9.608 5.884-20.963 5.892-30.551 0v-21.963c0-8.436 6.839-15.275 15.275-15.275s15.275 6.839 15.275 15.275v21.963z" opacity="1" data-original="#ffe66b"></path></g></svg>`]
          ].map(([title, desc, link, svg], index) => (
            <Grid item xs={12} sm={6} md={4} key={title}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Card
                  sx={{
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.1) 100%)',
                    backdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    marginTop: '30px',
                    borderRadius: '28px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.3), 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(255, 255, 255, 0.05), inset 1px 0 0 rgba(255, 255, 255, 0.1), inset -1px 0 0 rgba(255, 255, 255, 0.1)',
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
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
                      zIndex: 1
                    },
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      borderColor: 'rgba(77, 184, 255, 0.25)',
                      boxShadow: '0 15px 50px rgba(0, 0, 0, 0.15), 0 2px 0 rgba(255, 255, 255, 0.4), 0 -2px 0 rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 1px 0 0 rgba(255, 255, 255, 0.15), inset -1px 0 0 rgba(255, 255, 255, 0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>

                    {/* 🔵 Icon on Top */}
                   <Box
                      sx={{
                        mb: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        '& svg': {
                          width: '100px',    // 👈 reduce to any size you want
                          height: '100px',
                        }
                      }}
                      dangerouslySetInnerHTML={{ __html: svg }}
                    />

                    <Typography
                      variant="h6"
                      sx={{
                        color: '#4db8ff',
                        fontWeight: 600,
                        fontFamily: '"Poppins", sans-serif',
                        mb: 1,
                        textAlign: 'center',
                      }}
                    >
                      {title}
                    </Typography>

                    {desc.split('. ').map((line, i) => (
                      <Typography
                        key={i}
                        variant="body2"
                        sx={{
                          color: '#c0c0c0',
                          fontSize: '0.95rem',
                          fontFamily: '"Poppins", sans-serif',
                          lineHeight: 1.6,
                          textAlign: 'center',
                          mb: 0.5,
                        }}
                      >
                        {line.trim() + (line.endsWith('.') ? '' : '.')}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              </a>
            </Grid>
          ))}
        </Grid>
        </Section>
      </Box>
    </Box>
  }
/>

<Route
  path="/certifications"
  element={
    <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
      {/* 🌐 Background */}
    {/* 🔵 Spline Full Background or Dark Mobile Fallback */}
      {/* Custom Animated Background */}
      <AnimatedBackground />



      {/* 🧊 Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2))',
          zIndex: 1
        }}
      />

      {/* 🎯 Foreground Section */}
      <Box sx={{ position: 'relative', zIndex: 2, marginTop: '60px' }}>
        <Section title="Certifications" bg="transparent">
          <Grid
            container
            spacing={4}
            justifyContent="center"
            direction={{ xs: 'column', sm: 'column', md: 'row' }}
            alignItems={{ xs: 'center', md: 'stretch' }}
            sx={{ mt: 2 }}
          >
            {[
                ['Linguaskill – Cambridge Assessment English', 'Achieved CEFR Level C1 in English proficiency, validating advanced skills in reading, listening, speaking, and writing.','<svg xmlns="http://www.w3.org/2000/svg" width="2500" height="2500" viewBox="0 0 192.756 192.756"><path fill-rule="evenodd" clip-rule="evenodd" fill="#fff" d="M0 0h192.756v192.756H0V0z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#59595b" stroke="#000" stroke-width=".622" stroke-miterlimit="2.613" d="M59.276 25.275V51.75h26.267V25.275H59.276zM59.276 67.843s-2.627 16.841 14.347 26.475c5.165 2.932 11.92 6.702 11.92 6.702V67.843H59.276zM99.373 25.275V51.75h26.266V25.275H99.373zM99.373 68.031v33.313s7.189-3.568 13.512-7.704c6.467-4.232 9.873-9.828 9.873-9.828 5.277-8.204 3.338-15.782 3.338-15.782H99.373v.001z"/><path d="M114.438 40.411s-.271 2.15.775 3.2c1.043 1.051.879 1.327.879 1.77s-.33 1.106-.33 1.106-.881.995-1.43.995-.77.221-1.1-.111c-.367-.826-1.979-.442-1.979-.442s-.523-.072-.66.267c-.207.513-.551 1.06.77 1.06s.936-.388 1.32 0c.383.387-1.197.319-1.539.663-.469.469-.221 1.216.439 1.216.658 0 2.199-1.327 2.199-1.327 0 1.106 0 1.106.658 1.106.66 0 .881-.885.881-.885l.109-.885.66-.995s.879 1.328 1.43-.11c.549-1.438-.221-1.991-.221-1.991s1.004.318 1.43-.11c.426-.429.438-1.659.438-1.659l-1.539-4.091-3.19 1.223z" fill-rule="evenodd" clip-rule="evenodd" fill="#fff" stroke="#000" stroke-width=".31" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.613"/><path d="M104.438 32s-.225-1.82-.439-2.322c-.266-.612-1.32-1.659-1.65-1.327-.33.332-.658.995-.658 1.658v.664s0 1.326.549 1.326-.879-.774-.879 0-.439 1.217.109 1.77l.549.553s-.879.442-.439.885.111 1.093.551 1.536c.439.442 1.098.233 1.098.233s-.77.442-.77.995c0 .553.166.608.551.995.385.386 1.758.884 1.758.884s-1.152.83-.439 1.548c.715.719 1.1.664 1.43.332.33-.332 1.209-.664 1.209-.664l.77-.442s.109-.221.109.442c0 .664.387 1.05-.109 1.548-.494.498-.219.774-.549 1.106-.33.332-.881 1.105-.881 1.105l-1.098.995s.109-.995-.77-.995c-.881 0-1.541.11-1.541.553s-.406.381-.109.995c.299.614 1.43.354 1.43.553s-.881.774-.881.774-.988.995-.988 1.769.496 1.382.988.884c.496-.497.441-1.105.441-1.105h.549s.881-.553.881-1.106 0 .111.439.553 0 .442.439.442.99-.775.99-1.327c0-.553.328-1.548.328-1.548v-1.106s-.328 1.548.551 1.548.99-.774.99-.774v-1.879l-.441-1.106.879 1.327.441-.995-.086-.957-.025-.259.551-1.549s-.109.996.439.996c.551 0 .385.277 1.1-.442.99-.995.91-.636 1.402-.636.584 0 2.557-.055 2.557-.055s.879.028.879-.636c0-.663.166.94.881 1.659.713.719 1.152 1.382 1.646 1.88.498.498 1.211.884 1.211.884s.109.222.109.775c0 .552.166.718-.221 1.106-.383.387-.549.884-.549.884s-.439.111-.988.111c-.551 0-.99.552-.99.552l-.33.774s-.439.664.219.664c.662 0 .99-.553.99-.553s-.328-.221-.328.553-.193 1.01.328 1.01c.549 0 .727.315.99.095.361-.301.77-1.105.77-1.105l.33-.885s.107.111.107.885c-.184.774.615.599.441.774-.174.174.771 0 .771 0l-.111-.996.551-.553s-.172-.483-.561-.875c-.389-.391-.59-.844-.32-1.115.27-.271.518-.477.66-.332.463 0 .805-1.069.109-1.77l-.328-.331.328-1.217.33-.553s.43-.922 0-1.105c-.373-.159-.33-.332-.33-.332l-.219.884-.375.507-.506-.838s0-.884-.33-1.216c-.328-.332-.77-1.216-.77-1.216s-.33-.774-.879-.774.77.22 1.32.22c.549 0 1.539-.331 1.539-.884 0-.553.109-1.769.109-1.769l-.77-1.216-.99-.663h-.549l-.111.663-.328-1.105-.551-.664h-.879l.109.774-.77-.774-.33-.773-.988-.221s-.33.221-.33.664v-.442s-.068-1.513.66-1.327c1.277.327 2.061-.25 2.639.332.385.387 1.207 1.105 1.756 1.105.553 0 1.432-.221 1.762-.553s.66-.932.66-1.327c0-.84-.441-1.216-.441-1.216l-.508-.366-.26-.187s.158.834-.111 1.106c-.389.391-.33 0-.99 0s-1.562-.48-2.309-.774c-.746-.294-2.811 0-2.527 0s-1.186.6-1.43 1.216c-.264.664-.33 1.548-.33 1.991s.439.885.881 1.327c.438.442 1.152.607 1.539.995.383.387 1.207.332 1.539.663.328.332 1.428.553 1.428.553s.551 0 .881.332c.328.331.109.774.109.774s.439.332-.551.332-1.428-.442-1.979-.442-1.209-.442-1.758-.442c-.551 0-1.871-.11-2.42-.11h-.549c-.551 0-1.1-1.105-1.1-1.105l-.66-.553.549-.553-.109-2.655.66.333s.549.553.549-.664c0-1.216-.164-.829-.549-1.216s-.551-1.438-.551-1.438-.494-.166-.879.221-.549-.221-.549-.221.109-1.106-.332-1.106c-.439 0-.988-.111-.988.332 0 .442-.111.442-.111.884s-.109.221-.549.221-1.1-.885-1.1-.332c0 .553-.109 1.216-.109 1.216s-.109-.331-.549.111c-.439.442-.439.442-.439 1.105 0 .665-.002.886.549.886.549 0 .77-.553.77-.553s-.385 2.599 0 2.985.385-.332.385.387-.715.719-.715.719-.221 0-.221.885c0 .884-.328.774-.328 1.658s-.057.277.549.884c.605.609.459.447.055.609-.664.265-.934-.276-1.924-.276s-.99-1.548-.99-1.548l-.439-1.548-.219-.664s.664-.167.879-.553c.246-.442.221-1.327.221-1.327l-.33-.774-.439-.112z" fill-rule="evenodd" clip-rule="evenodd" fill="#fff" stroke="#000" stroke-width=".31" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.613"/><path d="M108.945 32.333s.904 1.359 2.078-.078c0 0 .172 2.255-.447 2.585-.471.25-.996.162-1.322-.167-.313-.312-.309-2.34-.309-2.34" fill="none" stroke="#000" stroke-width=".31" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.613"/><path d="M108.285 29.679c.199.06 1.209.309 1.209.774s-.111.774-.111.774l-.438-.774s-.861-.833-.66-.774zM111.646 29.681c-.201.059-1.209.309-1.209.773s.111.774.111.774l.439-.774c.001.001.859-.832.659-.773z" fill-rule="evenodd" clip-rule="evenodd" stroke="#000" stroke-width=".31" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.613"/><path d="M113.012 35.556s0 .868-.658.868c-.66 0-.66-.774-.66 0s-.439-.111-.439.774c0 .884-.66.332-.66.332m-.001-.001l-.66-.332-.109.774m-.001.001c-.441.442.109.442-.441.442-.549 0-.658-.552-.658-.552m0 0l-.152-.996m10.927-6.805s.354.284.883.507c.344.146.764.266 1.205.266.281 0 .219-.331.418-.371.6-.122 1.152-.061 1.152-.061M104.438 32s-.535 2.56-.33 2.765" fill="none" stroke="#000" stroke-width=".31" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.613"/><path d="M114.199 81.309s-3.141 3.267-2.096 4.316c1.045 1.051.641 2.198.301 2.521-.34.322-1.584 2.284-3.168 2.755-.957 0-.879-.928-2.158-.56-.971.278-.965.627-1.102.966-.207.514.369 1.43 1.25 1.188.746-.205-1.342 2.003.752 1.896 1.332-.066 1.93-2.316 2.199-2.316s0 1.028.66 1.028.713-.86.713-.86l.057-1.061.582-.77s1.311 1.961 1.311.11c0-2.137.764-1 .764-1s.436-.924.863-1.352c.426-.429-.322-1.012-.322-2.839 0-2.008 1.955-4.196 1.955-4.196l-2.561.174z" fill-rule="evenodd" clip-rule="evenodd" fill="#fff" stroke="#000" stroke-width=".31" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.613"/><path d="M104.438 74.542s-.225-1.821-.439-2.323c-.266-.612-1.32-1.658-1.65-1.327-.33.332-.658.996-.658 1.659v.663s.387.629.549 1.328c.125.538-.449-.434-.879 0-.229.228-.439 1.216.109 1.769l.549.553s-.879.442-.439.884c.439.443.111 1.094.551 1.536s1.098.233 1.098.233-.77.443-.77.995c0 .553.166.608.551.995s1.553.058 1.553.058-.947 1.34-.234 2.059c.715.718 1.1.502 1.43.171.33-.332.826-.574.826-.574l1.152-.626s.109.35.109 1.013c0 .664.387.805-.109 1.303-.494.497-.688.548-1.02.879-.33.331-1.508 1.138-1.508 1.138s.109-1.115-.77-1.115c-.881 0-1.754.114-1.754.557s-.111 1.287 1.109 1.287c.287 0-1.236.856-1.236 1.63 0 .775 1.002 1.136 1.834.301.389-.392.541-1.288.98-1.288s-.012 1.289.84 1.289c.549 0 .822-1.157.822-1.157l.557-2.062s-.24.688.639.688c.881 0 .717-.463.717-.463l-.441-1.105s.447.759.879.324c.434-.436.33-1.208.33-1.208l.307-2.181s.469.816 1.322.558c.527-.158.693.119 1.408-.6.988-.996 2.793-.771 3.891-.815.66-.027.955.404 1.783.986 1.023.719.564 1.019-.045 1.63-.639.643-1.107.043-1.107.043s-.934-.262-1.322.129c-.555.558.113 1.06.113 1.06l.568.142s-.725 1.073-.17 1.63c.467.47 1.152.045 1.492-.257.52-.463-.094-1.768.299-1.373.293.295.332 1.038.475 1.184.465 0 .549-.282 1.146-1.27-.383-2.873 1.535-1.373 1.055-2.966-.133-.448-.943-1.041-.943-1.041s-1.783-.977-1.199-1.562c.191-.193.857.443 1.406.443.551 0 1.771-.021 1.947-1.047.094-.543.109-1.216.109-1.216l-.77-1.216-.99-.664h-.549l-.111.664-.328-1.106-.551-.663h-.879l.109.773-.77-.773-.33-.774-.988-.221s-.33.221-.33.663v-.442s-.068-1.513.66-1.326c1.277.326 2.061-.25 2.639.332.385.387 1.207 1.106 1.756 1.106.553 0 1.432-.222 1.762-.554s.66-.933.66-1.327c0-.84-.441-1.217-.441-1.217l-.508-.365-.26-.187s.158.833-.111 1.106c-.389.39-.33 0-.99 0s-1.562-.481-2.309-.775c-.746-.293-2.811 0-2.527 0s-1.186.601-1.43 1.217c-.264.664-.33 1.547-.33 1.99s.439.885.881 1.328c.438.441 1.152.607 1.539.995.383.386 1.207.332 1.539.663.328.332 1.428.552 1.428.552s.551.001.881.333c.328.332.109.773.109.773s.439.332-.551.332-1.428-.442-1.979-.442-1.209-.443-1.758-.443c-.551 0-1.871-.109-2.42-.109h-.549c-.551 0-1.1-1.107-1.1-1.107s-.457.059-.457-.552.346-.554.346-.554l-.109-2.654.66.333s.549.552.549-.664-.164-.83-.549-1.216c-.385-.388-.551-1.438-.551-1.438s-.494-.166-.879.221-.549-.221-.549-.221.109-1.105-.332-1.105c-.439 0-.988-.111-.988.332s-.111.442-.111.885c0 .442-.109.221-.549.221s-1.1-.885-1.1-.332c0 .553-.109 1.217-.109 1.217s-.109-.332-.549.11-.439.442-.439 1.105-.002.885.549.885c.549 0 .77-.554.77-.554s-.385 2.603 0 2.988c.385.388.385.384.385.384 0 .719-.715.719-.715.719s-.221 0-.221.885c0 .884-.461.784-.328 1.658.215 1.417-.33.773-1.32.773s-.99-1.104-.99-1.104l-.439-1.549-.219-.663s.664-.166.879-.553c.246-.442.221-1.327.221-1.327l-.33-.774-.442-.113z" fill-rule="evenodd" clip-rule="evenodd" fill="#fff" stroke="#000" stroke-width=".31" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.613"/><path d="M108.945 74.874s.904 1.36 2.078-.078c0 0 .172 2.256-.447 2.586-.471.25-.996.162-1.322-.166-.313-.315-.309-2.342-.309-2.342" fill="none" stroke="#000" stroke-width=".31" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.613"/><path d="M108.285 72.22c.199.059 1.209.309 1.209.775 0 .465-.111.774-.111.774l-.438-.774s-.861-.833-.66-.775zM111.646 72.222c-.201.06-1.209.308-1.209.774 0 .465.111.774.111.774l.439-.774c.001 0 .859-.833.659-.774z" fill-rule="evenodd" clip-rule="evenodd" stroke="#000" stroke-width=".31" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.613"/><path d="M113.012 78.097s0 .868-.658.868c-.66 0-.66-.773-.66 0 0 .774-.439-.11-.439.774s-.66.333-.66.333m-.001 0l-.66-.333-.109.774m-.001 0c-.486 0 .109.441-.441.441-.549 0-.658-.552-.658-.552m0 0l-.152-.995m10.927-6.804s.354.283.883.507c.344.146.764.267 1.205.267.281 0 .219-.332.418-.372.6-.121 1.152-.061 1.152-.061m-18.72 1.598s-.535 2.56-.33 2.764" fill="none" stroke="#000" stroke-width=".31" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.613"/><path d="M74.751 40.411s-.27 2.15.775 3.2c1.044 1.051.879 1.327.879 1.77s-.33 1.106-.33 1.106-.879.995-1.429.995-.77.221-1.1-.111c-.369-.826-1.979-.442-1.979-.442s-.523-.072-.66.267c-.206.513-.549 1.06.77 1.06 1.32 0 .935-.388 1.32 0 .384.387-1.197.319-1.54.663-.466.469-.22 1.216.44 1.216.659 0 2.199-1.327 2.199-1.327 0 1.106 0 1.106.66 1.106s.879-.885.879-.885l.11-.885.66-.995s.88 1.328 1.43-.11c.549-1.438-.22-1.991-.22-1.991s1.003.318 1.43-.11c.426-.429.438-1.659.438-1.659l-1.538-4.091-3.194 1.223z" fill-rule="evenodd" clip-rule="evenodd" fill="#fff" stroke="#000" stroke-width=".31" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.613"/><path d="M64.751 32s-.223-1.82-.44-2.322c-.264-.612-1.319-1.659-1.648-1.327-.33.332-.66.995-.66 1.658v.664s0 1.326.549 1.326c.55 0-.879-.774-.879 0s-.44 1.217.11 1.77l.55.553s-.88.442-.44.885.11 1.093.55 1.536c.439.442 1.099.233 1.099.233s-.769.442-.769.995c0 .553.165.608.549.995.385.386 1.759.884 1.759.884s-1.154.83-.439 1.548c.715.719 1.1.664 1.43.332.33-.332 1.209-.664 1.209-.664l.77-.442s.11-.221.11.442c0 .664.384 1.05-.11 1.548-.495.498-.22.774-.55 1.106-.329.332-.879 1.105-.879 1.105l-1.1.995s.109-.995-.77-.995c-.88 0-1.539.11-1.539.553s-.408.381-.11.995 1.429.354 1.429.553-.879.774-.879.774-.989.995-.989 1.769.494 1.382.989.884c.495-.497.439-1.105.439-1.105h.55s.88-.553.88-1.106 0 .111.439.553c.44.442 0 .442.44.442.439 0 .99-.775.99-1.327 0-.553.329-1.548.329-1.548v-1.106s-.329 1.548.55 1.548.989-.774.989-.774v-1.879l-.44-1.106.879 1.327.439-.995-.086-.957-.024-.259.549-1.549s-.109.996.441.996c.549 0 .384.277 1.099-.442.989-.995.91-.636 1.401-.636.583 0 2.557-.055 2.557-.055s.879.028.879-.636c0-.663.166.94.88 1.659.714.719 1.154 1.382 1.648 1.88.496.498 1.211.884 1.211.884s.109.222.109.775c0 .552.165.718-.22 1.106-.385.387-.55.884-.55.884s-.44.111-.989.111c-.55 0-.99.552-.99.552l-.329.774s-.44.664.22.664c.659 0 .989-.553.989-.553s-.33-.221-.33.553-.191 1.01.33 1.01c.548 0 .727.315.99.095.361-.301.77-1.105.77-1.105l.329-.885s.11.111.11.885c-.186.774.614.599.439.774-.175.174.77 0 .77 0l-.11-.996.55-.553s-.17-.483-.56-.875c-.389-.391-.589-.844-.319-1.115.27-.271.516-.477.659-.332.464 0 .807-1.069.11-1.77l-.33-.331.33-1.217.33-.553s.43-.922 0-1.105c-.373-.159-.33-.332-.33-.332l-.22.884-.376.507-.504-.838s0-.884-.33-1.216c-.33-.332-.769-1.216-.769-1.216s-.33-.774-.879-.774.77.22 1.319.22c.55 0 1.54-.331 1.54-.884 0-.553.109-1.769.109-1.769l-.77-1.216-.989-.663h-.55l-.11.663-.33-1.105-.549-.664h-.88l.11.774-.77-.774-.33-.773-.99-.221s-.33.221-.33.664v-.442s-.068-1.513.66-1.327c1.277.327 2.061-.25 2.639.332.384.387 1.209 1.105 1.759 1.105s1.429-.221 1.759-.553.66-.932.66-1.327c0-.84-.439-1.216-.439-1.216l-.509-.366-.26-.187s.16.834-.11 1.106c-.388.391-.33 0-.99 0-.659 0-1.562-.48-2.309-.774-.747-.294-2.812 0-2.529 0s-1.184.6-1.428 1.216c-.265.664-.33 1.548-.33 1.991s.439.885.879 1.327c.44.442 1.155.607 1.539.995.385.387 1.21.332 1.539.663.33.332 1.43.553 1.43.553s.55 0 .879.332c.33.331.11.774.11.774s.44.332-.549.332c-.991 0-1.429-.442-1.979-.442s-1.209-.442-1.759-.442c-.55 0-1.869-.11-2.419-.11h-.55c-.55 0-1.1-1.105-1.1-1.105l-.66-.553.55-.553-.11-2.655.66.333s.55.553.55-.664c0-1.216-.165-.829-.55-1.216s-.55-1.438-.55-1.438-.494-.166-.88.221c-.384.387-.549-.221-.549-.221s.109-1.106-.33-1.106c-.44 0-.99-.111-.99.332 0 .442-.11.442-.11.884s-.11.221-.55.221-1.099-.885-1.099-.332c0 .553-.11 1.216-.11 1.216s-.11-.331-.549.111c-.44.442-.44.442-.44 1.105 0 .665 0 .886.549.886.55 0 .771-.553.771-.553s-.385 2.599 0 2.985c.384.387.384-.332.384.387s-.714.719-.714.719-.22 0-.22.885c0 .884-.329.774-.329 1.658s-.056.277.549.884c.604.609.459.447.055.609-.664.265-.935-.276-1.924-.276-.99 0-.99-1.548-.99-1.548l-.439-1.548-.22-.664s.665-.167.88-.553c.245-.442.22-1.327.22-1.327l-.33-.774-.439-.112z" fill-rule="evenodd" clip-rule="evenodd" fill="#fff" stroke="#000" stroke-width=".31" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.613"/><path d="M69.259 32.333s.904 1.359 2.079-.078c0 0 .17 2.255-.447 2.585-.471.25-.997.162-1.324-.167-.311-.312-.308-2.34-.308-2.34" fill="none" stroke="#000" stroke-width=".31" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.613"/><path d="M68.599 29.679c.201.06 1.209.309 1.209.774s-.11.774-.11.774l-.439-.774s-.86-.833-.66-.774zM71.961 29.681c-.2.059-1.21.309-1.21.773s.11.774.11.774l.439-.774c.001.001.862-.832.661-.773z" fill-rule="evenodd" clip-rule="evenodd" stroke="#000" stroke-width=".31" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.613"/><path d="M73.327 35.556s0 .868-.659.868c-.66 0-.66-.774-.66 0s-.439-.111-.439.774c0 .884-.66.332-.66.332m-.001-.001l-.659-.332-.11.774m-.001.001c-.439.442.11.442-.439.442s-.659-.552-.659-.552m0 0l-.153-.996m10.926-6.805s.354.284.883.507c.345.146.763.266 1.207.266.281 0 .217-.331.417-.371.599-.122 1.153-.061 1.153-.061M64.751 32s-.533 2.56-.33 2.765" fill="none" stroke="#000" stroke-width=".31" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.613"/><path d="M126.096 73.37V25.145H59.214v47.106c0 14.546 13.406 21.456 16.625 23.373 1.784 1.062 17.306 9.573 17.306 9.573s5.188-3.447 15.823-9.201c17.923-9.697 17.128-22.626 17.128-22.626z" fill="none" stroke="#000" stroke-width="1.554" stroke-miterlimit="2.613"/><path d="M75.729 81.404s-.368 2.17.413 2.955c.78.786.918 1.247.918 1.523 0 .278-.184.74-.413.97-.229.23-.138.416-.826.646-.689.231-.873.186-.873.647 0 .462-.504.37-1.147.37-.644 0-1.47-.185-1.47.324 0 .507-.138 1.061.368 1.061.253 0 .568-.052.841-.125.272-.072.469-.559.582-.561.527-.007.527-.007.189.333s-1.474.628-1.474.906 0 .693.459.693 1.24-.093 1.561-.416c.322-.323.643-1.016.643-1.016s-.39.808-.092 1.107c.298.301.918.462.918.093s-.046-1.153-.046-1.385.827-.046.964-.185c.139-.139.505-1.292.276-1.523-.229-.231.712.114 1.01-.186.299-.301.184-.923-.046-1.153-.229-.231.781.092.781-.231 0-.324-.083-1.386-.083-1.386l-.974-2.816-2.479-.645z" fill-rule="evenodd" clip-rule="evenodd" fill="#fff" stroke="#000" stroke-width=".31" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.613"/><path d="M65.004 74.542s-.223-1.821-.44-2.323c-.264-.612-1.319-1.658-1.649-1.327-.33.332-.66.996-.66 1.659v.663s.388.629.55 1.328c.125.538-.448-.434-.88 0-.227.228-.439 1.216.11 1.769l.549.553s-.879.442-.439.884c.439.443.11 1.094.55 1.536.44.442 1.1.233 1.1.233s-.77.443-.77.995c0 .553.165.608.549.995.385.387 1.553.058 1.553.058s-.948 1.34-.233 2.059c.714.718 1.1.502 1.429.171.33-.332.825-.574.825-.574l1.154-.626s2.514-.315 2.514 1.256c0 .469-1.769 1.553-2.239 1.553-.469 0-1.491-.622-1.928-.561-1.342.184-.469 1.316.611 1.316.289 0-.724.399-.444.968.551 1.125 1.357.257 1.979-.368.804-.808.282 1.578.726 1.653.444.075.973.344 1.203-.268-.116-1.165-.669-2.683.276-2.188 1.003.526 1.698-.095 1.415-2.283-.066-.508 1.248.444 1.248-.378 0-1.433-.61-1.398 2.126-1.398.659 0 1.868-.08 2.189 1.214.303 1.217.709 1.044 1.204 1.753.45.643 1.23.924 1.505 2.493.275 1.57-.551 1.571-.551 2.4 0 1.034.228.986.228.986s-.067 1.44-.641.862c-.624-.627-1.561.143-1.561 1.34 0 .525.349 1.162.689.86.158-.142.437.266.9-.639.408-.796-.626 3.104.981 1.072.348-.44-.171-.645.214-1.829.299-.922 1.011.499 1.165-.299.322-1.663-.655-2.468-.599-2.411.987.993.975-.679.975-1.003 0-.85-1.227-.905-.814-1.592-.267-2.005 1.4 1.617 1.033-1.562-.173-1.5-2.433-.954-2.249-2.479.16-1.329-1.688-2.369-1.106-2.954.191-.193.858.045 1.408.045s1.77.165 1.945-.861c.094-.543.11-1.216.11-1.216l-.77-1.216-.99-.664h-.549l-.11.664-.33-1.106-.55-.663h-.88l.11.773-.769-.773-.33-.774-.99-.221s-.33.221-.33.663v-.442s-.069-1.513.66-1.326c1.278.326 2.061-.25 2.639.332.385.387 1.209 1.106 1.759 1.106s1.429-.222 1.759-.554c.33-.332.659-.933.659-1.327 0-.84-.439-1.217-.439-1.217l-.509-.365-.26-.187s.16.833-.11 1.106c-.389.39-.33 0-.989 0s-1.562-.481-2.309-.775c-.746-.293-2.811 0-2.528 0 .283 0-1.184.601-1.429 1.217-.264.664-.33 1.547-.33 1.99s.439.885.88 1.328c.439.441 1.154.607 1.539.995.385.386 1.209.332 1.539.663.33.332 1.429.552 1.429.552s.55.001.879.333c.33.332.11.773.11.773s.439.332-.55.332-1.429-.442-1.979-.442-1.209-.443-1.759-.443-1.869-.109-2.419-.109h-.549c-.55 0-1.1-1.107-1.1-1.107s-.456.059-.456-.552.347-.554.347-.554l-.11-2.654.66.333s.55.552.55-.664-.165-.83-.55-1.216c-.385-.388-.55-1.438-.55-1.438s-.495-.166-.879.221c-.385.387-.55-.221-.55-.221s.11-1.105-.33-1.105-.99-.111-.99.332-.11.442-.11.885c0 .442-.11.221-.55.221-.44 0-1.1-.885-1.1-.332 0 .553-.11 1.217-.11 1.217s-.109-.332-.549.11-.44.442-.44 1.105 0 .885.55.885c.549 0 .77-.554.77-.554s-.385 2.603 0 2.988c.384.388.384.384.384.384 0 .719-.715.719-.715.719s-.22 0-.22.885c0 .884-.462.784-.33 1.658.215 1.417-.33.773-1.319.773-.99 0-.99-1.104-.99-1.104l-.439-1.549-.22-.663s.665-.166.88-.553c.245-.442.22-1.327.22-1.327l-.33-.774-.439-.107z" fill-rule="evenodd" clip-rule="evenodd" fill="#fff" stroke="#000" stroke-width=".31" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.613"/><path d="M69.511 74.874s.905 1.36 2.08-.078c0 0 .171 2.256-.447 2.586-.471.25-.997.162-1.324-.166-.311-.315-.309-2.342-.309-2.342" fill="none" stroke="#000" stroke-width=".31" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.613"/><path d="M68.852 72.22c.2.059 1.209.309 1.209.775 0 .465-.11.774-.11.774l-.44-.774s-.86-.833-.659-.775zM72.214 72.222c-.2.06-1.209.308-1.209.774 0 .465.11.774.11.774l.44-.774c-.001 0 .86-.833.659-.774z" fill-rule="evenodd" clip-rule="evenodd" stroke="#000" stroke-width=".31" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.613"/><path d="M65.004 74.542s-.534 2.56-.33 2.764m15.392-4.703s.354.283.883.507c.344.146.763.267 1.207.267.281 0 .217-.332.417-.372.6-.121 1.154-.061 1.154-.061M73.58 78.097s0 .868-.66.868c-.659 0-.659-.773-.659 0 0 .774-.44-.11-.44.774s-.659.333-.659.333m-.001 0l-.66-.333-.11.774m0 0c-.486 0 .11.441-.439.441s-.66-.552-.66-.552m0 0l-.153-.995" fill="none" stroke="#000" stroke-width=".31" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.613"/><path d="M106.402 58.251s-1.104-.574-1.104-1.79c0-1.785.197-1.829.252-1.805l-.125-.079a.894.894 0 0 0-.565-1.584.896.896 0 1 0-.53 1.612v1.856s-.041 1.232-1.047 1.823v.912h.771s.271 1.273.809 1.273.938-1.273.938-1.273h.67l-.069-.945z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M105.551 54.657l.016.01c-.001 0-.006-.006-.016-.01zM114.607 58.251s-1.104-.574-1.104-1.79c0-1.785.197-1.829.254-1.805l-.125-.079a.894.894 0 0 0-.565-1.584.893.893 0 0 0-.528 1.612l-.004.002v1.854s-.039 1.232-1.045 1.823v.912h.771s.273 1.273.809 1.273c.537 0 .936-1.273.936-1.273h.672l-.071-.945z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M113.758 54.657l.016.01c-.001 0-.006-.006-.016-.01zM122.814 58.251s-1.104-.574-1.104-1.79c0-1.785.199-1.829.254-1.805l-.125-.079a.894.894 0 0 0-.565-1.584.895.895 0 0 0-.53 1.612l-.002.002v1.854s-.039 1.232-1.045 1.823v.912h.771s.271 1.273.809 1.273.938-1.273.938-1.273h.67l-.071-.945z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M121.965 54.657l.016.01c-.001 0-.006-.006-.016-.01zM64.956 58.251s-1.104-.574-1.104-1.79c0-1.785.198-1.829.253-1.805l-.126-.079a.892.892 0 0 0-.563-1.584.893.893 0 0 0-.53 1.612l-.002.002v1.854s-.039 1.232-1.047 1.823l.001.912h.772s.272 1.273.809 1.273c.538 0 .937-1.273.937-1.273h.671l-.071-.945z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M64.104 54.657l.016.01s-.006-.006-.016-.01zM73.162 58.251s-1.104-.574-1.104-1.79c0-1.785.197-1.829.253-1.805l-.126-.079a.893.893 0 0 0-.563-1.584.892.892 0 0 0-.889.896c0 .294.143.553.361.716l-.003.002v1.854s-.04 1.232-1.046 1.823v.912h.771s.273 1.273.811 1.273c.537 0 .936-1.273.936-1.273h.671l-.072-.945z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M72.311 54.657l.016.01s-.006-.006-.016-.01zM81.37 58.251s-1.105-.574-1.105-1.79c0-1.785.198-1.829.254-1.805l-.126-.079a.893.893 0 0 0-.564-1.584.892.892 0 0 0-.528 1.612l-.002.002v1.854s-.04 1.232-1.047 1.823v.912h.772s.273 1.273.81 1.273.936-1.273.936-1.273h.671l-.071-.945z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M80.519 54.657l.015.01s-.006-.006-.015-.01zM77.301 64.55s-1.104-.574-1.104-1.789c0-1.786.197-1.829.253-1.805l-.126-.079a.892.892 0 0 0-.563-1.584.893.893 0 0 0-.528 1.613l-.003.001v1.854s-.04 1.232-1.046 1.823v.911h.772s.272 1.273.81 1.273c.536 0 .936-1.273.936-1.273h.671l-.072-.945z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M76.45 60.956l.015.01s-.005-.007-.015-.01zM68.837 64.55s-1.104-.574-1.104-1.789c0-1.786.196-1.829.253-1.805l-.127-.079a.894.894 0 0 0-.563-1.584.893.893 0 0 0-.529 1.613l-.003.001v1.854s-.04 1.232-1.046 1.823v.911h.771s.273 1.273.81 1.273.936-1.273.936-1.273h.672l-.07-.945z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M67.987 60.956l.015.01s-.006-.007-.015-.01zM118.873 64.55s-1.105-.574-1.105-1.789c0-1.786.197-1.829.254-1.805l-.127-.079a.893.893 0 0 0-.563-1.584.893.893 0 0 0-.889.896.9.9 0 0 0 .359.717l-.002.001v1.854s-.039 1.232-1.045 1.823v.911h.771s.273 1.273.809 1.273c.537 0 .936-1.273.936-1.273h.672l-.07-.945z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M118.021 60.956l.016.01s-.006-.007-.016-.01zM110.408 64.55s-1.104-.574-1.104-1.789c0-1.786.197-1.829.254-1.805l-.127-.079a.893.893 0 0 0-.563-1.584.893.893 0 0 0-.53 1.613l-.002.001v1.854s-.041 1.232-1.045 1.823v.911h.77s.273 1.273.811 1.273.936-1.273.936-1.273h.672l-.072-.945z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M109.559 60.956l.016.01c-.001 0-.009-.007-.016-.01zM90.246 47.401s-1.104-.575-1.104-1.789c0-1.786.197-1.83.253-1.806l-.127-.079a.893.893 0 0 0-.563-1.584.896.896 0 1 0-.529 1.613l-.001.001v1.854s-.04 1.231-1.047 1.823v.911h.772s.272 1.274.81 1.274c.536 0 .936-1.274.936-1.274h.671l-.071-.944z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M89.395 43.807l.015.01s-.006-.006-.015-.01zM97.215 47.401s-1.104-.575-1.104-1.789c0-1.786.197-1.83.253-1.806l-.126-.079a.892.892 0 1 0-1.093.029l-.002.001v1.854s-.04 1.231-1.046 1.823v.911h.771s.272 1.274.81 1.274c.536 0 .935-1.274.935-1.274h.672l-.07-.944z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M96.365 43.807l.016.01c-.001 0-.007-.006-.016-.01zM90.246 33.506s-1.104-.574-1.104-1.789c0-1.786.197-1.829.253-1.805l-.127-.079a.893.893 0 0 0-.563-1.585.895.895 0 1 0-.529 1.613l-.001.001v1.854s-.04 1.232-1.047 1.823v.911h.772s.272 1.273.81 1.273c.536 0 .936-1.273.936-1.273h.671l-.071-.944z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M89.395 29.912l.015.01s-.006-.006-.015-.01zM97.215 33.506s-1.104-.574-1.104-1.789c0-1.786.197-1.829.253-1.805l-.126-.079a.894.894 0 0 0-.564-1.585.894.894 0 0 0-.529 1.613l-.002.001v1.854s-.04 1.232-1.046 1.823v.911h.771s.272 1.273.81 1.273c.536 0 .935-1.273.935-1.273h.672l-.07-.944z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M96.365 29.912l.016.01c-.001 0-.007-.006-.016-.01zM90.246 96.598s-1.104-.574-1.104-1.789c0-1.786.197-1.83.253-1.806l-.127-.078a.892.892 0 0 0-.563-1.584.892.892 0 0 0-.889.895.9.9 0 0 0 .36.718h-.001v1.854s-.04 1.232-1.047 1.822v.912h.772s.272 1.273.81 1.273c.536 0 .936-1.273.936-1.273h.671l-.071-.944z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M89.395 93.003l.015.011s-.006-.006-.015-.011zM97.215 96.598s-1.104-.574-1.104-1.789c0-1.786.197-1.83.253-1.806l-.126-.078a.893.893 0 0 0-.564-1.584.893.893 0 0 0-.529 1.613h-.002v1.854s-.04 1.232-1.046 1.822v.912h.771s.272 1.273.81 1.273c.536 0 .935-1.273.935-1.273h.672l-.07-.944zM96.365 93.003l.016.011-.016-.011zM90.246 82.704s-1.104-.574-1.104-1.789c0-1.786.197-1.83.253-1.807l-.127-.077a.893.893 0 0 0-.563-1.585.894.894 0 1 0-.529 1.612l-.001.002v1.854s-.04 1.232-1.047 1.823v.911h.772s.272 1.274.81 1.274c.536 0 .936-1.274.936-1.274h.671l-.071-.944zM89.395 79.107l.015.011-.015-.011zM97.555 82.704s-1.104-.574-1.104-1.789c0-1.786.197-1.83.253-1.807l-.126-.077a.895.895 0 0 0-.563-1.585.894.894 0 1 0-.529 1.612l-.002.002v1.854s-.04 1.232-1.046 1.823l.001.911h.771s.272 1.274.809 1.274.936-1.274.936-1.274h.671l-.071-.944z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M96.704 79.107l.015.011c-.001.001-.006-.005-.015-.011zM93.899 88.618s-1.104-.574-1.104-1.79c0-1.784.198-1.828.253-1.804l-.125-.079a.895.895 0 0 0-.563-1.584.892.892 0 0 0-.89.896.9.9 0 0 0 .36.717l-.002.001v1.853s-.04 1.233-1.047 1.823v.911h.772s.272 1.274.81 1.274c.536 0 .936-1.274.936-1.274h.67l-.07-.944z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M93.048 85.023l.016.009c-.001.001-.007-.005-.016-.009zM93.899 75.014s-1.104-.574-1.104-1.789c0-1.787.198-1.829.253-1.805l-.125-.08a.892.892 0 0 0-.563-1.584c-.493 0-.89.4-.89.895a.9.9 0 0 0 .36.719h-.002v1.854s-.04 1.232-1.047 1.823v.911h.772s.272 1.274.81 1.274c.536 0 .936-1.274.936-1.274h.67l-.07-.944z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M93.048 71.42l.016.009c-.001 0-.007-.006-.016-.009zM93.899 40.339s-1.104-.574-1.104-1.789c0-1.786.198-1.83.253-1.806l-.125-.079a.895.895 0 0 0-.563-1.584.896.896 0 1 0-.53 1.613l-.002.001v1.855s-.04 1.232-1.047 1.822v.912h.772s.272 1.273.81 1.273c.536 0 .936-1.273.936-1.273h.67l-.07-.945z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M93.048 36.745l.016.01a.123.123 0 0 0-.016-.01z" fill-rule="evenodd" clip-rule="evenodd"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#59595b" stroke="#000" stroke-width=".622" stroke-miterlimit="2.613" d="M100.1 65.336H84.79V53.57h15.31v11.766z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#fff" stroke="#000" stroke-width=".622" stroke-miterlimit="2.613" d="M88.962 70.154h-2.116v-4.507h2.116v4.507zM97.799 70.154h-2.116v-4.507h2.116v4.507z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#fff" stroke="#000" stroke-width=".31" stroke-miterlimit="2.613" d="M88.998 56.119h-1.283v-3.028h1.283v3.028zM93.057 56.119h-1.284v-3.028h1.284v3.028zM97.264 56.119h-1.283v-3.028h1.283v3.028zM86.776 56.665h-1.283v-.993h1.283v.993zM99.35 56.665h-1.284v-.993h1.284v.993zM87.184 65.002h-1.382v-1.29h1.382v1.29zM98.992 65.002h-1.383v-1.29h1.383v1.29z"/><path d="M95.763 59.816c0 1.183-1.459 2.143-3.262 2.143-1.8 0-3.259-.96-3.259-2.143 0-1.184 1.458-2.145 3.259-2.145 1.803 0 3.262.961 3.262 2.145z" fill-rule="evenodd" clip-rule="evenodd" fill="#fff" stroke="#000" stroke-width=".466" stroke-miterlimit="2.613"/><path d="M94.371 59.816c0 .615-.859 1.113-1.919 1.113s-1.919-.498-1.919-1.113c0-.616.858-1.115 1.919-1.115s1.919.499 1.919 1.115z" fill-rule="evenodd" clip-rule="evenodd" fill="#fff" stroke="#000" stroke-width=".466" stroke-miterlimit="2.613"/><path d="M16.611 131.24c-.974-.936-1.427-2.459-1.427-4.656v-5.525c0-2.307-.195-2.371-1.212-2.523l-.368-.066c-.151-.152-.13-.521.043-.609a61.623 61.623 0 0 0 5.69 0c.173.088.194.457.043.609l-.477.066c-1.017.152-1.211.217-1.211 2.523v4.982c0 3.002.908 5.525 3.916 5.525 2.833 0 4.002-2.154 4.002-5.461v-2.719c0-1.633-.022-3.656-.411-4.287-.195-.326-.542-.479-1.082-.564l-.433-.066c-.195-.152-.173-.543.043-.609.736.045 1.558.066 2.401.066.908 0 1.493-.021 2.293-.066.173.109.216.457.043.609l-.476.109c-.411.086-.8.174-.952.521-.302.652-.302 2.568-.302 4.287v2.588c0 1.98-.303 3.807-1.428 5.025s-2.747 1.633-4.239 1.633c-2.033.001-3.461-.435-4.456-1.392zM43.933 119.1c-.303.676-.303 2.568-.303 4.287v5.199c0 .652 0 3.328.065 3.828-.173.24-.476.326-.735.305-.346-.457-.974-1.195-2.531-2.98l-5.062-5.809c-1.406-1.588-2.099-2.414-2.466-2.742-.065 0-.065.24-.065 1.393v4.242c0 1.633.022 3.635.389 4.287.195.326.563.457 1.104.543l.476.066c.194.152.173.564-.043.631a46.56 46.56 0 0 0-2.466-.066c-.909 0-1.493.023-2.25.066-.173-.109-.216-.479-.043-.631l.475-.109c.412-.064.801-.152.953-.5.281-.674.281-2.566.281-4.287v-5.154c0-1.697.022-2.047-.713-2.678-.238-.195-.844-.369-1.146-.434l-.325-.066c-.151-.131-.129-.564.086-.631.822.088 2.012.066 2.553.066.454 0 .974-.021 1.493-.066.368.936 2.726 3.678 3.483 4.504l2.163 2.35c.909 1 2.92 3.307 3.137 3.438.065-.064.065-.174.065-.521v-4.242c0-1.633-.022-3.635-.411-4.287-.194-.326-.541-.457-1.082-.543l-.498-.066c-.195-.152-.173-.564.043-.631.843.045 1.644.066 2.487.066.93 0 1.493-.021 2.271-.066.173.109.216.479.043.631l-.497.109c-.412.062-.78.15-.931.498zM52.65 118.557c-1.017.131-1.211.195-1.211 2.502v8.092c0 2.307.194 2.373 1.211 2.502l.476.066c.152.152.13.543-.043.631a64.223 64.223 0 0 0-5.798 0c-.173-.088-.195-.479-.043-.631l.476-.066c1.017-.129 1.211-.195 1.211-2.502v-8.092c0-2.307-.194-2.371-1.211-2.502l-.476-.066c-.152-.152-.13-.543.043-.631.952.045 1.926.066 2.921.066.952 0 1.925-.021 2.877-.066.173.088.195.479.043.631l-.476.066zM67.468 119.49c-.606 1.045-1.233 2.504-2.207 4.701l-1.211 2.697c-.866 1.98-1.882 4.525-2.25 5.635-.043.064-.216.109-.367.109a.836.836 0 0 1-.411-.109c-.26-.871-.606-1.936-.995-2.85l-3.786-9.16c-.605-1.457-.8-1.762-1.666-1.936l-.519-.109c-.151-.152-.151-.543.064-.609.844.045 1.774.066 2.618.066.974 0 1.709-.021 2.855-.066.195.131.216.479.021.631l-.54.131c-.476.109-.649.219-.649.393 0 .195.173.674 1.06 2.893l1.557 3.873c.39.979.974 2.262 1.19 2.764 1.168-2.742 2.466-5.744 3.613-8.703.346-.871.281-1.045-.368-1.197l-.628-.152c-.151-.174-.129-.521.043-.631.888.045 1.623.066 2.315.066.779 0 1.493-.021 2.098-.066.173.109.152.457.043.631l-.541.109c-.495.108-.972.26-1.339.889zM70.085 131.631c1.017-.107 1.212-.174 1.212-2.48v-8.092c0-2.307-.195-2.371-1.212-2.523l-.346-.045c-.151-.152-.13-.543.043-.631.822.045 1.838.066 2.79.066h4.132c1.385 0 2.64-.021 2.92-.066.087.371.217 2.09.347 3.025-.086.174-.519.217-.692.086-.347-1.262-.671-1.807-1.363-1.98-.497-.15-1.146-.195-1.73-.195h-1.45c-.93 0-.93.045-.93 1.283v3.678c0 .566.021.588.519.588h1.039c1.882 0 2.25-.021 2.401-.957l.151-.74c.173-.152.584-.152.692.021-.022.588-.064 1.371-.064 2.176 0 .826.042 1.588.064 2.283-.108.154-.519.154-.692.023l-.151-.871c-.151-.914-.519-.957-2.401-.957h-1.039c-.498 0-.519.043-.519.588v2.762c0 1.109.043 1.893.367 2.264.26.305.628.479 2.445.479 2.747.043 3.224-.588 3.98-2.35.195-.152.562-.088.692.131-.129.914-.605 2.566-.909 3.154-.951-.043-2.812-.066-5.342-.066h-2.467c-.952 0-2.271.023-3.245.066-.172-.088-.194-.479-.043-.631l.801-.089zM90.809 121.949c0 2.066-.974 3.111-3.094 3.111-1.039 0-1.039-.043-1.039-.738v-4.525c0-1.002.022-1.066 1.147-1.066 1.883-.001 2.986 1.499 2.986 3.218zm-8.329 9.77c-.194.152-.13.543.044.631a64.223 64.223 0 0 1 5.797 0c.173-.088.195-.479.044-.631l-.477-.066c-1.017-.129-1.211-.195-1.211-2.502v-2.783c0-.457.022-.479.67-.479.714 0 .952.086 1.342.738.519.85 1.125 2.045 1.709 2.959 1.319 2.023 2.444 2.873 4.521 2.873.756 0 1.167-.066 1.428-.131.064-.109.064-.348-.043-.436-.259-.021-.887-.152-1.493-.674-1.017-.85-2.099-2.699-3.829-5.635-.087-.131-.13-.305 0-.371 1.06-.436 2.596-1.436 2.596-3.438 0-1.566-.801-2.588-1.904-3.176-.951-.521-2.422-.74-4.11-.74-1.774 0-3.613.066-4.976.197-.173.107-.173.455-.021.607l.562.066c1.017.109 1.038.369 1.038 2.457v7.963c0 2.307-.195 2.373-1.211 2.502l-.476.069zM106.123 128.391c0 2.48-1.881 4.242-5.018 4.242-1.99 0-3.115-.652-3.549-.914-.389-.457-.669-1.959-.648-3.309.13-.217.498-.238.671-.086.389 1.109 1.557 3.438 3.676 3.438 1.645 0 2.576-1 2.576-2.328 0-1.24-.586-2.24-2.207-3.154l-.93-.521c-1.623-.914-3.051-2.242-3.051-4.199 0-2.154 1.602-3.982 4.76-3.982 1.123 0 1.947.262 2.963.457.238.479.453 1.916.453 2.938-.107.195-.496.217-.691.066-.324-1.133-1.082-2.59-2.92-2.59-1.73 0-2.445 1.131-2.445 2.285 0 .912.629 1.893 2.055 2.654l1.342.717c1.406.739 2.963 2.088 2.963 4.286zM113.631 118.557c-1.018.131-1.211.195-1.211 2.502v8.092c0 2.307.193 2.373 1.211 2.502l.475.066c.152.152.131.543-.043.631a64.202 64.202 0 0 0-5.797 0c-.174-.088-.193-.479-.043-.631l.475-.066c1.018-.129 1.211-.195 1.211-2.502v-8.092c0-2.307-.193-2.371-1.211-2.502l-.475-.066c-.15-.152-.131-.543.043-.631.951.045 1.926.066 2.922.066.949 0 1.924-.021 2.875-.066.174.088.195.479.043.631l-.475.066zM120.293 131.609c1.016-.086 1.211-.152 1.211-2.459v-9.398c0-.912-.021-.957-.584-.957h-1.211c-1.99 0-2.574.24-3.375 2.002-.15.131-.605.066-.691-.152.367-1.174.691-2.523.844-3.285.043-.064.129-.086.236-.086.088 0 .174.021.217.086.109.545.412.566 1.883.566h8.826c1.059 0 1.385-.066 1.643-.566.088-.043.174-.086.26-.086.131 0 .238.043.281.107-.215.893-.389 2.764-.324 3.459-.107.174-.475.219-.67.066-.281-1.697-.693-2.111-3.008-2.111h-1.232c-.562 0-.584.045-.584.957v9.398c0 2.307.195 2.373 1.211 2.48l.779.088c.15.152.129.543-.043.631a91.52 91.52 0 0 0-3.182-.066c-.951 0-1.967.023-3.352.066-.174-.088-.195-.523-.043-.631l.908-.109zM134.396 131.631c1.018-.107 1.211-.174 1.211-2.48v-1.283c0-1.219-.086-1.545-.691-2.697l-2.596-5.156c-.477-.936-.648-1.197-1.623-1.393l-.562-.131c-.129-.152-.086-.564.088-.631.93.045 1.838.066 2.725.066.951 0 2.271-.021 2.77-.066.174.088.215.479.043.631l-.648.109c-.346.043-.455.109-.455.283s.086.412.389 1.131c.867 1.871 1.645 3.633 2.51 5.221a337.49 337.49 0 0 0 2.531-4.807c.367-.74.584-1.219.584-1.459 0-.217-.193-.281-.498-.326l-.648-.152c-.15-.152-.15-.521.064-.631.953.045 1.623.066 2.271.066.672 0 1.363-.021 2.057-.066.193.109.193.457.043.631l-.629.131c-.973.174-1.232.588-2.357 2.502-.734 1.24-1.385 2.438-2.055 3.654-.65 1.133-.801 1.59-.801 3.068v1.305c0 2.307.195 2.373 1.256 2.48l.82.088c.152.152.131.543-.043.631a100.39 100.39 0 0 0-3.266-.066c-.994 0-1.969.023-3.137.066-.174-.088-.195-.479-.043-.631l.69-.088zM158.148 131.762c-3.699 0-4.975-4.09-4.975-7.092 0-4.635 2.357-6.223 4.52-6.223 3.441 0 4.912 3.807 4.912 7.092 0 4.373-1.99 6.223-4.457 6.223zm-.216.871c4.371 0 7.615-3.199 7.615-7.484 0-3.961-2.574-7.572-7.57-7.572-4.543 0-7.744 3.287-7.744 7.725-.001 3.872 2.81 7.331 7.699 7.331zM167.904 117.859c.758.045 1.73.066 2.684.066h4.088c1.385 0 2.596-.021 3.051-.066 0 .479 0 2.111.043 3.133-.088.174-.477.219-.693.088-.215-1.262-.562-1.893-1.385-2.111-.584-.152-1.123-.174-1.816-.174h-1.104c-.908 0-.908.045-.908 1.262v3.895c0 .545.021.588.52.588h1.275c1.883 0 2.229-.043 2.424-.957l.172-.74c.131-.152.541-.152.65.021-.021.566-.064 1.371-.064 2.176s.043 1.588.064 2.264c-.109.174-.52.174-.65.021l-.172-.85c-.195-.914-.541-.957-2.424-.957h-1.275c-.498 0-.52.043-.52.588v3.045c0 2.307.195 2.373 1.211 2.459l.908.109c.152.152.131.543-.043.631a105.143 105.143 0 0 0-3.309-.066c-.953 0-1.926.023-2.92.066-.174-.088-.195-.479-.045-.631l.477-.066c1.018-.129 1.211-.195 1.211-2.502v-8.092c0-2.307-.193-2.371-1.211-2.523l-.281-.045c-.151-.153-.132-.544.042-.632zM29.9 141.963c.333.084.528.111.778.168.056.643.111 2.293.39 4.363-.194.223-.695.252-.89.057-.473-1.764-1.725-4.086-5.396-4.086-3.532 0-7.092 2.518-7.092 8.252 0 5.959 3.699 8.867 7.287 8.867 3.504 0 5.034-2.35 5.812-4.168.25-.25.696-.139.835.113-.195 1.873-.946 3.721-1.335 4.252-.333.055-.667.168-.974.252-.612.195-2.531.67-4.338.67-2.754 0-5.117-.559-7.12-1.873-2.253-1.482-3.95-4.029-3.95-7.693 0-3.271 1.446-5.818 3.504-7.412 2.058-1.566 4.867-2.377 7.677-2.377 1.585 0 3.505.279 4.812.615zM38.995 148.061c.5-1.314.723-2.014.833-2.209h.056c.139.195.306.727.778 2.209l1.169 3.355c.222.672.111.729-.667.729h-2.893c-.667 0-.751 0-.445-.812l1.169-3.272zm4.978 9.902c.362 1.201.278 1.371-.723 1.482l-.612.084c-.167.168-.14.672.083.811.973-.027 2.197-.084 3.393-.084 1.446 0 2.475.027 3.616.084.195-.139.195-.615-.028-.811l-.417-.084c-1.418-.252-1.558-.447-2.197-2.322l-4.005-11.721c-.445-1.258-.807-2.572-1.251-3.832a.551.551 0 0 0-.473-.223c-.056 0-.973 1.146-1.947 1.342.083.477-.167 1.146-.528 2.043l-3.811 9.957c-.583 1.51-1.029 2.686-1.363 3.412-.417.924-.723 1.176-1.53 1.287l-.834.141c-.194.252-.167.672.028.811a45.73 45.73 0 0 1 2.753-.084c1.14.027 2.058.027 2.948.084.223-.111.25-.615.056-.811l-.806-.141c-1.029-.139-1.14-.225-.584-1.873l1.141-3.357c.25-.756.223-.756.945-.756h3.699c.778 0 .862 0 1.14.756l1.307 3.805zM71.757 157.207c.084 1.875.39 2.07 1.28 2.182l.806.141c.278.111.25.699-.055.811a69.933 69.933 0 0 0-3.394-.084 78.7 78.7 0 0 0-3.727.084c-.223-.111-.333-.643-.056-.811l.751-.141c1.112-.168 1.196-.391 1.196-2.293v-8.84-2.602h-.056c-.75 1.539-1.14 2.379-1.668 3.496l-2.392 4.924c-.946 1.957-2.336 5.062-2.837 6.379-.111.111-.529.111-.724 0-.472-1.512-1.668-4.254-2.308-5.652l-2.475-5.369a121.478 121.478 0 0 1-1.613-3.777h-.055c-.056 1.371-.111 3.553-.167 4.729a211.532 211.532 0 0 0-.111 6.488c0 1.848.027 2.293 1.225 2.49l.917.168c.194.168.194.699-.027.811a49.969 49.969 0 0 0-2.921-.084c-.89 0-1.892.027-2.976.084-.25-.139-.25-.672-.083-.811l.473-.057c1.335-.168 1.558-.588 1.724-2.293.222-1.764.278-3.582.417-6.49.111-1.902.278-4.225.278-5.93 0-1.314-.417-1.902-1.501-2.07l-.946-.168c-.167-.195-.139-.727.111-.811.834.057 1.585.084 2.614.084.974 0 1.947 0 2.976-.084.111 1.678.834 3.133 1.53 4.643l3.06 6.463c.222.475.946 1.873 1.307 2.518.445-.812.834-1.596 1.446-2.91l2.615-5.371c.89-1.846 1.78-3.496 2.252-5.342.751.057 1.669.084 2.281.084 1.168 0 2.142-.027 2.92-.084.306.111.362.643.084.811l-.918.141c-1.223.168-1.501.643-1.501 2.125-.002 4.139.054 8.277.248 12.418zM87.944 155.473c0 2.49-1.696 3.748-3.616 3.748-2.419 0-2.697-1.035-2.697-3.58v-4.027c0-.561.055-.729 1.279-.729 3.088 0 5.034 1.707 5.034 4.588zm-11.709 4.056c-.195.195-.167.699.056.811a82.485 82.485 0 0 1 3.754-.084c1.057 0 2.225.084 3.449.084 3.17 0 5.006-.475 6.314-1.566 1.279-1.035 1.696-2.434 1.696-3.721 0-3.16-2.364-4.531-4.478-4.867-.167-.055-.223-.111-.223-.168 0-.055.056-.139.167-.166 1.947-.645 3.143-1.902 3.143-3.553 0-1.764-.667-2.881-1.947-3.637-1.251-.729-3.115-.951-5.451-.951-3.059 0-5.09.139-6.342.252-.222.141-.222.586-.027.783l.724.084c1.307.139 1.335.475 1.335 3.16v10.238c0 2.965-.251 3.049-1.558 3.217l-.612.084 10.402-13.26c0 2.518-1.196 3.553-3.811 3.553-1.112 0-1.196-.027-1.196-.756v-5.062c0-1.117.083-1.174 1.474-1.174 1.725 0 3.532.979 3.532 3.439l-10.401 13.26zM104.381 146.969c0 2.658-1.25 4-3.977 4-1.336 0-1.336-.055-1.336-.951V144.2c0-1.285.029-1.369 1.475-1.369 2.42-.001 3.838 1.929 3.838 4.138zm-10.708 12.56c-.25.195-.167.699.056.811a84.338 84.338 0 0 1 3.755-.084c1.223 0 2.475.027 3.699.084.223-.111.25-.615.055-.811l-.611-.084c-1.307-.168-1.559-.252-1.559-3.217v-3.58c0-.588.029-.617.863-.617.918 0 1.223.113 1.725.951.668 1.092 1.445 2.631 2.197 3.805 1.697 2.602 3.143 3.693 5.812 3.693.975 0 1.502-.084 1.836-.168.084-.141.084-.447-.057-.561-.332-.027-1.139-.195-1.918-.867-1.307-1.09-2.697-3.469-4.924-7.244-.111-.168-.166-.391 0-.475 1.363-.561 3.338-1.848 3.338-4.42 0-2.014-1.029-3.328-2.447-4.084-1.225-.672-3.115-.951-5.285-.951-2.279 0-4.644.084-6.396.252-.223.141-.223.586-.028.783l.724.084c1.307.139 1.334.475 1.334 3.16v10.238c0 2.965-.25 3.049-1.557 3.217l-.612.085zM118.871 142.605c-1.307.168-1.557.252-1.557 3.217v10.406c0 2.965.25 3.049 1.557 3.217l.613.084c.193.195.166.699-.057.811a82.453 82.453 0 0 0-7.453 0c-.223-.111-.25-.615-.057-.811l.611-.084c1.309-.168 1.559-.252 1.559-3.217v-10.406c0-2.965-.25-3.049-1.559-3.217l-.611-.084c-.193-.195-.166-.699.057-.811 1.223.057 2.475.084 3.754.084 1.225 0 2.477-.027 3.699-.084.223.111.25.615.057.811l-.613.084zM129.635 142.83c4.645 0 7.844 2.684 7.844 8.223 0 4.729-2.225 8.252-7.176 8.252-2.949 0-3.143-1.453-3.143-4.168v-9.846c0-1.314.027-1.902.223-2.07s1.084-.391 2.252-.391zm-7.871 16.699c-.195.195-.166.699.057.811a78.351 78.351 0 0 1 3.531-.084c1.029 0 2.336.168 4.033.168 2.531 0 4.924-.336 6.898-1.342 3.447-1.764 4.979-4.951 4.979-8.057 0-4.168-2.365-7.133-5.703-8.363-2.029-.729-3.922-.951-6.562-.951-2.727 0-4.951.084-6.953.252-.223.141-.223.643-.029.783l.584.055c1.309.168 1.336.504 1.336 3.189v10.238c0 2.965-.25 3.049-1.559 3.217l-.612.084zM161.898 153.627c-1.029.139-1.195.393-1.195 2.098v1.623c0 .979.139 1.705.666 1.957.084.113.084.336-.027.42-.307 0-.807.084-1.336.225-1.723.391-3.811.754-5.395.754-3.338 0-6.48-.895-8.566-3.076-1.641-1.707-2.447-4.057-2.447-6.406s.807-4.756 2.559-6.574c1.975-2.098 5.006-3.299 8.871-3.299 1.309 0 2.727.223 3.701.42.639.139 1.445.25 1.779.25.027.84.223 2.266.361 4.447-.139.281-.75.309-.891.057-.611-2.713-2.586-4.057-5.34-4.057-4.895 0-7.26 3.553-7.26 8.309 0 2.238.502 4.643 2.004 6.434s3.727 2.377 5.367 2.377c1.336 0 2.141-.223 2.475-.643.168-.252.252-.756.252-1.762v-1.008c0-1.986-.029-2.152-1.893-2.461l-1-.168c-.195-.195-.195-.672.027-.811 1.084.055 2.42.084 4.338.084a68.12 68.12 0 0 0 3.393-.084c.279.139.307.615.057.811l-.5.083zM164.846 159.418c1.307-.141 1.557-.225 1.557-3.189v-10.406c0-2.965-.25-3.049-1.557-3.244l-.445-.057c-.193-.195-.166-.699.057-.811a70.41 70.41 0 0 0 3.588.084h5.311c1.781 0 3.395-.027 3.756-.084.111.475.279 2.686.445 3.889-.111.223-.668.279-.891.111-.445-1.623-.861-2.322-1.752-2.545-.639-.197-1.475-.252-2.225-.252h-1.863c-1.197 0-1.197.055-1.197 1.65v4.727c0 .727.027.756.668.756h1.334c2.422 0 2.895-.029 3.088-1.23l.195-.951c.223-.197.752-.197.891.027-.027.756-.084 1.762-.084 2.797 0 1.062.057 2.043.084 2.938-.139.195-.668.195-.891.027l-.195-1.119c-.193-1.174-.666-1.23-3.088-1.23h-1.334c-.641 0-.668.057-.668.756v3.553c0 1.426.057 2.434.473 2.908.334.393.807.615 3.143.615 3.533.057 4.146-.754 5.119-3.02.25-.197.723-.113.891.168-.168 1.174-.779 3.299-1.17 4.055-1.223-.057-3.615-.084-6.869-.084h-3.17c-1.225 0-2.922.027-4.172.084-.223-.111-.252-.615-.057-.811l1.028-.112z" fill-rule="evenodd" clip-rule="evenodd"/></svg>','https://drive.google.com/file/d/1VF6NgIxeGO7fQPPs3YfvZX3FgQ1kj5K_/view?usp=sharing'],

                ['Introduction to Git and GitHub – Coursera', 'Learned version control using Git and collaborated using GitHub repositories and pull requests in real-world projects.',`<svg fill="none" height="600" viewBox="0 0 600 600" width="600" xmlns="http://www.w3.org/2000/svg"><path d="m307.031 292.969h-14.062v14.062h14.062z" fill="#fff"/><path d="m600 0h-600v600h600z" fill="#fff"/><path d="m600 0h-600v600h600z" fill="#0056d2"/><g fill="#fff"><path d="m117.913 300.434c0-19.301 15.923-34.875 35.859-34.875 20.07 0 35.992 15.574 35.992 34.875 0 19.167-15.922 35.007-35.992 35.007-19.936 0-35.859-15.973-35.859-35.007zm54.725 0c0-9.583-8.43-18.104-18.866-18.104-10.303 0-18.598 8.521-18.598 18.104 0 9.717 8.429 18.236 18.598 18.236 10.436 0 18.866-8.519 18.866-18.236z"/><path d="m478.15 300.965c0-21.164 17.326-35.406 33.036-35.406 10.747 0 16.924 3.194 21.086 9.452l1.612-8.253h16.116v67.353h-16.116l-2.015-6.923c-4.701 5.059-10.61 8.253-20.546 8.253-15.713 0-33.173-13.577-33.173-34.476zm54.795-.133c0-10.247-8.463-18.502-18.936-18.502-10.341 0-18.668 8.388-18.668 18.771 0 9.316 8.461 17.702 18.668 17.702 10.607-.133 18.936-8.519 18.936-17.971z"/><path d="m458.833 274.982v-7.721h-17.101v66.211h17.101v-35.724c0-10.729 5.221-16.356 14.487-16.356.652 0 1.176 0 1.697.131l3.133-15.964c-8.875.131-15.272 3.14-19.317 9.423z"/><path d="m284.158 274.982v-7.721h-17.623l.135 66.211h17.625l-.137-35.724c0-10.729 5.382-16.356 14.801-16.356.672 0 1.209 0 1.75.131l3.228-15.964c-9.15.131-15.741 3.14-19.779 9.423z"/><path d="m196.654 307.776v-41.233h17.209v39.104c0 8.645 4.73 13.699 13.006 13.699 9.196 0 14.583-5.718 14.583-16.624v-36.179h17.209v67.3h-17.209v-7.845c-4.073 6.383-10.641 9.442-19.706 9.442-15.502.133-25.092-11.172-25.092-27.664z"/><path d="m365.945 300.369c0-18.867 13.621-34.942 34.985-34.809 19.893 0 33.913 15.942 33.913 34.541 0 1.861-.134 3.854-.401 5.582l-51.405-.133c2.004 8.104 8.678 13.816 18.693 13.949 6.141 0 12.685-2.259 16.69-7.308l11.885 9.567c-6.144 8.634-16.959 13.683-28.441 13.683-20.297-.265-35.919-15.411-35.919-35.072zm51.408-6.909c-.937-6.777-8.145-12.091-16.423-12.091-8.145 0-14.689 4.783-17.226 11.958z"/><path d="m303.937 319.559 15.522-8.073c2.542 5.558 7.76 8.734 14.984 8.734 6.691 0 9.234-2.118 9.234-5.029 0-10.721-36.93-4.234-36.93-28.853 0-13.631 12.043-20.779 26.894-20.779 11.239 0 21.274 4.897 26.76 14.163l-15.388 8.073c-2.272-4.5-6.555-7.015-12.041-7.015-5.352 0-7.894 1.854-7.894 4.897 0 10.456 36.93 3.837 36.93 28.853 0 12.97-10.704 20.911-27.966 20.911-14.717-.132-25.02-4.897-30.105-15.882z"/><path d="m50 300.074c0-19.161 15.7897-34.515 35.5599-34.515 12.7377 0 23.7511 6.301 30.1201 15.747l-14.861 8.532c-3.4503-4.724-8.8902-7.873-15.2591-7.873-10.2169 0-18.4434 8.398-18.4434 17.978 0 9.578 8.359 17.976 18.4434 17.976 6.6342 0 12.4724-3.411 15.6571-8.529l14.728 8.66c-6.236 9.843-17.5148 16.406-30.3851 16.406-19.7702.131-35.5599-15.616-35.5599-34.382z"/></g></svg>`,'https://coursera.org/share/36cf2dedd445d45663eae3f675ab143a'],
                
                ['MongoDB Essentials – Self Learning', 'Gained hands-on experience with NoSQL database concepts, schema design, queries, aggregation, and performance optimization.',`<svg height="2500" viewBox="8.738 -5.03622834 17.45992422 39.40619484" width="2500" xmlns="http://www.w3.org/2000/svg"><path d="m15.9.087.854 1.604c.192.296.4.558.645.802a22.406 22.406 0 0 1 2.004 2.266c1.447 1.9 2.423 4.01 3.12 6.292.418 1.394.645 2.824.662 4.27.07 4.323-1.412 8.035-4.4 11.12a12.7 12.7 0 0 1 -1.57 1.342c-.296 0-.436-.227-.558-.436a3.589 3.589 0 0 1 -.436-1.255c-.105-.523-.174-1.046-.14-1.586v-.244c-.024-.052-.285-24.052-.181-24.175z" fill="#599636"/><path d="m15.9.034c-.035-.07-.07-.017-.105.017.017.35-.105.662-.296.96-.21.296-.488.523-.767.767-1.55 1.342-2.77 2.963-3.747 4.776-1.3 2.44-1.97 5.055-2.16 7.808-.087.993.314 4.497.627 5.508.854 2.684 2.388 4.933 4.375 6.885.488.47 1.01.906 1.55 1.325.157 0 .174-.14.21-.244a4.78 4.78 0 0 0 .157-.68l.35-2.614z" fill="#6cac48"/><path d="m16.754 28.845c.035-.4.227-.732.436-1.063-.21-.087-.366-.26-.488-.453a3.235 3.235 0 0 1 -.26-.575c-.244-.732-.296-1.5-.366-2.248v-.453c-.087.07-.105.662-.105.75a17.37 17.37 0 0 1 -.314 2.353c-.052.314-.087.627-.28.906 0 .035 0 .07.017.122.314.924.4 1.865.453 2.824v.35c0 .418-.017.33.33.47.14.052.296.07.436.174.105 0 .122-.087.122-.157l-.052-.575v-1.604c-.017-.28.035-.558.07-.82z" fill="#c2bfbf"/></svg>`,'https://ti-user-certificates.s3.amazonaws.com/ae62dcd7-abdc-4e90-a570-83eccba49043/0ad81454-ddda-4860-bb8f-8bb352431229-jerophin-n-a-44a0bc08-2428-4d20-a124-0e2926af6016-certificate.pdf'],

                ['Cisco CCNA – Introduction to Networks', 'Learned device setup and IPv4/IPv6. Understood OSI layers and troubleshooting.',`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-0.44 0.24 120 60" width="120" height="60"><g transform="matrix(1.199534 0 0 1.199534 15.237208 6.249314)" fill="#0096d6"><path d="M21.4 26.2h3.2v12.5h-3.2zM50 29.8c-.1-.1-1.1-.7-2.7-.7-2 0-3.5 1.4-3.5 3.3s1.4 3.3 3.5 3.3c1.5 0 2.5-.6 2.7-.7v3.4c-.4.1-1.5.4-2.9.4-3.6 0-6.7-2.4-6.7-6.5 0-3.7 2.8-6.5 6.7-6.5 1.5 0 2.6.4 2.9.4zm-33 0c-.1-.1-1.1-.7-2.7-.7-2 0-3.5 1.4-3.5 3.3s1.4 3.3 3.5 3.3c1.5 0 2.5-.6 2.7-.7v3.4c-.4.1-1.5.4-2.9.4-3.5 0-6.7-2.4-6.7-6.5 0-3.7 2.8-6.5 6.7-6.5 1.5 0 2.6.4 2.9.4zm49.5 2.7c0 3.6-2.8 6.5-6.6 6.5s-6.6-2.9-6.6-6.5 2.8-6.5 6.6-6.5c3.9 0 6.6 2.9 6.6 6.5zm-6.6-3.3c-1.9 0-3.3 1.5-3.3 3.3s1.4 3.3 3.3 3.3 3.3-1.5 3.3-3.3-1.4-3.3-3.3-3.3zm-23.4-.1s-1.4-.4-2.5-.4c-1.3 0-2 .4-2 1 0 .8.9 1 1.4 1.2l.9.3c2 .7 3 2.1 3 3.6 0 3.1-2.8 4.2-5.2 4.2-1.7 0-3.3-.3-3.4-.3v-2.9c.3.1 1.6.5 3 .5 1.6 0 2.3-.5 2.3-1.2 0-.6-.6-1-1.4-1.2-.2-.1-.5-.2-.7-.2-1.8-.6-3.2-1.6-3.2-3.7 0-2.3 1.8-3.9 4.7-3.9 1.5 0 3 .4 3.1.4z"/><use xlink:href="#A"/><path d="M12.7 8.5a1.58 1.58 0 0 0-1.6-1.6c-.9 0-1.5.7-1.5 1.6v7.6a1.58 1.58 0 0 0 1.6 1.6 1.58 1.58 0 0 0 1.6-1.6V8.5zm8.7-5.9A1.58 1.58 0 0 0 19.8 1a1.58 1.58 0 0 0-1.6 1.6v16.6a1.58 1.58 0 0 0 1.6 1.6 1.58 1.58 0 0 0 1.6-1.6zM30 8.5a1.58 1.58 0 0 0-1.6-1.6 1.58 1.58 0 0 0-1.6 1.6v7.6a1.58 1.58 0 0 0 1.6 1.6 1.58 1.58 0 0 0 1.6-1.6z"/><use xlink:href="#A" x="34.5"/><path d="M47.2 8.5a1.58 1.58 0 1 0-3.2 0v7.6a1.58 1.58 0 1 0 3.2 0zm8.6-5.9a1.58 1.58 0 1 0-3.2 0v16.6a1.58 1.58 0 1 0 3.2 0zm8.6 5.9a1.58 1.58 0 1 0-3.2 0v7.6a1.58 1.58 0 1 0 3.2 0zm8.6 4.3a1.58 1.58 0 1 0-3.2 0v3.3a1.58 1.58 0 1 0 3.2 0z"/></g><defs><path id="A" d="M4.1 12.8a1.58 1.58 0 0 0-1.6-1.6 1.58 1.58 0 0 0-1.6 1.6v3.3a1.58 1.58 0 0 0 1.6 1.6 1.58 1.58 0 0 0 1.6-1.6z"/></defs></svg>`,'https://www.credly.com/badges/af785f26-861e-4f0b-a638-27ecda284963/public_url'],
                
                ['Adobe XD for UI/UX Design – LinkedIn Learning', 'Mastered wireframing, prototyping, and interactive design workflows using Adobe XD for rapid product development.',`<svg viewBox="0 -8.881784197001252e-16 267.51517722360785 65.24679557585003" xmlns="http://www.w3.org/2000/svg" width="2500" height="610"><path d="M263.043 56.411a4.418 4.418 0 1 0 .085 0zm0 8.33a3.874 3.874 0 1 1 3.809-3.938v.065a3.791 3.791 0 0 1-3.708 3.871h-.1m-16.96-9.535h-9.6V40.17c0-3.585-.064-8.2-4.993-8.2-5 0-5.765 3.906-5.765 7.939v15.294h-9.6V24.287h9.216v4.225h.129a10.1 10.1 0 0 1 9.093-4.994c9.73 0 11.524 6.4 11.524 14.726zm-40.79-35.143a5.571 5.571 0 1 1 5.57-5.572 5.571 5.571 0 0 1-5.57 5.572m4.8 35.143h-9.61V24.287h9.61zM250.87.004h-55.21a4.728 4.728 0 0 0-4.781 4.67v55.439a4.731 4.731 0 0 0 4.781 4.675h55.21a4.741 4.741 0 0 0 4.8-4.675V4.67a4.738 4.738 0 0 0-4.8-4.67m-86.12 31.749c-4.8 0-7.68 3.205-7.68 7.875s2.879 7.878 7.68 7.878 7.687-3.2 7.687-7.878-2.881-7.875-7.687-7.875m16.525 23.437h-8.838v-4.1h-.131a12.071 12.071 0 0 1-9.544 4.868c-9.224 0-15.3-6.657-15.3-16.071 0-8.646 5.377-16.585 14.216-16.585 3.973 0 7.684 1.087 9.861 4.1h.126V9.577h9.609zm-46.139-19.048a5.756 5.756 0 0 0-5.894-5.89 6.406 6.406 0 0 0-6.784 5.89zm8.132 13.7a16.909 16.909 0 0 1-13.128 6.151c-9.6 0-17.286-6.408-17.286-16.331s7.685-16.328 17.286-16.328c8.973 0 14.6 6.4 14.6 16.328v3.01h-22.282a7.171 7.171 0 0 0 7.235 6.019 8.193 8.193 0 0 0 6.851-3.778zM47.834 24.279h9.219v4.225h.131a10.085 10.085 0 0 1 9.09-4.994c9.735 0 11.527 6.405 11.527 14.726V55.19h-9.6V40.159c0-3.588-.066-8.2-5-8.2-4.99 0-5.76 3.907-5.76 7.939v15.288h-9.6zM82.669 9.58h9.6v27.265l10.88-12.583h11.77l-12.6 14.313 12.335 16.63h-12.066L92.397 39.923h-.126v15.28h-9.6zM32.911 24.276h9.6v30.916h-9.6zm4.8-15.37a5.569 5.569 0 1 1-5.57 5.569 5.569 5.569 0 0 1 5.57-5.569M0 9.587h9.993v36.4h18.5v9.222H0zm263.744 51.522a1.2 1.2 0 0 0 1.21-1.269c0-.9-.543-1.33-1.657-1.33h-1.8v4.712h.677v-2.054h.832l.019.025 1.291 2.029h.724l-1.389-2.1zm-.783-.472h-.785v-1.593h.995c.514 0 1.1.084 1.1.757 0 .774-.593.836-1.314.836" fill="#0a66c2"/></svg>`,'https://www.linkedin.com/learning/certificates/41101523966e7bb39e8e793f1df6c011fa8dc1748a40594096979364d9b578eb'],

                ['Skill Rack', 'Earned Certifications in Python 3.x - Programming Course (Hands-On), C - Programming Course (Hands-On), Java Basics - Programming Course (Hands-On), SQL - Basics (Standard), Data Structure - C - Course (Hands-On)',`<svg width="189" height="185" viewBox="0 0 189 185" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="8" width="87" height="82" rx="10" fill="#3399CC"/><rect x="96" y="8" width="87" height="82" rx="10" fill="#D9D9D9"/><rect x="96" y="95" width="87" height="82" rx="10" fill="#3399CC"/><rect x="6" y="95" width="87" height="82" rx="10" fill="#D9D9D9"/><line y1="-1.5" x2="25.846" y2="-1.5" transform="matrix(-0.913282 0.407329 -0.339011 -0.940783 43.6356 126.923)" stroke="#363636" stroke-width="3"/><line y1="-1.5" x2="24.5582" y2="-1.5" transform="matrix(-0.913716 -0.406353 0.351802 -0.936075 42.4702 147.43)" stroke="#363636" stroke-width="3"/><line y1="-1.5" x2="25.8465" y2="-1.5" transform="matrix(0.919447 -0.389706 0.323889 0.947378 55.2801 149.737)" stroke="#363636" stroke-width="3"/><line y1="-1.5" x2="24.5588" y2="-1.5" transform="matrix(0.906895 0.423995 -0.366624 0.929338 56.7723 129.252)" stroke="#363636" stroke-width="3"/><line y1="-1.5" x2="43.828" y2="-1.5" transform="matrix(-0.284141 0.958783 -0.944501 -0.328509 54.3856 114.873)" stroke="#363636" stroke-width="3"/><line y1="-2.5" x2="24.7487" y2="-2.5" transform="matrix(0.707107 0.707107 -0.656842 0.754028 120 40.5)" stroke="#363636" stroke-width="5"/><line y1="-1.5" x2="67.6036" y2="-1.5" transform="matrix(0.673041 -0.739605 0.691503 0.722374 137.5 58)" stroke="#363636" stroke-width="3"/></svg>
`,'https://www.skillrack.com/faces/resume.xhtml?id=407184&key=646464b7d513f90965adc2db415744472430d117'],
                
                ['User Experience Design – Coursera', 'Explored UX principles, usability testing, persona creation, and user-centric interface strategies for digital products.',`<svg fill="none" height="600" viewBox="0 0 600 600" width="600" xmlns="http://www.w3.org/2000/svg"><path d="m307.031 292.969h-14.062v14.062h14.062z" fill="#fff"/><path d="m600 0h-600v600h600z" fill="#fff"/><path d="m600 0h-600v600h600z" fill="#0056d2"/><g fill="#fff"><path d="m117.913 300.434c0-19.301 15.923-34.875 35.859-34.875 20.07 0 35.992 15.574 35.992 34.875 0 19.167-15.922 35.007-35.992 35.007-19.936 0-35.859-15.973-35.859-35.007zm54.725 0c0-9.583-8.43-18.104-18.866-18.104-10.303 0-18.598 8.521-18.598 18.104 0 9.717 8.429 18.236 18.598 18.236 10.436 0 18.866-8.519 18.866-18.236z"/><path d="m478.15 300.965c0-21.164 17.326-35.406 33.036-35.406 10.747 0 16.924 3.194 21.086 9.452l1.612-8.253h16.116v67.353h-16.116l-2.015-6.923c-4.701 5.059-10.61 8.253-20.546 8.253-15.713 0-33.173-13.577-33.173-34.476zm54.795-.133c0-10.247-8.463-18.502-18.936-18.502-10.341 0-18.668 8.388-18.668 18.771 0 9.316 8.461 17.702 18.668 17.702 10.607-.133 18.936-8.519 18.936-17.971z"/><path d="m458.833 274.982v-7.721h-17.101v66.211h17.101v-35.724c0-10.729 5.221-16.356 14.487-16.356.652 0 1.176 0 1.697.131l3.133-15.964c-8.875.131-15.272 3.14-19.317 9.423z"/><path d="m284.158 274.982v-7.721h-17.623l.135 66.211h17.625l-.137-35.724c0-10.729 5.382-16.356 14.801-16.356.672 0 1.209 0 1.75.131l3.228-15.964c-9.15.131-15.741 3.14-19.779 9.423z"/><path d="m196.654 307.776v-41.233h17.209v39.104c0 8.645 4.73 13.699 13.006 13.699 9.196 0 14.583-5.718 14.583-16.624v-36.179h17.209v67.3h-17.209v-7.845c-4.073 6.383-10.641 9.442-19.706 9.442-15.502.133-25.092-11.172-25.092-27.664z"/><path d="m365.945 300.369c0-18.867 13.621-34.942 34.985-34.809 19.893 0 33.913 15.942 33.913 34.541 0 1.861-.134 3.854-.401 5.582l-51.405-.133c2.004 8.104 8.678 13.816 18.693 13.949 6.141 0 12.685-2.259 16.69-7.308l11.885 9.567c-6.144 8.634-16.959 13.683-28.441 13.683-20.297-.265-35.919-15.411-35.919-35.072zm51.408-6.909c-.937-6.777-8.145-12.091-16.423-12.091-8.145 0-14.689 4.783-17.226 11.958z"/><path d="m303.937 319.559 15.522-8.073c2.542 5.558 7.76 8.734 14.984 8.734 6.691 0 9.234-2.118 9.234-5.029 0-10.721-36.93-4.234-36.93-28.853 0-13.631 12.043-20.779 26.894-20.779 11.239 0 21.274 4.897 26.76 14.163l-15.388 8.073c-2.272-4.5-6.555-7.015-12.041-7.015-5.352 0-7.894 1.854-7.894 4.897 0 10.456 36.93 3.837 36.93 28.853 0 12.97-10.704 20.911-27.966 20.911-14.717-.132-25.02-4.897-30.105-15.882z"/><path d="m50 300.074c0-19.161 15.7897-34.515 35.5599-34.515 12.7377 0 23.7511 6.301 30.1201 15.747l-14.861 8.532c-3.4503-4.724-8.8902-7.873-15.2591-7.873-10.2169 0-18.4434 8.398-18.4434 17.978 0 9.578 8.359 17.976 18.4434 17.976 6.6342 0 12.4724-3.411 15.6571-8.529l14.728 8.66c-6.236 9.843-17.5148 16.406-30.3851 16.406-19.7702.131-35.5599-15.616-35.5599-34.382z"/></g></svg>`,'https://coursera.org/share/59ca2203bfc405f674e8b8063999a3e0'],
                
                ['Figma Masterclass – Udemy', 'Built real-world UI components, responsive design layouts, and interactive prototypes using Figma’s advanced features.',`<svg viewBox="0 0 800.09 301" xmlns="http://www.w3.org/2000/svg" width="2500" height="941"><path d="M124.29 71.82L62.14 35.91 0 71.82V35.91L62.15 0l62.15 35.91v35.91z" fill="#a435f0"/><path d="M32.56 101.97v79.15c0 20.45 15.26 30.42 29.59 30.42 14.45 0 29.6-10.23 29.6-30.69v-78.88h32.55v81.04c0 18.84-5.92 33.37-17.75 43.34-11.85 9.96-26.64 14.81-44.68 14.81-18.02 0-32.82-4.84-44.38-14.81C5.92 216.39 0 202.4 0 183.81v-81.84zm373.19 98.37l24.18 13.97c-14.75 16.82-34.42 26.58-59.14 26.58-21.26 0-38.75-6.46-51.93-19.11-13.18-12.66-19.9-29.63-19.9-50.9v-1.06c0-21.55 6.72-38.78 19.9-51.97 13.46-13.19 30.42-19.65 51.13-19.65 19.65 0 35.78 6.46 48.15 19.65 12.65 13.19 18.84 29.35 18.84 48.74 0 6.25-.71 12.9-.71 12.9H331.09c1.77 20.62 17.43 33.94 40.78 33.94 12.8 0 24.03-4.31 33.88-13.09zm-61.86-66.06c-6.94 5.4-10.93 12.04-11.97 19.92h72.2c-.3-7.62-3.77-14.25-10.19-19.65-6.74-5.93-14.54-8.89-23.95-8.89-9.95 0-18.84 2.96-26.1 8.61zm389.57 124.9c-13.2 31.21-27.02 41.82-48.21 41.82h-14.69v-28.88h11.88c7.29 0 14.06-2.74 20.52-17.65l6.46-14.93-55.7-137.57h33.1l39.55 99.08L767 101.97h33.09l-66.62 157.21zM251.04 50.02h32.29v187.64h-32.29v-12.49c-7.36 6.79-21.29 15.45-43.32 15.45-19.09 0-35.24-6.73-48.42-20.2-12.92-13.73-19.37-30.42-19.37-50.62 0-20.19 6.45-36.88 19.37-50.35C172.48 105.73 188.62 99 207.72 99c16.05 0 32.65 5.69 43.32 15.26zm2.43 119.8c0-11.86-4.05-21.82-12.12-29.62-7.8-7.81-17.75-11.85-29.33-11.85-11.57 0-20.98 4.04-28.78 11.85-7.53 7.8-11.3 17.76-11.3 29.62 0 11.84 3.78 21.8 11.3 29.61 7.8 7.81 17.21 11.85 28.78 11.85 11.58 0 21.53-4.04 29.33-11.85 8.07-7.81 12.12-17.77 12.12-29.61zm350.06-70.53c28.08 0 47.09 18.99 47.09 54.37v84h-32.29v-79.43c0-18.57-8.88-30.15-24.22-30.15-15.87 0-26.89 12.93-26.89 31.5v78.09H535.2v-79.42c0-18.58-8.87-30.16-24.22-30.16-15.05 0-26.36 13.19-26.36 31.5v78.08h-32.01V101.99h32.01v14.11c5.71-7 17.16-16.82 36.59-16.82 22.98 0 32.82 13.32 36.31 19.99 8.74-9.81 21.48-19.99 46.01-19.99z" fill="#ffffff"/></svg>
`,'https://www.udemy.com/certificate/UC-828f3668-c1df-47fd-914c-de1ed00d0e0d/'],

                ['Cisco Networking Basics – Certified', 'Earned a verified badge by mastering core networking principles. Built a strong IT foundation.',`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-0.44 0.24 120 60" width="120" height="60"><g transform="matrix(1.199534 0 0 1.199534 15.237208 6.249314)" fill="#0096d6"><path d="M21.4 26.2h3.2v12.5h-3.2zM50 29.8c-.1-.1-1.1-.7-2.7-.7-2 0-3.5 1.4-3.5 3.3s1.4 3.3 3.5 3.3c1.5 0 2.5-.6 2.7-.7v3.4c-.4.1-1.5.4-2.9.4-3.6 0-6.7-2.4-6.7-6.5 0-3.7 2.8-6.5 6.7-6.5 1.5 0 2.6.4 2.9.4zm-33 0c-.1-.1-1.1-.7-2.7-.7-2 0-3.5 1.4-3.5 3.3s1.4 3.3 3.5 3.3c1.5 0 2.5-.6 2.7-.7v3.4c-.4.1-1.5.4-2.9.4-3.5 0-6.7-2.4-6.7-6.5 0-3.7 2.8-6.5 6.7-6.5 1.5 0 2.6.4 2.9.4zm49.5 2.7c0 3.6-2.8 6.5-6.6 6.5s-6.6-2.9-6.6-6.5 2.8-6.5 6.6-6.5c3.9 0 6.6 2.9 6.6 6.5zm-6.6-3.3c-1.9 0-3.3 1.5-3.3 3.3s1.4 3.3 3.3 3.3 3.3-1.5 3.3-3.3-1.4-3.3-3.3-3.3zm-23.4-.1s-1.4-.4-2.5-.4c-1.3 0-2 .4-2 1 0 .8.9 1 1.4 1.2l.9.3c2 .7 3 2.1 3 3.6 0 3.1-2.8 4.2-5.2 4.2-1.7 0-3.3-.3-3.4-.3v-2.9c.3.1 1.6.5 3 .5 1.6 0 2.3-.5 2.3-1.2 0-.6-.6-1-1.4-1.2-.2-.1-.5-.2-.7-.2-1.8-.6-3.2-1.6-3.2-3.7 0-2.3 1.8-3.9 4.7-3.9 1.5 0 3 .4 3.1.4z"/><use xlink:href="#A"/><path d="M12.7 8.5a1.58 1.58 0 0 0-1.6-1.6c-.9 0-1.5.7-1.5 1.6v7.6a1.58 1.58 0 0 0 1.6 1.6 1.58 1.58 0 0 0 1.6-1.6V8.5zm8.7-5.9A1.58 1.58 0 0 0 19.8 1a1.58 1.58 0 0 0-1.6 1.6v16.6a1.58 1.58 0 0 0 1.6 1.6 1.58 1.58 0 0 0 1.6-1.6zM30 8.5a1.58 1.58 0 0 0-1.6-1.6 1.58 1.58 0 0 0-1.6 1.6v7.6a1.58 1.58 0 0 0 1.6 1.6 1.58 1.58 0 0 0 1.6-1.6z"/><use xlink:href="#A" x="34.5"/><path d="M47.2 8.5a1.58 1.58 0 1 0-3.2 0v7.6a1.58 1.58 0 1 0 3.2 0zm8.6-5.9a1.58 1.58 0 1 0-3.2 0v16.6a1.58 1.58 0 1 0 3.2 0zm8.6 5.9a1.58 1.58 0 1 0-3.2 0v7.6a1.58 1.58 0 1 0 3.2 0zm8.6 4.3a1.58 1.58 0 1 0-3.2 0v3.3a1.58 1.58 0 1 0 3.2 0z"/></g><defs><path id="A" d="M4.1 12.8a1.58 1.58 0 0 0-1.6-1.6 1.58 1.58 0 0 0-1.6 1.6v3.3a1.58 1.58 0 0 0 1.6 1.6 1.58 1.58 0 0 0 1.6-1.6z"/></defs></svg>`,'https://www.credly.com/badges/af785f26-861e-4f0b-a638-27ecda284963/public_url'],

                ['Full Stack Development – LinkedIn Learning', 'Completed end-to-end full-stack training covering React, Node.js, Express, MongoDB, and RESTful API development.',`<svg viewBox="0 -8.881784197001252e-16 267.51517722360785 65.24679557585003" xmlns="http://www.w3.org/2000/svg" width="2500" height="610"><path d="M263.043 56.411a4.418 4.418 0 1 0 .085 0zm0 8.33a3.874 3.874 0 1 1 3.809-3.938v.065a3.791 3.791 0 0 1-3.708 3.871h-.1m-16.96-9.535h-9.6V40.17c0-3.585-.064-8.2-4.993-8.2-5 0-5.765 3.906-5.765 7.939v15.294h-9.6V24.287h9.216v4.225h.129a10.1 10.1 0 0 1 9.093-4.994c9.73 0 11.524 6.4 11.524 14.726zm-40.79-35.143a5.571 5.571 0 1 1 5.57-5.572 5.571 5.571 0 0 1-5.57 5.572m4.8 35.143h-9.61V24.287h9.61zM250.87.004h-55.21a4.728 4.728 0 0 0-4.781 4.67v55.439a4.731 4.731 0 0 0 4.781 4.675h55.21a4.741 4.741 0 0 0 4.8-4.675V4.67a4.738 4.738 0 0 0-4.8-4.67m-86.12 31.749c-4.8 0-7.68 3.205-7.68 7.875s2.879 7.878 7.68 7.878 7.687-3.2 7.687-7.878-2.881-7.875-7.687-7.875m16.525 23.437h-8.838v-4.1h-.131a12.071 12.071 0 0 1-9.544 4.868c-9.224 0-15.3-6.657-15.3-16.071 0-8.646 5.377-16.585 14.216-16.585 3.973 0 7.684 1.087 9.861 4.1h.126V9.577h9.609zm-46.139-19.048a5.756 5.756 0 0 0-5.894-5.89 6.406 6.406 0 0 0-6.784 5.89zm8.132 13.7a16.909 16.909 0 0 1-13.128 6.151c-9.6 0-17.286-6.408-17.286-16.331s7.685-16.328 17.286-16.328c8.973 0 14.6 6.4 14.6 16.328v3.01h-22.282a7.171 7.171 0 0 0 7.235 6.019 8.193 8.193 0 0 0 6.851-3.778zM47.834 24.279h9.219v4.225h.131a10.085 10.085 0 0 1 9.09-4.994c9.735 0 11.527 6.405 11.527 14.726V55.19h-9.6V40.159c0-3.588-.066-8.2-5-8.2-4.99 0-5.76 3.907-5.76 7.939v15.288h-9.6zM82.669 9.58h9.6v27.265l10.88-12.583h11.77l-12.6 14.313 12.335 16.63h-12.066L92.397 39.923h-.126v15.28h-9.6zM32.911 24.276h9.6v30.916h-9.6zm4.8-15.37a5.569 5.569 0 1 1-5.57 5.569 5.569 5.569 0 0 1 5.57-5.569M0 9.587h9.993v36.4h18.5v9.222H0zm263.744 51.522a1.2 1.2 0 0 0 1.21-1.269c0-.9-.543-1.33-1.657-1.33h-1.8v4.712h.677v-2.054h.832l.019.025 1.291 2.029h.724l-1.389-2.1zm-.783-.472h-.785v-1.593h.995c.514 0 1.1.084 1.1.757 0 .774-.593.836-1.314.836" fill="#0a66c2"/></svg>`,'https://www.linkedin.com/learning/certificates/2aa9571064111d9277de2f5ea80065ab6f37f410623a7fdc518a9534fd82e4df'],
                
                ['NCAT 2025 Participation – Naukri Campus All India Career Aptitude Test', 'Participated in India’s largest career aptitude test; scored 28/60 with 100% attempt rate and secured 56.79 percentile in Tamil Nadu, demonstrating verbal and analytical strengths.',`<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;filter:url(#Adobe_OpacityMaskFilter);}.st1{mask:url(#mask0_577_684_00000179643155420805591920000005815785466793435548_);}.st2{fill:#265DF5;}.st3{fill:url(#SVGID_1_);}.st4{fill:#FFFFFF;}</style><defs><filter id="Adobe_OpacityMaskFilter" filterUnits="userSpaceOnUse" x="42.8" y="197.8" width="426.5" height="116.4"><feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/></filter></defs><mask maskUnits="userSpaceOnUse" x="42.8" y="197.8" width="426.5" height="116.4" id="mask0_577_684_00000179643155420805591920000005815785466793435548_"><path class="st0" d="M472.6,197.8H42.8v116.4h429.9V197.8z"/></mask><g class="st1"><path class="st2" d="M223.4,230.3c-3,0-6,0.6-8.7,1.8c-2.6,1.2-4.8,2.9-6.5,5.1v-6.2h-12.8v49.9h12.8v-27.5c0-4,1-7,3.1-9.1c2-2.1,4.8-3.2,8.4-3.2c3.5,0,6.2,1.1,8.2,3.2c2,2.1,3,5.2,3,9.1v27.5h12.8v-29.3c0-6.7-1.9-12-5.6-15.7C234.3,232.2,229.4,230.3,223.4,230.3z"/><path class="st2" d="M290.7,238.2c-1.8-2.4-4.1-4.3-6.8-5.7c-2.8-1.5-6.1-2.3-9.9-2.3c-4.1-0.1-8.2,1-11.8,3.2c-3.6,2.2-6.5,5.3-8.3,9c-2,3.9-3.1,8.4-3.1,13.4c0,5.1,1,9.6,3.1,13.6c1.9,3.7,4.8,6.9,8.3,9.1c3.5,2.2,7.5,3.3,11.7,3.2c3.5,0.1,6.9-0.7,10-2.3c2.7-1.4,5-3.4,6.8-5.8v7.3h12.9v-49.9h-12.9V238.2z M288.9,263.9c-1.1,2.1-2.9,3.8-4.9,5c-2,1.2-4.3,1.8-6.7,1.8c-2.3,0-4.6-0.6-6.5-1.8c-2.1-1.3-3.8-3-4.9-5.2c-1.3-2.4-1.9-5.1-1.9-7.9c0-3,0.6-5.6,1.9-7.8c0.8-1.5,2-2.8,3.4-3.9c1.4-1.1,3-1.9,4.7-2.3c1.7-0.5,3.5-0.6,5.2-0.4c1.7,0.2,3.4,0.8,4.9,1.6c2.1,1.2,3.8,2.9,4.9,5c1.2,2.2,1.8,4.8,1.8,7.9S290.1,261.7,288.9,263.9z"/><path class="st2" d="M347.2,258.5c0,4-1,7-3,9.1c-2,2.1-4.8,3.2-8.3,3.2c-3.5,0-6.2-1.1-8.2-3.2c-2-2.1-3-5.2-3-9.1v-27.5h-12.8v29.3c0,4.4,0.9,8.3,2.6,11.5c1.6,3.1,4.1,5.6,7.2,7.3c3.2,1.7,6.9,2.5,10.5,2.5c3,0,5.9-0.6,8.7-1.8c2.5-1.1,4.8-2.9,6.5-5.1v6.3h12.9v-49.9h-12.9V258.5z"/><path class="st2" d="M414.7,231.1H398l-17,21.2v-37.9h-12.8V281H381v-21.2l17.2,21.2h16.7l-22.5-24.8L414.7,231.1z"/><path class="st2" d="M433.6,238.8v-7.8h-12.8V281h12.8v-24.8c0-4.6,1-7.9,3.1-9.7c2-1.9,5.1-2.8,9.1-2.8h3.4v-13.2c-3.1-0.1-6.2,0.7-9,2.2C437.5,234,435.2,236.2,433.6,238.8z"/><path class="st2" d="M468,231.1h-12.8V281H468V231.1z"/><path class="st2" d="M461.6,225.1c4.2,0,7.7-3.4,7.7-7.5c0-4.2-3.4-7.5-7.7-7.5c-4.2,0-7.7,3.4-7.7,7.5C453.9,221.7,457.3,225.1,461.6,225.1z"/><path class="st2" d="M101.9,314.2c32.7,0,59.2-26.1,59.2-58.2s-26.5-58.2-59.2-58.2c-32.7,0-59.2,26.1-59.2,58.2S69.3,314.2,101.9,314.2z"/><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="113.484" y1="227.321" x2="79.4278" y2="267.2662" gradientTransform="matrix(1 0 0 -1 0 514)"><stop offset="0" style="stop-color:#FFFFFF"/><stop offset="1" style="stop-color:#265DF5"/></linearGradient><path class="st3" d="M119.7,277.6l-0.1,5.9l-0.4,17v0.7c-29.3-24.9-34.3-31-35.1-32.8l0-0.1c-0.1-0.3-0.1-0.7-0.1-1.1c0-0.1,0-0.3,0.1-0.4c0-0.1,0.1-0.2,0.1-0.3c0.3-0.8,0.8-1.6,1.3-2.2c0.4-0.5,0.8-1,1.3-1.4c1-1,2.1-1.9,3.2-2.7c0.6-0.4,1.2-0.8,1.8-1.3c1.2-0.8,2.5-1.6,3.9-2.4C106.2,266.1,119.6,277.4,119.7,277.6z"/><path class="st4" d="M120.1,221.6l-0.1,5.9l-0.1,2.9l-0.1,5.9l-0.1,3l-0.1,5.9c-0.2,0.1-13.6,5.2-23.8,11.2c-1.4,0.8-2.7,1.6-3.9,2.4c-0.6,0.4-1.2,0.8-1.8,1.3c-1.1,0.8-2.2,1.7-3.2,2.7c-0.5,0.5-0.9,0.9-1.3,1.4c-0.9,1.2-1.5,2.3-1.6,3.4l0.1-4.9v0l0-0.8v-0.3l0.1-3.1l0.2-6.2l0.1-3l0.2-6.1C86.8,234.7,116.6,223,120.1,221.6z"/><path class="st4" d="M92.6,228.1c4.9,0,8.8-3.9,8.8-8.6c0-4.8-3.9-8.6-8.8-8.6c-4.9,0-8.8,3.9-8.8,8.6C83.8,224.3,87.7,228.1,92.6,228.1z"/></g></svg>
`,'https://www.naukri.com/campus/certificates/naukri_campus_ai_ncat_participation_may_2025/v0/683a1d4f6c1aa41e163b9e47?utm_source=certificate&utm_medium=copy&utm_campaign=683a1d4f6c1aa41e163b9e47'],

                ['PwC IT Fundamentals Micro Certification – 2025', 'Certified by PwC with a score of 92/100, Gained foundational skills in pseudocode, Agile, OOP principles, and system design.',`<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 72 34.900001525878906"><g xmlns="http://www.w3.org/2000/svg" id="Layer_1">
      <path d="M53.3,14.7c-2.5.4-3.8,2.3-3.8,5.6s1.7,5.5,4.4,5.5,2.3-.4,4.7-1.6v2.7c-2.8,1.3-4.5,1.7-6.8,1.7s-4.2-.7-5.6-2.1c-1.4-1.4-2.2-3.4-2.2-5.5,0-4.7,3.5-8,8.6-8s5.7,1.6,5.7,3.8-1.1,2.5-2.7,2.5-1.5-.2-2.4-.7v-4ZM40.8,21c2.3-2.9,3.1-4,3.1-5.4s-1.1-2.5-2.6-2.5-1.7.4-2.1.9v5.8l-3.7,5v-11.3h-3.5l-5.9,9.8v-9.8h-2l-5.3,1.3v1.4l2.9.3v12h3.8l5.6-9.3v9.3h4.1s5.7-7.3,5.7-7.3ZM7.4,16.5c.9-.1,1.3-.2,1.7-.2,2.5,0,3.8,1.6,3.8,4.7s-1.6,5.5-4.7,5.5-.4,0-.8,0c0,0,0-10,0-10ZM7.4,28.2c1,.1,1.9.1,2.5.1,5,0,8.2-3.2,8.2-8s-2.4-7.1-5.6-7.1-2.4.3-5.1,1.9v-2h-1.5L0,14.9v1.4h2.4v16.7l-2.2.5v1.4h9.6v-1.4l-2.4-.5v-4.8s0,0,0,0Z"></path>
      <path class="cls-1" d="M50.6,9h-16l2.7-4.5h16l-2.7,4.5ZM72,0h-16l-2.7,4.5h16s2.7-4.5,2.7-4.5Z"></path>
    </g></svg>`,'https://pwc.tekstac.com/blocks/tekbadges/badge.php?id=25900'],

     ['PwC RDBMS Using Oracle Micro Certification – 2025', 'Achieved a score of 96/100 in PwC’s micro certification on RDBMS. Learned key RDBMS concepts, queries, joins, subqueries, and Oracle database usage.',`<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 72 34.900001525878906"><g xmlns="http://www.w3.org/2000/svg" id="Layer_1">
      <path d="M53.3,14.7c-2.5.4-3.8,2.3-3.8,5.6s1.7,5.5,4.4,5.5,2.3-.4,4.7-1.6v2.7c-2.8,1.3-4.5,1.7-6.8,1.7s-4.2-.7-5.6-2.1c-1.4-1.4-2.2-3.4-2.2-5.5,0-4.7,3.5-8,8.6-8s5.7,1.6,5.7,3.8-1.1,2.5-2.7,2.5-1.5-.2-2.4-.7v-4ZM40.8,21c2.3-2.9,3.1-4,3.1-5.4s-1.1-2.5-2.6-2.5-1.7.4-2.1.9v5.8l-3.7,5v-11.3h-3.5l-5.9,9.8v-9.8h-2l-5.3,1.3v1.4l2.9.3v12h3.8l5.6-9.3v9.3h4.1s5.7-7.3,5.7-7.3ZM7.4,16.5c.9-.1,1.3-.2,1.7-.2,2.5,0,3.8,1.6,3.8,4.7s-1.6,5.5-4.7,5.5-.4,0-.8,0c0,0,0-10,0-10ZM7.4,28.2c1,.1,1.9.1,2.5.1,5,0,8.2-3.2,8.2-8s-2.4-7.1-5.6-7.1-2.4.3-5.1,1.9v-2h-1.5L0,14.9v1.4h2.4v16.7l-2.2.5v1.4h9.6v-1.4l-2.4-.5v-4.8s0,0,0,0Z"></path>
      <path class="cls-1" d="M50.6,9h-16l2.7-4.5h16l-2.7,4.5ZM72,0h-16l-2.7,4.5h16s2.7-4.5,2.7-4.5Z"></path>
    </g></svg>`,'https://pwc.tekstac.com/blocks/tekbadges/badge.php?id=27901'],

    ['PwC Programming Fundamentals – Java Micro Certification – 2025', 'Scored 94/100 in PwC’s Java micro certification, Covered Java basics, OOP, arrays, strings, and regular expressions.',`<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 72 34.900001525878906"><g xmlns="http://www.w3.org/2000/svg" id="Layer_1">
      <path d="M53.3,14.7c-2.5.4-3.8,2.3-3.8,5.6s1.7,5.5,4.4,5.5,2.3-.4,4.7-1.6v2.7c-2.8,1.3-4.5,1.7-6.8,1.7s-4.2-.7-5.6-2.1c-1.4-1.4-2.2-3.4-2.2-5.5,0-4.7,3.5-8,8.6-8s5.7,1.6,5.7,3.8-1.1,2.5-2.7,2.5-1.5-.2-2.4-.7v-4ZM40.8,21c2.3-2.9,3.1-4,3.1-5.4s-1.1-2.5-2.6-2.5-1.7.4-2.1.9v5.8l-3.7,5v-11.3h-3.5l-5.9,9.8v-9.8h-2l-5.3,1.3v1.4l2.9.3v12h3.8l5.6-9.3v9.3h4.1s5.7-7.3,5.7-7.3ZM7.4,16.5c.9-.1,1.3-.2,1.7-.2,2.5,0,3.8,1.6,3.8,4.7s-1.6,5.5-4.7,5.5-.4,0-.8,0c0,0,0-10,0-10ZM7.4,28.2c1,.1,1.9.1,2.5.1,5,0,8.2-3.2,8.2-8s-2.4-7.1-5.6-7.1-2.4.3-5.1,1.9v-2h-1.5L0,14.9v1.4h2.4v16.7l-2.2.5v1.4h9.6v-1.4l-2.4-.5v-4.8s0,0,0,0Z"></path>
      <path class="cls-1" d="M50.6,9h-16l2.7-4.5h16l-2.7,4.5ZM72,0h-16l-2.7,4.5h16s2.7-4.5,2.7-4.5Z"></path>
    </g></svg>`,'https://pwc.tekstac.com/blocks/tekbadges/badge.php?id=31671'],

        ['PwC DevOps & Cloud Fundamentals Micro Certification – 2025', 'Completed PwC’s certification with a score of 82/100, Learned core cloud concepts, DevOps, Git, and basics of AWS, Azure, and GCP.',`<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 72 34.900001525878906"><g xmlns="http://www.w3.org/2000/svg" id="Layer_1">
      <path d="M53.3,14.7c-2.5.4-3.8,2.3-3.8,5.6s1.7,5.5,4.4,5.5,2.3-.4,4.7-1.6v2.7c-2.8,1.3-4.5,1.7-6.8,1.7s-4.2-.7-5.6-2.1c-1.4-1.4-2.2-3.4-2.2-5.5,0-4.7,3.5-8,8.6-8s5.7,1.6,5.7,3.8-1.1,2.5-2.7,2.5-1.5-.2-2.4-.7v-4ZM40.8,21c2.3-2.9,3.1-4,3.1-5.4s-1.1-2.5-2.6-2.5-1.7.4-2.1.9v5.8l-3.7,5v-11.3h-3.5l-5.9,9.8v-9.8h-2l-5.3,1.3v1.4l2.9.3v12h3.8l5.6-9.3v9.3h4.1s5.7-7.3,5.7-7.3ZM7.4,16.5c.9-.1,1.3-.2,1.7-.2,2.5,0,3.8,1.6,3.8,4.7s-1.6,5.5-4.7,5.5-.4,0-.8,0c0,0,0-10,0-10ZM7.4,28.2c1,.1,1.9.1,2.5.1,5,0,8.2-3.2,8.2-8s-2.4-7.1-5.6-7.1-2.4.3-5.1,1.9v-2h-1.5L0,14.9v1.4h2.4v16.7l-2.2.5v1.4h9.6v-1.4l-2.4-.5v-4.8s0,0,0,0Z"></path>
      <path class="cls-1" d="M50.6,9h-16l2.7-4.5h16l-2.7,4.5ZM72,0h-16l-2.7,4.5h16s2.7-4.5,2.7-4.5Z"></path>
    </g></svg>`,'https://pwc.tekstac.com/blocks/tekbadges/badge.php?id=31671'],


            ].map(([title, description, svg, link], index) => (
              <Grid
                item
                xs={12}
                sm={10}
                md={4}
                key={index}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                 <Box
                  component="a"
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ textDecoration: 'none', width: '100%', maxWidth: 360 }}
                >
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.1) 100%)',
                    backdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    marginTop: '40px',
                    borderRadius: '28px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.3), 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(255, 255, 255, 0.05), inset 1px 0 0 rgba(255, 255, 255, 0.1), inset -1px 0 0 rgba(255, 255, 255, 0.1)',
                    height: '100%',
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
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
                      zIndex: 1
                    },
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: '0 15px 50px rgba(0, 0, 0, 0.15), 0 2px 0 rgba(255, 255, 255, 0.4), 0 -2px 0 rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 1px 0 0 rgba(255, 255, 255, 0.15), inset -1px 0 0 rgba(255, 255, 255, 0.15)',
                      borderColor: 'rgba(77, 184, 255, 0.25)'
                    },
                    width: '100%',
                    maxWidth: 360
                  }}
                >
                  <CardContent>
                     {/* 🔵 Icon on Top */}
                   <Box
                      sx={{
                        mb: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        '& svg': {
                          width: '100px',    // 👈 reduce to any size you want
                          height: '100px',
                        }
                      }}
                      dangerouslySetInnerHTML={{ __html: svg }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#4db8ff',
                        fontWeight: 600,
                        fontSize: '1.15rem',
                        fontFamily: '"Poppins", sans-serif',
                        mb: 1
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#c0c0c0',
                        fontSize: '0.95rem',
                        fontFamily: '"Poppins", sans-serif',
                        lineHeight: 1.6
                      }}
                    >
                      {description}
                    </Typography>
                  </CardContent>
                </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Section>
      </Box>
    </Box>
  }
/>



<Route
  path="/achievements"
  element={
    <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
      
      {/* Custom Animated Background */}
      <AnimatedBackground />



      {/* 🔲 Optional Transparent Overlay for readability */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2))',
          zIndex: 1
        }}
      />

      {/* 🔤 Foreground Section Content */}
      <Box sx={{ position: 'relative', zIndex: 2, marginTop: '60px' }}>
        <Section title="Achievements" bg="transparent">
           <Grid
            container
            spacing={4}
            justifyContent="center"
            direction={{ xs: 'column', sm: 'column', md: 'row' }}
            alignItems={{ xs: 'center', md: 'stretch' }}
            sx={{ mt: 2 }}
          >
            {[
                ['2nd Place: IEEE Code Debugging Event', 'Excelled in competitive debugging. earning 2nd place.',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#c4caf3" d="M137.914 274.383c-4.146 0-8.354-.566-12.534-1.753-7.968-2.264-12.589-10.549-10.322-18.506s10.569-12.57 18.532-10.308c8.415 2.39 17.2-2.498 19.593-10.896 2.393-8.399-2.502-17.175-10.912-19.565-29.498-8.274-56.167-28.74-75.046-57.615-18.985-29.038-29.02-64.042-29.02-101.227v-.116c.052-14.62 5.781-28.295 16.132-38.559C64.641 5.62 78.299 0 92.812 0l.198.001c30.114.107 54.527 24.658 54.421 54.728-.029 8.254-6.74 14.926-14.999 14.926h-.054c-8.284-.029-14.976-6.759-14.947-15.031.048-13.553-10.955-24.618-24.527-24.666-6.591-.044-12.764 2.511-17.429 7.137s-7.247 10.789-7.271 17.354v.064c0 30.906 8.573 61.04 24.141 84.85 14.906 22.799 35.535 38.839 58.087 45.165 24.37 6.925 38.525 32.305 31.605 56.591-5.73 20.112-24.15 33.262-44.123 33.264z" opacity="1" data-original="#c4caf3"></path><path fill="#a8b1ec" d="M374.086 274.383c-19.976.002-38.392-13.15-44.123-33.265-6.921-24.285 7.235-49.666 31.556-56.577 22.601-6.34 43.23-22.379 58.136-45.178 15.568-23.811 24.141-53.945 24.141-84.85v-.116c-.023-6.512-2.605-12.675-7.27-17.302-4.644-4.605-10.799-7.137-17.34-7.137h-.089c-13.572.048-24.574 11.113-24.526 24.666.029 8.272-6.663 15.002-14.947 15.031h-.054c-8.26 0-14.97-6.671-14.999-14.926-.106-30.07 24.307-54.621 54.42-54.728l.198-.001c14.515 0 28.171 5.62 38.476 15.838 10.352 10.264 16.081 23.939 16.132 38.506v.169c0 37.185-10.035 72.189-29.02 101.227-18.878 28.875-45.547 49.341-75.095 57.629-8.361 2.376-13.256 11.153-10.863 19.551s11.182 13.286 19.593 10.897c7.963-2.264 16.265 2.35 18.532 10.308 2.267 7.957-2.354 16.242-10.322 18.506a45.875 45.875 0 0 1-12.536 1.752z" opacity="1" data-original="#a8b1ec"></path><path fill="#e0e4f8" d="M331.754 422.663H180.246c-8.284 0-15-6.706-15-14.979 0-32.803 17.664-62.704 45.754-78.709V266.34c-6.485-2.755-12.7-6.1-18.566-9.995-32.082-21.303-51.234-56.989-51.234-95.46V14.979C141.2 6.707 147.916 0 156.2 0h199.602c8.284 0 15 6.706 15 14.979v145.906c0 38.472-19.153 74.158-51.234 95.46a114.53 114.53 0 0 1-18.566 9.995v62.635c28.09 16.005 45.754 45.906 45.754 78.709-.002 8.273-6.717 14.979-15.002 14.979z" opacity="1" data-original="#e0e4f8"></path><path fill="#c4caf3" d="M319.566 256.345c32.082-21.302 51.234-56.988 51.234-95.46V14.979C370.8 6.707 364.084 0 355.8 0H256v422.662h75.754c8.284 0 15-6.706 15-14.979 0-32.803-17.664-62.704-45.754-78.709V266.34c6.485-2.755 12.7-6.1 18.566-9.995z" opacity="1" data-original="#c4caf3"></path><path fill="#c4caf3" d="M253.453 197.373c-18.721 0-20.216-.498-22.196-1.157-4.792-1.596-8.524-5.383-9.987-10.133-2.473-8.03 1.471-13.187 7.442-20.994 4.736-6.193 13.552-17.72 28.334-38.81 4.748-6.774 6.692-11.528 7.476-14.467l.203-1.59c-.37-4.598-4.236-8.226-8.934-8.226-4.276 0-7.975 3.028-8.795 7.2-1.597 8.117-9.488 13.404-17.61 11.811-8.129-1.595-13.424-9.468-11.828-17.585 3.577-18.185 19.656-31.383 38.233-31.383 21.485 0 38.963 17.454 38.963 38.908 0 .635-.04 1.269-.121 1.899l-.463 3.617c-.064.498-.152.993-.266 1.483-1.84 7.925-5.971 16.508-12.28 25.51-6.912 9.863-12.558 17.691-17.115 23.894 6.15-.036 12.729-.098 19.026-.177 8.241-.092 15.083 6.518 15.188 14.789.103 8.272-6.527 15.062-14.811 15.166-13.409.171-23.222.245-30.459.245zM296 311.372h-80c-8.284 0-15-6.706-15-14.979s6.716-14.979 15-14.979h80c8.284 0 15 6.706 15 14.979s-6.716 14.979-15 14.979z" opacity="1" data-original="#c4caf3"></path><path fill="#a8b1ec" d="M296 281.414h-40v29.957h40c8.284 0 15-6.706 15-14.979s-6.716-14.978-15-14.978zM283.535 167.176c-6.297.079-12.876.14-19.026.177 4.558-6.203 10.203-14.032 17.115-23.894 6.31-9.002 10.44-17.585 12.28-25.51.113-.49.202-.985.266-1.483l.463-3.617c.081-.63.121-1.264.121-1.899 0-21.384-17.366-38.79-38.754-38.903v29.962c4.602.107 8.36 3.687 8.725 8.216l-.203 1.59c-.783 2.939-2.728 7.693-7.476 14.467L256 127.77v69.602c6.949-.015 16.012-.09 27.912-.239 8.283-.104 14.914-6.894 14.811-15.166-.105-8.274-6.947-14.883-15.188-14.791z" opacity="1" data-original="#a8b1ec"></path><path fill="#ba602b" d="M395.631 512H116.369c-8.284 0-15-6.706-15-14.979v-89.337c0-8.272 6.716-14.979 15-14.979h279.263c8.284 0 15 6.706 15 14.979v89.337c-.001 8.273-6.717 14.979-15.001 14.979z" opacity="1" data-original="#ba602b"></path><path fill="#964c22" d="M395.631 392.706H256V512h139.631c8.284 0 15-6.706 15-14.979v-89.337c0-8.272-6.716-14.978-15-14.978z" opacity="1" data-original="#964c22"></path><path fill="#964c22" d="M415.631 512H96.369c-8.284 0-15-6.706-15-14.979s6.716-14.979 15-14.979h319.263c8.284 0 15 6.706 15 14.979S423.915 512 415.631 512z" opacity="1" data-original="#964c22"></path><path fill="#6f3716" d="M415.631 482.043H256V512h159.631c8.284 0 15-6.706 15-14.979s-6.716-14.978-15-14.978z" opacity="1" data-original="#6f3716"></path></g></svg>`],
                
                ['2nd Place: Paper Presentation at Guru Nanak College', 'Presented innovative research ideas. Secured 2nd place.',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#c4caf3" d="M137.914 274.383c-4.146 0-8.354-.566-12.534-1.753-7.968-2.264-12.589-10.549-10.322-18.506s10.569-12.57 18.532-10.308c8.415 2.39 17.2-2.498 19.593-10.896 2.393-8.399-2.502-17.175-10.912-19.565-29.498-8.274-56.167-28.74-75.046-57.615-18.985-29.038-29.02-64.042-29.02-101.227v-.116c.052-14.62 5.781-28.295 16.132-38.559C64.641 5.62 78.299 0 92.812 0l.198.001c30.114.107 54.527 24.658 54.421 54.728-.029 8.254-6.74 14.926-14.999 14.926h-.054c-8.284-.029-14.976-6.759-14.947-15.031.048-13.553-10.955-24.618-24.527-24.666-6.591-.044-12.764 2.511-17.429 7.137s-7.247 10.789-7.271 17.354v.064c0 30.906 8.573 61.04 24.141 84.85 14.906 22.799 35.535 38.839 58.087 45.165 24.37 6.925 38.525 32.305 31.605 56.591-5.73 20.112-24.15 33.262-44.123 33.264z" opacity="1" data-original="#c4caf3"></path><path fill="#a8b1ec" d="M374.086 274.383c-19.976.002-38.392-13.15-44.123-33.265-6.921-24.285 7.235-49.666 31.556-56.577 22.601-6.34 43.23-22.379 58.136-45.178 15.568-23.811 24.141-53.945 24.141-84.85v-.116c-.023-6.512-2.605-12.675-7.27-17.302-4.644-4.605-10.799-7.137-17.34-7.137h-.089c-13.572.048-24.574 11.113-24.526 24.666.029 8.272-6.663 15.002-14.947 15.031h-.054c-8.26 0-14.97-6.671-14.999-14.926-.106-30.07 24.307-54.621 54.42-54.728l.198-.001c14.515 0 28.171 5.62 38.476 15.838 10.352 10.264 16.081 23.939 16.132 38.506v.169c0 37.185-10.035 72.189-29.02 101.227-18.878 28.875-45.547 49.341-75.095 57.629-8.361 2.376-13.256 11.153-10.863 19.551s11.182 13.286 19.593 10.897c7.963-2.264 16.265 2.35 18.532 10.308 2.267 7.957-2.354 16.242-10.322 18.506a45.875 45.875 0 0 1-12.536 1.752z" opacity="1" data-original="#a8b1ec"></path><path fill="#e0e4f8" d="M331.754 422.663H180.246c-8.284 0-15-6.706-15-14.979 0-32.803 17.664-62.704 45.754-78.709V266.34c-6.485-2.755-12.7-6.1-18.566-9.995-32.082-21.303-51.234-56.989-51.234-95.46V14.979C141.2 6.707 147.916 0 156.2 0h199.602c8.284 0 15 6.706 15 14.979v145.906c0 38.472-19.153 74.158-51.234 95.46a114.53 114.53 0 0 1-18.566 9.995v62.635c28.09 16.005 45.754 45.906 45.754 78.709-.002 8.273-6.717 14.979-15.002 14.979z" opacity="1" data-original="#e0e4f8"></path><path fill="#c4caf3" d="M319.566 256.345c32.082-21.302 51.234-56.988 51.234-95.46V14.979C370.8 6.707 364.084 0 355.8 0H256v422.662h75.754c8.284 0 15-6.706 15-14.979 0-32.803-17.664-62.704-45.754-78.709V266.34c6.485-2.755 12.7-6.1 18.566-9.995z" opacity="1" data-original="#c4caf3"></path><path fill="#c4caf3" d="M253.453 197.373c-18.721 0-20.216-.498-22.196-1.157-4.792-1.596-8.524-5.383-9.987-10.133-2.473-8.03 1.471-13.187 7.442-20.994 4.736-6.193 13.552-17.72 28.334-38.81 4.748-6.774 6.692-11.528 7.476-14.467l.203-1.59c-.37-4.598-4.236-8.226-8.934-8.226-4.276 0-7.975 3.028-8.795 7.2-1.597 8.117-9.488 13.404-17.61 11.811-8.129-1.595-13.424-9.468-11.828-17.585 3.577-18.185 19.656-31.383 38.233-31.383 21.485 0 38.963 17.454 38.963 38.908 0 .635-.04 1.269-.121 1.899l-.463 3.617c-.064.498-.152.993-.266 1.483-1.84 7.925-5.971 16.508-12.28 25.51-6.912 9.863-12.558 17.691-17.115 23.894 6.15-.036 12.729-.098 19.026-.177 8.241-.092 15.083 6.518 15.188 14.789.103 8.272-6.527 15.062-14.811 15.166-13.409.171-23.222.245-30.459.245zM296 311.372h-80c-8.284 0-15-6.706-15-14.979s6.716-14.979 15-14.979h80c8.284 0 15 6.706 15 14.979s-6.716 14.979-15 14.979z" opacity="1" data-original="#c4caf3"></path><path fill="#a8b1ec" d="M296 281.414h-40v29.957h40c8.284 0 15-6.706 15-14.979s-6.716-14.978-15-14.978zM283.535 167.176c-6.297.079-12.876.14-19.026.177 4.558-6.203 10.203-14.032 17.115-23.894 6.31-9.002 10.44-17.585 12.28-25.51.113-.49.202-.985.266-1.483l.463-3.617c.081-.63.121-1.264.121-1.899 0-21.384-17.366-38.79-38.754-38.903v29.962c4.602.107 8.36 3.687 8.725 8.216l-.203 1.59c-.783 2.939-2.728 7.693-7.476 14.467L256 127.77v69.602c6.949-.015 16.012-.09 27.912-.239 8.283-.104 14.914-6.894 14.811-15.166-.105-8.274-6.947-14.883-15.188-14.791z" opacity="1" data-original="#a8b1ec"></path><path fill="#ba602b" d="M395.631 512H116.369c-8.284 0-15-6.706-15-14.979v-89.337c0-8.272 6.716-14.979 15-14.979h279.263c8.284 0 15 6.706 15 14.979v89.337c-.001 8.273-6.717 14.979-15.001 14.979z" opacity="1" data-original="#ba602b"></path><path fill="#964c22" d="M395.631 392.706H256V512h139.631c8.284 0 15-6.706 15-14.979v-89.337c0-8.272-6.716-14.978-15-14.978z" opacity="1" data-original="#964c22"></path><path fill="#964c22" d="M415.631 512H96.369c-8.284 0-15-6.706-15-14.979s6.716-14.979 15-14.979h319.263c8.284 0 15 6.706 15 14.979S423.915 512 415.631 512z" opacity="1" data-original="#964c22"></path><path fill="#6f3716" d="M415.631 482.043H256V512h159.631c8.284 0 15-6.706 15-14.979s-6.716-14.978-15-14.978z" opacity="1" data-original="#6f3716"></path></g></svg>`],
                
                ['2nd Place: Overall Runner-up at GNC Symposium', 'Contributed to the team. Performed well overall. Secured 2nd place.','<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#c4caf3" d="M137.914 274.383c-4.146 0-8.354-.566-12.534-1.753-7.968-2.264-12.589-10.549-10.322-18.506s10.569-12.57 18.532-10.308c8.415 2.39 17.2-2.498 19.593-10.896 2.393-8.399-2.502-17.175-10.912-19.565-29.498-8.274-56.167-28.74-75.046-57.615-18.985-29.038-29.02-64.042-29.02-101.227v-.116c.052-14.62 5.781-28.295 16.132-38.559C64.641 5.62 78.299 0 92.812 0l.198.001c30.114.107 54.527 24.658 54.421 54.728-.029 8.254-6.74 14.926-14.999 14.926h-.054c-8.284-.029-14.976-6.759-14.947-15.031.048-13.553-10.955-24.618-24.527-24.666-6.591-.044-12.764 2.511-17.429 7.137s-7.247 10.789-7.271 17.354v.064c0 30.906 8.573 61.04 24.141 84.85 14.906 22.799 35.535 38.839 58.087 45.165 24.37 6.925 38.525 32.305 31.605 56.591-5.73 20.112-24.15 33.262-44.123 33.264z" opacity="1" data-original="#c4caf3"></path><path fill="#a8b1ec" d="M374.086 274.383c-19.976.002-38.392-13.15-44.123-33.265-6.921-24.285 7.235-49.666 31.556-56.577 22.601-6.34 43.23-22.379 58.136-45.178 15.568-23.811 24.141-53.945 24.141-84.85v-.116c-.023-6.512-2.605-12.675-7.27-17.302-4.644-4.605-10.799-7.137-17.34-7.137h-.089c-13.572.048-24.574 11.113-24.526 24.666.029 8.272-6.663 15.002-14.947 15.031h-.054c-8.26 0-14.97-6.671-14.999-14.926-.106-30.07 24.307-54.621 54.42-54.728l.198-.001c14.515 0 28.171 5.62 38.476 15.838 10.352 10.264 16.081 23.939 16.132 38.506v.169c0 37.185-10.035 72.189-29.02 101.227-18.878 28.875-45.547 49.341-75.095 57.629-8.361 2.376-13.256 11.153-10.863 19.551s11.182 13.286 19.593 10.897c7.963-2.264 16.265 2.35 18.532 10.308 2.267 7.957-2.354 16.242-10.322 18.506a45.875 45.875 0 0 1-12.536 1.752z" opacity="1" data-original="#a8b1ec"></path><path fill="#e0e4f8" d="M331.754 422.663H180.246c-8.284 0-15-6.706-15-14.979 0-32.803 17.664-62.704 45.754-78.709V266.34c-6.485-2.755-12.7-6.1-18.566-9.995-32.082-21.303-51.234-56.989-51.234-95.46V14.979C141.2 6.707 147.916 0 156.2 0h199.602c8.284 0 15 6.706 15 14.979v145.906c0 38.472-19.153 74.158-51.234 95.46a114.53 114.53 0 0 1-18.566 9.995v62.635c28.09 16.005 45.754 45.906 45.754 78.709-.002 8.273-6.717 14.979-15.002 14.979z" opacity="1" data-original="#e0e4f8"></path><path fill="#c4caf3" d="M319.566 256.345c32.082-21.302 51.234-56.988 51.234-95.46V14.979C370.8 6.707 364.084 0 355.8 0H256v422.662h75.754c8.284 0 15-6.706 15-14.979 0-32.803-17.664-62.704-45.754-78.709V266.34c6.485-2.755 12.7-6.1 18.566-9.995z" opacity="1" data-original="#c4caf3"></path><path fill="#c4caf3" d="M253.453 197.373c-18.721 0-20.216-.498-22.196-1.157-4.792-1.596-8.524-5.383-9.987-10.133-2.473-8.03 1.471-13.187 7.442-20.994 4.736-6.193 13.552-17.72 28.334-38.81 4.748-6.774 6.692-11.528 7.476-14.467l.203-1.59c-.37-4.598-4.236-8.226-8.934-8.226-4.276 0-7.975 3.028-8.795 7.2-1.597 8.117-9.488 13.404-17.61 11.811-8.129-1.595-13.424-9.468-11.828-17.585 3.577-18.185 19.656-31.383 38.233-31.383 21.485 0 38.963 17.454 38.963 38.908 0 .635-.04 1.269-.121 1.899l-.463 3.617c-.064.498-.152.993-.266 1.483-1.84 7.925-5.971 16.508-12.28 25.51-6.912 9.863-12.558 17.691-17.115 23.894 6.15-.036 12.729-.098 19.026-.177 8.241-.092 15.083 6.518 15.188 14.789.103 8.272-6.527 15.062-14.811 15.166-13.409.171-23.222.245-30.459.245zM296 311.372h-80c-8.284 0-15-6.706-15-14.979s6.716-14.979 15-14.979h80c8.284 0 15 6.706 15 14.979s-6.716 14.979-15 14.979z" opacity="1" data-original="#c4caf3"></path><path fill="#a8b1ec" d="M296 281.414h-40v29.957h40c8.284 0 15-6.706 15-14.979s-6.716-14.978-15-14.978zM283.535 167.176c-6.297.079-12.876.14-19.026.177 4.558-6.203 10.203-14.032 17.115-23.894 6.31-9.002 10.44-17.585 12.28-25.51.113-.49.202-.985.266-1.483l.463-3.617c.081-.63.121-1.264.121-1.899 0-21.384-17.366-38.79-38.754-38.903v29.962c4.602.107 8.36 3.687 8.725 8.216l-.203 1.59c-.783 2.939-2.728 7.693-7.476 14.467L256 127.77v69.602c6.949-.015 16.012-.09 27.912-.239 8.283-.104 14.914-6.894 14.811-15.166-.105-8.274-6.947-14.883-15.188-14.791z" opacity="1" data-original="#a8b1ec"></path><path fill="#ba602b" d="M395.631 512H116.369c-8.284 0-15-6.706-15-14.979v-89.337c0-8.272 6.716-14.979 15-14.979h279.263c8.284 0 15 6.706 15 14.979v89.337c-.001 8.273-6.717 14.979-15.001 14.979z" opacity="1" data-original="#ba602b"></path><path fill="#964c22" d="M395.631 392.706H256V512h139.631c8.284 0 15-6.706 15-14.979v-89.337c0-8.272-6.716-14.978-15-14.978z" opacity="1" data-original="#964c22"></path><path fill="#964c22" d="M415.631 512H96.369c-8.284 0-15-6.706-15-14.979s6.716-14.979 15-14.979h319.263c8.284 0 15 6.706 15 14.979S423.915 512 415.631 512z" opacity="1" data-original="#964c22"></path><path fill="#6f3716" d="M415.631 482.043H256V512h159.631c8.284 0 15-6.706 15-14.979s-6.716-14.978-15-14.978z" opacity="1" data-original="#6f3716"></path></g></svg>'],
                
                ['2nd Place: Data Preprocessing Event', 'Showcased data analysis skills to win 2nd place.',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#c4caf3" d="M137.914 274.383c-4.146 0-8.354-.566-12.534-1.753-7.968-2.264-12.589-10.549-10.322-18.506s10.569-12.57 18.532-10.308c8.415 2.39 17.2-2.498 19.593-10.896 2.393-8.399-2.502-17.175-10.912-19.565-29.498-8.274-56.167-28.74-75.046-57.615-18.985-29.038-29.02-64.042-29.02-101.227v-.116c.052-14.62 5.781-28.295 16.132-38.559C64.641 5.62 78.299 0 92.812 0l.198.001c30.114.107 54.527 24.658 54.421 54.728-.029 8.254-6.74 14.926-14.999 14.926h-.054c-8.284-.029-14.976-6.759-14.947-15.031.048-13.553-10.955-24.618-24.527-24.666-6.591-.044-12.764 2.511-17.429 7.137s-7.247 10.789-7.271 17.354v.064c0 30.906 8.573 61.04 24.141 84.85 14.906 22.799 35.535 38.839 58.087 45.165 24.37 6.925 38.525 32.305 31.605 56.591-5.73 20.112-24.15 33.262-44.123 33.264z" opacity="1" data-original="#c4caf3"></path><path fill="#a8b1ec" d="M374.086 274.383c-19.976.002-38.392-13.15-44.123-33.265-6.921-24.285 7.235-49.666 31.556-56.577 22.601-6.34 43.23-22.379 58.136-45.178 15.568-23.811 24.141-53.945 24.141-84.85v-.116c-.023-6.512-2.605-12.675-7.27-17.302-4.644-4.605-10.799-7.137-17.34-7.137h-.089c-13.572.048-24.574 11.113-24.526 24.666.029 8.272-6.663 15.002-14.947 15.031h-.054c-8.26 0-14.97-6.671-14.999-14.926-.106-30.07 24.307-54.621 54.42-54.728l.198-.001c14.515 0 28.171 5.62 38.476 15.838 10.352 10.264 16.081 23.939 16.132 38.506v.169c0 37.185-10.035 72.189-29.02 101.227-18.878 28.875-45.547 49.341-75.095 57.629-8.361 2.376-13.256 11.153-10.863 19.551s11.182 13.286 19.593 10.897c7.963-2.264 16.265 2.35 18.532 10.308 2.267 7.957-2.354 16.242-10.322 18.506a45.875 45.875 0 0 1-12.536 1.752z" opacity="1" data-original="#a8b1ec"></path><path fill="#e0e4f8" d="M331.754 422.663H180.246c-8.284 0-15-6.706-15-14.979 0-32.803 17.664-62.704 45.754-78.709V266.34c-6.485-2.755-12.7-6.1-18.566-9.995-32.082-21.303-51.234-56.989-51.234-95.46V14.979C141.2 6.707 147.916 0 156.2 0h199.602c8.284 0 15 6.706 15 14.979v145.906c0 38.472-19.153 74.158-51.234 95.46a114.53 114.53 0 0 1-18.566 9.995v62.635c28.09 16.005 45.754 45.906 45.754 78.709-.002 8.273-6.717 14.979-15.002 14.979z" opacity="1" data-original="#e0e4f8"></path><path fill="#c4caf3" d="M319.566 256.345c32.082-21.302 51.234-56.988 51.234-95.46V14.979C370.8 6.707 364.084 0 355.8 0H256v422.662h75.754c8.284 0 15-6.706 15-14.979 0-32.803-17.664-62.704-45.754-78.709V266.34c6.485-2.755 12.7-6.1 18.566-9.995z" opacity="1" data-original="#c4caf3"></path><path fill="#c4caf3" d="M253.453 197.373c-18.721 0-20.216-.498-22.196-1.157-4.792-1.596-8.524-5.383-9.987-10.133-2.473-8.03 1.471-13.187 7.442-20.994 4.736-6.193 13.552-17.72 28.334-38.81 4.748-6.774 6.692-11.528 7.476-14.467l.203-1.59c-.37-4.598-4.236-8.226-8.934-8.226-4.276 0-7.975 3.028-8.795 7.2-1.597 8.117-9.488 13.404-17.61 11.811-8.129-1.595-13.424-9.468-11.828-17.585 3.577-18.185 19.656-31.383 38.233-31.383 21.485 0 38.963 17.454 38.963 38.908 0 .635-.04 1.269-.121 1.899l-.463 3.617c-.064.498-.152.993-.266 1.483-1.84 7.925-5.971 16.508-12.28 25.51-6.912 9.863-12.558 17.691-17.115 23.894 6.15-.036 12.729-.098 19.026-.177 8.241-.092 15.083 6.518 15.188 14.789.103 8.272-6.527 15.062-14.811 15.166-13.409.171-23.222.245-30.459.245zM296 311.372h-80c-8.284 0-15-6.706-15-14.979s6.716-14.979 15-14.979h80c8.284 0 15 6.706 15 14.979s-6.716 14.979-15 14.979z" opacity="1" data-original="#c4caf3"></path><path fill="#a8b1ec" d="M296 281.414h-40v29.957h40c8.284 0 15-6.706 15-14.979s-6.716-14.978-15-14.978zM283.535 167.176c-6.297.079-12.876.14-19.026.177 4.558-6.203 10.203-14.032 17.115-23.894 6.31-9.002 10.44-17.585 12.28-25.51.113-.49.202-.985.266-1.483l.463-3.617c.081-.63.121-1.264.121-1.899 0-21.384-17.366-38.79-38.754-38.903v29.962c4.602.107 8.36 3.687 8.725 8.216l-.203 1.59c-.783 2.939-2.728 7.693-7.476 14.467L256 127.77v69.602c6.949-.015 16.012-.09 27.912-.239 8.283-.104 14.914-6.894 14.811-15.166-.105-8.274-6.947-14.883-15.188-14.791z" opacity="1" data-original="#a8b1ec"></path><path fill="#ba602b" d="M395.631 512H116.369c-8.284 0-15-6.706-15-14.979v-89.337c0-8.272 6.716-14.979 15-14.979h279.263c8.284 0 15 6.706 15 14.979v89.337c-.001 8.273-6.717 14.979-15.001 14.979z" opacity="1" data-original="#ba602b"></path><path fill="#964c22" d="M395.631 392.706H256V512h139.631c8.284 0 15-6.706 15-14.979v-89.337c0-8.272-6.716-14.978-15-14.978z" opacity="1" data-original="#964c22"></path><path fill="#964c22" d="M415.631 512H96.369c-8.284 0-15-6.706-15-14.979s6.716-14.979 15-14.979h319.263c8.284 0 15 6.706 15 14.979S423.915 512 415.631 512z" opacity="1" data-original="#964c22"></path><path fill="#6f3716" d="M415.631 482.043H256V512h159.631c8.284 0 15-6.706 15-14.979s-6.716-14.978-15-14.978z" opacity="1" data-original="#6f3716"></path></g></svg>`],
                
                ['3rd Place: Code Debugging at Dr. MGR Research Institute', 'Secured 3rd in national debugging.',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#e4624c" d="M137.914 274.383c-4.146 0-8.354-.566-12.534-1.753-7.968-2.264-12.589-10.549-10.322-18.506s10.569-12.57 18.532-10.308c8.415 2.39 17.2-2.498 19.593-10.896 2.393-8.399-2.502-17.175-10.912-19.565-29.498-8.274-56.167-28.74-75.046-57.615-18.986-29.038-29.021-64.042-29.021-101.227v-.116c.052-14.62 5.781-28.295 16.132-38.559C64.641 5.62 78.299 0 92.812 0l.198.001c30.114.107 54.527 24.658 54.421 54.728-.029 8.254-6.74 14.926-14.999 14.926h-.054c-8.284-.029-14.977-6.759-14.947-15.031.048-13.553-10.955-24.618-24.527-24.666-6.591-.044-12.764 2.511-17.429 7.137-4.666 4.626-7.248 10.789-7.271 17.354v.064c0 30.906 8.573 61.04 24.141 84.85 14.906 22.799 35.535 38.839 58.087 45.165 24.37 6.925 38.525 32.305 31.604 56.591-5.729 20.112-24.149 33.262-44.122 33.264z" opacity="1" data-original="#e4624c"></path><path fill="#cb3b28" d="M374.086 274.383c-19.977.002-38.392-13.15-44.124-33.265-6.921-24.285 7.235-49.666 31.556-56.577 22.601-6.34 43.23-22.379 58.136-45.178 15.568-23.811 24.141-53.945 24.141-84.85v-.116c-.023-6.512-2.605-12.675-7.271-17.302-4.644-4.605-10.799-7.137-17.34-7.137h-.089c-13.572.048-24.574 11.113-24.526 24.666.029 8.272-6.663 15.002-14.947 15.031h-.054c-8.26 0-14.97-6.671-14.999-14.926-.106-30.07 24.307-54.621 54.42-54.728l.198-.001c14.515 0 28.171 5.62 38.476 15.838 10.352 10.264 16.081 23.939 16.132 38.506v.169c0 37.185-10.035 72.189-29.021 101.227-18.878 28.875-45.547 49.341-75.095 57.629-8.361 2.376-13.256 11.153-10.863 19.551s11.182 13.286 19.593 10.897c7.963-2.264 16.265 2.35 18.532 10.308 2.267 7.957-2.354 16.242-10.322 18.506a45.838 45.838 0 0 1-12.533 1.752z" opacity="1" data-original="#cb3b28"></path><path fill="#ff9377" d="M331.754 422.663H180.246c-8.284 0-15-6.706-15-14.979 0-32.803 17.664-62.704 45.754-78.709V266.34c-6.485-2.755-12.7-6.1-18.566-9.995-32.081-21.303-51.234-56.989-51.234-95.46V14.979C141.2 6.707 147.916 0 156.2 0h199.602c8.284 0 15 6.706 15 14.979v145.906c0 38.472-19.153 74.158-51.234 95.46a114.571 114.571 0 0 1-18.566 9.995v62.635c28.09 16.005 45.754 45.906 45.754 78.709-.002 8.273-6.717 14.979-15.002 14.979z" opacity="1" data-original="#ff9377"></path><path fill="#e4624c" d="M319.566 256.345c32.081-21.302 51.234-56.988 51.234-95.46V14.979C370.8 6.707 364.084 0 355.8 0H256v422.662h75.754c8.284 0 15-6.706 15-14.979 0-32.803-17.664-62.704-45.754-78.709V266.34c6.485-2.755 12.7-6.1 18.566-9.995z" opacity="1" data-original="#e4624c"></path><path fill="#e4624c" d="M296 311.372h-80c-8.284 0-15-6.706-15-14.979s6.716-14.979 15-14.979h80c8.284 0 15 6.706 15 14.979s-6.716 14.979-15 14.979z" opacity="1" data-original="#e4624c"></path><path fill="#cb3b28" d="M296 281.414h-40v29.957h40c8.284 0 15-6.706 15-14.979s-6.716-14.978-15-14.978z" opacity="1" data-original="#cb3b28"></path><path fill="#ba602b" d="M395.631 512H116.369c-8.284 0-15-6.706-15-14.979v-89.337c0-8.272 6.716-14.979 15-14.979h279.263c8.284 0 15 6.706 15 14.979v89.337c-.001 8.273-6.717 14.979-15.001 14.979z" opacity="1" data-original="#ba602b"></path><path fill="#964c22" d="M395.631 392.706H256V512h139.631c8.284 0 15-6.706 15-14.979v-89.337c0-8.272-6.716-14.978-15-14.978z" opacity="1" data-original="#964c22"></path><path fill="#964c22" d="M415.631 512H96.369c-8.284 0-15-6.706-15-14.979s6.716-14.979 15-14.979h319.263c8.284 0 15 6.706 15 14.979S423.915 512 415.631 512z" opacity="1" data-original="#964c22"></path><path fill="#6f3716" d="M415.631 482.043H256V512h159.631c8.284 0 15-6.706 15-14.979s-6.716-14.978-15-14.978z" opacity="1" data-original="#6f3716"></path><path fill="#e4624c" d="M294.964 110.765c0-21.454-17.479-38.909-38.964-38.909-18.578 0-34.657 13.199-38.232 31.384-1.597 8.118 3.699 15.99 11.829 17.584 8.12 1.595 16.013-3.694 17.608-11.812.82-4.171 4.52-7.199 8.795-7.199 4.942 0 8.964 4.015 8.964 8.951s-4.021 8.951-8.964 8.951c-8.284 0-15 6.706-15 14.979s6.716 14.979 15 14.979c4.942 0 8.964 4.015 8.964 8.951s-4.021 8.951-8.964 8.951c-4.448 0-8.265-3.303-8.876-7.682a9.079 9.079 0 0 1-.088-1.269c0-8.272-6.716-14.979-15-14.979s-15 6.706-15 14.979c0 1.805.126 3.624.375 5.407 2.669 19.099 19.259 33.501 38.589 33.501 21.484 0 38.964-17.454 38.964-38.908 0-9.019-3.098-17.324-8.275-23.93 5.177-6.605 8.275-14.91 8.275-23.929z" opacity="1" data-original="#e4624c"></path><path fill="#cb3b28" d="M294.964 110.765c0-21.454-17.479-38.909-38.964-38.909v29.957c4.942 0 8.964 4.015 8.964 8.951s-4.021 8.951-8.964 8.951v29.957c4.942 0 8.964 4.015 8.964 8.951s-4.021 8.951-8.964 8.951v29.957c21.484 0 38.964-17.454 38.964-38.908 0-9.019-3.098-17.324-8.275-23.93 5.177-6.604 8.275-14.909 8.275-23.928z" opacity="1" data-original="#cb3b28"></path></g></svg>`],
                
                ['Hackathon: Hack-o-Mania 5.0 (SJIT)', 'Completed 24-hour hackathon. Built working prototype.',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 16.933 16.933" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#ff5757" d="M12.289 10.724a.265.265 0 0 0-.168.066 5.555 5.555 0 0 1-2.74 1.303.265.265 0 0 0-.2.363l1.597 3.806a.265.265 0 0 0 .489-.004l.732-1.825 1.852.743a.265.265 0 0 0 .342-.348l-1.653-3.942a.265.265 0 0 0-.251-.162zM4.392 10.889l-1.652 3.94a.265.265 0 0 0 .343.348l1.851-.744.732 1.825c.089.22.398.222.49.004l1.598-3.81a.265.265 0 0 0-.2-.363 5.556 5.556 0 0 1-2.743-1.297.265.265 0 0 0-.419.097z" opacity="1" data-original="#ff5757"></path><path fill="#ffcb3c" d="M8.467.529C5.109.529 2.38 3.257 2.38 6.615s2.728 6.084 6.086 6.084 6.086-2.726 6.086-6.084S11.825.529 8.467.529z" opacity="1" data-original="#ffcb3c"></path><path fill="#ffea54" d="M8.467 1.851a4.767 4.767 0 0 0-4.762 4.764c0 2.627 2.135 4.762 4.762 4.762s4.762-2.135 4.762-4.762A4.767 4.767 0 0 0 8.467 1.85z" opacity="1" data-original="#ffea54"></path><path fill="#feaa2b" d="M8.465 3.576a.265.265 0 0 0-.229.172l-.7 1.857-1.987.06a.265.265 0 0 0-.156.471L6.94 7.38l-.554 1.906a.265.265 0 0 0 .4.295l1.658-1.09 1.643 1.117a.265.265 0 0 0 .404-.289L9.97 7.402l1.568-1.215a.265.265 0 0 0-.148-.475L9.404 5.62 8.732 3.75a.265.265 0 0 0-.267-.175z" opacity="1" data-original="#feaa2b"></path></g></svg>`],
                
                ['Hackathon: Blaze-A-Trail 1.0 (SJIT)', 'Delivered an innovative solution within 24 hours of intensive coding.',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 16.933 16.933" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#ff5757" d="M12.289 10.724a.265.265 0 0 0-.168.066 5.555 5.555 0 0 1-2.74 1.303.265.265 0 0 0-.2.363l1.597 3.806a.265.265 0 0 0 .489-.004l.732-1.825 1.852.743a.265.265 0 0 0 .342-.348l-1.653-3.942a.265.265 0 0 0-.251-.162zM4.392 10.889l-1.652 3.94a.265.265 0 0 0 .343.348l1.851-.744.732 1.825c.089.22.398.222.49.004l1.598-3.81a.265.265 0 0 0-.2-.363 5.556 5.556 0 0 1-2.743-1.297.265.265 0 0 0-.419.097z" opacity="1" data-original="#ff5757"></path><path fill="#ffcb3c" d="M8.467.529C5.109.529 2.38 3.257 2.38 6.615s2.728 6.084 6.086 6.084 6.086-2.726 6.086-6.084S11.825.529 8.467.529z" opacity="1" data-original="#ffcb3c"></path><path fill="#ffea54" d="M8.467 1.851a4.767 4.767 0 0 0-4.762 4.764c0 2.627 2.135 4.762 4.762 4.762s4.762-2.135 4.762-4.762A4.767 4.767 0 0 0 8.467 1.85z" opacity="1" data-original="#ffea54"></path><path fill="#feaa2b" d="M8.465 3.576a.265.265 0 0 0-.229.172l-.7 1.857-1.987.06a.265.265 0 0 0-.156.471L6.94 7.38l-.554 1.906a.265.265 0 0 0 .4.295l1.658-1.09 1.643 1.117a.265.265 0 0 0 .404-.289L9.97 7.402l1.568-1.215a.265.265 0 0 0-.148-.475L9.404 5.62 8.732 3.75a.265.265 0 0 0-.267-.175z" opacity="1" data-original="#feaa2b"></path></g></svg>`],
                
                ['Hackathon: Hack2Skills – UN SDG', 'Built a project. Aligned with UN SDGs.',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 16.933 16.933" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#ff5757" d="M12.289 10.724a.265.265 0 0 0-.168.066 5.555 5.555 0 0 1-2.74 1.303.265.265 0 0 0-.2.363l1.597 3.806a.265.265 0 0 0 .489-.004l.732-1.825 1.852.743a.265.265 0 0 0 .342-.348l-1.653-3.942a.265.265 0 0 0-.251-.162zM4.392 10.889l-1.652 3.94a.265.265 0 0 0 .343.348l1.851-.744.732 1.825c.089.22.398.222.49.004l1.598-3.81a.265.265 0 0 0-.2-.363 5.556 5.556 0 0 1-2.743-1.297.265.265 0 0 0-.419.097z" opacity="1" data-original="#ff5757"></path><path fill="#ffcb3c" d="M8.467.529C5.109.529 2.38 3.257 2.38 6.615s2.728 6.084 6.086 6.084 6.086-2.726 6.086-6.084S11.825.529 8.467.529z" opacity="1" data-original="#ffcb3c"></path><path fill="#ffea54" d="M8.467 1.851a4.767 4.767 0 0 0-4.762 4.764c0 2.627 2.135 4.762 4.762 4.762s4.762-2.135 4.762-4.762A4.767 4.767 0 0 0 8.467 1.85z" opacity="1" data-original="#ffea54"></path><path fill="#feaa2b" d="M8.465 3.576a.265.265 0 0 0-.229.172l-.7 1.857-1.987.06a.265.265 0 0 0-.156.471L6.94 7.38l-.554 1.906a.265.265 0 0 0 .4.295l1.658-1.09 1.643 1.117a.265.265 0 0 0 .404-.289L9.97 7.402l1.568-1.215a.265.265 0 0 0-.148-.475L9.404 5.62 8.732 3.75a.265.265 0 0 0-.267-.175z" opacity="1" data-original="#feaa2b"></path></g></svg>`],
                
                ['NCAT 2025 – Naukri Campus All India Career Aptitude Test', 'Scored 28/60 with 100% attempt rate; secured 56.79 percentile in Tamil Nadu with top scores in Verbal & Reasoning.',`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 850.39 850.39" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#ffffff" d="M425.2 725.97c-165.85 0-300.78-134.93-300.78-300.78S259.35 124.42 425.2 124.42s300.78 134.92 300.78 300.77S591.04 725.97 425.2 725.97z" opacity="1" data-original="#ffffff"></path><path fill="#e0e0e0" d="M577.61 213.33c12.84 0 25.53.66 38.05 1.86-50.38-45.73-117.22-73.64-190.46-73.64-156.4 0-283.65 127.24-283.65 283.65 0 55.82 16.28 107.89 44.24 151.82 15.02-203.35 184.63-363.69 391.82-363.69z" opacity="1" data-original="#e0e0e0"></path><path fill="#b5b5b5" d="M425.19 708.84c156.4 0 283.65-127.24 283.65-283.65 0-83.16-35.98-158.07-93.18-210.01-12.52-1.2-25.21-1.86-38.05-1.86-207.18 0-376.8 160.35-391.82 363.69 50.37 79.17 138.83 131.83 239.4 131.83z" opacity="1" data-original="#b5b5b5"></path><circle cx="425.2" cy="425.2" r="224.34" fill="#9e9e9e" opacity="1" data-original="#9e9e9e"></circle><path fill="#f6f6f6" d="m560.16 394.9-93.26-13.55-41.7-84.51-41.71 84.51-93.25 13.55 67.48 65.77-15.93 92.88 83.41-43.85 83.41 43.85-15.93-92.88z" opacity="1" data-original="#f6f6f6"></path><path fill="#ffffff" d="M586.12 236.22c4.93 4.93 20.95 12.54 28.42 15.94 1.5.68 1.5 2.8 0 3.48-7.47 3.4-23.48 11-28.42 15.94-4.93 4.93-12.54 20.95-15.94 28.42-.68 1.5-2.8 1.5-3.48 0-3.4-7.47-11-23.48-15.94-28.42-4.93-4.93-20.95-12.54-28.42-15.94-1.5-.68-1.5-2.8 0-3.48 7.47-3.4 23.48-11 28.42-15.94 4.93-4.93 12.54-20.95 15.94-28.42.68-1.5 2.8-1.5 3.48 0 3.39 7.47 11 23.48 15.94 28.42z" opacity="1" data-original="#ffffff"></path><path fill="#e0e0e0" d="m560.16 394.9-93.26-13.56-41.7-84.5V509.7l83.41 43.85-15.93-92.88z" opacity="1" data-original="#e0e0e0"></path></g></svg>`]
            ].map(([title, desc, svg]) => (
              <Grid item xs={12} sm={6} md={4} key={title}>
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.1) 100%)',
                    backdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    marginTop: '10px',
                    borderRadius: '28px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.3), 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(255, 255, 255, 0.05), inset 1px 0 0 rgba(255, 255, 255, 0.1), inset -1px 0 0 rgba(255, 255, 255, 0.1)',
                    height: '100%',
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
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
                      zIndex: 1
                    },
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: '0 15px 50px rgba(0, 0, 0, 0.15), 0 2px 0 rgba(255, 255, 255, 0.4), 0 -2px 0 rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 1px 0 0 rgba(255, 255, 255, 0.15), inset -1px 0 0 rgba(255, 255, 255, 0.15)',
                      borderColor: 'rgba(77, 184, 255, 0.25)'
                    }
                  }}
                >
                <CardContent sx={{ px: 3, py: 4, textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                       {/* 🔵 Icon on Top */}
                   <Box
                      sx={{
                        mb: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        '& svg': {
                          width: '100px',    // 👈 reduce to any size you want
                          height: '100px',
                        }
                      }}
                      dangerouslySetInnerHTML={{ __html: svg }}
                    />

                    <Typography
                      variant="h6"
                      sx={{
                        color: '#4db8ff',
                        fontWeight: 600,
                        fontSize: '1.15rem',
                        fontFamily: '"Poppins", sans-serif',
                        lineHeight: 1.4,
                        mb: 0.5
                      }}
                    >
                      {title}
                    </Typography>
                    {desc.split('. ').map((line, i) => (
                      <Typography
                        key={i}
                        variant="body2"
                        sx={{
                          color: '#c0c0c0',
                          fontSize: '0.95rem',
                          fontFamily: '"Poppins", sans-serif',
                          textAlign: 'center',
                        }}
                      >
                        {line.trim() + (line.endsWith('.') ? '' : '.')}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Section>
      </Box>
    </Box>
  }
/>




<Route
  path="/otherprofiles"
  element={
    <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Custom Animated Background */}
      <AnimatedBackground />



      {/* 🎛 Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2))',
          zIndex: 1
        }}
      />

      {/* 🧾 Foreground Content */}
      <Box sx={{ position: 'relative', zIndex: 2, py: { xs: 1, md: 0 }, marginTop: '60px'}}>
        <Section title="Profiles & Contact" bg="transparent">

          <Grid
            container
            spacing={4}
            justifyContent="center"
            sx={{
              mt: 2,
              px: { xs: 2, sm: 2 },
              py: { xs: 0, sm: 0 },
              maxWidth: '900px',
              mx: 'auto'
            }}
          >
            {[
              [
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                  <path d="m19.23 15.26l-2.54-.29a1.99 1.99 0 0 0-1.64.57l-1.84 1.84a15.05 15.05 0 0 1-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52a2 2 0 0 0-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07c.53 8.54 7.36 15.36 15.89 15.89c1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98"/>
                </svg>,
                'Phone',
                'tel:+919940306399'
              ],
              [
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#4db8ff" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"/>
                </svg>,
                'WhatsApp',
                'https://wa.me/+919940306399'
              ],
              [
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25a.85.85 0 1 1 .9-1.44L12 11l6.7-4.19a.85.85 0 1 1 .9 1.44"/>
                </svg>,
                'Email',
                'mailto:jerophinstanley47@gmail.com'
              ],
              [
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.04 17.043h-2.962v-4.64c0-1.107-.023-2.531-1.544-2.531c-1.544 0-1.78 1.204-1.78 2.449v4.722H7.793V7.5h2.844v1.3h.039c.397-.75 1.364-1.54 2.808-1.54c3.001 0 3.556 1.974 3.556 4.545zM4.447 6.194c-.954 0-1.72-.771-1.72-1.72s.767-1.72 1.72-1.72a1.72 1.72 0 0 1 0 3.44m1.484 10.85h-2.97V7.5h2.97zM18.522 0H1.476C.66 0 0 .645 0 1.44v17.12C0 19.355.66 20 1.476 20h17.042c.815 0 1.482-.644 1.482-1.44V1.44C20 .646 19.333 0 18.518 0z"/>
                </svg>,
                'LinkedIn',
                'https://www.linkedin.com/in/jerophin-d-r-b9a73b257/'
              ],
              [
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none">
                  <path d="M8.75 10a3.25 3.25 0 1 1 6.5 0a3.25 3.25 0 0 1-6.5 0Z" fill="#4db8ff" />
                  <path fill="#4db8ff" fillRule="evenodd" clipRule="evenodd" d="M3.774 8.877a8.04 8.04 0 0 1 8.01-7.377h.432a8.04 8.04 0 0 1 8.01 7.377a8.7 8.7 0 0 1-1.933 6.217L13.5 20.956a1.937 1.937 0 0 1-3 0l-4.792-5.862a8.7 8.7 0 0 1-1.934-6.217Zm8.226-3.627a4.75 4.75 0 1 0 0 9.5a4.75 4.75 0 0 0 0-9.5Z" />
                </svg>,
                'Location',
                'https://maps.app.goo.gl/wj4R5RuBersWa33JA'
              ],

              
              [
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/>
                </svg>,
                'Github',
                'https://github.com/Jerophin123'
              ],
              [
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M6.316 7.009c.203-.147.3-.391.3-.728a.94.94 0 0 0-.097-.459a.7.7 0 0 0-.272-.278a1.1 1.1 0 0 0-.388-.141a2.4 2.4 0 0 0-.453-.041H3.759v1.869H5.54q.47.004.775-.222zm.278 1.688q-.346-.262-.919-.262H3.759v2.203h1.878q.261 0 .494-.05c.233-.05.297-.088.416-.169q.18-.117.287-.319c.107-.202.106-.309.106-.519q0-.617-.347-.884z"/>
                  <path d="M14.5 0h-13C.675 0 0 .675 0 1.5v13c0 .825.675 1.5 1.5 1.5h13c.825 0 1.5-.675 1.5-1.5v-13c0-.825-.675-1.5-1.5-1.5m-4.012 4.209h3.241V5h-3.241zm-2.025 6.516a2.06 2.06 0 0 1-.631.725a2.8 2.8 0 0 1-.909.416A4 4 0 0 1 5.879 12H2.001V4.003H5.77q.57 0 1.044.1q.469.1.806.331q.334.23.522.609c.122.25.184.566.184.938q0 .604-.275 1.006c-.275.402-.453.487-.816.659c.494.141.856.391 1.097.744q.364.534.363 1.284q.004.614-.231 1.05zm6.528-1.237h-4.178c0 .456.156.891.394 1.125q.357.348 1.028.35q.481 0 .831-.244q.346-.244.425-.512h1.4q-.335 1.045-1.031 1.494c-.459.3-1.022.45-1.675.45q-.683-.001-1.234-.219a2.6 2.6 0 0 1-.934-.622a2.9 2.9 0 0 1-.588-.966A3.6 3.6 0 0 1 9.22 9.11q0-.65.213-1.213a2.82 2.82 0 0 1 1.544-1.616a3 3 0 0 1 1.206-.234q.736-.001 1.287.287q.548.286.903.769c.355.483.403.688.509 1.1q.153.609.109 1.284z"/>
                </svg>,
                'Behance',
                'https://www.behance.net/jerophinstanley'
              ],
              [
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13h7.5M9.424 7.268l4.999-4.999m2.21 14.375l-2.402 2.415a3.19 3.19 0 0 1-4.524 0l-3.77-3.787a3.223 3.223 0 0 1 0-4.544l3.77-3.787a3.19 3.19 0 0 1 4.524 0l2.302 2.313"/></svg>,
                'LeetCode',
                'https://leetcode.com/u/Jerophinstanley/'
              ],
              [
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                  <g fill="none" stroke="#4db8ff" strokeLinejoin="round" strokeWidth="4">
                    <path fill="#4db8ff" d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 24H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V30a2 2 0 0 0-2-2ZM42 4H30a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"/>
                    <path strokeLinecap="round" d="M28 28h16m-8 8h8m-16 8h16"/>
                  </g>
                </svg>,
                'Skillrack',
                'https://www.skillrack.com/faces/resume.xhtml?id=407184&key=646464b7d513f90965adc2db415744472430d117'
              ],
            ].map(([icon, display, link], index) => (
              <Grid
                item
                xs={12}
                sm={6}
                key={index}
                sx={{ mb: { xs: 4, sm: 4 } }}
              >
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.1) 100%)',
                      backdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
                      WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(110%) contrast(120%)',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                      borderRadius: '28px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.3), 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(255, 255, 255, 0.05), inset 1px 0 0 rgba(255, 255, 255, 0.1), inset -1px 0 0 rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      position: 'relative',
                      overflow: 'hidden',
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
                        transform: 'translateY(-8px) scale(1.02)',
                        boxShadow: '0 15px 50px rgba(0, 0, 0, 0.15), 0 2px 0 rgba(255, 255, 255, 0.4), 0 -2px 0 rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 1px 0 0 rgba(255, 255, 255, 0.15), inset -1px 0 0 rgba(255, 255, 255, 0.15)',
                        borderColor: 'rgba(77, 184, 255, 0.25)'
                      },
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      px: 3,
                      py: 2,
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        boxShadow: '0 15px 50px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(255, 255, 255, 0.15)',
                        borderColor: 'rgba(77, 184, 255, 0.25)'
                      }
                    }}
                  >
                   <CardContent sx={{ textAlign: 'center', color: '#4db8ff' }}>
                   <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mb: 1,
                          '& svg': {
                            width: 60,
                            height: 60
                          }
                        }}
                      >
                        {icon}
                      </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#c0c0c0',
                            fontSize: '1rem',
                            fontFamily: '"Poppins", sans-serif'
                          }}
                        >

                        {display}
                      </Typography>
                    </CardContent>
                  </Card>
                </a>
              </Grid>
            ))}
          </Grid>
        </Section>
      </Box>
    </Box>
  }
/>



      </Routes>
<Box
  component="footer"
  sx={{
    bgcolor: {
      xs: '#000000', // Black for mobile devices
      sm: '#0d0d0d'  // For tablets and desktops (≥600px)
    },
    py: 4,
    px: 2,
  }}
>
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      justifyContent: 'space-between',
      alignItems: { xs: 'center', md: 'flex-start' },
      maxWidth: '1200px',
      mx: 'auto',
      width: '100%',
      gap: 4,
    }}
  >
    {/* Left Section */}
    <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
      <Typography variant="body2" color="#c0c0c0" sx={{ mb: 1 }}>
        &copy; 2025 JEROPHIN D R | All Rights Reserved
      </Typography>
      <Typography variant="body2" color="#999999" sx={{ mb: 2 }}>
        Passionate about building intuitive UIs and scalable backend systems. Let’s build meaningful digital experiences together.
      </Typography>
      <Typography sx={{ fontSize: '0.9rem', color: '#aaaaaa' }}>
        📍 Chennai, India &nbsp;|&nbsp; 📧 jerophinstanley47@gmail.com &nbsp;|&nbsp; 📞 +919940306399
      </Typography>
    </Box>

    {/* Right Section */}
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        justifyContent: { xs: 'center', md: 'flex-end' },
        alignItems: 'center',
        gap: 3,
        mt: { xs: 3, md: 0 },
      }}
    >
    {/* LinkedIn */}
    <a
      href="https://linkedin.com/in/jerophin-d-r-b9a73b257/"
      target="_blank"
      rel="noreferrer"
      style={{ color: '#4db8ff' }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 128 128" fill="currentColor">
        <path d="M116 3H12a8.91 8.91 0 0 0-9 8.8v104.42a8.91 8.91 0 0 0 9 8.78h104a8.93 8.93 0 0 0 9-8.81V11.77A8.93 8.93 0 0 0 116 3M39.17 107H21.06V48.73h18.11zm-9-66.21a10.5 10.5 0 1 1 10.49-10.5a10.5 10.5 0 0 1-10.54 10.48zM107 107H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53V48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75z" />
      </svg>
    </a>

    {/* GitHub */}
    <a
      href="https://github.com/Jerophin123"
      target="_blank"
      rel="noreferrer"
      style={{ color: '#4db8ff' }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.247a10 10 0 0 0-3.162 19.487c.5.088.687-.212.687-.475c0-.237-.012-1.025-.012-1.862c-2.513.462-3.163-.613-3.363-1.175a3.64 3.64 0 0 0-1.025-1.413c-.35-.187-.85-.65-.013-.662a2 2 0 0 1 1.538 1.025a2.137 2.137 0 0 0 2.912.825a2.1 2.1 0 0 1 .638-1.338c-2.225-.25-4.55-1.112-4.55-4.937a3.9 3.9 0 0 1 1.025-2.688a3.6 3.6 0 0 1 .1-2.65s.837-.262 2.75 1.025a9.43 9.43 0 0 1 5 0c1.912-1.3 2.75-1.025 2.75-1.025a3.6 3.6 0 0 1 .1 2.65a3.87 3.87 0 0 1 1.025 2.688c0 3.837-2.338 4.687-4.562 4.937a2.37 2.37 0 0 1 .674 1.85c0 1.338-.012 2.413-.012 2.75c0 .263.187.575.687.475A10.005 10.005 0 0 0 12 2.247" />
      </svg>
    </a>

    {/* LeetCode */}
    <a
      href="https://leetcode.com/u/Jerophinstanley/"
      target="_blank"
      rel="noreferrer"
      style={{ color: '#4db8ff' }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.37 1.37 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.3 5.3 0 0 0-1.209 2.104a5 5 0 0 0-.125.513a5.5 5.5 0 0 0 .062 2.362a6 6 0 0 0 .349 1.017a5.9 5.9 0 0 0 1.271 1.818l4.277 4.193l.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.38 1.38 0 0 0-1.951-.003l-2.396 2.392a3.02 3.02 0 0 1-4.205.038l-.02-.019l-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.7 2.7 0 0 1 .066-.523a2.55 2.55 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0m-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382a1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382a1.38 1.38 0 0 0-1.38-1.382z"/>
      </svg>
    </a>
  </Box>
</Box>
</Box>
      </Box>
    </Router>
  );
}

export default App;