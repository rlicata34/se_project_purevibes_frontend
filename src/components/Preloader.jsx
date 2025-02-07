import "../blocks/Preloader.css";

function Preloader() {
  return (
    <div className="preloader__content">
      {" "}
      <div className="circle-preloader"></div>
      <div className="preloader__text">Searching for events...</div>
    </div>
  );
}

export default Preloader;
