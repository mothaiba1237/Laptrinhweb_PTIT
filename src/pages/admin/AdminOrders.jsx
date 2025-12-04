import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const [ordersRes, usersRes, eventsRes] = await Promise.all([
        axios.get("http://localhost:3000/orders"),
        axios.get("http://localhost:3000/users"),
        axios.get("http://localhost:3000/events"),
      ]);

      setOrders(ordersRes.data);
      setUsers(usersRes.data);
      setEvents(eventsRes.data);
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
      setMessage("Không thể tải dữ liệu!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Không rõ";
  };

  const getEventTitle = (eventId) => {
    const event = events.find((e) => e.id === eventId);
    return event ? event.title : "Không rõ";
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa đơn đặt vé này?")) return;
    try {
      await axios.delete(`http://localhost:3000/orders/${id}`);
      setOrders(orders.filter((o) => o.id !== id));
      setMessage("Xóa đơn đặt vé thành công!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(error);
      setMessage("Xóa thất bại!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const toggleStatus = async (order) => {
    try {
      const newStatus = order.status === "confirmed" ? "pending" : "confirmed";
      await axios.patch(`http://localhost:3000/orders/${order.id}`, {
        status: newStatus,
      });
      setOrders(
        orders.map((o) =>
          o.id === order.id ? { ...o, status: newStatus } : o
        )
      );
      setMessage("Cập nhật trạng thái thành công!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(error);
      setMessage("Cập nhật trạng thái thất bại!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="admin-container" style={{ padding: "1rem" }}>
      <h2 className="page-title">Quản lý đơn đặt vé</h2>
      {message && (
        <div
          style={{
            marginBottom: "1rem",
            padding: "0.5rem 1rem",
            background: "#e0f7fa",
            borderRadius: "6px",
            color: "#00695c",
          }}
        >
          {message}
        </div>
      )}

      <table
        className="admin-table"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        }}
      >
        <thead style={{ background: "#4f46e5", color: "white" }}>
          <tr>
            <th style={{ padding: "12px" }}>Sự kiện</th>
            <th style={{ padding: "12px" }}>Người dùng</th>
            <th style={{ padding: "12px" }}>Số lượng</th>
            <th style={{ padding: "12px" }}>Trạng thái</th>
            <th style={{ padding: "12px" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr
              key={o.id}
              style={{
                background: "white",
                borderBottom: "1px solid #e5e7eb",
                transition: "0.2s",
              }}
            >
              <td style={{ padding: "12px" }}>{getEventTitle(o.eventId)}</td>
              <td style={{ padding: "12px" }}>{getUserName(o.userId)}</td>
              <td style={{ padding: "12px" }}>{o.quantity}</td>
              <td
                style={{
                  padding: "12px",
                  color: o.status === "confirmed" ? "green" : "#ef4444",
                  fontWeight: "600",
                }}
              >
                {o.status === "confirmed" ? "Đã check-in" : "Chưa check-in"}
              </td>
              <td style={{ padding: "12px", display: "flex", gap: "8px" }}>
                <button
                  onClick={() => toggleStatus(o)}
                  style={{
                    padding: "6px 12px",
                    background: "#4f46e5",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  {o.status === "confirmed" ? "Hủy check-in" : "Check-in"}
                </button>
                <button
                  onClick={() => handleDelete(o.id)}
                  style={{
                    padding: "6px 12px",
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
