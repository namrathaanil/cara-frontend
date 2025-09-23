import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Add as AddIcon } from '@mui/icons-material';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      {/* Hero Section */}
      <Paper
        sx={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          color: 'white',
          p: 6,
          mb: 4,
          borderRadius: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to ComplianceAI
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
          Get expert advice on enterprise compliance and risk management with our AI-powered chatbot
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={() => navigate('/consultation/new')}
          sx={{
            bgcolor: 'white',
            color: 'primary.main',
            fontSize: '1.1rem',
            py: 1.5,
            px: 4,
            '&:hover': {
              bgcolor: 'grey.100',
            },
          }}
        >
          Start New Consultation
        </Button>
      </Paper>

      {/* Call to Action Card */}
      <Paper
        sx={{
          mt: 4,
          p: 4,
          background: '#0066CC',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Ready to start a new consultation?
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Our AI is here to help you navigate complex compliance and risk scenarios.
        </Typography>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/consultation/new')}
          sx={{
            borderColor: 'white',
            color: 'white',
            '&:hover': {
              borderColor: 'white',
              bgcolor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          Launch New Consultation
        </Button>
      </Paper>
    </Box>
  );
};

export default Home;