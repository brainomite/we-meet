import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions/session_actions.js';


class SignupForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      hometown_id: 1 // hard coded temporarily
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
    this.props.signup(userObj);
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name:
          <input type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
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
  signup: (user)=>dispatch(signup(user))
});

export default connect(null, mdp)(SignupForm);
