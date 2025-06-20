import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate('/dashboard')}
      sx={{
        mb: 2,
        color: 'text.primary',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      Back to Dashboard
    </Button>
  );
};

export default BackButton; 