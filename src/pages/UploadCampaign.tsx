import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadCampaign = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const navigate = useNavigate()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setStatus(`File selected: ${e.target.files[0].name}`);
    }
  };

 
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

 
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setStatus(`File selected: ${e.dataTransfer.files[0].name}`);
    }
  };

  
  const handleViewCampaign = () => {
      navigate("/campaigns"); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setStatus("Please select or drop a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatus("Uploading...");

   
       await axios.post(
        "http://localhost:3000/api/v1/campaign/upload-campaign", 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, 
        }
      );

   
      setStatus("File uploaded successfully!");
      navigate("/campaigns");  
      
    } catch (error: any) {
      console.error("Error uploading file:", error.response?.data);
      setStatus(
        error.response?.data?.error || "An error occurred while uploading."
      );
    }
  };

  return (
    <div className="flex flex-col items-center mt-5 min-h-screen bg-gray-50 p-6">
    
      <h2 className="text-2xl font-bold mb-6">Upload Campaign</h2>
      <button onClick={handleViewCampaign} className=" bg-gray-300 hover:bg-gray-200 px-3 tracking-tighter py-2 rounded-lg font-bold fixed right-24 top-24">
        View Campaign
        </button>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col items-center space-y-4"
      >
       
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`relative w-full h-32 border-2 ${
            dragActive ? "border-green-500 bg-green-50" : "border-gray-300"
          } border-dashed rounded-lg flex flex-col justify-center items-center text-gray-600 text-center cursor-pointer transition-colors duration-200`}
        >
          <p className="pointer-events-none">
            {dragActive
              ? "Drop the file here..."
              : file
              ? `Selected: ${file.name}`
              : "Upload a CSV file containing your campaign data. Ensure it includes valid PAN Card Numbers."}
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
          />
        </div>

    
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Upload
        </button>
      </form>

 
      {status && <p className="mt-4 text-gray-700">{status}</p>}
    </div>
  );
};

export default UploadCampaign;
