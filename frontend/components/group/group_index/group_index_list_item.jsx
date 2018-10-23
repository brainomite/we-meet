import React from "react";
import { Link } from "react-router-dom";
import { groupImage } from "../../../util/group_util";

const GroupListIndexItem = ({ group }) => {
  const imgStyleObj = {
    backgroundImage: `url(${groupImage(group)})`,
  };
  const members = group.member_count;
  const memberOrMembers = members === 1 ? "member" : "members";
  return (
    <li className="group-list-index-item">
      <Link to={`/group/${group.id}`} style={imgStyleObj}>
        <div className="glii-shade" />
        <div className="glii-words">
          <h3>{group.name}</h3>
          <p>
            We're {members} {memberOrMembers}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default GroupListIndexItem;
