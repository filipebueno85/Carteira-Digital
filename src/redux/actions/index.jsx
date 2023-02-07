// Coloque aqui suas action
import { coinFetch } from '../../services/API';

export const USER_EMAIL = 'USER_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_FAIL = 'REQUEST_FAIL';
export const GET_EXPENSES = 'GET_EXPENSES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const PRE_EDIT_EXPENSE = 'PRE_EDIT_EXPENSE';

export const loginUser = (payload) => ({
  type: USER_EMAIL,
  payload,
});

export const getCurrencies = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});

export const getExpenses = (payload) => ({
  type: GET_EXPENSES,
  payload,
});

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  id,
});

export const editPreExpense = (id) => ({
  type: PRE_EDIT_EXPENSE,
  id,
});

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
});

export const fetchRequest = () => async (dispatch) => {
  const coinFetchR = await coinFetch();
  dispatch(getCurrencies(coinFetchR));
  // dispatch(getExpenses(coinFetchR));
};
