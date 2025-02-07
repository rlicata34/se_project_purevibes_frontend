import React from "react";

export const CurrentUserContext = React.createContext({
  username: "",
  email: "",
  avatar: "",
  clearCurrentUser: () => {},
  updateCurrentUser: () => {},
});
