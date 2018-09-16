import React from "react";

const NavBarMenu = ({ closeMenu }) => {
  return (
    <div className="navbar-menu-background" onClick={closeMenu}>
      <div className="navbar-menu-child" onClick={evt => evt.stopPropagation()}>
        <nav className="navbar-menu-body">
          <ul>
            <li />
            <li />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBarMenu;
