import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
} from '@mui/material';
import {
  Security,
  Assessment,
  Gavel,
  ArrowForward,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ConsultationCard = styled(Card)(({ theme }) => ({
  height: '100%',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid rgba(0,0,0,0.08)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
    borderColor: '#1a1a1a',
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

const ConsultationTypes: React.FC = () => {
  const navigate = useNavigate();

  const consultationTypes = [
    {
      id: 'risk-assessment',
      title: 'Risk Assessment',
      description: 'Evaluate potential compliance risks for your products, services, or business processes. Get comprehensive risk analysis and mitigation strategies.',
      icon: <Security sx={{ fontSize: 32, color: 'white' }} />,
      iconBg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      features: ['Risk Identification', 'Impact Analysis', 'Mitigation Strategies'],
    },
    {
      id: 'compliance-review',
      title: 'Compliance Review',
      description: 'Get guidance on specific compliance questions or regulatory requirements. Ensure your operations meet industry standards and regulations.',
      icon: <Gavel sx={{ fontSize: 32, color: 'white' }} />,
      iconBg: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      features: ['Regulatory Guidance', 'Compliance Checklist', 'Best Practices'],
    },
    {
      id: 'audit-preparation',
      title: 'Audit Preparation',
      description: 'Prepare for internal or external audits with comprehensive documentation review and compliance verification processes.',
      icon: <Assessment sx={{ fontSize: 32, color: 'white' }} />,
      iconBg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      features: ['Document Review', 'Gap Analysis', 'Audit Readiness'],
    },
  ];

  const handleConsultationSelect = (typeId: string) => {
    navigate(`/consultation/create?type=${typeId}`);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            color: '#1a1a1a',
            mb: 2
          }}
        >
          Choose Consultation Type
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#666',
            maxWidth: 600,
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          Select the type of compliance consultation that best fits your needs. Our AI assistant will guide you through the process.
        </Typography>
      </Box>

      {/* Consultation Types Grid */}
      <Grid container spacing={4}>
        {consultationTypes.map((type) => (
          <Grid size={{ xs: 12, md: 4 }} key={type.id}>
            <ConsultationCard>
              <CardActionArea 
                onClick={() => handleConsultationSelect(type.id)}
                sx={{ height: '100%', p: 3 }}
              >
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <IconContainer sx={{ background: type.iconBg }}>
                    {type.icon}
                  </IconContainer>
                  
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      color: '#1a1a1a',
                      mb: 2
                    }}
                  >
                    {type.title}
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#666',
                      lineHeight: 1.6,
                      mb: 3,
                      flex: 1
                    }}
                  >
                    {type.description}
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    {type.features.map((feature, index) => (
                      <Box 
                        key={index}
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 1,
                          color: '#666',
                          fontSize: '0.9rem'
                        }}
                      >
                        <Box 
                          sx={{ 
                            width: 4, 
                            height: 4, 
                            borderRadius: '50%', 
                            bgcolor: '#1a1a1a',
                            mr: 2
                          }} 
                        />
                        {feature}
                      </Box>
                    ))}
                  </Box>

                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      color: '#1a1a1a',
                      fontWeight: 500,
                      mt: 'auto'
                    }}
                  >
                    Start Consultation
                    <ArrowForward sx={{ ml: 1, fontSize: 20 }} />
                  </Box>
                </CardContent>
              </CardActionArea>
            </ConsultationCard>
          </Grid>
        ))}
      </Grid>

      {/* Bottom Section */}
      <Box sx={{ textAlign: 'center', mt: 6, p: 4, bgcolor: '#f8f9fa', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
          Not sure which consultation type to choose?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Our AI assistant can help you determine the best approach for your specific needs.
        </Typography>
        <Box 
          sx={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            color: '#1a1a1a',
            cursor: 'pointer',
            fontWeight: 500,
            '&:hover': {
              color: '#666'
            }
          }}
          onClick={() => navigate('/consultation/create')}
        >
          Get AI Recommendation
          <ArrowForward sx={{ ml: 1, fontSize: 18 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default ConsultationTypes;
