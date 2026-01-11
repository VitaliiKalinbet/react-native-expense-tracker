import axios from 'axios';

const API_URL = 'https://expense-tracker-react-na-5a1fc-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData) {
  const response = await axios.post(`${API_URL}/expenses.json`, expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(`${API_URL}/expenses.json`);
  
  const expenses = [];
  for (const key in response.data) {
    const expenseData = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseData);
  }

  return expenses;
}

export async function updateExpense(id, expenseData) {
  const response = await axios.put(`${API_URL}/expenses/${id}.json`, expenseData);
  return response.data;
}

export function deleteExpense(id) {
  return axios.delete(`${API_URL}/expenses/${id}.json`);
}
