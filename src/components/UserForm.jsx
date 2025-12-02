import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserForm({ type }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (type === "register") {
      if (!email || !name || !password || !confirm) {
        setError("Vui lòng điền đủ thông tin");
        return;
      }
      if (password !== confirm) {
        setError("Mật khẩu xác nhận không khớp");
        return;
      }
      if (users.find(u => u.email === email)) {
        setError("Email đã tồn tại");
        return;
      }
      users.push({ email, name, password, role: "user" });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Đăng ký thành công, mời đăng nhập!");
      navigate("/login");
    } else if (type === "login") {
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        setError("Email hoặc mật khẩu không đúng");
        return;
      }
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert(`Xin chào ${user.name}`);
      if(user.role === "admin") navigate("/admin");
      else navigate("/");
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
        {error && <p className="error-msg">{error}</p>}
        <button type="submit">{type === "login" ? "Đăng nhập" : "Đăng ký"}</button>
      </form>
      {type === "login" ? (
        <p>
          Chưa có tài khoản? <a href="/register">Đăng ký</a>
        </p>
      ) : (
        <p>
          Đã có tài khoản? <a href="/login">Đăng nhập</a>
        </p>
      )}
    </div>
  );
}
