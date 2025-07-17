import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiCamera } from 'react-icons/fi';

const Profile = () => {
  const { updateprofile, isUpdatingProfile, authUser } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  // Helper to convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUploader = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImg(URL.createObjectURL(file)); // For preview

    try {
      const base64 = await fileToBase64(file);
      const result = await updateprofile({ profilePicture: base64 });
      if (result.success) {
        toast.success("Profile photo updated!");
        setSelectedImg(null); // Clear preview after successful upload
      } else {
        toast.error(result.error || "Failed to update profile photo.");
      }
    } catch (err) {
      toast.error("Error uploading image.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 mb-2">
            <img
              src={
                (isUpdatingProfile && selectedImg)
                  ? selectedImg
                  : (authUser?.profilePicture || "/avatar.png")
              }
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 bg-blue-50"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 p-2 rounded-full cursor-pointer transition-all duration-200 text-white shadow-lg flex items-center justify-center ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
              title="Change photo"
            >
              <FiCamera className="w-5 h-5" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUploader}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <h2 className="text-2xl font-bold text-blue-700">Profile</h2>
          <p className="text-gray-500 text-sm mt-1">Update your information and photo</p>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <div className="w-full px-4 py-2 border border-blue-200 rounded-lg bg-blue-50 text-gray-800">
              {authUser?.username}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <div className="w-full px-4 py-2 border border-blue-200 rounded-lg bg-blue-50 text-gray-800">
              {authUser?.email}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Member Since</label>
            <div className="w-full px-4 py-2 border border-blue-200 rounded-lg bg-blue-50 text-gray-800">
              {authUser?.createdAt?.split("T")[0]}
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-600 font-medium">Account Status</span>
            <span className="text-green-500 font-semibold">🟢 Active</span>
          </div>
        </div>
        <div className="mt-6 text-center text-gray-400 text-xs">
          {isUpdatingProfile ? "Uploading photo..." : "Click the camera icon to update your photo"}
        </div>
      </div>
    </div>
  )
}

export default Profile
