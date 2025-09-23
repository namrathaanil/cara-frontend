import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Box,
  Typography,
  Collapse,
  IconButton,
} from '@mui/material';
import {
  Dashboard,
  Policy,
  Assessment,
  Gavel,
  Security,
  BusinessCenter,
  Settings,
  Help,
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  Timeline,
  Group,
  Folder,
  NotificationsNone,
  AccountTree,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  minHeight: '72px !important',
}));

const SidebarSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 0),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  fontSize: '0.75rem',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
}));

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  width?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose, width = 280 }) => {
  const [complianceOpen, setComplianceOpen] = React.useState(true);
  const [toolsOpen, setToolsOpen] = React.useState(false);

  const mainMenuItems = [
    { icon: <Dashboard />, label: 'Dashboard', badge: null },
    { icon: <Timeline />, label: 'Analytics', badge: '3' },
    { icon: <Folder />, label: 'Documents', badge: null },
    { icon: <Group />, label: 'Team', badge: null },
  ];

  const complianceItems = [
    { icon: <Policy />, label: 'Policies', badge: '12' },
    { icon: <Gavel />, label: 'Regulations', badge: null },
    { icon: <Security />, label: 'Risk Assessment', badge: '!' },
    { icon: <Assessment />, label: 'Audit Reports', badge: null },
    { icon: <BusinessCenter />, label: 'Compliance Hub', badge: null },
  ];

  const toolsItems = [
    { icon: <AccountTree />, label: 'Workflow Builder', badge: null },
    { icon: <NotificationsNone />, label: 'Alerts Config', badge: '5' },
  ];

  const bottomItems = [
    { icon: <Help />, label: 'Help Center', badge: null },
    { icon: <Settings />, label: 'Settings', badge: null },
  ];

  return (
    <Drawer
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
          background: '#FAFAFA',
          borderRight: '1px solid rgba(0,0,0,0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
          <ChevronLeft />
        </IconButton>
      </DrawerHeader>
      
      <Divider sx={{ opacity: 0.5 }} />
      
      <Box sx={{ overflow: 'auto', flex: 1 }}>
        <SidebarSection>
          <SectionTitle>Main</SectionTitle>
          <List>
            {mainMenuItems.map((item) => (
              <ListItem key={item.label} disablePadding sx={{ px: 1 }}>
                <ListItemButton
                  sx={{
                    borderRadius: 1.5,
                    mx: 0.5,
                    '&:hover': {
                      backgroundColor: 'rgba(26, 26, 26, 0.04)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label} 
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                      fontWeight: 450,
                    }}
                  />
                  {item.badge && (
                    <Box
                      sx={{
                        backgroundColor: item.badge === '!' ? 'error.main' : 'primary.main',
                        color: 'white',
                        borderRadius: '12px',
                        px: 1,
                        py: 0.25,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        minWidth: 24,
                        textAlign: 'center',
                      }}
                    >
                      {item.badge}
                    </Box>
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </SidebarSection>

        <Divider sx={{ mx: 2, opacity: 0.3 }} />

        <SidebarSection>
          <ListItemButton
            onClick={() => setComplianceOpen(!complianceOpen)}
            sx={{ px: 2 }}
          >
            <ListItemText 
              primary={
                <SectionTitle sx={{ p: 0 }}>Compliance</SectionTitle>
              }
            />
            {complianceOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={complianceOpen} timeout="auto" unmountOnExit>
            <List>
              {complianceItems.map((item) => (
                <ListItem key={item.label} disablePadding sx={{ px: 1 }}>
                  <ListItemButton
                    sx={{
                      borderRadius: 1.5,
                      mx: 0.5,
                      pl: 3,
                      '&:hover': {
                        backgroundColor: 'rgba(26, 26, 26, 0.04)',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: '0.9rem',
                        fontWeight: 450,
                      }}
                    />
                    {item.badge && (
                      <Box
                        sx={{
                          backgroundColor: item.badge === '!' ? 'error.main' : 'primary.main',
                          color: 'white',
                          borderRadius: '12px',
                          px: 1,
                          py: 0.25,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          minWidth: 24,
                          textAlign: 'center',
                        }}
                      >
                        {item.badge}
                      </Box>
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </SidebarSection>

        <Divider sx={{ mx: 2, opacity: 0.3 }} />

        <SidebarSection>
          <ListItemButton
            onClick={() => setToolsOpen(!toolsOpen)}
            sx={{ px: 2 }}
          >
            <ListItemText 
              primary={
                <SectionTitle sx={{ p: 0 }}>Tools</SectionTitle>
              }
            />
            {toolsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={toolsOpen} timeout="auto" unmountOnExit>
            <List>
              {toolsItems.map((item) => (
                <ListItem key={item.label} disablePadding sx={{ px: 1 }}>
                  <ListItemButton
                    sx={{
                      borderRadius: 1.5,
                      mx: 0.5,
                      pl: 3,
                      '&:hover': {
                        backgroundColor: 'rgba(26, 26, 26, 0.04)',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: '0.9rem',
                        fontWeight: 450,
                      }}
                    />
                    {item.badge && (
                      <Box
                        sx={{
                          backgroundColor: 'primary.main',
                          color: 'white',
                          borderRadius: '12px',
                          px: 1,
                          py: 0.25,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          minWidth: 24,
                          textAlign: 'center',
                        }}
                      >
                        {item.badge}
                      </Box>
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </SidebarSection>
      </Box>

      <Divider sx={{ opacity: 0.5 }} />
      
      <SidebarSection>
        <List>
          {bottomItems.map((item) => (
            <ListItem key={item.label} disablePadding sx={{ px: 1 }}>
              <ListItemButton
                sx={{
                  borderRadius: 1.5,
                  mx: 0.5,
                  '&:hover': {
                    backgroundColor: 'rgba(26, 26, 26, 0.04)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: 450,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </SidebarSection>
    </Drawer>
  );
};

export default Sidebar;