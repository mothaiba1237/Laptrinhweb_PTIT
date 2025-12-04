import { useState } from "react";
import '../css/BookingModal.css';

export default function BookingModal({ show, onClose, event }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!show) return null;

  const handleBooking = async () => {
    if (!currentUser) return alert("Vui lòng đăng nhập để đặt vé");

    if (quantity < 1 || quantity > event.availableSeats) {
      return alert("Số lượng vé không hợp lệ");
    }

    setLoading(true);

    try {
      // Tạo order
      const newOrder = {
        userId: String(currentUser.id),
        eventId: String(event.id),
        quantity,
        totalPrice: event.price * quantity,
        status: "pending",
        bookingCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        createdAt: new Date().toISOString(),
      };

      const orderRes = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      const savedOrder = await orderRes.json();

      // Tạo vé cho từng quantity
      for (let i = 0; i < quantity; i++) {
        const newTicket = {
          eventId: String(event.id),
          userId: String(currentUser.id),
          orderId: String(savedOrder.id),
          status: "unused",
          qrCode: `QRCODE_${savedOrder.bookingCode}_${i + 1}`,
        };

        await fetch("http://localhost:3000/tickets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTicket),
        });
      }

      alert("Đặt vé thành công!");
      onClose(); // đóng modal
    } catch (error) {
      console.error("Đặt vé thất bại:", error);
      alert("Đặt vé thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Đặt vé: {event.title}</h2>
        <p>Địa điểm: {event.location}</p>
        <p>Ngày: {event.date} {event.time}</p>
        <p>Giá vé: {event.price.toLocaleString()} VNĐ</p>
        <p>Số vé còn: {event.availableSeats}</p>

        <input
          type="number"
          min="1"
          max={event.availableSeats}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <button onClick={handleBooking} disabled={loading}>
          {loading ? "Đang đặt..." : "Đặt vé"}
        </button>
        <button onClick={onClose} className="btn-close">Đóng</button>
      </div>
    </div>
  );
}
