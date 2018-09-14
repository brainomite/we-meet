import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../../actions/session_actions.js";
// import FormErrors from "/form_errors/form_errors";

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
            <div className="signup-buffer">
              <p className="signup-form-label">Name:</p>
              <input
                type="text"
                name="name"
                className="signup-form-input"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="signup-buffer">
              <p className="signup-form-label">Email:</p>
              <input
                type="text"
                name="email"
                className="signup-form-input"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </div>
            <div className="signup-buffer">
              <p className="signup-form-label">Password:</p>
              <input
                type="password"
                className="signup-form-input"
                onChange={this.handleChange}
                name="password"
                value={this.state.password}
              />
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
