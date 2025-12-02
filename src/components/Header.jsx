import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();

  // Lazy initial state từ localStorage → không cần useEffect
  const [user, setUser] = useState(() => {
    const currentUser = localStorage.getItem("currentUser");
    return currentUser ? JSON.parse(currentUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">EventHub</Link>

        <nav className="nav">
          <Link to="/">Trang chủ</Link>
          <Link to="/events">Sự kiện</Link>
          {user && user.role !== "admin" && <Link to="/my-tickets">Vé của tôi</Link>}
          {user && user.role === "admin" && (
            <>
              <Link to="/admin">Admin</Link>
              <Link to="/admin/profile">Đổi mật khẩu</Link>
            </>
          )}
        </nav>

        <div className="auth">
          {user ? (
            <>
              <span>Xin chào, {user.name}</span>
              <button onClick={handleLogout}>Đăng xuất</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-login">Đăng nhập</Link>
              <Link to="/register" className="btn-register">Đăng ký</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
