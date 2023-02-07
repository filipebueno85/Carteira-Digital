import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import walletImage from '../assets/wallet-image.png';
import { loginUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    isDisabled: true,
  };

  handleValidate = () => {
    const cinco = 5;
    const { email, senha } = this.state;
    const emailRegex = /^[a-z0-9.-_]+@[a-z0-9]+\.[a-z]+\)?$/i.test(email);
    if (emailRegex && senha.length >= cinco) {
      this.setState({
        isDisabled: false,
        // email: '',
        // senha: '',
      });
      return;
    }
    this.setState({
      isDisabled: true,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      { [name]: value },
      this.handleValidate(),
    );
  };

  handleClick = () => {
    const { dispatch } = this.props;
    const { email } = this.state;
    dispatch(loginUser(email));
  };

  render() {
    const { isDisabled, email, senha } = this.state;
    return (
      <div className="container">
        <div className="login-container">
          <div className="login-title">
            <h1>Carteira Digital</h1>
            <div>
              <img src={ walletImage } alt="imageWallet" />
            </div>
            <h3>Login</h3>
          </div>
          <div className="login">
            <input
              data-testid="email-input"
              type="email"
              name="email"
              value={ email }
              placeholder="Digite seu E-mail"
              id=""
              onChange={ this.handleChange }
            />
            <input
              data-testid="password-input"
              type="password"
              name="senha"
              placeholder="Digite sua Senha"
              onChange={ this.handleChange }
              value={ senha }
              id=""
            />
            <Link to="/carteira">
              <button
                disabled={ isDisabled }
                type="button"
                onClick={ this.handleClick }
              >
                Entrar

              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
