import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);
  return (
    <div>
      <div className="w-full h-screen bg-[linear-gradient(to_bottom,#dbeafe,white,#dbeafe)] flex items-center justify-center px-4">
        <div className="text-center">
            
        </div>
      </div>
    </div>
  );
};

export default Feed;