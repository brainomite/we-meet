import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  const loggedIn = Boolean(props.currentUser);
  return (
    <header>
      <h1>weMeet</h1>
      <nav>
        <ul>
          <li><Link to="/">Start a new group</Link></li>
          {loggedIn ? null : <li><Link to="#">Log In</Link></li>}
          {loggedIn ? null : <li><Link to="/signup">Sign Up</Link></li>}
          {loggedIn
            ? <li>{props.currentUser.name}</li>
            : null
          }
        </ul>
        {loggedIn
          ? <button onClick={props.logout}>logout</button>
          : null
        }
      </nav>
    </header>
  );
};

export default NavBar;
