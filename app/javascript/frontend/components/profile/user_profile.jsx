import React from 'react';

import UserInfo from './user_info'
import PostFeedItem from '../posts/post_feed_item';

import defaultProfilePic from '../../../../assets/images/default_user_photo.png';

class UserProfile extends React.Component {
  constructor(props){
    super(props)

    // toggles whether the edit user info form is displayed
    // on child component
    this.state = {
      editProfile: false
    }

    this.beginEdit = this.beginEdit.bind(this);
    this.endEdit = this.endEdit.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  // fetch user when component mounts
  componentDidMount(){
    this.props.fetchUser(this.props.match.params.userId)
  }

  // reverts profile page back to view (instead of staying on edit) when
  // changing user profiles mid-edit without saving
  componentDidUpdate(previousProps){
    if (previousProps.match.params.userId !== this.props.match.params.userId) {
      this.setState({ editProfile: false })
      this.props.fetchUser(this.props.match.params.userId);
      this.props.clearErrors();
    }
  }

  // initiates edit display
  beginEdit(){
    this.setState({
      editProfile: true
    })
  }

  deletePost(id){
    this.props.deletePost(id).then(() => (
      this.props.fetchUser(this.props.match.params.userId)))
  }

  // removes edit display
  endEdit(){
    // fetching user restores user info display to reflect info on database
    this.setState({
      editProfile: false
    })
    this.props.fetchUser(this.props.match.params.userId);
  }

  render() {

    // displayed while the user is being fetched;
    // this is so the client is not seeing a blank screen
    if (!this.props.user){
      return (
        <div>
          Loading...
        </div>
      )
    }

    // this is the default display once the user is fetched, used for viewing and editting
    return (
      <div>
        <img src={this.props.user.profilePicture} ></img>
        <UserInfo
          user={this.props.user}
          currentUser={this.props.currentUser}
          updateUser={this.props.updateUser}
          errors={this.props.errors}
          beginEdit={this.beginEdit}
          endEdit={this.endEdit}
          updateUser={this.props.updateUser}
          clearErrors={this.props.clearErrors}
          editState={this.state.editProfile}
        />
        <br />
        {this.props.user.username}'s posts:
        <ul>
          {Object.values(this.props.user.posts).map((post) => (
            <li key={`post-${post.id}`}>
              <PostFeedItem
                post={post}
                currentUser={this.props.currentUser}
                user={this.props.user}
                deletePost={this.deletePost}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserProfile;