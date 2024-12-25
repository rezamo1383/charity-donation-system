import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // آدرس API اصلی، بخش /donations باید به صورت جداگانه اضافه شود
  headers: {
    'Content-Type': 'application/json',
  },
});

// ارسال درخواست GET برای دریافت لیست کمک‌ها
const getDonations = async () => {
  try {
    const response = await apiClient.get('/donations'); // مسیر صحیح برای دریافت کمک‌ها
    console.log('Donations:', response.data); // نمایش داده‌ها در کنسول
    return response.data; // داده‌ها را باز می‌گرداند
  } catch (error) {
    console.error('Axios error:', error);
    throw error; // در صورت بروز خطا، آن را به بیرون پرتاب می‌کند
  }
};

export { apiClient, getDonations };
