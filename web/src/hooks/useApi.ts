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

  editUserAccount: async (name: string, email: string, confirmPassword: string, age: number) => {
    const token = localStorage.getItem("ti-auth-token");

    const response = await api.put('/user', { name, email, confirmPassword, age }, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });

    return response.data;
  },

  changeUserPassword: async (currentPassword: string, newPassword: string) => {
    const token = localStorage.getItem("ti-auth-token");

    const response = await api.put('/user/password', { currentPassword, newPassword }, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });

    return response.data;
  },

  editUserProfile: async (data: FormData) => {
    const token = localStorage.getItem("ti-auth-token");

    const response = await api.put('/user/profile/', data, { 
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });

    return response.data;
  },

  deleteUserAccount: async (password: string) => {
    const token = localStorage.getItem("ti-auth-token");

    const response = await api.delete('/user', {
      data: { password },
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });

    return response.data;
  },

  sendPost: async (data: FormData) => {
    const token = localStorage.getItem("ti-auth-token");

    const response = await api.post('/send', data, { 
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });

    return response.data;
  },

  getPostById: async (postId: string | undefined) => {
    const response = await api.get(`/post/${postId}`);

    return response.data;
  },
});