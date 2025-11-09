import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    // redirect if not signed in
    if (!token || !storedUser) {
      navigate("/signin");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md text-center border border-white/40">
        <img
          src={
            user.avatarUrl ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="User Avatar"
          className="w-28 h-28 rounded-full mx-auto border-4 border-blue-200 shadow-md"
        />

        <h2 className="text-2xl font-bold text-blue-800 mt-4">{user.name}</h2>
        <p className="text-gray-600 mb-6">{user.email}</p>

        <div className="text-left space-y-3">
          <div>
            <span className="block text-sm font-medium text-gray-500">
              Full Name
            </span>
            <p className="text-gray-800 font-semibold">{user.name}</p>
          </div>

          <div>
            <span className="block text-sm font-medium text-gray-500">
              Email Address
            </span>
            <p className="text-gray-800 font-semibold">{user.email}</p>
          </div>

          <div>
            <span className="block text-sm font-medium text-gray-500">
              Password
            </span>
            <p className="text-gray-800 font-semibold">•••••••••</p>
          </div>
        </div>

        <button
          className="mt-8 bg-[#0078b7] text-white font-semibold px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
          onClick={() => alert("Edit Profile Coming Soon!")}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
