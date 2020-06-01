import React from "react";
import axios from "axios";
import Env from "../helpers/Env";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

class Eventdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdetails: [],
    };
  }
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    const data = {
      id: params.id,
    };

    axios
      .get(Env.host + "/project-overview/geteventusers/" + data.id)
      .then((response) => {
        console.log(response.data);

        this.setState({
          userdetails: response.data,
        });
      });
  }

  render() {
    let displayform = null;
    let details = null;
    if (this.state.userdetails.length > 0) {
      details = this.state.userdetails.map((ud) => {
        return (
          <TableRow>
            <StyledTableCell>{ud.name}</StyledTableCell>
            <StyledTableCell>{ud.address}</StyledTableCell>
            <StyledTableCell>{ud.phone_number}</StyledTableCell>
            <StyledTableCell>{ud.email}</StyledTableCell>
          </TableRow>
        );
      });

      displayform = (
        <div>
          <div className="paddingleft15">
            <div>{this.state.sucessmsg}</div>
            <div className="form-group">
              <div className="">
                <div className="form-group d-flex justify-content-between">
                  <h2>Assigned Users</h2>
                </div>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell> Name</StyledTableCell>
                        <StyledTableCell> Address</StyledTableCell>
                        <StyledTableCell>Phone Number</StyledTableCell>
                        <StyledTableCell>Email Address</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>{details}</TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      displayform = (
        <div style={{ marginTop: "20px" }}>
          <h1>NO USERS ASSIGNED TO THIS EVENT</h1>
        </div>
      );
    }

    return <div style={{ marginTop: "20px" }}>{displayform}</div>;
  }
}

export default Eventdetails;
