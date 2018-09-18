import React from "react";
import { connect } from "react-redux";
import { createGroup } from "../actions/group_actions";

class GroupCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      hometown: ""
    };
  }

  render() {
    return (
      <main>
        <header>
          <h1>Start a new group</h1>
          <p>We'll help you find the right people to make it happen</p>
        </header>
        <section>
          <div>
            <span>Step 1 of 3</span>
            <h2>What's your new Group's hometown?</h2>
            <input type="text" name="hometown" value={this.state.hometown} />
          </div>
          <div>
            <span>Step 2 of 3</span>
            <h2>What will your group's name be?</h2>
            <input type="text" name="name" value={this.state.name} />
            <h2>Describe who should join, and what your Group will do.</h2>
            <textarea name="description" value={this.state.description} />
          </div>
          <div>
            <span>Step 3 of 3</span>
            <h2>What it means to be a Meetup</h2>
            <ul>
              <li>Real, in-person conversations</li>
              <li>Open and honest intentions</li>
              <li>Always safe and respectful</li>
              <li>Put your members first</li>
            </ul>
            <h2>We don't review any groups.</h2>
            <button>Agree & Continue</button>
          </div>
        </section>
      </main>
    );
  }
}
const msp = null;
const mdp = dispatch => ({
  createGroup: group => dispatch(createGroup(group))
});

export default connect(
  msp,
  mdp
)(GroupCreateForm);
