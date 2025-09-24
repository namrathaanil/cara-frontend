// src/components/layout/Header.tsx
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
        zIndex: 1200,
      }}
    >
      <Toolbar sx={{ minHeight: 72, px: 3 }}>
        {/* Logo and title */}
        <Box 
          display="flex" 
          alignItems="center" 
          sx={{ cursor: 'pointer' }} 
          onClick={() => navigate('/')}
        >
          <Box
            component="img"
            src="/reknew_logo.png"
            alt="CARA Logo"
            sx={{
              width: 32,
              height: 32,
              mr: 2,
              objectFit: 'contain',
            }}
          />
          <Typography
            variant="h6"
            sx={{ 
              color: '#1a1a1a', 
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            CARA
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
};