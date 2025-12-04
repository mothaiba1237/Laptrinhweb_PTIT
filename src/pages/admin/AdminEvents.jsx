import { useEffect, useState } from "react";
import "../../css/AdminEvents.css";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    time: "",
    totalSeats: "",
    price: "",
    speaker: "",
    thumbnail: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/events");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Lỗi tải sự kiện:", error);
      setMessage("Không thể tải dữ liệu sự kiện!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sự kiện này?")) return;

    try {
      await fetch(`http://localhost:3000/events/${id}`, { method: "DELETE" });
      setEvents(events.filter((e) => e.id.toString() !== id.toString()));
      setMessage("Xóa sự kiện thành công!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Xóa thất bại:", error);
      setMessage("Xóa sự kiện thất bại!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const openModal = (event = null) => {
    setEditingEvent(event);
    if (event) {
      setFormData({ ...event });
    } else {
      setFormData({
        title: "",
        location: "",
        date: "",
        time: "",
        totalSeats: "",
        price: "",
        speaker: "",
        thumbnail: "",
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEvent(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingEvent ? "PUT" : "POST";
    const url = editingEvent
      ? `http://localhost:3000/events/${editingEvent.id}`
      : "http://localhost:3000/events";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (editingEvent) {
        setEvents(events.map((ev) => (ev.id === data.id ? data : ev)));
        setMessage("Cập nhật sự kiện thành công!");
      } else {
        setEvents([...events, data]);
        setMessage("Thêm sự kiện thành công!");
      }

      setTimeout(() => setMessage(""), 3000);
      closeModal();
    } catch (error) {
      console.error("Lỗi lưu sự kiện:", error);
      setMessage("Lưu sự kiện thất bại!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEvents = events.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(events.length / itemsPerPage);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) return <p className="loading-text">Đang tải dữ liệu...</p>;

  return (
    <div className="admin-container">
      <h2 className="page-title">Quản lý sự kiện</h2>
      {message && <div className="message-box">{message}</div>}

      <button className="btn-add" onClick={() => openModal()}>
        Thêm sự kiện
      </button>

      <div className="event-grid">
        {currentEvents.length > 0 ? (
          currentEvents.map((ev) => (
            <div className="event-card" key={ev.id}>
              <img className="event-img" src={ev.thumbnail} alt={ev.title} />
              <div className="event-body">
                <h3 className="event-title">{ev.title}</h3>
                <p className="event-location">{ev.location}</p>
                <p className="event-date">{ev.date} | {ev.time}</p>
                <p>Vé: {ev.totalSeats} | Giá: {Number(ev.price).toLocaleString()} VNĐ</p>
                <p>Diễn giả: {ev.speaker}</p>
                <div className="event-actions">
                  <button className="btn-edit" onClick={() => openModal(ev)}>Sửa</button>
                  <button className="btn-delete" onClick={() => handleDelete(ev.id)}>Xóa</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Chưa có sự kiện nào.</p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => changePage(currentPage - 1)}>Prev</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => changePage(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => changePage(currentPage + 1)}>Next</button>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingEvent ? "Sửa sự kiện" : "Thêm sự kiện"}</h3>
            <form onSubmit={handleSubmit}>
              <label>Tiêu đề:</label>
              <input name="title" value={formData.title} onChange={handleChange} required />

              <label>Địa điểm:</label>
              <input name="location" value={formData.location} onChange={handleChange} required />

              <label>Ngày:</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />

              <label>Giờ:</label>
              <input type="time" name="time" value={formData.time} onChange={handleChange} required />

              <label>Số vé:</label>
              <input type="number" name="totalSeats" value={formData.totalSeats} onChange={handleChange} required />

              <label>Giá vé:</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required />

              <label>Diễn giả:</label>
              <input name="speaker" value={formData.speaker} onChange={handleChange} required />

              <label>Thumbnail URL:</label>
              <input name="thumbnail" value={formData.thumbnail} onChange={handleChange} required />

              <div className="modal-buttons">
                <button type="submit" className="btn-submit">Lưu</button>
                <button type="button" className="btn-cancel" onClick={closeModal}>Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
