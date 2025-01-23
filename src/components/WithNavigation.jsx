import Navigation from "./Navigation";

function WithNavigation({ children }) {
  return (
    <>
      <div className="navigation">
        <Navigation />
      </div>
      {children}
    </>
  );
}

export default WithNavigation;
