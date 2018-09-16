import React from "react";
import { Link } from "react-router-dom";

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

      this.setState({photoFile: file, photoUrl: fileReader.result});
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  render() {
    const preview = this.state.photoUrl ? (
      <img src={this.state.photoUrl} />
    ) : (
      <span className="far fa-user-circle" />
    );
    return (
      <main className="welcome">
        <h1>Welcome!</h1>
        <p>Add a photo so other members know who you are.</p>
        {preview}
        <input type="file" onChange={this.handleFile.bind(this)} />
        <p>Or</p>
        <Link to="/">Skip for now</Link>
      </main>
    );
  }
}

export default AvatarForm;
