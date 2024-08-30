import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import AddCollectionDialog from '@/components/collection/AddCollectionDialog';
import EditCollectionDialog from '@/components/collection/EditCollectionDialog';
import ViewCollectionDialog from '@/components/collection/ViewCollectionDialog';
import DeleteCollectionDialog from '@/components/collection/DeleteCollectionDialog';
import { useDispatch, useSelector } from 'react-redux';
import { collection } from '@/store/action/collection.action';

const PAGE_SIZE = 5;

const Collection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  

  const dispatch = useDispatch()

  const collectionData = useSelector((state) => state.collectionReducer.collectionList);
 
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(collection());
    };
  
    fetchData();
  }, []); // Empty dependency array ensures it runs only once when the component mounts.
  
  const totalPages = Math.ceil(collectionData?.length / PAGE_SIZE);

  const currentData = collectionData?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenAddDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenEditDialog = (id) => {
    setSelectedCollectionId(id);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleOpenViewDialog = (id) => {
    setSelectedCollectionId(id);
    setViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
  };

  const handleOpenDeleteDialog = (id) => {
    setSelectedCollectionId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleAddCollection = (newCollection) => {
    // Logic to add the new Collection
    console.log('New Collection:', newCollection);
    handleCloseAddDialog();
  };

  const handleEditCollection = (updatedCollection) => {
    // Logic to update the Collection by ID
    console.log('Updated Collection:', updatedCollection);
    // handleCloseEditDialog();
  };

  const handleDeleteCollection = () => {
    handleCloseDeleteDialog();
  };

  const getCollectionById = (id) => {
    return collectionData.find(collection => collection._id === id);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Collection List
          </Typography>
          <Button
            color="light-blue"
            size="sm"
            className="ml-auto"
            onClick={handleOpenAddDialog}
          >
            Add Collection
          </Button>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["SNo","Customer Name", "Amount", "Date", "Actions"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((collection, key) => {
                const { _id, customerName, amount, date } = collection;
                const className = `py-3 px-5 ${
                  key === currentData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={_id}>
                  <td className={className}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold"
                  >
                    {(currentPage - 1) * PAGE_SIZE + key + 1}
                  </Typography>
                  </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {customerName?.name}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {amount}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {new Date(date).toISOString().split('T')[0]}
                      </Typography>
                    </td>
                  
                    <td className={className}>
                      <div className="flex gap-2">
                        <Button
                          color="light-blue"
                          size="sm"
                          onClick={() => handleOpenViewDialog(_id)}
                        >
                          View
                        </Button>
                        <Button
                          color="light-blue"
                          size="sm"
                          onClick={() => handleOpenEditDialog(_id)}
                        >
                          Edit
                        </Button>
                        <Button
                          color="red"
                          size="sm"
                          onClick={() => handleOpenDeleteDialog(_id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                color={currentPage === i + 1 ? "light-blue" : "gray"}
                size="sm"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Typography className="text-xs font-normal text-blue-gray-500">
            Page {currentPage} of {totalPages}
          </Typography>
        </div>
      </Card>

      <AddCollectionDialog
        open={dialogOpen}
        onClose={handleCloseAddDialog}
       />

      <EditCollectionDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        collectionData={getCollectionById(selectedCollectionId)}
    
      />

      <ViewCollectionDialog
        open={viewDialogOpen}
        onClose={handleCloseViewDialog}
        collection={getCollectionById(selectedCollectionId)}
      />

      <DeleteCollectionDialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onDeleteCollection={selectedCollectionId}
      />
    </div>
  );
};

export default Collection;
