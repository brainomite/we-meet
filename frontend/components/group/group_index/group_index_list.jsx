import React from "react";
import GroupListIndexItem from "./group_index_list_item";

const rowsToDisplay = (items, itemsPerRow) => {
  const divisionResult = items / itemsPerRow;
  if (items % itemsPerRow === 0) {
    return divisionResult;
  } else {
    return Math.floor(divisionResult) + 1;
  }
};

const GroupIndexList = ({ groups, limit, numPerRow, showAll }) => {
  const groupsToDisplay = limit ? groups.slice(0, limit) : groups;
  const pixPerRow = 200;
  const numPerRowInt = Number.parseInt(numPerRow);
  const height = showAll
    ? pixPerRow * rowsToDisplay(groupsToDisplay.length, numPerRowInt)
    : 2 * pixPerRow;
  return (
    <ul className="group-index-list" style={{ height: `${height}px` }}>
      {groupsToDisplay.map((group, idx) => {
        return (
          <GroupListIndexItem
            key={group.id}
            group={group}
            numPerRow={numPerRow}
            idx={idx}
          />
        );
      })}
    </ul>
  );
};

export default GroupIndexList;
