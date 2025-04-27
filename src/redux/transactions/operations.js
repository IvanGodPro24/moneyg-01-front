import axios from 'axios';

export const addTransaction = async (transactionData) => {
  const { data } = await axios.post('/transactions', transactionData);
  return data;
};
