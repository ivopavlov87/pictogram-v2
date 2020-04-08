import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import PostForm from './post_form_container'

function PostItem(props){

  const [postEdit, setPostEdit] = useState(false);
  
  useEffect(() => {
    props.fetchPost(props.match.params.postId)
  }, [props.match.params.postId])

  // if the post hasn't been fetched/loaded return
  // empty div
  if (!props.post){
    return (
      <div>
        Loading...
      </div>
    )
  }

  function endEdit() {
    setPostEdit(false);
  }

  // unless user is post author or an admin, return empty div
  let postOptions = <div></div>
  if(props.post.user_id == props.currentUser.id || props.currentUser.admin_type) {

    function handleDelete(e){
      e.preventDefault();

      props.history.push(`/users/${props.post.author.id}`)
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

  // default render => displayed post
  return (
    <div>
      {postOptions}
      Post author: {props.post.author.username}
      <br />
      Post location: {props.post.location}
      <br />
      Post caption: {props.post.caption}
    </div>
  );
}

export default withRouter(PostItem);