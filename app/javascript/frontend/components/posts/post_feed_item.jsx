import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';

import PostImageSlider from "./post_image_slider";
import PostForm from './post_form_container';
import PostAuthorInfo from './post_author_info';

import CommentItem from "./comments/comment_item";
import CommentForm from "./comments/comment_form_container";

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

  let postComments = <div></div>
  if (props.post.comments && props.post.comments.length > 0) {
    postComments = (
      <div>
        {props.post.comments.sort((a, b) => a.id - b.id).map(comment => (
        <div key={`post-${comment.post_id}-comment-${comment.id}`}>
          <CommentItem 
            comment={comment}
            currentUser={props.currentUser}
            deleteComment={props.deleteComment}
            refetch={props.refetch}
          />
        </div>
        ))}
      </div>
    );
  }

  // default render => displayed post
  return (
    <div className="feed-item">
      <div className="author-and-options">
        <PostAuthorInfo post={props.post} />
        {postOptions}
      </div>
      {postImages}
      {props.post.author.username}: {props.post.caption}
      <br />
      {postComments}
      <CommentForm postId={props.post.id} refetch={props.refetch} />
    </div>
  );
}

export default withRouter(PostFeedItem);