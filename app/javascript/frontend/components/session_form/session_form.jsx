import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginInput: "",
      username: "",
      name: "",
      email: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.prettyDemoUser = this.prettyDemoUser.bind(this);
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user;
    if (this.props.formType === "signup") {
      const newUser = {
        username: this.state.username,
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      };
      user = Object.assign({}, newUser);
    } else {
      const returningUser = {
        login_input: this.state.loginInput,
        password: this.state.password,
      };
      user = Object.assign({}, returningUser);
    }
    this.props.processForm(user)
  }

  async prettyDemoUser(e) {
    e.preventDefault();

    const demoUser = {
      username: "demoUser",
      password: "p4SSword!",
    };

    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    document.getElementById("login-input").focus();
    for (let i = 1; i <= demoUser.username.length; i++) {
      this.setState({ loginInput: demoUser.username.substr(0, i) });
      await sleep(100);
    }

    await sleep(100);

    document.getElementById("password-input").focus();
    for (let i = 1; i <= demoUser.password.length; i++) {
      this.setState({ password: demoUser.password.substr(0, i) });
      await sleep(100);
    }

    await sleep(100);

    document.getElementById("login-btn").click();
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  renderErrors() {
    return (
      <ul className="errors">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    );
  }

  render() {
    if (this.props.formType === "login") {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>
                <input
                  id="login-input"
                  type="text"
                  value={this.state.loginInput}
                  placeholder="Username or Email"
                  onChange={this.update("loginInput")}
                />
              </label>
              <br />
              <label>
                <input
                  id="password-input"
                  type="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={this.update("password")}
                />
              </label>
              <br />
              <input id="login-btn" type="submit" value="Login" />
              &nbsp;
              <button onClick={this.prettyDemoUser}>Demo Login</button>
            </div>
            <div>{this.renderErrors()}</div>
          </form>
        </div>
      );
    }

    if (this.props.formType === "signup") {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>
                <input
                  type="text"
                  value={this.state.username}
                  placeholder="Username"
                  onChange={this.update("username")}
                />
              </label>
              <br />
              <label>
                <input
                  type="text"
                  value={this.state.name}
                  placeholder="Name"
                  onChange={this.update("name")}
                />
              </label>
              <br />
              <label>
                <input
                  type="text"
                  value={this.state.email}
                  placeholder="Email"
                  onChange={this.update("email")}
                />
              </label>
              <br />
              <label>
                <input
                  type="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={this.update("password")}
                />
              </label>
              <br />
              <input type="submit" value="Sign Up" />
            </div>
            <div>{this.renderErrors()}</div>
          </form>
        </div>
      );
    }
  }
}

export default SessionForm;