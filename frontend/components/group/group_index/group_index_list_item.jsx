import React from "react";
import { Link } from "react-router-dom";
import { groupImage } from "../../../util/group_util";

const GroupListIndexItem = ({ group, numPerRow, idx }) => {
  const padRightClass = "glii-pad-right";
  const klasses = ["group-list-index-item"];
  if (numPerRow === "3") {
    if ((idx + 1) % 3 !== 0) {
      klasses.push(padRightClass);
    }
    klasses.push("divide-by-three");
  } else {
    if ((idx + 1) % 4 !== 0) {
      klasses.push(padRightClass);
    }
    klasses.push("divide-by-four");
  }
  const klass = klasses.join(" ");
  console.log("klass: ", klass);
  const imgStyleObj = {
    backgroundImage: `url(${groupImage(group)})`,
  };
  const members = group.member_count;
  const memberOrMembers = members === 1 ? "member" : "members";
  return (
    <li className={klass}>
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
