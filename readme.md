# Blogify Backend

## 📌 Overview

Blogify is a backend service for a blogging platform where users can create, update, and delete their blogs. The system includes **role-based access control**, secure authentication, and API functionalities for **searching, sorting, and filtering blogs**.

## 🛠️ Technologies Used

- **TypeScript**
- **Node.js** & **Express.js**
- **MongoDB** (with Mongoose)
- **JWT (JSON Web Token) Authentication**
- **Zod Validation**
- **Bcrypt** for password hashing

## ✨ Features

### **🔑 Authentication & Authorization**

- **JWT Authentication** for secure user access
- Role-based access:
  - **Admin**: Can block users and delete any blog
  - **User**: Can create, update, and delete their own blogs

### **📝 Blog Management**

- **CRUD operations** for blog posts
- **Search, Filter, and Sort** blogs by various parameters
- **Public API** for viewing blogs

### **🛡️ Security & Validation**

- Passwords are **hashed using Bcrypt**
- Input validation using **Zod**
- Secure **JWT-based** authentication

## 🚀 Installation & Setup

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/Asif419/blogify-backend.git
cd blogify-backend
```

### **2️⃣ Install Dependencies**

```bash
npm install
```

### **3️⃣ Configure Environment Variables**

Create a `.env` file in the root directory and set the following variables:

```env
NODE_ENV = development
PORT = 5000
DATABASE_URL = mongodb+srv://admin:password@cluster0.mongodb.net/blogify
BCRYPT_SALT_ROUNDS = 12
JWT_ACCESS_SECRET = your_access_secret
JWT_REFRESH_SECRET = your_refresh_secret
JWT_ACCESS_EXPIRES_IN = 10h
JWT_REFRESH_EXPIRES_IN = 365d
```

### **4️⃣ Run the Server**

#### Development Mode:

```bash
npm run start:dev
```

#### Production Mode:

```bash
npm run build
npm run start:prod
```

## 📡 API Endpoints

### **🔐 Authentication**

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| `POST` | `/api/auth/register` | Register a new user     |
| `POST` | `/api/auth/login`    | Login and get JWT token |

### **📝 Blog Management**

| Method   | Endpoint         | Description                        |
| -------- | ---------------- | ---------------------------------- |
| `POST`   | `/api/blogs`     | Create a new blog (User only)      |
| `PATCH`  | `/api/blogs/:id` | Update blog (Owner only)           |
| `DELETE` | `/api/blogs/:id` | Delete blog (Owner only)           |
| `GET`    | `/api/blogs`     | Get all blogs with search & filter |

### **👑 Admin Actions**

| Method   | Endpoint                         | Description     |
| -------- | -------------------------------- | --------------- |
| `PATCH`  | `/api/admin/users/:userId/block` | Block a user    |
| `DELETE` | `/api/admin/blogs/:id`           | Delete any blog |

## 📑 API Documentation

- **Postman Collection:** [Import Collection](blogify.postman_collection.json)
- Example Request:

```bash
curl -X GET "https://blogify-backend-v4.vercel.app/api/blogs"
```

## 📤 Deployment

The project is deployed on **Vercel**:
🔗 **Live API:** [blogify-backend-v4.vercel.app](https://blogify-backend-v4.vercel.app)

## 👥 Contribution

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-branch`
5. Submit a Pull Request

## 📜 License

This project is open-source and available under the **MIT License**.
