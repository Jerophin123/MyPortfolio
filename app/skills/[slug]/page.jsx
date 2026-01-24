import { notFound } from 'next/navigation';
import { getSkillBySlug, getAllSkillSlugs } from '@/app/data/skills';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import AnimatedBackground from '@/components/AnimatedBackground';
import ClientLayout from '@/components/ClientLayout';
import Section from '@/components/Section';
import Link from 'next/link';

export async function generateStaticParams() {
  const slugs = getAllSkillSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);
  
  if (!skill) {
    return {
      title: 'Skill Not Found',
    };
  }

  return {
    title: `${skill.title} | Jerophin D R Portfolio`,
    description: skill.description,
    keywords: `${skill.title}, Skills, Portfolio, Jerophin D R, ${skill.description}`,
    openGraph: {
      title: `${skill.title} | Jerophin D R Portfolio`,
      description: skill.description,
      type: 'website',
      url: `https://jerophin-portfolio.vercel.app/skills/${skill.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${skill.title} | Jerophin D R Portfolio`,
      description: skill.description,
    },
    alternates: {
      canonical: `https://jerophin-portfolio.vercel.app/skills/${skill.slug}`,
    },
  };
}

export default async function SkillPage({ params }) {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);

  if (!skill) {
    notFound();
  }

  // Parse description to extract individual skills
  const skillsList = [];
  const lines = skill.description.split('\n');
  
  lines.forEach(line => {
    // Remove category headers (e.g., "Frontend –", "Backend –")
    const cleanLine = line.replace(/^[^–]+–\s*/, '').trim();
    if (cleanLine) {
      // Split by comma and clean each skill
      const lineSkills = cleanLine.split(',').map(s => s.trim()).filter(s => s);
      skillsList.push(...lineSkills);
    }
  });

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
          <Section title={skill.title} bg="transparent">
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
                    {skill.title}
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
                    {skill.description}
                  </Typography>

                  {skillsList.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'var(--accent)',
                          fontWeight: 600,
                          mb: 2,
                          fontFamily: '"Poppins", sans-serif',
                          textAlign: 'center',
                        }}
                      >
                        Technologies & Tools
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 1.5,
                          justifyContent: 'center',
                        }}
                      >
                        {skillsList.map((tech, index) => (
                          <Box
                            key={index}
                            sx={{
                              px: { xs: 1.25, sm: 1.5, md: 2 },
                              py: { xs: 0.5, sm: 0.75, md: 1 },
                              background: 'var(--glass-bg)',
                              backdropFilter: 'var(--backdrop-blur-light)',
                              border: '1px solid var(--glass-border-hover)',
                              borderRadius: { xs: '16px', sm: '18px', md: '20px' },
                              boxShadow: 'var(--glass-shadow)',
                            }}
                          >
                            <Typography
                              sx={{
                                color: 'var(--accent)',
                                fontFamily: '"Poppins", sans-serif',
                                fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                                fontWeight: 500,
                              }}
                            >
                              {tech}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}

                  <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Link href="/skills" style={{ textDecoration: 'none' }}>
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
                        ← Back to Skills
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
            "@type": "ItemList",
            "name": skill.title,
            "description": skill.description,
            "itemListElement": skillsList.map((tech, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": tech
            }))
          }),
        }}
      />
    </ClientLayout>
  );
}
