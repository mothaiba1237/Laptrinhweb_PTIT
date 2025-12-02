import EventCard from "../components/EventCard";

const dummyEvents = [
  {
    id: 1,
    title: "Workshop AI 2025",
    location: "Hà Nội",
    date: "2025-12-20",
    banner:
      "https://images.pexels.com/photos/3182766/pexels-photo-3182766.jpeg",
  },
  {
    id: 2,
    title: "Concert EDM New Year",
    location: "TP HCM",
    date: "2025-12-25",
    banner:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
  },
];

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-banner">
        EventHub – Nơi kết nối sự kiện của bạn
      </div>

      <h2 className="home-title">Sự kiện nổi bật</h2>

      <div className="event-grid">
        {dummyEvents.map((ev) => (
          <EventCard event={ev} key={ev.id} />
        ))}
      </div>
    </div>
  );
}
