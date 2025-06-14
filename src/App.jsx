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
import Spline from '@splinetool/react-spline';

const roles = ['Full Stack Developer', 'UI UX Designer'];

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [visible, setVisible] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showText, setShowText] = useState(false);
 
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
      }, 300); // Match this to exit duration
    }, 2500);

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
            onClick={() => setDrawerOpen(true)}
            sx={{
              fontFamily: '"Poppins", sans-serif',
              fontSize: '1rem',
              color: '#4db8ff',
              fontWeight: 600,
              border: '1px solid #4db8ff',
              px: 2,
              py: 1,
              borderRadius: '8px',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(77,184,255,0.1)'
              }
            }}
          >
            ☰
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
  
  const Section = ({ title, children, bg = '#1e1e1e' }) => (
    <Box
      sx={{
        bgcolor: bg,
        py: 10,
        width: '100vw',
        minHeight: '100vh',
        fontFamily: '"Poppins", sans-serif' // ✅ Poppins font applied here
      }}
    >
      <Box sx={{ maxWidth: '1600px', mx: 'auto', px: 4 }}>
        <Typography
          variant="h4"
          color="#4db8ff"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700 }} // Optional: make title bold
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
  setDrawerOpen={setDrawerOpen}
/>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#121212',
            width: 240,
            pt: 8
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
                    fontWeight: 500,
                    fontSize: '1rem',
                    textAlign: 'center'
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>



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
      {/* ✅ Spline 3D Background (interactive enabled) */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          // Removed pointerEvents: 'none' to allow user interaction
        }}
      >
        <Spline scene="https://prod.spline.design/DF5jLfAGU5aX7BPy/scene.splinecode" />
      </Box>

      {/* 🎯 Main Foreground Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 3,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: { xs: 2, sm: 6, md: 8 },
          py: { xs: 0, sm: 0, md: 0 },
          pointerEvents: 'none' ,// Optional: prevents clicks on content being blocked
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
            letterSpacing: '-0.5px'
          }}
        >
          Hi, I'm Jerophin <br />
        </Typography>
        <Box sx={{ height: '4.5rem', overflow: 'hidden', mb: 3 }}>
  <AnimatePresence mode="wait">
    {visible && (
      <motion.div
        key={roles[currentRole]}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', sm: '2.8rem', md: '3.2rem' },
            color: '#4db8ff',
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-0.5px'
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
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #007fff 0%, #00c6ff 100%)',
                color: '#000',
                textTransform: 'uppercase',
                fontWeight: 600,
                minWidth: 180,
                '&:hover': {
                  background: 'linear-gradient(135deg, #3399ff 0%, #00aaff 100%)'
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
                borderRadius: '12px',
                borderColor: '#4db8ff',
                color: '#4db8ff',
                fontWeight: 600,
                minWidth: 180,
                '&:hover': {
                  backgroundColor: '#1c1c1c',
                  borderColor: '#3399ff',
                  color: '#3399ff'
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
      {/* Spline 3D Background */}
      <Box
  sx={{
    position: 'absolute',
    inset: 0,
    zIndex: 0
  }}
>
  {window.innerWidth > 600 && (
    <Spline scene="https://prod.spline.design/DF5jLfAGU5aX7BPy/scene.splinecode" />
  )}
</Box>
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
            py: { xs: 6, sm: 10 },
            px: { xs: 2, sm: 4 },
            mx: 'auto',
            borderRadius: '20px',
            zIndex: 1,
            position: 'relative',
            background: 'linear-gradient(145deg, #111111ee, #0d0d0dee)',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          <Avatar
            src={profileImage}
            alt="Jerophin D R"
            sx={{
              width: 160,
              height: 160,
              mb: 4,
              border: '4px solid #4db8ff',
              boxShadow: '0 0 25px rgba(77, 184, 255, 0.4)'
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
            I'm a results-driven <strong style={{ color: '#4db8ff' }}>Full Stack Developer</strong> &{' '}
            <strong style={{ color: '#4db8ff' }}>UI/UX Designer</strong> passionate about crafting
            digital experiences that blend function and beauty. I specialize in building scalable web
            apps using modern frameworks and intuitive interfaces with Figma, Adobe XD, and design
            thinking.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#dddddd',
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.9
            }}
          >
            With strong skills in{' '}
            <span style={{ color: '#4db8ff' }}>Python, Java, SQL, and JavaScript</span>, I bridge the
            gap between design and engineering. I love hackathons, am open to relocation, and enjoy
            building real-world tools that make a difference.
          </Typography>
          {/* Education Section */}
<Box
  sx={{
    mt: 6,
    width: '90%',
    textAlign: 'left',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.06)',
    p: { xs: 3, sm: 4 },
    boxShadow: '0 6px 20px rgba(0,0,0,0.5)'
  }}
>
  <Typography
    variant="h6"
    sx={{
      color: '#4db8ff',
      fontWeight: 600,
      mb: 3,
      fontSize: { xs: '1.2rem', sm: '1.4rem' }
    }}
  >
    🎓 Education
  </Typography>

  {/* Engineering */}
  <Box sx={{ mb: 4 }}>
    <Typography sx={{ color: '#ffffff', fontWeight: 500 }}>
      Bachelor of Engineering in Computer Science <span style={{ color: '#4db8ff' }}>(CGPA: 8.3)</span>
    </Typography>
    <Typography sx={{ color: '#bbbbbb', fontSize: '0.95rem' }}>
      St. Joseph’s Institute of Technology, OMR, Chennai
    </Typography>
    <Typography sx={{ color: '#888888', fontSize: '0.85rem', mt: 0.5 }}>
      Expected Graduation: <span style={{ color: '#4db8ff' }}>May 2026</span>
    </Typography>
  </Box>

  {/* HSC */}
  <Box sx={{ mb: 4 }}>
    <Typography sx={{ color: '#ffffff', fontWeight: 500 }}>
      Higher Secondary Certificate (HSC) <span style={{ color: '#4db8ff' }}>(77.5%)</span>
    </Typography>
    <Typography sx={{ color: '#bbbbbb', fontSize: '0.95rem' }}>
      Holy Family Convent Matriculation Hr. Sec. School, Keelkattalai, Chennai
    </Typography>
    <Typography sx={{ color: '#888888', fontSize: '0.85rem', mt: 0.5 }}>
      Graduation: <span style={{ color: '#4db8ff' }}>May 2022</span>
    </Typography>
  </Box>

  {/* SSLC */}
  <Box>
    <Typography sx={{ color: '#ffffff', fontWeight: 500 }}>
      Secondary School Leaving Certificate (SSLC) <span style={{ color: '#4db8ff' }}>(71.6%)</span>
    </Typography>
    <Typography sx={{ color: '#bbbbbb', fontSize: '0.95rem' }}>
      Holy Family Convent Matriculation Hr. Sec. School, Keelkattalai, Chennai
    </Typography>
    <Typography sx={{ color: '#888888', fontSize: '0.85rem', mt: 0.5 }}>
      Graduation: <span style={{ color: '#4db8ff' }}>March 2020</span>
    </Typography>
  </Box>
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
      
      {/* 🎯 Spline Background (interactive enabled) */}
       {typeof window !== 'undefined' && window.innerWidth > 600 && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 0
          }}
        >
          <Spline scene="https://prod.spline.design/DF5jLfAGU5aX7BPy/scene.splinecode" />
        </Box>
      )}

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
      <Box sx={{ position: 'relative', zIndex: 2 }}>
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
                    background: 'rgba(15, 15, 15, 0.75)',
                    border: '1px solid rgba(77,184,255,0.2)',
                    borderRadius: '20px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: '#4db8ff',
                      boxShadow: '0 16px 36px rgba(77,184,255,0.25)'
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
      
      {/* 🌌 Spline Background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0
        }}
      >
        {window.innerWidth > 600 && (
          <Spline scene="https://prod.spline.design/DF5jLfAGU5aX7BPy/scene.splinecode" />
        )}
      </Box>

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
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Section title="Experience" bg="transparent">
          <Card
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              background: 'rgba(15, 15, 15, 0.75)',
              border: '1px solid rgba(77,184,255,0.2)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              px: { xs: 2, sm: 4 },
              py: 4,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                borderColor: '#4db8ff',
                boxShadow: '0 12px 36px rgba(77,184,255,0.25)'
              }
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  color: '#4db8ff',
                  fontWeight: 700,
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: '1.4rem',
                  mb: 1
                }}
              >
                🏢 Trios Technologies
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{
                  color: '#bbbbbb',
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  mb: 3,
                  fontFamily: '"Poppins", sans-serif'
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
                  '✅ Created responsive apps focused on accessibility & performance.',
                  '✅ Built a Student Management System reducing data errors by 50%.',
                  '✅ Enhanced interactivity via RESTful API integration.',
                  '✅ Improved load times through JS/CSS optimization.'
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
            </CardContent>
          </Card>
          <Card
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              background: 'rgba(15, 15, 15, 0.75)',
              border: '1px solid rgba(77,184,255,0.2)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              marginTop: '30px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              px: { xs: 2, sm: 4 },
              py: 4,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                borderColor: '#4db8ff',
                boxShadow: '0 12px 36px rgba(77,184,255,0.25)'
              }
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  color: '#4db8ff',
                  fontWeight: 700,
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: '1.4rem',
                  mb: 1
                }}
              >
                🏢 Delphin Associates
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{
                  color: '#bbbbbb',
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  mb: 3,
                  fontFamily: '"Poppins", sans-serif'
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
                  '✅ Created Website for their Business Growth upto 75%',
                  '✅ Improved load times through JS/CSS optimization.'
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
      {/* 🔵 Spline Full Background */}
      {typeof window !== 'undefined' && window.innerWidth > 600 && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            minHeight: '100%',
            width: '100%',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <Spline scene="https://prod.spline.design/DF5jLfAGU5aX7BPy/scene.splinecode" />
        </Box>
      )}

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
      <Box sx={{ position: 'relative', zIndex: 2, py: 10 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontFamily: '"Poppins", sans-serif',
            color: '#4db8ff',
            fontWeight: 700,
            mb: 4,
            fontSize: { xs: '2rem', sm: '2.4rem' },
          }}
        >
          Projects
        </Typography>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ px: { xs: 2, sm: 4, md: 6 } }}
        >
          {[
            ['Waste Management System', '🧠 AI-based smart waste classification (Deep Learning). Which is being integrated with Google.','https://github.com/Jerophin123/Waste_Management_System.git'],
            ['RV Diagnose', '🌿 Built a plant disease detection system. It uses Deep Learning and TensorFlow.','https://github.com/Jerophin123/RV_Diagnose.git'],
            ['Binger App', '🎬 Designed an app Binger. an E-Commerce platform using Figma.','https://www.figma.com/proto/LEjitauzuzA5Dgc5ZM74w4/Binger-App?node-id=23-21&t=hXXnNf3LSjeX6Rg8-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=68%3A68'],
            ['JDEL PC Factory', '🛠️ Crafted an innovative PC customization interface focused on advanced UX principles. Led to a direct increase of 200+ users within the first month of launch.','https://www.figma.com/proto/HsaUcu8alpCAPzmRwV6DNa/Untitled?node-id=17-79&starting-point-node-id=17%3A79&scaling=scale-down-width&content-scaling=fixed&t=BNt8SYrLhIYaO9U7-1'],
            ['Student Intern Management System', '🏫 Built a robust data handling system using JSP.','https://github.com/Jerophin123/Student-Intern-Management-System.git'],
            ['Market Basket Analysis', '🛒 Applied Apriori algorithm for consumer trend analysis in Python.','https://github.com/Jerophin123/Market_Basket_Analysis_Sales.git'],
            ['Log Analyzer', '📊 Developed a Python-based log analysis tool with visualization capabilities.','https://github.com/Jerophin123/log_Analyser.git'],
            ['Fitness Tracking Dashboard', '💪 Designed an interactive dashboard for health enthusiasts using Figma.','https://www.figma.com/proto/2oFTi1cFy7noVn5dwgYYUX/Untitled?node-id=1-2&t=ZiibMn9AUuK20g2q-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1'],
            ['Geolocation Attendance', '📍 Python project combining GPS and biometric authentication.','https://github.com/Jerophin123/Geo-Attendance.git'],
            ['TorUnveil', '🕵️ Created a Python tool to trace and deanonymize anonymous email senders.','https://github.com/Jerophin123/Tor_Unveil.git'],
            ['AUD', '🎧 Designed a high-quality music player UI/UX tailored for audiophiles.','https://www.behance.net/gallery/214231433/AUD-The-Music-Player-For-Audiophiles'],
            ['Shopsavyy','🛒 A modern e-commerce app built with React and MUI. Includes dynamic sections, real-time cart, and product filtering. Delivers a smooth shopping experience.','https://shopsavyy.vercel.app/'],
            ['Vote System','👆 A Simple Online Voting Solution using block-chain','https://github.com/Jerophin123/Vote-System.git'],
            ['Now Weather', '🌦️ A sleek React Native weather app. Includes a splash screen, real-time forecasts, dark mode, and offline support via AsyncStorage.','https://github.com/Jerophin123/NowWeather.git'],
            ['GPACGPA','📱 A modern React Native app with dark/light mode, sharing, and smooth UI. in order to calculate and track academic performance!','https://github.com/Jerophin123/GPACGPA.git']
          ].map(([title, desc, link]) => (
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
                    background: 'rgba(15, 15, 15, 0.75)',
                    border: '1px solid rgba(77,184,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    boxShadow: 'none',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: '#4db8ff',
                      boxShadow: '0 10px 30px rgba(77,184,255,0.25)',
                    },
                  }}
                >
                  <CardContent>
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
      </Box>
    </Box>
  }
/>

<Route
  path="/certifications"
  element={
    <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
      {/* 🌐 Background */}
     {typeof window !== 'undefined' && window.innerWidth > 600 && (
  <Box sx={{ position: 'absolute', inset: 0, zIndex: 0 }}>
    <Spline scene="https://prod.spline.design/DF5jLfAGU5aX7BPy/scene.splinecode" />
  </Box>
)}


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
      <Box sx={{ position: 'relative', zIndex: 2 }}>
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
                ['Linguaskill – Cambridge Assessment English', 'Achieved CEFR Level C1 in English proficiency, validating advanced skills in reading, listening, speaking, and writing.'],
                
                ['Introduction to Git and GitHub – Coursera', 'Learned version control using Git and collaborated using GitHub repositories and pull requests in real-world projects.'],
                
                ['MongoDB Essentials – Self Learning', 'Gained hands-on experience with NoSQL database concepts, schema design, queries, aggregation, and performance optimization.'],
                
                ['Adobe XD for UI/UX Design – LinkedIn Learning', 'Mastered wireframing, prototyping, and interactive design workflows using Adobe XD for rapid product development.'],

                ['Skill Rack', 'Earned Certifications in Python 3.x - Programming Course (Hands-On), C - Programming Course (Hands-On), Java Basics - Programming Course (Hands-On), SQL - Basics (Standard), Data Structure - C - Course (Hands-On)'],
                
                ['User Experience Design – Coursera', 'Explored UX principles, usability testing, persona creation, and user-centric interface strategies for digital products.'],
                
                ['Figma Masterclass – Udemy', 'Built real-world UI components, responsive design layouts, and interactive prototypes using Figma’s advanced features.'],
                
                ['Full Stack Development – LinkedIn Learning', 'Completed end-to-end full-stack training covering React, Node.js, Express, MongoDB, and RESTful API development.'],
                
                ['NCAT 2025 Participation – Naukri Campus All India Career Aptitude Test', 'Participated in India’s largest career aptitude test; scored 28/60 with 100% attempt rate and secured 56.79 percentile in Tamil Nadu, demonstrating verbal and analytical strengths.']
            ].map(([title, description], index) => (
              <Grid
                item
                xs={12}
                sm={10}
                md={4}
                key={index}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Card
                  sx={{
                    background: 'rgba(15, 15, 15, 0.75)',
                    border: '1px solid rgba(77,184,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                    height: '100%',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 10px 30px rgba(77,184,255,0.2)',
                      borderColor: '#4db8ff'
                    },
                    width: '100%',
                    maxWidth: 360
                  }}
                >
                  <CardContent>
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
      
      {/* 🎯 Spline Background for Desktop */}
      {typeof window !== 'undefined' && window.innerWidth > 600 && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <Spline scene="https://prod.spline.design/DF5jLfAGU5aX7BPy/scene.splinecode" />
        </Box>
      )}


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
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Section title="Achievements" bg="transparent">
          <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
            {[
                ['2nd Place: IEEE Code Debugging Event', '🥈 Excelled in competitive debugging, earning 2nd place.'],
                
                ['2nd Place: Paper Presentation Competition at Guru Nanak College', '🥈 Presented innovative research ideas and secured 2nd place.'],
                
                ['2nd Place: Overall Runner-up at Guru Nanak College Symposium', '🥈 Contributed significantly to the team’s overall 2nd place win.'],
                
                ['2nd Place: Data Preprocessing and Quantitative Graphs Event', '🥈 Showcased data analysis skills to win 2nd place.'],
                
                ['3rd Place: Code Debugging at Dr. MGR Research Institute', '🥉 Achieved 3rd place in a national-level debugging contest.'],
                
                ['Hackathon: Hack-o-Mania 5.0 (SJIT)', '⚡ Completed a 24-hour hackathon with a functional tech prototype.'],
                
                ['Hackathon: Blaze-A-Trail 1.0 (SJIT)', '⚡ Delivered an innovative solution within 24 hours of intensive coding.'],
                
                ['Hackathon: Hack2Skills – UN SDG', '🌍 Built and presented a project aligned with the UN Sustainable Development Goals.'],
                
                ['NCAT 2025 – Naukri Campus All India Career Aptitude Test', '📊 Scored 28/60 with 100% attempt rate; secured 56.79 percentile in Tamil Nadu with top scores in Verbal & Reasoning.']
            ].map(([title, desc]) => (
              <Grid item xs={12} sm={6} md={4} key={title}>
                <Card
                  sx={{
                    background: 'rgba(15, 15, 15, 0.75)',
                    border: '1px solid rgba(77,184,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                    height: '100%',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 10px 30px rgba(77,184,255,0.2)',
                      borderColor: '#4db8ff'
                    }
                  }}
                >
                  <CardContent>
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
  path="/otherprofiles"
  element={
    <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
      {/* 🔵 Spline 3D Background (interactive) */}
      {typeof window !== 'undefined' && window.innerWidth > 600 && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 0
          }}
        >
          <Spline scene="https://prod.spline.design/DF5jLfAGU5aX7BPy/scene.splinecode" />
        </Box>
      )}


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
      <Box sx={{ position: 'relative', zIndex: 2, py: { xs: 1, md: 0 } }}>
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
              [
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m8 18v-1c0-1.33-2.67-2-4-2s-4 .67-4 2v1zm-4-8a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"/></svg>,
                'Resume',
                'https://drive.google.com/file/d/1ektlBVo7ma44BNL2oDV3vDJ5v7gZfolq/view?usp=sharing'
              ]
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
                      background: 'rgba(15, 15, 15, 0.75)',
                      border: '1px solid rgba(77,184,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '20px',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      px: 3,
                      py: 2,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: '0 10px 25px rgba(77,184,255,0.2)',
                        borderColor: '#4db8ff'
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
    bgcolor: '#0d0d0d',
    borderTop: '1px solid #333',
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