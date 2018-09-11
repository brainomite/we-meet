import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions.js';
import NavBar from './nav_bar.jsx';

const msp = ({entities, session}) => ({
  currentUser: entities.users[session.id]
});

const mdp = (dispatch) => ({
  logout: ()=>dispatch(logout())
});

export default connect(msp, mdp)(NavBar);
