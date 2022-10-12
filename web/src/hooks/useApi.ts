import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const useApi = () => ({
  registerUser: async (name: string, email: string, password: string, confirmPassword: string, age: number) => {
    const response = await api.post('/auth/register', { name, email, password, confirmPassword, age });
    return response.data;
  },

  signinUser: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  validateUserToken: async (token: string) => {
    const response = await api.get('/auth/validate-token', {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });

    return response.data;
  },
});