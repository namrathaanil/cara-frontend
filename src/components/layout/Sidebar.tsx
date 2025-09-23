import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Typography,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Hub,
  School,
  Notifications,
  ChevronLeft,
  Menu,
  CheckCircle,
  Error,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pocketbase/services/AuthContext';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 3),
  minHeight: '72px',
  borderBottom: '1px solid rgba(0,0,0,0.08)',
}));

const MenuItem = styled(ListItemButton)(({ theme }) => ({
  margin: theme.spacing(0.5, 2),
  borderRadius: '12px',
  minHeight: '48px',
  '&:hover': {
    backgroundColor: 'rgba(255, 152, 0, 0.08)',
  },
  '&.active': {
    backgroundColor: '#fff3e0',
    color: '#e65100',
    border: '2px solid #ff9800',
    '& .MuiListItemIcon-root': {
      color: '#e65100',
    },
  },
}));

const MenuIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: '40px',
  color: '#666',
  '&.active': {
    color: '#e65100',
  },
}));

const MenuText = styled(ListItemText)(({ theme }) => ({
  '& .MuiListItemText-primary': {
    fontSize: '0.95rem',
    fontWeight: 500,
    letterSpacing: '-0.01em',
  },
}));

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  width?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose, width = 280 }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = React.useState('consultation-hub');
  const { user, loading, error, isAuthenticated } = useAuth();

  const menuItems = [
           { 
             icon: <Hub />, 
             label: 'Consultation Hub', 
             value: 'consultation-hub',
             path: '/consultation'
           },
    { 
      icon: <School />, 
      label: 'Knowledge Base', 
      value: 'knowledge-base',
      path: '/knowledge-base'
    },
    { 
      icon: <Notifications />, 
      label: 'Monitor & Alerts', 
      value: 'monitor-alerts',
      path: '/monitor-alerts'
    },
  ];

  const handleItemClick = (item: any) => {
    setActiveItem(item.value);
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'fixed',
          top: '88px',
          left: open ? '296px' : '16px',
          zIndex: 1300,
          backgroundColor: '#1a1a1a',
          color: 'white',
          width: '40px',
          height: '40px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            backgroundColor: '#333',
            transform: 'scale(1.05)',
          },
        }}
      >
        {open ? <ChevronLeft /> : <Menu />}
      </IconButton>

      <Drawer
        sx={{
          width: width,
          flexShrink: 0,
          zIndex: 1100,
          '& .MuiDrawer-paper': {
            width: width,
            boxSizing: 'border-box',
            background: '#ffffff',
            borderRight: '1px solid rgba(0,0,0,0.08)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            top: '72px',
            height: 'calc(100vh - 72px)',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
      <DrawerHeader>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
          Menu
        </Typography>
      </DrawerHeader>
      
      <Box sx={{ flex: 1, py: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.value} disablePadding>
              <MenuItem
                className={activeItem === item.value ? 'active' : ''}
                onClick={() => handleItemClick(item)}
              >
                <MenuIcon className={activeItem === item.value ? 'active' : ''}>
                  {item.icon}
                </MenuIcon>
                <MenuText primary={item.label} />
              </MenuItem>
            </ListItem>
          ))}
        </List>
      </Box>
      
      {/* Auth Status Section */}
      <Box sx={{ 
        borderTop: '1px solid rgba(0,0,0,0.08)',
        p: 2,
        backgroundColor: '#f8f9fa'
      }}>
        {(() => {
          if (loading) {
            return (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={16} />
                <Typography variant="caption" color="text.secondary">
                  Authenticating...
                </Typography>
              </Box>
            );
          }
          
          if (error) {
            return (
              <Alert severity="error" sx={{ fontSize: '0.75rem', py: 0.5 }}>
                {error}
              </Alert>
            );
          }
          
          if (isAuthenticated && user) {
            return (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Chip
                  icon={<CheckCircle />}
                  label={`${user.email}`}
                  color="success"
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: '0.75rem' }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                  ID: {user.id.substring(0, 8)}...
                </Typography>
              </Box>
            );
          }
          
          return (
            <Chip
              icon={<Error />}
              label="Not authenticated"
              color="error"
              variant="outlined"
              size="small"
              sx={{ fontSize: '0.75rem' }}
            />
          );
        })()}
      </Box>
    </Drawer>
    </>
  );
};

export default Sidebar;