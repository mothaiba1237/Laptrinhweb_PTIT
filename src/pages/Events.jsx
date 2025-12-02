import { useState } from "react";
import EventCard from "../components/EventCard";

const dummyEvents = [
  {
    id: 1,
    title: "Workshop AI 2025",
    location: "Hà Nội",
    date: "2025-12-20",
    type: "Workshop",
    banner:
      "https://images.pexels.com/photos/3182766/pexels-photo-3182766.jpeg",
  },
  {
    id: 2,
    title: "Concert EDM New Year",
    location: "TP HCM",
    date: "2025-12-25",
    type: "Concert",
    banner:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
  },
  {
    id: 3,
    title: "Workshop ReactJS",
    location: "Hà Nội",
    date: "2025-12-22",
    type: "Workshop",
    banner:
      "https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg",
  },
];

export default function Events() {
  const [filterType, setFilterType] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");

  const filteredEvents = dummyEvents.filter((ev) => {
    return (
      (filterType === "All" || ev.type === filterType) &&
      (filterLocation === "All" || ev.location === filterLocation)
    );
  });

  return (
    <div className="events-container">
      <h2 className="page-title">Danh sách sự kiện</h2>

      <div className="filter-bar">
        <div>
          <label>Loại sự kiện:</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">Tất cả</option>
            <option value="Workshop">Workshop</option>
            <option value="Concert">Concert</option>
          </select>
        </div>

        <div>
          <label>Địa điểm:</label>
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          >
            <option value="All">Tất cả</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="TP HCM">TP HCM</option>
          </select>
        </div>
      </div>

      <div className="event-grid">
        {filteredEvents.map((ev) => (
          <EventCard event={ev} key={ev.id} />
        ))}
      </div>
    </div>
  );
}
