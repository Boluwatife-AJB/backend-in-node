const axios = require("axios");

export const signIn = async (email, password) => {
  try {
    const response = await axios.post("127.0.0.1:8080/api/auth/signin", {
      email,
      password,
    });

    if (response.status) {
      console.log(response.data);
      console.log(response);
    }
  } catch (error) {
    console.error(error);
  }
};
