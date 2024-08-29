import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from  '@mui/material';
import { customer, customerDelete } from '@/store/action/customer.action';
import { useDispatch } from 'react-redux';

const DeleteCustomerDialog = ({ open, onClose, onDeleteCustomer }) => {

  const dispatch = useDispatch();

  const fetchData = async () => {
    await dispatch(customer());
  };

  const handleDelete = async() => {
    const res =  await dispatch(customerDelete(onDeleteCustomer))
    if(res){
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
        <Button color="red" onClick={handleDelete}>Delete</Button>
        <Button color="gray" onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCustomerDialog;
