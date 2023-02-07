import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import walletImage from '../assets/wallet-image.png';

class Header extends Component {
  state = {
    sum: 0,
  };

  componentDidUpdate(prevProps) {
    const { expenses } = this.props;
    if (prevProps.expenses !== expenses) {
      this.setState({
        sum: this.sumValues(),
      });
    }
  }

  sumValues = () => {
    const { expenses } = this.props;
    return expenses.reduce((acc, currExpese) => {
      const { currency, value, exchangeRates } = currExpese;
      // console.log(exchangeRates, currency);
      const currencyOBJ = exchangeRates[currency];
      // console.log(currencyOBJ);
      const { ask } = currencyOBJ;
      // console.log(ask);
      // console.log(Number(value) * Number(ask));
      return acc + Number(value) * Number(ask);
    }, 0);
  };

  render() {
    const { sum } = this.state;
    const { email } = this.props;
    return (
      <header>
        <h1>Carteira Digital</h1>
        <div className="header-content">
          <p data-testid="email-field">{`E-mail: ${email}`}</p>
          <p
            data-testid="total-field"
          >
            { `Valor total das Despesas: R$ ${sum.toFixed(2).split('.').join(',')}`}

          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
        <div>
          <img src={ walletImage } alt="imageWallet" />
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  // dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
