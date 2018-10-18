import React from "react";
import { connect } from "react-redux";
import { fetchGroups, fetchGroup } from "../../actions/group_actions";
import GroupListIndexItem from './group_index_list_item';

class GroupShow extends React.Component {
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
              return (
                <GroupListIndexItem
                  key={group.id}
                  group={group}
                />
              );
            })}
          </ul>
        </div>
      </main>
    );
  }
}

const msp = state => {
  return {
    groups: state.entities.groups,
  };
};

const mdp = dispatch => ({
  fetchGroups: () => dispatch(fetchGroups()),
  fetchGroup: id => dispatch(fetchGroup(id)),
});

export default connect(
  msp,
  mdp
)(GroupShow);
