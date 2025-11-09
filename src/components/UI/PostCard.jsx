import React from 'react';

const DEFAULT_AVATAR = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';


function PostCard({ post }) {
  const { user, text, imageUrl, likes, commentsCount, createdAt } = post;

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 my-4">

      <div className="flex items-center p-4">
        <img
          src={user.avatarUrl || DEFAULT_AVATAR}
          alt={`${user.name}'s avatar`}
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div className="flex-1">
          <span className="font-semibold text-gray-900 block">{user.name}</span>
          <span className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      <div>
        <p className="px-4 pb-3 text-gray-800 whitespace-pre-wrap">{text}</p>
        
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Post content"
            className="w-full h-auto max-h-[600px] object-cover"
          />
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center text-sm text-gray-600 pb-2">
          <span>{likes.length} Likes</span>
          <span>{commentsCount} Comments</span>
        </div>

        <hr className="border-gray-200" />

        <div className="flex justify-around pt-2">
          <button className="flex-1 text-center py-2 text-sm text-gray-600 font-medium hover:bg-gray-100 rounded-md transition-colors">
            Like
          </button>
          <button className="flex-1 text-center py-2 text-sm text-gray-600 font-medium hover:bg-gray-100 rounded-md transition-colors">
            Comment
          </button>
          <button className="flex-1 text-center py-2 text-sm text-gray-600 font-medium hover:bg-gray-100 rounded-md transition-colors">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;