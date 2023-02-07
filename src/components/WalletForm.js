import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editExpense, fetchRequest, getExpenses } from '../redux/actions';
import { coinFetch } from '../services/API';

const alimentacao = 'Alimentacao';
class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: alimentacao,
  };

  componentDidMount() {
    const { currencies } = this.props;
    const { dispatch } = this.props;
    dispatch(fetchRequest(currencies));
  }

  componentDidUpdate(prevProps) {
    const { idToEdit, expenses, editor } = this.props;
    // console.log(prevProps);
    if (editor && idToEdit !== prevProps.idToEdit) {
      // console.log('ajudaeu');
      const moeda = expenses.find((item) => item.id === idToEdit);
      // console.log(moeda);
      this.setState({
        ...moeda,
      });
    }
  }

  handleClickEdit = () => {
    const { dispatch, idToEdit } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag } = this.state;

    const newExpense = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(editExpense(newExpense));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      { [name]: value },
    );
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    const { id,
      value,
      description,
      currency,
      method,
      tag } = this.state;
    const coinFetchR = await coinFetch();
    const newExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: coinFetchR,
    };
    // console.log(newExpense);
    dispatch(getExpenses(newExpense));
    this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
    });
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag } = this.state;
    const { currencies, editor } = this.props;
    return (
      <div>
        <form className="form-currencies">
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              type="text"
              name="value"
              id="value"
              value={ value }
              onChange={ this.handleChange }
              placeholder="Valor da despesa"
            />
          </label>
          <label htmlFor="description">
            Descrição da Despesa:
            <input
              data-testid="description-input"
              type="text"
              id="description"
              value={ description }
              name="description"
              onChange={ this.handleChange }
              placeholder="Descrição"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              id="currency"
              onChange={ this.handleChange }
            >
              {currencies.length
            && currencies.map((coin, index) => (
              <option
                key={ index }
                value={ coin }
              >
                {coin}
              </option>))}
            </select>
          </label>
          <label htmlFor="method">
            Metodo de Pagamento:
            <select
              data-testid="method-input"
              name="method"
              onChange={ this.handleChange }
              value={ method }
              id="method"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              value={ tag }
              data-testid="tag-input"
              name="tag"
              onChange={ this.handleChange }
              id="tag"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          {editor
            ? (
              <button
                onClick={ this.handleClickEdit }
                type="button"
              >
                Editar despesa

              </button>
            )
            : (
              <button
                onClick={ this.handleClick }
                type="button"
              >
                Adicionar despesa

              </button>
            )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
