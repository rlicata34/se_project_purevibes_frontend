export const authorize = (email, password) => {
  return new Promise((resolve, reject) => {
    if (email && password) {
      resolve({
        message: "User logged in successfully",
        user: { email, id: "new-fake-id" },
      });
    } else {
      reject(new Error("Invalid email or password"));
    }
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    if (token) {
      resolve({
        data: { name: "fake user", email: "fake@example,com", _id: "fake-id" },
      });
    } else {
      reject(new Error("Invalid token"));
    }
  });
};

export const register = (email, password, username, avatar) => {
  return new Promise((resolve, reject) => {
    if (email && password && username && avatar) {
      resolve({
        message: "User registered successfully",
        user: { email, username, avatar, id: "new-fake-id" },
      });
    } else {
      reject(new Error("Invalid email, password, username or avatar URL"));
    }
  });
};
