import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  const loggedIn = Boolean(props.currentUser);
  return (
    <header className="navbar">
      <h1><Link to="/" className="logo">weMeet</Link></h1>
      <nav>
        <ul className="navbar-links">
          <li className="navbar-links-newgroup">Start a new group</li>
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
    </header>
  );
};

export default NavBar;
