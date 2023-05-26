import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://13.209.13.166:8081',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
});
