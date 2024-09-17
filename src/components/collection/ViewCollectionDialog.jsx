import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Divider } from '@mui/material';
import { formatDate } from '../date/DateFormat';
import { Chip } from '@material-tailwind/react';
import { formatIndianCurrency } from '@/utils/formatCurrency';

const ViewCollectionDialog = ({ open, onClose, collection }) => {

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>View Collection</DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body"><strong>Customer Name:</strong> {collection?.customerName?.name || 'N/A'}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1"><strong>City:</strong> {collection?.customerName?.address?.city || 'N/A'}</Typography>
        </Box> <Box sx={{ mb: 2 }}>
          <Typography variant="body1"><strong>Area:</strong> {collection?.customerName?.address?.areas || 'N/A'}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1"><strong>Amount:</strong>  {formatIndianCurrency(collection?.amount) || 'N/A'}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1"><strong>Payment Date:</strong> {formatDate(collection?.date) || 'N/A'}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" className='flex'><strong>Accepted Date:</strong>
            {collection?.statusUpdatedAt ? formatDate(collection?.statusUpdatedAt) :
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
              color={collection?.customerVerify === "Accepted" ? "green" : collection?.customerVerify === "Rejected" ? "red" : "gray"}
              value={collection?.customerVerify === "Accepted" ? "Accepted" : collection?.customerVerify === "Rejected" ? "Rejected" : "Pending"}
              className="py-0.5 ml-2 px-2 text-[11px] font-medium w-fit"

            />

          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1"><strong>Reason: </strong> {collection?.reason || 'N/A'}</Typography>
        </Box>


      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewCollectionDialog;
