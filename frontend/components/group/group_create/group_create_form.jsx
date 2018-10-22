import React from "react";
import FormErrors from "../../form_errors/form_errors";
import genBinderFunc from "../../../util/genBinderFunc";

class GroupCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      hometown: "",
      isFormValid: false,
      hometownValid: false,
      nameValid: false,
      descriptionValid: false,
      hometownErrorEnabled: false,
      nameErrorEnabled: false,
      descriptionErrorEnabled: false,
    };
    const binder = genBinderFunc(this);
    binder("handleChange");
    binder("handleSubmit");
    binder("handleBlur");
  }

  handleChange({ currentTarget }) {
    this.setState({
      [currentTarget.name]: currentTarget.value,
      [`${currentTarget.name}Valid`]: currentTarget.validity.valid,
    });
  }

  handleBlur({ currentTarget }) {
    console.log("currentTarget.name: ", currentTarget.name);
    if (!this.state[`${currentTarget.name}ErrorEnabled`]) {
      this.setState({
        [`${currentTarget.name}ErrorEnabled`]: true,
      });
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.isFormValid) {
      this.props
        .createGroup({
          group: this.state,
        })
        .then(action => {
          const groupId = Object.keys(action.payload.group)[0];
          this.props.history.push(`/group/${groupId}`);
        });
    }
  }
  componentDidUpdate() {
    const { nameValid, descriptionValid, hometownValid } = this.state;
    const isFormValid = nameValid && descriptionValid && hometownValid;
    if (isFormValid !== this.state.isFormValid) {
      this.setState({ isFormValid });
    }
  }
  componentWillUnmount() {
    this.props.clearGroupErrors();
  }
  fieldClass(fieldStr) {
    const valid = this.state[`${fieldStr}Valid`];
    const errorEnabled = this.state[`${fieldStr}ErrorEnabled`];
    if (errorEnabled) {
      if (!valid) {
        return "invalid-form-element";
      }
    }
    return "";
  }
  render() {
    const { isFormValid } = this.state;
    const buttonClass = isFormValid ? "confirm-button" : "disable-button";
    const descriptionClass = this.fieldClass("description");
    const nameClass = this.fieldClass("name");
    const hometownClass = this.fieldClass("hometown");
    return (
      <main className="group-create-form">
        <header>
          <div />
          <h1>Start a new group</h1>
          <p>We'll help you find the right people to make it happen</p>
        </header>
        <form onSubmit={this.handleSubmit}>
          <FormErrors errors={this.props.errors} />
          <section className="group-create-form-section">
            <div>
              <img src={window.wemeetAssets["globe"]} />
            </div>
            <div>
              <fieldset>
                <small>Step 1 of 3</small>
                <h2>What's your new Group's hometown?</h2>
                <input
                  type="text"
                  onChange={this.handleChange}
                  name="hometown"
                  value={this.state.hometown}
                  onBlur={this.handleBlur}
                  ref={el => (this.hometownInput = el)}
                  required
                  className={hometownClass}
                />
              </fieldset>
            </div>
          </section>
          <section className="group-create-form-section">
            <div>
              <img src={window.wemeetAssets["tag"]} />
            </div>
            <div>
              <fieldset>
                <small>Step 2 of 3</small>
                <h2>What will your group's name be?</h2>
                <input
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  value={this.state.name}
                  minLength="5"
                  required
                  onBlur={this.handleBlur}
                  ref={el => (this.nameInput = el)}
                  className={nameClass}
                />
              </fieldset>
              <fieldset>
                <h2>Describe who should join, and what your Group will do.</h2>
                <textarea
                  onChange={this.handleChange}
                  name="description"
                  value={this.state.description}
                  rows="8"
                  onBlur={this.handleBlur}
                  minLength="50"
                  ref={el => (this.descTextArea = el)}
                  required
                  className={descriptionClass}
                />
              </fieldset>
            </div>
          </section>
          <section className="group-create-form-section">
            <div>
              <img src={window.wemeetAssets["people"]} />
            </div>
            <div>
              <fieldset>
                <small>Step 3 of 3</small>
                <h2>What it means to be a Meetup</h2>
                <ul>
                  <li>Real, in-person conversations</li>
                  <li>Open and honest intentions</li>
                  <li>Always safe and respectful</li>
                  <li>Put your members first</li>
                </ul>
                <p>We don't review any groups.</p>
                <button className={buttonClass}>Agree & Continue</button>
              </fieldset>
            </div>
          </section>
        </form>
      </main>
    );
  }
}

export default GroupCreateForm;
