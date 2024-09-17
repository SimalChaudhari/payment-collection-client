import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Divider } from '@mui/material';
import { formatDate } from '../date/DateFormat';
import { Chip } from '@material-tailwind/react';
import { formatIndianCurrency } from '@/utils/formatCurrency';

const ViewPaymentsDialog = ({ open, onClose, payment }) => {

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>View Payment Details</DialogTitle>
            <Divider />
            <DialogContent>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1"><strong>Salesman Name:</strong> {payment?.salesman?.name || 'N/A'}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1"><strong>Customer Name:</strong> {payment?.customerName?.name || 'N/A'}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1"><strong>City:</strong> {payment?.customerName?.address?.city || 'N/A'}</Typography>
                </Box> <Box sx={{ mb: 2 }}>
                    <Typography variant="body1"><strong>Area:</strong> {payment?.customerName?.address?.areas || 'N/A'}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1"><strong>Amount:</strong> {formatIndianCurrency(payment?.amount) || 'N/A'}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1"><strong>Payment Date:</strong> {formatDate(payment?.date) || 'N/A'}</Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1"  className='flex'><strong>Accepted Date:</strong> 
                     {payment?.statusUpdatedAt ? formatDate(payment?.statusUpdatedAt) :
                        <Chip
                            variant="gradient"
                            color={"black"}
                            value={"Pending"}
                            className="py-0.5  ml-2 px-2 text-[11px] font-medium w-fit"
                        />
                    }</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" className='flex'><strong>Status: </strong>
                        <Chip
                            variant="gradient"
                            color={payment?.customerVerify === "Accepted" ? "green" : payment?.customerVerify === "Rejected" ? "red" : "gray"}
                            value={payment?.customerVerify === "Accepted" ? "Accepted" : payment?.customerVerify === "Rejected" ? "Rejected" : "Pending"}
                            className="py-0.5 ml-2 px-2 text-[11px] font-medium w-fit"

                        />

                    </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1"><strong>Reason: </strong> {payment?.reason || 'N/A'}</Typography>
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="contained">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ViewPaymentsDialog;
