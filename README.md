# 🎓 Learnify – Full Stack E-Learning Platform

Learnify is a **production-style full-stack e-learning platform** built to demonstrate real-world application architecture, authentication, admin workflows, and user learning flows.

---

## 🚀 Features

### 🌐 Public
- Landing page with marketing content
- Browse courses with price, category & difficulty
- Course detail page with syllabus & overview

### 👤 User
- Signup / Login using JWT authentication
- Enroll in courses
- Dashboard with enrolled courses & progress
- Certificate download after **100% course completion**

### 🛠 Admin
- Admin-only dashboard
- Create, view & delete courses
- Add lessons to courses
- Upload course completion certificates (PDF)

---

## 🧱 Tech Stack

### Frontend
- **React (Vite)**
- React Router DOM
- Tailwind CSS
- Axios
- Framer Motion
- React Hot Toast

### Backend
- **Node.js + Express**
- MongoDB (Mongoose)
- JWT Authentication
- Multer (file uploads)
- bcrypt (password hashing)

---

## 🗂 Project Structure (Simplified)


e-learning-platform/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── server.js
│   └── uploads/certificates/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   └── App.jsx
│
└── README.md


---

## 🔐 Security Highlights
- **Passwords hashed** using bcrypt
- **JWT-based** authentication
- **Role-based access** (Admin / User)
- **Protected** frontend & backend routes

---

## ⚙️ Local Setup

### 📂 Backend
cd backend
npm install
npm run dev

### 📂 Frontend
cd frontend
npm install
npm run dev

> **URLs:**
> - Frontend: http://localhost:5173
> - Backend: http://localhost:5000

---

## 📌 Key Learning Outcomes
- Full-stack REST API design
- Authentication & authorization
- Admin dashboards & file uploads
- Real-world frontend architecture

---

## 👨‍💻 Author
**Farhan Gheri**


