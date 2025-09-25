import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Avatar,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import {
  Send,
  ArrowBack,
  SmartToy,
  Person,
  Description,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { consultationService } from '../../pocketbase/services/pocketbase';
import { useAuth } from '../../pocketbase/services/AuthContext';
import { Consultation } from '../../pocketbase/types/consultation.types';

const ChatContainer = styled(Box)({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#FFFFFF',
});

const ChatHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 4),
  borderBottom: '1px solid #E5E7EB',
  backgroundColor: '#FAFAFA',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const ChatContent = styled(Box)({
  flex: 1,
  padding: '24px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

const ChatInput = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 4),
  borderTop: '1px solid #E5E7EB',
  backgroundColor: '#FAFAFA',
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'flex-end',
}));

const MessageBubble = styled(Paper)<{ isUser?: boolean }>(({ isUser, theme }) => ({
  padding: theme.spacing(2.5, 3),
  maxWidth: '70%',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  backgroundColor: isUser ? '#0A0A0A' : '#F9FAFB',
  color: isUser ? 'white' : '#0A0A0A',
  borderRadius: '18px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  border: isUser ? 'none' : '1px solid #E5E7EB',
  '& .MuiTypography-root': {
    color: isUser ? 'white' : '#0A0A0A',
  },
}));

const MessageContainer = styled(Box)<{ isUser?: boolean }>(({ isUser }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  maxWidth: '80%',
  flexDirection: isUser ? 'row-reverse' : 'row',
}));

const ConsultationInfo = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: '#F0FDF4',
  border: '1px solid #BBF7D0',
  borderRadius: '16px',
}));

const StyledTextField = styled(TextField)({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    borderRadius: '24px',
    backgroundColor: 'white',
    fontSize: '15px',
    '& fieldset': {
      borderColor: '#E5E7EB',
    },
    '&:hover fieldset': {
      borderColor: '#D1D5DB',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0A0A0A',
    },
  },
});

const SendButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#0A0A0A',
  color: 'white',
  width: '48px',
  height: '48px',
  '&:hover': {
    backgroundColor: '#1F2937',
  },
  '&:disabled': {
    backgroundColor: '#E5E7EB',
    color: '#9CA3AF',
  },
}));

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ConsultationChat: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      loadConsultation();
    }
  }, [id]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  const loadConsultation = async () => {
    try {
      setLoading(true);
      const consultationData = await consultationService.getConsultation(id!);
      setConsultation(consultationData as unknown as Consultation);
      
      // Initialize with welcome message
      const welcomeMessage: Message = {
        id: 'welcome',
        content: `Hello! I'm CARA, your AI compliance advisor. I understand you need help with "${consultationData.topic}". Based on your description, I can provide expert guidance on compliance requirements, risk assessment, and best practices. How would you like to start?`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    } catch (err) {
      console.error('Failed to load consultation:', err);
      setError('Failed to load consultation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || sending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setSending(true);

    // Simulate AI response (replace with actual AI integration later)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(userMessage.content),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setSending(false);
    }, 2000);
  };

  // Temporary AI response generator (replace with actual AI integration)
  const generateAIResponse = (userInput: string): string => {
    const responses = [
      "That's a great question about compliance. Let me break this down for you based on current regulations...",
      "I understand your concern. Here are the key compliance considerations you should be aware of:",
      "Based on your consultation topic, I recommend focusing on these critical areas:",
      "Let me provide you with some specific guidance on this compliance matter:",
      "Here's what you need to know about the regulatory requirements in this area:",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)] + " This is a simulated response. AI integration will be implemented in the next phase.";
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) {
    return (
      <ChatContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress size={48} sx={{ color: '#0A0A0A' }} />
        </Box>
      </ChatContainer>
    );
  }

  if (error) {
    return (
      <ChatContainer>
        <Box sx={{ p: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </ChatContainer>
    );
  }

  return (
    <ChatContainer>
      <ChatHeader>
        <IconButton onClick={() => navigate('/consultation')} sx={{ color: '#6B7280' }}>
          <ArrowBack />
        </IconButton>
        <SmartToy sx={{ color: '#0A0A0A', fontSize: 32 }} />
        <Box>
          <Typography fontSize="18px" fontWeight={600} color="#0A0A0A">
            CARA - Compliance Advisor
          </Typography>
          <Typography fontSize="14px" color="#6B7280">
            {consultation?.topic}
          </Typography>
        </Box>
      </ChatHeader>

      <ChatContent ref={chatContentRef}>
        {/* Consultation Info */}
        <ConsultationInfo>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <Description sx={{ color: '#10B981', mt: 0.5 }} />
            <Box>
              <Typography fontSize="14px" fontWeight={600} color="#065F46" mb={1}>
                Consultation Details
              </Typography>
              <Typography fontSize="13px" color="#047857" mb={2}>
                <strong>Topic:</strong> {consultation?.topic}
              </Typography>
              <Typography fontSize="13px" color="#047857" sx={{ whiteSpace: 'pre-wrap' }}>
                <strong>Description:</strong> {consultation?.description}
              </Typography>
            </Box>
          </Box>
        </ConsultationInfo>

        {/* Messages */}
        {messages.map((message) => (
          <MessageContainer key={message.id} isUser={message.isUser}>
            <Avatar sx={{ 
              width: 36, 
              height: 36, 
              backgroundColor: message.isUser ? '#0A0A0A' : '#F0FDF4',
              color: message.isUser ? 'white' : '#10B981'
            }}>
              {message.isUser ? <Person /> : <SmartToy />}
            </Avatar>
            <MessageBubble isUser={message.isUser}>
              <Typography fontSize="15px" sx={{ whiteSpace: 'pre-wrap' }}>
                {message.content}
              </Typography>
              <Typography 
                fontSize="11px" 
                sx={{ 
                  mt: 1, 
                  opacity: 0.7,
                  color: message.isUser ? 'rgba(255,255,255,0.7)' : '#6B7280'
                }}
              >
                {message.timestamp.toLocaleTimeString()}
              </Typography>
            </MessageBubble>
          </MessageContainer>
        ))}

        {/* Loading indicator */}
        {sending && (
          <MessageContainer isUser={false}>
            <Avatar sx={{ width: 36, height: 36, backgroundColor: '#F0FDF4', color: '#10B981' }}>
              <SmartToy />
            </Avatar>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 2 }}>
              <CircularProgress size={16} sx={{ color: '#10B981' }} />
              <Typography fontSize="14px" color="#6B7280">
                CARA is thinking...
              </Typography>
            </Box>
          </MessageContainer>
        )}
      </ChatContent>

      <ChatInput>
        <StyledTextField
          multiline
          maxRows={4}
          placeholder="Ask CARA about compliance requirements, regulations, or best practices..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={sending}
        />
        <SendButton 
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || sending}
        >
          <Send />
        </SendButton>
      </ChatInput>
    </ChatContainer>
  );
};

export default ConsultationChat;