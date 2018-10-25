import React from "react";
import { groupImage } from "../../util/group_util";
import MemberList from "../member_list";
import genBinderFunc from "../../util/genBinderFunc";
import { Link } from "react-router-dom";
/*
<Link
  className="avatarForm-body-skipButton avatarForm-marginBottom"
  to="/"
>
 */
class GroupShow extends React.Component {
  constructor(props) {
    super(props);
    const binder = genBinderFunc(this);
    binder("groupHeader");
    binder("groupNav");
    binder("groupMain");
    binder("handleJoinLeaveClick");
    binder("setAboutRef");
    binder("setMembersRef");
    binder("setHeaderRef");
    binder("handleScroll");
    binder("buttonOrLink");
    binder("imageButton");
    this.state = {
      headerVisable: undefined,
      aboutSectionVisable: undefined,
    };
  }
  fetchGroup(groupId) {
    this.props.fetchGroup(groupId).then(undefined, error => {
      this.props.history.replace("/");
    });
  }
  componentDidMount() {
    this.fetchGroup(this.props.match.params.groupId);
    this.handleScroll();
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
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
  handleFile() {
    return event => {
      const file = event.currentTarget.files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        const formData = new FormData();
        formData.append("image", file);
        this.props.setImage(this.props.group.id, formData);
      };
      if (file) {
        fileReader.readAsDataURL(file);
      }
    };
  }
  render() {
    const {
      groupHeader: GroupHeader,
      groupNav: GroupNav,
      groupMain: GroupMain,
    } = this;
    return (
      <main className="group" onScroll={this.handleScroll}>
        <GroupHeader />
        <GroupNav />
        <GroupMain />
      </main>
    );
  }
  setAboutRef(element) {
    this.aboutSection = element;
  }
  setMembersRef(element) {
    this.membersSection = element;
  }
  setHeaderRef(element) {
    this.header = element;
  }
  handleScrollTo(element) {
    window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
  }
  getTopBottom(element) {
    const bounds = element.getBoundingClientRect();
    const top = bounds.top;
    const bottom = bounds.bottom;
    return [top, bottom];
  }
  setVisable(element, stateKey, offset = 0) {
    const [top, bottom] = this.getTopBottom(element);
    const isVisable = top >= offset || bottom >= offset;
    if (this.state[stateKey] !== isVisable) {
      this.setState({ [stateKey]: isVisable });
    }
  }
  handleScroll() {
    this.setVisable(this.header, "headerVisable");
    this.setVisable(this.aboutSection, "aboutSectionVisable", 80);
  }
  groupMain() {
    const { group } = this.props;

    return (
      <section id="group-main">
        <div>
          <div>
            <section className="group-about" ref={this.setAboutRef}>
              <h2>What we're about</h2>
              <p>{group.description}</p>
            </section>
            <MemberList
              header="Members"
              members={Object.values(group.members)}
              isMember={group.isMember}
              refMethod={this.setMembersRef}
            />
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
    let organizer = {};
    if (group.organizerIds) {
      const organizerId = group.organizerIds[0];
      organizer = group.members[organizerId] || {};
    }
    const avatar = organizer.avatarUrl ? (
      <img src={organizer.avatarUrl} />
    ) : (
      <i className="far fa-user-circle" />
    );
    return (
      <header className="group-header" ref={this.setHeaderRef}>
        <div className="group-header-container">
          <div>
            <div>
              <img
                className="group-header-image"
                src={groupImage(group)}
                onLoad={this.props.closeModal}
              />
              <this.imageButton />
            </div>
            <section>
              <h1>{group.name}</h1>
              <ul>
                <li>{group.hometown}</li>
                <li>
                  {memberCount} {memberOrMember}
                </li>
              </ul>
              <div>
                {avatar}
                <div>
                  <span>Organized By</span>
                  <p>{organizer.name ? organizer.name.split(" ")[0] : "?"}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </header>
    );
  }
  imageButton() {
    const { isOrganizer } = this.props.group;
    if (!isOrganizer) return null;
    return (
      <label>
        <div>
          <i className="far fa-image" /> <span>Upload a photo</span>
        </div>
        <input
          className="image-input"
          type="file"
          onChange={this.handleFile()}
        />
      </label>
    );
  }
  groupNav() {
    return (
      <nav
        id="group-nav"
        className={this.state.headerVisable ? "" : "group-show-sticky"}
      >
        <div>
          <ul>
            <li
              onClick={() => this.handleScrollTo(this.aboutSection)}
              className={
                this.state.aboutSectionVisable ? "group-show-blue" : ""
              }
            >
              About
            </li>
            <li
              onClick={() => this.handleScrollTo(this.membersSection)}
              className={
                !this.state.aboutSectionVisable ? "group-show-blue" : ""
              }
            >
              Members
            </li>
          </ul>
          <section>
            <this.buttonOrLink />
          </section>
        </div>
      </nav>
    );
  }
  buttonOrLink() {
    if (!this.props.isLoggedIn) return null;
    const { isMember, isOrganizer } = this.props.group;
    const buttonClass = "confirm-button";
    if (isOrganizer) {
      const { id } = this.props.group;
      return (
        <Link className={buttonClass} to={`/group/${id}/edit`}>
          Manage
        </Link>
      );
    } else {
      const buttonLabel = isMember ? "Leave" : "Join";
      return (
        <button
          onClick={isOrganizer ? null : this.handleJoinLeaveClick}
          className={buttonClass}
        >
          {buttonLabel}
        </button>
      );
    }
  }
}
export default GroupShow;
