import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    TextField,
    IconButton,
    CircularProgress,
    Fade,
    Select,
    MenuItem,
    FormControl,
  } from '@mui/material';
  import {
    Close,
    Upload,
    CheckCircle,
    Description,
    Image,
    Create,
  } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { consultationService } from '../../pocketbase/services/pocketbase';
import { useAuth } from '../../pocketbase/services/AuthContext';

// Styled Components for Modal with Backdrop Blur
const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiBackdrop-root': {
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    '& .MuiDialog-paper': {
      borderRadius: '24px',
      maxWidth: '800px',
      width: '95vw',
      maxHeight: '90vh',
      margin: theme.spacing(3),
      overflow: 'hidden',
      boxShadow: '0 25px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      [theme.breakpoints.down('md')]: {
        maxWidth: '700px',
        width: '92vw',
        margin: theme.spacing(2),
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: '95vw',
        width: '95vw',
        margin: theme.spacing(1),
        borderRadius: '20px',
      },
    },
  }));

  const ModalHeader = styled(Box)(({ theme }) => ({
    padding: theme.spacing(5, 5, 4, 5),
    borderBottom: '1px solid #E5E7EB',
    backgroundColor: '#FAFAFA',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 3, 3, 3),
    },
  }));

  const ModalContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
      gap: theme.spacing(3),
    },
  }));

const SectionTitle = styled(Typography)({
  fontSize: '14px',
  fontWeight: 600,
  color: '#374151',
  marginBottom: '8px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

const StyledSelect = styled(Select)({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#E5E7EB',
    borderWidth: '2px',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#D1D5DB',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#0A0A0A',
    borderWidth: '2px',
  },
  borderRadius: '12px',
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    borderRadius: '12px',
    fontSize: '15px',
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
});

const UploadArea = styled(Box)(({ theme }) => ({
  border: '2px dashed #D1D5DB',
  borderRadius: '12px',
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: '#FAFAFA',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: '#9CA3AF',
    backgroundColor: '#F9FAFB',
  },
}));

const FileItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5, 2),
  backgroundColor: '#F9FAFB',
  border: '1px solid #E5E7EB',
  borderRadius: '8px',
  marginBottom: theme.spacing(1),
  gap: theme.spacing(1.5),
}));

const CreateButton = styled(Box)(({ theme }) => ({
  padding: '16px 32px',
  backgroundColor: '#0A0A0A',
  color: 'white',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: 600,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  transition: 'all 0.2s ease',
  userSelect: 'none',
  marginTop: theme.spacing(2),
  '&:hover': {
    backgroundColor: '#1F2937',
    transform: 'translateY(-1px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    '&:hover': {
      transform: 'none',
      boxShadow: 'none',
    },
  },
}));

interface ConsultationData {
  topic: string;
  type: string;
  description: string;
  attachments: File[];
}

interface ConsultationWizardProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (consultationId: string) => void;
}

const ConsultationWizard: React.FC<ConsultationWizardProps> = ({ open, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [consultationData, setConsultationData] = useState<ConsultationData>({
    topic: '',
    type: '',
    description: '',
    attachments: [],
  });

  const complianceOptions = [
    { value: 'gdpr', label: 'GDPR Compliance' },
    { value: 'ccpa', label: 'CCPA Compliance' },
    { value: 'privacy', label: 'Data Privacy' },
    { value: 'payments', label: 'Payment Processing' },
    { value: 'pci-dss', label: 'PCI DSS' },
    { value: 'sox', label: 'SOX Compliance' },
    { value: 'security', label: 'Security Policies' },
    { value: 'risk', label: 'Risk Assessment' },
    { value: 'audit', label: 'Audit Preparation' },
    { value: 'hipaa', label: 'HIPAA Compliance' },
    { value: 'iso27001', label: 'ISO 27001' },
    { value: 'other', label: 'Other' },
  ];

  // Reset state when modal closes
  React.useEffect(() => {
    if (!open) {
      setConsultationData({
        topic: '',
        type: '',
        description: '',
        attachments: [],
      });
      setLoading(false);
    }
  }, [open]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setConsultationData({
        ...consultationData,
        attachments: [...consultationData.attachments, ...Array.from(files)],
      });
    }
  };

  const removeFile = (index: number) => {
    setConsultationData({
      ...consultationData,
      attachments: consultationData.attachments.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async () => {
    console.log('=== SUBMIT BUTTON CLICKED ===');
    console.log('Form valid?', isFormValid());
    console.log('Consultation data:', consultationData);
    console.log('User:', user);
    
    if (!isFormValid()) {
      console.log('Form not valid, stopping');
      alert('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    try {
      // Prepare consultation data
      const consultationPayload = {
        topic: consultationData.topic || getSelectedLabel(),
        description: consultationData.description,
        type: consultationData.type,
        status: 'active',
        userId: user?.id,
      };

      console.log('=== CREATING CONSULTATION ===');
      console.log('Payload:', consultationPayload);

      // Create consultation in PocketBase
      const newConsultation = await consultationService.createConsultation(consultationPayload);
      
      console.log('=== CONSULTATION CREATED ===');
      console.log('New consultation:', newConsultation);

      // Call success callback with consultation ID
      console.log('=== CALLING SUCCESS CALLBACK ===');
      console.log('Consultation ID:', newConsultation.id);
      onSuccess(newConsultation.id);
    } catch (error) {
      console.log('=== ERROR OCCURRED ===');
      console.error('Failed to create consultation:', error);
      alert('Failed to create consultation: ' + (error as any).message);
      setLoading(false);
    }
  };

  const getSelectedLabel = () => {
    const option = complianceOptions.find(opt => opt.value === consultationData.type);
    return option ? option.label : '';
  };

  const isFormValid = () => {
    return consultationData.type !== '' && consultationData.description.trim() !== '';
  };

  return (
    <StyledDialog 
      open={open} 
      onClose={onClose}
      TransitionComponent={Fade}
      transitionDuration={300}
    >
      <ModalHeader>
      <Box>
          <Typography fontSize="28px" fontWeight={800} color="#0A0A0A" mb={1} letterSpacing="-0.02em">
            Start New Consultation
          </Typography>
          <Typography fontSize="16px" color="#6B7280" fontWeight={500}>
            Get expert compliance advice from CARA
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#6B7280', ml: 2 }}>
          <Close />
        </IconButton>
      </ModalHeader>

      <ModalContent>
        {/* Topic Selection */}
        <Box>
          <SectionTitle>Compliance Topic *</SectionTitle>
          <FormControl fullWidth>
          <StyledSelect
              value={consultationData.type}
              onChange={(e) => setConsultationData({ ...consultationData, type: e.target.value as string })}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <Typography color="#9CA3AF">Select a compliance topic</Typography>
              </MenuItem>
              {complianceOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
        </Box>

        {/* Custom Topic Input */}
        {consultationData.type === 'other' && (
          <Box>
            <SectionTitle>Custom Topic *</SectionTitle>
            <StyledTextField
              fullWidth
              placeholder="Enter your specific compliance topic"
              value={consultationData.topic}
              onChange={(e) => setConsultationData({ ...consultationData, topic: e.target.value })}
            />
          </Box>
        )}

        {/* Description */}
        <Box>
          <SectionTitle>Describe Your Compliance Need *</SectionTitle>
          <StyledTextField
            fullWidth
            multiline
            rows={6}
            placeholder="Clearly explain your compliance question or the advice you're seeking. Include specific details about your situation, requirements, or challenges..."
            value={consultationData.description}
            onChange={(e) => setConsultationData({ ...consultationData, description: e.target.value })}
          />
        </Box>

        {/* File Upload */}
        <Box>
          <SectionTitle>Supporting Documents (Optional)</SectionTitle>
          <input
            type="file"
            id="file-upload"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
          />
          <label htmlFor="file-upload">
            <UploadArea>
              <Upload sx={{ fontSize: 40, color: '#9CA3AF', mb: 1.5 }} />
              <Typography fontSize="15px" fontWeight={600} color="#0A0A0A" mb={0.5}>
                Drop files here or click to browse
              </Typography>
              <Typography fontSize="13px" color="#6B7280">
                PDF, Word, images • Max 5MB per file
              </Typography>
            </UploadArea>
          </label>

          {consultationData.attachments.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography fontSize="13px" fontWeight={600} color="#374151" mb={1}>
                {consultationData.attachments.length} file(s) attached
              </Typography>
              <Box sx={{ maxHeight: '120px', overflowY: 'auto' }}>
                {consultationData.attachments.map((file, index) => (
                  <FileItem key={index}>
                    {file.type.includes('image') ? 
                      <Image fontSize="small" sx={{ color: '#6B7280' }} /> : 
                      <Description fontSize="small" sx={{ color: '#6B7280' }} />
                    }
                    <Typography fontSize="14px" flex={1} color="#0A0A0A">
                      {file.name}
                    </Typography>
                    <Typography fontSize="12px" color="#9CA3AF" mr={1}>
                      {(file.size / 1024 / 1024).toFixed(1)}MB
                    </Typography>
                    <IconButton size="small" onClick={() => removeFile(index)}>
                      <Close fontSize="small" />
                    </IconButton>
                  </FileItem>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {/* Success Message Preview */}
        <Box sx={{ 
          p: 3, 
          backgroundColor: '#F0FDF4', 
          borderRadius: '12px', 
          display: 'flex', 
          gap: 2, 
          alignItems: 'flex-start',
          border: '1px solid #BBF7D0'
        }}>
          <CheckCircle sx={{ color: '#10B981', fontSize: 20, mt: 0.25, flexShrink: 0 }} />
          <Box>
            <Typography fontSize="14px" fontWeight={600} color="#065F46" mb={0.5}>
              AI-Powered Compliance Analysis
            </Typography>
            <Typography fontSize="13px" color="#047857">
              CARA will analyze your request using the latest regulations and best practices to provide personalized compliance guidance.
            </Typography>
          </Box>
        </Box>

        {/* Create Button */}
        <CreateButton
          onClick={handleSubmit}
          sx={{ 
            opacity: loading || !isFormValid() ? 0.5 : 1,
            cursor: loading || !isFormValid() ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ color: 'white' }} />
              Creating Consultation...
            </>
          ) : (
            <>
              <Create fontSize="small" />
              Start Consultation with CARA
            </>
          )}
        </CreateButton>
      </ModalContent>
    </StyledDialog>
  );
};

export default ConsultationWizard;