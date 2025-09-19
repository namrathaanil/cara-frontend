import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  InputAdornment,
  Chip,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent
} from '@mui/material';
import { 
  Search as SearchIcon,
  Home as HomeIcon,
  Add as AddIcon,
  History as HistoryIcon,
  Description as DocumentsIcon,
  Settings as SettingsIcon,
  Visibility as ViewIcon,
  NavigateBefore,
  NavigateNext,
  FileUpload as UploadIcon,
  Assessment as AssessmentIcon,
  Chat as ChatIcon
} from '@mui/icons-material';

// Home Page Component
const HomePage = () => (
  <Box>
    <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>
      Welcome to ComplianceAI
    </Typography>
    <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
      Your intelligent compliance assistant for regulatory guidance and risk assessment
    </Typography>
    
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
        <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 3 } }}>
          <CardContent>
            <AddIcon sx={{ fontSize: 40, color: '#1976d2', mb: 2 }} />
            <Typography variant="h6" gutterBottom>Start New Consultation</Typography>
            <Typography variant="body2" color="text.secondary">
              Begin a new compliance review or risk assessment
            </Typography>
          </CardContent>
        </Card>
      </Box>
      
      <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
        <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 3 } }}>
          <CardContent>
            <HistoryIcon sx={{ fontSize: 40, color: '#1976d2', mb: 2 }} />
            <Typography variant="h6" gutterBottom>View Past Consultations</Typography>
            <Typography variant="body2" color="text.secondary">
              Review and revisit previous compliance assessments
            </Typography>
          </CardContent>
        </Card>
      </Box>
      
      <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
        <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 3 } }}>
          <CardContent>
            <DocumentsIcon sx={{ fontSize: 40, color: '#1976d2', mb: 2 }} />
            <Typography variant="h6" gutterBottom>Document Library</Typography>
            <Typography variant="body2" color="text.secondary">
              Access compliance documents and templates
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
    
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#333', fontWeight: 500 }}>
        Recent Activity
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            • Data Privacy Compliance Review - Completed on 2024-01-15
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            • Risk Assessment for New Product Launch - Completed on 2023-12-20
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            • Employee Training on Security Protocols - Completed on 2023-11-05
          </Typography>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

// New Consultation Page Component
const NewConsultationPage = () => (
  <Box>
    <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>
      New Consultation
    </Typography>
    <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
      Start a new compliance consultation by selecting a consultation type
    </Typography>
    
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      <Box sx={{ flex: '1 1 400px', minWidth: '400px' }}>
        <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 3 } }}>
          <CardContent sx={{ p: 4 }}>
            <AssessmentIcon sx={{ fontSize: 48, color: '#1976d2', mb: 2 }} />
            <Typography variant="h5" gutterBottom>Risk Assessment</Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Evaluate potential compliance risks for your products, services, or processes
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Start Risk Assessment
            </Button>
          </CardContent>
        </Card>
      </Box>
      
      <Box sx={{ flex: '1 1 400px', minWidth: '400px' }}>
        <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 3 } }}>
          <CardContent sx={{ p: 4 }}>
            <ChatIcon sx={{ fontSize: 48, color: '#1976d2', mb: 2 }} />
            <Typography variant="h5" gutterBottom>Compliance Review</Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Get guidance on specific compliance questions or regulatory requirements
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Start Compliance Review
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
    
    <Box sx={{ mt: 6, p: 4, bgcolor: '#f5f5f5', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>Quick Start</Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Not sure where to begin? Upload your documents and let our AI assistant guide you through the process.
      </Typography>
      <Button variant="outlined" startIcon={<UploadIcon />}>
        Upload Documents
      </Button>
    </Box>
  </Box>
);

// Past Consultations Page Component
const PastConsultationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const consultations = [
    { id: '1', date: '2024-01-15', title: 'Data Privacy Compliance Review', status: 'Completed' },
    { id: '2', date: '2023-12-20', title: 'Risk Assessment for New Product Launch', status: 'Completed' },
    { id: '3', date: '2023-11-05', title: 'Employee Training on Security Protocols', status: 'Completed' },
    { id: '4', date: '2023-10-12', title: 'Audit Preparation for Regulatory Compliance', status: 'Completed' },
    { id: '5', date: '2023-09-28', title: 'Review of Third-Party Vendor Contracts', status: 'Completed' }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>
        Past Consultations
      </Typography>
      <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
        Review and revisit advice from previous consultations
      </Typography>
      
      <TextField
        fullWidth
        placeholder="Search consultations by title or keyword..."
        variant="outlined"
        sx={{ mb: 4, bgcolor: 'white' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#999' }} />
            </InputAdornment>
          ),
        }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: '#666', textTransform: 'uppercase', fontSize: '0.875rem' }}>
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#666', textTransform: 'uppercase', fontSize: '0.875rem' }}>
                Consultation Title
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#666', textTransform: 'uppercase', fontSize: '0.875rem' }}>
                Status
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consultations.map((consultation) => (
              <TableRow key={consultation.id} sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}>
                <TableCell sx={{ color: '#666' }}>{consultation.date}</TableCell>
                <TableCell>{consultation.title}</TableCell>
                <TableCell>
                  <Chip 
                    label={consultation.status} 
                    size="small" 
                    sx={{ 
                      bgcolor: '#e8f5e9', 
                      color: '#2e7d32',
                      fontWeight: 500
                    }} 
                  />
                </TableCell>
                <TableCell align="right">
                  <Button 
                    variant="text" 
                    size="small" 
                    sx={{ color: '#1976d2', textTransform: 'none' }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Showing 1 to 5 of 20 results
        </Typography>
        <Box>
          <Button disabled size="small" sx={{ mr: 2 }}>Previous</Button>
          <Button size="small">Next</Button>
        </Box>
      </Box>
    </Box>
  );
};

// Documents Page Component
const DocumentsPage = () => (
  <Box>
    <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>
      Documents
    </Typography>
    <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
      Access compliance documents, templates, and regulatory guidelines
    </Typography>
    
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Regulatory Guidelines</Typography>
            <List>
              <ListItem>
                <ListItemIcon><DocumentsIcon /></ListItemIcon>
                <ListItemText 
                  primary="GDPR Compliance Checklist" 
                  secondary="Last updated: 2024-01-10"
                />
                <Button size="small">Download</Button>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon><DocumentsIcon /></ListItemIcon>
                <ListItemText 
                  primary="SOC 2 Audit Preparation Guide" 
                  secondary="Last updated: 2023-12-15"
                />
                <Button size="small">Download</Button>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon><DocumentsIcon /></ListItemIcon>
                <ListItemText 
                  primary="ISO 27001 Implementation Template" 
                  secondary="Last updated: 2023-11-20"
                />
                <Button size="small">Download</Button>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Box>
      
      <Box>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Compliance Templates</Typography>
            <List>
              <ListItem>
                <ListItemIcon><DocumentsIcon /></ListItemIcon>
                <ListItemText 
                  primary="Risk Assessment Template" 
                  secondary="Excel format - Version 2.0"
                />
                <Button size="small">Download</Button>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon><DocumentsIcon /></ListItemIcon>
                <ListItemText 
                  primary="Data Processing Agreement Template" 
                  secondary="Word format - Version 1.5"
                />
                <Button size="small">Download</Button>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
    
    <Box sx={{ mt: 4 }}>
      <Button variant="contained" startIcon={<UploadIcon />}>
        Upload New Document
      </Button>
    </Box>
  </Box>
);

// Settings Page Component
const SettingsPage = () => (
  <Box>
    <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>
      Settings
    </Typography>
    <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
      Manage your account and application preferences
    </Typography>
    
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Account Settings</Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Email: user@company.com
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Role: Compliance Manager
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Organization: Enterprise Corp
              </Typography>
            </Box>
            <Button variant="outlined" sx={{ mt: 3 }}>Edit Profile</Button>
          </CardContent>
        </Card>
      </Box>
      
      <Box>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Notification Preferences</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Configure how you receive updates about consultations and compliance alerts
            </Typography>
            <Button variant="outlined">Manage Notifications</Button>
          </CardContent>
        </Card>
      </Box>
      
      <Box>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>API Access</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Manage API keys for integrating ComplianceAI with your systems
            </Typography>
            <Button variant="outlined">View API Keys</Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  </Box>
);

// Main App Component
export default function ComplianceAIApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const drawerWidth = 280;

  const menuItems = [
    { id: 'home', text: 'Home', icon: <HomeIcon /> },
    { id: 'new-consultation', text: 'New Consultation', icon: <AddIcon /> },
    { id: 'past-consultations', text: 'Past Consultations', icon: <HistoryIcon /> },
    { id: 'documents', text: 'Documents', icon: <DocumentsIcon /> },
  ];

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage />;
      case 'new-consultation':
        return <NewConsultationPage />;
      case 'past-consultations':
        return <PastConsultationsPage />;
      case 'documents':
        return <DocumentsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f5f7fa', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'white',
            borderRight: 'none',
            boxShadow: '2px 0 5px rgba(0,0,0,0.05)'
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#333' }}>
            ComplianceAI
          </Typography>
          <Typography variant="caption" sx={{ color: '#666' }}>
            Enterprise Edition
          </Typography>
        </Box>
        
        <List sx={{ px: 2 }}>
          {menuItems.map((item) => (
            <ListItem
              component="button"
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              sx={{
                borderRadius: '8px',
                mb: 1,
                bgcolor: currentPage === item.id ? '#e3f2fd' : 'transparent',
                '&:hover': {
                  bgcolor: currentPage === item.id ? '#e3f2fd' : '#f5f5f5',
                },
                border: 'none',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
              }}
            >
              <ListItemIcon sx={{ color: currentPage === item.id ? '#1976d2' : '#666' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  '& .MuiListItemText-primary': { 
                    fontWeight: currentPage === item.id ? 600 : 400,
                    color: currentPage === item.id ? '#1976d2' : '#333'
                  } 
                }}
              />
            </ListItem>
          ))}
        </List>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Divider />
        
        <List sx={{ px: 2, pb: 2 }}>
          <ListItem
            component="button"
            onClick={() => setCurrentPage('settings')}
            sx={{
              borderRadius: '8px',
              bgcolor: currentPage === 'settings' ? '#e3f2fd' : 'transparent',
              '&:hover': {
                bgcolor: currentPage === 'settings' ? '#e3f2fd' : '#f5f5f5',
              },
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
            }}
          >
            <ListItemIcon sx={{ color: currentPage === 'settings' ? '#1976d2' : '#666' }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Settings" 
              sx={{ 
                '& .MuiListItemText-primary': { 
                  fontWeight: currentPage === 'settings' ? 600 : 400,
                  color: currentPage === 'settings' ? '#1976d2' : '#333'
                } 
              }}
            />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          bgcolor: '#f5f7fa',
          p: 4,
          ml: `${drawerWidth}px`
        }}
      >
        {renderPage()}
      </Box>
    </Box>
  );
}