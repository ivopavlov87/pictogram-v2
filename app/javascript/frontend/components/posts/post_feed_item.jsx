import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

import PostImageSlider from "./post_image_slider";
import PostForm from './post_form_container';
import PostAuthorInfo from './post_author_info';

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
    
    // enable postOptions if user is post author or admin
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

  let postImages = <div></div>
  if (props.post.photoURLs && props.post.photoURLs.length > 0) {
    postImages = <PostImageSlider post={props.post} />
  }

  // default render => displayed post
  return (
    <div>
      <PostAuthorInfo author={props.post.author} />
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