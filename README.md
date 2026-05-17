# Smart Lead Dashboard 🚀

A full-stack CRM (Customer Relationship Management) dashboard built using the MERN stack.  
It includes authentication, role-based access control, and complete lead management features.

---

## 📌 Features

### 🔐 Authentication
- User Registration & Login
- JWT-based authentication
- Protected routes

### 👥 Role-Based Access
- **Admin**
  - View all leads
  - Create / Update / Delete any lead
- **Sales User**
  - View only assigned leads
  - Manage own leads only

### 📊 Lead Management
- Create new leads
- Update lead status
- Delete leads
- Assign leads to users (admin control)
- Search, filter, sort leads
- Pagination support

### 📈 Dashboard / Analytics
- Total leads count
- Status-based tracking (New, Contacted, Converted, etc.)
- Source tracking (Website, Referral, etc.)

### 🎨 Frontend Features
- Responsive UI
- React Router navigation
- Protected routes
- Toast notifications
- Clean dashboard layout

---

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- React Toastify

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT (Authentication)
- bcryptjs

---

## 📂 Project Structure

Smart Lead Dashboard/
│
├── frontend/
│ ├── src/
│ └── package.json
│
├── backend/
│ ├── src/
│ └── package.json
│
└── README.md


---

## ⚙️ Environment Variables

Create a `.env` file inside backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

🚀 Installation & Setup

1️⃣ Clone Repository
git clone https://github.com/YOUR_USERNAME/smart-lead-dashboard.git
cd smart-lead-dashboard

2️⃣ Backend Setup
cd backend
npm install
npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🔑 Authentication Flow
1.User registers or logs in
2.Server generates JWT token
3.Token stored in localStorage
4.Token used for protected API requests

👨‍💼 Role Logic
Admin
 1.Full access to all leads
 2.Can manage all users' data
Sales User
 1.Can only access leads assigned to them
 2.Cannot access other users' data

📊 Lead Workflow
Admin/Sales creates a lead
Lead is assigned to a user
Data is stored in MongoDB
Dashboard fetches based on role
 .Admin → all leads
 .Sales → own leads only

🔮 Future Improvements
 1.Email notifications
 2.Lead assignment UI (admin panel)
 3.Real-time updates (Socket.io)
 4.File upload support
 5.Deployment (Render + Vercel)
 6.Activity logs
 7.Advanced analytics charts

🧠 Learning Outcomes

This project demonstrates:

 1.Full-stack MERN architecture
 2.JWT authentication flow
 3.Role-based access control (RBAC)
 4.REST API design
 5.CRUD operations
 6.Pagination & filtering logic
 7.Protected routes in React

👨‍💻 Author

Samal
