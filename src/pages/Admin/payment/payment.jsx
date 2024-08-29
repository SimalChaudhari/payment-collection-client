import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,Chip
} from "@material-tailwind/react";
import { paymentHistory } from '@/store/action/payment.action';
import { useDispatch, useSelector } from 'react-redux';

const PAGE_SIZE = 5;

const Payment = () => {

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch()

  const paymentsData = useSelector((state) => state.paymentReducer.paymentHistory);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(paymentHistory());
    };
  
    fetchData();
  }, []); // Empty dependency array ensures it runs only once when the component mounts.

  const formatDateTime = (isoDate) => {
    const dateObj = new Date(isoDate);
    return `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
  };
  
  const totalPages = Math.ceil(paymentsData.length / PAGE_SIZE);

  const currentData = paymentsData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
 
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const range = 2; // Number of page buttons before and after current page

    for (let i = 1; i <= totalPages; i++) {
      if (i <= range || i > totalPages - range || (i >= currentPage - range && i <= currentPage + range)) {
        pages.push(i);
      } else if (i === range + 1 || i === totalPages - range) {
        pages.push('...');
      }
    }
    return pages;
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Payment List
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Salesman Name", "Customer Name", "Amount", "Date","Status"].map((el) => (
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
              {currentData?.map((payment, key) => {
                const { _id, salesman,customerName, amount, date,customerVerify } = payment;
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
                        {salesman?.name || "NA"}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {customerName?.name || "NA"}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {amount}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {formatDateTime(date)}
                      </Typography>
                    </td>
                    <td className={className}>
                    <Chip
                          variant="gradient"
                          color={customerVerify === true  ? "green" : "red"}
                          value={customerVerify === true  ? "Success" : "Pending"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                  </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <div className="flex flex-wrap justify-between items-center p-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-white rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <div className="flex flex-wrap gap-2 overflow-x-auto">
            {generatePageNumbers().map((page, index) => 
              page === '...' ? (
                <span key={index} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700">
                  {page}
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === page
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-white rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Payment;
