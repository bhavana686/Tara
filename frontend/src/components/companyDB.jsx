import React, { Fragment } from "react";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

import { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import Env from "../helpers/Env";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import JwPagination from "jw-react-pagination";

// import SimpleMap from "../components/SimpleMap";
// import "./CompanyDB.css";
// import UserCharacter from "./UserCharacter";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))(TableCell);

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

class CompanyDB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actorcheck: false,
      usercheck: false,
      costumecheck: false,
      locationcheck: false,
      actordetails: [],
      userdetails: [],
      costumedetails: [],
      locationdetails: [],
      roles: [],
      show: false,
      projectshow: false,
      userval: [],
      enableaddproject: false,
      checkedItems: new Map(),
      projects: [],
      pageOfItems: [],
    };
    this.handleUsers = this.handleUsers.bind(this);
    this.getactors = this.getactors.bind(this);
    this.getlocations = this.getlocations.bind(this);
    this.getusers = this.getusers.bind(this);
    this.getcostumes = this.getcostumes.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleroles = this.handleroles.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleprojectclose = this.handleprojectclose.bind(this);
    this.handleprojects = this.handleprojects.bind(this);
    this.handleclosemodal = this.handleclosemodal.bind(this);
    this.handleprojectclosemodal = this.handleprojectclosemodal.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

  componentDidMount() {
    console.log("inside componentDidMount");
    axios.get(Env.host + "/companydb/allroles").then((response) => {
      console.log(response);

      rolesdata = response.data;
    });

    axios.get(Env.host + "/companydb/allprojects").then((response) => {
      console.log(response);

      projectsdata = response.data;
    });
  }

  onChangePage(pageOfItems) {
    // update local state with new page of items
    this.setState({ pageOfItems });
  }

  handleclosemodal = () => {
    this.setState({
      show: false,
    });
  };

  handleClose = () => {
    const data = {
      user_id: this.state.userval,
      roles: this.state.roles,
    };

    console.log("inside handleclosedata is ", data);
    axios
      .post(Env.host + "/companydb/addrolestouser", data)
      .then((response) => {
        rolesdata = response.data;
      });

    axios.get(Env.host + "/companydb/allusers").then((response) => {
      this.setState({
        userdetails: response.data,
      });
    });

    this.setState({
      show: false,
    });
  };

  handleprojectclosemodal = () => {
    this.setState({
      projectshow: false,
    });
  };

  handleprojectclose = () => {
    this.setState({
      projectshow: false,
    });
    console.log("in handle project close");
    console.log(this.state.projects);
    var temp = [];
    // console.log("in assign projects",this.state.projects)
    this.state.checkedItems.forEach(logMapElements);

    function logMapElements(value, key, map) {
      console.log(key, value);
      if (value) {
        temp.push(key);
      }
    }

    // temp.push(this.state.projects[0].id)
    console.log("data", temp);
    const data = {
      usernames: temp,
      project_id: this.state.projects[0].id,
    };
    console.log("in checked items", data);
    Object.entries(this.state.checkedItems).map(([key, value]) => {
      console.log(key);
    });
    axios
      .post(Env.host + "/companydb/assigntoproject", data)
      .then((response) => {
        console.log("dta in asign project", data);
      });
  };

  handleShow = (e, uservalue) => {
    this.setState({
      show: true,
    });

    console.log("in handleshow", uservalue.userid);
    this.setState({
      userval: uservalue.userid,
    });
  };

  getusers = () => {
    axios.get(Env.host + "/companydb/allusers").then((response) => {
      console.log(response);

      this.setState({
        userdetails: response.data,
      });
    });
  };
  getactors = () => {
    axios.get(Env.host + "/companydb/allactors").then((response) => {
      console.log(response);

      this.setState({
        actordetails: response.data,
      });
    });
  };
  getlocations = () => {
    axios.get(Env.host + "/companydb/alllocations").then((response) => {
      console.log(response);

      this.setState({
        locationdetails: response.data,
      });
    });
  };
  getcostumes = () => {
    axios.get(Env.host + "/companydb/allcostumes").then((response) => {
      console.log(response);

      this.setState({
        costumedetails: response.data,
      });
    });
  };

  handleUsers = () => {
    this.setState({
      usercheck: !this.state.usercheck,
      costumecheck: false,
      locationcheck: false,
      actorcheck: false,
    });
    this.getusers();
  };
  handleActors = () => {
    this.setState({
      usercheck: false,
      costumecheck: false,
      locationcheck: false,
      actorcheck: !this.state.actorcheck,
    });
    this.getactors();
  };
  handleLocations = () => {
    this.setState({
      usercheck: false,
      costumecheck: false,
      locationcheck: !this.state.locationcheck,
      actorcheck: false,
    });
    this.getlocations();
  };
  handleCostumes = () => {
    this.setState({
      usercheck: false,
      costumecheck: !this.state.costumecheck,
      locationcheck: false,
      actorcheck: false,
    });
    this.getcostumes();
  };

  handleroles = (event, values, props) => {
    console.log("in handle on change roles");

    this.setState(
      {
        roles: values,
      },
      () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        // console.log(this.state.roles);
      }
    );
    // this.props.userdetails.roles = values;
  };

  handleprojects = (event, values, props) => {
    console.log("in handle on change roles");

    this.setState(
      {
        projects: values,
      },
      () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        // console.log(this.state.roles);
      }
    );
    // this.props.userdetails.roles = values;
  };

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup,
    });
    console.log("showpopup in togglepopup", this.state.showPopup);
  };

  handleChange = (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    console.log("the name is", item);
    console.log("if checked", isChecked);
    this.setState((prevState) => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
    console.log("checked items are", this.state.checkedItems);
    this.setState({
      enableaddproject: true,
    });
  };

  AssignProject = (e) => {
    this.setState({
      projectshow: true,
    });
  };

  render() {
    let displaydetails = null;
    let modelui = null;
    let projectmodel = null;
    var flag = 0;
    if (this.state.checkedItems.size > 1) {
      for (var i; i < this.state.checkedItems.size; i++) {
        console.log("checked items", this.state.checkedItems[i]);
      }

      this.state.enableaddproject = true;
    }
    if (this.state.usercheck) {
      const formdetails = this.state.pageOfItems.map((userdetails) => {
        if (userdetails.roles < 4) {
          console.log("no role defined");
          userdetails.roles = (
            <Link onClick={(e) => this.handleShow(e, userdetails)}>
              Add role
            </Link>
          );
        }

        modelui = (
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Roles</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormControl className={classes.formControl}>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={rolesdata}
                  getOptionLabel={(each) => each.rolename}
                  onChange={this.handleroles}
                  // defaultValue={this.props?.studentSkills}
                  renderInput={(params) => (
                    <TextField
                      size="500"
                      {...params}
                      variant="standard"
                      label="Roles"
                      placeholder="Enter Roles"
                      style={{ width: "120px" }}
                    />
                  )}
                />
                {/* <section className="skills-chips">
                {this.props?.studentSkills?.map(skill => (
                  <Chip className="skill-chip" label={skill.skill} />
                ))}
              </section> */}
              </FormControl>
              {/* Enter Role: <TextField>Enter Role</TextField> */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleclosemodal}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        );

        projectmodel = (
          <Modal show={this.state.projectshow} onHide={this.handleprojectclose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Roles</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormControl className={classes.formControl}>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={projectsdata}
                  getOptionLabel={(each) => each.name}
                  onChange={this.handleprojects}
                  // defaultValue={this.props?.studentSkills}
                  renderInput={(params) => (
                    <TextField
                      size="500"
                      {...params}
                      variant="standard"
                      label="Projects"
                      placeholder="Enter Projects"
                      style={{ width: "120px" }}
                    />
                  )}
                />
                {/* <section className="skills-chips">
           {this.props?.studentSkills?.map(skill => (
             <Chip className="skill-chip" label={skill.skill} />
           ))}
         </section> */}
              </FormControl>
              {/* Enter Role: <TextField>Enter Role</TextField> */}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={this.handleprojectclosemodal}
              >
                Close
              </Button>
              <Button variant="primary" onClick={this.handleprojectclose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        );

        return (
          <TableBody>
            <TableRow>
              <StyledTableCell>
                <Checkbox
                  name={userdetails.userid}
                  checked={this.state.checkedItems.get(userdetails.userid)}
                  onChange={this.handleChange}
                />
              </StyledTableCell>

              <StyledTableCell>{userdetails.name}</StyledTableCell>
              {/* <StyledTableCell>{userdetails.roles}</StyledTableCell> */}
              <StyledTableCell>
                {userdetails.roles}/{userdetails?.role1}/{userdetails.role2}/
                {userdetails.role3}/{userdetails.role4}
              </StyledTableCell>
              {/* <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell> */}
              <StyledTableCell>{userdetails.address}</StyledTableCell>
              <StyledTableCell>{userdetails.phonenumber}</StyledTableCell>
              <StyledTableCell>{userdetails.mail}</StyledTableCell>
            </TableRow>
          </TableBody>
        );
      });

      displaydetails = (
        <div>
          <div class="paddingleft15">
            <div class="form-group row" paddingleft>
              <div class="col-lg-12">
                {" "}
                <h2></h2>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell></StyledTableCell>

                        <StyledTableCell
                          style={{ "font-weight": "bold" }}
                          align="center"
                        >
                          User Name
                        </StyledTableCell>
                        <StyledTableCell
                          style={{ "font-weight": "bold" }}
                          align="center"
                        >
                          Roles
                        </StyledTableCell>

                        <StyledTableCell
                          style={{ "font-weight": "bold" }}
                          align="center"
                        >
                          User address
                        </StyledTableCell>
                        <StyledTableCell
                          style={{ "font-weight": "bold" }}
                          align="center"
                        >
                          Phone Number
                        </StyledTableCell>
                        <StyledTableCell
                          style={{ "font-weight": "bold" }}
                          align="center"
                        >
                          Mail Id
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>

                    {formdetails}
                  </Table>
                </TableContainer>
                <br></br>
                <div align="center">
                  <JwPagination
                    items={this.state.userdetails}
                    onChangePage={this.onChangePage}
                    styles={customStyles}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            {modelui}
            {projectmodel}
          </div>
        </div>
      );
    }

    if (this.state.actorcheck) {
      const formdetails = this.state.actordetails.map((userdetails) => {
        return (
          <TableBody>
            <TableRow>
              <StyledTableCell>{userdetails.castid}</StyledTableCell>
              <StyledTableCell>{userdetails.name}</StyledTableCell>
              <StyledTableCell>{userdetails.projectid}</StyledTableCell>
            </TableRow>
          </TableBody>
        );
      });
      displaydetails = (
        <div>
          <div class="paddingleft15">
            <div class="form-group row" paddingleft>
              <div class="col-lg-12">
                {" "}
                <h2></h2>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Actor Id</StyledTableCell>
                        <StyledTableCell>Actor Name</StyledTableCell>
                        <StyledTableCell>Project Id</StyledTableCell>
                      </TableRow>
                    </TableHead>

                    {formdetails}
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (this.state.locationcheck) {
      const formdetails = this.state.locationdetails.map((userdetails) => {
        return (
          <TableBody>
            <TableRow>
              <StyledTableCell>{userdetails.name}</StyledTableCell>
              <StyledTableCell>{userdetails.address}</StyledTableCell>
              <StyledTableCell>{userdetails.longitude}</StyledTableCell>
              <StyledTableCell>{userdetails.latitude}</StyledTableCell>
              <StyledTableCell>
                <Link
                  to="/SimpleMap"
                  longitude={userdetails.longitude}
                  latitude={userdetails.latitude}
                >
                  View Location
                </Link>
              </StyledTableCell>
            </TableRow>
          </TableBody>
        );
      });
      displaydetails = (
        <div>
          <div class="paddingleft15">
            <div class="form-group row" paddingleft>
              <div class="col-lg-12">
                {" "}
                <h2></h2>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Location</StyledTableCell>
                        <StyledTableCell>location address</StyledTableCell>
                        <StyledTableCell>Latitude</StyledTableCell>
                        <StyledTableCell>Longitude</StyledTableCell>
                        <StyledTableCell>Map</StyledTableCell>
                      </TableRow>
                    </TableHead>

                    {formdetails}
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (this.state.costumecheck) {
      console.log(this.state.formdetails);
      const formdetails = this.state.costumedetails.map((userdetails) => {
        return (
          <TableBody>
            <TableRow>
              <StyledTableCell> {userdetails.costumename}</StyledTableCell>
              <StyledTableCell> {userdetails.source}</StyledTableCell>
              <StyledTableCell> {userdetails.description}</StyledTableCell>
            </TableRow>
          </TableBody>
        );
      });
      displaydetails = (
        <div>
          <div class="paddingleft15">
            <div class="form-group row" paddingleft>
              <div class="col-lg-12">
                {" "}
                <h2></h2>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell> Name</StyledTableCell>
                        <StyledTableCell>Source</StyledTableCell>
                        <StyledTableCell>Description</StyledTableCell>
                        <StyledTableCell>image</StyledTableCell>
                      </TableRow>
                    </TableHead>

                    {formdetails}
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div>
          <button
            class="btn btn-outline-dark mr-1"
            onClick={() => this.handleUsers()}
          >
            Users
          </button>
          <button
            class="btn btn-outline-dark mr-1"
            onClick={() => this.handleActors()}
          >
            Actors
          </button>
          <button
            class="btn btn-outline-dark mr-1"
            onClick={() => this.handleLocations()}
          >
            Locations
          </button>
          <button
            class="btn btn-outline-dark mr-1"
            onClick={() => this.handleCostumes()}
          >
            Costumes
          </button>

          <button
            disabled={!this.state.enableaddproject}
            class="btn btn-outline-dark mr-1"
            onClick={() => this.AssignProject()}
          >
            AssignProject
          </button>
        </div>
        <div id="textdisplay" class="tabcontent">
          {displaydetails}
        </div>
      </div>
    );
  }
}

class Popup extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup\_inner">
          <h1>{this.props.text}</h1>
          <button onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}
export default CompanyDB;
