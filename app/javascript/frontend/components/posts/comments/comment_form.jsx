import React, { useState } from 'react';
import { withRouter } from "react-router-dom";

function CommentForm(props){

  const [commentBody, setCommentBody] = useState(props.comment ? props.comment.body : "");

  function handleCommentSubmit(e) {
    e.preventDefault();

    if (!props.commentEdit){

      const newComment = new FormData();
      newComment.append("comment[body]", commentBody);
      newComment.append("comment[user_id]", props.currentUser.id);
      newComment.append("comment[post_id]", props.postId);

      props.createComment(newComment).then(response => {
        if (!response.errors){
          props.clearErrors();
          props.refetch();
          setCommentBody("");
        }
      })
    }
  }

  // error rendering component
  function RenderErrors(props){
    return (
      <ul>
        {Object.keys(props.errors).map((error, i) => (
          <li key={`error-${i}`}>{props.errors[error]}</li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      This is the comment form.
      <div className="comment-create-container">
        <form className="comment-create-form" onSubmit={handleCommentSubmit}>
          <textarea className="comment-create-textarea"
            value={commentBody}
            rows="5"
            cols="55"
            maxLength="255"
            placeholder="Leave a comment"
            onChange={(e) => setCommentBody(e.target.value)}
          ></textarea>
          <input type="submit" value="Submit Comment" />
        </form>
      </div>
      <RenderErrors errors={props.errors} />
    </div>
  );
}

export default withRouter(CommentForm);