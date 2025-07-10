import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  const handleLike = async () => {
    await api.post(`/posts/${id}/like`);
    setPost({ ...post, likes: post.likes + 1 });
  };

  const handleComment = async () => {
    await api.post(`/posts/${id}/comment`, { content: comment });
    setPost({
      ...post,
      comments: [...post.comments, { content: comment, user: { name: 'You' } }],
    });
    setComment('');
  };

  if (!post) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500">by {post.author?.name || 'Unknown'}</p>
      <div className="my-4" dangerouslySetInnerHTML={{ __html: post.content }} />

      <div className="flex gap-4 mt-6">
        <button onClick={handleLike} className="px-4 py-2 bg-blue-600 text-white rounded">
          👍 Like ({post.likes})
        </button>
        <a
          href={window.location.href}
          target="_blank"
          className="px-4 py-2 bg-gray-700 text-white rounded"
          rel="noreferrer"
        >
          🔗 Share
        </a>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Comments</h3>
        <div className="space-y-2 mb-4">
          {post.comments.map((c, i) => (
            <div key={i} className="p-2 bg-gray-100 rounded">
              <strong>{c.user?.name || 'Anonymous'}:</strong> {c.content}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border rounded px-2 py-1"
          />
          <button onClick={handleComment} className="bg-green-600 text-white px-4 py-1 rounded">
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;