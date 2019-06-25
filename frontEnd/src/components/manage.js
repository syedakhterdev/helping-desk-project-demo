import React, { Component } from "react";
import { Link } from "react-router-dom";

class Manage extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-sm-4 mt-5">
            <button className="btn btn-secondary">
              {" "}
              <Link to="/user" className="btn-manage-txt">
                Manage Users
              </Link>
            </button>
            <button className="btn btn-secondary ml-2">
              <Link to="/organization" className="btn-manage-txt">
                Manage Organizations{" "}
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Manage;
