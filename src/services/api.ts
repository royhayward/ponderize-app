import axios from 'axios';
import { Scripture } from '../types/scripture';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createScripture = async (scripture: Scripture) => {
  try {
  const response = await api.post('/scriptures', scripture);
  return response.data;
  } catch (error) {
    console.error('API Error:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw error;
  }
};

export const getScripture = async (year: number, week: number) => {
  const response = await api.get(`/scriptures/${year}/${week}`);
  return response.data as Scripture;
};

export const getCurrentScripture = async (): Promise<Scripture> => {
  const response = await api.get('/scriptures/current');
  return response.data as Scripture;
};

export default api;