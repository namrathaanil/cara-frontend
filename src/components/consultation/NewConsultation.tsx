import React, { useState } from 'react';
// NewConsultation component for creating new compliance consultations
import {
  Box,
  Typography,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  ArrowBack,
  ArrowForward,
  Search,
  Policy,
  BusinessCenter,
  Gavel,
  Security,
  Assessment,
  DataUsage,
  Delete,
  InsertDriveFile,
  Image,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface ConsultationData {
  topic: string;
  description: string;
  attachedFiles: File[];
}

const NewConsultation: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [consultationData, setConsultationData] = useState<ConsultationData>({
    topic: '',
    description: '',
    attachedFiles: [],
  });
  const [searchQuery, setSearchQuery] = useState('');

  const steps = ['Select Topic', 'Provide Details', 'Review & Submit'];

  const popularChoices = [
    { icon: <Policy />, label: 'Cloud Hosting Policy', value: 'cloud-hosting-policy' },
    { icon: <BusinessCenter />, label: 'Onboarding Process', value: 'onboarding-process' },
    { icon: <Gavel />, label: 'GDPR Compliance', value: 'gdpr-compliance' },
    { icon: <Security />, label: 'AI Model Usage', value: 'ai-model-usage' },
    { icon: <DataUsage />, label: 'Data Breach Response', value: 'data-breach-response' },
    { icon: <Assessment />, label: 'HIPAA Regulations', value: 'hipaa-regulations' },
  ];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // In a real app, this would submit the consultation
      alert('Consultation submitted! (This would normally start the chat session)');
      navigate('/');
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleTopicSelect = (value: string, label: string) => {
    setConsultationData({ ...consultationData, topic: label });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setConsultationData({
        ...consultationData,
        attachedFiles: [...consultationData.attachedFiles, ...newFiles],
      });
    }
  };

  const removeFile = (index: number) => {
    const newFiles = consultationData.attachedFiles.filter((_, i) => i !== index);
    setConsultationData({ ...consultationData, attachedFiles: newFiles });
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
              What product, process, or regulation are you seeking advice on?
            </Typography>
            
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search (e.g., GDPR, Cloud Hosting, Data Privacy)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{ mb: 4 }}
            />

            <Typography variant="h6" sx={{ mb: 2 }}>
              Popular choices
            </Typography>
            
            <Grid container spacing={2}>
              {popularChoices.map((choice) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={choice.value}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      border: consultationData.topic === choice.label ? 2 : 1,
                      borderColor: consultationData.topic === choice.label ? 'primary.main' : 'grey.300',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <CardActionArea onClick={() => handleTopicSelect(choice.value, choice.label)}>
                      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ color: 'primary.main' }}>{choice.icon}</Box>
                        <Typography>{choice.label}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {consultationData.topic && (
              <Box sx={{ mt: 3 }}>
                <Chip
                  label={`Selected: ${consultationData.topic}`}
                  color="primary"
                  sx={{ fontSize: '1rem', py: 2 }}
                />
              </Box>
            )}
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
              Describe Your Compliance Need
            </Typography>
            
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Clearly explain your compliance question or the advice you're seeking. You can also upload relevant documents or images to provide more context.
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              label="Your Description"
              placeholder="e.g., I need to understand the latest data privacy regulations for financial services in California..."
              value={consultationData.description}
              onChange={(e) => setConsultationData({ ...consultationData, description: e.target.value })}
              sx={{ mb: 4 }}
            />

            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Upload Supporting Documents (Optional)
              </Typography>
              
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadIcon />}
                sx={{ mb: 2 }}
              >
                Browse Files
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                />
              </Button>
              
              <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: 2 }}>
                Accepted formats: PDF, DOC, DOCX, TXT, PNG, JPG (Max 5MB per file)
              </Typography>

              {consultationData.attachedFiles.length > 0 && (
                <List>
                  {consultationData.attachedFiles.map((file, index) => (
                    <ListItem key={index} sx={{ bgcolor: 'grey.50', mb: 1, borderRadius: 1 }}>
                      {file.type.startsWith('image/') ? <Image sx={{ mr: 2 }} /> : <InsertDriveFile sx={{ mr: 2 }} />}
                      <ListItemText
                        primary={file.name}
                        secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => removeFile(index)}>
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
              Review Your Request
            </Typography>
            
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              Please review the information below before starting the consultation.
            </Typography>

            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Product/Process/Regulation
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <Chip label="Product:" />
                <Typography>{consultationData.topic || 'Not selected'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip label="Regulation:" />
                <Typography>GDPR</Typography>
              </Box>
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                {consultationData.description || 'No description provided'}
              </Typography>
            </Paper>

            {consultationData.attachedFiles.length > 0 && (
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Documents
                </Typography>
                <List>
                  {consultationData.attachedFiles.map((file, index) => (
                    <ListItem key={index}>
                      {file.type.startsWith('image/') ? <Image sx={{ mr: 2 }} /> : <InsertDriveFile sx={{ mr: 2 }} />}
                      <ListItemText primary={file.name} />
                      <Button size="small" color="primary">
                        View
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}

            {consultationData.attachedFiles.some(file => file.type.startsWith('image/')) && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Images
                </Typography>
                <Grid container spacing={2}>
                  {consultationData.attachedFiles
                    .filter(file => file.type.startsWith('image/'))
                    .map((file, index) => (
                      <Grid size={{ xs: 6, sm: 3 }} key={index}>
                        <Box
                          sx={{
                            width: '100%',
                            height: 120,
                            bgcolor: 'grey.200',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 1,
                          }}
                        >
                          <Image sx={{ fontSize: 40, color: 'grey.500' }} />
                        </Box>
                      </Grid>
                    ))}
                </Grid>
              </Paper>
            )}
          </Box>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Paper sx={{ p: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ minHeight: 400 }}>
          {getStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button
            variant="contained"
            onClick={handleNext}
            endIcon={activeStep === steps.length - 1 ? null : <ArrowForward />}
            disabled={activeStep === 0 && !consultationData.topic}
          >
            {activeStep === steps.length - 1 ? 'Confirm and Start Consultation' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default NewConsultation;