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

const PAGE_SIZE = 5;

const View = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const dispatch = useDispatch();

  const customersData = useSelector((state) => state.customerReducer.customer);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(customer());
    };

    fetchData();
  }, [dispatch]);

  const totalPages = Math.ceil(customersData.length / PAGE_SIZE);

  const currentData = customersData.slice(
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
    setSelectedCustomerId(id);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleOpenViewDialog = (id) => {
    setSelectedCustomerId(id);
    setViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
  };

  const handleOpenDeleteDialog = (id) => {
    setSelectedCustomerId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleAddCustomer = (newCustomer) => {
    console.log('New Customer:', newCustomer);
    handleCloseAddDialog();
  };

  const handleEditCustomer = (updatedCustomer) => {
    console.log('Updated Customer:', updatedCustomer);
  };

  const handleDeleteCustomer = () => {
    handleCloseDeleteDialog();
  };

  const getCustomerById = (id) => {
    return customersData.find(customer => customer._id === id);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Customer List
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
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
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
              {currentData.map((customer, key) => {
                const { _id, name, email, mobile } = customer;
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
