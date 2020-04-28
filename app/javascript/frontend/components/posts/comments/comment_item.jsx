import React from 'react';

function CommentItem(props){

  return (
    <div className="comment-show-container">
      <img
        className="comment-author-picture"
        src={props.comment.author.profilePicture}
      ></img>
      <div className="comment-user-and-body-container">
        {props.comment.author.username}: {props.comment.body}
      </div>
    </div>
  );
}

export default CommentItem;