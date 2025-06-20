import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import BackButton from '../Common/BackButton';

const RequestHistory: React.FC = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <BackButton />
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          background: 'transparent', 
          mb: 4, 
          borderRadius: 2 
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            mb: 1 
          }}
        >
          Request History
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          View your past requests and their status
        </Typography>
      </Paper>
      {/* Add your request history list/table here */}
    </Box>
  );
};

export default RequestHistory; 