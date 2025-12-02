import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// --- TẠO ADMIN MẶC ĐỊNH ---
let users = JSON.parse(localStorage.getItem("users")) || [];
if (!users.find(u => u.role === "admin")) {
  users.push({
    email: "admin@eventhub.com",
    name: "Admin",
    password: "123456",
    role: "admin"
  });
  localStorage.setItem("users", JSON.stringify(users));
}

// --- RENDER APP ---
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
