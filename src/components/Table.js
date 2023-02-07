import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPreExpense, removeExpense } from '../redux/actions';

class Table extends Component {
  handleClick = (id) => {
    const { dispatch } = this.props;
    dispatch(removeExpense(id));
  };

  handleClickPreEdit = (id) => {
    const { dispatch } = this.props;
    dispatch(editPreExpense(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>
                Editar
                /Excluir
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                {/* <td>{`R$ ${Number(expense.value).toFixed(2).split('.').join(',')}`}</td> */}
                <td>
                  {expense.exchangeRates[expense.currency].code === 'USD'
                    && (
                      <p>
                        {`$ ${Number(expense.value).toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'CAD'
                    && (
                      <p>
                        {`C$ ${Number(expense.value).toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'GBP'
                    && (
                      <p>
                        {`£ ${Number(expense.value).toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'ARS'
                    && (
                      <p>
                        {`$ ${Number(expense.value).toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'BTC'
                    && (
                      <p>
                        {`₿ ${Number(expense.value).toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'LTC'
                    && (
                      <p>
                        {`Ł ${Number(expense.value).toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'EUR'
                    && (
                      <p>
                        {`€ ${Number(expense.value).toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'JPY'
                    && (
                      <p>
                        {`¥ ${Number(expense.value).toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'CHF'
                    && (
                      <p>
                        {`fr ${Number(expense.value).toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'AUD'
                    && (
                      <p>
                        {`AU$ ${Number(expense.value).toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'CNY'
                    && (
                      <p>
                        {`元/¥ ${Number(expense.value).toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'ILS'
                    && (
                      <p>
                        {`₪ ${Number(expense.value).toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'ETH'
                    && (
                      <p>
                        {`Ξ ${Number(expense.value).toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'XRP'
                    && (
                      <p>
                        {`XRP ${Number(expense.value).toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'DOGE'
                    && (
                      <p>
                        {`Ð ${Number(expense.value).toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                </td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>
                  {expense.exchangeRates[expense.currency].code === 'USD'
                    && (
                      <p>
                        {`$ ${Number(expense.exchangeRates[expense.currency].ask)
                          .toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'CAD'
                    && (
                      <p>
                        {`C$ ${Number(expense.exchangeRates[expense.currency].ask)
                          .toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'GBP'
                    && (
                      <p>
                        {`£ ${Number(expense.exchangeRates[expense.currency].ask)
                          .toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'ARS'
                    && (
                      <p>
                        {`$ ${Number(expense.exchangeRates[expense.currency].ask)
                          .toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'BTC'
                    && (
                      <p>
                        {`₿ ${Number(expense.exchangeRates[expense.currency].ask)
                          .toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'LTC'
                    && (
                      <p>
                        {`Ł ${Number(expense.exchangeRates[expense.currency].ask)
                          .toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'EUR'
                    && (
                      <p>
                        {`€ ${Number(expense.exchangeRates[expense.currency].ask)
                          .toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'JPY'
                    && (
                      <p>
                        {`¥ ${Number(expense.exchangeRates[expense.currency].ask)
                          .toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'CHF'
                    && (
                      <p>
                        {`fr ${Number(expense.exchangeRates[expense.currency].ask)
                          .toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'AUD'
                    && (
                      <p>
                        {`AU$ ${Number(expense.exchangeRates[expense.currency].ask)
                          .toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'CNY'
                    && (
                      <p>
                        {`元/¥ ${Number(expense.exchangeRates[expense.currency].ask)
                          .toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'ILS'
                    && (
                      <p>
                        {`₪ ${Number(expense.exchangeRates[expense.currency].ask)
                          .toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'ETH'
                    && (
                      <p>
                        {`Ξ ${Number(expense.exchangeRates[expense.currency].ask)
                          .toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'XRP'
                    && (
                      <p>
                        {`XRP ${Number(expense.exchangeRates[expense.currency].ask)
                          .toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                  {expense.exchangeRates[expense.currency].code === 'DOGE'
                    && (
                      <p>
                        {`Ð ${Number(expense.exchangeRates[expense.currency].ask)
                          .toFixed(2).split('.').join(',')}`}
                      </p>
                    )}
                </td>
                <td>{`R$ ${(
                          (expense.exchangeRates[expense.currency].ask)
                          * (expense.value)).toFixed(2).split('.').join(',')}`}</td>
                <td>Real</td>
                <td>
                  <button
                    onClick={ () => this.handleClick(expense.id) }
                    type="button"
                    data-testid="delete-btn"
                  >
                    Excluir
                  </button>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    onClick={ () => this.handleClickPreEdit(expense.id) }
                  >
                    Editar

                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
