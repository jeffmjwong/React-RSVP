import React, { Component } from 'react';
import './App.css';
import GuestList from './GuestList';

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

  // getAttendingGuests and getUnconfirmedGuests

  render() {
    const { isFiltered, pendingGuest, guests } = this.state;

    return (
      <div className="App">
        <header>
          <h1>RSVP</h1>
          <p>A Treehouse App</p>
          <form onSubmit={this.newGuestSubmitHandler}>
              <input
                type="text"
                value={pendingGuest}
                placeholder="Invite Someone"
                onChange={this.handleNameInput}
              />
              <button type="submit" name="submit" value="submit">Submit</button>
          </form>
        </header>

        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input
                type="checkbox"
                onChange={this.toggleFilter}
                checked={isFiltered}
              /> Hide those who haven't responded
            </label>
          </div>

          <table className="counter">
            <tbody>
              <tr>
                <td>Attending:</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Unconfirmed:</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td>3</td>
              </tr>
            </tbody>
          </table>

          <GuestList
            guests={guests}
            toggleConfirmationAt={this.toggleConfirmationAt}
            toggleEditingAt={this.toggleEditingAt}
            setNameAt={this.setNameAt}
            isFiltered={isFiltered}
          />
        </div>
      </div>
    );
  }
}

export default App;
