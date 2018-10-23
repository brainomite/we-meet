import React from "react";
import GroupIndexList from "./group_index_list";
import genBinderFunc from "../../../util/genBinderFunc";

class GroupIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yourGroupLimit: null,
      otherGroupLimit: null,
      showAllUsergroups: false,
    };
    const binder = genBinderFunc(this);
    binder("handleUserGroupButtonClick");
  }
  componentDidMount() {
    this.props.fetchGroups();
  }
  handleUserGroupButtonClick(evt) {
    evt.preventDefault();
    this.setState({ showAllUsergroups: !this.state.showAllUsergroups });
  }
  render() {
    const { userGroups, otherGroups } = this.props.groups;
    const { yourGroupLimit, otherGroupLimit, showAllUsergroups } = this.state;
    const buttonText = showAllUsergroups ? "Show Fewer" : "Show all";
    return (
      <main className="group-index">
        <div>
          <section className="user-groups">
            <h4>Your Groups</h4>
            <GroupIndexList
              groups={userGroups}
              limit={yourGroupLimit}
              numPerRow="4"
              showAll={showAllUsergroups}
            />
            {userGroups.length <= 8 ? null : (
              <button onClick={this.handleUserGroupButtonClick}>
                {buttonText}
              </button>
            )}
          </section>
          <section>
            <h4>Suggested Groups</h4>
            <GroupIndexList
              groups={otherGroups}
              limit={otherGroupLimit}
              numPerRow="3"
              showAll
            />
          </section>
        </div>
      </main>
    );
  }
}

export default GroupIndex;
