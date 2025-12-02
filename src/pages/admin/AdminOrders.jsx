const dummyOrders = [
  { id: 1, event: "Workshop AI 2025", user: "Nguyễn Văn A", quantity: 2, status: "Chưa check-in" },
  { id: 2, event: "Concert EDM New Year", user: "Trần Thị B", quantity: 1, status: "Đã check-in" },
];

export default function AdminOrders() {
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
          {dummyOrders.map(o => (
            <tr key={o.id}>
              <td>{o.event}</td>
              <td>{o.user}</td>
              <td>{o.quantity}</td>
              <td className={o.status === "Đã check-in" ? "status-checked" : "status-unchecked"}>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
