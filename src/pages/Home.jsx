import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import ProfileSidebar from "../components/UI/ProfileSidebar";
import CreatePost from "../components/UI/CreatePost";
import PostList from "../components/UI/PostList"; // Import the dumb component

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(""); // Clear previous errors

        const response = await axiosInstance.get("/post/feed");

        if (response.data.success) {
          setPosts(response.data.posts || []);
        } else {
          setError(response.data.message || "Failed to load posts");
        }
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError("You must be logged in to see the feed.");
          navigate("/signin"); // Redirect to the sign-in page
        } else {
          setError(err.response?.data?.message || "Error fetching feed");
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [navigate]);

  // This function is passed to CreatePost to update the UI instantly
  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]); // Add new post at the top
  };

  return (
    <div className="w-full min-h-screen bg-[linear-gradient(to_bottom,#dbeafe,white,#dbeafe)] pt-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 px-4">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4 md:sticky md:top-32 self-start">
          <ProfileSidebar />
        </div>

        {/* Post Feed */}
        <div className="w-full md:w-2/3 lg:w-3/4 space-y-6">
          {/* Create Post */}
          <CreatePost onPostCreated={handlePostCreated} />

          {/* Pass all state (loading, error, and data) 
            down to the PostList component.
          */}
          <PostList posts={posts} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default Home;