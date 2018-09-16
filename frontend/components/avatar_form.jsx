import React from "react";
import { Link } from "react-router-dom";
import { setAvatar } from "./../actions/session_actions";
import { connect } from "react-redux";

class AvatarForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: null
    };
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const formData = new FormData();
      formData.append("avatar", file);
      this.props.setAvatar(formData);
      // this.setState({ photoFile: file, photoUrl: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  render() {
    const preview = this.props.currentUser.avatarUrl ? (
      <img src={this.props.currentUser.avatarUrl} />
    ) : (
      <span className="far fa-user-circle" />
    );
    return (
      <main className="welcome">
        <h1>Welcome!</h1>
        <p>Add a photo so other members know who you are.</p>
        {preview}
        <label>
          Upload a photo
          <input type="file" onChange={this.handleFile.bind(this)} />
        </label>
        <p>Or</p>
        <Link to="/">Skip for now</Link>
      </main>
    );
  }
}
const msp = ({entities, session}) => ({
  currentUser: entities.users[session.id]
});

const mdp = dispatch => ({
  setAvatar: avatar => dispatch(setAvatar(avatar))
});

export default connect(
  msp,
  mdp
)(AvatarForm);
