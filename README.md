# 🌀 Chaos Engine - Living Website

A high-performance, real-time interactive web experiment that evolves based on global user behavior.

## 🚀 Deployment Instructions (Vercel)

The project is structured as a **MERN** application. To host it fully on Vercel (Frontend as a Single Page App and Backend as Serverless Functions), follow these steps:

### 1. Database Setup (MongoDB Atlas)
- Ensure your `MONGO_URI` is ready (provided in `.env`).
- Make sure your Atlas Cluster has **IP Access** allowed for `0.0.0.0/0` (required for Vercel's dynamic serverless IPs).

### 2. Backend Deployment (Vercel Functions)
To run the backend on Vercel, you should create a `vercel.json` in the root or `backend` folder:
```json
{
  "version": 2,
  "builds": [
    { "src": "index.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "index.js" }
  ]
}
```
**Environment Variables to set in Vercel:**
- `MONGO_URI`: Your MongoDB connection string.
- `ADMIN_PIN`: `69420` (or your preferred secret).

### 3. Frontend Deployment (Vercel SPA)
- Connect your GitHub repo to Vercel.
- **Framework Preset:** Vite.
- **Build Command:** `npm run build`.
- **Output Directory:** `dist`.
- **Environment Variables:**
  - `VITE_API_BASE`: Set this to your deployed Backend URL (e.g., `https://your-backend.vercel.app/api`).

---

## 🛠 Features implemented:
- **Persistent Global State**: Powered by MongoDB Atlas.
- **Super Rare Events**: Helicopter Evac, BSOD Crash, Reality Shatter, and the Rickroll Trap.
- **Dynamic Roaster**: Behavioral tracking system that taunts users.
- **Chaos Engine**: Procedural HSL generation and UI distortion.
- **Secure Admin Panel**: Secret corner-click sequence (6-left, 9-right) with PIN protection.

## ⚙️ Development
```bash
# Backend
cd backend
npm install
node index.js

# Frontend
cd frontend
npm install
npm run dev
```
