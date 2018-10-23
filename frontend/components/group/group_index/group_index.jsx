import React from "react";
import GroupListIndexItem from "./group_index_list_item";

class GroupIndex extends React.Component {
  componentDidMount() {
    this.props.fetchGroups();
  }

  render() {
    const groups = Object.values(this.props.groups);
    return (
      <main className="group-index">
        <div>
          <h4>All meetups</h4>
          <ul>
            {groups.map(group => {
              return <GroupListIndexItem key={group.id} group={group} />;
            })}
          </ul>
        </div>
      </main>
    );
  }
}

export default GroupIndex;
