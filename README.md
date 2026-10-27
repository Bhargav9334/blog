# 📝 MERN Blog Platform

> A full-stack MERN blogging platform with JWT authentication, a rich-text editor and Cloudinary image uploads.

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)

## 📖 Overview

A complete blogging application where users can register, log in, write rich-text posts with images, browse a feed and manage their profile. Admins get a dedicated dashboard. The React front end uses Redux Toolkit for state, and the Express/MongoDB back end exposes a REST API secured with JWT.

## ✨ Features

- **Authentication** — register and login with hashed passwords (bcrypt) and JWT
- **Protected routes** on both the client and the API
- **Create posts** with a rich-text editor (React Quill)
- **Image uploads** to Cloudinary via Multer
- **Feed & post pages** — browse all posts and read individual posts
- **User profiles** and an **admin dashboard**
- Global state management with Redux Toolkit

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, Redux Toolkit, React Router, React Quill, Axios |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB |
| Auth & Storage | JWT, bcryptjs, Multer, Cloudinary |

## 📁 Project Structure

```
blog/
├── backend/
│   ├── models/       # User, Post
│   ├── routes/       # auth, posts, users
│   └── server.js
└── frontend/
    └── src/
        ├── api/
        ├── features/     # Redux slices
        ├── components/   # Navbar, ProtectedRoute
        └── pages/        # Feed, CreatePost, ViewPost, Profile, AdminDashboard, Login, Register
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A MongoDB database (local or MongoDB Atlas)

### Installation

```bash
git clone https://github.com/Bhargav9334/blog.git
cd blog
# Backend
cd backend
npm install
npm run dev

# Frontend (in a new terminal)
cd frontend
npm install
npm run dev
```

## 🔐 Environment Variables

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> Never commit `.env` files — keep them listed in `.gitignore`.

## 👤 Author

**Bhargav Sinha** — Software Engineer · Full-Stack MERN Developer

- GitHub: [@Bhargav9334](https://github.com/Bhargav9334)
- Portfolio: [bhargavsinha.vercel.app](https://bhargavsinha.vercel.app)
- Email: bhargavsinha93@gmail.com

If you found this project useful, consider giving it a ⭐
