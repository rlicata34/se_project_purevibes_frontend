import "../blocks/EventCard.css";

function EventCard({ event, handleCardBookmark, bookmarkedEvents }) {
  const isBookmarked = bookmarkedEvents.some((evt) => evt.url === event.url);

  let formattedDate;
  if (!event.startDateTime || isNaN(Date.parse(event.startDateTime))) {
    formattedDate = "Date TBD";
  } else {
    formattedDate = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(event.startDateTime));
  }

  const toggleBookmark = () => {
    handleCardBookmark(event);
  };
  return (
    <>
      <li className="card">
        <img src={event.image} alt="Imgage of show" className="card__image" />
        <button
          className={`card__bookmark ${
            isBookmarked ? "card__bookmark_active" : ""
          }`}
          onClick={toggleBookmark}
        ></button>
        <div className="card__description">
          <h3 className="card__name">{event.name}</h3>
          <p className="card__date">{formattedDate}</p>
          <p className="card__location">{event.city}</p>
          <p className="card__location">{event.venue}</p>
          <a href={event.url} className="card__link">
            Buy tickets
          </a>
        </div>
      </li>
    </>
  );
}

export default EventCard;
