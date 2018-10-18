import React from "react";
import { groupImage } from "../../util/group_util";

class GroupShow extends React.Component {
  constructor(props) {
    super(props);
    this.groupHeader = this.groupHeader.bind(this);
    this.groupNav = this.groupNav.bind(this);
    this.groupMain = this.groupMain.bind(this);
    this.handleJoinLeaveClick = this.handleJoinLeaveClick.bind(this);
  }
  fetchGroup(groupId) {
    this.props.fetchGroup(groupId).then(undefined, error => {
      this.props.history.replace("/");
    });
  }
  componentDidMount() {
    this.fetchGroup(this.props.match.params.groupId);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.groupId !== nextProps.match.params.groupId) {
      this.fetchGroup(nextProps.match.params.groupId);
    }
  }
  handleJoinLeaveClick() {
    const groupId = this.props.match.params.groupId;
    const result = this.props.group.isMember
      ? this.props.leaveGroup(groupId)
      : this.props.joinGroup(groupId);
    result.then(() => this.props.getCurrentUser(this.props.currentUser.id));
  }
  render() {
    const {
      groupHeader: GroupHeader,
      groupNav: GroupNav,
      groupMain: GroupMain,
    } = this;
    return (
      <main className="group">
        <GroupHeader />
        <GroupNav />
        <GroupMain />
      </main>
    );
  }
  groupMain() {
    const { group } = this.props;
    return (
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
    const { isMember } = this.props.group;
    const buttonLabel = isMember ? "Leave" : "Join";
    return (
      <nav id="group-nav">
        <div>
          <ul>
            <li>About</li>
            <li>members</li>
          </ul>
          <section>
            {!this.props.isLoggedIn ? null : (
              <button
                onClick={this.handleJoinLeaveClick}
                className="confirm-button"
              >
                {buttonLabel}
              </button>
            )}
          </section>
        </div>
      </nav>
    );
  }
}
export default GroupShow;
