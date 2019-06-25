import React, { Component } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "react-mdl";
import * as dataService from "../services/dataService";

class Standard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: "",
      description: "",
      allOrganization: [],
      allUser: []
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
    this.getTicket();
  }
  handleSubmit() {
    const ticket = {
      ticket_title: this.state.name,
      ticket_description: this.state.description
    };

    dataService.createTicket(ticket).then(res => {
      this.getTicket();
      this.setState({ openDialog: false });
    });
  }
  getTicket() {
    dataService.getAllTicket().then(res => {
      console.log("response ticket: ", res.data);
      this.setState({ data: res.data });
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
              className="btn btn-success btn-block"
              onClick={this.handleOpenDialog}
            >
              Add Ticket
            </button>
            <Dialog open={this.state.openDialog}>
              <DialogContent>
                <form action="" method="post">
                  <div className="form-group">
                    <label> Ticket Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ticket Name"
                      required="true"
                      onChange={e => this.handleChange("name", e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      required="true"
                      onChange={e => this.handleChange("description", e)}
                    />
                  </div>
                </form>
              </DialogContent>
              <DialogActions>
                <Button type="button" onClick={() => this.handleSubmit()}>
                  submit
                </Button>
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
                  <th>Ticket Name</th>
                  <th>Ticket Description</th>
                  <th>Posted By</th>
                  <th>Organization Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{data.ticket_title}</td>
                      <td>{data.ticket_description}</td>
                      <td>{data.User.user_name}</td>
                      <td>{data.Organization.organization_name}</td>
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

export default Standard;
