import Navigation from "./Navigation";

function WithNavigation({ children, handleLoginClick, handleRegisterClick }) {
  return (
    <>
      <Navigation
        handleLoginClick={handleLoginClick}
        handleRegisterClick={handleRegisterClick}
      />
      {children}
    </>
  );
}

export default WithNavigation;
