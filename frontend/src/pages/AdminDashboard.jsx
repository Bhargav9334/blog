// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await api.get('/users');
        const postsRes = await api.get('/posts');
        setUsers(usersRes.data);
        setPosts(postsRes.data.posts || postsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    await api.delete(`/users/${id}`);
    setUsers(users.filter(u => u._id !== id));
  };

  const deletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    await api.delete(`/posts/${id}`);
    setPosts(posts.filter(p => p._id !== id));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <h3 className="text-xl font-semibold mt-6 mb-2">Users</h3>
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user._id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <span>{user.name} ({user.email}) — <em>{user.role}</em></span>
            <button
              onClick={() => deleteUser(user._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2">Posts</h3>
      <ul className="space-y-2">
        {posts.map(post => (
          <li key={post._id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <span>{post.title} by {post.author?.name || 'Unknown'}</span>
            <button
              onClick={() => deletePost(post._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
