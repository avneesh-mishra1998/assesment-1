import React, { useState, useEffect } from "react";
import { useGetProfileQuery } from "../store/api/userApi";

const UserHome = () => {
    const [profileData, setProfileData] = useState([]);
    const profile = useGetProfileQuery()

  let dummy = {
    name: "John Doe",
    email: "john.doe@example.com",
    location: "New York, USA",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque erat at turpis ultrices, in ultricies ex ultrices.",
    avatar: "https://via.placeholder.com/150", // Placeholder image URL
  }

  useEffect(() => {
    if (profile.isError) {
      console.error("Error fetching data:", profile.error);
    } else if (profile?.data?.status) {
        setProfileData(profile.data.data);
    }
  }, [profile]);
console.log(profile);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full mb-4"
            src={dummy.avatar}
            alt="User avatar"
          />
          <h2 className="text-xl font-semibold mb-2">Name: {profileData.full_name}</h2>
          <p className="text-gray-600 mb-2">Email: {profileData.email}</p>
          <p className="text-gray-600 mb-4">Location: {profileData.location}</p>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
