import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const getAuthData = () => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  let user = null;
  try {
    user = userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error("Failed to parse user data from localStorage", error);
  }
  return { token, user };
};

const Navbar = () => {
  const [auth, setAuth] = useState(getAuthData());

  useEffect(() => {
    const handleAuthChange = () => {
      setAuth(getAuthData());
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
  };

  const avatarUrl = auth.user?.avatarUrl;
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const displayAvatar = avatarUrl || defaultAvatar;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center py-3 sm:py-4 px-4 sm:px-6 bg-transparent">
      <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-lg rounded-full px-4 sm:px-8 py-2 sm:py-3 flex flex-col sm:flex-row items-center sm:justify-between w-full max-w-5xl gap-3">
        <Link to="/">
          <div className="flex items-center space-x-2">
            <span className="text-[#0078b7] font-bold text-lg">DevPost</span>
            <img
              src="https://www.butterflybeginningscounseling.com/wp-content/uploads/2020/12/linkedin-icon.jpg"
              alt="logo"
              className="h-6 w-6 sm:h-6 sm:w-6"
            />
          </div>
        </Link>

        <div className="flex items-center space-x-3">
          {auth.token ? (
            <>
              <Link
                to="/me"
                className="bg-white p-1.5 rounded-full shadow-md hover:bg-blue-100 transition"
                title="Profile"
              >
                <img
                  src={displayAvatar}
                  alt="Profile"
                  className="h-6 w-6 rounded-full object-cover"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-red-500 font-semibold text-sm sm:text-base px-3 sm:px-4 py-1 rounded-full shadow-md hover:bg-red-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-white text-[#0078b7] font-semibold text-sm sm:text-base px-3 sm:px-4 py-1 rounded-full shadow-md hover:bg-blue-100 transition"
              >
                Sign up
              </Link>
              <Link
                to="/signin"
                className="bg-white text-[#0078b7] font-semibold text-sm sm:text-base px-3 sm:px-4 py-1 rounded-full shadow-md hover:bg-blue-100 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;