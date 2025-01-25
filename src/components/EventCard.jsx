import showExample from "../assets/show-ex.jpg";

import "../blocks/EventCard.css";

function EventCard() {
  return (
    <>
      <li className="card">
        <img src={showExample} alt="Imgage of show" className="card__image" />
        <div className="card__description">
          <h3 className="card__name">Marshmellow: Get Cooked Tour</h3>
          <p className="card__date">2025-2-16</p>
          <p className="card__location">Brooklyn Mirage</p>
          <a href="#" className="card__link">
            Buy tickets
          </a>
        </div>
      </li>
      <li className="card">
        <img src={showExample} alt="Imgage of show" className="card__image" />
        <div className="card__description">
          <h3 className="card__name">Marshmellow: Get Cooked Tour</h3>
          <p className="card__date">2025-2-16</p>
          <p className="card__location">Brooklyn Mirage</p>
          <a href="#" className="card__link">
            Buy tickets
          </a>
        </div>
      </li>
      <li className="card">
        <img src={showExample} alt="Imgage of show" className="card__image" />
        <div className="card__description">
          <h3 className="card__name">Marshmellow: Get Cooked Tour</h3>
          <p className="card__date">2025-2-16</p>
          <p className="card__location">Brooklyn Mirage</p>
          <a href="#" className="card__link">
            Buy tickets
          </a>
        </div>
      </li>
    </>
  );
}

export default EventCard;
