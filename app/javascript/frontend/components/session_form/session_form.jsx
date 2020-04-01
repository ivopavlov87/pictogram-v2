import React from 'react';

class SessionForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      login_input: '',
      username: '',
      name: '',
      email: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user;
    if (this.props.formType === 'signup'){
      const newUser = {
        username: this.state.username,
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      };
      user = Object.assign({}, newUser)
    } else {
      user = Object.assign({}, this.state);
    }
    this.props.processForm(user).then(() => {
      this.props.history.push('/loggedInSucess')
    })
  }

  componentWillUnmount(){
    this.props.clearErrors();
  }

  renderErrors() {
    return (
      <ul className='errors'>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {

    if (this.props.formType === 'login'){
      return (
        <div>
          <form onSubmit={this.handleSubmit} >
            <div>
              <label>
                <input type="text"
                  placeholder="Username or Email"
                  onChange={this.update('login_input')}
                />
              </label>
              <br />
              <label>
                <input type="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={this.update('password')}
                />
              </label>
              <br />
              <input type="submit" value="Log In" />
            </div>
            <div>
              {this.renderErrors()}
            </div>
          </form>
        </div>
      )
    }

    if (this.props.formType === 'signup') {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>
                <input type="text"
                value={this.state.username}
                placeholder="Username"
                onChange={this.update('username')}
              />
              </label>
              <br />
              <label>
                <input type="text"
                value={this.state.name}
                placeholder="Name"
                onChange={this.update('name')}
              />
              </label>
              <br />
              <label>
                <input type="text"
                value={this.state.email}
                placeholder="Email"
                onChange={this.update('email')}
              />
              </label>
              <br />
              <label>
                <input type="password"
                value={this.state.password}
                placeholder="Password"
                onChange={this.update('password')}
              />
              </label>
              <br />
              <input type="submit" value="Sign Up" />
            </div>
            <div>
              {this.renderErrors()}
            </div>
          </form>
        </div>
      )
    }
  }
}

export default SessionForm;