import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjectSlugs } from '@/app/data/projects';
import { Box, Typography, Card, CardContent, Chip, Button } from '@mui/material';
import AnimatedBackground from '@/components/AnimatedBackground';
import ClientLayout from '@/components/ClientLayout';
import Section from '@/components/Section';
import Link from 'next/link';

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Jerophin D R Portfolio`,
    description: project.description,
    keywords: `${project.title}, ${project.techStack.join(', ')}, Portfolio, Jerophin D R`,
    openGraph: {
      title: `${project.title} | Jerophin D R Portfolio`,
      description: project.description,
      type: 'website',
      url: `https://jerophin-portfolio.vercel.app/projects/${project.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Jerophin D R Portfolio`,
      description: project.description,
    },
    alternates: {
      canonical: `https://jerophin-portfolio.vercel.app/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <ClientLayout>
      <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
        <AnimatedBackground />
        
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'var(--overlay)',
            zIndex: 1,
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 2, marginTop: { xs: '60px', sm: '60px', md: '60px' }, py: { xs: 4, sm: 6, md: 8 } }}>
          <Section title={project.title} bg="transparent">
            <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, sm: 3, md: 6 } }}>
              <Card
                sx={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'var(--backdrop-blur)',
                  WebkitBackdropFilter: 'var(--backdrop-blur)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: { xs: '20px', sm: '24px', md: '32px' },
                  boxShadow: 'var(--glass-shadow)',
                  mb: 4,
                }}
              >
                <CardContent sx={{ px: { xs: 2, sm: 2.5, md: 3 }, py: { xs: 2.5, sm: 3, md: 3.5 } }}>
                  {project.svg && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          '& svg': {
                            width: { xs: '120px', sm: '150px', md: '180px' },
                            height: { xs: '120px', sm: '150px', md: '180px' },
                          }
                        }}
                        dangerouslySetInnerHTML={{ __html: project.svg }}
                      />
                    </Box>
                  )}

                  <Typography
                    variant="h4"
                    sx={{
                      color: 'var(--accent)',
                      fontWeight: 700,
                      fontFamily: '"Poppins", sans-serif',
                      mb: 2,
                      textAlign: 'center',
                    }}
                  >
                    {project.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: 'var(--text-light)',
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                      fontFamily: '"Poppins", sans-serif',
                      lineHeight: 1.8,
                      mb: 3,
                      textAlign: 'center',
                    }}
                  >
                    {project.description}
                  </Typography>

                  {project.techStack && project.techStack.length > 0 && (
                    <Box sx={{ mb: 3, textAlign: 'center' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'var(--accent)',
                          fontWeight: 600,
                          mb: 2,
                          fontFamily: '"Poppins", sans-serif',
                        }}
                      >
                        Technologies Used
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 1.5,
                          justifyContent: 'center',
                        }}
                      >
                        {project.techStack.map((tech, index) => (
                          <Chip
                            key={index}
                            label={tech}
                            sx={{
                              background: 'var(--glass-bg)',
                              backdropFilter: 'var(--backdrop-blur-light)',
                              border: '1px solid var(--glass-border-hover)',
                              color: 'var(--accent)',
                              fontFamily: '"Poppins", sans-serif',
                              fontWeight: 500,
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {project.link && (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                      <Button
                        component="a"
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="contained"
                        sx={{
                          background: 'var(--accent)',
                          color: 'var(--bg)',
                          px: 4,
                          py: 1.5,
                          borderRadius: '12px',
                          fontFamily: '"Poppins", sans-serif',
                          fontWeight: 600,
                          '&:hover': {
                            background: 'var(--accent-hover)',
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        View Project
                      </Button>
                    </Box>
                  )}

                  <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Link href="/projects" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: 'var(--glass-border)',
                          color: 'var(--accent)',
                          fontFamily: '"Poppins", sans-serif',
                          '&:hover': {
                            borderColor: 'var(--glass-border-hover)',
                            background: 'var(--glass-bg-hover)',
                          },
                        }}
                      >
                        ← Back to Projects
                      </Button>
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Section>
        </Box>
      </Box>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": project.title,
            "description": project.description,
            "applicationCategory": "WebApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Person",
              "name": "Jerophin D R"
            },
            "url": project.link || `https://jerophin-portfolio.vercel.app/projects/${project.slug}`,
            "programmingLanguage": project.techStack || []
          }),
        }}
      />
    </ClientLayout>
  );
}

