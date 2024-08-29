import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from  '@mui/material';
import { salesman, salesmanDelete } from '@/store/action/salesman.action';
import { useDispatch } from 'react-redux';

const DeleteSalespersonDialog = ({ open, onClose, onDeleteSalesman}) => {

  const dispatch = useDispatch();

  const fetchData = async () => {
    await dispatch(salesman());
  };

  const handleDelete = async() => {
    const res =  await dispatch(salesmanDelete(onDeleteSalesman))
    if(res){
      onClose()
      fetchData()
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Salesman</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this salesman?</Typography>
      </DialogContent>
      <DialogActions>
        <Button color="red" onClick={handleDelete}>Delete</Button>
        <Button color="gray" onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteSalespersonDialog;
