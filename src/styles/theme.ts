import { createTheme } from '@mui/material/styles';

// Import fonts - Using Inter for body and Instrument Sans or similar for headers
declare module '@mui/material/styles' {
  interface TypographyVariants {
    label: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    label?: React.CSSProperties;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0A0A0A',
      light: '#2C2C2C',
      dark: '#000000',
    },
    secondary: {
      main: '#4A4A4A',
      light: '#6B6B6B',
      dark: '#2C2C2C',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0A0A0A',
      secondary: '#6B6B6B',
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    success: {
      main: '#0A0A0A',
      light: '#2C2C2C',
      dark: '#000000',
    },
    warning: {
      main: '#6B6B6B',
      light: '#9E9E9E',
      dark: '#424242',
    },
    error: {
      main: '#0A0A0A',
      light: '#424242',
      dark: '#000000',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  typography: {
    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 200,
      letterSpacing: '-0.03em',
      lineHeight: 1.1,
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    },
    h2: {
      fontSize: '2.75rem',
      fontWeight: 300,
      letterSpacing: '-0.025em',
      lineHeight: 1.2,
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: 400,
      letterSpacing: '-0.02em',
      lineHeight: 1.3,
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    },
    h4: {
      fontSize: '1.875rem',
      fontWeight: 500,
      letterSpacing: '-0.015em',
      lineHeight: 1.4,
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
      letterSpacing: '-0.01em',
      lineHeight: 1.5,
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      letterSpacing: '-0.005em',
      lineHeight: 1.6,
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      letterSpacing: '0.005em',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em',
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '0.02em',
      fontSize: '0.9375rem',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      letterSpacing: '0.03em',
      fontWeight: 400,
    },
    overline: {
      fontSize: '0.6875rem',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      lineHeight: 1.5,
    },
    label: {
      fontSize: '0.8125rem',
      fontWeight: 500,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.04)',
    '0px 2px 4px rgba(0, 0, 0, 0.04)',
    '0px 3px 6px rgba(0, 0, 0, 0.04)',
    '0px 4px 8px rgba(0, 0, 0, 0.04)',
    '0px 5px 10px rgba(0, 0, 0, 0.05)',
    '0px 6px 12px rgba(0, 0, 0, 0.05)',
    '0px 7px 14px rgba(0, 0, 0, 0.05)',
    '0px 8px 16px rgba(0, 0, 0, 0.06)',
    '0px 9px 18px rgba(0, 0, 0, 0.06)',
    '0px 10px 20px rgba(0, 0, 0, 0.06)',
    '0px 11px 22px rgba(0, 0, 0, 0.07)',
    '0px 12px 24px rgba(0, 0, 0, 0.07)',
    '0px 13px 26px rgba(0, 0, 0, 0.07)',
    '0px 14px 28px rgba(0, 0, 0, 0.08)',
    '0px 15px 30px rgba(0, 0, 0, 0.08)',
    '0px 16px 32px rgba(0, 0, 0, 0.08)',
    '0px 17px 34px rgba(0, 0, 0, 0.09)',
    '0px 18px 36px rgba(0, 0, 0, 0.09)',
    '0px 19px 38px rgba(0, 0, 0, 0.09)',
    '0px 20px 40px rgba(0, 0, 0, 0.10)',
    '0px 21px 42px rgba(0, 0, 0, 0.10)',
    '0px 22px 44px rgba(0, 0, 0, 0.10)',
    '0px 23px 46px rgba(0, 0, 0, 0.11)',
    '0px 24px 48px rgba(0, 0, 0, 0.11)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          '@import': 'url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap")',
          '*': {
            boxSizing: 'border-box',
          },
          'html, body': {
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          padding: '10px 20px',
          fontSize: '0.9375rem',
          fontWeight: 500,
          boxShadow: 'none',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          backgroundColor: '#0A0A0A',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#1A1A1A',
          },
        },
        outlined: {
          borderColor: 'rgba(0, 0, 0, 0.12)',
          color: '#0A0A0A',
          '&:hover': {
            borderColor: '#0A0A0A',
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          },
        },
        text: {
          color: '#6B6B6B',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.04)',
        },
        elevation1: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.04)',
        },
        elevation2: {
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.06)',
        },
        elevation3: {
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.04)',
          borderRadius: '8px',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '6px',
            transition: 'all 0.2s ease',
            fontSize: '0.9375rem',
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.12)',
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.24)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0A0A0A',
              borderWidth: '1px',
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: '0.9375rem',
            fontWeight: 400,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          fontWeight: 500,
          fontSize: '0.8125rem',
          height: '24px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
        },
        filled: {
          backgroundColor: 'rgba(0, 0, 0, 0.06)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
          },
        },
        outlined: {
          borderColor: 'rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: '8px',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: '8px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
          marginTop: '4px',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '0.9375rem',
          fontWeight: 400,
          padding: '8px 16px',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
  },
});