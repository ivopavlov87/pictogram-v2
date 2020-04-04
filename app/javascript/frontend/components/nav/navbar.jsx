import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  
  render() {

    if (this.props.currentUser){
      return (
        <div>
          <Link to={`users/${this.props.currentUser.id}`}>Profile</Link>
          &nbsp;
          <button onClick={this.props.logout}>Logout</button>
        </div>
      );
    }

    return (
      <div>
        This is inside the nav bar component! A user is not logged in.
      </div>
    )
  }
}

export default NavBar;