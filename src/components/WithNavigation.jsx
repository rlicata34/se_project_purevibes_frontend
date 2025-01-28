import Navigation from "./Navigation";

function WithNavigation({
  children,
  handleLoginClick,
  handleRegisterClick,
  isLoggedIn,
}) {
  return (
    <>
      <Navigation
        handleLoginClick={handleLoginClick}
        handleRegisterClick={handleRegisterClick}
        isLoggedIn={isLoggedIn}
      />
      {children}
    </>
  );
}

export default WithNavigation;
