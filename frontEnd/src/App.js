import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getToken, removeItems } from "../src/utils/userdata";
import "./App.css";
import "./css/style.css";
import {
  Layout,
  Header,
  Drawer,
  Content,
  Textfield,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent
} from "react-mdl";
import Main from "./components/main";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { setToken, setUserProfile } from "./utils/userdata";
import * as dataService from "./services/dataService";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      login: getToken() ? false : true,
      errorMessage: ""
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  // handleLogin () {
  //   this.setState({

  //   })
  // }
  handleOpenDialog() {
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false
    });
  }
  // email change handler
  emailChangeHandler = event => {
    this.setState({
      email: event.target.value
    });
  };
  handleLogOut() {
    removeItems();
    this.setState({
      login: true
    });
    this.props.history.push("/");
  }
  // passwordChangeHandler
  passwordChangeHandler = event => {
    this.setState({
      password: event.target.value
    });
  };
  loginHandler = event => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;

    dataService
      .login({ email, password })
      .then(response => response.json())
      .then(response => {
        if (response && response.userProfile && response.userProfile.userRole) {
          setToken({ token: response.token });
          setUserProfile({ userProfile: response.userProfile });
          this.setState({ openDialog: false });
          this.setState({ login: false });
          if (response.userProfile.userRole === "Admin") {
            this.props.history.push("/manage");
          } else {
            this.props.history.push("/standard");
          }
        } else {
          this.setState({
            errorMessage: "incorrect email and password"
          });
        }
      });
  };
  render() {
    return (
      <div className="demo-big-content">
        <Layout>
          <Header className="header-style" title="Helping Desk" scroll>
            {this.state.login ? (
              <Button
                className="top-p"
                colored
                onClick={this.handleOpenDialog}
                raised
                ripple
              >
                Login
              </Button>
            ) : (
              <Button
                className="top-p"
                colored
                onClick={this.handleLogOut}
                raised
                ripple
              >
                LogOut
              </Button>
            )}
            <form onSubmit={this.loginHandler} method="post">
              <Dialog open={this.state.openDialog}>
                <DialogTitle>Login Here</DialogTitle>
                <DialogContent>
                  <Textfield
                    value={this.state.email}
                    onChange={this.emailChangeHandler}
                    label="Username"
                    style={{ width: "200px" }}
                  />
                  <Textfield
                    value={this.state.password}
                    onChange={this.passwordChangeHandler}
                    label="password"
                    style={{ width: "200px" }}
                  />
                </DialogContent>

                <DialogActions>
                  <Button type="submit" onClick={this.loginHandler}>
                    login
                  </Button>
                  <Button type="button" onClick={this.handleCloseDialog}>
                    Cancel
                  </Button>
                </DialogActions>
                {this.state.errorMessage}
              </Dialog>
            </form>
          </Header>

          <Content>
            <div className="page-content" />
            <Main history={this.props.history} />
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
