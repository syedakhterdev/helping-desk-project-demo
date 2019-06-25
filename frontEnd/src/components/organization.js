import React, { Component } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "react-mdl";
import { Link } from "react-router-dom";
import * as dataService from "../services/dataService";

class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: "",
      description: ""
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }
  componentDidMount() {
    this.getOrganization();
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
  getOrganization() {
    dataService.getAllOrganization().then(res => {
      this.setState({ data: res.data });
    });
  }
  handleSubmit() {
    const organization = {
      organization_name: this.state.name,
      organization_description: this.state.description
    };
    dataService.createOrganization(organization).then(res => {
      if (res) {
        console.log(res);
        this.getOrganization();
        this.setState({ openDialog: false });
      }
    });
  }
  deleteOrganization(id) {
    dataService.deleteOrganization(id).then(res => {
      if (res) {
        this.getOrganization();
        this.setState({
          message: "organization is delete successfully"
        });
      }
      console.log("deleteOrganization", res);
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
            <button className="btn btn-success btn-block">
              <Link
                to="/user"
                style={{ color: "white", textDecoration: "none" }}
              >
                Manage Users
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
                <form action="" method="post">
                  <div className="form-group">
                    <label>Organization Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Organization Name"
                      required="true"
                      onChange={e => this.handleChange("name", e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Description"
                      required="true"
                      onChange={e => this.handleChange("description", e)}
                    />
                  </div>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => this.handleSubmit()}>submit</Button>
                <Button type="button" onClick={this.handleCloseDialog}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-sm-8 offset-sm-2">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Organization Name</th>
                  <th>Users</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{data.organization_name}</td>
                      <td>{data.organization_description}</td>
                      <td>
                        <button
                          onClick={() =>
                            this.deleteOrganization(data.organization_id)
                          }
                        >
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

export default Organization;
