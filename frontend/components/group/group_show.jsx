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
  // src={window.wemeetAssets["icon_padlock.gif"]
  render() {
    const group = this.props.group;
    const imgStyleObj = {
      backgroundImage: `url(${window.wemeetAssets.defaultGroupImage})`,
    };
    // todo: fix mock
    // const memberCount =  group.member_ids.length;
    const memberCount = 2;
    const memberOrMember = memberCount === 1 ? "member" : "members";
    return (
      <main className="group">
        <header className="group-header">
          <div className="group-header-container">
            <div>
              <div>
                <div className="group-header-image" style={imgStyleObj} />
              </div>
              <section>
                <h1>{group.name}</h1>
                <ul>
                  <li>{group.hometown}</li>
                  <li>
                    {memberCount} {memberOrMember}
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </header>
        <nav id="group-nav">
          <div>
            <ul>
              <li>About</li>
              <li>members</li>
            </ul>
            <section>
              <button className="confirm-button">Join</button>
              <button className="confirm-button">Leave</button>
            </section>
          </div>
        </nav>
        <section>
          <div>name: {group.name}</div>
          <div>description: {group.description}</div>
          <div>hometown: {group.hometown}</div>
        </section>
      </main>
    );
  }
}

export default GroupShow;
