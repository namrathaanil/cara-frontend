import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Home as HomeIcon, Notifications, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ background: '#FFFFFF', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <Typography
            variant="h5"
            component="div"
            sx={{ 
              color: '#0066CC', 
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            🔷 Compliance AI
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="primary">
          <HomeIcon />
        </IconButton>
        <IconButton color="primary">
          <Notifications />
        </IconButton>
        <IconButton color="primary">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
