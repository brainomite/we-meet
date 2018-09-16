import React from "react";
import { Link } from "react-router-dom";

const PATHS_TO_HIDE_LINKS = ["/welcome", "/signup"];

const NavBar = props => {
  const loggedIn = Boolean(props.currentUser);
  let avatar = null;
  if (loggedIn) {
    if (props.currentUser.avatarUrl) {
      avatar = (
        <li>
          <img
            className="navbar-avatar navbar-avatar-image"
            src={props.currentUser.avatarUrl}
          />
          <i className="fas fa-caret-down"></i>
        </li>
      );
    } else {
      avatar = (
        <li>
          <span className="far fa-user-circle navbar-avatar" />
          <i className="fas fa-caret-down"></i>
        </li>
      );
    }
  }
  return (
    <header className="navbar">
      <div className="navbar-main">
        <Link to="/" className="logo">
          WeMeet
        </Link>
        <nav>
          {PATHS_TO_HIDE_LINKS.includes(props.location.pathname) ? null : (
            <ul className="navbar-main-links">
              <li className="navbar-main-links-newgroup">Start a new group</li>
              {loggedIn ? null : (
                <li>
                  <Link to="/login">Log In</Link>
                </li>
              )}
              {loggedIn ? null : (
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              )}
              {avatar}
              {loggedIn ? (
                <li>
                  <button onClick={props.logout}>logout</button>
                </li>
              ) : null}
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
