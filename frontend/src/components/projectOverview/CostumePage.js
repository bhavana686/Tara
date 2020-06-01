import React from "react";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Button, Table } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Modal } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import { DialogContent, DialogTitle, Dialog } from "@material-ui/core";

// import Modal from 'react-bootstrap/Modal';
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Form, Col } from "react-bootstrap";
import Env from "../../helpers/Env";

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
var allcostumes = [];
class Costume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: [],
      projectid: localStorage.getItem("projectid"),
      costumeshow: false,
      selectedcostumes: [],
      showmodal: false,
      name: "",
      source: "",
      description: "",
      persona: sessionStorage.getItem("persona"),
      projectid: sessionStorage.getItem("projectid"),
      userid: sessionStorage.getItem("userid"),
      access: false,
    };
    this.checkaccessrights = this.checkaccessrights.bind(this);
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

  componentDidMount() {
    this.checkaccessrights("Costumes");
    this.getcostumes();

    axios.get(Env.host + "/companydb/allcostumes").then((response) => {
      console.log(response);

      allcostumes = response.data;
    });
  }

  getcostumes = () => {
    axios
      .get(
        Env.host +
          "/project-overview/getprojectcostumes/" +
          this.state.projectid
      )
      .then((response) => {
        console.log(response);

        this.setState({
          character: response.data,
        });
      });
  };

  handleModelClose = () => {
    this.setState({
      showmodal: false,
    });
  };

  SubmitCostumes = () => {
    const data = {
      name: this.state.name,
      source: this.state.source,
      description: this.state.description,
    };
    console.log(data);
    axios
      .post(Env.host + "/companydb/submitnewcostume", data)
      .then((response) => {
        console.log(response);
        this.getcostumes();
      });

    this.setState({
      showmodal: false,
    });
  };

  showCostumeModal = (e) => {
    this.setState({
      costumeshow: true,
    });
  };

  showcreateCostumeModal = (e) => {
    this.setState({
      showmodal: true,
    });
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
  handledescriptionchange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleModelClose = () => {
    this.setState({
      costumeshow: false,
    });
  };

  SubmitCreateCostumes = () => {
    const data = {
      name: this.state.name,
      source: this.state.source,
      description: this.state.description,
      projectid: this.state.projectid,
    };
    console.log(data);
    axios
      .post(Env.host + "/companydb/submitnewcostumebyproject/", data)
      .then((response) => {
        console.log(response);
        this.getcostumes();
      });

    this.setState({
      showmodal: false,
    });
  };

  handleCreateModelClose = () => {
    this.setState({
      showmodal: false,
    });
  };

  SubmitCostumes = async () => {
    var temp = [];
    console.log(this.state.selectedcostumes.length);
    this.state.selectedcostumes.forEach(logMapElements);

    function logMapElements(value) {
      console.log(value.costumename);
      if (value.costumeid) {
        temp.push(value.costumeid);
      }
    }
    const data = {
      costumes: temp,
      projectid: this.state.projectid,
    };
    console.log(data.costumes);

    await axios
      .post(Env.host + "/project-overview/addcostumes_toproject", data)
      .then((response) => {
        console.log(response);
      });

    this.setState({
      costumeshow: false,
    });
  };
  handlecostumes = (event, values, props) => {
    console.log("in handle on users");
    console.log("the values are", values);
    this.setState(
      {
        selectedcostumes: values,
      },
      () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state.selectedcostumes);
      }
    );
  };

  render() {
    let displaydetails = null;
    let costumecreate = null;

    costumecreate = (
      <Dialog
        open={this.state.showmodal}
        aria-labelledby="customized-dialog-title"
        onClose={this.handleprojectclose}
      >
        <DialogTitle>Add New Costume</DialogTitle>
        <DialogContent>
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
            <Form.Label>Costume Source</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Costume Source"
              name="source"
              // onKeyDown={this.onKeyUp}
              onChange={this.handlesourcechange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Costume Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Costume Description"
              name="description"
              // onKeyDown={this.onKeyUp}
              onChange={this.handledescriptionchange}
            />
          </Form.Group>
          {/* Enter Role: <TextField>Enter Role</TextField> */}
        </DialogContent>
        <Button variant="secondary" onClick={this.handleCreateModelClose}>
          Close
        </Button>
        <Button variant="primary" onClick={this.SubmitCreateCostumes}>
          Save Changes
        </Button>
      </Dialog>
    );

    let costumemodal = null;

    costumemodal = (
      <Dialog
        open={this.state.costumeshow}
        aria-labelledby="customized-dialog-title"
        onClose={this.handleprojectclose}
      >
        <DialogTitle>Add Costumes</DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl}>
            <Autocomplete
              multiple
              style={{ width: 300 }}
              id="tags-standard"
              options={allcostumes}
              getOptionLabel={(each) => each.costumename}
              onChange={this.handlecostumes}
              // defaultValue={this.props?.studentSkills}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Costumes"
                  placeholder="Enter Costume"
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
        <Button variant="secondary" onClick={this.handleModelClose}>
          Close
        </Button>
        <Button variant="primary" onClick={this.SubmitCostumes}>
          Save Changes
        </Button>
      </Dialog>
    );

    // console.log(this.state.formdetails);
    const formdetails = this.state.character.map((userdetails) => {
      return (
        <TableBody>
          <TableRow>
            <StyledTableCell align="center">
              {" "}
              {userdetails.costumename}
            </StyledTableCell>
            <StyledTableCell align="center">
              {" "}
              {userdetails.source}
            </StyledTableCell>
            <StyledTableCell align="center">
              {" "}
              {userdetails.description}
            </StyledTableCell>
          </TableRow>
        </TableBody>
      );
    });
    displaydetails = (
      <div>
        <div className="paddingleft15">
          <div>{this.state.sucessmsg}</div>
          <div className="form-group">
            <div className="">
              <div className="form-group d-flex justify-content-between">
                <h1>Costumes</h1>
                {this.state.access ? (
                  <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    onClick={this.showCostumeModal}
                  >
                    Add Costume
                  </Button>
                ) : (
                  ""
                )}

                {this.state.access ? (
                  <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    onClick={this.showcreateCostumeModal}
                  >
                    Add New Costume
                  </Button>
                ) : (
                  ""
                )}
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
                        Source
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ "font-weight": "bold" }}
                        align="center"
                      >
                        Description
                      </StyledTableCell>
                      {/* <StyledTableCell
                        style={{ "font-weight": "bold" }}
                        align="center"
                      >
                        image
                      </StyledTableCell> */}
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
    return (
      <div>
        <div id="textdisplay" class="tabcontent">
          {displaydetails}
          {costumemodal}
          {costumecreate}
        </div>
      </div>
    );
  }
}

export default Costume;
