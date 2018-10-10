import React from "react";
import { connect } from "react-redux";
import { fetchGroups, fetchGroup } from "../../actions/group_actions";
import GroupListIndexItem from './group_index_list_item';

class GroupShow extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchGroups();
  }

  handleClick(groupId) {
    return () => {
      this.props.history.push(`/group/${groupId}`);
    };
  }

  render() {
    const groups = Object.values(this.props.groups);
    return (
      <main>
        <div>
          groups list here!
          <ul>
            {groups.map(group => {
              return (
                <GroupListIndexItem
                  key={group.id}
                  group={group}
                  history={this.props.history}
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
