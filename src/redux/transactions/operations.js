import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://moneyg-01-back.onrender.com/api',
});

export const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
};

export const addTransaction = async (transactionData) => {
  const { data } = await instance.post('/transactions', transactionData);
  return data;
};
