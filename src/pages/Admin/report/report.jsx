import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
  Tooltip
} from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { reportSummary } from '@/store/action/report.action';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Pagination from '@/components/pagination/pagination';
import { FaDownload } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { formatDate } from '@/components/date/DateFormat';
import { formatIndianCurrency } from '@/utils/formatCurrency';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const PAGE_SIZE = 10;

const Report = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const reportData = useSelector((state) => state.reportReducer.reportSummary);

  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedSalesman, setSelectedSalesman] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    dispatch(reportSummary());
  }, [dispatch]);

  const handleFilter = () => {
    let filteredData = reportData;

    if (selectedCustomer) {
      filteredData = filteredData.filter(report => report.customerName?.name === selectedCustomer);
    }

    if (selectedSalesman) {
      filteredData = filteredData.filter(report => report.salesman?.name === selectedSalesman);
    }

    if (startDate && endDate) {
      filteredData = filteredData.filter(report => {
        const reportDate = new Date(report.date);
        return reportDate >= startDate && reportDate <= endDate;
      });
    }


    if (searchQuery) {
      filteredData = filteredData.filter(report =>
        report.customerName?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.salesman?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.customerName?.address?.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.customerName?.address?.areas.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.amount.toString().toLowerCase().includes(searchQuery.toLowerCase())

      );
    }


    return filteredData;
  };

  const filteredData = handleFilter();
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  const currentData = filteredData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );


  // Update page number and current data when search query changes
  useEffect(() => {
    setCurrentPage(1); // Reset page to 1 when search query changes
  }, [searchQuery]);


  const formatDateTime = (isoDate) => {
    const dateObj = new Date(isoDate);
    return `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const downloadAllReports = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData.map((report, index) => ({
      "SNo": index + 1,
      "Salesman Name": report.salesman?.name || "NA",
      "Customer Name": report.customerName?.name || "NA",
      "Customer City": report.customerName?.address?.city || "NA",
      "Customer Area": report.customerName?.address?.areas || "NA",
      "Amount": formatIndianCurrency(report.amount) || "NA",
      "Date": formatDate(report.date) || "NA",
      "Accepted Date": formatDate(report.statusUpdatedAt) || "NA",

    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");
    XLSX.writeFile(workbook, "Reports.xlsx");
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Reports
          </Typography>
          <div className="flex space-x-4">
            <Tooltip content="Download">
              <IconButton
                onClick={downloadAllReports}
                variant="gradient"
                color="green"
              >
                <FaDownload />
              </IconButton>
            </Tooltip>
          </div>
        </CardHeader>
        <div className="p-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">

          {/* Customer and Salesman Selection Dropdown */}
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full">
            <div className="relative w-full md:max-w-[200px]">
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="peer h-full w-full rounded-md border border-gray-300 bg-transparent px-3 py-2.5 text-sm text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">All Customers</option>
                {reportData.map((report, index) => (
                  <option key={index} value={report.customerName?.name}>
                    {report.customerName?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative w-full md:max-w-[200px]">
              <select
                value={selectedSalesman}
                onChange={(e) => setSelectedSalesman(e.target.value)}
                className="peer h-full w-full rounded-md border border-gray-300 bg-transparent px-3 py-2.5 text-sm text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">All Salesman</option>
                {reportData.map((report, index) => (
                  <option key={index} value={report.salesman?.name}>
                    {report.salesman?.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Picker */}
            <div id="date-range-picker" className="flex items-center">
              <div className="relative">
                <div className="absolute z-20 inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholderText="Select date start"
                />
              </div>
              <span className="mx-4 text-gray-500">to</span>
              <div className="relative">
                <div className="absolute z-20 inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholderText="Select date end"
                />
              </div>
            </div>
          </div>

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
                  {["SNo", "Salesman Name", "Customer Name", "Amount", "City", "Area", "Payment Date", "Accepted Date"].map((el) => (
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
                {currentData.map((payment, key) => {
                  const { _id, salesman, customerName, amount, date, statusUpdatedAt } = payment;
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
                      </td>
                      <td className={className}>
                        <Typography className="text-sm font-normal text-blue-gray-500">
                          {customerName?.address?.areas || "NA"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-sm font-normal text-blue-gray-500">
                          {formatDate(date)}
                        </Typography>
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

export default Report;
