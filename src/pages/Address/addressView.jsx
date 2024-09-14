import React, { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Tooltip
} from "@material-tailwind/react";
import AddAddressDialog from '@/components/address/AddAddressDialog';
import EditAddressDialog from '@/components/address/EditAddressDialog';
import ViewAddressDialog from '@/components/address/ViewAddressDialog';
import DeleteAddressDialog from '@/components/address/DeleteAddressDialog';

import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@/components/pagination/pagination';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { fetchAddress } from '@/store/action/address.action';

const PAGE_SIZE = 10;

const ViewAddress = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const dispatch = useDispatch();
    const addressData = useSelector((state) => state.addressReducer.address || []);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchAddress());
        };

        fetchData();
    }, [dispatch]);

    const sortedData = [...addressData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const filteredData = sortedData.filter(address =>
        address.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        address?.areas.some(area => area.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    useEffect(() => {
        setCurrentPage(1);
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
        setSelectedAddressId(id);
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
    };

    const handleOpenViewDialog = (id) => {
        setSelectedAddressId(id);
        setViewDialogOpen(true);
    };

    const handleCloseViewDialog = () => {
        setViewDialogOpen(false);
    };

    const handleOpenDeleteDialog = (id) => {
        setSelectedAddressId(id);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
    };

    const getAddressById = (id) => {
        return addressData.find(address => address._id === id);
    };

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
                    <Typography variant="h6" color="white">
                        Address List
                    </Typography>
                    <Button
                        color="light-blue"
                        size="sm"
                        className="ml-auto"
                        onClick={handleOpenAddDialog}
                    >
                        Add Address
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
                                    {["SNo", "City", "Areas", "Actions"].map((el) => (
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
                                {currentData.map((address, key) => {
                                    const { _id, city, areas } = address;
                                    const className = `py-3 px-5 ${key === currentData.length - 1
                                        ? ""
                                        : "border-b border-blue-gray-50"
                                        }`;

                                    return (
                                        <tr
                                            key={_id}
                                            className={`cursor-pointer ${selectedAddressId === _id ? 'bg-gray-100' : ''}`}
                                            onClick={() => setSelectedAddressId(selectedAddressId === _id ? null : _id)}
                                        >
                                            <td className={className}>
                                                <Typography
                                                    className="text-sm font-normal text-blue-gray-500">
                                                    {(currentPage - 1) * PAGE_SIZE + key + 1}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    className="text-sm font-normal text-blue-gray-500">
                                                    {city}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                {selectedAddressId === _id ? (
                                                    <Typography className="text-sm font-normal text-blue-gray-500">
                                                        {areas.join(', ')}
                                                    </Typography>
                                                ) : (
                                                    <Tooltip
                                                        content={areas.join('\n')}
                                                        placement="top"
                                                        className="cursor-pointer"
                                                    >
                                                        <Typography className="text-sm font-normal text-blue-gray-500">
                                                            {`${areas.length} Areas`}
                                                        </Typography>
                                                    </Tooltip>
                                                )}
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

            <AddAddressDialog
                open={dialogOpen}
                onClose={handleCloseAddDialog}
            />

            <EditAddressDialog
                open={editDialogOpen}
                onClose={handleCloseEditDialog}
                addressId={getAddressById(selectedAddressId)}
            />
            <ViewAddressDialog
                open={viewDialogOpen}
                onClose={handleCloseViewDialog}
                address={getAddressById(selectedAddressId)}
            />
            <DeleteAddressDialog
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                onDeleteAddress={selectedAddressId}
            />
        </div>
    );
};

export default ViewAddress;
