import React from "react";
import FormErrors from "../../form_errors/form_errors";
import genBinderFunc from "../../../util/genBinderFunc";
import {
  GroupCreateNameError,
  GroupCreateHometownError,
  GroupCreateDescriptionError,
} from "./group_create_errors";

class GroupForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.groupId) {
      const { name, description, hometown, id } = this.props.group;
      this.state = {
        name,
        description,
        hometown,
        isFormValid: true,
        hometownValid: true,
        nameValid: true,
        descriptionValid: true,
        hometownErrorEnabled: false,
        nameErrorEnabled: false,
        descriptionErrorEnabled: false,
        id,
      };
    } else {
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
    }
    const binder = genBinderFunc(this);
    binder("handleChange");
    binder("handleSubmit");
    binder("handleBlur");
    binder("hometownSection");
    binder("nameAndDescriptionSection");
    binder("buttonSection");
    binder("handleDelete");
  }

  handleChange({ currentTarget }) {
    if ([`${currentTarget.name}ErrorEnabled`] && currentTarget.validity.valid) {
      this.setState({
        [`${currentTarget.name}ErrorEnabled`]: false,
      });
    }
    this.setState({
      [currentTarget.name]: currentTarget.value,
      [`${currentTarget.name}Valid`]: currentTarget.validity.valid,
    });
  }

  handleBlur({ currentTarget }) {
    if (!this.state[`${currentTarget.name}ErrorEnabled`]) {
      this.setState({
        [`${currentTarget.name}ErrorEnabled`]: true,
      });
    }
  }
  handleDelete(evt) {
    evt.preventDefault();
    this.props.deleteGroup().then(() => {
      this.props.history.push(`/`);
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.isFormValid) {
      const { submitGroupAction } = this.props;
      submitGroupAction({ group: this.state }).then(action => {
        const groupId = Object.keys(action.payload.group)[0];
        this.props.history.push(`/group/${groupId}`);
      });
    }
  }
  componentDidMount() {
    if (this.props.groupId) this.props.fetchGroup();
  }
  componentDidUpdate(prevProps) {
    const { nameValid, descriptionValid, hometownValid } = this.state;
    const isFormValid = nameValid && descriptionValid && hometownValid;
    if (isFormValid !== this.state.isFormValid) {
      this.setState({ isFormValid });
    }
    if (this.props.groupId) {
      const { name, description, hometown, id } = this.props.group;
      if (prevProps.group.description !== description) {
        this.setState({ id, name, description, hometown });
      }
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
  createErrorObj(fieldStr) {
    const obj = {
      [fieldStr]: this.state[fieldStr],
      [`${fieldStr}Valid`]: this.state[`${fieldStr}Valid`],
      [`${fieldStr}ErrorEnabled`]: this.state[`${fieldStr}ErrorEnabled`],
    };
    return obj;
  }
  render() {
    const { title, subtitle } = this.props;
    return (
      <main className="group-create-form">
        <header>
          <div />
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </header>
        <form onSubmit={this.handleSubmit}>
          <FormErrors errors={this.props.errors} />
          <this.hometownSection />
          <this.nameAndDescriptionSection />
          <this.buttonSection />
        </form>
      </main>
    );
  }
  sectionClass() {
    const baseClass = "group-create-form-section";
    if (this.props.showStepsAndDisclaimer) {
      return `${baseClass} step-section`;
    } else return baseClass;
  }
  hometownSection() {
    const hometownClass = this.fieldClass("hometown");
    const { hometownPrompt, showStepsAndDisclaimer } = this.props;
    return (
      <section className={this.sectionClass()}>
        <div>
          <img src={window.wemeetAssets["globe"]} />
        </div>
        <div>
          <fieldset>
            {showStepsAndDisclaimer ? <small>Step 1 of 3</small> : null}
            <h2>{hometownPrompt}</h2>
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
            <GroupCreateHometownError {...this.createErrorObj("hometown")} />
          </fieldset>
        </div>
      </section>
    );
  }
  nameAndDescriptionSection() {
    const descriptionClass = this.fieldClass("description");
    const nameClass = this.fieldClass("name");
    const {
      namePrompt,
      descriptionPrompt,
      showStepsAndDisclaimer,
    } = this.props;
    return (
      <section className={this.sectionClass()}>
        <div>
          <img src={window.wemeetAssets["tag"]} />
        </div>
        <div>
          <fieldset>
            {showStepsAndDisclaimer ? <small>Step 2 of 3</small> : null}
            <h2>{namePrompt}</h2>
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
            <GroupCreateNameError {...this.createErrorObj("name")} />
          </fieldset>
          <fieldset>
            <h2>{descriptionPrompt}</h2>
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
            <GroupCreateDescriptionError
              {...this.createErrorObj("description")}
            />
          </fieldset>
        </div>
      </section>
    );
  }
  buttonSection() {
    const { isFormValid } = this.state;
    const buttonClass = isFormValid ? "confirm-button" : "disable-button";
    const { buttonText, showStepsAndDisclaimer, showDeleteButton } = this.props;
    const disclaimerClass = showStepsAndDisclaimer ? "" : "hidden";
    return (
      <section className={this.sectionClass()}>
        <div>
          <img src={window.wemeetAssets["people"]} />
        </div>
        <div>
          <fieldset>
            {showStepsAndDisclaimer ? <small>Step 3 of 3</small> : null}
            <h2 className={disclaimerClass}>What it means to be a Meetup</h2>
            <ul className={disclaimerClass}>
              <li>Real, in-person conversations</li>
              <li>Open and honest intentions</li>
              <li>Always safe and respectful</li>
              <li>Put your members first</li>
            </ul>
            <p className={disclaimerClass}>We don't review any groups.</p>
            <button className={buttonClass}>{buttonText}</button>
            {showDeleteButton ? (
              <button className={buttonClass} onClick={this.handleDelete}>
                Delete Group
              </button>
            ) : null}
          </fieldset>
        </div>
      </section>
    );
  }
}

export default GroupForm;
