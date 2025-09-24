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

// Modern Custom Components with Consistent Styling
const PageWrapper = styled(Box)({
  width: '100%',
  height: '100%',
  padding: '40px',
  '@media (max-width: 768px)': {
    padding: '24px',
  },
});

const Header = styled(Box)({
  marginBottom: '48px',
});

const Title = styled(Typography)({
  fontSize: '48px',
  fontWeight: 800,
  color: '#0A0A0A',
  marginBottom: '12px',
  letterSpacing: '-0.03em',
  lineHeight: 1.1,
});

const Subtitle = styled(Typography)({
  fontSize: '18px',
  color: '#6B7280',
  fontWeight: 400,
  lineHeight: 1.5,
});

const StatsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '24px',
  marginBottom: '48px',
  width: '100%',
  '@media (max-width: 1200px)': {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
  },
  '@media (max-width: 900px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@media (max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
});

const StatCard = styled(Box)({
  backgroundColor: 'white',
  border: '2px solid #E5E7EB',
  borderRadius: '16px',
  padding: '32px',
  transition: 'all 0.2s ease',
  textAlign: 'center',
  '&:hover': {
    borderColor: '#9CA3AF',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
});

const StatNumber = styled(Typography)({
  fontSize: '48px',
  fontWeight: 800,
  color: '#0A0A0A',
  marginBottom: '8px',
  lineHeight: 1,
});

const StatLabel = styled(Typography)({
  fontSize: '12px',
  fontWeight: 600,
  color: '#9CA3AF',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
});

const ControlsSection = styled(Box)({
  marginBottom: '32px',
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
  width: '100%',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    gap: '16px',
  },
});

const SearchInput = styled(TextField)({
  flex: 1,
  maxWidth: '600px',
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
});

const FilterGroup = styled(Box)({
  display: 'flex',
  backgroundColor: 'white',
  border: '2px solid #E5E7EB',
  borderRadius: '12px',
  overflow: 'hidden',
  flexShrink: 0,
  height: '56px',
  '@media (max-width: 768px)': {
    width: '100%',
  },
});

const FilterButton = styled(Box)<{ active?: boolean }>(({ active }) => ({
  padding: '16px 24px',
  fontSize: '15px',
  fontWeight: 600,
  cursor: 'pointer',
  backgroundColor: active ? '#0A0A0A' : 'white',
  color: active ? 'white' : '#6B7280',
  borderRight: '1px solid #E5E7EB',
  transition: 'all 0.2s ease',
  userSelect: 'none',
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  '&:last-child': {
    borderRight: 'none',
  },
  '&:hover': {
    backgroundColor: active ? '#1F2937' : '#F9FAFB',
  },
}));

const CardsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
  gap: '24px',
  width: '100%',
  '@media (max-width: 1400px)': {
    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
  },
  '@media (max-width: 900px)': {
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  },
  '@media (max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
});

const NewConsultationCard = styled(Box)({
  backgroundColor: '#FAFAFA',
  border: '3px dashed #D1D5DB',
  borderRadius: '20px',
  padding: '48px 32px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  minHeight: '320px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    borderColor: '#9CA3AF',
    backgroundColor: 'white',
    transform: 'scale(1.02)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
  },
});

const ConsultationCard = styled(Box)({
  backgroundColor: 'white',
  border: '2px solid #E5E7EB',
  borderRadius: '20px',
  padding: '32px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  minHeight: '320px',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  '&:hover': {
    borderColor: '#9CA3AF',
    transform: 'scale(1.02)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
  },
});

const CardHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '16px',
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

const CardTitle = styled(Typography)({
  fontSize: '18px',
  fontWeight: 600,
  color: '#0A0A0A',
  marginBottom: '8px',
  lineHeight: 1.3,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

const CardDescription = styled(Typography)({
  fontSize: '14px',
  color: '#6B7280',
  lineHeight: 1.5,
  marginBottom: '16px',
  flex: 1,
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

const CardFooter = styled(Typography)({
  fontSize: '12px',
  color: '#9CA3AF',
  fontWeight: 500,
  marginTop: 'auto',
  paddingTop: '12px',
  borderTop: '1px solid #F3F4F6',
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

const EmptyState = styled(Box)({
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
});

const ConsultationHub: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedConsultation, setSelectedConsultation] = useState<string | null>(null);

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

  const handleCreateNewConsultation = async () => {
    try {
      const newConsultation = await consultationService.createConsultation({
        topic: 'New Consultation',
        description: 'A new compliance consultation',
        type: 'risk-assessment',
        status: 'pending',
      });
      
      await loadConsultations();
      navigate(`/consultation/${newConsultation.id}`);
    } catch (err) {
      console.error('Failed to create consultation:', err);
      setError('Failed to create consultation. Please try again.');
    }
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
    // Handle both 'topic' and 'title' fields for compatibility
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
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" gutterBottom>
            Please log in to access consultations
          </Typography>
        </Box>
      </PageWrapper>
    );
  }

  if (loading) {
    return (
      <PageWrapper>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={48} sx={{ color: '#0A0A0A' }} />
        </Box>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <Alert severity="error" sx={{ mb: 3, fontSize: '16px', fontWeight: 500 }}>
          {error}
        </Alert>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Header */}
      <Header>
        <Title>Consultation Hub</Title>
        <Subtitle>
          Manage your compliance consultations and start new ones
        </Subtitle>
      </Header>

      {/* Statistics */}
      <StatsGrid>
        <StatCard>
          <StatNumber>{stats.total}</StatNumber>
          <StatLabel>Total</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.completed}</StatNumber>
          <StatLabel>Completed</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.active}</StatNumber>
          <StatLabel>Active</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.pending}</StatNumber>
          <StatLabel>Pending</StatLabel>
        </StatCard>
      </StatsGrid>

      {/* Search and Filter */}
      <ControlsSection>
        <SearchInput
          placeholder="Search consultations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Cards Grid */}
      <CardsGrid>
        {/* New Consultation Card */}
        <NewConsultationCard onClick={handleCreateNewConsultation}>
          <Add sx={{ fontSize: 56, color: '#9CA3AF', marginBottom: '16px' }} />
          <Typography sx={{ fontSize: '24px', fontWeight: 700, color: '#0A0A0A', mb: 1 }}>
            Start New Consultation
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#6B7280', maxWidth: '280px' }}>
            Create a new compliance consultation
          </Typography>
        </NewConsultationCard>

        {/* Existing Consultations */}
        {filteredConsultations.map((consultation) => (
          <ConsultationCard
            key={consultation.id}
            onClick={() => handleViewConsultation(consultation.id)}
          >
            <CardHeader>
              <StatusBadge status={consultation.status || 'pending'}>
                <FiberManualRecord sx={{ fontSize: 8 }} />
                {consultation.status || 'pending'}
              </StatusBadge>
              <MenuButton
                size="small"
                onClick={(e) => handleMenuClick(e, consultation.id)}
              >
                <MoreVert sx={{ fontSize: 16 }} />
              </MenuButton>
            </CardHeader>

            <CardTitle>
              {consultation.topic || (consultation as any).title || 'Untitled Consultation'}
            </CardTitle>
            
            <CardDescription>
              {consultation.description || 'No description available'}
            </CardDescription>

            <CardFooter>
              Created {new Date(consultation.created || new Date()).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </CardFooter>
          </ConsultationCard>
        ))}

        {/* Empty State */}
        {filteredConsultations.length === 0 && (
          <EmptyState>
            <Assessment sx={{ fontSize: 72, color: '#D1D5DB', mb: 3 }} />
            <Typography sx={{ fontSize: '28px', fontWeight: 700, color: '#0A0A0A', mb: 2 }}>
              {searchQuery || filterStatus !== 'all' ? 'No consultations found' : 'No consultations yet'}
            </Typography>
            <Typography sx={{ fontSize: '16px', color: '#6B7280', mb: 4, maxWidth: 500, mx: 'auto' }}>
              {searchQuery || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Start your first compliance consultation to get expert guidance'
              }
            </Typography>
            {(searchQuery === '' && filterStatus === 'all') && (
              <Box
                onClick={handleCreateNewConsultation}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1.5,
                  padding: '16px 32px',
                  backgroundColor: '#0A0A0A',
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#1F2937',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <Add sx={{ fontSize: 20 }} />
                Start New Consultation
              </Box>
            )}
          </EmptyState>
        )}
      </CardsGrid>

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
    </PageWrapper>
  );
};

export default ConsultationHub;