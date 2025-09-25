import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add,
  Search,
  MoreVert,
  Visibility,
  Edit,
  Delete,
  Assessment,
  FiberManualRecord,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { consultationService } from '../../pocketbase/services/pocketbase';
import { useAuth } from '../../pocketbase/services/AuthContext';
import { Consultation } from '../../pocketbase/types/consultation.types';
import ConsultationWizard from './ConsultationWizard';

// Updated Custom Components for Better Responsiveness
const PageWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: 'calc(100vh - 72px)',
  padding: theme.spacing(5),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1600px',
  margin: '0 auto',
  width: '100%',
}));

const Header = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(3),
      flexDirection: 'column',
      gap: theme.spacing(2),
    },
  }));
  
  const ActionButton = styled(Box)(({ theme }) => ({
    padding: '14px 28px',
    backgroundColor: '#0A0A0A',
    color: 'white',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'all 0.2s ease',
    userSelect: 'none',
    '&:hover': {
      backgroundColor: '#1F2937',
      transform: 'translateY(-1px)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '12px 20px',
      fontSize: '14px',
    },
  }));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '48px',
  fontWeight: 800,
  color: '#0A0A0A',
  marginBottom: '12px',
  letterSpacing: '-0.03em',
  lineHeight: 1.1,
  [theme.breakpoints.down('md')]: {
    fontSize: '36px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '28px',
  },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: '#6B7280',
  fontWeight: 400,
  lineHeight: 1.5,
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
  },
}));

const SummaryBar = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2, 0),
    borderBottom: '1px solid #E5E7EB',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      gap: theme.spacing(2),
    },
  }));
  
  const SummaryItem = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  });
  
  const SummaryDot = styled(Box)<{ color?: string }>(({ color = '#0A0A0A' }) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: color,
  }));
  
  const SummaryText = styled(Typography)({
    fontSize: '14px',
    color: '#6B7280',
    fontWeight: 500,
  });

const ControlsSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  display: 'flex',
  gap: theme.spacing(2.5),
  alignItems: 'center',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  flex: 1,
  maxWidth: '600px',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    borderRadius: '12px',
    fontSize: '16px',
    height: '56px',
    '& fieldset': {
      borderColor: '#E5E7EB',
      borderWidth: '2px',
    },
    '&:hover fieldset': {
      borderColor: '#D1D5DB',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0A0A0A',
      borderWidth: '2px',
    },
  },
  '& .MuiInputBase-input': {
    padding: '16px 20px',
    fontSize: '16px',
    '&::placeholder': {
      color: '#9CA3AF',
      opacity: 1,
    },
  },
}));

const FilterGroup = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(1),
    flexShrink: 0,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      overflowX: 'auto',
      paddingBottom: theme.spacing(1),
    },
  }));

const FilterButton = styled(Box)<{ active?: boolean }>(({ active, theme }) => ({
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    backgroundColor: active ? '#0A0A0A' : 'transparent',
    color: active ? 'white' : '#6B7280',
    border: active ? '2px solid #0A0A0A' : '2px solid #E5E7EB',
    borderRadius: '100px',
    transition: 'all 0.2s ease',
    userSelect: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    '&:hover': {
      backgroundColor: active ? '#1F2937' : 'transparent',
      borderColor: active ? '#1F2937' : '#9CA3AF',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '8px 16px',
      fontSize: '13px',
    },
  }));

  const ConsultationsList = styled(Box)({
    width: '100%',
  });



  const ConsultationListItem = styled(Box)(({ theme }) => ({
    backgroundColor: 'white',
    border: '1px solid #E5E7EB',
    borderRadius: '16px',
    padding: theme.spacing(3, 4),
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    '&:hover': {
      borderColor: '#0A0A0A',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
    },
    '&:last-child': {
      marginBottom: 0,
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2.5, 3),
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: theme.spacing(2),
    },
  }));
  
  const ConsultationContent = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
    minWidth: 0, // Allows text truncation
    [theme.breakpoints.down('md')]: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: theme.spacing(1),
    },
  }));
  
  const ConsultationMeta = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    flexShrink: 0,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      justifyContent: 'space-between',
    },
  }));

  const ListItemTitle = styled(Typography)({
    fontSize: '16px',
    fontWeight: 600,
    color: '#0A0A0A',
    marginBottom: '4px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    minWidth: 0,
  });

const StatusBadge = styled(Box)<{ status?: string }>(({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'completed':
        return {
          color: '#10B981',
          backgroundColor: '#10B98115',
          borderColor: '#10B981',
        };
      case 'active':
        return {
          color: '#0A0A0A',
          backgroundColor: '#0A0A0A15',
          borderColor: '#0A0A0A',
        };
      case 'pending':
      default:
        return {
          color: '#F59E0B',
          backgroundColor: '#F59E0B15',
          borderColor: '#F59E0B',
        };
    }
  };

  const styles = getStatusStyles();
  
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 10px',
    backgroundColor: styles.backgroundColor,
    border: `1.5px solid ${styles.borderColor}`,
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 700,
    color: styles.color,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };
});

const ListItemDescription = styled(Typography)({
    fontSize: '14px',
    color: '#6B7280',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    minWidth: 0,
    maxWidth: '400px',
  });

  const ListItemDate = styled(Typography)({
    fontSize: '12px',
    color: '#9CA3AF',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  });

const MenuButton = styled(IconButton)({
  width: '32px',
  height: '32px',
  backgroundColor: '#F9FAFB',
  border: '1px solid #E5E7EB',
  '&:hover': {
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB',
  },
});

const EmptyState = styled(Box)(({ theme }) => ({
  gridColumn: '1 / -1',
  textAlign: 'center',
  padding: '80px 32px',
  backgroundColor: '#FAFAFA',
  border: '2px dashed #E5E7EB',
  borderRadius: '24px',
  minHeight: '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    padding: '60px 24px',
    minHeight: '350px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '40px 20px',
    minHeight: '300px',
  },
}));

const ConsultationHub: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedConsultation, setSelectedConsultation] = useState<string | null>(null);
  const [wizardOpen, setWizardOpen] = useState(false);

  // Responsive checks
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (isAuthenticated) {
      loadConsultations();
    }
  }, [isAuthenticated]);

  const loadConsultations = async () => {
    try {
      setLoading(true);
      const data = await consultationService.getUserConsultations();
      setConsultations(data as unknown as Consultation[]);
    } catch (err) {
      console.error('Failed to load consultations:', err);
      setError('Failed to load consultations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewConsultation = (id: string) => {
    navigate(`/consultation/${id}`);
  };

  const handleEditConsultation = (id: string) => {
    navigate(`/consultation/${id}/edit`);
  };

  const handleDeleteConsultation = async (id: string) => {
    try {
      await consultationService.deleteConsultation(id);
      setConsultations(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error('Failed to delete consultation:', err);
      setError('Failed to delete consultation. Please try again.');
    }
  };

  const handleCreateNewConsultation = () => {
    setWizardOpen(true);
  };

  const handleWizardClose = () => {
    setWizardOpen(false);
  };

  const handleWizardSuccess = (consultationId: string) => {
    console.log('=== WIZARD SUCCESS ===');
    console.log('Consultation ID received:', consultationId);
    
    console.log('Closing wizard...');
    setWizardOpen(false);
    
    console.log('Refreshing consultations list...');
    loadConsultations();
    
    console.log('Navigating to chat...');
    navigate(`/consultation/${consultationId}/chat`);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, consultationId: string) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedConsultation(consultationId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedConsultation(null);
  };

  const filteredConsultations = consultations.filter(consultation => {
    const title = consultation.topic || (consultation as any).title || '';
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         consultation.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const consultationStatus = consultation.status || 'pending';
    const matchesStatus = filterStatus === 'all' || consultationStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: consultations.length,
    active: consultations.filter(c => c.status === 'active').length,
    completed: consultations.filter(c => c.status === 'completed').length,
    pending: consultations.filter(c => {
      const status = c.status as string;
      return !status || status === 'pending';
    }).length,
  };

  if (!isAuthenticated) {
    return (
      <PageWrapper>
        <ContentContainer>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" gutterBottom>
              Please log in to access consultations
            </Typography>
          </Box>
        </ContentContainer>
      </PageWrapper>
    );
  }

  if (loading) {
    return (
      <PageWrapper>
        <ContentContainer>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={48} sx={{ color: '#0A0A0A' }} />
          </Box>
        </ContentContainer>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <ContentContainer>
          <Alert severity="error" sx={{ mb: 3, fontSize: '16px', fontWeight: 500 }}>
            {error}
          </Alert>
        </ContentContainer>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <ContentContainer>
        {/* Header */}
        <Header>
          <Box>
            <Title>Your Consultations</Title>
            <Subtitle>
              Track and manage all your compliance consultations
            </Subtitle>
          </Box>
          <ActionButton onClick={handleCreateNewConsultation}>
            <Add sx={{ fontSize: 20 }} />
            Start New Consultation
          </ActionButton>
        </Header>

        {/* Summary Bar */}
        <SummaryBar>
          <SummaryItem>
            <SummaryText sx={{ fontWeight: 600, color: '#0A0A0A' }}>
              {stats.total} Total
            </SummaryText>
          </SummaryItem>
          <SummaryItem>
            <SummaryDot color="#0A0A0A" />
            <SummaryText>{stats.active} Active</SummaryText>
          </SummaryItem>
          <SummaryItem>
            <SummaryDot color="#10B981" />
            <SummaryText>{stats.completed} Completed</SummaryText>
          </SummaryItem>
          <SummaryItem>
            <SummaryDot color="#F59E0B" />
            <SummaryText>{stats.pending} Pending</SummaryText>
          </SummaryItem>
        </SummaryBar>

        {/* Search and Filter */}
        <ControlsSection>
          <SearchInput
            placeholder="Search consultations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth={isTablet}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#9CA3AF', fontSize: 24 }} />
                </InputAdornment>
              ),
            }}
          />
          
          <FilterGroup>
            <FilterButton
              active={filterStatus === 'all'}
              onClick={() => setFilterStatus('all')}
            >
              All
            </FilterButton>
            <FilterButton
              active={filterStatus === 'active'}
              onClick={() => setFilterStatus('active')}
            >
              Active
            </FilterButton>
            <FilterButton
              active={filterStatus === 'completed'}
              onClick={() => setFilterStatus('completed')}
            >
              Completed
            </FilterButton>
            <FilterButton
              active={filterStatus === 'pending'}
              onClick={() => setFilterStatus('pending')}
            >
              Pending
            </FilterButton>
          </FilterGroup>
        </ControlsSection>

        {/* Consultations List */}
        <ConsultationsList>
          {filteredConsultations.length === 0 ? (
            <EmptyState>
              <Assessment sx={{ 
                fontSize: isMobile ? 56 : 72, 
                color: '#D1D5DB', 
                mb: 3 
              }} />
              <Typography sx={{ 
                fontSize: isMobile ? '24px' : '28px', 
                fontWeight: 700, 
                color: '#0A0A0A', 
                mb: 2 
              }}>
                {searchQuery || filterStatus !== 'all' ? 'No consultations found' : 'Ready to start?'}
              </Typography>
              <Typography sx={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: '#6B7280', 
                mb: 4, 
                maxWidth: 500, 
                mx: 'auto' 
              }}>
                {searchQuery || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start your first compliance consultation to get expert guidance'
                }
              </Typography>
            </EmptyState>
          ) : (
            filteredConsultations.map((consultation) => (
              <ConsultationListItem
                key={consultation.id}
                onClick={() => handleViewConsultation(consultation.id)}
              >
                <ConsultationContent>
                  <StatusBadge status={consultation.status || 'pending'}>
                    <FiberManualRecord sx={{ fontSize: 8 }} />
                    {consultation.status || 'pending'}
                  </StatusBadge>
                  
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <ListItemTitle>
                      {consultation.topic || (consultation as any).title || 'Untitled Consultation'}
                    </ListItemTitle>
                    <ListItemDescription>
                      {consultation.description || 'No description available'}
                    </ListItemDescription>
                  </Box>
                </ConsultationContent>
                
                <ConsultationMeta>
                  <ListItemDate>
                    {new Date(consultation.created || new Date()).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </ListItemDate>
                  
                  <MenuButton
                    size="small"
                    onClick={(e) => handleMenuClick(e, consultation.id)}
                  >
                    <MoreVert sx={{ fontSize: 16 }} />
                  </MenuButton>
                </ConsultationMeta>
              </ConsultationListItem>
            ))
          )}
        </ConsultationsList>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              mt: 1,
              minWidth: 140,
            }
          }}
        >
          <MenuItem 
            onClick={() => {
              if (selectedConsultation) handleViewConsultation(selectedConsultation);
              handleMenuClose();
            }}
            sx={{ 
              fontSize: '14px', 
              fontWeight: 500, 
              color: '#0A0A0A',
              padding: '10px 14px',
            }}
          >
            <Visibility sx={{ mr: 1.5, fontSize: 18, color: '#6B7280' }} />
            View
          </MenuItem>
          <MenuItem 
            onClick={() => {
              if (selectedConsultation) handleEditConsultation(selectedConsultation);
              handleMenuClose();
            }}
            sx={{ 
              fontSize: '14px', 
              fontWeight: 500, 
              color: '#0A0A0A',
              padding: '10px 14px',
            }}
          >
            <Edit sx={{ mr: 1.5, fontSize: 18, color: '#6B7280' }} />
            Edit
          </MenuItem>
          <MenuItem 
            onClick={() => {
              if (selectedConsultation) handleDeleteConsultation(selectedConsultation);
              handleMenuClose();
            }}
            sx={{ 
              fontSize: '14px', 
              fontWeight: 500, 
              color: '#EF4444',
              padding: '10px 14px',
              '&:hover': { backgroundColor: '#FEF2F2' }
            }}
          >
            <Delete sx={{ mr: 1.5, fontSize: 18 }} />
            Delete
          </MenuItem>
        </Menu>
        {/* Consultation Wizard Modal */}
        <ConsultationWizard
          open={wizardOpen}
          onClose={handleWizardClose}
          onSuccess={handleWizardSuccess}
        />
      </ContentContainer>
    </PageWrapper>
    
  );
};

export default ConsultationHub;