import { useState } from "react";
import { useParams } from "react-router-dom";
import BookingModal from "../components/BookingModal";

const dummyEvents = [
  {
    id: 1,
    title: "Workshop AI 2025",
    location: "Hà Nội",
    date: "2025-12-20",
    type: "Workshop",
    speaker: "TS. Nguyễn Văn A",
    description: "Học cách áp dụng AI vào thực tế doanh nghiệp.",
    banner:
      "https://images.pexels.com/photos/3182766/pexels-photo-3182766.jpeg",
  },
  {
    id: 2,
    title: "Concert EDM New Year",
    location: "TP HCM",
    date: "2025-12-25",
    type: "Concert",
    speaker: "DJ John Doe",
    description: "Tiệc EDM sôi động chào năm mới.",
    banner:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
  },
];

export default function EventDetail() {
  const { id } = useParams();
  const event = dummyEvents.find((e) => e.id === parseInt(id));
  const [showModal, setShowModal] = useState(false);

  if (!event) return <p>Sự kiện không tồn tại</p>;

  return (
    <div className="event-detail-container">
      <img src={event.banner} alt={event.title} className="event-detail-banner" />
      <div className="event-detail-body">
        <h2>{event.title}</h2>
        <p><strong>Loại sự kiện:</strong> {event.type}</p>
        <p><strong>Địa điểm:</strong> {event.location}</p>
        <p><strong>Ngày:</strong> {event.date}</p>
        <p><strong>Diễn giả:</strong> {event.speaker}</p>
        <p className="event-description">{event.description}</p>
        <button className="btn-book" onClick={() => setShowModal(true)}>Đặt vé</button>
      </div>

      <BookingModal show={showModal} onClose={() => setShowModal(false)} event={event} />
    </div>
  );
}
