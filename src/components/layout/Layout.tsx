// src/components/layout/Layout.tsx
import React, { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Header } from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '../../pocketbase/services/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { loading } = useAuth();

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
      <Header />
      <Sidebar open={sidebarOpen} onClose={handleDrawerToggle} />
      <Box 
        component="main"
        sx={{ 
          flexGrow: 1,
          paddingTop: '72px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          marginLeft: sidebarOpen ? '280px' : 0,
          width: sidebarOpen ? 'calc(100% - 280px)' : '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >

        <Box sx={{ 
          width: '100%',
          px: { xs: 2, sm: 3, md: 4 }, 
          py: 4 
        }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            children
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;