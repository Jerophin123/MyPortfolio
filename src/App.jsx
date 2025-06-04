import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AppBar, Toolbar, Fade, Typography, Button, Box, Grid, Card, CardContent, Avatar, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import profileImage from './assets/profile.jpg';
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
    { label: 'Contact', path: '/contact' },
    { label: 'Other Profiles', path: '/otherprofiles' }
  ];

  const NavMenu = ({ isMobile, drawerOpen, setDrawerOpen, navLinks }) => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {isMobile ? (
        <>
          {/* 📱 Mobile Hamburger Button */}
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

          {/* 🧾 Mobile Drawer */}
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
        // 🖥 Desktop: Floating Bubble Nav
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
          {navLinks.map((link, i) => (
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
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(12, 12, 12, 0.96)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.65)',
          zIndex: 1300
        }}
      >
<Toolbar
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    px: { xs: 2, sm: 3, md: 6 },
    minHeight: { xs: 56, md: 72 }
  }}
>
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover .brand-text': {
          ...(isMobile ? {} : {
            opacity: 1,
            transform: 'translateX(10px)'
          })
        }
      }}
      onClick={handleClick}
    >
      {/* 🧊 Favicon Bubble */}
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

      {/* 💬 Brand Text */}
      <Typography
        className="brand-text"
        sx={{
          ml: 1.5,
          color: '#4db8ff',
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
        JEROPHIN D R
      </Typography>
    </Box>


  {/* 🔘 Right-Aligned Nav and Toggle */}
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      ml: 'auto'
    }}
  >
    {/* 🖥️ Desktop Navigation */}
    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
      {navLinks.map((link, i) => (
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
            transition: 'color 0.2s ease-in-out',

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
    </Box>

    {/* 📱 Mobile Toggle (hidden on desktop) */}
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
          transition: 'all 0.2s ease-in-out',
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
                color: '#fff',
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
          zIndex: 0,
        }}
      >
        <Spline scene="https://prod.spline.design/DF5jLfAGU5aX7BPy/scene.splinecode" />
      </Box>

      {/* Foreground Section Content */}
      <Section title="About Me" bg="transparent">
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
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0
          // Removed pointerEvents to allow interaction
        }}
      >
        <Spline scene="https://prod.spline.design/DF5jLfAGU5aX7BPy/scene.splinecode" />
      </Box>

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
               ['🖥️ Platforms & Operating Systems', 
                'Windows, Linux (Ubuntu, XFCE)\n' + 
                'Cross-platform environments, Portfolio hosting'
                ],

                ['🛠️ Programming & Scripting Languages', 
                'C, C++, Java, JavaScript (ES6+), Python\n' + 
                'R, PHP, SQL, Bash'
                ],

                ['🧩 Full-Stack Development', 
                'Frontend – HTML5, CSS3, Tailwind, Bootstrap, React, Vue, Angular\n' + 
                'React Native, Next.js, MUI, Vite, Web3.js, Context API, React Router, React Hook Form\n' +
                'Backend – Node.js, Express, Django, Flask, FastAPI, NestJS, Spring Boot, Apache, Tomcat, Gunicorn, Jinja'
                ],

                ['🔌 API Design & Integration', 
                'RESTful API Development, JWT Authentication\n' + 
                'OpenAPI/Swagger, Versioning, Socket.IO'
                ],

                ['☁️ Cloud & DevOps', 
                'AWS, Google Cloud, Azure, Firebase, Vercel, Heroku\n'+ 
                'Cloudflare, Docker (Basic), Jenkins, CI/CD Pipelines'
                ],

                ['🗄️ Data & Databases', 
                'MySQL, PostgreSQL, SQLite, MongoDB\n' +
                'MariaDB, Apache Hadoop, Relational Modeling, Query Optimization'
                ],

                ['📊 Data Science & Machine Learning', 
                'Pandas, NumPy, Matplotlib, Seaborn, Chart.js, OpenCV\n' +
                'Scikit-learn, TensorFlow, PyTorch, SciPy, Anaconda'
                ],

                ['🔐 Security & Networking Fundamentals', 
                'VPN, Firewall, IPS/IDS, IPSec, TLS\n' + 
                'HTTP/HTTPS, Cisco Tools, Tor Browser Security'
                ],

                ['✅ Testing & Quality Assurance', 
                'Jest, Mocha, Selenium Basics\n' + 
                'Manual Testing, Automation Frameworks'
                ],

                ['🎨 UI/UX & Visual Design', 
                'Figma, Adobe XD, Illustrator, Fonts, Canva\n' +
                'Creative Cloud, GIMP, Inkscape, SketchUp, Dribbble'
                ],

                ['📂 Office & Collaboration Tools', 
                'Microsoft Excel, Word, PowerPoint\n' + 
                'Jira, Trello, Notion, Git, GitHub, Gradle'
                ]
            ].map(([title, desc], index) => (
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
                  <CardContent sx={{ px: 3, py: 4 }}>
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
          zIndex: 0,
        }}
      >
        <Spline scene="https://prod.spline.design/DF5jLfAGU5aX7BPy/scene.splinecode" />
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
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Spline scene="https://prod.spline.design/DF5jLfAGU5aX7BPy/scene.splinecode" />
      </Box>

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
  path="/contact"
  element={
    <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
      
      {/* 🌐 Spline 3D Background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        <Spline scene="https://prod.spline.design/DF5jLfAGU5aX7BPy/scene.splinecode" />
      </Box>

      {/* 🧊 Overlay for readability */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2))',
          zIndex: 1
        }}
      />

      {/* 💬 Foreground Section */}
      <Box sx={{ position: 'relative', zIndex: 2, py: { xs: 1, md: 0 }, px: { xs: 0, sm: 0, md: 0 } }}>
        <Section title="Contact" bg="transparent">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              width: '100%',
              maxWidth: '500px',
              mx: 'auto'
            }}
          >
            {[
              [
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25a.85.85 0 1 1 .9-1.44L12 11l6.7-4.19a.85.85 0 1 1 .9 1.44"/>
                </svg>,
                'Email',
                'mailto:jerophinstanley47@gmail.com'
              ],
              [
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                  <path d="m19.23 15.26l-2.54-.29a1.99 1.99 0 0 0-1.64.57l-1.84 1.84a15.05 15.05 0 0 1-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52a2 2 0 0 0-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07c.53 8.54 7.36 15.36 15.89 15.89c1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98"/>
                </svg>,
                'Phone',
                'tel:+919940306399'
              ],
              [
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.04 17.043h-2.962v-4.64c0-1.107-.023-2.531-1.544-2.531c-1.544 0-1.78 1.204-1.78 2.449v4.722H7.793V7.5h2.844v1.3h.039c.397-.75 1.364-1.54 2.808-1.54c3.001 0 3.556 1.974 3.556 4.545zM4.447 6.194c-.954 0-1.72-.771-1.72-1.72s.767-1.72 1.72-1.72a1.72 1.72 0 0 1 0 3.44m1.484 10.85h-2.97V7.5h2.97zM18.522 0H1.476C.66 0 0 .645 0 1.44v17.12C0 19.355.66 20 1.476 20h17.042c.815 0 1.482-.644 1.482-1.44V1.44C20 .646 19.333 0 18.518 0z"/>
                </svg>,
                'LinkedIn',
                'https://www.linkedin.com/in/jerophin-d-r-b9a73b257/'
              ],
              [
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M8.75 10a3.25 3.25 0 1 1 6.5 0a3.25 3.25 0 0 1-6.5 0Z"
                    fill="#4db8ff"
                  />
                  <path
                    fill="#4db8ff"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.774 8.877a8.04 8.04 0 0 1 8.01-7.377h.432a8.04 8.04 0 0 1 8.01 7.377a8.7 8.7 0 0 1-1.933 6.217L13.5 20.956a1.937 1.937 0 0 1-3 0l-4.792-5.862a8.7 8.7 0 0 1-1.934-6.217Zm8.226-3.627a4.75 4.75 0 1 0 0 9.5a4.75 4.75 0 0 0 0-9.5Z"
                  />
                </svg>,
                'Location',
                'https://maps.app.goo.gl/wj4R5RuBersWa33JA'
              ]
            ].map(([icon, text, link], index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Card
                  sx={{
                    width: '100%',
                    background: 'rgba(15, 15, 15, 0.75)',
                    border: '1px solid rgba(77,184,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    px: { xs: 0, sm: 0, md: 0 },
                    py: { xs: 4, sm: 4, md: 4 },
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 10px 25px rgba(77,184,255,0.2)',
                      borderColor: '#4db8ff'
                    },
                    '& svg': {
                      fill: '#4db8ff'
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
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
                      {text}
                    </Typography>
                  </CardContent>
                </Card>
              </a>
            ))}
          </Box>
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
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0
        }}
      >
        <Spline scene="https://prod.spline.design/DF5jLfAGU5aX7BPy/scene.splinecode" />
      </Box>

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
        <Section title="Other Profiles" bg="transparent">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m8 18v-1c0-1.33-2.67-2-4-2s-4 .67-4 2v1zm-4-8a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"/></svg>,
                'Resume',
                'https://drive.google.com/file/d/1wiJn84kSkNsOWIkY0XphgpQp8a-E8Fo0/view?usp=sharing'
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
    textAlign: 'center',
    fontFamily: '"Poppins", sans-serif',
    py: 3,
    borderTop: '1px solid #333',
    width: '100vw'
  }}
>
  <Typography variant="body2" color="#c0c0c0">
    &copy; 2025 JEROPHIN D R | All Rights Reserved
  </Typography>

  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 3 }}>
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

    {/* Behance */}
    <a
      href="https://www.behance.net/jerophinstanley"
      target="_blank"
      rel="noreferrer"
      style={{ color: '#4db8ff' }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
        <path d="M6.316 7.009c.203-.147.3-.391.3-.728a.94.94 0 0 0-.097-.459a.7.7 0 0 0-.272-.278a1.1 1.1 0 0 0-.388-.141a2.4 2.4 0 0 0-.453-.041H3.759v1.869H5.54q.47.004.775-.222zm.278 1.688q-.346-.262-.919-.262H3.759v2.203h1.878q.261 0 .494-.05c.233-.05.297-.088.416-.169q.18-.117.287-.319c.107-.202.106-.309.106-.519q0-.617-.347-.884z"/>
        <path d="M14.5 0h-13C.675 0 0 .675 0 1.5v13c0 .825.675 1.5 1.5 1.5h13c.825 0 1.5-.675 1.5-1.5v-13c0-.825-.675-1.5-1.5-1.5m-4.012 4.209h3.241V5h-3.241zm-2.025 6.516a2.06 2.06 0 0 1-.631.725a2.8 2.8 0 0 1-.909.416A4 4 0 0 1 5.879 12H2.001V4.003H5.77q.57 0 1.044.1q.469.1.806.331q.334.23.522.609c.122.25.184.566.184.938q0 .604-.275 1.006c-.275.402-.453.487-.816.659c.494.141.856.391 1.097.744q.364.534.363 1.284q.004.614-.231 1.05zm6.528-1.237h-4.178c0 .456.156.891.394 1.125q.357.348 1.028.35q.481 0 .831-.244q.346-.244.425-.512h1.4q-.335 1.045-1.031 1.494c-.459.3-1.022.45-1.675.45q-.683-.001-1.234-.219a2.6 2.6 0 0 1-.934-.622a2.9 2.9 0 0 1-.588-.966A3.6 3.6 0 0 1 9.22 9.11q0-.65.213-1.213a2.82 2.82 0 0 1 1.544-1.616a3 3 0 0 1 1.206-.234q.736-.001 1.287.287q.548.286.903.769c.355.483.403.688.509 1.1q.153.609.109 1.284z"/>
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
    </Router>
  );
}

export default App;