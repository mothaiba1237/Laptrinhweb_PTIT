import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import axios from "axios";
import "../css/Events.css";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLocation, setFilterLocation] = useState("All");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:3000/events");
        setEvents(res.data);
      } catch (error) {
        console.error("Lỗi tải danh sách sự kiện:", error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Lỗi tải danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  const filteredEvents = events.filter((ev) => {
    const matchSearch = ev.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filterCategory === "" || ev.categoryId == filterCategory;
    const matchLocation = filterLocation === "All" || ev.location === filterLocation;
    return matchSearch && matchCategory && matchLocation;
  });

  return (
    <div className="events-container">
      <h2 className="page-title">Danh sách sự kiện</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Tìm kiếm sự kiện..."
          className="border p-2 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded-lg"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Tất cả loại</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded-lg"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        >
          <option value="All">Tất cả địa điểm</option>
          <option value="Học viện Công nghệ BCVT - CS1">Học viện BCVT - CS1</option>
          <option value="Học viện Công nghệ BCVT - Hội trường lớn">Hội trường lớn</option>
          <option value="Trung tâm Hội nghị Quốc gia">Trung tâm Hội nghị Quốc gia</option>
        </select>
      </div>

      <div
        className="event-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filteredEvents.length > 0 ? (
          filteredEvents.map((ev) => <EventCard key={ev.id} event={ev} />)
        ) : (
          <p className="no-result">Không có sự kiện phù hợp.</p>
        )}
      </div>
    </div>
  );
}
