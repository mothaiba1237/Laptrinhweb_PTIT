const dummyTickets = [
  {
    id: 1,
    eventTitle: "Workshop AI 2025",
    date: "2025-12-20",
    quantity: 2,
    status: "Chưa check-in",
  },
  {
    id: 2,
    eventTitle: "Concert EDM New Year",
    date: "2025-12-25",
    quantity: 1,
    status: "Đã check-in",
  },
  {
    id: 3,
    eventTitle: "Workshop ReactJS",
    date: "2025-12-22",
    quantity: 3,
    status: "Chưa check-in",
  },
];

export default function MyTickets() {
  return (
    <div className="mytickets-container">
      <h2 className="page-title">Vé của tôi</h2>

      <table className="tickets-table">
        <thead>
          <tr>
            <th>Sự kiện</th>
            <th>Ngày</th>
            <th>Số vé</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {dummyTickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.eventTitle}</td>
              <td>{ticket.date}</td>
              <td>{ticket.quantity}</td>
              <td className={ticket.status === "Đã check-in" ? "status-checked" : "status-unchecked"}>
                {ticket.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
