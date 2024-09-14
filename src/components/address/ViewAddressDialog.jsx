import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';

const ViewAddressDialog = ({ open, onClose, address }) => {


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>View Address</DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6"><strong>City:</strong> {address?.city || 'N/A'}</Typography>
                </Box>


            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="contained">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ViewAddressDialog;
