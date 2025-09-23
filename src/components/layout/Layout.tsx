// src/components/layout/Layout.tsx
import React, { useState } from 'react';
import { Container, Box, Chip, CircularProgress, Alert } from '@mui/material';
import { Person, CheckCircle, Error } from '@mui/icons-material';
import { Header } from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '../../pocketbase/services/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, loading, error, isAuthenticated } = useAuth();

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
        {/* Auth Status Bar */}
        <Box 
          sx={{ 
            px: 4, 
            py: 2, 
            backgroundColor: 'white', 
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={20} />
              <span>Authenticating...</span>
            </>
          ) : error ? (
            <Alert severity="error" sx={{ flex: 1 }}>
              {error}
            </Alert>
          ) : isAuthenticated && user ? (
            <>
              <Chip
                icon={<CheckCircle />}
                label={`Logged in as: ${user.email}`}
                color="success"
                variant="outlined"
                size="small"
              />
              <Chip
                icon={<Person />}
                label={`User ID: ${user.id.substring(0, 8)}...`}
                variant="outlined"
                size="small"
              />
            </>
          ) : (
            <Chip
              icon={<Error />}
              label="Not authenticated"
              color="error"
              variant="outlined"
              size="small"
            />
          )}
        </Box>

        <Container maxWidth="lg" sx={{ py: 4 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            children
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;