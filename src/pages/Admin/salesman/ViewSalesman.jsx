
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import AddSalespersonDialog from '@/components/salesperson/AddSalespersonDialog ';
import EditSalespersonDialog from '@/components/salesperson/EditSalespersonDialog';
import ViewSalespersonDialog from '@/components/salesperson/ViewSalespersonDialog';
import DeleteSalespersonDialog from '@/components/salesperson/DeleteSalespersonDialog ';

import { salesman } from '@/store/action/salesman.action';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@/components/pagination/pagination';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';



const PAGE_SIZE = 10;

const ViewSalesman = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSalesmanId, setSelectedSalesmanId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch()

  const salesmanData = useSelector((state) => state.salesmanReducer.salesman);
  
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(salesman());
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs only once when the component mounts.

   // Sort customers by creation date or a relevant field
   const sortedData = [...salesmanData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filteredData = sortedData.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.mobile.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Update page number and current data when search query changes
  useEffect(() => {
    setCurrentPage(1); // Reset page to 1 when search query changes
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredData?.length / PAGE_SIZE);

  const currentData = filteredData?.slice(
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
    setSelectedSalesmanId(id);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleOpenViewDialog = (id) => {
    setSelectedSalesmanId(id);
    setViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
  };

  const handleOpenDeleteDialog = (id) => {
    setSelectedSalesmanId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };


  const getSalesmanById = (id) => {
    return salesmanData?.find(salesman => salesman._id === id);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Salesman's List
          </Typography>
          <Button
            color="light-blue"
            size="sm"
            className="ml-auto"
            onClick={handleOpenAddDialog}
          >
            Add Salesman
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
                  {["SNo", "Name", "Email", "Mobile", "Actions"].map((el) => (
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
                {currentData?.map((salesman, key) => {
                  const { _id, name, email, mobile } = salesman;
                  const className = `py-3 px-5 ${key === currentData.length - 1
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
                          {name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {email}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {mobile}
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
                          <div
                            className="cursor-pointer"
                            onClick={() => handleOpenEditDialog(_id)}
                          >
                            <PencilSquareIcon className="h-5 w-5 text-yellow-500 hover:text-yellow-700" />
                          </div>
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

      <AddSalespersonDialog
        open={dialogOpen}
        onClose={handleCloseAddDialog}
      />

      <EditSalespersonDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        salesmanData={getSalesmanById(selectedSalesmanId)}

      />

      <ViewSalespersonDialog
        open={viewDialogOpen}
        onClose={handleCloseViewDialog}
        salesman={getSalesmanById(selectedSalesmanId)}
      />

      <DeleteSalespersonDialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onDeleteSalesman={selectedSalesmanId}
      />
    </div>
  );
};

export default ViewSalesman;

