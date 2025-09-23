import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CircularProgress,
  Alert,
  Button,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
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

// Styled Components - Minimal and Modern
const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: theme.spacing(1.5),
  border: '1px solid #E5E7EB',
  background: 'white',
  boxShadow: 'none',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: '#D1D5DB',
  },
}));

const ConsultationCard = styled(Card)(({ theme }) => ({
  height: '100%',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  border: '1px solid #E5E7EB',
  background: 'white',
  boxShadow: 'none',
  borderRadius: theme.spacing(1.5),
  '&:hover': {
    borderColor: '#1a1a1a',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
}));

const NewConsultationCard = styled(Card)(({ theme }) => ({
  height: '100%',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  border: '2px dashed #D1D5DB',
  background: '#FAFAFA',
  boxShadow: 'none',
  borderRadius: theme.spacing(1.5),
  '&:hover': {
    borderColor: '#1a1a1a',
    background: '#F5F5F5',
    transform: 'translateY(-2px)',
  },
}));

const FilterButton = styled(Button)<{ active?: boolean }>(({ theme, active }) => ({
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  fontWeight: active ? 600 : 400,
  color: active ? '#1a1a1a' : '#6B7280',
  backgroundColor: active ? '#F3F4F6' : 'transparent',
  border: 'none',
  padding: theme.spacing(1, 2),
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: active ? '#E5E7EB' : '#F9FAFB',
  },
}));

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
    setAnchorEl(event.currentTarget);
    setSelectedConsultation(consultationId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedConsultation(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'active':
        return '#1a1a1a';
      case 'pending':
        return '#6B7280';
      default:
        return '#9CA3AF';
    }
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
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" gutterBottom>
          Please log in to access consultations
        </Typography>
        <Button variant="contained" onClick={() => navigate('/login')}>
          Login
        </Button>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 700, 
            color: '#1a1a1a',
            fontSize: '2.5rem',
            letterSpacing: '-0.02em'
          }}
        >
          Consultation Hub
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#6B7280', 
            fontSize: '1.1rem',
            fontWeight: 400
          }}
        >
          Manage your compliance consultations and start new ones
        </Typography>
      </Box>

      {/* Statistics - Simplified */}
              <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: 2,
        mb: 5 
      }}>
        <StatsCard>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: '#1a1a1a',
                mb: 0.5
              }}
            >
                  {stats.total}
                </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#9CA3AF',
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Total
            </Typography>
          </StatsCard>

        <StatsCard>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: '#1a1a1a',
                mb: 0.5
              }}
            >
              {stats.completed}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#9CA3AF',
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Completed
                </Typography>
          </StatsCard>

          <StatsCard>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: '#1a1a1a',
                mb: 0.5
              }}
            >
                  {stats.active}
                </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#9CA3AF',
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
                  Active
                </Typography>
          </StatsCard>

          <StatsCard>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: '#1a1a1a',
                mb: 0.5
              }}
            >
                  {stats.pending}
                </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#9CA3AF',
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
                  Pending
                </Typography>
          </StatsCard>
      </Box>

      {/* Search and Filter - Cleaner */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          placeholder="Search consultations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#9CA3AF', fontSize: 20 }} />
              </InputAdornment>
            ),
            sx: {
              '& fieldset': { border: '1px solid #E5E7EB' },
              '&:hover fieldset': { borderColor: '#D1D5DB' },
              '&.Mui-focused fieldset': { borderColor: '#1a1a1a', borderWidth: '1px' },
            }
          }}
          sx={{ 
            flex: 1,
            '& .MuiInputBase-input': {
              fontSize: '0.95rem',
              fontWeight: 400,
            }
          }}
        />
        
        <Box sx={{ display: 'flex', gap: 1, bgcolor: '#F9FAFB', p: 0.5, borderRadius: 1 }}>
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
              </Box>
            </Box>

      {/* Consultations Grid */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { 
          xs: '1fr', 
          sm: 'repeat(2, 1fr)', 
          md: 'repeat(3, 1fr)' 
        },
        gap: 3 
      }}>
          {/* New Consultation Card */}
            <NewConsultationCard>
              <CardActionArea 
              onClick={handleCreateNewConsultation}
              sx={{ 
                height: '240px', 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                p: 3
              }}
            >
              <Add sx={{ fontSize: 32, color: '#6B7280', mb: 2 }} />
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  color: '#1a1a1a', 
                  mb: 0.5,
                  fontSize: '1.1rem'
                }}
              >
                Start New Consultation
                  </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#9CA3AF',
                  fontSize: '0.875rem'
                }}
              >
                Create a new compliance consultation
                  </Typography>
              </CardActionArea>
            </NewConsultationCard>

          {/* Existing Consultations */}
        {filteredConsultations.map((consultation) => (
          <ConsultationCard key={consultation.id}>
                <CardActionArea 
                  onClick={() => handleViewConsultation(consultation.id)}
                sx={{ height: '240px' }}
                >
                  <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FiberManualRecord 
                        sx={{ 
                          fontSize: 10, 
                          color: getStatusColor(consultation.status || 'pending') 
                        }} 
                      />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#6B7280',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          textTransform: 'capitalize'
                        }}
                      >
                        {consultation.status || 'pending'}
                      </Typography>
                      </Box>
                      <IconButton
                        size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuClick(e, consultation.id);
                      }}
                      sx={{ 
                        p: 0.5,
                        '&:hover': { bgcolor: '#F3F4F6' }
                      }}
                    >
                      <MoreVert sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>

                  {/* Content */}
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 600, 
                        color: '#1a1a1a',
                        fontSize: '1.1rem',
                        lineHeight: 1.4,
                        mb: 1
                      }}
                    >
                      {consultation.title || 'Untitled Consultation'}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#6B7280', 
                        display: '-webkit-box', 
                        WebkitLineClamp: 2, 
                        WebkitBoxOrient: 'vertical', 
                        overflow: 'hidden',
                        fontSize: '0.9rem',
                        lineHeight: 1.5
                      }}
                    >
                      {consultation.description || 'No description available'}
                    </Typography>
                  </Box>

                  {/* Footer */}
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#9CA3AF',
                      fontSize: '0.8rem',
                      mt: 2
                    }}
                  >
                    {new Date(consultation.created || new Date()).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                        </Typography>
                  </CardContent>
                </CardActionArea>
              </ConsultationCard>
          ))}

          {/* Empty State */}
        {filteredConsultations.length === 0 && !loading && (
          <Box sx={{ gridColumn: '1 / -1' }}>
            <Paper 
              sx={{ 
                p: 8, 
                textAlign: 'center', 
                border: '1px solid #E5E7EB',
                borderRadius: 2,
                boxShadow: 'none',
                background: '#FAFAFA'
              }}
            >
              <Assessment sx={{ fontSize: 48, color: '#D1D5DB', mb: 3 }} />
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600, 
                  color: '#1a1a1a',
                  mb: 1
                }}
              >
                {searchQuery || filterStatus !== 'all' ? 'No consultations found' : 'No consultations yet'}
                </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#6B7280', 
                  mb: 4,
                  fontSize: '0.95rem'
                }}
              >
                {searchQuery || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start your first compliance consultation to get expert guidance'
                }
                </Typography>
              <Button 
                variant="contained" 
                startIcon={<Add />}
                onClick={handleCreateNewConsultation}
                sx={{ 
                  px: 4,
                  bgcolor: '#1a1a1a',
                  '&:hover': { bgcolor: '#333' }
                }}
              >
                Start New Consultation
              </Button>
              </Paper>
          </Box>
          )}
      </Box>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            border: '1px solid #E5E7EB',
            borderRadius: 1,
            mt: 1
          }
        }}
      >
        <MenuItem 
          onClick={() => {
            if (selectedConsultation) handleViewConsultation(selectedConsultation);
          handleMenuClose();
          }}
          sx={{ fontSize: '0.9rem', color: '#1a1a1a' }}
        >
          <Visibility sx={{ mr: 1.5, fontSize: 18 }} />
          View
        </MenuItem>
        <MenuItem 
          onClick={() => {
            if (selectedConsultation) handleEditConsultation(selectedConsultation);
          handleMenuClose();
          }}
          sx={{ fontSize: '0.9rem', color: '#1a1a1a' }}
        >
          <Edit sx={{ mr: 1.5, fontSize: 18 }} />
          Edit
        </MenuItem>
        <MenuItem 
          onClick={() => {
            if (selectedConsultation) handleDeleteConsultation(selectedConsultation);
            handleMenuClose();
          }}
          sx={{ fontSize: '0.9rem', color: '#EF4444' }}
        >
          <Delete sx={{ mr: 1.5, fontSize: 18 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ConsultationHub;