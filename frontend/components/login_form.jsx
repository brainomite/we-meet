import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/session_actions.js';

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Email:
          <input type="text"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
        </label>
        <label>password:
          <input type="text"
            onChange={this.handleChange}
            name="password"
            value={this.state.password}
          />
        </label>
        <input type="submit" />
      </form>
    );
  }
}

const mdp = (dispatch) => ({
  login: (user)=>dispatch(login(user))
});

export default connect(null, mdp)(LoginForm);
