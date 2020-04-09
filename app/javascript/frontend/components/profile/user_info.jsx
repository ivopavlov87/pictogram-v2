import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

function UserInfo(props) {

  // if there is no user, or no user loaded => do nothing
  if (!props.user){
    return (
      <div></div>
    )
  }

  // if edit from parent component is true, render edit-version
  // of user info and initiate state for holding user-editted info
  if (props.editState){
    const [userUsername, setUserUsername] = useState(props.user.username)
    const [userName, setUserName] = useState(props.user.name)
    const [userEmail, setUserEmail] = useState(props.user.email)
    const [userBio, setUserBio] = useState(props.user.bio)

    // dealing with updated info submission
    function submitEdit(e){
      e.preventDefault();
      const user = props.user;
      user.username = userUsername;
      user.name = userName;
      user.email = userEmail;
      user.bio = userBio;
      props.updateUser(user).then(response => {
        // only clear the errors is the response on update has no errors
        // also, revert edit state back to false
        if(!response.errors){
          props.clearErrors();
          props.endEdit();
        }
      });
    }

    // removes warning, "form submission cancelled because form is not connect"
    // on cancel edit and reverts user info display to reflect what is on database
    function endEdit(e){
      e.preventDefault();
      props.clearErrors();
      props.endEdit();
    }

    // error rendering
    function RenderErrors(props){
      return (
        <ul>
          {Object.keys(props.errors).map((error, i) => (
            <li key={`error-${i}`}>{props.errors[error]}</li>
          ))}
        </ul>
      )
    }

    // user edit form
    return (
      <div>
        <form onSubmit={submitEdit}>
          <label>
            Username:
            <br />
            <input
              type="text"
              maxLength="30"
              value={userUsername}
              onChange={(e) => setUserUsername(e.target.value)}
            />
            <br />
            {userUsername.length}/30 characters
          </label>
          <br />
          <label>
            Name:
            <br />
            <input
              type="text"
              maxLength="50"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <br />
            {userName.length}/50 characters
          </label>
          <br />
          <label>
            Email:
            <br />
            <input
              type="text"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Bio:
            <br />
            <textarea
              maxLength="255"
              value={userBio ? userBio : ""}
              onChange={(e) => setUserBio(e.target.value)}
            />
            <br />
            {userBio ? userBio.length : "0"}/255 characters
          </label>
          <br />
          <button onClick={endEdit}>Cancel Edit</button>
          &nbsp;
          <input type="submit" value="Submit Edit" />
        </form>
        <RenderErrors errors={props.errors} />
      </div>
    );
  }


  // default user info display:
  // by default editLink is empty div
  let editLink = "";

  // show edit button if logged in user is owner of page, OR if user is an admin
  if (props.user.id === props.currentUser.id || props.currentUser.admin_type) {
    editLink = (
      <div>
        <button onClick={props.beginEdit}>Edit Profile</button>
        <br />
      </div>
    );
  }

  return (
    <div>
      {editLink}
      Username: {props.user.username}
      <br />
      Name: {props.user.name}
      <br />
      About {props.user.username}:{props.user.bio}
    </div>
  );
}

export default withRouter(UserInfo);