import { useState } from "react";

export default function BookingModal({ show, onClose, event }) {
  const [quantity, setQuantity] = useState(1);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Bạn đã đặt ${quantity} vé cho "${event.title}"`);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Đặt vé: {event.title}</h3>
        <form onSubmit={handleSubmit}>
          <label>Số lượng vé:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <div className="modal-buttons">
            <button type="submit" className="btn-submit">Đặt vé</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
}
