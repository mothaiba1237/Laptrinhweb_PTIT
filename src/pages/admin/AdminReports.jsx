import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminReports() {
  const [totalTickets, setTotalTickets] = useState(0);
  const [checkedIn, setCheckedIn] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/orders");
        const orders = res.data;

        const total = orders.reduce((sum, o) => sum + o.quantity, 0);
        const checked = orders
          .filter((o) => o.status === "confirmed")
          .reduce((sum, o) => sum + o.quantity, 0);

        setTotalTickets(total);
        setCheckedIn(checked);
      } catch (error) {
        console.error("Lỗi tải dữ liệu báo cáo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const checkInRate =
    totalTickets > 0 ? ((checkedIn / totalTickets) * 100).toFixed(1) : 0;

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="admin-container" style={{ padding: "1rem" }}>
      <h2 className="page-title">Báo cáo</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <div
          style={{
            padding: "1rem",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Tổng số vé bán</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "700" }}>{totalTickets}</p>
        </div>

        <div
          style={{
            padding: "1rem",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Số vé đã check-in</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "700" }}>{checkedIn}</p>
        </div>

        <div
          style={{
            padding: "1rem",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Tỷ lệ check-in</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "700" }}>{checkInRate}%</p>
        </div>
      </div>
    </div>
  );
}
