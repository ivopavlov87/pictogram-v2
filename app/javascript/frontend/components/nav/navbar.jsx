import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  
  render() {

    // only display links if a user is logged in
    if (this.props.currentUser){
      return (
        <div>
          <Link to={`/users/${this.props.currentUser.id}`}>Profile</Link>
          &nbsp;
          <Link to={`/posts/new`}>New Post</Link>
          &nbsp;
          <button onClick={this.props.logout}>Logout</button>
        </div>
      );
    }

    // if no user is logged in return nothing => empty div
    return (
      <div></div>
    )
  }
}

export default NavBar;