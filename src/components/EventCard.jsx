export default function EventCard({ event }) {
  return (
    <div className="event-card">
      <img
        src={event.thumbnail}
        alt={event.title}
        className="event-img"
        onError={(e) => (e.target.src = "https://picsum.photos/600/300?random")}
      />

      <div className="event-body">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-location">📍 {event.location}</p>
        <p className="event-date">📅 {event.date}</p>

        <a href={`/events/${event.id}`} className="event-btn">
          Xem chi tiết
        </a>
      </div>
    </div>
  );
}
