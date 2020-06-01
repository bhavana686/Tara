import React, { Component } from "react";
import axios from "axios";
import { Form, Col } from "react-bootstrap";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
// import Modal from 'react-bootstrap/Modal';
import { Modal } from "react-bootstrap";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link } from "react-router-dom";
import Env from "../../helpers/Env";
import "../css/userGroups.css";

import Button from "@material-ui/core/Button";
import { DialogContent, DialogTitle, Dialog } from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

var userdata = [];
var accessrightsdata = [];

class UserGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persona: sessionStorage.getItem("persona"),
      projectid: sessionStorage.getItem("projectid"),
      userid: sessionStorage.getItem("userid"),
      usergroups: [],
      ugname: "",
      displaycrewform: false,
      sucessmsg: "",
      userstougs: [],
      accessdata: [],
      users: [],
      accessrights: [],
      displaycrewform: false,
      ugdescription: "",
      showeditug: false,
      editugdes: "",
      editugname: "",
      edit_userdata: [],
      edit_accessrightsdata: [],
      viewaccessrights: [],
      viewusers: [],
      ugid: 0,
      showview: false,
      access: false,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handlenamechange = this.handlenamechange.bind(this);
    this.handleOnChangeSkills = this.handleOnChangeSkills.bind(this);
    this.handleugformClose = this.handleugformClose.bind(this);
    this.submitugform = this.submitugform.bind(this);
    this.handleAccessrightSkills = this.handleAccessrightSkills.bind(this);
    this.handledeschange = this.handledeschange.bind(this);
    this.submiteditugform = this.submiteditugform.bind(this);
    this.showeditugs = this.showeditugs.bind(this);
    this.closeeditugs = this.closeeditugs.bind(this);
    this.showeditugform = this.showeditugform.bind(this);
    this.handleeditnamechange = this.handleeditnamechange.bind(this);
    this.handleeditdeschange = this.handleeditdeschange.bind(this);
    this.checkaccessrights = this.checkaccessrights.bind(this);
  }

  showeditugform() {
    this.setState({
      showeditug: true,
    });
  }

  handlenamechange(e) {
    console.log("in handle name change");
    console.log("the value is", e.target.value);
    this.setState({
      ugname: e.target.value,
    });
  }

  closeviewform = (e) => {
    this.setState({
      showview: false,
    });
  };

  handleeditnamechange(e) {
    console.log("in handle name change");
    console.log("the value is", e.target.value);
    this.setState({
      editugname: e.target.value,
    });
  }

  showeditugs = async (value) => {
    console.log("value is", value.UserGroup);
    await this.setState({
      editugname: value.UserGroup,
      editugdes: value.description,
      ugid: value.UserGroupId,
    });
    console.log("editugname", this.state.editugname);
    console.log("editugdes", this.state.editugdes);

    await axios
      .get(
        Env.host +
          "/project-overview/get_project_usergroup_details?projectid=" +
          this.state.projectid +
          "&ugid=" +
          value.UserGroupId
      )
      .then((response) => {
        console.log("in subresponse", response.data);

        this.setState((prevState) => ({
          edit_userdata: (prevState.edit_userdata =
            response.data["userdetails"]),
          edit_accessrightsdata: (prevState.edit_accessrightsdata =
            response.data["accessrights"]),
        }));
      });
  };

  async submiteditugform() {
    this.setState({
      showeditug: false,
    });

    const data = {
      ugname: this.state.editugname,
      ugdescription: this.state.editugdes,
      usernames: this.state.edit_userdata,
      accessdata: this.state.edit_accessrightsdata,
      ugid: this.state.ugid,
    };

    console.log("The edit data", data);

    await axios
      .post(
        Env.host +
          "/project-overview/update_project_usergroup_details?projectid=" +
          this.state.projectid,
        data
      )
      .then((response) => {
        console.log("in subresponse", response.data);

        this.setState((prevState) => ({
          edit_userdata: (prevState.edit_userdata =
            response.data["userdetails"]),
          edit_accessrightsdata: (prevState.edit_accessrightsdata =
            response.data["accessrights"]),
        }));
      });
  }

  closeeditugs(e) {
    this.setState({
      showeditug: false,
    });
  }

  handledeschange(e) {
    this.setState({
      ugdescription: e.target.value,
    });
  }

  handleeditdeschange(e) {
    this.setState({
      editugdes: e.target.value,
    });
  }

  showviewfun = async (value) => {
    console.log(value, "in show view fun");
    await axios
      .get(
        Env.host +
          "/project-overview/get_project_usergroup_details?projectid=" +
          this.state.projectid +
          "&ugid=" +
          value.UserGroupId
      )
      .then((response) => {
        console.log("in subresponse", response.data);

        this.setState({
          viewusers: response.data["userdetails"],
          viewaccessrights: response.data["accessrights"],
        });
      });

    await this.setState({
      ugname: value.UserGroup,
      ugdescription: value.description,
      showview: true,
    });
  };

  handleAccessrightSkills = async (event, values) => {
    console.log("in handle on change skills");

    await this.setState(
      {
        accessdata: values,
      },
      () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state.accessdata);
      }
    );
  };

  handleEditAccessrightSkills = async (event, values) => {
    console.log("in handle on change skills");

    await this.setState(
      {
        edit_accessrightsdata: values,
      },
      () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state.edit_accessrightsdata);
      }
    );
  };

  handleOnChangeSkills = async (event, values) => {
    console.log("in handle on change skills");
    await this.setState(
      {
        userstougs: values,
      },
      () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state.userstougs);
      }
    );
  };

  handleEditOnChangeSkills = async (event, values) => {
    console.log("in handle on change skills");
    await this.setState(
      {
        edit_userdata: values,
      },
      () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state.edit_userdata);
      }
    );
  };

  handleOnChange() {
    console.log("in crew form handlechange");
    this.setState({
      displaycrewform: true,
    });
  }

  handleugformClose() {
    this.setState({
      displaycrewform: false,
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

  async submitugform() {
    const data = {
      ugname: this.state.ugname,
      usernames: this.state.userstougs,
      accessdata: this.state.accessdata,
      ugdescription: this.state.ugdescription,
    };
    await axios
      .post(
        Env.host +
          "/project-overview/create_new_usergroup?projectid=" +
          this.state.projectid,
        data
      )
      .then((response) => {
        console.log("in subresponse", response.data);
      });

    this.setState({
      displaycrewform: false,
    });
  }

  async componentDidMount() {
    console.log(this.state.persona);
    console.log(this.state.projectid);
    console.log(this.state.userid);

    this.checkaccessrights("Editor");

    await axios
      .get(
        Env.host +
          "/project-overview/getusergroups_project?projectid=" +
          this.state.projectid
      )
      .then((response) => {
        console.log(response);

        this.setState({
          usergroups: this.state.usergroups.concat(response.data),
        });
      });

    await axios
      .get(
        Env.host +
          "/project-overview/getusers_fromproject/" +
          this.state.projectid
      )
      .then((response) => {
        console.log(response);

        this.setState({
          users: this.state.users.concat(response.data),
        });
        console.log(this.state.users);
      });

    userdata = this.state.users;

    await axios
      .get(Env.host + "/project-overview/getaccessrights_forproject")
      .then((response) => {
        console.log(response);

        this.setState({
          accessrights: this.state.accessrights.concat(response.data),
        });
        console.log(this.state.accessrights);
      });

    accessrightsdata = this.state.accessrights;
  }

  render() {
    var ugform;
    var editugform;
    var showug;
    var usersandartable;
    var accesstable;
    var usertable;

    accesstable = this.state.viewaccessrights.map((access) => {
      return (
        <div>
          <table>
            <tr>
              <td>{access.accessRight}</td>
            </tr>
          </table>
        </div>
      );
    });
    usertable = this.state.viewusers.map((user) => {
      return (
        <div>
          <table>
            <tr>
              <td>{user.name}</td>
            </tr>
          </table>
        </div>
      );
    });
    usersandartable = (
      <table className="table table-striped">
        <thead>
          <tr>Users and AccessRights</tr>
        </thead>
        <tr>
          <td>
            <table>
              <thead align="center">Users</thead>
              <body>{usertable}</body>
            </table>
          </td>
          <td>
            <table>
              <thead align="center">Access Rights</thead>
              <body>{accesstable}</body>
            </table>
          </td>
        </tr>
      </table>
    );

    showug = (
      <Modal show={this.state.showview} onHide={this.closeviewform}>
        <Modal.Header closeButton>
          <Modal.Title> UserGroup Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>UserGroup Name :</Form.Label>
            <Form.Label>{this.state.ugname}</Form.Label>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>UserGroup Description :</Form.Label>
            <Form.Label>{this.state.ugdescription}</Form.Label>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            {/* <Form.Label>UserGroup Users and AccessRights :</Form.Label> */}
            {usersandartable}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeviewform}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    ugform = (
      <Dialog
        onClose={this.handleugformClose}
        aria-labelledby="customized-dialog-title"
        open={this.state.displaycrewform}
      >
        <DialogTitle>Create New UserGroup</DialogTitle>

        <DialogContent>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>UserGroup Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Usergroup Name"
              name="ugname"
              // onKeyDown={this.onKeyUp}
              onChange={this.handlenamechange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>UserGroup Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              name="ugdescription"
              // onKeyDown={this.onKeyUp}
              onChange={this.handledeschange}
            />
          </Form.Group>
          <FormControl>
            <Autocomplete
              multiple
              id="tags-standard"
              options={this.state.users}
              style={{ width: 300 }}
              getOptionLabel={(each) => each.name}
              // defaultValue={[userdata[0]]}
              onChange={this.handleOnChangeSkills}
              // defaultValue={this.props?.studentSkills}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Users"
                  placeholder="Enter Users"
                />
              )}
            />
            {/* <section className="skills-chips">
                {this.props?.studentSkills?.map(skill => (
                  <Chip className="skill-chip" label={skill.skill} />
                ))}
              </section> */}
          </FormControl>

          <FormControl>
            <Autocomplete
              multiple
              id="tags-standard"
              options={this.state.accessrights}
              style={{ width: 300 }}
              getOptionLabel={(each) => each.accessRight}
              onChange={this.handleAccessrightSkills}
              // defaultValue={this.props?.studentSkills}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="AccessRights"
                  placeholder="Enter Access Rights"
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

          <Button variant="secondary" onClick={this.handleugformClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.submitugform}>
            Save Changes
          </Button>
        </DialogContent>
      </Dialog>
    );

    editugform = (
      <Dialog
        onClose={this.closeeditugs}
        aria-labelledby="customized-dialog-title"
        open={this.state.showeditug}
      >
        <DialogTitle>UserGroup Form</DialogTitle>

        <DialogContent>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>UserGroup Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Usergroup Name"
              name="editugname"
              defaultValue={this.state.editugname}
              // onKeyDown={this.onKeyUp}
              onChange={this.handleeditnamechange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>UserGroup Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              name="editugdes"
              defaultValue={this.state.editugdes}
              // onKeyDown={this.onKeyUp}
              onChange={this.handleeditdeschange}
            />
          </Form.Group>
          <Form.Group>
            {/* <Form.Label>UserGroup Users</Form.Label> */}

            <FormControl>
              <Autocomplete
                multiple
                id="tags-standard"
                options={userdata}
                style={{ width: 300 }}
                getOptionLabel={(each) => each.name}
                defaultValue={this.state.edit_userdata}
                onChange={this.handleEditOnChangeSkills}
                // defaultValue={this.props?.studentSkills}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Users"
                    placeholder="Enter Users"
                  />
                )}
              />
              {/* <section className="skills-chips">
                {this.props?.studentSkills?.map(skill => (
                  <Chip className="skill-chip" label={skill.skill} />
                ))}
              </section> */}
            </FormControl>
          </Form.Group>
          <Form.Group>
            {/* <Form.Label>UserGroup AccessRights</Form.Label> */}

            <FormControl>
              <Autocomplete
                multiple
                id="tags-standard"
                options={accessrightsdata}
                style={{ width: 300 }}
                getOptionLabel={(each) => each.accessRight}
                defaultValue={this.state.edit_accessrightsdata}
                onChange={this.handleEditAccessrightSkills}
                // defaultValue={this.props?.studentSkills}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="AccessRights"
                    placeholder="Enter Access Rights"
                  />
                )}
              />
              {/* <section className="skills-chips">
                {this.props?.studentSkills?.map(skill => (
                  <Chip className="skill-chip" label={skill.skill} />
                ))}
              </section> */}
            </FormControl>
          </Form.Group>
          {/* Enter Role: <TextField>Enter Role</TextField> */}
        </DialogContent>
        <Button variant="secondary" onClick={this.closeeditugs}>
          Close
        </Button>
        <Button variant="primary" onClick={this.submiteditugform}>
          Save Changes
        </Button>
      </Dialog>
    );

    const displayform = this.state.usergroups.map((crew) => {
      return (
        <TableRow>
          <StyledTableCell align="center">
            <Checkbox
              name={crew.UserGroupId}
              onChange={(e) => this.showeditugs(crew)}
            />
          </StyledTableCell>

          <StyledTableCell align="center">{crew.UserGroupId}</StyledTableCell>

          <StyledTableCell align="center">{crew.UserGroup}</StyledTableCell>
          <StyledTableCell align="center">{crew.description}</StyledTableCell>
          {this.state.access == true ? (
            <StyledTableCell align="center">
              <Link onClick={this.showeditugform}>Edit Usergroup</Link>
            </StyledTableCell>
          ) : (
            ""
          )}
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
        </TableRow>
      );
    });
    return (
      <div>
        <div className="paddingleft15">
          <div>{this.state.sucessmsg}</div>
          <div className="form-group">
            <div className="">
              <div className="form-group d-flex justify-content-between">
                <h2>User Groups</h2>
                {this.state.access == true ? (
                  <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    onClick={this.handleOnChange}
                  >
                    Add User Group
                  </Button>
                ) : (
                  ""
                )}
              </div>

              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center"></StyledTableCell>

                      <StyledTableCell
                        style={{ "font-weight": "bold" }}
                        align="center"
                      >
                        UserGroupId
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ "font-weight": "bold" }}
                        align="center"
                      >
                        UserGroup
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ "font-weight": "bold" }}
                        align="center"
                      >
                        Description
                      </StyledTableCell>
                      {this.state.access == true ? (
                        <StyledTableCell
                          style={{ "font-weight": "bold" }}
                          align="center"
                        >
                          Edit Usergroup
                        </StyledTableCell>
                      ) : (
                        ""
                      )}
                      <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{displayform}</TableBody>
                </Table>
              </TableContainer>
              <br></br>
              <div>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableBody>{ugform}</TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableBody>{editugform}</TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableBody>{showug}</TableBody>
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

export default UserGroups;
