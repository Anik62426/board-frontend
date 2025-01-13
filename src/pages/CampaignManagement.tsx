import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineFileUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface Campaign {
  id: string;
  name: string;
  panCard: string;
  budget: number;
  status: boolean;
  createdAt: string;
  userId: number;
}

const CampaignManagement = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedCampaign, setEditedCampaign] = useState<Campaign | null>(null);
  const [status, setStatus] = useState<string>("");
  const [admin, isAdmin] = useState<boolean>(false);

  const navigate = useNavigate();

  const [selectedStatus, setSelectedStatus] = useState<boolean>(false);

  

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/campaign/campaigns",
        {
          withCredentials: true,
        }
      );
      setCampaigns(response.data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      setStatus("Error fetching campaigns.");
    }
  };

  const handleEdit = (campaign: Campaign) => {
    setEditingId(campaign.id);
    setEditedCampaign({ ...campaign });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Campaign
  ) => {
    if (editedCampaign) {
      setEditedCampaign({
        ...editedCampaign,
        [field]:
          field === "budget" ? parseFloat(e.target.value) : e.target.value,
      });
    }
  };

  const fetchuser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/getuser",
        {
          withCredentials: true,
        }
      );
      if (response.data.admin === true) {
        isAdmin(true);
      }
    } catch (error) {
      console.error("User not found", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if(event.target.value === "Approved"){
      setSelectedStatus(true);
    }
    else if((event.target.value === "Pending")){
      setSelectedStatus(false);
    }
    
  };

  const handleSave = async () => {
    if (!editedCampaign) return;
    console.log(selectedStatus)
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/campaign/edit-campaign/${editedCampaign.id}`,
        editedCampaign
      );

      await axios.post(
        `http://localhost:3000/api/v1/admin/campaign/${editedCampaign.id}`,
        { selectedStatus },
        {
          withCredentials: true,
        }
      );

      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === editedCampaign.id ? { ...editedCampaign } : c
        )
      );

      setEditingId(null);
      setEditedCampaign(null);
      setStatus("Campaign updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating campaign:", error);
      setStatus("Error updating campaign.");
    }

  };

  

  const handleViewCampaign = () => {
    navigate("/Upload-Campaign");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this campaign?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3000/api/v1/campaign/delete-campaign/${id}`
      );
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
      setStatus("Campaign deleted successfully!");
    } catch (error) {
      console.error("Error deleting campaign:", error);
      setStatus("Error deleting campaign.");
    }
  };

  useEffect(() => {
    fetchCampaigns();
    fetchuser();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Manage Campaigns</h2>

      <div
        onClick={handleViewCampaign}
        className="sticky w-[15%] mb-10 flex border-2 px-2 py-1 rounded-md hover:bg-slate-200 cursor-pointer"
      >
        <p className="font-mono pr-1">Upload Campaign </p>
        <button onClick={handleViewCampaign}>
          <MdOutlineFileUpload size={24} />
        </button>
      </div>

      {status && <p className="mb-4 text-green-500">{status}</p>}

      <table className="w-full font-mono table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-gray-500 ">
            <th className="border border-gray-100 px-4 py-2">ID</th>
            <th className="border border-gray-100 px-4 py-2">Name</th>
            <th className="border border-gray-100 px-4 py-2">PAN Card</th>
            <th className="border border-gray-100 px-4 py-2">Budget</th>
            <th className="border border-gray-100 px-4 py-2">Status</th>
            <th className="border border-gray-100 px-4 py-2">Created At</th>
            <th className="border border-gray-100 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign, index) => (
            <tr key={campaign.id} className="text-center hover:bg-gray-100">
              <td className="border-b border-gray-300 px-2 py-2">
                {index + 1}
              </td>
              <td className="border-b border-gray-300 px-4 py-2">
                {editingId === campaign.id ? (
                  <input
                    type="text"
                    value={editedCampaign?.name || ""}
                    onChange={(e) => handleEditChange(e, "name")}
                    className="border-b border-gray-300 rounded px-2 py-1 w-full"
                  />
                ) : (
                  campaign.name
                )}
              </td>
              <td className="border-b border-gray-300 px-4 py-2">
                {editingId === campaign.id ? (
                  <input
                    type="text"
                    value={editedCampaign?.panCard || ""}
                    onChange={(e) => handleEditChange(e, "panCard")}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                ) : (
                  campaign.panCard
                )}
              </td>
              <td className="border-b border-gray-300 px-4 py-2">
                {editingId === campaign.id ? (
                  <input
                    type="number"
                    value={editedCampaign?.budget || ""}
                    onChange={(e) => handleEditChange(e, "budget")}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                ) : (
                  campaign.budget
                )}
              </td>
              <td className="border-b border-gray-300 px-1 py-2 w-[8%]">
                {editingId === campaign.id ? (
                  admin ? (
                    <select
                      value={
                        selectedStatus ? "Approved" : "Pending"
                      }
                      onChange={handleChange}
                      className="rounded-md border-gray-300 text-sm"
                    >
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                    </select>
                  ) : (
                    <div
                      className={`rounded-full border tracking-tighter font-bold text-white text-sm py-1.5 ${
                        campaign.status
                          ? "bg-emerald-500 hover:bg-emerald-600"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      {campaign.status ? "Approved" : "Pending"}
                    </div>
                  )
                ) : (
                  <div
                    className={`rounded-full border tracking-tighter font-bold text-white text-sm py-1.5 ${
                      campaign.status
                        ? "bg-emerald-500 hover:bg-emerald-600"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {campaign.status ? "Approved" : "Pending"}
                  </div>
                )}
              </td>

              <td className="border-b border-gray-300 px-4 py-2">
                {new Date(campaign.createdAt).toLocaleDateString()}
              </td>

              <td className="border-b border-gray-300 px-4 py-2 space-x-2">
                {editingId === campaign.id ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(campaign)}
                      className=" px-2 py-2 rounded border hover:bg-gray-200"
                    >
                      <FiEdit size={21} />
                    </button>
                    <button
                      onClick={() => handleDelete(campaign.id)}
                      className=" px-2 py-2 rounded border hover:bg-gray-200"
                    >
                      <RiDeleteBin6Line size={21} />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignManagement;
