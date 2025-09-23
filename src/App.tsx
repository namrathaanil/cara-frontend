import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './styles/theme';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import NewConsultation from './components/consultation/NewConsultation';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/consultation/new" element={<NewConsultation />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;