import React from 'react';

import UserInfo from './user_info'

class UserProfile extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      editProfile: false,
    }

    this.beginEdit = this.beginEdit.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
  }

  componentDidMount(){
    this.props.fetchUser(this.props.match.params.userId)
  }

  beginEdit(){
    this.setState({
      editProfile: this.state.editProfile ? false : true
    })
  }

  submitEdit(){
    this.setState({
      editProfile: this.state.editProfile ? false : true
    })
    // this.props.clearErrors();
  }

  render() {
    if (!this.props.user){
      return (
        <div>
          Loading...
        </div>
      )
    }
    return (
      <div>
        <UserInfo 
          user={this.props.user} 
          currentUser={this.props.currentUser} 
          updateUser={this.props.updateUser} 
          errors={this.props.errors}
          beginEdit={this.beginEdit}
          submitEdit={this.submitEdit}
          updateUser={this.props.updateUser}
          clearErrors={this.props.clearErrors}
          edit={this.state.editProfile}
        />
      </div>
    )
  }
}

export default UserProfile;