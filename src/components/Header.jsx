import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Header.css";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const dropdownRef = useRef(null);

  const API_URL = "http://localhost:3000/users";

  useEffect(() => {
    const handleUserChange = () => {
      const stored = localStorage.getItem("currentUser");
      setUser(stored ? JSON.parse(stored) : null);
      if (stored) {
        setName(JSON.parse(stored).name);
        setEmail(JSON.parse(stored).email);
      }
    };

    window.addEventListener("storage", handleUserChange);
    window.addEventListener("userChanged", handleUserChange);

    return () => {
      window.removeEventListener("storage", handleUserChange);
      window.removeEventListener("userChanged", handleUserChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setShowProfileForm(false);
        setShowPasswordForm(false);
        setMessage("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    window.dispatchEvent(new Event("userChanged"));
    navigate("/login");
  };

  const handleUpdateProfile = async () => {
    if (!name || !email) {
      setMessage("Vui lòng điền đủ thông tin!");
      return;
    }

    try {
      const updatedUser = { ...user, name, email };
      await axios.put(`${API_URL}/${user.id}`, updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
      window.dispatchEvent(new Event("userChanged"));
      setMessage("Cập nhật thông tin thành công!");
      setTimeout(() => {
        setShowProfileForm(false);
        setMessage("");
      }, 2000);
    } catch (error) {
      console.error(error);
      setMessage("Cập nhật thất bại. Vui lòng thử lại!");
    }
  };

  // Đổi mật khẩu
  const handleChangePassword = async () => {
    if (!oldPass || !newPass || !confirm) {
      setMessage("Vui lòng điền đủ thông tin!");
      return;
    }
    if (oldPass !== user.password) {
      setMessage("Mật khẩu cũ không đúng!");
      return;
    }
    if (newPass !== confirm) {
      setMessage("Mật khẩu mới không khớp!");
      return;
    }

    try {
      const updatedUser = { ...user, password: newPass };
      await axios.put(`${API_URL}/${user.id}`, updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
      window.dispatchEvent(new Event("userChanged"));
      setMessage("Đổi mật khẩu thành công!");
      setOldPass("");
      setNewPass("");
      setConfirm("");
      setTimeout(() => {
        setShowPasswordForm(false);
        setMessage("");
      }, 2000);
    } catch (error) {
      console.error(error);
      setMessage("Đổi mật khẩu thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <header className="header shadow-md">
      <div className="header-container">
        <Link to="/" className="logo">EventHub</Link>

        <nav className="nav">
          <Link to="/">Trang chủ</Link>
          <Link to="/events">Sự kiện</Link>
          {user && user.role !== "admin" && <Link to="/my-tickets">Vé của tôi</Link>}
          {user?.role === "admin" && <Link to="/admin">Admin</Link>}
        </nav>

        <div className="auth">
          {user ? (
            <div className="auth-logged" ref={dropdownRef}>
              <div
                className="avatar-box"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ cursor: "pointer" }}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" className="avatar-img" />
                ) : (
                  <div className="avatar-fallback">{user.name.charAt(0).toUpperCase()}</div>
                )}
              </div>
              <span className="username">Xin chào, {user.name}</span>

              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={() => {setShowProfileForm(true); setShowPasswordForm(false);}}>Đổi thông tin</button>
                  <button onClick={() => {setShowPasswordForm(true); setShowProfileForm(false);}}>Đổi mật khẩu</button>
                  <button className="btn-logout" onClick={handleLogout}>Đăng xuất</button>

                  {showProfileForm && (
                    <div className="popup-form">
                      {message && <p className="success-msg">{message}</p>}
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Họ và tên"
                      />
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                      />
                      <button onClick={handleUpdateProfile}>Lưu</button>
                    </div>
                  )}

                  {showPasswordForm && (
                    <div className="popup-form">
                      {message && <p className="success-msg">{message}</p>}
                      <input
                        type="password"
                        value={oldPass}
                        onChange={(e) => setOldPass(e.target.value)}
                        placeholder="Mật khẩu cũ"
                      />
                      <input
                        type="password"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        placeholder="Mật khẩu mới"
                      />
                      <input
                        type="password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="Xác nhận mật khẩu mới"
                      />
                      <button onClick={handleChangePassword}>Đổi mật khẩu</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="auth-btns">
              <Link to="/login" className="btn-login">Đăng nhập</Link>
              <Link to="/register" className="btn-register">Đăng ký</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
