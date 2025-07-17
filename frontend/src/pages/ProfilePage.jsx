import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  // Format createdAt date safely
  let createdAtDisplay = "N/A";
  if (authUser?.createdAt) {
    const date = new Date(authUser.createdAt);
    if (!isNaN(date.getTime())) {
      createdAtDisplay = date.toISOString().split("T")[0];
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-700">Profile</h1>
            <p className="mt-2 text-blue-400">Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-blue-100"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-blue-600 hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-blue-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-blue-400 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-400" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-blue-50 rounded-lg border border-blue-100 text-blue-900">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-blue-400 flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-blue-50 rounded-lg border border-blue-100 text-blue-900">{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 rounded-xl p-6">
            <h2 className="text-lg font-medium text-blue-700 mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-blue-100">
                <span className="text-blue-400">Member Since</span>
                <span className="text-blue-900">{createdAtDisplay}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-blue-400">Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
