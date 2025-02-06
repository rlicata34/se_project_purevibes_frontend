import Navigation from "./Navigation";

function WithNavigation({
  children,
  handleLoginClick,
  handleRegisterClick,
  isLoggedIn,
  handleLogout,
  handleMenuClick,
}) {
  return (
    <>
      <Navigation
        handleLoginClick={handleLoginClick}
        handleRegisterClick={handleRegisterClick}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        handleMenuClick={handleMenuClick}
      />
      {children}
    </>
  );
}

export default WithNavigation;
