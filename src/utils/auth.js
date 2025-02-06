export const authorize = (email, password) => {
  return new Promise((resolve) => {
    resolve({ token: "a fake token" });
  });
};

export const checkToken = (token) => {
  return new Promise((resolve) => {
    resolve({
      data: { name: "fake user", email: "fake@example,com", _id: "fake-id" },
    });
  });
};

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
