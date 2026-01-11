import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    amount: 19.99,
    date: new Date('2026-01-10'),
    description: 'A pair of shoes',
  },
  {
    id: 'e2',
    amount: 29.99,
    date: new Date('2026-01-09'),
    description: 'A pair of pants',
  },
  {
    id: 'e3',
    amount: 39.99,
    date: new Date('2025-12-03'),
    description: 'A pair of socks',
  },
  {
    id: 'e4',
    amount: 49.99,
    date: new Date('2025-12-21'),
    description: 'A pair of hats',
  },
  {
    id: 'e5',
    amount: 59.99,
    date: new Date('2025-12-22'),
    description: 'A pair of gloves',
  },
  {
    id: 'e6',
    amount: 69.99,
    date: new Date('2025-12-23'),
    description: 'A pair of hats',
  },
  {
    id: 'e7',
    amount: 79.99,
    date: new Date('2025-12-24'),
    description: 'A pair of hats',
  },
  {
    id: 'e8',
    amount: 89.99,
    date: new Date('2025-12-25'),
    description: 'A pair of hats',
  },
  {
    id: 'e9',
    amount: 99.99,
    date: new Date('2025-12-26'),
    description: 'A pair of hats',
  },
  {
    id: 'e10',
    amount: 109.99,
    date: new Date('2025-12-27'),
    description: 'A pair of hats',
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

export default function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpenseHandler(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function updateExpenseHandler(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  }

  function deleteExpenseHandler(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpenseHandler,
    deleteExpense: deleteExpenseHandler,
    updateExpense: updateExpenseHandler,
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}
