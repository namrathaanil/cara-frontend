// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './styles/theme';
import { AuthProvider } from './pocketbase/services/AuthContext';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import ConsultationTypes from './components/consultation/ConsultationTypes';
import NewConsultation from './components/consultation/NewConsultation';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/consultation/new" element={<ConsultationTypes />} />
              <Route path="/consultation/create" element={<NewConsultation />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;