import React from 'react';
import { Link } from 'react-router-dom'

function PostAuthorInfo(props){

  // ATTENTION - REMOVE "height/width" FOR CSS STYLING LATER
  return (
    <div>
      <img
        height="auto"
        width="150px"
        src={props.author.profilePicture}
      ></img>{" "}
      Post author:{" "}
      <Link to={`users/${props.user_id}`}>
        {props.author.username}
      </Link>
    </div>
  );

}

export default PostAuthorInfo;