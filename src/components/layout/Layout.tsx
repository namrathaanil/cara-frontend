// src/components/layout/Layout.tsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  IconButton, 
  AppBar, 
  Toolbar, 
  Typography, 
  Drawer, 
  List, 
  ListItemIcon, 
  ListItemText, 
  ListItemButton, 
  useTheme,
  useMediaQuery,
  Tooltip
} from '@mui/material';
import {  
  Close, 
  Hub, 
  School, 
  Notifications, 
  ChevronRight,
  ChevronLeft,
  AccountCircle
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../pocketbase/services/AuthContext';
import { styled } from '@mui/material/styles';

interface LayoutProps {
  children: React.ReactNode;
}

const DRAWER_WIDTH = 280;
const DRAWER_WIDTH_COLLAPSED = 72;

// Styled components for better control
const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'collapsed',
})<{
  open?: boolean;
  collapsed?: boolean;
}>(({ theme, open, collapsed }) => ({
  flexGrow: 1,
  padding: 0,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    marginLeft: collapsed ? DRAWER_WIDTH_COLLAPSED : (open ? DRAWER_WIDTH : 0),
    width: collapsed ? `calc(100% - ${DRAWER_WIDTH_COLLAPSED}px)` : (open ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%'),
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'collapsed',
})<{ collapsed?: boolean }>(({ theme, collapsed }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    overflowX: 'hidden',
    backgroundColor: '#FAFAFA',
    borderRight: '1px solid #E5E7EB',
    [theme.breakpoints.up('md')]: {
      position: 'fixed',
      top: 72,
      height: 'calc(100vh - 72px)',
    },
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2, 2, 3),
  borderBottom: '1px solid #E5E7EB',
  minHeight: 64,
}));

const NavigationItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'collapsed',
})<{ active?: boolean; collapsed?: boolean }>(({ theme, active, collapsed }) => ({
  borderRadius: '12px',
  marginBottom: theme.spacing(0.5),
  marginLeft: collapsed ? theme.spacing(1) : theme.spacing(2),
  marginRight: collapsed ? theme.spacing(1) : theme.spacing(2),
  padding: collapsed ? theme.spacing(1.5) : theme.spacing(1.5, 2),
  backgroundColor: active ? '#0A0A0A' : 'transparent',
  color: active ? 'white' : '#0A0A0A',
  justifyContent: collapsed ? 'center' : 'flex-start',
  '&:hover': {
    backgroundColor: active ? '#0A0A0A' : '#F3F4F6',
  },
  transition: theme.transitions.create(['background-color', 'padding'], {
    duration: theme.transitions.duration.shorter,
  }),
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  
  // State management
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  // Persist sidebar state in localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarOpen');
    const savedCollapsed = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setDesktopOpen(savedState === 'true');
    }
    if (savedCollapsed !== null) {
      setCollapsed(savedCollapsed === 'true');
    }
  }, []);

  const menuItems = [
    { text: 'Consultation Hub', icon: <Hub />, path: '/consultation' },
    { text: 'Knowledge Base', icon: <School />, path: '/knowledge-base' },
    { text: 'Monitor & Alerts', icon: <Notifications />, path: '/monitor-alerts' },
  ];



  const handleCollapseToggle = () => {
    if (desktopOpen) {
      const newCollapsed = !collapsed;
      setCollapsed(newCollapsed);
      localStorage.setItem('sidebarCollapsed', String(newCollapsed));
    }
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Drawer Header - Only show on desktop when not collapsed */}
      {isDesktop && !collapsed && (
        <DrawerHeader>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0A0A0A' }}>
            Menu
          </Typography>
          <IconButton 
            onClick={handleCollapseToggle}
            size="small"
            sx={{ 
              color: '#6B7280',
              '&:hover': { backgroundColor: '#E5E7EB' }
            }}
          >
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
      )}

      {/* Collapse button when collapsed */}
      {isDesktop && collapsed && (
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
          <IconButton 
            onClick={handleCollapseToggle}
            size="small"
            sx={{ 
              color: '#6B7280',
              '&:hover': { backgroundColor: '#E5E7EB' }
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      )}

      {/* Mobile header */}
      {isMobile && (
        <DrawerHeader>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0A0A0A' }}>
            Menu
          </Typography>
          <IconButton onClick={() => setMobileOpen(false)}>
            <Close />
          </IconButton>
        </DrawerHeader>
      )}

      {/* Navigation Items */}
      <List sx={{ px: 0, py: 2, flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const navItem = (
            <NavigationItem
              key={item.text}
              active={isActive}
              collapsed={collapsed && isDesktop}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: collapsed && isDesktop ? 0 : 40,
                color: isActive ? 'white' : '#6B7280',
                justifyContent: 'center',
              }}>
                {item.icon}
              </ListItemIcon>
              {(!collapsed || !isDesktop) && (
                <>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      fontSize: '15px', 
                      fontWeight: isActive ? 600 : 500 
                    }}
                  />
                  {isActive && <ChevronRight sx={{ fontSize: 20 }} />}
                </>
              )}
            </NavigationItem>
          );

          return collapsed && isDesktop ? (
            <Tooltip key={item.text} title={item.text} placement="right" arrow>
              {navItem}
            </Tooltip>
          ) : navItem;
        })}
      </List>
      
      {/* User info footer */}
      {isAuthenticated && user && (
        <Box sx={{ 
          p: collapsed && isDesktop ? 1 : 3,
          borderTop: '1px solid #E5E7EB',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}>
          {collapsed && isDesktop ? (
            <Tooltip title={user.email} placement="right" arrow>
              <IconButton size="small">
                <AccountCircle />
              </IconButton>
            </Tooltip>
          ) : (
            <>
              <AccountCircle sx={{ color: '#6B7280', fontSize: 32 }} />
              <Box sx={{ overflow: 'hidden' }}>
                <Typography 
                  variant="caption" 
                  sx={{ color: '#6B7280', display: 'block', mb: 0.5 }}
                >
                  Logged in as
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 600, 
                    color: '#0A0A0A',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {user.email}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      {/* App Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ height: 72, px: { xs: 2, sm: 3 } }}>
        <Box
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              cursor: 'pointer' 
            }}
            onClick={() => navigate('/')}
          >
            <Box
              component="img"
              src="/reknew_logo.png"
              alt="CARA"
              sx={{ width: 32, height: 32 }}
            />
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#0A0A0A', 
                fontWeight: 700, 
                letterSpacing: '-0.02em' 
              }}
            >
              CARA
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Desktop Drawer */}
      {isDesktop && (
        <StyledDrawer
          variant="persistent"
          open={desktopOpen}
          collapsed={collapsed}
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          {drawerContent}
        </StyledDrawer>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              width: DRAWER_WIDTH,
              backgroundColor: '#FAFAFA',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Main content area */}
      <Main 
        open={isDesktop ? desktopOpen : false} 
        collapsed={collapsed && desktopOpen}
      >
        <Toolbar sx={{ height: 72 }} />
        <Box sx={{ 
          width: '100%',
          height: 'calc(100vh - 72px)',
          overflow: 'auto',
          backgroundColor: '#FFFFFF',
        }}>
          {children}
        </Box>
      </Main>
    </Box>
  );
};

export default Layout;