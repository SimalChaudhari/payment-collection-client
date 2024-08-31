import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography, Chip,
  Button
} from "@material-tailwind/react";
import { paymentVerification, paymentVerified } from '@/store/action/payment.action';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@/components/pagination/pagination';


const PAGE_SIZE = 5;

const PaymentVerify = () => {

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch()

  const paymentsData = useSelector((state) => state.paymentReducer.paymentVerified);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(paymentVerified());
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

  const handleVerification = async (status) => {
    try {
      await dispatch(paymentVerification(id, status));
    } catch (err) {
      console.log("🚀 ~ handleVerification ~ err:", err)

    }
  };

  const handleAccept = async (id) => {
    try {
      const res = await dispatch(paymentVerification(id, "Accepted"));
      if (res) {
        await fetchData();
      }
    } catch (error) {
      console.error("Error handling accept:", error);
    }
  };

  // Handle reject action
  const handleReject = async (id) => {
    try {
      const res = await dispatch(paymentVerification(id, "Rejected"));
      if (res) {
        await fetchData();
      }
    } catch (error) {
      console.error("Error handling reject:", error);
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
      <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
        {currentData.length === 0 ? (
          <Typography className="text-center py-4">No data found</Typography>
        ) : (
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["SNo", "Salesman Name", "Customer Name", "Amount", "Date", "Status", "Action"].map((el) => (
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
                const { _id, salesman, customerName, amount, date, customerVerify } = payment;
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
                        {salesman?.name || "NA"}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {customerName.name}
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
                        color={customerVerify === "Accepted" ? "green" : customerVerify === "Rejected" ? "red" : "gray"}
                        value={customerVerify === "Accepted" ? "Accepted" : customerVerify === "Rejected" ? "Rejected" : "Pending"}
                        className="py-0.5 px-2 text-[11px] font-medium w-fit"
                      />
                    </td>
                    <td className={className}>
                      {customerVerify === "Pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            color="green"
                            onClick={() => handleAccept(_id)}
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            color="red"
                            onClick={() => handleReject(_id)}
                          >
                            Reject
                          </Button>
                        </div>
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
  </div>
);
};

export default PaymentVerify;


