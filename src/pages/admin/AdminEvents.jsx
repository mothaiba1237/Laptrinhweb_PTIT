import { useState } from "react";

const dummyEvents = [
  { id: 1, title: "Workshop AI 2025", location: "Hà Nội", date: "2025-12-20", tickets: 50, price: 200000 },
  { id: 2, title: "Concert EDM New Year", location: "TP HCM", date: "2025-12-25", tickets: 100, price: 500000 },
];

export default function AdminEvents() {
  const [events, setEvents] = useState(dummyEvents);

  const handleDelete = (id) => {
    if(window.confirm("Bạn có chắc muốn xóa sự kiện này?")) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  return (
    <div className="admin-container">
      <h2 className="page-title">Quản lý sự kiện</h2>
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
          {events.map(e => (
            <tr key={e.id}>
              <td>{e.title}</td>
              <td>{e.location}</td>
              <td>{e.date}</td>
              <td>{e.tickets}</td>
              <td>{e.price.toLocaleString()} VNĐ</td>
              <td>
                <button className="btn-edit">Sửa</button>
                <button className="btn-delete" onClick={() => handleDelete(e.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
