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

// Modern Custom Components with Bold Borders
const Container = styled(Box)({
  width: '100%',
});

const Header = styled(Box)({
  marginBottom: '48px',
});

const Title = styled(Typography)({
  fontSize: '42px',
  fontWeight: 800,
  color: '#0A0A0A',
  marginBottom: '12px',
  letterSpacing: '-0.02em',
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
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '24px',
  marginBottom: '40px',
  width: '100%',
});

const StatCard = styled(Box)({
  backgroundColor: 'white',
  border: '3px solid #E5E7EB',
  borderRadius: '16px',
  padding: '28px 24px',
  transition: 'all 0.3s ease',
  cursor: 'default',
  '&:hover': {
    borderColor: '#1F2937',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  },
});

const StatNumber = styled(Typography)({
  fontSize: '36px',
  fontWeight: 900,
  color: '#0A0A0A',
  marginBottom: '8px',
  lineHeight: 1,
});

const StatLabel = styled(Typography)({
  fontSize: '14px',
  fontWeight: 600,
  color: '#6B7280',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

const SearchBar = styled(Box)({
  marginBottom: '32px',
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  width: '100%',
});

const SearchInput = styled(TextField)({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '2px solid #E5E7EB',
    fontSize: '16px',
    fontWeight: 500,
    '& fieldset': {
      border: 'none',
    },
    '&:hover': {
      borderColor: '#D1D5DB',
    },
    '&.Mui-focused': {
      borderColor: '#0A0A0A',
      boxShadow: '0 0 0 4px rgba(10, 10, 10, 0.08)',
    },
  },
  '& .MuiInputBase-input': {
    padding: '18px 16px',
    fontSize: '16px',
    fontWeight: 500,
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
});

const FilterButton = styled(Box)<{ active?: boolean }>(({ active }) => ({
  padding: '16px 20px',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
  backgroundColor: active ? '#0A0A0A' : 'white',
  color: active ? 'white' : '#6B7280',
  borderRight: '1px solid #E5E7EB',
  transition: 'all 0.2s ease',
  '&:last-child': {
    borderRight: 'none',
  },
  '&:hover': {
    backgroundColor: active ? '#1F2937' : '#F9FAFB',
  },
}));

const Grid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  gap: '24px',
  width: '100%',
});

const NewConsultationCard = styled(Box)({
  backgroundColor: 'white',
  border: '3px dashed #D1D5DB',
  borderRadius: '20px',
  padding: '48px 32px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  minHeight: '280px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    borderColor: '#0A0A0A',
    borderStyle: 'solid',
    backgroundColor: '#F9FAFB',
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
  },
});

const ConsultationCard = styled(Box)({
  backgroundColor: 'white',
  border: '2px solid #E5E7EB',
  borderRadius: '20px',
  padding: '28px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  minHeight: '280px',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  '&:hover': {
    borderColor: '#0A0A0A',
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
  },
});

const CardHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '20px',
});

const StatusBadge = styled(Box)<{ status?: string }>(({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'active': return '#0A0A0A';
      case 'pending': return '#F59E0B';
      default: return '#9CA3AF';
    }
  };
  
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    backgroundColor: `${getStatusColor()}15`,
    border: `2px solid ${getStatusColor()}`,
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 700,
    color: getStatusColor(),
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };
});

const CardTitle = styled(Typography)({
  fontSize: '20px',
  fontWeight: 700,
  color: '#0A0A0A',
  marginBottom: '12px',
  lineHeight: 1.3,
});

const CardDescription = styled(Typography)({
  fontSize: '14px',
  color: '#6B7280',
  lineHeight: 1.5,
  marginBottom: '24px',
  flex: 1,
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

const CardFooter = styled(Typography)({
  fontSize: '12px',
  color: '#9CA3AF',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginTop: 'auto',
});

const MenuButton = styled(IconButton)({
  width: '36px',
  height: '36px',
  backgroundColor: '#F3F4F6',
  border: '2px solid #E5E7EB',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#E5E7EB',
    borderColor: '#D1D5DB',
  },
});

const EmptyState = styled(Box)({
  gridColumn: '1 / -1',
  textAlign: 'center',
  padding: '80px 32px',
  backgroundColor: 'white',
  border: '2px solid #E5E7EB',
  borderRadius: '20px',
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
    const matchesSearch = consultation.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         consultation.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || consultation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: consultations.length,
    active: consultations.filter(c => c.status === 'active').length,
    completed: consultations.filter(c => c.status === 'completed').length,
    pending: consultations.filter(c => (c.status || 'pending') === 'pending').length,
  };

  if (!isAuthenticated) {
    return (
      <Container>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" gutterBottom>
            Please log in to access consultations
          </Typography>
        </Box>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={48} sx={{ color: '#0A0A0A' }} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mb: 3, fontSize: '16px', fontWeight: 500 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
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
      <SearchBar>
        <SearchInput
          placeholder="Search consultations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#9CA3AF', fontSize: 20 }} />
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
      </SearchBar>

      {/* Grid */}
      <Grid>
        {/* New Consultation Card */}
        <NewConsultationCard onClick={handleCreateNewConsultation}>
          <Add sx={{ fontSize: 48, color: '#6B7280', marginBottom: '16px' }} />
          <Typography sx={{ fontSize: '24px', fontWeight: 700, color: '#0A0A0A', mb: 1 }}>
            Start New Consultation
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#6B7280' }}>
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
              <MenuButton onClick={(e) => handleMenuClick(e, consultation.id)}>
                <MoreVert sx={{ fontSize: 18 }} />
              </MenuButton>
            </CardHeader>

            <CardTitle>
              {consultation.title || 'Untitled Consultation'}
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
            <Assessment sx={{ fontSize: 64, color: '#D1D5DB', mb: 3 }} />
            <Typography sx={{ fontSize: '28px', fontWeight: 700, color: '#0A0A0A', mb: 2 }}>
              {searchQuery || filterStatus !== 'all' ? 'No consultations found' : 'No consultations yet'}
            </Typography>
            <Typography sx={{ fontSize: '16px', color: '#6B7280', mb: 4, maxWidth: 400, mx: 'auto' }}>
              {searchQuery || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Start your first compliance consultation to get expert guidance'
              }
            </Typography>
            <Box
              onClick={handleCreateNewConsultation}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                padding: '14px 24px',
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
                },
              }}
            >
              <Add sx={{ fontSize: 20 }} />
              Start New Consultation
            </Box>
          </EmptyState>
        )}
      </Grid>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            border: '2px solid #E5E7EB',
            borderRadius: '12px',
            mt: 1,
            minWidth: 160,
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
            fontWeight: 600, 
            color: '#0A0A0A',
            padding: '12px 16px',
            '&:hover': { backgroundColor: '#F3F4F6' }
          }}
        >
          <Visibility sx={{ mr: 2, fontSize: 18 }} />
          View
        </MenuItem>
        <MenuItem 
          onClick={() => {
            if (selectedConsultation) handleEditConsultation(selectedConsultation);
            handleMenuClose();
          }}
          sx={{ 
            fontSize: '14px', 
            fontWeight: 600, 
            color: '#0A0A0A',
            padding: '12px 16px',
            '&:hover': { backgroundColor: '#F3F4F6' }
          }}
        >
          <Edit sx={{ mr: 2, fontSize: 18 }} />
          Edit
        </MenuItem>
        <MenuItem 
          onClick={() => {
            if (selectedConsultation) handleDeleteConsultation(selectedConsultation);
            handleMenuClose();
          }}
          sx={{ 
            fontSize: '14px', 
            fontWeight: 600, 
            color: '#EF4444',
            padding: '12px 16px',
            '&:hover': { backgroundColor: '#FEF2F2' }
          }}
        >
          <Delete sx={{ mr: 2, fontSize: 18 }} />
          Delete
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default ConsultationHub;