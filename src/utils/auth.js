export const authorize = (email, password) => {
  // Pretend we did a fetch request that gave us back a token
  return new Promise((resolve, reject) => {
    resolve({ token: "a fake token" });
  });
};

export const checkToken = (token) => {
  // Pretend we did a fetch request that gave us back a user
  return new Promise((resolve, reject) => {
    resolve({
      data: { name: "fake user", email: "fake@example,com", _id: "fake-id" },
    });
  });
};

// New function to simulate user registration
export const register = (email, password, username, avatar) => {
  return new Promise((resolve, reject) => {
    if (email && password) {
      resolve({
        message: "User registered successfully",
        user: { email, id: "new-fake-id" },
      });
    } else {
      reject(new Error("Invalid email or password"));
    }
  });
};
