import React from "react";
import { Link } from "react-router-dom";
import { groupImage } from "../../util/group_util";

const GroupListIndexItem = ({ group }) => {
  const imgStyleObj = {
    backgroundImage: `url(${groupImage(group)})`,
  };
  return (
    <li className="group-list-index-item">
      <Link to={`/group/${group.id}`} style={imgStyleObj}>
        <div className="glii-shade" />
        <div className="glii-words">
        <h3>
          {group.name}
        </h3>
        </div>
      </Link>
    </li>
  );
};

export default GroupListIndexItem;
