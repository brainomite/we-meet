import React from 'react';

const GroupListIndexItem = ({ group, history }) => {
  return (
    <li key={group.id} onClick={() => history.push(`/group/${group.id}`)}>
      {group.id}: {group.name}
    </li>
  );
};

export default GroupListIndexItem;
