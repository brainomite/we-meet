import React from "react";

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
  const diff = isMember ? -1 : 0;
  const sharedGroups = member.common_group_counts + diff;
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
        {sharedGroups > 0 ? (
          <p>
            {sharedGroups} shared {groupOrGroups}
          </p>
        ) : null}
      </div>
    </li>
  );
};

export default MemberListItem;
