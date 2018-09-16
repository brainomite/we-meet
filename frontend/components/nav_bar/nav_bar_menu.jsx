import React from "react";

const NavBarMenu = ({ closeMenu, currentUser, logout, push, pathname }) => {
  const root = "/";
  return (
    <div className="navbar-menu-background" onClick={closeMenu}>
      <div className="navbar-menu-child" onClick={evt => evt.stopPropagation()}>
        <nav className="navbar-menu-body">
          <ul>
            <li className="navbar-menu-name">{currentUser.name}</li>
            <li
              className="navbar-menu-logout"
              onClick={() => {
                logout();
                if (pathname !== root) push(root);
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
