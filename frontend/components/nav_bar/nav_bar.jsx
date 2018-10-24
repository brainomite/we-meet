import React from "react";
import { Link } from "react-router-dom";
import NavBarMenu from "./nav_bar_menu";

const PATHS_TO_HIDE_LINKS = ["/welcome", "/signup"];

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideMenu: true,
    };
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.renderCreateGroup = this.renderCreateGroup.bind(this);
  }

  componentDidUpdate() {
    if (this.state.menu && !this.props.currentUser) {
      this.setState({ menu: null });
    }
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.getCurrentUser(this.props.currentUser.id);
    }
  }

  componentDidUpdate(prevProps) {
    const oldPath = prevProps.location.pathname;
    const curPath = this.props.location.pathname;
    const curLoggedIn = this.props.isLoggedIn;
    const oldLoggedIn = prevProps.isLoggedIn;

    if (!this.state.hideMenu && curLoggedIn !== oldLoggedIn) {
      this.closeMenu();
    }

    if (curLoggedIn && oldPath !== curPath) {
      if (!this.state.hideMenu) this.closeMenu();
      if (this.props.isLoggedIn) {
        this.props.getCurrentUser(this.props.currentUser.id);
      }
    }
  }

  menu() {
    if (this.state.hideMenu) {
      return null;
    } else {
      return (
        <NavBarMenu
          closeMenu={this.closeMenu}
          logout={this.props.logout}
          currentUser={this.props.currentUser}
          push={this.props.history.push}
          pathname={this.props.location.pathname}
          userGroups={this.props.userGroups}
        />
      );
    }
  }

  openMenu() {
    this.setState({
      hideMenu: false,
    });
  }

  closeMenu(evt) {
    if (evt) evt.stopPropagation();
    this.setState({
      hideMenu: true,
    });
  }

  renderCreateGroup() {
    const { pathname } = this.props.location;
    if (!this.props.isLoggedIn || pathname === "/create") return null;
    let newGroupClass = "navbar-main-links-newgroup";
    if (pathname === "/")
      newGroupClass += " navbar-main-links-newgroup-signedin";
    return (
      <li className={newGroupClass}>
        <Link to="/create">Start a new group</Link>
      </li>
    );
  }

  render() {
    const { isLoggedIn } = this.props;
    const { renderCreateGroup: RenderCreateGroup } = this;
    let avatar = null;
    if (isLoggedIn) {
      if (this.props.currentUser.avatarUrl) {
        avatar = (
          <li onClick={this.openMenu}>
            <img
              className="navbar-avatar navbar-avatar-image"
              src={this.props.currentUser.avatarUrl}
            />
            <span className="fas fa-caret-down" />
            {this.menu()}
          </li>
        );
      } else {
        avatar = (
          <li onClick={this.openMenu}>
            <span className="far fa-user-circle navbar-avatar" />
            <span className="fas fa-caret-down" />
            {this.menu()}
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
          <nav className="navbar-main-nav">
            {PATHS_TO_HIDE_LINKS.includes(
              this.props.location.pathname
            ) ? null : (
              <ul className="navbar-main-links">
                <RenderCreateGroup />
                {isLoggedIn ? null : (
                  <li>
                    <Link to="/login">Log In</Link>
                  </li>
                )}
                {isLoggedIn ? null : (
                  <li>
                    <Link to="/signup">Sign Up</Link>
                  </li>
                )}
                {avatar}
              </ul>
            )}
          </nav>
        </div>
      </header>
    );
  }
}

export default NavBar;
