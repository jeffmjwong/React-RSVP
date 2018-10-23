import React from 'react';
import PropTypes from 'prop-types';

const Guest = ({ index, name, isConfirmed, toggleConfirmationAt }) => {
  return (
    <li>
      <span>{ name }</span>
      <label>
        <input
          type="checkbox"
          checked={isConfirmed}
          onChange={() => toggleConfirmationAt(index)}
        /> Confirmed
      </label>
      <button>edit</button>
      <button>remove</button>
    </li>
  );
};

Guest.propTypes = {
  name: PropTypes.string.isRequired,
  isConfirmed: PropTypes.bool.isRequired
};

export default Guest;
