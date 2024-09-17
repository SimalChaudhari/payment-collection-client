import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Divider } from '@mui/material';

const ViewAddressDialog = ({ open, onClose, address }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>View Address</DialogTitle>
            <Divider />
            <DialogContent>
                {/* City */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6">
                        <strong>City:</strong> {address?.city || 'N/A'}
                    </Typography>
                </Box>
                
                {/* Areas */}
                <Box sx={{ mt: 2, mb: 2 }}>
                    <Typography variant="h6"><strong>Areas:</strong></Typography>
                    {address?.areas?.length > 0 ? (
                        <ul className='list-disc pl-4' style={{ paddingLeft: '20px', marginTop: '10px' }}>
                            {address?.areas.map((area, index) => (
                                <li key={index}>
                                    <Typography variant="body1">{area}</Typography>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            No areas included.
                        </Typography>
                    )}
                </Box>

                {/* Divider */}
                <Divider />

                {/* Other address details can be added here if needed */}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="contained">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ViewAddressDialog;
