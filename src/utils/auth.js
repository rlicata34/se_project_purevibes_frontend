export const authorize = (email, password) => {
  return new Promise((resolve, reject) => {
    if (email && password) {
      const fakeToken = "fake-jwt-token-12345";
      const storedUserData = JSON.parse(localStorage.getItem("userData")) || {
        email,
        username: "FakeUser",
        avatar: "https://via.placeholder.com/150",
      };

      resolve({
        message: "User logged in successfully",
        user: storedUserData,
        token: fakeToken,
      });
    } else {
      reject(new Error("Invalid email or password"));
    }
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    if (token) {
      const storedUserData = JSON.parse(localStorage.getItem("userData"));

      if (storedUserData) {
        resolve({
          data: storedUserData,
        });
      } else {
        reject(new Error("No user data found"));
      }
    } else {
      reject(new Error("Invalid token"));
    }
  });
};

export const register = (email, password, username, avatar) => {
  return new Promise((resolve, reject) => {
    if (email && password && username && avatar) {
      const fakeToken = "fake-jwt-token-12345";
      const userData = { email, username, avatar, id: "new-fake-id" };

      localStorage.setItem("userData", JSON.stringify(userData));

      resolve({
        message: "User registered successfully",
        user: userData,
        token: fakeToken,
      });
    } else {
      reject(new Error("Invalid email, password, username or avatar URL"));
    }
  });
};
