// src/components/layout/Layout.tsx
import React, { useState } from 'react';
import { Box, IconButton, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Divider } from '@mui/material';
import { Menu as MenuIcon, Close, Hub, School, Notifications, ChevronRight } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../pocketbase/services/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const DRAWER_WIDTH = 280;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  const menuItems = [
    { text: 'Consultation Hub', icon: <Hub />, path: '/consultation' },
    { text: 'Knowledge Base', icon: <School />, path: '/knowledge-base' },
    { text: 'Monitor & Alerts', icon: <Notifications />, path: '/monitor-alerts' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: '100%', backgroundColor: '#FAFAFA' }}>
      <Box sx={{ p: 3, borderBottom: '1px solid #E5E7EB' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#0A0A0A' }}>
          Menu
        </Typography>
      </Box>
      <List sx={{ px: 2, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              sx={{
                borderRadius: '12px',
                py: 1.5,
                px: 2,
                backgroundColor: location.pathname === item.path ? '#0A0A0A' : 'transparent',
                color: location.pathname === item.path ? 'white' : '#0A0A0A',
                '&:hover': {
                  backgroundColor: location.pathname === item.path ? '#0A0A0A' : '#F3F4F6',
                },
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: 40, 
                color: location.pathname === item.path ? 'white' : '#6B7280' 
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontSize: '15px', 
                  fontWeight: location.pathname === item.path ? 600 : 500 
                }}
              />
              {location.pathname === item.path && (
                <ChevronRight sx={{ fontSize: 20 }} />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      {isAuthenticated && user && (
        <Box sx={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          p: 3, 
          borderTop: '1px solid #E5E7EB',
          backgroundColor: 'white'
        }}>
          <Typography variant="caption" sx={{ color: '#6B7280', display: 'block', mb: 0.5 }}>
            Logged in as
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#0A0A0A' }}>
            {user.email}
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      {/* App Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ height: 72, px: { xs: 2, sm: 3 } }}>
          <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2,
              display: { lg: 'none' },
              color: '#0A0A0A',
              '&:hover': {
                backgroundColor: '#F3F4F6',
              }
            }}
          >
            {mobileOpen ? <Close /> : <MenuIcon />}
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              component="img"
              src="/reknew_logo.png"
              alt="CARA"
              sx={{ width: 32, height: 32 }}
            />
            <Typography variant="h6" sx={{ color: '#0A0A0A', fontWeight: 700, letterSpacing: '-0.02em' }}>
              CARA
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for desktop */}
      <Box
        component="nav"
        sx={{ 
          width: { lg: DRAWER_WIDTH }, 
          flexShrink: { lg: 0 },
          display: { xs: 'none', lg: 'block' }
        }}
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
              border: 'none',
              backgroundColor: '#FAFAFA',
              borderRight: '1px solid #E5E7EB',
              marginTop: '72px',
              height: 'calc(100% - 72px)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Drawer for mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: DRAWER_WIDTH,
            backgroundColor: '#FAFAFA',
          },
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid #E5E7EB'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Menu</Typography>
          <IconButton onClick={handleDrawerToggle}>
            <Close />
          </IconButton>
        </Box>
        {drawer}
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: '100%', lg: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          backgroundColor: '#FFFFFF',
          marginTop: '72px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
