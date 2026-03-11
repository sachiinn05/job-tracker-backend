# Job Tracker Backend

Backend API for the **Job Tracker Application** built using Node.js, Express, and MongoDB.

This server handles authentication, job tracking, preparation management, and dashboard analytics.

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (File Upload)
- bcrypt (Password hashing)

## 📂 Project Structure

```
src
│
├── config
│   └── database.js
│
├── middleware
│   ├── auth.js
│   └── upload.js
│
├── models
│   ├── jobApplication.js
│   ├── preparation.js
│   └── user.js
│
├── routes
│   ├── auth.js
│   ├── dashboard.js
│   ├── jobs.js
│   ├── preparation.js
│   ├── profile.js
│   └── userPhoto.js
│
├── utils
│   └── validation.js
│
└── app.js
```

## ⚙️ Features

- User authentication (JWT)
- Add / update / delete job applications
- Track job status
- Manage preparation topics
- Dashboard statistics API
- Profile management
- Upload user profile photo

## 📦 Installation

Clone the repository

```
git clone https://github.com/sachiinn05/job-tracker-backend.git
```

Go to backend directory

```
cd job-tracker-backend
```

Install dependencies

```
npm install
```

Create `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run development server

```
npm run dev
```

Server will start at

```
http://localhost:5000
```

## 📡 API Routes

### Auth

```
POST /auth/signup
POST /auth/login
POST /auth/logout
```

### Jobs

```
GET /jobs
POST /jobs
PATCH /jobs/:id
DELETE /jobs/:id
```

### Preparation

```
GET /preparation
POST /preparation
PATCH /preparation/:id
DELETE /preparation/:id
```

### Dashboard

```
GET /dashboard
```

### Profile

```
GET /profile
PATCH /profile
```

## 👨‍💻 Author

Sachin Singh