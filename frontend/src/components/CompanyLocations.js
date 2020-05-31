import React, { Fragment } from "react";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
// import Modal from 'react-bootstrap/Modal';
import { Modal } from "react-bootstrap";
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
import FormControl from "@material-ui/core/FormControl";
import Env from "../helpers/Env";
import { TextField, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Form, Col } from "react-bootstrap";
import Tooltip from "@material-ui/core/Tooltip";

import JwPagination from "jw-react-pagination";

// import SimpleMap from "../components/SimpleMap";
// import "./CompanyDB.css";
// import UserCharacter from "./UserCharacter";

const StyledTableCell = withStyles((theme) => ({}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const classes = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 600,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
}));

const customStyles = {
  li: {
    first: {
      display: "none",
    },
    last: {
      display: "none",
    },
  },
};

var rolesdata = [];
var projectsdata = [];

class CompanyLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdetails: [],
      costumedetails: [],
      locationdetails: [],
      roles: [],
      show: false,
      pageOfItems: [],
      showmodal: false,
      name: "",
      source: "",
      locationdetails: [],
      description: "",
    };
    this.handleCostumes = this.handleCostumes.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

  getlocations = () => {
    axios.get(Env.host + "/companydb/alllocations").then((response) => {
      console.log(response);

      this.setState({
        locationdetails: response.data,
      });
    });
  };

  componentDidMount() {
    console.log("inside componentDidMount");

    this.getlocations();
  }

  onChangePage(pageOfItems) {
    // update local state with new page of items
    this.setState({ pageOfItems });
  }

  SubmitCostumes = () => {
    const data = {
      name: this.state.name,
      source: this.state.source,
      description: this.state.description,
    };
    console.log(data);
    axios
      .post(Env.host + "/companydb/submitnewlocation", data)
      .then((response) => {
        console.log(response);
      });

    this.setState({
      showmodal: false,
    });
    this.getlocations();
  };

  handlenamechange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handlesourcechange = (e) => {
    this.setState({
      source: e.target.value,
    });
  };

  handledescriptionchange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleclosemodal = () => {
    this.setState({
      show: false,
    });
  };

  deleteCompanyCostume = (userdetails) => {
    console.log("in dleete", userdetails);

    const data = {
      costumeid: userdetails,
    };
    axios
      .post(Env.host + "/companydb/deletelocation", data)
      .then((response) => {
        console.log(response);
      });

    this.getcostumes();
  };

  handleModelClose = () => {
    this.setState({
      showmodal: false,
    });
  };

  showCostumeModal = () => {
    this.setState({
      showmodal: true,
    });
  };

  handleCostumes = () => {
    this.getcostumes();
  };

  render() {
    let displaydetails = null;
    let costumemodal = null;

    costumemodal = (
      <Modal show={this.state.showmodal} onHide={this.handleprojectclose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Costume Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Costume Name"
              name="name"
              // onKeyDown={this.onKeyUp}
              onChange={this.handlenamechange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Costume Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Costume Source"
              name="source"
              // onKeyDown={this.onKeyUp}
              onChange={this.handlesourcechange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label> Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Costume Description"
              name="description"
              // onKeyDown={this.onKeyUp}
              onChange={this.handledescriptionchange}
            />
          </Form.Group>
          {/* Enter Role: <TextField>Enter Role</TextField> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleModelClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.SubmitCostumes}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );

    console.log(this.state.formdetails);
    const formdetails = this.state.pageOfItems.map((userdetails) => {
      return (
        <TableBody>
          <TableRow>
            <StyledTableCell align="center">
              {" "}
              {userdetails.name}
            </StyledTableCell>
            <StyledTableCell align="center">
              {" "}
              {userdetails.address}
            </StyledTableCell>
            <StyledTableCell align="center">
              {" "}
              {userdetails.latitude}
            </StyledTableCell>
            <StyledTableCell align="center">
              {" "}
              {userdetails.longitude}
            </StyledTableCell>

            <StyledTableCell>
              <Link
                onClick={(e) =>
                  this.deleteCompanyCostume(userdetails.costumeid)
                }
              >
                <Tooltip
                  title="Delete Company Costume"
                  classes={{ tooltip: classes.customWidth }}
                  placement="right"
                  arrow
                >
                  <span
                    className="glyphicon glyphicon-trash"
                    style={{ color: "black" }}
                  ></span>
                </Tooltip>
              </Link>
              <br></br>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      );
    });
    displaydetails = (
      <div>
        <div class="paddingleft15">
          <div className="form-group">
            <div className="">
              <div className="form-group d-flex justify-content-between">
                <h2>Locations</h2>

                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  onClick={this.showCostumeModal}
                >
                  Add New Location
                </Button>
              </div>
            </div>
            <br></br>

            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell
                      style={{ "font-weight": "bold" }}
                      align="center"
                    >
                      {" "}
                      Name
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ "font-weight": "bold" }}
                      align="center"
                    >
                      Address
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ "font-weight": "bold" }}
                      align="center"
                    >
                      Latitude
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ "font-weight": "bold" }}
                      align="center"
                    >
                      Longitude
                    </StyledTableCell>
                  </TableRow>
                </TableHead>

                {formdetails}
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    );
    return (
      <div>
        <div id="textdisplay" class="tabcontent">
          {displaydetails}
          <div align="center">
            <JwPagination
              items={this.state.locationdetails}
              onChangePage={this.onChangePage}
              styles={customStyles}
            />
          </div>
          {costumemodal}
        </div>
      </div>
    );
  }
}

export default CompanyLocation;
