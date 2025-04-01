import React from 'react';
import './App.css';
import { Container } from '@mui/material';
import HomePage from './components/Home/HomePage';
import Toolbar from './components/Home/Toolbar';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Footer from './components/Home/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      <Toolbar />
      <div className="header">
        <Container>
          <Routes>
            <Route 
              path="/" 
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <HomePage />} 
            />
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} 
            />
          </Routes>
          <Footer />
        </Container>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
