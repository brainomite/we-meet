import React from "react";

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

const firstLast = name => {
  const nameArr = name.split(" ");
  const firstName = nameArr[0];
  const lastName = nameArr.length === 1 ? null : nameArr[nameArr.length - 1];
  return [firstName, lastName];
};

const MemberListItem = ({ member, shouldPadRight, isMember }) => {
  const avatar = member.avatarUrl ? (
    <img src={member.avatarUrl} />
  ) : (
    <i className="far fa-user-circle" />
  );
  const klass = `member-list-item${shouldPadRight ? " mli-pad-right" : ""}`;
  const [firstName, lastName] = firstLast(member.name);
  const diff = isMember? -1 : 0;
  const sharedGroups = member.common_group_counts+diff;
  const groupOrGroups = sharedGroups === 1 ? "group" : "groups";
  return (
    <li className={klass}>
      <div>
        {avatar}
        <h3>
          {firstName}
          {lastName ? <br /> : null}
          {lastName}
        </h3>
        <p> {member.memberType} </p>
        {member.common_group_counts ? (
          <p>
            {sharedGroups} shared {groupOrGroups}
          </p>
        ) : null}
      </div>
    </li>
  );
};

export default MemberList;
