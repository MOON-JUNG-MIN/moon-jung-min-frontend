import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const instance = axios.create({
  baseURL: 'http://13.209.13.166:8081',
  timeout: 64000,
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('access_token');
    if (token)
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      };
    return config;
  },
  function (error) {}
);
