import React from 'react';
import { Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, AutoAwesome } from '@mui/icons-material';
import { PageContainer, GradientCard, CTACard, SecondaryButton, GhostButton, Section } from '../ui';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Section>
        <GradientCard>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box
                sx={{
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '100px',
                  padding: '8px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <AutoAwesome sx={{ fontSize: 16 }} />
                <Typography variant="body2" sx={{ fontWeight: 500, letterSpacing: '0.02em' }}>
                  AI-Powered Compliance
                </Typography>
              </Box>
            </Box>
            
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 300,
                mb: 2,
                background: 'linear-gradient(to right, #ffffff 0%, #e0e0e0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome to CARA
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 5, 
                opacity: 0.9,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.8,
              }}
            >
              Get expert advice on enterprise compliance and risk management with our intelligent AI assistant
            </Typography>
            <SecondaryButton
              size="large"
              endIcon={<ArrowRight />}
              onClick={() => navigate('/consultation/new')}
              sx={{
                background: 'white',
                color: '#1a1a1a',
                '&:hover': {
                  background: '#f5f5f5',
                },
              }}
            >
              Start New Consultation
            </SecondaryButton>
          </Box>
        </GradientCard>
      </Section>

      <CTACard>
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{ fontWeight: 400 }}
        >
          Ready to ensure compliance?
        </Typography>
        <Typography 
          variant="body1"
          sx={{ mb: 4, opacity: 0.9, maxWidth: 500, mx: 'auto' }}
        >
          Our AI assistant helps you navigate complex regulations and compliance requirements with confidence
        </Typography>
        <GhostButton
          size="large"
          onClick={() => navigate('/consultation/new')}
          endIcon={<ArrowRight />}
        >
          Launch Consultation
        </GhostButton>
      </CTACard>
    </PageContainer>
  );
};

export default Home;