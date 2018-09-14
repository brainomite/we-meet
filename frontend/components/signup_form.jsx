import React from "react";
import { connect } from "react-redux";
import { signup } from "../actions/session_actions.js";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      hometown_id: 1 // hard coded temporarily
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const userObj = {
      user: this.state
    };
    this.props.signup(userObj);
  }

  render() {
    return (
      <main className="signup">
        <div className="signup-form">
          <form onSubmit={this.handleSubmit}>
            <h1 className="signup-form-header">Sign Up</h1>
            <p>Name:</p>
            <input
              type="text"
              name="name"
              className="signup-form-input"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <p>Email:</p>
            <input
              type="text"
              name="email"
              className="signup-form-input"
              onChange={this.handleChange}
              value={this.state.email}
            />
            <p>password:</p>
            <input
              type="text"
              className="signup-form-input"
              onChange={this.handleChange}
              name="password"
              value={this.state.password}
            />
            <input type="submit" />
          </form>
        </div>
      </main>
    );
  }
}

const mdp = dispatch => ({
  signup: user => dispatch(signup(user))
});

export default connect(
  null,
  mdp
)(SignupForm);
