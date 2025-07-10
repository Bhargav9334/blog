// backend/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Post from './models/Post.js';
import cloudinary from './utils/cloudinary.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

// Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadImage = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'blog-posts',
  });
  return result.secure_url;
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    await User.deleteMany();
    await Post.deleteMany();

    // 1. Create users
    const admin = await User.create({
      name: 'Mohit',
      email: 'mohit@example.com',
      password: await bcrypt.hash('12345', 10),
      role: 'admin',
    });

    const user = await User.create({
      name: 'Rohit',
      email: 'rohit@example.com',
      password: await bcrypt.hash('1234', 10),
      role: 'user',
    });

    // 2. Upload sample image from local to Cloudinary
    const sampleImagePath = path.join(__dirname, 'sample.jpg');
    if (!fs.existsSync(sampleImagePath)) {
      console.warn('⚠️ sample.jpg not found in backend/ folder');
    }
    const imageUrl = await uploadImage(sampleImagePath);

    // 3. Create posts
    const posts = [
      {
        title: 'Welcome to MyBlog',
        content: '<p>This is a full-featured blogging app!</p>',
        tags: ['intro'],
      },
      {
        title: 'React vs Vue in 2025',
        content: '<p>Both are amazing frameworks...</p>',
        tags: ['react', 'vue'],
      },
      {
        title: 'Why Node.js is Still King',
        content: '<p>Fast, scalable, battle-tested.</p>',
        tags: ['nodejs'],
      },
      {
        title: '10 Tailwind Tips',
        content: '<p>Make the most of Tailwind CSS.</p>',
        tags: ['tailwind'],
      },
      {
        title: 'MERN Stack Guide',
        content: '<p>Setup and best practices for MERN.</p>',
        tags: ['mern'],
      },
      {
        title: 'MongoDB Aggregation',
        content: '<p>$match, $group, $sort explained.</p>',
        tags: ['mongodb'],
      },
      {
        title: 'Cloudinary Uploads in MERN',
        content: '<p>Store media easily.</p>',
        tags: ['cloudinary'],
      },
      {
        title: 'Secure Express APIs with JWT',
        content: '<p>JWT makes auth easy and secure.</p>',
        tags: ['jwt', 'auth'],
      },
    ];

    const postData = posts.map((p) => ({
      ...p,
      author: admin._id,
      image: imageUrl,
    }));

    await Post.insertMany(postData);

    console.log('✅ Users and Posts Seeded');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
};

seed();
