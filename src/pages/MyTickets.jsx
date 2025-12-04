import { useEffect, useState } from "react";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const fetchTickets = async () => {
    try {
      const res = await fetch("http://localhost:3000/tickets");
      const data = await res.json();

      const myTickets = data.filter(
        (t) => String(t.userId) === String(currentUser?.id)
      );

      const eventsRes = await fetch("http://localhost:3000/events");
      const eventsData = await eventsRes.json();

      const ticketsWithEvent = myTickets.map((t) => {
        const event = eventsData.find((e) => String(e.id) === String(t.eventId));
        return {
          ...t,
          eventTitle: event?.title || "Không xác định",
          date: event?.date || "",
          quantity: 1, // mỗi vé 1
          status: t.status === "used" ? "Đã check-in" : "Chưa check-in",
        };
      });

      setTickets(ticketsWithEvent);
    } catch (error) {
      console.log("Lỗi tải vé:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  if (loading) return <p className="loading-text">Đang tải vé...</p>;

  return (
    <div className="mytickets-container">
      <h2 className="page-title">Vé của tôi</h2>

      {tickets.length === 0 ? (
        <p>Bạn chưa có vé nào.</p>
      ) : (
        <table className="tickets-table">
          <thead>
            <tr>
              <th>Sự kiện</th>
              <th>Ngày</th>
              <th>Trạng thái</th>
              <th>QR Code</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.eventTitle}</td>
                <td>{ticket.date}</td>
                <td
                  className={
                    ticket.status === "Đã check-in"
                      ? "status-checked"
                      : "status-unchecked"
                  }
                >
                  {ticket.status}
                </td>
                <td>{ticket.qrCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
