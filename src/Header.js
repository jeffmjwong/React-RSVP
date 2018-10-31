import React from 'react';
import PropTypes from 'prop-types';

import GuestInputForm from './GuestInputForm';

const Header = (props) => {
  return (
    <header>
      <h1>RSVP</h1>
      <p>A Treehouse App</p>

      <GuestInputForm
        pendingGuest={props.pendingGuest}
        newGuestSubmitHandler={props.newGuestSubmitHandler}
        handleNameInput={props.handleNameInput}
      />
    </header>
  );
};

Header.propTypes = {
  pendingGuest: PropTypes.string.isRequired,
  newGuestSubmitHandler: PropTypes.func.isRequired,
  handleNameInput: PropTypes.func.isRequired
};

export default Header;
