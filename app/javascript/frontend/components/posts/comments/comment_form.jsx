import React, { useState } from 'react';
import { withRouter } from "react-router-dom";

function CommentForm(props){

  const [commentBody, setCommentBody] = useState(props.comment ? props.comment.body : "")

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
      <RenderErrors errors={props.errors} />
    </div>
  )
}

export default withRouter(CommentForm);