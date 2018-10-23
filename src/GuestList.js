import React from 'react';
import PropTypes from 'prop-types';

import Guest from './Guest';

const GuestList = (props) => {
  return (
    <ul>
      {
        props.guests.map((guest, index) => (
          <Guest
            key={index}
            index={index}
            name={guest.name}
            isConfirmed={guest.isConfirmed}
            toggleConfirmationAt={props.toggleConfirmationAt}
          />
        ))
      }
    </ul>
  );
};

GuestList.propTypes = {
  guests: PropTypes.array.isRequired
};

export default GuestList;
