import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "./Toast";

export default function UserForm({ type }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [toast, setToast] = useState({ message: "", type: "info" });

  const API_URL = "http://localhost:3000/users";

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (pass) => pass.length >= 6;

  const handleToast = (msg, type = "info") => {
    setToast({ message: msg, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "register") {
      if (!email || !name || !password || !confirm) {
        return handleToast("Vui lòng điền đủ thông tin!", "error");
      }
      if (!validateEmail(email)) return handleToast("Email không hợp lệ!", "error");
      if (!validatePassword(password)) return handleToast("Mật khẩu ít nhất 6 ký tự!", "error");
      if (password !== confirm) return handleToast("Mật khẩu xác nhận không khớp!", "error");

      try {
        const check = await axios.get(`${API_URL}?email=${email}`);
        if (check.data.length > 0) return handleToast("Email đã tồn tại!", "error");

        const newUser = {
          name,
          email,
          password,
          role: "user",
          avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${email}`,
        };

        await axios.post(API_URL, newUser);
        handleToast("Đăng ký thành công! Đang chuyển tới đăng nhập...", "success");

        setTimeout(() => navigate("/login"), 1500);
      } catch {
        handleToast("Lỗi kết nối server!", "error");
      }
    } else if (type === "login") {
      if (!email || !password) return handleToast("Vui lòng nhập email và mật khẩu!", "error");

      try {
        const res = await axios.get(`${API_URL}?email=${email}&password=${password}`);
        if (res.data.length === 0) return handleToast("Email hoặc mật khẩu không đúng!", "error");

        const user = res.data[0];
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.dispatchEvent(new Event("storage"));

        handleToast(`Xin chào ${user.name}!`, "success");
        setTimeout(() => {
          if (user.role === "admin") navigate("/admin");
          else navigate("/");
        }, 1200);
      } catch {
        handleToast("Lỗi kết nối server!", "error");
      }
    }
  };

  return (
    <div className="userform-container">
      <h2>{type === "login" ? "Đăng nhập" : "Đăng ký"}</h2>

      <form onSubmit={handleSubmit} className="userform">
        {type === "register" && (
          <input
            type="text"
            placeholder="Họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {type === "register" && (
          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        )}

        <button type="submit" className="btn-submit">
          {type === "login" ? "Đăng nhập" : "Đăng ký"}
        </button>
      </form>

      {type === "login" ? (
        <p className="switch-form">
          Chưa có tài khoản? <a href="/register">Đăng ký</a>
        </p>
      ) : (
        <p className="switch-form">
          Đã có tài khoản? <a href="/login">Đăng nhập</a>
        </p>
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "info" })}
      />
    </div>
  );
}
