import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from  '@mui/material';
import { collection, collectionDelete } from '@/store/action/collection.action';
import { useDispatch } from 'react-redux';

const DeleteCollectionDialog = ({ open, onClose, onDeleteCollection }) => {

  const dispatch = useDispatch();

  const fetchData = async () => {
    await dispatch(collection());
  };

  const handleDelete = async() => {
    const res =  await dispatch(collectionDelete(onDeleteCollection))
    if(res){
      onClose()
      fetchData()
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Collection</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this Amount?</Typography>
      </DialogContent>
      <DialogActions>
        <Button color="red" onClick={handleDelete}>Delete</Button>
        <Button color="gray" onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCollectionDialog;
