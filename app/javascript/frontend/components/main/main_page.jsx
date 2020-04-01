import React from 'react';
import { Link } from 'react-router-dom';

import SignUpFormContainer from '../session_form/signup_form_container';
import LoginFormContainer from '../session_form/login_form_container';

class MainPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      formType: "login",
      formText: "Login to see photos from your friends!"
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    e.preventDefault();
    const newFormType = this.state.formType === 'signup' ? 'login' : 'signup';
    const newFormText = this.state.formType === 'signup' ? 'Login to see photos from your friends!' : 'Sign up to see photos from your friends!';
    this.setState({
      formType: newFormType,
      formText: newFormText
    })
  }

  render() {

    const splashText = this.state.formText;
    const otherFormBtn = (this.state.formType === 'signup') ? 'Login Instead' : 'Sign Up Instead';
    const formType = (this.state.formType === 'signup') ? <SignUpFormContainer /> : <LoginFormContainer />

    return (
      <div>
        This is inside the Main_Page.jsx
        <h3>{splashText}</h3>
        <input type="submit"
          onClick={this.handleClick}
          value={otherFormBtn}
        />
        {formType}
      </div>
    )
  }
}

export default MainPage;