import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import "../css/Home.css";

export default function Home() {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeatured = async () => {
    try {
      const res = await fetch("http://localhost:3000/events?featured=true");
      const data = await res.json();

      const fixedData = data.map((ev) => ({
        ...ev,
        thumbnail:
          ev.thumbnail && ev.thumbnail.trim() !== ""
            ? ev.thumbnail
            : "https://source.unsplash.com/random/600x300?event",
      }));

      setFeaturedEvents(fixedData);
    } catch (error) {
      console.log("Lỗi tải sự kiện:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatured();
  }, []);

  return (
    <div className="home-container">

      <div className="home-banner">
        <div className="banner-content">
          <h1>EventHub</h1>
          <p>Nơi kết nối – sáng tạo – bùng nổ mọi sự kiện của bạn</p>
          <a href="/events" className="banner-btn">Khám phá ngay</a>
        </div>
      </div>

      <h2 className="home-title">Sự kiện nổi bật</h2>

      <div className="event-grid">
        {loading ? (
          <p className="loading-text">Đang tải sự kiện...</p>
        ) : featuredEvents.length > 0 ? (
          featuredEvents.map((ev) => <EventCard event={ev} key={ev.id} />)
        ) : (
          <p className="loading-text">Không có sự kiện nổi bật</p>
        )}
      </div>
    </div>
  );
}
