import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import AddCustomerDialog from '@/components/customer/AddCustomerDialog';
import EditCustomerDialog from '@/components/customer/EditCustomerDialog';
import ViewCustomerDialog from '@/components/customer/ViewCustomerDialog';
import DeleteCustomerDialog from '@/components/customer/DeleteCustomerDialog';
import { customer } from '@/store/action/customer.action';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@/components/pagination/pagination';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { addCountryCode } from '@/utils/addCountryCode';

const PAGE_SIZE = 10;

const View = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();

  const customersData = useSelector((state) => state.customerReducer.customer);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(customer());
    };

    fetchData();
  }, [dispatch]);
  // Sort customers by creation date or a relevant field
  const sortedData = [...customersData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


  const filteredData = sortedData.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.address?.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.address?.areas.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Update page number and current data when search query changes
  useEffect(() => {
    setCurrentPage(1); // Reset page to 1 when search query changes
  }, [searchQuery]);

  // Calculate total pages and current data slice
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const currentData = filteredData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle dialog opening and closing
  const handleOpenAddDialog = () => setDialogOpen(true);
  const handleCloseAddDialog = () => setDialogOpen(false);
  const handleOpenEditDialog = (id) => {
    setSelectedCustomerId(id);
    setEditDialogOpen(true);
  };
  const handleCloseEditDialog = () => setEditDialogOpen(false);
  const handleOpenViewDialog = (id) => {
    setSelectedCustomerId(id);
    setViewDialogOpen(true);
  };
  const handleCloseViewDialog = () => setViewDialogOpen(false);
  const handleOpenDeleteDialog = (id) => {
    setSelectedCustomerId(id);
    setDeleteDialogOpen(true);
  };
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  // Get customer by ID
  const getCustomerById = (id) => {
    return customersData.find(customer => customer._id === id);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Customers List
          </Typography>
          <Button
            color="light-blue"
            size="sm"
            className="ml-auto"
            onClick={handleOpenAddDialog}
          >
            Add Customer
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
                  {["SNo", "Name", "Email", "Mobile", "City", "Area", "Actions"].map((el) => (
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
                {currentData.map((customer, key) => {
                  const { _id, name, email, mobile, address } = customer;
                  const className = `py-3 px-5 ${key === currentData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                    }`;

                  return (
                    <tr key={_id}>
                      <td className={className}>
                        <Typography
                          className="text-sm font-normal text-blue-gray-500">
                          {(currentPage - 1) * PAGE_SIZE + key + 1}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          className="text-sm font-normal text-blue-gray-500">
                          {name || "NA"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-sm font-normal text-blue-gray-500">
                          {email || "NA"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-sm font-normal text-blue-gray-500">
                          {addCountryCode(mobile) || "NA"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-sm font-normal text-blue-gray-500">
                          {address?.city || "NA"}
                        </Typography>
                      </td> <td className={className}>
                        <Typography className="text-sm font-normal text-blue-gray-500">
                          {address?.areas || "NA"}
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

      <AddCustomerDialog
        open={dialogOpen}
        onClose={handleCloseAddDialog}
      />

      <EditCustomerDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        customerData={getCustomerById(selectedCustomerId)}
      />

      <ViewCustomerDialog
        open={viewDialogOpen}
        onClose={handleCloseViewDialog}
        customer={getCustomerById(selectedCustomerId)}
      />

      <DeleteCustomerDialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onDeleteCustomer={selectedCustomerId}
      />
    </div>
  );
};

export default View;
