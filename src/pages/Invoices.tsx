import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlineFileUpload } from "react-icons/md";

const Invoices = () => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [admin,isAdmin]=useState<boolean>(false)
  const [filters, setFilters] = useState<any>({
    status: "",
    panCard: "",
    startDate: "",
    endDate: "",
  });

  const navigate = useNavigate()
  
  const handleViewCampaign = () => {
    navigate("/Upload-invoice"); 
};

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const { status, panCard, startDate, endDate } = filters;
        const response = await axios.get("http://localhost:3000/api/v1/invoices", {
          params: {
            page,
            limit,
            status,
            panCard,
            startDate,
            endDate,
          },
          withCredentials: true,
        });

        setInvoices(response.data);
        setTotal(response.data.length);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    
    const fetchuser = async ()=>{
      const response = await axios.get("http://localhost:3000/api/v1/user/getuser",{
        withCredentials:true
      }); 
      if(response.data.admin === true){
        isAdmin(true);
      }
    }
     
    fetchuser()
    fetchInvoices();
  }, [page, limit, filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handlePaginationChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Invoices</h1>
       
      { admin ? <div onClick={handleViewCampaign} className="sticky w-[18%] mb-5 flex border-2 px-2 py-1 rounded-md hover:bg-slate-200 cursor-pointer">
               <p className="font-mono pr-1">Upload Invoice </p>
             <button onClick={handleViewCampaign}><MdOutlineFileUpload size={24}/></button>
            </div> :" "}
   
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          name="panCard"
          placeholder="Search by Pan Card"
          value={filters.panCard}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md w-[10rem] focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="text"
          name="status"
          placeholder="Search by Status"
          value={filters.status}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md w-[10rem] focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="p-1 border border-gray-300 rounded-md uppercase  font-mono w-[9rem] focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="p-1 border border-gray-300 rounded-md uppercase  font-mono w-[9rem] focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg border">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-8 py-2 text-left text-sm font-medium text-gray-700">Invoice Number</th>
              <th className="px-8 py-2 text-left text-sm font-medium text-gray-700">Amount</th>
              <th className="px-8 py-2 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-8 py-2 text-left text-sm font-medium text-gray-700">Pan Card</th>
              <th className="px-8 py-2 text-left text-sm font-medium text-gray-700">Created At</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-t hover:bg-gray-50">
                <td className="px-8 py-2 text-sm">{invoice.invoiceNumber}</td>
                <td className="px-8 py-2 text-sm">{invoice.amount}</td>
                <td className="px-8 py-2 text-sm">{invoice.status}</td>
                <td className="px-8 py-2 text-sm">{invoice.panCard}</td>
                <td className="px-8 py-2 text-sm">{new Date(invoice.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
          disabled={page === 1}
          onClick={() => handlePaginationChange(page - 1)}
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {page} of {Math.ceil(total / limit)}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
          disabled={page * limit >= total}
          onClick={() => handlePaginationChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Invoices;
