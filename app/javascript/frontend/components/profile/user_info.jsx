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
  // of user info
  if (props.edit){
    const [userUsername, setUserUsername] = useState(props.user.username)
    const [userName, setUserName] = useState(props.user.name)
    const [userEmail, setUserEmail] = useState(props.user.email)
    const [userBio, setUserBio] = useState(props.user.bio)
    // const [userErrors, setUserErrors] = useState(props.errors)

    function submitEdit(e){
      e.preventDefault();
      const user = props.user;
      user.username = userUsername;
      user.name = userName;
      user.email = userEmail;
      user.bio = userBio;
      props.updateUser(user).then(arg => {
        // console.log("arg", arg)
        // if (Object.keys(props.errors).length !== 0) {
          props.clearErrors();
          props.submitEdit();
        // } else {
        //   props.clearErrors();
        //   props.submitEdit();
        // }
      });
      // props.submitEdit();
    }

    function RenderErrors(props){
      console.log("render error props", props)
      return (
        <ul>
          {Object.keys(props.errors).map((error, i) => (
            <li key={`error-${i}`}>{props.errors[error]}</li>
          ))}
        </ul>
      )
    }

    return (
      <div>
        The user is going to edit!
        <br />
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
            <br />
            {userUsername.length}/30 characters
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
          <input type="submit" value="Submit Edits" />
        </form>
        <RenderErrors errors={props.errors} />
      </div>
    );
  }

  let editLink = <div></div>;
  if (props.user.id === props.currentUser.id || props.currentUser.admin_type) {
    editLink = <button onClick={props.beginEdit}>Edit Profile</button>;
  }

  return (
    <div>
      {editLink}
      <br />
      {props.user.username}
      <br />
      {props.user.name}
      <br />
      {props.user.bio}
    </div>
  )
}

export default withRouter(UserInfo);