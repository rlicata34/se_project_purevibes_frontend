import Navigation from "./Navigation";

function WithNavigation({ children }) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}

export default WithNavigation;
