import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

function PostForm(props){

  const [postCaption, setPostCaption] = useState(props.post ? props.post.caption : "")
  const [postLocation, setPostLocation] = useState(props.post ? props.post.location : "")

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

  // renders a cancel edit button if endEdit is passed down as a prop
  // meaning: post is being editted otherwise empty div; this is a component
  function CancelEdit(){
    if(props.endEdit){
      return (
        <div>
          <button onClick={props.endEdit}>Cancel Edit</button>&nbsp;
        </div>
      );
    }

    return (
      <div></div>
    )
  }

  // conditionally deal with submission based on new or edit
  function handlePostSubmit(e){
    e.preventDefault();

    if(!props.postEdit){
      const newPost = new FormData();
      newPost.append("post[caption]", postCaption);
      newPost.append("post[location]", postLocation);
      newPost.append("post[user_id]", props.currentUser.id);

      props.createPost(newPost).then(response => {
        if (!response.errors){
          props.clearErrors();
          props.history.push(`/posts/${response.post.id}`)
        }
      })
    }

    if(props.postEdit){
      const updatedPost = props.post;
      updatedPost.caption = postCaption;
      updatedPost.location = postLocation;

      props.updatePost(updatedPost).then(response => {
        if (!response.errors){
          props.clearErrors();
          props.endEdit();
        }
      })
    }
  }

  // conditionally render what is on the submit button
  let submitButtonText = props.postEdit ? "Update Post" : "Create New Post";

  return (
    <div>
      This is the Post Form
      <form onSubmit={handlePostSubmit}>
        <label>
          Location:
          <br />
          <input
            type="text"
            maxLength="255"
            value={postLocation}
            onChange={(e) => setPostLocation(e.target.value)}
          />
          <br />
          {postLocation ? postLocation.length : "0"}/255 characters
        </label>
        <br />
        <label>
          Caption:
          <br />
          <textarea
            rows="5"
            cols="55"
            maxLength="1000"
            value={postCaption}
            placeholder="Add a caption (Maximum 1,000 characters)"
            onChange={(e) => setPostCaption(e.target.value)}
          />
          <br />
          {postCaption ? postCaption.length : "0"}/1,000 characters
        </label>
        <br />
        <CancelEdit />
        <input type="submit" value={submitButtonText} />
      </form>
      <RenderErrors errors={props.errors} />
    </div>
  )

}

export default withRouter(PostForm);