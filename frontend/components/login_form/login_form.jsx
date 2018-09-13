import React from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoClick = this.handleDemoClick.bind(this);
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event){
    event.preventDefault();
    const userObj = {
      user: this.state
    };
    this.props.login(userObj);
  }

  handleDemoClick(event){
    event.preventDefault();
    const userObj = {
      user: {
        email: 'kermit@thefrog.com',
        password: 'misspiggy'
      }
    };
    this.props.login(userObj);
  }

  render () {
    return (
      <main className="login">
        <div className="login-body">
          <header className="login-body-header login-container">
            <h1>Log in<img
              src={window.wemeetAssets["icon_padlock.gif"]}
              />
            </h1>
            <p>Not registered with us yet? <
              Link to="/signup">Sign up</Link>
            </p>
          </header>
          <form
            className="login-body-form login-container"
            onSubmit={this.handleSubmit}
          >
            <p>Email address:</p>
              <input type="text"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
                className="login-body-form-input login-body-form-email"
                />
            <p>Password:</p>
            <input type="password"
              onChange={this.handleChange}
              name="password"
              className="login-body-form-input login-body-form-password"
              value={this.state.password}
              />
            <button
              className="login-body-form-button"
            >Log In</button>
          </form>
          <div className="login-body-or">OR</div>
          <section className="login-body-footer login-container">
            <button
              className="login-body-footer-demo"
              onClick={this.handleDemoClick}
            >Login with the Demo User</button>
          </section>
        </div>
      </main>
    );
  }
}



export default LoginForm;
