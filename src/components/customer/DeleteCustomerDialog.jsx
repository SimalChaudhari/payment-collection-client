import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { customer, customerDelete } from '@/store/action/customer.action';
import { useDispatch } from 'react-redux';

const DeleteCustomerDialog = ({ open, onClose, onDeleteCustomer }) => {

  const dispatch = useDispatch();

  const fetchData = async () => {
    await dispatch(customer());
  };
  const handleDelete = async () => {
    const res = await dispatch(customerDelete(onDeleteCustomer))
    if (res) {
      onClose()
      fetchData()
    }
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Customer</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this customer?</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDelete}
          color="primary"
          variant="outlined"
          sx={{
            backgroundColor: 'red',
            color: 'white',
            borderColor: 'red',
            '&:hover': {
              backgroundColor: 'darkred',
              borderColor: 'darkred',
            },
          }}
        >
          Delete
        </Button>

        <Button
          onClick={onClose}
          color="secondary"
          variant="outlined"
          sx={{
            backgroundColor: 'gray',
            color: 'white',
            borderColor: 'gray',
            '&:hover': {
              backgroundColor: 'darkgray',
              borderColor: 'darkgray',
            },
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCustomerDialog;
