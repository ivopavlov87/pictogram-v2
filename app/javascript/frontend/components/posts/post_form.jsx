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

  function handleNewPostSubmit(e){
    e.preventDefault();

    const post = new FormData();
    post.append("post[caption]", postCaption);
    post.append("post[location]", postLocation);
    post.append("post[user_id]", props.currentUser.id);

    // const post = {};
    // post.caption = postCaption;
    // post.location = postLocation;
    // post.user_id = props.currentUser.id;
    props.createPost(post).then(response => {
      if (!response.errors){
        props.clearErrors();
        console.log("post creation successful")
      }
    })
  }

  return (
    <div>
      This is the Post Form
      <form onSubmit={handleNewPostSubmit}>
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
        <input type="submit" value="Create New Post" />
      </form>
      <RenderErrors errors={props.errors} />
    </div>
  )

}

export default withRouter(PostForm);