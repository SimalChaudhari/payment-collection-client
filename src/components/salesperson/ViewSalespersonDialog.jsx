import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Divider } from '@mui/material';
import { addCountryCode } from '@/utils/addCountryCode';

const ViewSalespersonDialog = ({ open, onClose, salesman }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>View Salesman</DialogTitle>
      <Divider/>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6"><strong>Name:</strong> {salesman?.name || 'N/A'}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1"><strong>Email:</strong> {salesman?.email || 'N/A'}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1"><strong>Mobile:</strong> {addCountryCode(salesman?.mobile) || 'N/A'}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1"><strong>City:</strong> {salesman?.address?.city || 'N/A'}</Typography>
        </Box>  <Box sx={{ mb: 2 }}>
          <Typography variant="body1"><strong>Area:</strong> {salesman?.address?.areas || 'N/A'}</Typography>
        </Box>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewSalespersonDialog;


