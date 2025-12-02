export default function AdminReports() {
  const totalTickets = 150;
  const checkedIn = 70;
  const checkInRate = ((checkedIn / totalTickets) * 100).toFixed(1);

  return (
    <div className="admin-container">
      <h2 className="page-title">Báo cáo</h2>
      <div className="report-card">
        <p><strong>Tổng số vé bán:</strong> {totalTickets}</p>
        <p><strong>Số vé đã check-in:</strong> {checkedIn}</p>
        <p><strong>Tỷ lệ check-in:</strong> {checkInRate}%</p>
      </div>
    </div>
  );
}
