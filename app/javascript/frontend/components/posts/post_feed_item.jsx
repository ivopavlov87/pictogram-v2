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

      // props.history.push(`/users/${props.post.author.id}`)
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
        <br />
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

  // default render => displayed post
  return (
    <div>
      {postOptions}
      Post author: {postAuthor}
      <br />
      Post location: {props.post.location}
      <br />
      Post caption: {props.post.caption}
      <br />
      <br />
    </div>
  );
}

export default withRouter(PostFeedItem);