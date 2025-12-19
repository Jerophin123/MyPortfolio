import { Box, Typography } from '@mui/material';

export default function Section({ title, children, bg = 'transparent' }) {
  return (
    <Box
      sx={{
        bgcolor: bg,
        py: { xs: 8, sm: 10, md: 12 },
        width: '100vw',
        minHeight: '100vh',
        fontFamily: '"Poppins", sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ maxWidth: '1600px', mx: 'auto', px: { xs: 3, sm: 4, md: 6 } }}>
        {title && (
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ 
              fontWeight: 800,
              background: 'linear-gradient(135deg, #4db8ff 0%, #66c4ff 50%, #4db8ff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 4px 20px rgba(77, 184, 255, 0.4)',
              marginBottom: { xs: '40px', sm: '48px', md: '56px' },
              fontSize: { xs: '2.25rem', sm: '2.75rem', md: '3.5rem' },
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '3px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(77, 184, 255, 0.5) 50%, transparent 100%)',
                borderRadius: '2px'
              }
            }}
          >
            {title}
          </Typography>
        )}
        {children}
      </Box>
    </Box>
  );
}

