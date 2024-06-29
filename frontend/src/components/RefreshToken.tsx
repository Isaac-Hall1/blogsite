import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const response = await api.post('/api/token/refresh/', { refresh: refreshToken });
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      return response.data.access;
    } catch (error) {
      console.error('Unable to refresh token', error);
      // Optionally, you can redirect the user to the login page
      return null;
    }
}
export default refreshAccessToken