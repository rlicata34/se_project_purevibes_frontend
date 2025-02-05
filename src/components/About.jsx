import authorImage from "../assets/author-image.png";

import "../blocks/About.css";

function About() {
  return (
    <div className="about__content">
      <img src={authorImage} alt="Image of author" className="about__image" />
      <div className="about__description">
        <h2 className="about__title">About the Author</h2>
        <p className="about__text">
          My name is Ryan Licata, and I'm a full-stack engineer with expertise
          in HTML, CSS, JavaScript, React, Node.js, MongoDB, and Express. Beyond
          development, I have experience with Figma, allowing me to bring
          well-designed user interfaces to life. When I’m not coding, you’ll
          find me on the golf course, snowboarding in the mountains, reading a
          good book, or watching movies. My passion for technology and
          creativity fuels my drive to build functional and visually appealing
          applications.
        </p>
        <p className="about__text">
          The TripleTen program provided me with the structured learning path I
          needed to master these technologies. Their step-by-step approach
          ensured that I understood each concept thoroughly, making it easy to
          translate knowledge into real-world applications. This method not only
          allows me to build high-quality products but also ensures that my code
          is clean, maintainable, and easy for other engineers to read and
          understand. By focusing on clarity and efficiency, I create solutions
          that offer a seamless experience for both users and developers.
        </p>
      </div>
    </div>
  );
}

export default About;
