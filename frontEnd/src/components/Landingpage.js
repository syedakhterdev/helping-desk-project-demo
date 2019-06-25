import React, { Component } from "react";
import { Grid, Cell } from "react-mdl";

class Landing extends Component {
  render() {
    return (
      <div style={{ width: "100%", margin: "auto" }}>
        <Grid className="header-top">
          <Cell col={12}>
            <h1>Helping Desk</h1>
          </Cell>
        </Grid>
      </div>
    );
  }
}

export default Landing;
