import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions/session_actions.js';

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleClick(event){
    event.preventDefault();
    const userObj = {
      user: this.state
    };
    this.props.login(userObj);
  }

  render () {
    return (
      <main className="login">
        <div className="login-body">
          <header className="login-body-header">
            <h1>Log in</h1>
            <small>Not registered with us yet? <
              Link to="/signup">Sign up</Link>
            </small>
          </header>
          <form className="login-body-form">
            <label>Email:
              <input type="text"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
                className="login-form-input"
                />
            </label>
            <label>password:
              <input type="text"
                onChange={this.handleChange}
                name="password"
                className="login-body-form-input"
                value={this.state.password}
                />
            </label>
            <button
              onSubmit={this.handleClick}
              className="login-body-form-button"
            >Log In</button>
          </form>
          <section className="login-body-footer">
            <button>Demo User</button>
          </section>
        </div>
      </main>
    );
  }
}

const mdp = (dispatch) => ({
  login: (user)=>dispatch(login(user))
});

export default connect(null, mdp)(LoginForm);
