# SkillSwap 🔄

SkillSwap is a full stack web app that lets users sign up, log in, and add their personal skill set. It's designed to help people exchange skills with others — a step toward building a collaborative learning network.

## 🌐 Live Demo

[https://skill-swap-puce.vercel.app](https://skill-swap-puce.vercel.app)

---

## 🧑‍💻 Built With

- **Frontend**: React, Redux Toolkit, React Router
- **Backend**: Node.js, Express.js, MongoDB (with Mongoose)
- **Authentication**: JWT
- **Styling**: Custom CSS (Tailwind coming soon)
- **Dev Tools**: Vite, Nodemon

---

## 🌐 Live Demo (Coming Soon)
*Deployed version coming soon on Vercel / Render.*

---

## 🛠️ Features

- 🔐 User Registration & Login
- 🔁 JWT Auth with secure token storage
- 🧠 Add and View Skills
- 📋 Dashboard with Skill List
- 🔒 Private Routes (protected via token)
- 🎯 More features coming soon (Find Matches, Edit/Delete skills)

---

## 🚀 Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB Atlas account or local MongoDB server

---

### 🔧 Backend Setup

```bash
cd server
npm install
```

Create a .env file in server/:

PORT=5001
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key

Run the server:
```bash
npx nodemon index.js
```

### 💻 Frontend Setup
```bash
cd client
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

### 🔐 Folder Structure
```bash
skill-swap/
│
├── client/           # React frontend (Vite)
│   ├── src/
│   │   ├── pages/    # Register, Login, Profile, Dashboard, AddSkills
│   │   ├── features/ # Redux slices
│   │   └── components/ # Navbar, PrivateRoute
│
├── server/           # Express backend
│   ├── models/       # Mongoose schemas (User, Skill)
│   ├── routes/       # Auth and skill routes
│   └── controllers/  # Logic for each 
```
