import github from "../assets/github.svg";
import facebookIcon from "../assets/facebook-icon.svg";

import "../blocks/Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright">{`© ${year} Ryan Licata. Powered by Ticketmaster API`}</p>
      <ul className="footer__list">
        <li className="footer__list-item">
          <a
            href="https://tripleten.com/"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            TripleTen
          </a>
          <a
            href="https://github.com/rlicata34"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={github}
              alt="Github logo"
              className="footer__link-image"
            />
          </a>
          <a
            href="https://www.facebook.com/ryan.licata.3"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={facebookIcon}
              alt="Facebbok logo"
              className="footer__link-image"
            />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
