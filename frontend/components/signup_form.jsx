import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../actions/session_actions.js";

const isEmailInvalid = email => {
  // regex grabbed from http://emailregex.com/
  // eslint-disable-next-line max-len
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !emailRegex.test(String(email).toLowerCase());
};

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
        password: "",
        hometown_id: 1 // hard coded temporarily
      },
      nameWarning: "",
      emailWarning: "",
      passwordWarning: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateName = this.validateName.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  handleChange(event) {
    this.setState({
      user: {
        [event.target.name]: event.target.value.trim
      }
    });
  }

  validateName() {
    if (this.state.user.name === "") {
      this.setState({
        nameWarning: "Can't be empty"
      });
      return false;
    }
    return true;
  }

  validateEmail() {
    if (this.state.user.email === "") {
      this.setState({
        emailWarning: "Can't be empty"
      });
      return false;
    } else if (isEmailInvalid(this.state.user.email)) {
      this.setState({
        emailWarning: "Doesn't look like an email address"
      });
      return false;
    }
    return true;
  }

  validatePassword() {
    if (this.state.user.password === "") {
      this.setState({
        passwordWarning: "Can't be empty"
      });
      return false;
    } else if (this.state.user.password.length < 8) {
      this.setState({
        passwordWarning: "Can't be less than 8 characters"
      });
      return false;
    }
    return true;
  }

  handleSubmit(event) {
    event.preventDefault();
    const isValid = () => {
      let valid = true;
      valid = this.validateName() && valid;
      valid = this.validateEmail() && valid;
      valid = this.validatePassword() && valid;
      return valid;
    };
    if (isValid()) {
      const userObj = {
        user: this.state.user
      };
      this.props.signup(userObj);
    }
  }

  render() {
    const { nameWarning, emailWarning, passwordWarning } = this.state;
    const nameWarningClass = nameWarning ? "sigup-input-warning" : "";
    const emailWarningClass = emailWarning ? "sigup-input-warning" : "";
    const passwordWarningClass = passwordWarning ? "sigup-input-warning" : "";
    return (
      <main className="signup">
        <div className="signup-form">
          <form onSubmit={this.handleSubmit}>
            <h1 className="signup-form-header">Sign Up</h1>
            <div className="signup-buffer">
              <p className="signup-form-label">Name:</p>
              <input
                type="text"
                name="name"
                className={`signup-form-input ${nameWarningClass}`}
                value={this.state.name}
                onChange={this.handleChange}
              />
              {nameWarning ? (
                <p className="signup-form-warning">{nameWarning}</p>
              ) : null}
            </div>
            <div className="signup-buffer">
              <p className="signup-form-label">Email:</p>
              <input
                type="text"
                name="email"
                className={`signup-form-input ${emailWarningClass}`}
                onChange={this.handleChange}
                value={this.state.email}
              />
              {emailWarning ? (
                <p className="signup-form-warning">{emailWarning}</p>
              ) : null}
            </div>
            <div className="signup-buffer">
              <p className="signup-form-label">Password:</p>
              <input
                type="password"
                className={`signup-form-input ${passwordWarningClass}`}
                onChange={this.handleChange}
                name="password"
                value={this.state.password}
              />
              {passwordWarning ? (
                <p className="signup-form-warning">{passwordWarning}</p>
              ) : null}
            </div>
            <div className="signup-buffer">
              <p className="signup-form-public">
                Your name is public. We probably won't use your email address to
                send you updates, and let you know about newly created events.
              </p>
            </div>
            <div className="signup-buffer">
              <button className="signup-form-submit confirm-button">
                Continue
              </button>
            </div>
            <div className="signup-buffer">
              <p className="signup-form-disclaimer">
                When you "Continue", you agree to have a great day. This is a
                student project be careful of what data you submit as we will
                not manage your information super securely, please submit fake
                data only!
              </p>
            </div>
            <section className="signup-form-footer">
              <div className="signup-buffer signup-buffer-padding-top">
                <p className="signup-form-footer-login">
                  Already a member? <Link to="/login">Log in.</Link>
                </p>
              </div>
              <div className="signup-buffer">
                <button
                  className="signup-form-footer-demo demo-button"
                  onClick={this.handleDemoClick}
                >
                  Login with the Demo User
                </button>
              </div>
            </section>
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
