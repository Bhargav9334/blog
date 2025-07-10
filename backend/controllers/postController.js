// controllers/postController.js
import Post from '../models/Post.js';
import cloudinary from '../utils/cloudinary.js';

// Create post with Cloudinary image upload
export const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    let imageUrl = '';
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path);
      imageUrl = upload.secure_url;
    }

    const newPost = await Post.create({
      title,
      content,
      tags: tags ? tags.split(',') : [],
      image: imageUrl,
      author: req.user._id,
    });

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET all posts with pagination and author avatar
export const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name avatar role')
      .populate('comments.user', 'name avatar');

    const total = await Post.countDocuments();
    res.json({ posts, total, page });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Like / Unlike
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.user._id;

    const alreadyLiked = post.likes.includes(userId);
    if (alreadyLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Comment on a post
export const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = {
      user: req.user._id,
      content: req.body.content,
    };

    post.comments.push(comment);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete post (only by owner or admin)
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.author.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
