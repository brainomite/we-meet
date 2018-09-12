import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  const loggedIn = Boolean(props.currentUser);
  return (
    <header className="navbar">
      <div className="navbar-main">
        <Link to="/" className="logo">WeMeet</Link>
        <nav>
          <ul className="navbar-main-links">
            <li className="navbar-main-links-newgroup">Start a new group</li>
            {loggedIn ? null : <li><Link to="/login">Log In</Link></li>}
            {loggedIn ? null : <li><Link to="/signup">Sign Up</Link></li>}
            {loggedIn
              ? <li>{props.currentUser.name}</li>
              : null
            }
            {loggedIn
              ? <li><button onClick={props.logout}>logout</button></li>
              : null
            }
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
