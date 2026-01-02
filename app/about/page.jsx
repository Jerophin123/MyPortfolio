'use client';

import { Avatar, Typography, Button, Box, Grid, Card } from '@mui/material';
import AnimatedBackground from '@/components/AnimatedBackground';
import ClientLayout from '@/components/ClientLayout';
import Section from '@/components/Section';

export default function AboutPage() {
  return (
    <ClientLayout>
      <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
        <AnimatedBackground />
        <Section bg="transparent">
          <Box
            sx={{
              fontFamily: '"Poppins", sans-serif',
              maxWidth: '1400px',
              marginTop: { xs: '60px', sm: '60px', md: '60px' },
              py: { xs: 3, sm: 6, md: 10 },
              px: { xs: 1.5, sm: 3, md: 6 },
              mx: 'auto',
              zIndex: 1,
              position: 'relative',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <Card
              sx={{
                background: 'var(--glass-bg)',
                backdropFilter: 'var(--backdrop-blur-light)',
                WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                border: '1px solid var(--glass-border-light)',
                borderRadius: { xs: '20px', sm: '24px', md: '32px' },
                boxShadow: 'var(--glass-shadow)',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                overflow: 'hidden',
                p: { xs: 2.5, sm: 4, md: 6 },
                position: 'relative',
                width: '100%',
                boxSizing: 'border-box',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'var(--glass-shine)',
                  zIndex: 1
                },
                '&:hover': {
                  transform: { xs: 'none', sm: 'translateY(-8px) scale(1.02)' },
                  boxShadow: { xs: 'var(--glass-shadow)', sm: 'var(--glass-shadow-hover)' }
                }
              }}
            >
              <Grid container spacing={{ xs: 2, sm: 3, md: 5 }} sx={{ alignItems: 'stretch' }}>
                {/* Left Side - Profile & Main Info */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: { xs: 'center', md: 'flex-start' },
                      textAlign: { xs: 'center', md: 'left' },
                      pr: { md: 4 },
                      borderRight: { md: '1px solid var(--glass-border)' },
                      pb: { xs: 3, md: 0 },
                      borderBottom: { xs: '1px solid var(--glass-border)', md: 'none' }
                    }}
                  >
                  <Avatar
                    src="/profile.jpg"
                    alt="Jerophin D R"
                    sx={{
                      width: { xs: 120, sm: 160, md: 180 },
                      height: { xs: 120, sm: 160, md: 180 },
                      mb: { xs: 3, sm: 4 },
                      mx: { xs: 'auto', md: 'auto' },
                      alignSelf: { xs: 'center', md: 'center' },
                      border: '2px solid var(--glass-border-hover)',
                      background: 'var(--glass-bg)',
                      backdropFilter: 'var(--backdrop-blur-light)',
                      WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                      boxShadow: 'var(--glass-shadow)',
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
                        background: 'var(--glass-shine)',
                        zIndex: 1
                      },
                      '&:hover': {
                        transform: { xs: 'none', sm: 'scale(1.05)' },
                        background: { xs: 'var(--glass-bg)', sm: 'var(--glass-bg-hover)' },
                        boxShadow: { xs: 'var(--glass-shadow)', sm: 'var(--glass-shadow-hover)' }
                      }
                    }}
                  />

                  <Typography
                    variant="h5"
                    sx={{
                      color: 'var(--accent)',
                      fontWeight: 700,
                      mb: { xs: 1.5, sm: 2 },
                      letterSpacing: '0.5px',
                      fontSize: { xs: '1.1rem', sm: '1.35rem', md: '1.75rem' },
                      lineHeight: { xs: 1.3, sm: 1.4, md: 1.5 },
                      px: { xs: 1, sm: 0 }
                    }}
                  >
                    Hi, I'm Jerophin — Developer, Designer, and Dreamer.
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: 'var(--text-light)',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      lineHeight: { xs: 1.7, sm: 1.8, md: 1.9 },
                      mb: { xs: 2, sm: 3 },
                      px: { xs: 0.5, sm: 0 }
                    }}
                  >
                    I'm a dedicated <strong style={{ color: 'var(--accent)' }}>Full Stack Developer</strong> and{' '}
                    <strong style={{ color: 'var(--accent)' }}>UI/UX Designer</strong> with a focus on building scalable,
                    responsive web applications. I specialize in modern frameworks like React and FastAPI, and I turn
                    high-fidelity designs from tools like Figma into clean, accessible user interfaces.
                    My work blends engineering precision with intuitive design thinking.
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: 'var(--text-light)',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      lineHeight: { xs: 1.7, sm: 1.8, md: 1.9 },
                      mb: { xs: 3, sm: 4 },
                      px: { xs: 0.5, sm: 0 }
                    }}
                  >
                    Proficient in <span style={{ color: 'var(--accent)' }}>React.js, Vite, Next.js, FastAPI, Express.js, Angular, Vue, Python, Java, SQL, JavaScript</span> and many more, I apply
                    strong backend and frontend skills to bridge the gap between design and engineering. I actively
                    participate in hackathons, enjoy building practical, real-world solutions, and am open to
                    relocation for the right opportunity in software development or product engineering.
                  </Typography>
                  
                  <Box
                    sx={{
                      display: 'flex',
                      gap: { xs: 1.5, sm: 2 },
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: { xs: 'center', md: 'flex-start' },
                      alignItems: 'stretch',
                      width: '100%',
                      mt: 'auto'
                    }}
                  >
                    <Button
                      variant="contained"
                      component="a"
                      href="https://drive.google.com/file/d/1mb5bSif0O8dJnU2BegeAtoKtaHJFCRiJ/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        px: { xs: 2.5, sm: 4 },
                        py: { xs: 1.25, sm: 1.5 },
                        fontFamily: '"Poppins", sans-serif',
                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                        borderRadius: { xs: '16px', sm: '20px' },
                        background: 'var(--glass-bg-hover)',
                        backdropFilter: 'var(--backdrop-blur-light)',
                        WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                        border: '1px solid var(--glass-border-hover)',
                        color: 'var(--accent)',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        width: { xs: '100%', sm: 'auto' },
                        minWidth: { xs: '100%', sm: 180 },
                        boxShadow: 'var(--glass-shadow)',
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
                          background: 'var(--glass-shine)',
                          zIndex: 1
                        },
                        '&:hover': {
                          background: 'var(--glass-bg-hover)',
                          transform: { xs: 'none', sm: 'translateY(-3px) scale(1.02)' },
                          boxShadow: { xs: 'var(--glass-shadow)', sm: 'var(--glass-shadow-hover)' }
                        },
                        '&:active': {
                          transform: { xs: 'scale(0.98)', sm: 'translateY(-2px) scale(1.01)' }
                        }
                      }}
                    >
                      Download Resume
                    </Button>

                    <Button
                      variant="outlined"
                      component="a"
                      href="https://linktr.ee/Jerophin"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        px: { xs: 2.5, sm: 4 },
                        py: { xs: 1.25, sm: 1.5 },
                        fontFamily: '"Poppins", sans-serif',
                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                        borderRadius: { xs: '16px', sm: '20px' },
                        background: 'transparent',
                        border: '2px solid var(--glass-border-hover)',
                        color: 'var(--accent)',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        width: { xs: '100%', sm: 'auto' },
                        minWidth: { xs: '100%', sm: 180 },
                        boxShadow: 'var(--glass-shadow)',
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
                          background: 'var(--glass-shine)',
                          zIndex: 1
                        },
                        '&:hover': {
                          background: 'var(--glass-bg)',
                          borderColor: 'var(--glass-border-hover)',
                          transform: { xs: 'none', sm: 'translateY(-3px) scale(1.02)' },
                          boxShadow: { xs: 'var(--glass-shadow)', sm: 'var(--glass-shadow-hover)' }
                        },
                        '&:active': {
                          transform: { xs: 'scale(0.98)', sm: 'translateY(-2px) scale(1.01)' }
                        }
                      }}
                    >
                      Connect
                    </Button>
                  </Box>
                  </Box>
                </Grid>

                {/* Right Side - Education Section */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: { xs: 'center', md: 'left' },
                      pl: { md: 4 },
                      pt: { xs: 3, md: 0 }
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'var(--accent)',
                        fontWeight: 600,
                        mb: { xs: 3, sm: 4 },
                        fontSize: { xs: '1.3rem', sm: '1.5rem', md: '2rem' },
                        textAlign: { xs: 'center', md: 'left' }
                      }}
                    >
                      Education
                    </Typography>

              {[
                {
                  title: 'Bachelor of Engineering in Computer Science',
                  score: 'CGPA: 8.4',
                  institute: "St. Joseph's Institute of Technology, OMR, Chennai",
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
                    gap: { xs: 1.5, sm: 2 },
                    mb: { xs: 3, sm: 4 },
                    background: 'var(--glass-bg)',
                    backdropFilter: 'var(--backdrop-blur-light)',
                    WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: { xs: '16px', sm: '20px' },
                    p: { xs: 2, sm: 2.5, md: 3 },
                    boxShadow: 'var(--glass-shadow)',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100%',
                    boxSizing: 'border-box',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: 'var(--glass-shine)',
                      zIndex: 1
                    },
                    '&:hover': {
                      transform: { xs: 'none', sm: 'translateY(-5px) scale(1.02)' },
                      boxShadow: { xs: 'var(--glass-shadow)', sm: 'var(--glass-shadow-hover)' },
                      borderColor: { xs: 'var(--glass-border)', sm: 'var(--glass-border-hover)' }
                    }
                  }}
                >
                  <Box
                    component="a"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      width: { xs: '80px', sm: '90px', md: '100px' },
                      flexShrink: 0,
                      mx: { xs: 'auto', md: 0 },
                      background: 'var(--glass-bg)',
                      backdropFilter: 'var(--backdrop-blur-light)',
                      WebkitBackdropFilter: 'var(--backdrop-blur-light)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: { xs: '10px', sm: '12px' },
                      p: { xs: 0.75, sm: 1 },
                      boxShadow: 'var(--glass-shadow)',
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
                        background: 'var(--glass-shine)',
                        zIndex: 1
                      },
                      '&:hover': {
                        transform: { xs: 'none', sm: 'scale(1.05)' },
                        boxShadow: { xs: 'var(--glass-shadow)', sm: 'var(--glass-shadow-hover)' },
                        borderColor: { xs: 'var(--glass-border)', sm: 'var(--glass-border-hover)' }
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
                        borderRadius: { xs: '6px', sm: '8px' },
                        filter: 'brightness(1.1) contrast(1.05)'
                      }}
                    />
                  </Box>

                  <Box sx={{ textAlign: { xs: 'center', md: 'left' }, width: '100%' }}>
                    <Typography sx={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: { xs: '0.9rem', sm: '1rem' }, mb: { xs: 0.5, sm: 0.75 } }}>
                      {title} <span style={{ color: 'var(--accent)' }}>({score})</span>
                    </Typography>
                    <Typography sx={{ color: 'var(--text-secondary)', fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' }, mb: { xs: 0.5, sm: 0.75 }, lineHeight: { xs: 1.4, sm: 1.5 } }}>
                      {institute}
                    </Typography>
                    <Typography sx={{ color: 'var(--text-tertiary)', fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' }, mt: { xs: 0.25, sm: 0.5 }, lineHeight: { xs: 1.4, sm: 1.5 } }}>
                      {date.includes(':') ? (
                        <>
                          {date.split(':')[0]}:{' '}
                          <span style={{ color: 'var(--accent)' }}>{date.split(':')[1]}</span>
                        </>
                      ) : (
                        date
                      )}
                    </Typography>
                  </Box>
                </Box>
              ))}
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Section>
      </Box>
    </ClientLayout>
  );
}

