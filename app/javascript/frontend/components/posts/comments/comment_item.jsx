import React from 'react';

function CommentItem(props){

  let commentOptions = <div></div>
  if (props.comment.author.id === props.currentUser.id || props.currentUser.admin_type){

    function handleDelete(e){
      e.preventDefault();

      props.deleteComment(props.comment).then(() => props.refetch())
    }

    commentOptions = (
        <button className="delete-button" onClick={handleDelete}>Delete Comment</button>
    )
  }

  return (
    <div className="comment-show-container">
      <div className="comment-content">
        <img
          className="comment-author-picture"
          src={props.comment.author.profilePicture}
        ></img>
        <div className="comment-user-and-body-container">
          {props.comment.author.username}: {props.comment.body}
        </div>
      </div>
      {commentOptions}
    </div>
  );
}

export default CommentItem;