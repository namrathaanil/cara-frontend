import React from 'react';
import { Container, Box } from '@mui/material';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
      <Header />
      <Box sx={{ paddingTop: '72px' }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;