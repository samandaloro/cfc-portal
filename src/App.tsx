import React from 'react';
import './App.css';
import { Container } from '@mui/material';
import HomePage from './components/Home/HomePage';
import Toolbar from './components/Home/Toolbar';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Footer from './components/Home/Footer';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Toolbar />

        <div className="header">

        <Container>
          <HomePage />
          {/* <Dashboard /> */}
          <Footer />
        </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
