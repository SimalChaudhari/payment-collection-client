import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography, Chip
} from "@material-tailwind/react";
import { paymentHistory } from '@/store/action/payment.action';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@/components/pagination/pagination';
import { formatDate, formatTime } from '@/components/date/DateFormat';
import { formatIndianCurrency } from '@/utils/formatCurrency';
import { EyeIcon } from '@heroicons/react/24/solid';
import ViewPaymentsDialog from '@/components/payments/ViewPaymentsDialog';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const PAGE_SIZE = 10;

const Payment = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const [selectedPaymentId, setSelectedPaymentId] = useState(null);


  const dispatch = useDispatch()

  const paymentsData = useSelector((state) => state.paymentReducer.paymentHistory);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(paymentHistory());
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs only once when the component mounts.


  const sortedData = [...paymentsData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


  const filteredData = sortedData.filter(pay =>
    pay.salesman?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pay.customerName?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pay.customerName?.address?.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pay.customerName?.address?.areas.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pay.amount.toString().toLowerCase().includes(searchQuery.toLowerCase())
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOpenViewDialog = (id) => {
    setSelectedPaymentId(id);
    setViewDialogOpen(true);
  };
  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
  };

  const getPaymentById = (id) => {
    return paymentsData?.find(pay => pay._id === id);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Payments List
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
                  {["SNo", "Salesman Name", "Customer Name", "Amount", "City", "Area", "Reason", "Status", "Actions"].map((el) => (
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
                {currentData?.map((payment, key) => {
                  const { _id, salesman, customerName, amount, reason, customerVerify } = payment;
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
                          {salesman?.name || "NA"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-sm font-normal text-blue-gray-500">
                          {customerName?.name || "NA"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-sm font-normal text-blue-gray-500">
                          {formatIndianCurrency(amount) || "NA"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-sm font-normal text-blue-gray-500">
                          {customerName?.address?.city || "NA"}
                        </Typography>
                      </td> <td className={className}>
                        <Typography className="text-sm font-normal text-blue-gray-500">
                          {customerName?.address?.areas || "NA"}
                        </Typography>
                      </td>

                      <td className={className}>
                        <Typography className="text-sm font-normal text-blue-gray-500 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">

                          {reason || "NA"}
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
                        <div className="flex gap-2 flex-wrap">
                          <div
                            className="cursor-pointer"
                            onClick={() => handleOpenViewDialog(_id)}
                          >
                            <EyeIcon className="h-5 w-5 text-blue-500 hover:text-blue-700" />
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
      <ViewPaymentsDialog
        open={viewDialogOpen}
        onClose={handleCloseViewDialog}
        payment={getPaymentById(selectedPaymentId)}
      />

    </div>
  );
};

export default Payment;
