import React from "react";
import PostCard from "./PostCard";

function PostList({ posts, loading, error }) {
  
  if (loading) {
    return (
      <p className="text-center py-8 text-gray-500">Loading posts...</p>
    );
  }

  if (error) {
    return <p className="text-center py-8 text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-6">
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts yet.</p>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
}

export default PostList;