import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getDonations = async () => {
  try {
    const response = await apiClient.get('/donations'); 
    console.log('Donations:', response.data); // نمایش داده‌ها در کنسول
    return response.data; 
  } catch (error) {
    console.error('Axios error:', error);
    throw error;
  }
};

export { apiClient, getDonations };
