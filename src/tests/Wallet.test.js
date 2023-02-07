import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { expensesData } from './helpers/expensesData';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

beforeEach(() => {
  // jest.spyOn(global, 'fetch').mockResolvedValue({
  //   json: jest.fn().mockResolvedValue({
  //     expenses: expensesData,
  //   }),
  // });
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
});

afterEach(() => {
  global.fetch.mockClear();
});

const testIDValueInput = 'value-input';
const addDespesa = 'Adicionar despesa';

describe('Testando pagina Wallet', () => {
  it('testando components na tela', () => {
    const initialState = {
      user: { email: 'filipe@trybe.com' },
      wallet: {
        currencies: [
          'USD',
          'CAD',
          'GBP',
          'ARS',
          'BTC',
          'LTC',
          'EUR',
          'JPY',
          'CHF',
          'AUD',
          'CNY',
          'ILS',
          'ETH',
          'XRP',
          'DOGE'],
        expenses: [],
      },
    };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const email = screen.getByTestId('email-field');
    expect(email).toBeInTheDocument();
    expect(email.innerHTML).toContain('filipe@trybe.com');
    const totalDespesas = screen.getByTestId('total-field');
    expect(totalDespesas).toBeInTheDocument();
    expect(totalDespesas.innerHTML).toContain('0.00');
    const headerBRL = screen.getByTestId('header-currency-field');
    expect(headerBRL).toBeInTheDocument();
    expect(headerBRL.innerHTML).toContain('BRL');
  });

  it('test formulario na tela da rota /carteira', async () => {
    const initialState = {
      // user: { email: 'filipe@trybe.com' },
      wallet: {
        currencies: [
          'USD',
          'CAD',
          'GBP',
          'ARS',
          'BTC',
          'LTC',
          'EUR',
          'JPY',
          'CHF',
          'AUD',
          'CNY',
          'ILS',
          'ETH',
          'XRP',
          'DOGE'],
        expenses: [expensesData],
      },
    };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const inputValor = screen.getByTestId(testIDValueInput);
    userEvent.type(inputValor, '40');
    expect(inputValor).toBeInTheDocument();
    const inputDescription = screen.getByTestId('description-input');
    userEvent.type(inputDescription, 'almoço');
    expect(inputDescription).toBeInTheDocument();
    const selectCurrency = screen.getByTestId('currency-input');
    await waitFor(() => {
      expect(selectCurrency).toHaveValue('USD');
    });
    userEvent.selectOptions(selectCurrency, 'USD');
    expect(selectCurrency).toBeInTheDocument();
    const selectMethod = screen.getByTestId('method-input');
    expect(selectMethod).toBeInTheDocument();
    userEvent.selectOptions(selectMethod, 'Dinheiro');
    const selectTag = screen.getByTestId('tag-input');
    expect(selectTag).toBeInTheDocument();
    userEvent.selectOptions(selectTag, 'Alimentação');
    const buttonAdd = screen.getByRole('button', { name: addDespesa });
    // userEvent.click(buttonAdd);
    expect(buttonAdd).toBeInTheDocument();
    userEvent.click(buttonAdd);
    await waitFor(() => {
      expect(screen.getByText(/almoço/i)).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /descrição/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /tag/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /método de pagamento/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /alimentação/i })).toBeInTheDocument();
    });
    // const table = screen.getByRole('table');
    // expect(table).toBeInTheDocument();
    // const buttonRemove = screen.getByRole('button', { name: 'Excluir' });
    // expect(buttonRemove).toBeInTheDocument();
    // userEvent.click(buttonRemove);
    // await waitFor(() => {
    //   expect(screen.getByRole('cell', { name: /alimentação/i })).toBeInTheDocument();
    //   const buttonEdit = screen.getByTestId('edit-btn');
    //   userEvent.click(buttonEdit);
    //   userEvent.type(inputDescription, 'viagem');
    //   const buttonEditExpense = getByRole('button', { name: 'Editar despesa' });
    //   userEvent.click(buttonEditExpense);
    //   expect(buttonEditExpense).toBeInTheDocument();
    //   expect(screen.getByText(/viagem/i)).toBeInTheDocument();
    //   expect(buttonAdd).not.toBeInTheDocument();
    // });
  });
  it('excluir despesa', async () => {
    const initialState = {
      wallet: {
        currencies: [
          'USD',
          'CAD',
          'GBP',
          'ARS',
          'BTC',
          'LTC',
          'EUR',
          'JPY',
          'CHF',
          'AUD',
          'CNY',
          'ILS',
          'ETH',
          'XRP',
          'DOGE'],
        expenses: [expensesData],
      },
    };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const inputValor = screen.getByTestId(testIDValueInput);
    userEvent.type(inputValor, '40');
    const buttonAdd = screen.getByRole('button', { name: addDespesa });
    expect(buttonAdd).toBeInTheDocument();
    userEvent.click(buttonAdd);
    await waitFor(() => {
      expect(screen.getByText(/almoço/i)).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /descrição/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /tag/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /método de pagamento/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /alimentação/i })).toBeInTheDocument();
    });
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    const buttonRemove = screen.getByRole('button', { name: 'Excluir' });
    expect(buttonRemove).toBeInTheDocument();
    userEvent.click(buttonRemove);
  });
  it('Testando editar despesa', async () => {
    const initialState = {
      wallet: {
        currencies: [
          'USD',
          'CAD',
          'GBP',
          'ARS',
          'BTC',
          'LTC',
          'EUR',
          'JPY',
          'CHF',
          'AUD',
          'CNY',
          'ILS',
          'ETH',
          'XRP',
          'DOGE'],
        expenses: [expensesData],
      },
    };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const inputValor = screen.getByTestId(testIDValueInput);
    userEvent.type(inputValor, '40');
    const buttonAdd = screen.getByRole('button', { name: addDespesa });
    expect(buttonAdd).toBeInTheDocument();
    userEvent.click(buttonAdd);
    await waitFor(() => {
      expect(screen.getByText(/almoço/i)).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /descrição/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /tag/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /método de pagamento/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /alimentação/i })).toBeInTheDocument();
    });
    const buttonEdit = screen.getAllByTestId('edit-btn')[0];
    userEvent.click(buttonEdit);
    userEvent.clear(inputValor);
    userEvent.type(inputValor, '50');
    const buttonEditExpense = screen.getByRole('button', { name: 'Editar despesa' });
    userEvent.click(buttonEditExpense);
    await waitFor(() => {
      // expect(screen.getByRole('cell', { name: /alimentação/i })).toBeInTheDocument();
      expect(buttonEditExpense).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /50\.00/i })).toBeInTheDocument();
      // expect(buttonAdd).not.toBeInTheDocument();
    });
  });
});
