// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './styles/theme';
import { AuthProvider } from './pocketbase/services/AuthContext';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import ConsultationHub from './components/consultation/ConsultationHub';
import ConsultationChat from './components/consultation/ConsultationChat';
import ConsultationReport from './components/consultation/ConsultationReport';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Layout>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/consultation" element={<ConsultationHub />} />
              <Route path="/consultation/:id/chat" element={<ConsultationChat />} />
              <Route path="/consultation/:id/report" element={<ConsultationReport />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;