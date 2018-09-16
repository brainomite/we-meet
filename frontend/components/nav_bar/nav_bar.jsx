import React from "react";
import { Link } from "react-router-dom";
import NavBarMenu from "./nav_bar_menu";

const PATHS_TO_HIDE_LINKS = ["/welcome", "/signup"];

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: null
    };
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  openMenu() {
    this.setState({
      menu: <NavBarMenu closeMenu={this.closeMenu} />
    });
  }

  closeMenu(evt) {
    evt.stopPropagation()
    this.setState({
      menu: null
    });
  }

  render() {
    const loggedIn = Boolean(this.props.currentUser);
    let avatar = null;
    if (loggedIn) {
      if (this.props.currentUser.avatarUrl) {
        avatar = (
          <li onClick={this.openMenu}>
            <img
              className="navbar-avatar navbar-avatar-image"
              src={this.props.currentUser.avatarUrl}
            />
            <span className="fas fa-caret-down" />
            {this.state.menu}
          </li>
        );
      } else {
        avatar = (
          <li onClick={this.openMenu}>
            <span className="far fa-user-circle navbar-avatar" />
            <span className="fas fa-caret-down" />
            {this.state.menu}
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
            {PATHS_TO_HIDE_LINKS.includes(
              this.props.location.pathname
            ) ? null : (
              <ul className="navbar-main-links">
                <li className="navbar-main-links-newgroup">
                  Start a new group
                </li>
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
                    <button onClick={this.props.logout}>logout</button>
                  </li>
                ) : null}
              </ul>
            )}
          </nav>
        </div>
      </header>
    );
  }
}

export default NavBar;
