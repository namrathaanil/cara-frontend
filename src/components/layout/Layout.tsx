import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import { Header } from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
          transition: 'margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          marginLeft: sidebarOpen ? '280px' : 0,
          width: sidebarOpen ? 'calc(100% - 280px)' : '100%',
        }}
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;