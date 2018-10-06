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
    const group = this.props.group;
    // todo: fix mock
    // const memberCount =  group.member_ids.length;
    const memberCount = 2;
    const memberOrMember = memberCount === 1 ? "member" : "members";
    return (
      <main className="group">
        <header className="group-header">
          <div className="group-header-container">
            <div className="group-header-image" />
            <div>
              <h1>{group.name}</h1>
              <ul>
                <li>{group.hometown}</li>
                <li>
                  {memberCount} {memberOrMember}
                </li>
              </ul>
            </div>
          </div>
        </header>
        <section>
          <div>name: {group.name}</div>
          <div>description: {group.description}</div>
          <div>hometown: {group.hometown}</div>
          <button className="confirm-button">Join</button>
          <br />
          <button className="confirm-button">Leave</button>
        </section>
      </main>
    );
  }
}

export default GroupShow;
