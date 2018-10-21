import React from "react";
import MemberListItem from "./member_list_item";

class MemberList extends React.Component {
  render() {
    const { header, members, isMember, refMethod } = this.props;
    members.sort((memberA, memberB) => {
      if (memberA.name.toLowerCase() < memberB.name.toLowerCase()) {
        return -1;
      } else {
        return 1;
      }
    });
    return (
      <section className="member-list" ref={refMethod}>
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
  }
}

export default MemberList;
