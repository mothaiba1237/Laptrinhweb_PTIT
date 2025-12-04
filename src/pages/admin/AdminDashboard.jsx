import { Link } from "react-router-dom";
import "../../css/AdminDashboard.css";
export default function AdminDashboard() {
  return (
    <div className="admin-container">
      <h2 className="page-title">Dashboard Admin</h2>
      <div className="admin-grid">
        <Link to="/admin/events" className="admin-card">
          Quản lý sự kiện
        </Link>
        <Link to="/admin/orders" className="admin-card">
          Quản lý đơn đặt vé
        </Link>
        <Link to="/admin/reports" className="admin-card">
          Báo cáo
        </Link>
      </div>
    </div>
  );
}
