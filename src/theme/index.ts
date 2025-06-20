import { createTheme, Theme } from '@mui/material/styles';

// Define common styles that can be reused
const commonStyles = {
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: 3,
    },
    borderRadius: 2,
    borderTop: '4px solid #b851e8',
  },
  cardContent: {
    textAlign: "center",
    p: 3,
  },
  icon: {
    fontSize: "3.5rem",
    mb: 2,
    lineHeight: 1,
  },
  title: {
    fontWeight: 600,
    mb: 1,
  },
  description: {
    color: "text.secondary",
  },
  welcomePaper: {
    p: 4,
    background: "transparent",
    mb: 4,
    borderRadius: 2,
  },
  welcomeTitle: {
    fontWeight: 700,
    mb: 1,
  },
  welcomeSubtitle: {
    opacity: 0.9,
  },
  container: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  grid: {
    spacing: 3,
    justifyContent: "center",
    alignItems: "stretch",
  },
};

// Create the theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#b851e8',
      light: '#d17ef3',
      dark: '#8a3fb8',
    },
    secondary: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

export { commonStyles };
export default theme; 