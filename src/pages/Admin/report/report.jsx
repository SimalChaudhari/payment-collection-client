import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { reportSummary } from '@/store/action/report.action';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Pagination from '@/components/pagination/pagination';
import { FaFilePdf, FaFileExcel, FaDownload } from 'react-icons/fa'; // Import icons
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
const PAGE_SIZE = 5;

const Report = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const reportData = useSelector((state) => state.reportReducer.reportSummary);

  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedSalesman, setSelectedSalesman] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(reportSummary());
    };

    fetchData();
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

    return filteredData;
  };

  const filteredData = handleFilter();
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const currentData = filteredData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const formatDateTime = (isoDate) => {
    const dateObj = new Date(isoDate);
    return `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to download a report by its ID
  const downloadReportById = (reportId, payment, format) => {
    const doc = new jsPDF();
  
    // Set the font and size for the title
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(16);
  
    // Add a title
    doc.text("Report Summary", 105, 20, null, null, "center");
  
    // Add a separator line
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);
  
    // Set the font size and style for the content
    doc.setFontSize(12);
    doc.setFont("Helvetica", "bold");
  
    // Payment Information Header
    doc.text("Payment Information", 20, 40);
  
    // Set font size and style for the details
    doc.setFontSize(10);
    doc.setFont("Helvetica", "normal");
  
    // Payment Information Details
    doc.text(`Salesman Name: ${payment.salesman?.name || "NA"}`, 30, 50);
    doc.text(`Customer Name: ${payment.customerName?.name || "NA"}`, 30, 60);
    doc.text(`Amount: $${payment.amount}`, 30, 70);
    doc.text(`Date: ${new Date(payment.date).toLocaleString()}`, 30, 80);
  
    // Add a footer with the report ID
    doc.setFontSize(10);
    doc.setFont("Helvetica", "italic");
    doc.text(`Report ID: ${payment._id}`, 105, 280, null, null, "center");
  
    // Save the document
    doc.save(`report_${payment._id}.pdf`);
  };
  
  const downloadReportExcelById = (reportId, payment, format) => {
    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
  
    // Create an array representing the title, header, and the data
    const ws_data = [
      ["Report Summary"], // Title in the first line
      ["Salesman Name", "Customer Name", "Amount", "Date"], // Headers in the second line
      [payment.salesman?.name || "NA", payment.customerName?.name || "NA", `$${payment.amount}`, new Date(payment.date).toLocaleString()] // Values in the third line
    ];
  
    // Add data to the worksheet
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
  
    // Merge cells for the title to center it across the columns (A1 to D1)
    ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }]; // Merging A1 to D1
  
    // Apply styling for the title (bold and centered)
    ws['A1'].s = {
      font: { bold: true, sz: 16 }, // Bold and larger font size
      alignment: { horizontal: "center", vertical: "center" } // Center alignment
    };
  
    // Optionally, you can apply bold styling to the header row
    ["A2", "B2", "C2", "D2"].forEach(cell => {
      if (!ws[cell]) ws[cell] = {};
      ws[cell].s = {
        font: { bold: true }, // Bold headers
        alignment: { horizontal: "center", vertical: "center" } // Center headers
      };
    });
  
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Report");
  
    // Generate the XLSX file and download it
    const filename = `report_${payment._id}.xlsx`;
    XLSX.writeFile(wb, filename);
  };


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Reports
          </Typography>
          {/* 
          <div className="flex space-x-4">
            <IconButton
              onClick={() => downloadAllReports('pdf')}
              variant="gradient"
              color="red"
            >
              <FaFilePdf />
            </IconButton>
            <IconButton
              onClick={() => downloadAllReports('excel')}
              variant="gradient"
              color="green"
            >
              <FaFileExcel />
            </IconButton>
          </div>
          */}
        </CardHeader>
        <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
          {currentData.length === 0 ? (
            <Typography className="text-center py-4">No data found</Typography>
          ) : (
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["SNo", "Salesman Name", "Customer Name", "Amount", "Date", "Actions"].map((el) => (
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
                {currentData.map((payment, key) => {
                  const { _id, salesman, customerName, amount, date } = payment;
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
                        <div className="flex space-x-2">
                          <IconButton
                            onClick={() => downloadReportById(_id, payment, 'pdf')}
                            variant="gradient"
                            color="red"
                            size="sm"
                          >
                            <FaDownload />
                          </IconButton>
                          <IconButton
                            onClick={() => downloadReportExcelById(_id,payment, 'excel')}
                            variant="gradient"
                            color="green"
                            size="sm"
                          >
                            <FaDownload />
                          </IconButton>
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
    </div>
  );
};

export default Report;
