import React, { useState } from 'react';
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CardContent,
  CardActionArea,
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
import {
  PageContainer,
  Card,
  PrimaryButton,
  SearchField,
  GridBox,
  FlexBox,
  StepContent,
  FileListItem,
  Section,
} from '../ui';
import { Paper, Button, Box, TextField } from '@mui/material';

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
            
            <SearchField
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
            
            <GridBox columns={3} gap={2}>
              {popularChoices.map((choice) => (
                <Card
                  key={choice.value}
                  selected={consultationData.topic === choice.label}
                  clickable
                >
                  <CardActionArea onClick={() => handleTopicSelect(choice.value, choice.label)}>
                    <CardContent>
                      <FlexBox align="center" gap={2}>
                        <Box sx={{ color: 'primary.main' }}>{choice.icon}</Box>
                        <Typography>{choice.label}</Typography>
                      </FlexBox>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </GridBox>

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
                    <FileListItem key={index}>
                      <FlexBox align="center" style={{ flex: 1 }}>
                        {file.type.startsWith('image/') ? <Image /> : <InsertDriveFile />}
                        <Box sx={{ ml: 2 }}>
                          <Typography>{file.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </Typography>
                        </Box>
                      </FlexBox>
                      <IconButton onClick={() => removeFile(index)}>
                        <Delete />
                      </IconButton>
                    </FileListItem>
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

            <Section>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Product/Process/Regulation
                </Typography>
                <FlexBox align="center" gap={1} style={{ marginBottom: 16 }}>
                  <Chip label="Product:" />
                  <Typography>{consultationData.topic || 'Not selected'}</Typography>
                </FlexBox>
                <FlexBox align="center" gap={1}>
                  <Chip label="Regulation:" />
                  <Typography>GDPR</Typography>
                </FlexBox>
              </Paper>
            </Section>

            <Section>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                  {consultationData.description || 'No description provided'}
                </Typography>
              </Paper>
            </Section>

            {consultationData.attachedFiles.length > 0 && (
              <Section>
                <Paper sx={{ p: 3 }}>
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
              </Section>
            )}

            {consultationData.attachedFiles.some(file => file.type.startsWith('image/')) && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Images
                </Typography>
                <GridBox columns={4} gap={2}>
                  {consultationData.attachedFiles
                    .filter(file => file.type.startsWith('image/'))
                    .map((file, index) => (
                      <Box
                        key={index}
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
                    ))}
                </GridBox>
              </Paper>
            )}
          </Box>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <PageContainer sx={{ maxWidth: 800 }}>
      <Paper sx={{ p: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <StepContent>
          {getStepContent(activeStep)}
        </StepContent>

        <FlexBox justify="space-between" sx={{ pt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
          <PrimaryButton
            variant="contained"
            onClick={handleNext}
            endIcon={activeStep === steps.length - 1 ? null : <ArrowForward />}
            disabled={activeStep === 0 && !consultationData.topic}
          >
            {activeStep === steps.length - 1 ? 'Confirm and Start Consultation' : 'Next'}
          </PrimaryButton>
        </FlexBox>
      </Paper>
    </PageContainer>
  );
};

export default NewConsultation;