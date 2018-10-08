import React from "react";
import { groupImage } from "../../util/group_util";

class GroupShow extends React.Component {
  constructor(props) {
    super(props);
    this.groupHeader = this.groupHeader.bind(this);
    this.groupNav = this.groupNav.bind(this);
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
    const { groupHeader: GroupHeader, groupNav: GroupNav } = this;
    const { group } = this.props;
    return (
      <main className="group">
        <GroupHeader />
        <GroupNav />
        <section id="group-main">
          <div>
            <div>
              <section className="group-about">
                <h2>What we're about</h2>
                <p>{group.description}</p>
              </section>
            </div>
            <section>
              <span>
                <h2>Upcoming events</h2>
              </span>
              <div>No upcoming events</div>
            </section>
          </div>
        </section>
      </main>
    );
  }
  groupHeader() {
    const group = this.props.group;
    const memberCount = group.member_ids ? group.member_ids.length : "?";
    const memberOrMember = memberCount === 1 ? "member" : "members";
    const imgStyleObj = {
      backgroundImage: `url(${groupImage(group)})`,
    };
    return (
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
    );
  }
  groupNav() {
    return (
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
    );
  }
}
export default GroupShow;
