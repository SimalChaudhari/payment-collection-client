import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { salesman, salesmanDelete } from '@/store/action/salesman.action';
import { useDispatch } from 'react-redux';

const DeleteSalespersonDialog = ({ open, onClose, onDeleteSalesman }) => {

  const dispatch = useDispatch();

  const fetchData = async () => {
    await dispatch(salesman());
  };

  const handleDelete = async () => {
    const res = await dispatch(salesmanDelete(onDeleteSalesman))
    if (res) {
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

export default DeleteSalespersonDialog;
