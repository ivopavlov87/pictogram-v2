import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import PostFeedItem from './post_feed_item';

function PostFeed(props){

  useEffect(() => {
    props.fetchPosts();
  }, [props.match.path])

  if(!props.posts){
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div>
      <ul>
        {Object.values(props.posts).map((post) => (
          <li key={`post-${post.id}`}>
            <PostFeedItem
              post={post}
              currentUser={props.currentUser}
              deletePost={props.deletePost}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withRouter(PostFeed)