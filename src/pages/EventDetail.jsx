import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingModal from "../components/BookingModal";
import "../css/EventDetail.css";

const categories = [
  { id: 1, name: "Workshop" },
  { id: 2, name: "Hội thảo" },
  { id: 3, name: "Concert" },
  { id: 4, name: "Tech Talk" },
  { id: 5, name: "Khóa học" },
];

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchEvent = async () => {
    try {
      const res = await fetch("http://localhost:3000/events");
      const data = await res.json();
      const found = data.find((ev) => ev.id.toString() === id);
      setEvent(found || null);
    } catch (err) {
      console.error("Lỗi tải sự kiện:", err);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  if (loading) return <p className="loading-text">Đang tải sự kiện...</p>;
  if (!event) return <p className="error-text">Không tìm thấy sự kiện</p>;

  const categoryName =
    categories.find((c) => c.id === event.categoryId)?.name || "Chưa cập nhật";

  return (
    <div className="event-detail-container">
      <img
        src={event.thumbnail || "/default.jpg"}
        alt={event.title}
        className="event-detail-banner"
        onError={(e) => (e.target.src = "https://picsum.photos/600/300?random")}
      />

      <div className="event-detail-body">
        <h2 className="event-title">{event.title}</h2>
        <p><strong>Loại sự kiện:</strong> {categoryName}</p>
        <p><strong>Địa điểm:</strong> {event.location}</p>
        <p><strong>Ngày & giờ:</strong> {event.date} {event.time}</p>
        <p><strong>Diễn giả:</strong> {event.speaker}</p>
        <p><strong>Số vé còn lại:</strong> {event.availableSeats}</p>
        <p className="event-description">{event.description}</p>

        <button
          className="btn-book"
          onClick={() => setShowModal(true)}
          disabled={event.availableSeats <= 0}
        >
          {event.availableSeats > 0 ? "Đặt vé" : "Hết vé"}
        </button>
      </div>

      <BookingModal
        show={showModal}
        onClose={() => setShowModal(false)}
        event={event}
        onBookingSuccess={fetchEvent}
      />
    </div>
  );
}
