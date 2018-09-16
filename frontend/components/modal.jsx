import React from 'react';
import { connect } from 'react-redux';
import Loading from './loading';

function Modal({ modal }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'loading':
    component = <Loading />;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" >
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};


export default connect(mapStateToProps)(Modal);
