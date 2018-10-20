import React from "react";
import MemberListItem from "./member_list_item";

const MemberList = ({ header, members, isMember }) => {
  members.sort((memberA, memberB) => {
    if (memberA.name.toLowerCase() < memberB.name.toLowerCase()) {
      return -1;
    } else {
      return 1;
    }
  });
  return (
    <section className="member-list">
      <h2>
        {header} ({members.length})
      </h2>
      <ul>
        {members.map((member, idx) => {
          const shouldPadRight = Boolean((idx + 1) % 4);
          return (
            <MemberListItem
              key={member.id}
              member={member}
              shouldPadRight={shouldPadRight}
              isMember={isMember}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default MemberList;
