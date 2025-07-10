// src/pages/Feed.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useSelector } from 'react-redux';

const Feed = () => {
  const { user } = useSelector(state => state.auth);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data.posts || res.data); // supports both paginated & non-paginated
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  const handleLike = async (postId) => {
    try {
      await api.put(`/posts/${postId}/like`);
      fetchPosts();
    } catch (err) {
      console.error('Like failed:', err);
    }
  };

  const handleComment = async (postId, comment) => {
    try {
      await api.post(`/posts/${postId}/comment`, { content: comment });
      fetchPosts();
    } catch (err) {
      console.error('Comment failed:', err);
    }
  };

  const handleShare = (postId) => {
    const url = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Latest Posts</h1>

      {posts.map(post => (
        <div key={post._id} className="bg-white p-4 mb-6 shadow rounded">
          {/* Author Info */}
          <div className="flex items-center mb-2">
            {post.author?.avatar && (
              <img
                src={post.author.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full mr-2 object-cover"
              />
            )}
            <span className="text-gray-700 font-medium">
              {post.author?.name} on {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Post Image */}
          {post.image && (
            <img
              src={post.image}
              alt="Post thumbnail"
              className="w-full h-56 object-cover rounded mb-3"
            />
          )}

          {/* Post Content */}
          <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
          <div className="text-gray-800" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Actions */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => handleLike(post._id)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              ❤️ {post.likes?.length || 0}
            </button>

            <button
              onClick={() => handleShare(post._id)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              🔗 Share
            </button>
          </div>

          {/* Comments */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Comments:</h3>
            {post.comments?.length > 0 ? (
              post.comments.map((c, i) => (
                <div key={i} className="text-sm text-gray-700 flex items-center gap-2 mb-1">
                  {c.user?.avatar && (
                    <img
                      src={c.user.avatar}
                      alt="avatar"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  )}
                  <span>
                    <strong>{c.user?.name}:</strong> {c.content}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No comments yet.</p>
            )}

            {/* Comment Form */}
            {user && (
              <form
                className="mt-2 flex gap-2"
                onSubmit={e => {
                  e.preventDefault();
                  const comment = e.target.comment.value.trim();
                  if (comment) {
                    handleComment(post._id, comment);
                    e.target.reset();
                  }
                }}
              >
                <input
                  name="comment"
                  placeholder="Write a comment..."
                  className="border p-1 rounded flex-1"
                  required
                />
                <button type="submit" className="bg-gray-700 text-white px-3 rounded">
                  Post
                </button>
              </form>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
