import { AuthProvider } from "react-admin";
import axios from "axios";

const API_URL = "http://localhost:8000/";

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const response = await axios.post(`${API_URL}users/login`, {
        email: username,
        password,
      });
      const jwt_token = response.data.access_token;
      localStorage.setItem("token", jwt_token);
      return Promise.resolve();
    } catch (error) {
      console.log(error);
      return Promise.reject();
    }
  },

  logout: async () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },

  checkAuth: async () => {
    if (!localStorage.getItem("token")) {
      throw new Error("Authentication is required");
    }
  },
  checkError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem("token");
      throw new Error("Session expired");
    }
    return Promise.resolve();
  },

  getIdentity: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return Promise.reject();
    }
    const payload = JSON.parse(atob(token.split(".")[1]));
    return { id: payload.id };
  },
};
