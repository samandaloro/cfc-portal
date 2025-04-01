import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#9B59FF',
        light: '#9CDEFF',
        dark: '#7E42E6',
      },
      secondary: {
        main: '#8EE5F0',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#7E42E6',
            },
          },
        },
      },
    },
  });
  

export default theme;
