import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="admin-container">
      <h2 className="page-title">Quản lý đơn đặt vé</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Sự kiện</th>
            <th>Người dùng</th>
            <th>Số lượng</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{getEventTitle(o.eventId)}</td>
              <td>{getUserName(o.userId)}</td>
              <td>{o.quantity}</td>
              <td
                className={
                  o.status === "confirmed"
                    ? "status-checked"
                    : "status-unchecked"
                }
              >
                {o.status === "confirmed" ? "Đã check-in" : "Chưa check-in"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
