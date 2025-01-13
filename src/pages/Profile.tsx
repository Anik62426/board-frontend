import { useState, useEffect } from "react";
import axios from "axios";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  panCardNumber: string;
  password: string;
  admin: boolean;
}

const Profile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/getuser",{
          withCredentials:true
        }); 
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">User Profile</h1>
      {userProfile ? (
        <div className="space-y-4 pt-5">
          <div className="flex">
            <div className=" mr-5">
              <h3 className=" font-medium text-gray-700 text-lg font-mono">First Name</h3>
              <p className="mt-1 text-gray-500 capitalize font-mono">{userProfile.firstName}</p>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-mono font-medium text-gray-700">Last Name</h3>
              <p className="mt-1 text-gray-500 font-mono">{userProfile.lastName}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-mono font-medium text-gray-700">Email</h3>
            <p className="mt-1 text-gray-500 font-mono">{userProfile.email}</p>
          </div>
          <div>
            <h3 className="text-lg font-monofont-medium text-gray-700">Phone Number</h3>
            <p className="mt-1 font-mono text-gray-500">{userProfile.phoneNumber}</p>
          </div>
          <div>
            <h3 className="text-lg font-mono font-medium text-gray-700">PAN Card Number</h3>
            <p className="mt-1 font-mono text-gray-500">{userProfile.panCardNumber}</p>
          </div>
          <div>
            <h3 className="text-lg font-mono font-medium text-gray-700">Admin Status</h3>
            <p className="mt-1 font-mono text-gray-500">{userProfile.admin ? "Yes" : "No"}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
