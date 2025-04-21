# 🪐 StarWars App

This is a full-stack application starter that includes both a **frontend** (React) and a **backend** (Node.js/Express) running together using **Docker**.

## 🗂️ Project Structure

```
project-root/
├── backend/       # Node.js + Express backend
├── frontend/      # React frontend
├── docker-compose.yml
└── README.md
```

---

## 🚀 Getting Started

### 📦 Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) installed on your machine

---

## 🐳 Run with Docker

To build and run both the frontend and backend together:

```bash
docker compose up --build
```

This will:

- Build the frontend and backend images
- Start the containers
- Serve the frontend on [http://localhost:5173](http://localhost:3000)
- Run the backend on [http://localhost:8080](http://localhost:5000)
- Start mongodb on [http://localhost:27018](http://localhost:27018)

---

## 📜 Scripts

You can also run the frontend and backend independently (if needed):

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Tests

You can run tests for the frontend with vitest:

```bash
cd frontend
npm run test
```

---

## 😎 Author

Moises Curiel
