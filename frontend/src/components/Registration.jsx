import React from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import Constants from "../helpers/Constants";
import AuthService from "../auth.service";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      companyName: "",
      persona: Constants.Role.Admin,
      loginFlag: false,
      invalidCredentialsMessage: "",
      redirectToReferrer: false,
      currentUser: null,
      showAddRolesForm: false,
      registerFlag: false,
      isRegistrationComplete: false,

      roleFieldCount: 0,
      maxRoles: 4,
    };
    this.submitForm = this.submitForm.bind(this);
  }

  // async componentWillUnmount() {
  //   console.log("componentWillUnmount");
  //   let registrationData = null;
  //   await axios
  //     .post(`${Env.host}/auth/registration`, registrationData)
  //     .then(async (response) => {
  //       console.log("componentWillUnmount registration response::::", response);
  //       await this.setState({
  //         registerFlag: true,
  //       });
  //       isRegistrationComplete;
  //     })
  //     .catch((err) => {
  //       console.log("componentWillUnmount registration err::::", err);
  //       isRegistrationComplete = true;
  //     });
  // }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log("handleOnChange:::", event.target.name, event.target.value);
  };
  addAnotherRoleField = () => {
    if (this.state.roleFieldCount < this.state.maxRoles) {
      this.setState({ addRoleField: true });
    }
  };

  iAmHandleOnChange = async (event) => {
    const role = event.target.value;
    await this.setState({
      [event.target.name]: role,
    });
    if (Constants.Role.User == role) {
      await this.setState({
        showAddRolesForm: true,
      });
    } else {
      await this.setState({
        showAddRolesForm: false,
      });
    }
  };

  submitForm = async () => {
    let registrationData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      companyName: this.state.companyName,
      persona: this.state.persona,
    };
    firebase
      .auth()
      // .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(async (res) => {
        console.log(
          "createUserWithEmailAndPassword res: " + JSON.stringify(res)
        );

        const userObj = {
          email: res.user.email,
        };
        registrationData.uid = res.user.uid;
        AuthService.isNewUser = true;
        AuthService.registrationData = registrationData;
        console.log("createUserWithEmailAndPassword AuthService Set!");
        // firebase
        //   .firestore()
        //   .collection("users")
        //   .doc(this.state.email)
        //   .set(userObj);

        // await axios
        //   .post(`${Env.host}/auth/registration`, registrationData)
        //   .then(async (response) => {
        //     console.log("registration response::::", response);
        //     await this.setState({
        //       registerFlag: true,
        //     });
        //     isRegistrationComplete;
        //   })
        //   .catch((err) => {
        //     console.log("registration err::::", err);
        //     isRegistrationComplete = true;
        //   });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("createUserWithEmailAndPassword error: " + error);
        console.log(
          "createUserWithEmailAndPassword error: " + JSON.stringify(error)
        );
      });
  };

  render() {
    let redirectVar = null;
    if (this.state.registerFlag) {
      console.log("Register is:::", this.state.registerFlag);
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <article className="app-registration container">
        <div className="row mt-5">
          <div className="col-8">
            <section className="jumbotron">
              <h1>TARA</h1>
              <p>
               WHERE TALENT MEETS OPPORTUNITY
              </p>
            </section>
          </div>
          <div className="col">
            <section className="card login-card">
              <div className="card-body">
                {!this.state.loginFlag ? (
                  <p>{this.state.invalidCredentialsMessage}</p>
                ) : (
                  ""
                )}
                {/* <div className="student-profile-form"> */}
                <Form>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="name"
                      onChange={this.handleOnChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={this.handleOnChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="password"
                      name="password"
                      // onKeyDown={this.onKeyUp}
                      onChange={this.handleOnChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="company name"
                      name="companyName"
                      // onKeyDown={this.onKeyUp}
                      onChange={this.handleOnChange}
                    />
                  </Form.Group>

                  {/* <div key={`default-radio`} className="mb-3">
                    <Form.Check
                      type="radio"
                      id={`default-"radio`}
                      label="Signup as User"
                    />

                    <Form.Check
                      // disabled
                      type="radio"
                      label="Signup as User"
                      id={`disabled-default-radio}`}
                      onChange={this.handleOnChange}
                    />
                  </div> */}

                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Sign up as</Form.Label>
                    <Form.Control
                      as="select"
                      name="persona"
                      onChange={this.iAmHandleOnChange}
                    >
                      <option value={Constants.Role.Admin}>Admin</option>
                      <option value={Constants.Role.User}>User</option>
                    </Form.Control>
                  </Form.Group>

                  {!!this.state.showAddRolesForm ? (
                    <div>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="password"
                          name="password"
                          // onKeyDown={this.onKeyUp}
                          onChange={this.handleOnChange}
                        />
                      </Form.Group>
                      <button
                        type="button"
                        onClick={this.addAnotherRoleField}
                        className="btn btn-outline-primary btn-login"
                      >
                        Add another role
                      </button>
                      {/* <Autocomplete
                          multiple
                          id="core-functions"
                          name="coreFunctions"
                          options={[]
                          }
                          getOptionLabel={(each) => each.name}
                          onChange={this.handleOnCoreFunctionsChange}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              label="Core Functions"
                              placeholder="Enter functions"
                            />
                          )}
                        /> */}
                    </div>
                  ) : (
                    ""
                  )}
                </Form>
                <button
                  onClick={this.submitForm}
                  className="btn btn-primary btn-login"
                >
                  Sign up
                </button>
                <div className="mt-3">
                  Already have an account?
                  <Link to="/login" className="btn btn-outline-primary ml-3">
                    Sign in
                  </Link>
                </div>
                {/* <Link className="btn btn-primary btn-login" to="/">
                  Login
                </Link> */}
                {/* </div> */}
              </div>
            </section>
          </div>
        </div>
      </article>
    );
  }
}

export default Registration;
