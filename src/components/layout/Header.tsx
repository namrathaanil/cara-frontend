import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: 'rgba(255,255,255,0.95)', 
        backdropFilter: 'blur(10px)',
        boxShadow: '0 1px 0 rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      <Toolbar sx={{ minHeight: 72 }}>
        <Box 
          display="flex" 
          alignItems="center" 
          sx={{ cursor: 'pointer' }} 
          onClick={() => navigate('/')}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #404040 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
              color: 'white',
              fontSize: '18px',
              fontWeight: 700,
            }}
          >
            C
          </Box>
          <Typography
            variant="h6"
            sx={{ 
              color: '#1a1a1a', 
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            ComplianceAI
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
};