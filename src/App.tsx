import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './styles/theme';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import NewRequest from './components/consultation/NewRequest';
import Chat from './components/consultation/Chat';
import Report from './components/consultation/Report';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/consultation/new" element={<NewRequest />} />
            <Route path="/consultation/chat/:sessionId" element={<Chat />} />
            <Route path="/consultation/report/:sessionId" element={<Report />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
