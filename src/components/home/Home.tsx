import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from '@mui/icons-material';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '60vh',
      textAlign: 'center',
      px: 4
    }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        Welcome to CARA
      </Typography>
      <Typography variant="h6" sx={{ color: '#666', mb: 4, maxWidth: 600 }}>
        Get expert advice on enterprise compliance and risk management with our intelligent AI assistant
      </Typography>
      <Button 
        variant="contained" 
        size="large"
        endIcon={<ArrowRight />}
        onClick={() => navigate('/consultation')}
        sx={{ px: 4, py: 1.5 }}
      >
        Start New Consultation
      </Button>
    </Box>
  );
};

export default Home;
