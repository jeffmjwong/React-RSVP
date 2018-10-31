import React, { Component } from 'react';
import './App.css';

import GuestList from './GuestList';
import Counter from './Counter';
import Header from './Header';
import ConfirmedFilter from './ConfirmedFilter';

class App extends Component {
  state = {
    isFiltered: false,
    pendingGuest: '',
    guests: [
      {
        name: 'Treasure',
        isConfirmed: false,
        isEditing: false
      },
      {
        name: 'Nic',
        isConfirmed: true,
        isEditing: false
      },
      {
        name: 'Matt K',
        isConfirmed: false,
        isEditing: false
      }
    ]
  };

  toggleGuestPropertyAt = (indexToChange, property) => {
    this.setState((prevState) => ({
      guests: prevState.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            [property]: !guest[property]
          };
        }
        return guest;
      })
    }));
  }

  toggleConfirmationAt = (indexToChange) => {
    this.toggleGuestPropertyAt(indexToChange, 'isConfirmed');
  }

  removeGuestAt = (indexToRemove) => {
    this.setState((prevState) => ({
      guests: prevState.guests.filter((guest, index) => index !== indexToRemove)
    }));
  }

  toggleEditingAt = (indexToChange) => {
    this.toggleGuestPropertyAt(indexToChange, 'isEditing');
  }

  setNameAt = (indexToChange, name) => {
    this.setState((prevState) => ({
      guests: prevState.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            name
          };
        }
        return guest;
      })
    }));
  }

  toggleFilter = () => {
    this.setState((prevState) => ({
      isFiltered: !prevState.isFiltered
    }));
  }

  handleNameInput = (evt) => {
    this.setState({ pendingGuest: evt.target.value });
  }

  newGuestSubmitHandler = (evt) => {
    evt.preventDefault();

    const { pendingGuest } = this.state;

    this.setState((prevState) => ({
      guests: [{ name: pendingGuest, isConfirmed: false, isEditing: false }, ...prevState.guests],
      pendingGuest: ''
    }));
  }

  getTotalInvited = () => {
    const { guests } = this.state;

    return guests.length;
  }

  getAttendingGuests = () => {
    const { guests } = this.state;

    return guests.reduce((total, guest) => {
      return guest.isConfirmed ? total + 1 : total;
    }, 0)
  }

  getUnconfirmedGuests = () => {
    return this.getTotalInvited() - this.getAttendingGuests();
  }

  render() {
    const { isFiltered, pendingGuest, guests } = this.state;

    return (
      <div className="App">
        <Header
          pendingGuest={pendingGuest}
          newGuestSubmitHandler={this.newGuestSubmitHandler}
          handleNameInput={this.handleNameInput}
        />

        <div className="main">
          <ConfirmedFilter
            isFiltered={isFiltered}
            toggleFilter={this.toggleFilter}
          />

          <Counter
            totalInvited={this.getTotalInvited()}
            numberAttending={this.getAttendingGuests()}
            numberUnconfirmed={this.getUnconfirmedGuests()}
          />

          <GuestList
            guests={guests}
            toggleConfirmationAt={this.toggleConfirmationAt}
            toggleEditingAt={this.toggleEditingAt}
            setNameAt={this.setNameAt}
            isFiltered={isFiltered}
            removeGuestAt={this.removeGuestAt}
            pendingGuest={pendingGuest}
          />
        </div>
      </div>
    );
  }
}

export default App;
