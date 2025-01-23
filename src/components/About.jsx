import authorImage from "../assets/author-image.png";

import "../blocks/About.css";

function About() {
  return (
    <div className="about">
      <img src={authorImage} alt="Image of author" className="about__image" />
      <div className="about__description">
        <h2 className="about__title">About the Author</h2>
        <p className="about__text">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
        </p>
        <p className="about__text">
          You can also talk about your experience with TripleTen, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </div>
  );
}

export default About;
