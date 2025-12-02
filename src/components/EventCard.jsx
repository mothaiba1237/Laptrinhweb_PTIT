export default function EventCard({ event }) {
  return (
    <div className="event-card">
      <img src={event.banner} alt={event.title} className="event-img" />
      <div className="event-body">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-location">📍 {event.location}</p>
        <p className="event-date">📅 {event.date}</p>
        <a href={`/event/${event.id}`} className="event-btn">
          Xem chi tiết
        </a>
      </div>
    </div>
  );
}
