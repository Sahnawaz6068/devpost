
import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const CreatePost = ({ onPostCreated }) => {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setMessage("User not logged in!");
        setLoading(false);
        return;
      }

      const response = await axiosInstance.post("/post/createPost", {
        userId: user._id,
        text,
        imageUrl,
      });

      setMessage(response.data.message || "Post created successfully!");
      setText("");
      setImageUrl("");

      if (onPostCreated) onPostCreated(response.data.post);
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-3">Create a Post</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border rounded-lg p-2 mb-2"
          rows="3"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />

        <input
          type="text"
          className="w-full border rounded-lg p-2 mb-2"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#0078b7] text-white px-4 py-2 rounded-lg"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>

      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default CreatePost;
