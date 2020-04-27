import React from 'react';
import { Link } from 'react-router-dom'

function PostAuthorInfo(props){

  // ATTENTION - REMOVE "height/width" FOR CSS STYLING LATER
  // done?
  return (
    <div className="post-author-info-container">
      <div className="post-author-info">
        <img
          className="post-author-picture"
          src={props.author.profilePicture}
        ></img>{" "}
        Post author:{" "}
        <Link to={`users/${props.author.id}`}>{props.author.username}</Link>
      </div>
    </div>
  );

}

export default PostAuthorInfo;