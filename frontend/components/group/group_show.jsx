import React from "react";

class GroupShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchGroup(this.props.match.params.groupId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.groupId !== nextProps.match.params.groupId) {
      this.props.fetchGroup(nextProps.match.params.groupId);
    }
  }

  render() {
    return (
      <main>
        Welcome to group! {this.props.match.params.groupId}
        <section>
          <div>name: {this.props.group.name}</div>
          <div>description: {this.props.group.description}</div>
          <div>hometown: {this.props.group.hometown}</div>
        </section>
      </main>
    );
  }
}

export default GroupShow;
