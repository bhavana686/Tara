import React from "react";
import axios from "axios";
// import Modal from 'react-bootstrap/Modal';
import { Modal } from "react-bootstrap";
import { Form, Col } from "react-bootstrap";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import "../css/projectcontacts.css";
import { DialogContent, DialogTitle, Dialog, Button } from "@material-ui/core";

import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Env from "../../helpers/Env";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import purple from "@material-ui/core/colors/purple";

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
    textAlign: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
}));

var usersdata = [];

var dummydata = [];
class CrewListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crewlist: [],
      users: [],
      displaycrewform: false,
      projectid: localStorage.getItem("projectid"),
      show: false,
      usersval: [],
      rolesdata: [],
      selectedrolesdata: [],
      showroles: false,
      curentuserid: 0,
      showviewuserrole: false,
      viewdata: "",
      persona: sessionStorage.getItem("persona"),
      projectid: sessionStorage.getItem("projectid"),
      userid: sessionStorage.getItem("userid"),
      companyid: sessionStorage.getItem("companyId"),
      access: false,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleusers = this.handleusers.bind(this);
    this.handleclosemodal = this.handleclosemodal.bind(this);
    this.handleroleshow = this.handleroleshow.bind(this);
    this.handleroleclose = this.handleroleclose.bind(this);
    this.handlerolechanges = this.handlerolechanges.bind(this);
    this.checkaccessrights = this.checkaccessrights.bind(this);
  }

  componentWillMount() {
    this.setState({
      viewdata: "role",
    });
  }

  handleOnChange() {
    console.log("in crew form handlechange");
    this.setState({
      displaycrewform: true,
    });
  }

  handleroleclose() {
    this.setState({
      showroles: false,
    });
  }

  showviewfun = async (value) => {
    console.log(value, "in show view fun");
    await axios
      .get(
        Env.host +
          "/project-overview/get_project_userroles?projectid=" +
          this.state.projectid +
          "&userid=" +
          value.userid
      )
      .then((response) => {
        console.log("in subresponse", response.data);

        this.setState({
          viewdata: response.data[0].role,
        });
        console.log(this.state.viewdata);
      });

    await this.setState({
      showviewuserrole: true,
    });
  };

  handlerolechanges() {
    var users = [];
    console.log("user role", this.state.selectedrolesdata);
    console.log("user id", this.state.curentuserid);

    const data = {
      role: this.state.selectedrolesdata,
      userid: this.state.curentuserid,
      project_id: this.state.projectid,
    };

    console.log("inside handleclosedata is ", data);
    axios
      .post(Env.host + "/project-overview/add_rolesto_project", data)
      .then((response) => {
        //  rolesdata = response.data;
        this.getcrewlist();
      });

    this.setState({
      showroles: false,
    });
  }

  closeshowuser = () => {
    this.setState({
      showviewuserrole: false,
    });
  };

  handleroleshow(val, val1, val2, val3, val4) {
    console.log("in handle role show");
    this.setState({
      curentuserid: val,
    });
    console.log(val, val1, val2, val3, val4);
    this.setState({
      rolesdata: [
        {
          val1,
          val2,
          val3,
          val4,
        },
      ],
    });
    dummydata[0] = {
      role: val1 ? val1 : " ",
    };
    dummydata[1] = {
      role: val2 ? val2 : " ",
    };
    dummydata[2] = {
      role: val3 ? val3 : " ",
    };
    dummydata[3] = {
      role: val4 ? val4 : " ",
    };

    console.log("roles data is", dummydata);
    this.setState({
      showroles: true,
    });
  }

  checkaccessrights = async (value) => {
    if (this.state.persona == "admin") {
      this.setState({
        access: true,
      });
    } else {
      const data = {
        projectid: this.state.projectid,
        accessright: value,
        userid: this.state.userid,
      };
      await axios
        .post(Env.host + "/accessright/user/", data)
        .then((response) => {
          console.log("is it true", response.data);
          if (response.data) {
            this.setState({
              access: true,
            });
          } else {
            this.setState({
              access: false,
            });
          }
        });
    }
  };

  handleusers = (event, values, props) => {
    console.log("in handle on users");
    console.log("the values are", values);
    this.setState(
      {
        usersval: values,
      },
      () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state.usersval);
      }
    );
    // this.props.userdetails.roles = values;
  };

  handleroles = (event, values, props) => {
    console.log("in handle on users");
    console.log("the values are", values);
    this.setState(
      {
        selectedrolesdata: values,
      },
      () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state.selectedrolesdata);
      }
    );
  };

  handleShow = (e) => {
    this.setState({
      show: true,
    });
  };

  handleClose = (e) => {
    var users = [];
    console.log("size is", this.state.usersval.length);
    console.log("userval are", this.state.usersval);
    for (var i = 0; i < this.state.usersval.length; i++) {
      console.log("inside push");
      users.push(this.state.usersval[i].userid);
    }
    const data = {
      project_id: this.state.projectid,
      usernames: users,
    };

    console.log("inside handleclosedata is ", data);
    axios
      .post(Env.host + "/companydb/assigntoproject", data)
      .then((response) => {
        //  rolesdata = response.data;
        this.getcrewlist();
      });

    this.setState({
      show: false,
    });
  };

  handleclosemodal = () => {
    this.setState({
      show: false,
    });
  };

  submitForm() {}

  getcrewlist = () => {
    axios
      .get(
        Env.host +
          "/project-overview/getcrewlist?projectid=" +
          this.state.projectid
      )
      .then((response) => {
        console.log(response);

        this.setState({
          crewlist: response.data,
        });
      });
  };

  componentDidMount() {
    this.checkaccessrights("Crew");

    this.getcrewlist();
    axios.get(Env.host + "/project-overview/getusers").then((response) => {
      console.log(response);

      this.setState({
        users: this.state.users.concat(response.data),
      });
    });

    axios
      .get(
        Env.host + "/companydb/all-users-from-company/" + this.state.companyid
      )
      .then((response) => {
        console.log(response);

        usersdata = response.data;
      });
  }

  render() {
    let modelui = null;
    let rolemodel = null;
    let showuserrole = null;

    showuserrole = (
      <Dialog
        onClose={this.closeshowuser}
        aria-labelledby="customized-dialog-title"
        open={this.state.showviewuserrole}
      >
        <DialogContent>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Role :</Form.Label>
            <Form.Label>{this.state.viewdata}</Form.Label>
          </Form.Group>
        </DialogContent>
        <Button variant="secondary" onClick={this.closeshowuser}>
          Close
        </Button>
      </Dialog>
    );
    modelui = (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="customized-dialog-title"
        open={this.state.show}
      >
        <DialogTitle>Add Crew</DialogTitle>
        <DialogContent>
          <FormControl>
            <Autocomplete
              multiple
              id="tags-standard"
              options={usersdata}
              style={{ width: 300 }}
              getOptionLabel={(each) => each.name}
              onChange={this.handleusers}
              // defaultValue={this.props?.studentSkills}
              renderInput={(params) => (
                <TextField
                  size="500"
                  {...params}
                  variant="standard"
                  label="Users"
                  placeholder="Enter User"
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
        </DialogContent>

        <Button variant="secondary" onClick={this.handleclosemodal}>
          Close
        </Button>
        <Button variant="primary" onClick={this.handleClose}>
          Save Changes
        </Button>
      </Dialog>
    );

    rolemodel = (
      <Dialog
        open={this.state.showroles}
        aria-labelledby="customized-dialog-title"
        onClose={this.handleroleclose}
      >
        <DialogTitle>Add Roles</DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl}>
            <Autocomplete
              multiple
              id="tags-standard"
              style={{ width: 300 }}
              options={dummydata}
              getOptionLabel={(each) => each.role}
              onChange={this.handleroles}
              // defaultValue={this.props?.studentSkills}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Roles"
                  placeholder="Enter User"
                />
              )}
            />
            {/* <section className="skills-chips">
            {this.props?.studentSkills?.map(skill => (
              <Chip className="skill-chip" label={skill.skill} />
            ))}
          </section> */}
          </FormControl>
        </DialogContent>

        {/* Enter Role: <TextField>Enter Role</TextField> */}
        <Button variant="secondary" onClick={this.handleroleclose}>
          Close
        </Button>
        <Button variant="primary" onClick={this.handlerolechanges}>
          Save Changes
        </Button>
      </Dialog>
    );

    const displayform = this.state.crewlist.map((crew) => {
      return (
        <TableRow>
          <StyledTableCell align="center">{crew.userid}</StyledTableCell>
          <StyledTableCell align="center">{crew.name}</StyledTableCell>
          <StyledTableCell align="center">{crew.phone_number}</StyledTableCell>
          <StyledTableCell align="center">
            {/* <Link onClick={(e) => this.showviewfun(crew)}>View</Link> */}
            <Link
              // to={"/Projectmainpage/" + props.projectId}
              className="remove-link-style"
            >
              <Button
                size="small"
                color="primary"
                onClick={(e) => this.showviewfun(crew)}
              >
                View
              </Button>
            </Link>
          </StyledTableCell>
          {this.state.access == true ? (
            <StyledTableCell align="center">
              {crew.role}
              <Link
                // to={"/Projectmainpage/" + props.projectId}
                className="remove-link-style"
              >
                <Button
                  size="small"
                  color="primary"
                  onClick={(e) =>
                    this.handleroleshow(
                      crew.userid,
                      crew.role1,
                      crew.role2,
                      crew.role3,
                      crew.role4
                    )
                  }
                >
                  Edit role
                </Button>
              </Link>
            </StyledTableCell>
          ) : (
            ""
          )}
        </TableRow>
      );
    });
    var crewform;
    if (this.state.displaycrewform) {
      crewform = (
        <div className="student-profile-form">
          <Form>
            {/* <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Crew </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      name="email"
                      onChange={this.handleNameChange}
                    />
                  </Form.Group> */}
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Project Id</Form.Label>
              <Form.Control
                type="select"
                placeholder="password"
                name="actor"
                // onKeyDown={this.onKeyUp}
                onChange={this.handleprojectchange}
              />
            </Form.Group>

            <Form.Group>
              <label>Is an Actor</label>
              <select class="form-control" onSelect={this.handleactorchange}>
                <option>True</option>
                <option>False</option>
              </select>
            </Form.Group>
          </Form>
          <button
            onClick={this.submitForm}
            className="btn btn-primary btn-login"
          >
            Login
          </button>
        </div>
      );
    }

    return (
      <div>
        <div className="paddingleft15">
          <div>{this.state.sucessmsg}</div>
          <div className="form-group">
            <div className="">
              <div className="form-group d-flex justify-content-between">
                <h2>Contacts</h2>
                {this.state.access == true ? (
                  <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    onClick={(e) => this.handleShow(e)}
                  >
                    Add Crew
                  </Button>
                ) : (
                  ""
                )}
              </div>

              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell
                        style={{ "font-weight": "bold" }}
                        align="center"
                      >
                        Crew Id
                      </StyledTableCell>
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
                        Phone Number
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ "font-weight": "bold" }}
                        align="center"
                      >
                        View Roles
                      </StyledTableCell>
                      {this.state.access == "true" ? (
                        <StyledTableCell
                          style={{ "font-weight": "bold" }}
                          align="center"
                        >
                          Add Roles
                        </StyledTableCell>
                      ) : (
                        ""
                      )}
                      <StyledTableCell
                        style={{ "font-weight": "bold" }}
                        align="center"
                      ></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{displayform}</TableBody>
                </Table>
              </TableContainer>
              <br></br>
              <div>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableBody>{modelui}</TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableBody>{rolemodel}</TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableBody>{showuserrole}</TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CrewListing;
