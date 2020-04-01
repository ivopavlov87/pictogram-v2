import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  
  render() {
    console.log(this.props)

    if (this.props.currentUser){
      return (
        <button onClick={this.props.logout}>Logout</button>
      )
    }

    return (
      <div>
        This is inside the nav bar component! A user is not logged in.
      </div>
    )
  }
}

export default NavBar;