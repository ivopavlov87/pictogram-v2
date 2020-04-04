import React from 'react';

import UserInfo from './user_info'

class UserProfile extends React.Component {
  constructor(props){
    super(props)

    // toggles whether the edit user info form is displayed
    // on child component
    this.state = {
      editProfile: false,
    }

    this.beginEdit = this.beginEdit.bind(this);
    this.endEdit = this.endEdit.bind(this);
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

  // removes edit display
  endEdit(e){
    // preventDefault removes warning discussing "form submission cancelled due to form
    // not being connected"
    e.preventDefault();
    this.setState({
      editProfile: false
    })
    this.props.fetchUser(this.props.match.params.userId);
    this.props.clearErrors();
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
      </div>
    );
  }
}

export default UserProfile;