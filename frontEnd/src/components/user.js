import React, { Component } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "react-mdl";
import { Link } from "react-router-dom";

import * as dataService from "../services/dataService";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: "",
      email: "",
      password: "",
      role: "",
      organization: null,
      message: "",
      allOrganization: []
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

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
  componentDidMount() {
    this.getUsers();
    this.getAllOrganization();
  }

  getUsers() {
    dataService.getUsers().then(res => {
      this.setState({ data: res.data });
    });
  }
  getAllOrganization() {
    dataService.getOrganization().then(res => {
      this.setState({ allOrganization: res.data });
    });
  }
  deleteUser(id) {
    dataService.deleteUser({ id }).then(res => {
      if (res) {
        this.getUsers();
        this.setState({
          message: "data is delete successfully"
        });
      }
      console.log("deleteUser", res);
    });
  }
  handleSubmit() {
    const user = {
      user_name: this.state.name,
      user_email: this.state.email,
      user_passsword: this.state.password,
      user_role: this.state.role,
      organization_id: Number(this.state.organization)
    };

    dataService.createUser(user).then(res => {
      this.getUsers();
      this.setState({ login: true });
    });
  }

  handleChange(name, e) {
    this.setState({ [name]: e.target.value });
  }
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-2 offset-sm-8">
            <button
              style={{ padding: "0.375rem 0.5rem" }}
              className="btn btn-success btn-block"
            >
              <Link
                to="/organization"
                style={{ color: "white", textDecoration: "none" }}
              >
                Manage Organization
              </Link>
            </button>
            <button
              className="btn btn-success btn-block"
              onClick={this.handleOpenDialog}
            >
              Add
            </button>
            <Dialog open={this.state.openDialog}>
              <DialogContent>
                <form>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      required="true"
                      onChange={e => this.handleChange("name", e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      onChange={e => this.handleChange("email", e)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={e => this.handleChange("password", e)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Role</label>
                    <select
                      defaultValue="user"
                      className="form-control"
                      onChange={e => this.handleChange("role", e)}
                    >
                      <option>Select Roles</option>
                      <option>User</option>
                      <option>Admin</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Organization Name</label>
                    <select
                      className="form-control"
                      onChange={e => this.handleChange("organization", e)}
                    >
                      <option>Select Organization</option>
                      {this.state.allOrganization.map((org, index) => {
                        return (
                          <option value={org.organization_id}>
                            {org.organization_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </form>
              </DialogContent>
              <DialogActions>
                {!this.state.login && (
                  <Button type="button" onClick={() => this.handleSubmit()}>
                    Submit
                  </Button>
                )}
                <Button type="button" onClick={this.handleCloseDialog}>
                  Cancel
                </Button>
              </DialogActions>
              {this.state.login && <p>Form successfully submitted</p>}
            </Dialog>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-sm-8 offset-sm-2">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Password</th>
                  <th>Email</th>
                  <th>role</th>
                  <th>organization</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{data.user_name}</td>
                      <td>{data.user_passsword}</td>
                      <td>{data.user_email}</td>
                      <td>{data.user_role}</td>
                      <td>{data.Organization.organization_name}</td>
                      <td>
                        <button onClick={() => this.deleteUser(data.user_id)}>
                          {" "}
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
