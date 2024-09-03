import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";
import AddCollectionDialog from '@/components/collection/AddCollectionDialog';
import EditCollectionDialog from '@/components/collection/EditCollectionDialog';
import ViewCollectionDialog from '@/components/collection/ViewCollectionDialog';
import DeleteCollectionDialog from '@/components/collection/DeleteCollectionDialog';
import { useDispatch, useSelector } from 'react-redux';
import { collection } from '@/store/action/collection.action';
import Pagination from '@/components/pagination/pagination';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { formatDate, formatTime } from '@/components/date/DateFormat';

const PAGE_SIZE = 10;

const Collection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  const dispatch = useDispatch()

  const collectionData = useSelector((state) => state.collectionReducer.collectionList)


  useEffect(() => {
    const fetchData = async () => {
      await dispatch(collection());
    };

    fetchData();
  }, [dispatch]); // Empty dependency array ensures it runs only once when the component mounts.

  const sortedData = [...collectionData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filteredData = sortedData.filter(collect =>
    collect.customerName?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collect.amount.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );


  // Update page number and current data when search query changes
  useEffect(() => {
    setCurrentPage(1); // Reset page to 1 when search query changes
  }, [searchQuery]);


  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  const currentData = filteredData.slice(
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
            Collections List
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
        <div className="px-6 py-4 flex max-sm:justify-center md:justify-end">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
          {currentData.length === 0 ? (
            <Typography className="text-center py-4">No data found</Typography>
          ) : (
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["SNo", "Customer Name", "Amount", "Create Date", "Status", "Completion Date", "Action"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentData.map((collection, key) => {
                  const { _id, customerName, amount, customerVerify, date,statusUpdatedAt } = collection;
                  const className = `py-3 px-5 ${key === currentData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                    }`;

                  return (
                    <tr key={_id}>
                      <td className={className}>
                        <Typography
                          className="text-sm font-normal text-blue-gray-500"
                        >
                          {(currentPage - 1) * PAGE_SIZE + key + 1}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          className="text-sm font-normal text-blue-gray-500"
                        >
                          {customerName?.name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-sm font-normal text-blue-gray-500">
                          {amount}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-sm font-normal text-blue-gray-500">
                          {formatDate(date)}
                        </Typography>
                      </td>
                      <td className={className}>
                      <Chip
                        variant="gradient"
                        color={customerVerify === "Accepted" ? "green" : customerVerify === "Rejected" ? "red" : "gray"}
                        value={customerVerify === "Accepted" ? "Accepted" : customerVerify === "Rejected" ? "Rejected" : "Pending"}
                        className="py-0.5 px-2 text-[11px] font-medium w-fit"
                      />
                    </td>
                  
                     
                      <td className={className}>
                        <Typography className="text-sm font-normal text-blue-gray-500">
                          {statusUpdatedAt ? formatDate(statusUpdatedAt) :
                            <Chip
                              variant="gradient"
                              color={"blue"}
                              value={"In Progress"}
                              className="py-0.5 px-2 text-[11px] font-medium w-fit"
                            />
                          }
                        </Typography>
                      </td>

                      <td className={className}>
                        <div className="flex gap-2 flex-wrap">
                          <div
                            className="cursor-pointer"
                            onClick={() => handleOpenViewDialog(_id)}
                          >
                            <EyeIcon className="h-5 w-5 text-blue-500 hover:text-blue-700" />
                          </div>
                          {customerVerify === "Pending" &&

                            <div
                              className="cursor-pointer"
                              onClick={() => handleOpenEditDialog(_id)}
                            >
                              <PencilSquareIcon className="h-5 w-5 text-yellow-500 hover:text-yellow-700" />
                            </div>
                          }
                          <div
                            className="cursor-pointer"
                            onClick={() => handleOpenDeleteDialog(_id)}
                          >
                            <TrashIcon className="h-5 w-5 text-red-500 hover:text-red-700" />
                          </div>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>
        {currentData.length === 0 ? null : (
          <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            <Typography className="text-xs font-normal text-blue-gray-500">
              Page {currentPage} of {totalPages}
            </Typography>
          </div>
        )}
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
