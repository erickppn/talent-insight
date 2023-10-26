import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const useApi = () => ({
  registerUser: async (name: string, email: string, password: string, confirmPassword: string, birthDate: Date) => {
    const response = await api.post('/auth/register', { name, email, password, confirmPassword, birthDate });
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

  getPublicUserInfo: async (userId: string) => {
    const response = await api.get(`/users/${userId}`);

    return response.data;
  },

  getUsersByRating: async () => {
    const response = await api.get('/users/top');

    return response.data;
  },

  followUser: async (userId: string | undefined) => {
    const token = localStorage.getItem("ti-auth-token");

    const response = await api.post(`/user/${userId}/follow`, {}, {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

    return response.data;
  },

  unfollowUser: async (userId: string | undefined) => {
    const token = localStorage.getItem("ti-auth-token");

    const response = await api.delete(`/user/${userId}/unfollow`, {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
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

  getUserRelatedPosts: async (postId: string | undefined) => {
    const response = await api.get(`/post/${postId}/related`);

    return response.data;
  },

  getUsersAndPostsByCategories: async (categoriesInUrl: string) => {
    const response = await api.get(`/search${categoriesInUrl}`);

    return response.data;
  },

  sendComment: async (postId: string | undefined, content: string) => {
    const token = localStorage.getItem("ti-auth-token");

    const response = await api.post(`/post/${postId}/comment`, { content }, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });

    return response.data;
  },

  getComments: async (postId: string | undefined) => {
    const response = await api.get(`/post/${postId}/comments`);

    return response.data;
  },

  deleteComment: async (postId: string | undefined, commentId: string) => {
    const token = localStorage.getItem("ti-auth-token");

    const response = await api.delete(`/post/${postId}/comment`, {
      data: { commentId }, 
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });

    return response.data;
  }
});