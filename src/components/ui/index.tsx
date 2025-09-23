
import { styled } from '@mui/material/styles';
import { Box, Button as MuiButton, Card as MuiCard, TextField as MuiTextField, Paper as MuiPaper } from '@mui/material';

// Layout Components
// Layout Components
export const PageContainer = styled(Box)(({ theme }) => ({
    maxWidth: '1200px',
    margin: '0 auto',
    padding: theme.spacing(2, 4),
  animation: 'fadeIn 0.5s ease-in-out',
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(10px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
}));

export const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(5),
}));

export const FlexBox = styled(Box)<{ gap?: number; align?: string; justify?: string }>(({ gap = 2, align = 'stretch', justify = 'flex-start' }) => ({
  display: 'flex',
  gap: `${gap * 8}px`,
  alignItems: align,
  justifyContent: justify,
}));

export const GridBox = styled(Box)<{ columns?: number; gap?: number }>(({ columns = 3, gap = 3, theme }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  gap: theme.spacing(gap),
  '@media (max-width: 900px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@media (max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
}));

// Card Components
export const Card = styled(MuiCard)<{ selected?: boolean; clickable?: boolean }>(({ theme, selected, clickable }) => ({
  border: selected ? `2px solid ${theme.palette.primary.main}` : '1px solid transparent',
  borderRadius: theme.spacing(2),
  backgroundColor: selected ? 'rgba(26, 26, 26, 0.02)' : '#fff',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: clickable ? 'pointer' : 'default',
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, transparent 0%, rgba(26, 26, 26, 0.02) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': clickable ? {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
    '&::before': {
      opacity: 1,
    },
  } : {},
}));

export const GradientCard = styled(MuiPaper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
  color: 'white',
  padding: theme.spacing(8),
  borderRadius: theme.spacing(3),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
    animation: 'shimmer 10s ease-in-out infinite',
  },
  '@keyframes shimmer': {
    '0%, 100%': { transform: 'rotate(0deg)' },
    '50%': { transform: 'rotate(180deg)' },
  },
}));

export const CTACard = styled(MuiPaper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)',
  color: 'white',
  padding: theme.spacing(6),
  borderRadius: theme.spacing(2.5),
  textAlign: 'center',
  border: '1px solid rgba(255,255,255,0.1)',
  backdropFilter: 'blur(10px)',
}));

// Button Components
export const PrimaryButton = styled(MuiButton)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: 'white',
  padding: theme.spacing(1.75, 4),
  fontSize: '15px',
  fontWeight: 500,
  borderRadius: theme.spacing(1.25),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: theme.palette.primary.dark,
    transform: 'translateY(-1px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

export const SecondaryButton = styled(MuiButton)(({ theme }) => ({
  background: 'white',
  color: theme.palette.primary.main,
  padding: theme.spacing(1.75, 4),
  fontSize: '15px',
  fontWeight: 500,
  border: `1.5px solid ${theme.palette.grey[200]}`,
  borderRadius: theme.spacing(1.25),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: theme.palette.grey[50],
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-1px)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
  },
}));

export const GhostButton = styled(MuiButton)(({ theme }) => ({
  color: 'white',
  padding: theme.spacing(1.75, 4),
  fontSize: '15px',
  fontWeight: 500,
  border: '1.5px solid rgba(255,255,255,0.3)',
  borderRadius: theme.spacing(1.25),
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    borderColor: 'white',
    background: 'rgba(255,255,255,0.1)',
    transform: 'translateY(-1px)',
  },
}));

// Form Components
export const SearchField = styled(MuiTextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'white',
    borderRadius: theme.spacing(1.25),
    transition: 'all 0.3s ease',
    '& input': {
      padding: theme.spacing(2, 2, 2, 1),
      fontSize: '15px',
      fontWeight: 400,
      '&::placeholder': {
        color: theme.palette.text.secondary,
        opacity: 0.8,
      },
    },
    '& fieldset': {
      borderWidth: '1.5px',
    },
    '&:hover': {
      '& fieldset': {
        borderColor: theme.palette.grey[400],
      },
    },
    '&.Mui-focused': {
      boxShadow: '0 0 0 4px rgba(26, 26, 26, 0.04)',
    },
  },
}));

// File List Item
export const FileListItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2.5),
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
  border: '1px solid transparent',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'white',
    border: `1px solid ${theme.palette.grey[200]}`,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
}));

// Step Component
export const StepContent = styled(Box)({
  minHeight: '400px',
  animation: 'slideIn 0.3s ease-out',
  '@keyframes slideIn': {
    from: { opacity: 0, transform: 'translateX(20px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  },
});

// Icon Wrapper
export const IconWrapper = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: theme.spacing(1.25),
  background: theme.palette.grey[100],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  transition: 'all 0.3s ease',
  '& svg': {
    width: 20,
    height: 20,
  },
}));