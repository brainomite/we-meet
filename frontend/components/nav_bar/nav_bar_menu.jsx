import React from "react";
import { Link } from "react-router-dom";

const NavBarMenu = ({
  closeMenu,
  currentUser,
  logout,
  push,
  pathname,
  userGroups,
}) => {
  const root = "/";
  return (
    <div className="navbar-menu-background" onClick={closeMenu}>
      <div className="navbar-menu-child" onClick={evt => evt.stopPropagation()}>
        <nav className="navbar-menu-body">
          <ul className="navbar-menu-body-groups">
            {userGroups.map(group => {
              return (
                <li key={group.id} className="menu-hover">
                  <Link to={`/group/${group.id}`}>{group.name}</Link>
                </li>
              );
            })}
          </ul>
          <ul className="navbar-menu-body-admin">
            <li className="navbar-menu-name">{currentUser.name}</li>
            <li
              className="navbar-menu-logout menu-hover"
              onClick={() => {
                logout().then(() => {
                  if (pathname !== root) push(root);
                });
              }}
            >
              Logout
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBarMenu;
