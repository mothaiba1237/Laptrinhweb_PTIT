import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import "../css/Events.css";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:3000/events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.log("Lỗi tải danh sách sự kiện:", error);
      }
    };

    fetchEvents();
  }, []);

  // lọc sự kiện
  const filteredEvents = events.filter((ev) => {
    return (
      (filterType === "All" || ev.categoryId == filterType) &&
      (filterLocation === "All" || ev.location === filterLocation)
    );
  });

  return (
    <div className="events-container">
      <h2 className="page-title">Danh sách sự kiện</h2>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <div className="filter-group">
          <label>Loại sự kiện:</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">Tất cả</option>
            <option value="1">Workshop</option>
            <option value="2">Hội thảo</option>
            <option value="3">Concert</option>
            <option value="4">Tech Talk</option>
            <option value="5">Khóa học</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Địa điểm:</label>
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          >
            <option value="All">Tất cả</option>
            <option value="Học viện Công nghệ BCVT - CS1">
              Học viện BCVT - CS1
            </option>
            <option value="Học viện Công nghệ BCVT - Hội trường lớn">
              Hội trường lớn
            </option>
            <option value="Trung tâm Hội nghị Quốc gia">
              Trung tâm Hội nghị Quốc gia
            </option>
          </select>
        </div>
      </div>

      {/* EVENTS GRID */}
      <div className="event-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((ev) => <EventCard key={ev.id} event={ev} />)
        ) : (
          <p className="no-result">Không có sự kiện phù hợp.</p>
        )}
      </div>
    </div>
  );
}
