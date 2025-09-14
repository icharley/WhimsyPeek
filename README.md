# Whimsy Peek

A full-stack web application for brainstorming and managing lists of ideas with a fun random selection feature.

## Features

- 🔐 User authentication with JWT
- 📝 Create and manage idea sessions
- 💡 Add, edit, and delete ideas within sessions
- 🎲 Random idea picker with fun animations
- 📱 Mobile-responsive design
- 🎨 Modern UI with Tailwind CSS

## Project Structure

```
whimsy-peek/
├── client/          # React frontend with Vite
├── server/          # Node.js/Express backend
└── README.md
```

## Quick Start

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Set up environment variables:**
   
   Create `server/.env`:
   ```
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/whimsy-peek
   JWT_SECRET=your-super-secret-jwt-key-here
   ```
   
   Create `client/.env`:
   ```
   VITE_API_URL=http://localhost:3001
   ```

3. **Start development servers:**
   ```bash
   npm run dev
   ```

This will start both the client (http://localhost:5173) and server (http://localhost:3001) simultaneously.

## Development

- **Client only:** `npm run dev:client`
- **Server only:** `npm run dev:server`

## Deployment

### Frontend (Vercel)
1. Connect your repository to Vercel
2. Set build command: `cd client && npm run build`
3. Set output directory: `client/dist`
4. Add environment variable: `VITE_API_URL=your-backend-url`

### Backend
Deploy to Render, Railway, or similar service with:
- Build command: `cd server && npm install`
- Start command: `cd server && npm start`
- Add environment variables for production

## Tech Stack

**Frontend:**
- React 18 with Vite
- Tailwind CSS
- Lucide React (icons)
- Axios (HTTP client)

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing