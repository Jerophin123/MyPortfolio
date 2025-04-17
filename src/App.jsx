import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Grid, Card, CardContent, Avatar, Drawer, List, ListItem, ListItemText } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import profileImage from './assets/profile.jpg';


function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Skills', path: '/skills' },
    { label: 'Experience', path: '/experience' },
    { label: 'Projects', path: '/projects' },
    { label: 'Achievements', path: '/achievements' },
    { label: 'Contact', path: '/contact' },
    { label: 'Profile', path: '/profiles' }
  ];

  const NavMenu = ({ isMobile, drawerOpen, setDrawerOpen, navLinks }) => (
    <>
      {isMobile ? (
        <>
          {/* Mobile: Menu Button & Drawer */}
          <Button variant="outlined" color="inherit" onClick={() => setDrawerOpen(true)}>
            Menu
          </Button>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
              sx: {
                backgroundColor: '#121212',
                color: '#fff',
                width: 240
              }
            }}
          >
            <List>
              {navLinks.map((link, i) => (
                <ListItem
                  button
                  key={i}
                  component={Link}
                  to={link.path}
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{ sx: { fontFamily: '"Poppins", sans-serif', fontWeight: 500, fontSize: '1rem', color: '#4db8ff' } }}
                  />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </>
      ) : (
        // Desktop: horizontal nav buttons (already in your AppBar, this is optional reuse)
        navLinks.map((link, i) => (
          <Button
            key={i}
            component={Link}
            to={link.path}
            sx={{
              color: '#e6e6e6',
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 500,
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                color: '#4db8ff',
                backgroundColor: 'transparent',
                borderBottom: '2px solid #4db8ff',
                borderRadius: 0
              }
            }}
          >
            {link.label}
          </Button>
        ))
      )}
    </>
  );
  
  
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
        sx={{
          backgroundColor: 'rgba(13, 13, 13, 0.85)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6)',
          borderBottom: '1px solid #222',
          backdropFilter: 'blur(8px)',
          zIndex: 1200
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            px: { xs: 2, md: 6 },
            minHeight: { xs: 56, md: 72 }
          }}
        >
          {/* Logo or Title */}
          <Typography
            variant="h6"
            sx={{
              color: '#4db8ff',
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 'bold',
              fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
              letterSpacing: 1
            }}
          >
            JEROPHIN D R
          </Typography>

          {/* Desktop Nav Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            {navLinks.map((link, i) => (
              <Button
                key={i}
                component={Link}
                to={link.path}
                sx={{
                  color: '#e6e6e6',
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 500,
                  textTransform: 'none',
                  fontSize: '1rem',
                  px: 1.5,
                  '&:hover': {
                    color: '#4db8ff',
                    backgroundColor: 'transparent',
                    borderBottom: '2px solid #4db8ff',
                    borderRadius: 0
                  }
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Mobile Nav Drawer Trigger */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Button
              onClick={() => setDrawerOpen(true)}
              sx={{
                color: '#4db8ff',
                border: '1px solid #4db8ff',
                px: 2,
                py: 0.5,
                borderRadius: '8px',
                fontFamily: '"Poppins", sans-serif',
                fontSize: '0.9rem',
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#1a1a1a'
                }
              }}
            >
              Menu
            </Button>
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
            pt: 3
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
        bgcolor: '#0f0f0f',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 6, sm: 8, md: 0 }, // 🔥 shifted more up on desktop (was 6)
        py: { xs: 2, sm: 4, md: 0 }
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: '960px',
          width: '100%',
          px: { xs: 2, sm: 6, md: 8 }
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', sm: '2.8rem', md: '3.2rem' },
            color: '#4db8ff',
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 800,
            mb: 3,
            lineHeight: 1.2,
            letterSpacing: '-0.5px'
          }}
        >
          Hi, I'm Jerophin — <br />
          Full Stack Developer & UI/UX Designer
        </Typography>

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
  }
/>

<Route
  path="/about"
  element={
    <Section title="About Me">
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
            color: '#cccccc',
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.9,
            mb: 3
          }}
        >
          I'm a results-driven <strong style={{ color: '#4db8ff' }}>Full Stack Developer</strong> & <strong style={{ color: '#4db8ff' }}>UI/UX Designer</strong> passionate about crafting digital experiences that blend function and beauty.
          I specialize in building scalable web apps using modern frameworks and intuitive interfaces with Figma, Adobe XD, and design thinking.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#cccccc',
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.9
          }}
        >
          With strong skills in <span style={{ color: '#4db8ff' }}>Python, Java, SQL, and JavaScript</span>,
          I bridge the gap between design and engineering. I love hackathons, am open to relocation,
          and enjoy building real-world tools that make a difference.
        </Typography>
      </Box>
    </Section>
  }
/>

<Route
  path="/skills"
  element={
    <Section title="Skills">
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
          ['🎨 UI/UX Design', 'Figma, Adobe XD, Sketch\nWireframing & Prototyping'],
          ['🧩 Full Stack Development', 'React, Node.js, REST APIs\nHTML, CSS, SQL'],
          ['🛠️ Languages & Tools', 'Python, Java, Git\nLinux, MongoDB'],
          ['📊 Data Science', 'Pandas, NumPy, Matplotlib\nJupyter Notebooks'],
          ['🤝 Soft Skills', 'Teamwork, Communication\nTime Management'],
          ['📅 Project Management', 'Agile, Jira, Trello']
        ].map(([title, desc], index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                background: 'rgba(23, 23, 23, 0.75)',
                border: '1px solid rgba(77,184,255,0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  borderColor: '#4db8ff',
                  boxShadow: '0 16px 32px rgba(77,184,255,0.15)'
                }
              }}
            >
              <CardContent sx={{ px: 3, py: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#4db8ff',
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: '1.1rem',
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
                    color: '#c0c0c0',
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
  }
/>


<Route
  path="/experience"
  element={
    <Section title="Experience">
      <Card
        sx={{
          maxWidth: '800px',
          mx: 'auto',
          bgcolor: 'rgba(30, 30, 30, 0.85)',
          background: 'rgba(23, 23, 23, 0.75)',
          border: '1px solid rgba(77,184,255,0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
          px: { xs: 2, sm: 4 },
          py: 4,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            borderColor: '#4db8ff',
            boxShadow: '0 12px 36px rgba(77,184,255,0.2)',
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
    </Section>
  }
/>


        <Route
          path="/projects"
          element={
            <Section title="Projects">
              <Grid
                container
                spacing={4}
                justifyContent="center"
                sx={{ mt: 4 }}
              >
                {[
                  ['Waste Management System', '🧠 AI-based smart waste classification (Deep Learning) integrated with Google.'],
                  ['RV Diagnose', '🌿 Built a plant disease detection system using Deep Learning and TensorFlow.'],
                  ['Binger App', '🎬 Designed a UI/UX project for a content recommendation platform using Figma.'],
                  ['JDEL PC Factory', '🛠️ Crafted an innovative PC customization interface focused on advanced UX principles. Led to a direct increase of 200+ users within the first month of launch.'],
                  ['Student Management System', '🏫 Built a robust data handling system using JSP.'],
                  ['Market Basket Analysis', '🛒 Applied Apriori algorithm for consumer trend analysis in Python.'],
                  ['Log Analyzer', '📊 Developed a Python-based log analysis tool with visualization capabilities.'],
                  ['Fitness Tracking Dashboard', '💪 Designed an interactive dashboard for health enthusiasts using Figma.'],
                  ['Geolocation-based Attendance System', '📍 Python project combining GPS and biometric authentication.'],
                  ['TorUnveil', '🕵️ Created a Python tool to trace and deanonymize anonymous email senders.'],
                  ['AUD', '🎧 Designed a high-quality music player UI/UX tailored for audiophiles.']
                ].map(([title, desc]) => (
                  <Grid item xs={12} sm={6} md={4} key={title}>
                    <Card
                      sx={{
                        height: '100%',
                        background: 'rgba(23, 23, 23, 0.75)',
                        border: '1px solid rgba(77,184,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '20px',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 10px 30px rgba(77,184,255,0.25)',
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
                            fontFamily: '"Poppins", sans-serif',
                            mb: 1
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
                              mb: 0.5
                            }}
                          >
                            {line.trim() + (line.endsWith('.') ? '' : '.')}
                          </Typography>
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Section>
          }
        />


        <Route
          path="/achievements"
          element={
            <Section title="Achievements">
              <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
                {[
                  ['IEEE Code Debugging Event', '🥈 Secured 2nd Place in a competitive debugging round.'],
                  ['Paper Presentation – Guru Nanak College', '🥈 Presented innovative research and won 2nd Place.'],
                  ['Guru Nanak Symposium (Overall)', '🥈 Contributed to team’s win of Overall 2nd Place through leadership and initiative.'],
                  ['Data Preprocessing & Graphs Event', '🥈 Won 2nd Place in data visualization & analysis.'],
                  ['Code Debugging – Dr. MGR Institute', '🥉 Achieved 3rd Place in debugging challenge.'],
                  ['Hack-o-Mania 5.0 (SJIT)', '⚡ Successfully completed 24hr hackathon challenge with an innovative solution.']
                ].map(([title, desc]) => (
                  <Grid item xs={12} sm={6} md={4} key={title}>
                    <Card
                      sx={{
                        background: 'rgba(23, 23, 23, 0.75)',
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
          }
        />


        <Route
          path="/contact"
          element={
            <Section title="Contact">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                  mt: 4,
                  width: '100%',
                  maxWidth: '500px',
                  mx: 'auto'
                }}
              >
                {[
                  ['📧 Email', 'jerophinstanley47@gmail.com', 'mailto:jerophinstanley47@gmail.com'],
                  ['📱 Phone', '+91 9940306399', 'tel:+919940306399'],
                  ['💼 LinkedIn', 'linkedin.com/in/jerophin-d-r-b9a73b257', 'https://www.linkedin.com/in/jerophin-d-r-b9a73b257/']
                ].map(([label, display, link]) => (
                  <Card
                    key={label}
                    sx={{
                      width: '100%',
                      minHeight: 140,
                      background: 'rgba(23, 23, 23, 0.75)',
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
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#4db8ff',
                          fontWeight: 600,
                          fontSize: '1.2rem',
                          fontFamily: '"Poppins", sans-serif',
                          mb: 1
                        }}
                      >
                        {label}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="a"
                        href={link}
                        sx={{
                          color: '#c0c0c0',
                          fontSize: '1rem',
                          fontFamily: '"Poppins", sans-serif',
                          textDecoration: 'none',
                          '&:hover': {
                            color: '#4db8ff',
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        {display}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Section>
          }
        />

      <Route
        path="/profiles"
        element={
          <Section title="Profiles">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                mt: 4,
                width: '100%',
                maxWidth: '500px',
                mx: 'auto'
              }}
            >
              {[
                ['🐱 GitHub', 'github.com/Jerophin123', 'https://github.com/Jerophin123'],
                ['🎨 Behance', 'behance.net/jerophinstanley', 'https://www.behance.net/jerophinstanley'],
                ['💻 LeetCode', 'leetcode.com/u/Jerophinstanley', 'https://leetcode.com/u/Jerophinstanley/']
              ].map(([label, display, link]) => (
                <Card
                  key={label}
                  sx={{
                    width: '100%',
                    minHeight: 140,
                    background: 'rgba(23, 23, 23, 0.75)',
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
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#4db8ff',
                        fontWeight: 600,
                        fontFamily: '"Poppins", sans-serif',
                        fontSize: '1.2rem',
                        mb: 1
                      }}
                    >
                      {label}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="a"
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: '#c0c0c0',
                        fontSize: '1rem',
                        textDecoration: 'none',
                        '&:hover': {
                          color: '#4db8ff',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {display}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Section>
        }
      />
      </Routes>

        <Box component="footer" sx={{ bgcolor: '#0d0d0d', textAlign: 'center', fontFamily: '"Poppins", sans-serif', py: 3, borderTop: '1px solid #333', width: '100vw' }}>
          <Typography variant="body2" color="#c0c0c0">&copy; 2025 JEROPHIN D R | All Rights Reserved</Typography>
          <Box sx={{ mt: 1, fontFamily: '"Poppins", sans-serif' }}>
            {['LinkedIn', 'GitHub', 'Behance', 'LeetCode'].map((name, i) => (
              <a key={i} href={{
                LinkedIn: 'https://linkedin.com/in/jerophin-d-r-b9a73b257/',
                GitHub: 'https://github.com/Jerophin123',
                Behance: 'https://www.behance.net/jerophinstanley',
                LeetCode: 'https://leetcode.com/u/Jerophinstanley/'
              }[name]} target="_blank" rel="noreferrer" style={{ color: '#4db8ff', margin: '0 12px' }}>{name}</a>
            ))}
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;