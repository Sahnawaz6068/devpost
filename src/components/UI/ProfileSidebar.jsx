import React from "react";
import { Link } from "react-router-dom";

export default function ProfileSidebar() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <aside className="w-full sm:w-72 bg-white/80 backdrop-blur-sm border border-white/40 rounded-xl p-5 shadow-md">
      {user ? (
        <Link to="/me">
          <div className="flex flex-col items-center">
            <img
              src={
                user.avatarUrl ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt={user.name}
              className="w-28 h-28 rounded-full border-4 border-blue-100 shadow-sm object-cover"
            />
            <h3 className="mt-4 text-lg font-semibold text-blue-800">
              {user.name}
            </h3>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </Link>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Guest"
            className="w-28 h-28 rounded-full border-4 border-gray-200 shadow-sm object-cover"
          />
          <h3 className="mt-4 text-lg font-semibold text-gray-700">Guest User</h3>
          <p className="text-sm text-gray-500 mb-3">Not loggedIn </p>
          <Link
            to="/signin"
            className="text-blue-600 hover:underline font-medium"
          >
            Login In
          </Link>
        </div>
      )}
    </aside>
  );
}
