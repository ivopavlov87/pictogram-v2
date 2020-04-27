import React from 'react';

import UserInfo from './user_info'
import PostFeedItem from '../posts/post_feed_item';

class UserProfile extends React.Component {
  constructor(props){
    super(props)

    // toggles whether the edit user info form is displayed
    // on child component
    this.state = {
      editProfile: false,
      photoURL: null,
      profilePictureFile: null
    }

    this.beginEdit = this.beginEdit.bind(this);
    this.endEdit = this.endEdit.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.handleNewProfilePicture = this.handleNewProfilePicture.bind(this);
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

  handleNewProfilePicture(e){
    e.preventDefault();
    const file = e.currentTarget.files[0];

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ profilePictureFile: file, photoURL: fileReader.result })
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }

    this.setState({ profilePictureFile: file }, () => {
      const formData = new FormData();
      formData.append(`user[profile_picture]`, this.state.profilePictureFile);
      this.props.updateUserPicture(this.props.user.id, formData).then(() => 
        this.props.fetchUser(this.props.match.params.userId));

      
      this.setState({ profilePictureFile: null, photoURL: null})
    });
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

    let updateProfilePicture = "";
    if (this.props.user.id === this.props.currentUser.id || this.props.currentUser.admin_type){
      updateProfilePicture = (
        <div>
          <input type="file" onChange={this.handleNewProfilePicture} />
          <br />
        </div>
      )
    }

    // this is the default display once the user is fetched, used for viewing and editting
    // ATTENTION - change width/height for CSS styling
    // done?
    return (
      <div className="user-profile-container">
        <div className="user-profile">
          <img
            className="user-profile-picture"
            src={this.props.user.profilePicture}
          ></img>
          {updateProfilePicture}
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
          {Object.values(this.props.user.posts)
            .sort((a, b) => b.id - a.id)
            .map((post) => (
              <div key={`post-${post.id}`}>
                <PostFeedItem
                  post={post}
                  currentUser={this.props.currentUser}
                  user={this.props.user}
                  deletePost={this.deletePost}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default UserProfile;