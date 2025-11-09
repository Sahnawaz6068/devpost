import React from "react";
import PostCard from "./PostCard";

// This component is now "dumb". It only receives props.
// It has no useEffect, useState, or axios.
function PostList({ posts, loading, error }) {
  
  // The loading state is now handled here
  if (loading) {
    return (
      <p className="text-center py-8 text-gray-500">Loading posts...</p>
    );
  }

  // The error state is now handled here
  if (error) {
    return <p className="text-center py-8 text-red-500">{error}</p>;
  }

  // The final data is rendered here
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