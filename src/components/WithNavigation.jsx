import Navigation from "./Navigation";

function WithNavigation({
  children,
  handleLoginClick,
  handleRegisterClick,
  isLoggedIn,
  handleLogout,
}) {
  return (
    <>
      <Navigation
        handleLoginClick={handleLoginClick}
        handleRegisterClick={handleRegisterClick}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />
      {children}
    </>
  );
}

export default WithNavigation;
