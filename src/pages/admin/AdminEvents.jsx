import { useEffect, useState } from "react";
import axios from "axios";
import "../../css/AdminEvents.css";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:3000/events");
        console.log("Events fetched:", res.data);
        setEvents(res.data);
      } catch (error) {
        console.error("Lỗi tải sự kiện:", error);
        setMessage("Không thể tải dữ liệu sự kiện!");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa sự kiện này?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/events/${id}`);
      setEvents(events.filter((e) => e.id !== id.toString()));
      setMessage("Xóa sự kiện thành công!");
      setTimeout(() => setMessage(""), 3000); // 3s ẩn thông báo
    } catch (error) {
      console.error("Xóa thất bại:", error);
      setMessage("Xóa sự kiện thất bại!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading) return <p className="loading-text">Đang tải dữ liệu...</p>;

  return (
    <div className="admin-container">
      <h2 className="page-title">Quản lý sự kiện</h2>

      {message && <div className="message-box">{message}</div>}

      {events.length === 0 ? (
        <p className="loading-text">Chưa có sự kiện nào.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tên sự kiện</th>
              <th>Địa điểm</th>
              <th>Ngày</th>
              <th>Số vé</th>
              <th>Giá vé</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id}>
                <td>{e.title}</td>
                <td>{e.location}</td>
                <td>{e.date}</td>
                <td>{e.totalSeats}</td>
                <td>{Number(e.price).toLocaleString()} VNĐ</td>
                <td>
                  <button className="btn-edit">Sửa</button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(e.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
