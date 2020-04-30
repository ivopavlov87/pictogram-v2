import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';

import PostImageSlider from "./post_image_slider";
import PostForm from './post_form_container';
import PostAuthorInfo from "./post_author_info";

import CommentItem from "./comments/comment_item";
import CommentForm from "./comments/comment_form_container";

function PostShow(props){

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

  // used to refresh list of comments on deleteComment
  function refetchPost(){
    props.fetchPost(props.post.id)
  }

  let postImages = <div></div>
  if (props.post.photoURLs && props.post.photoURLs.length > 0){
    postImages = <PostImageSlider post={props.post} />
  }

  let postComments = <div></div>;
  if (props.post.comments && props.post.comments.length > 0) {
    postComments = (
      <div>
        Post comments:
        <br />
        {props.post.comments.sort((a, b) => a.id - b.id).map((comment) => (
          <div key={`post-${comment.post_id}-comment-${comment.id}`}>
            <CommentItem
              comment={comment}
              currentUser={props.currentUser}
              deleteComment={props.deleteComment}
              refetch={refetchPost}
            />
          </div>
        ))}
      </div>
    );
  }

  // default render => displayed post
  return (
    <div>
      <PostAuthorInfo post={props.post} />
      {postOptions}
      {postImages}
      <br />
      Post location: {props.post.location}
      <br />
      Post caption: {props.post.caption}
      {postComments}
      <CommentForm postId={props.post.id} fetchPost={props.fetchPost} />
    </div>
  );
}

export default withRouter(PostShow);