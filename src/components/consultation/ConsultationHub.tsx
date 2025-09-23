import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Chip,
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
  CalendarToday,
  CheckCircle,
  RadioButtonUnchecked,
  Visibility,
  Edit,
  Delete,
  Assessment,
  Gavel,
  Security,
  TrendingUp,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { consultationService } from '../../pocketbase/services/pocketbase';
import { useAuth } from '../../pocketbase/services/AuthContext';
import { Consultation } from '../../pocketbase/types/consultation.types';

// Styled Components
const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(0,0,0,0.08)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
  },
}));

const ConsultationCard = styled(Card)(({ theme }) => ({
  height: '100%',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(0,0,0,0.08)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
    borderColor: '#ff9800',
  },
}));

const NewConsultationCard = styled(Card)(({ theme }) => ({
  height: '100%',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: '2px dashed #ff9800',
  background: 'linear-gradient(135deg, #fff3e0 0%, #ffffff 100%)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(255, 152, 0, 0.2)',
    borderColor: '#e65100',
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
      // Create a new consultation with default values
      const newConsultation = await consultationService.createConsultation({
        topic: 'New Consultation',
        description: 'A new compliance consultation',
        type: 'risk-assessment',
        status: 'pending',
      });
      
      // Refresh the consultations list
      await loadConsultations();
      
      // Navigate to view the new consultation
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
        return { color: '#4caf50', bgcolor: '#e8f5e9' };
      case 'active':
        return { color: '#ff9800', bgcolor: '#fff3e0' };
      case 'pending':
        return { color: '#2196f3', bgcolor: '#e3f2fd' };
      default:
        return { color: '#666', bgcolor: '#f5f5f5' };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle />;
      case 'active':
        return <RadioButtonUnchecked />;
      case 'pending':
        return <RadioButtonUnchecked />;
      default:
        return <RadioButtonUnchecked />;
    }
  };

  const getConsultationTypeIcon = (type: string) => {
    switch (type) {
      case 'risk-assessment':
        return <Security />;
      case 'compliance-review':
        return <Gavel />;
      case 'audit-preparation':
        return <Assessment />;
      default:
        return <Assessment />;
    }
  };

  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = consultation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         consultation.description.toLowerCase().includes(searchQuery.toLowerCase());
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
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 600, color: '#1a1a1a' }}>
          Consultation Hub
        </Typography>
        <Typography variant="h6" sx={{ color: '#666', mb: 4 }}>
          Manage your compliance consultations and start new ones
        </Typography>
      </Box>

      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ 
                width: 48, 
                height: 48, 
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <Assessment />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                  {stats.total}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Consultations
                </Typography>
              </Box>
            </Box>
          </StatsCard>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ 
                width: 48, 
                height: 48, 
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <CheckCircle />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                  {stats.completed}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed
                </Typography>
              </Box>
            </Box>
          </StatsCard>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ 
                width: 48, 
                height: 48, 
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <RadioButtonUnchecked />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                  {stats.active}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active
                </Typography>
              </Box>
            </Box>
          </StatsCard>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ 
                width: 48, 
                height: 48, 
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <TrendingUp />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                  {stats.pending}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending
                </Typography>
              </Box>
            </Box>
          </StatsCard>
        </Grid>
      </Grid>

      {/* Search and Filter */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          placeholder="Search consultations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ flex: 1 }}
        />
        <Button
          variant={filterStatus === 'all' ? 'contained' : 'outlined'}
          onClick={() => setFilterStatus('all')}
        >
          All
        </Button>
        <Button
          variant={filterStatus === 'active' ? 'contained' : 'outlined'}
          onClick={() => setFilterStatus('active')}
        >
          Active
        </Button>
        <Button
          variant={filterStatus === 'completed' ? 'contained' : 'outlined'}
          onClick={() => setFilterStatus('completed')}
        >
          Completed
        </Button>
      </Box>

      {/* Consultations Grid */}
      <Grid container spacing={3}>
        {/* New Consultation Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <NewConsultationCard>
            <CardActionArea 
              onClick={() => handleCreateNewConsultation()}
              sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            >
              <Box sx={{ 
                width: 64, 
                height: 64, 
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                color: 'white'
              }}>
                <Add sx={{ fontSize: 32 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#e65100', mb: 1 }}>
                Start New Consultation
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                Create a new compliance consultation
              </Typography>
            </CardActionArea>
          </NewConsultationCard>
        </Grid>

        {/* Existing Consultations */}
        {filteredConsultations.map((consultation) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={consultation.id}>
            <ConsultationCard>
              <CardActionArea 
                onClick={() => handleViewConsultation(consultation.id)}
                sx={{ height: '100%' }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getConsultationTypeIcon(consultation.type || 'assessment')}
                      <Typography variant="body2" color="text.secondary">
                        {(consultation.type || 'assessment').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuClick(e, consultation.id);
                      }}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                      {consultation.title || 'Untitled Consultation'}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {consultation.description || 'No description available'}
                    </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label={consultation.status || 'pending'}
                      size="small"
                      icon={getStatusIcon(consultation.status || 'pending')}
                      sx={{
                        ...getStatusColor(consultation.status || 'pending'),
                        fontWeight: 500,
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CalendarToday sx={{ fontSize: 14 }} />
                      {new Date(consultation.created || new Date()).toLocaleDateString()}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </ConsultationCard>
          </Grid>
        ))}

        {/* Empty State */}
        {filteredConsultations.length === 0 && !loading && (
          <Grid size={{ xs: 12 }}>
            <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 3 }}>
              <Box sx={{ 
                width: 120, 
                height: 120, 
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3
              }}>
                <Assessment sx={{ fontSize: 48, color: '#999' }} />
              </Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, color: '#1a1a1a' }}>
                {searchQuery || filterStatus !== 'all' ? 'No consultations found' : 'No consultations yet'}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                {searchQuery || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start your first compliance consultation to get expert guidance'
                }
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<Add />}
                onClick={() => handleCreateNewConsultation()}
                sx={{ px: 4 }}
              >
                Start New Consultation
              </Button>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          if (selectedConsultation) handleViewConsultation(selectedConsultation);
          handleMenuClose();
        }}>
          <Visibility sx={{ mr: 1 }} />
          View
        </MenuItem>
        <MenuItem onClick={() => {
          if (selectedConsultation) handleEditConsultation(selectedConsultation);
          handleMenuClose();
        }}>
          <Edit sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => {
          if (selectedConsultation) handleDeleteConsultation(selectedConsultation);
          handleMenuClose();
        }}>
          <Delete sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ConsultationHub;