import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import MyTickets from "./pages/MyTickets";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/events" element={<Events />} />
  <Route path="/events/:id" element={<EventDetail />} />
  <Route path="/my-tickets" element={<MyTickets />} />

  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route path="/admin" element={<AdminDashboard />} />
</Routes>
    </BrowserRouter>
  );
}
