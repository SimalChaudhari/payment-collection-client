import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter, Textarea,
  Input
} from "@material-tailwind/react";
import { paymentVerification, paymentVerified } from '@/store/action/payment.action';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@/components/pagination/pagination';
import { formatDate, formatTime } from '@/components/date/DateFormat';
import { TextareaAutosize } from '@mui/material';
import { formatIndianCurrency } from '@/utils/formatCurrency';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const PAGE_SIZE = 10;

const PaymentVerify = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false); // Modal visibility state
  const [rejectionReason, setRejectionReason] = useState(''); // Rejection reason state
  const [rejectPaymentId, setRejectPaymentId] = useState(null); // ID of payment to reject
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const paymentsData = useSelector((state) => state.paymentReducer.paymentVerified);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(paymentVerified());
    };
    fetchData();
  }, [dispatch]);

  const formatDateTime = (isoDate) => {
    const dateObj = new Date(isoDate);
    return `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
  };

  const sortedData = [...paymentsData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filteredData = sortedData.filter(pay =>
    pay.salesman?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pay.customerName?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pay.amount.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1); // Reset page to 1 when search query changes
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const currentData = filteredData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleVerification = async (id, status, reason = '') => {
    try {
      const res = await dispatch(paymentVerification(id, status, reason));
      if (res) {
        await dispatch(paymentVerified()); // Refresh data after verification
      }
    } catch (err) {
      console.log("🚀 ~ handleVerification ~ err:", err);
    }
  };

  const handleAccept = (id) => {
    handleVerification(id, "Accepted");
  };

  const handleReject = (id) => {
    setRejectPaymentId(id);  // Set the payment ID for rejection
    setShowRejectModal(true); // Show the modal for entering reason
  };

  const handleRejectSubmit = () => {
    if (rejectionReason.trim() === '') {
      setError('Reason for rejection is required.');
      return;
    }
    // Clear error message
    setError('');
    handleVerification(rejectPaymentId, "Rejected", rejectionReason);
    setShowRejectModal(false); // Close modal after submission
    setRejectionReason(''); // Reset the reason field
  };

  const handleTextareaChange = (e) => {
    setRejectionReason(e.target.value);

    // Clear the error message when user starts typing
    if (error) {
      setError('');
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Payment Verify List
          </Typography>
        </CardHeader>

        <div className="px-6 py-4 flex max-sm:justify-center md:justify-end">
        <div class="relative flex items-center">
        <MagnifyingGlassIcon className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600" />
        <input
          class="w-full bg-transparent text-sm border border-slate-800 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
        </div>
        <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
          {currentData.length === 0 ? (
            <Typography className="text-center py-4">No data found</Typography>
          ) : (
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["SNo", "Salesman Name", "Customer Name", "City", "Area", "Amount", "Payment Date", "Status", "Accepted Date", "Action"].map((el) => (
                    <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                      <Typography variant="small" color="blue-gray" className="font-bold uppercase">
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentData?.map((payment, key) => {
                  const { _id, salesman, customerName, amount, date, customerVerify, statusUpdatedAt } = payment;
                  const className = `py-3 px-5 ${key === currentData.length - 1 ? "" : "border-b border-blue-gray-50"}`;

                  return (
                    <tr key={_id}>
                      <td className={className}>
                        <Typography className="text-sm font-normal text-blue-gray-500">
                          {(currentPage - 1) * PAGE_SIZE + key + 1}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-sm font-normal text-blue-gray-500">
                          {salesman?.name || "NA"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-sm font-normal text-blue-gray-500">
                          {customerName.name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-sm font-normal text-blue-gray-500">
                          {customerName?.address?.city || "NA"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-sm font-normal text-blue-gray-500">
                          {customerName?.address?.areas || "NA"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-sm font-normal text-blue-gray-500">
                          {formatIndianCurrency(amount)}
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
                          {statusUpdatedAt ? formatDate(statusUpdatedAt) : (
                            <Chip
                              variant="gradient"
                              color={"blue"}
                              value={"In Progress"}
                              className="py-0.5 px-2 text-[11px] font-medium w-fit"
                            />
                          )}
                        </Typography>
                      </td>

                      <td className={className}>
                        {customerVerify === "Pending" ? (
                          <div className="flex gap-2">
                            <Button size="sm" color="green" onClick={() => handleAccept(_id)}>
                              Accept
                            </Button>
                            <Button size="sm" color="red" onClick={() => handleReject(_id)}>
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <Typography className="text-sm font-normal text-blue-gray-500">
                            No action available
                          </Typography>
                        )}
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
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            <Typography className="text-xs font-normal text-blue-gray-500">
              Page {currentPage} of {totalPages}
            </Typography>
          </div>
        )}
      </Card>

      {/* Rejection Reason Modal */}
      <Dialog open={showRejectModal} handler={() => setShowRejectModal(false)}>
        <DialogHeader>Reason for Rejection</DialogHeader>
        <DialogBody>
          <Textarea
            value={rejectionReason}
            label="Reason"
            onChange={handleTextareaChange}

            className="w-96 border border-gray-300 rounded-md focus:outline-none focus:ring-0"

          />
          {error && <Typography className="text-red-500 font-body">{error}</Typography>}
        </DialogBody>
        <DialogFooter className="flex justify-between">
          <Button color="red" onClick={() => setShowRejectModal(false)}>
            Cancel
          </Button>
          <Button color="green" onClick={handleRejectSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default PaymentVerify;
