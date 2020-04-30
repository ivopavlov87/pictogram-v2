import React from 'react';
import { Link } from 'react-router-dom'

function PostAuthorInfo(props){

  // ATTENTION - REMOVE "height/width" FOR CSS STYLING LATER
  // done?
  return (
    <div className="post-author-info-container">
      <div className="post-author-info">
        <div>
          <img
            className="post-author-picture"
            src={props.post.author.profilePicture}
          ></img>{" "}
        </div>
        <div className="author-and-location">
          <Link to={`/users/${props.post.author.id}`}>
            {props.post.author.username}
          </Link>
          <br />
          {props.post.location}
        </div>
      </div>
    </div>
  );

}

export default PostAuthorInfo;