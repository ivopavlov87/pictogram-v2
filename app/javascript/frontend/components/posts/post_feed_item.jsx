import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

import PostForm from './post_form_container';

function PostFeedItem(props){

  const [postEdit, setPostEdit] = useState(false);

  function endEdit() {
    setPostEdit(false);
  }

  // unless user is post author or an admin, return empty div
  let postOptions = <div></div>
  if(props.post.user_id == props.currentUser.id || props.currentUser.admin_type) {

    function handleDelete(e){
      e.preventDefault();

      props.deletePost(props.post.id)
    }

    function startEdit(e){
      e.preventDefault();
      setPostEdit(true);
    }
    
    // change what postOptions returns if user is post author or admin
    postOptions = (
      <div>
        <button onClick={startEdit}>Edit Post</button>
        <button onClick={handleDelete}>Delete Post</button>
      </div>
    )
  }

  // when a post is being editted, this is rendered
  if(postEdit){
    return (
      <div>
        A post is being editted.
        <PostForm post={props.post} postEdit={postEdit} endEdit={endEdit} />
      </div>
    )
  }

  const postAuthor = (
    <Link to={`users/${props.post.user_id}`}>{props.post.author.username}</Link>
  )

  // ATTENTION - REMOVE FOR CSS STYLING LATER
  const authorPicture = (
    <div>
      <img height="auto" width="150px" src={props.post.author.profilePicture} ></img> Post author: {postAuthor}
    </div>
  )

  let postImages = <div></div>
  if (props.post.photoURLs && props.post.photoURLs.length > 0) {
    postImages = (
      <ul>
        {props.post.photoURLs.map((photoURL, i) => (
          <li key={`post-${props.post.id}-photo-${i}`}><img width="400px" height="auto" src={photoURL} ></img></li>
        ))}
      </ul>
    )
  }

  // default render => displayed post
  return (
    <div>
      {authorPicture}
      {postOptions}
      Post location: {props.post.location}
      <br />
      {postImages}
      Post caption: {props.post.caption}
      <br />
      <br />
    </div>
  );
}

export default withRouter(PostFeedItem);