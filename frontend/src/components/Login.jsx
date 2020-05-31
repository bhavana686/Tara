import React from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";


import Env from "../helpers/Env";
import Constants from "../helpers/Constants";

import "../components/css/login.css";
import bgpic from './images/bgpic.jpeg';

import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      persona: "admin",
      loginFlag: false,
      invalidCredentialsMessage: "",
      redirectToReferrer: false,
      currentUser: null,
      loginFlag: false,
    };
    this.submitForm = this.submitForm.bind(this);
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitForm = async () => {
    const loginData = {
      persona: this.state.persona,
    };
    firebase
      .auth()
      // .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        loginData.uid = res.user.uid;
        axios
          .post(`${Env.host}/auth/login`, loginData)
          .then((loginResponse) => {
            console.log("response::::", loginResponse.data);
            console.log("response::::", loginResponse.status);
            if (loginResponse.status == 200) {
              this.setState({
                loginFlag: true,
              });
              window.sessionStorage.setItem("uid", loginResponse.data[0].uid);
              window.sessionStorage.setItem("name", loginResponse.data[0].name);
              window.sessionStorage.setItem(
                "profile_pic",
                loginResponse.data[0].profile_pic
              );
              window.sessionStorage.setItem(
                "companyId",
                loginResponse.data[0].company_id
              );
              window.sessionStorage.setItem(
                "status",
                loginResponse.data[0].status
              );
              window.sessionStorage.setItem(
                "companyId",
                loginResponse.data[0].company_id
              );

              window.sessionStorage.setItem("persona", this.state.persona);
              // {"uid":"6BPwpE5kYvM0WmztztpV4MEE54t2","name":"test3","profile_pic":null,"status":"2"}
            }
          });
        console.log(
          "createUserWithEmailAndPassword res: " + JSON.stringify(res)
        );
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(
          "createUserWithEmailAndPassword error: " + JSON.stringify(error)
        );
      });
  };

  render() {
    let redirectVar = null;
    if (this.state.loginFlag) {
      console.log("Register is:::", this.state.loginFlag);
      redirectVar = <Redirect to="/my-projects" />;
    }
    return (
      <div  class="login">
        {redirectVar}
      <div class="row">
      <div class="col-md-8">
       <img src={bgpic} alt="Flowers in Chania" width="1000" height="800px"></img>
       <div class="top-left" style={{position:"absolute",top: "50px","fontSize":"80px",color:"white",
                left: "660px"}}><h1><b></b></h1></div>

      </div>

    
      <div class="col-md-3">

      <div style={{ marginTop: "20px",paddingLeft:"70px"}}>
        {redirectVar}
            <div className="card login-card" style={{height:"350px",width:"350px",marginTop: "120px"}}>
              <div className="card-body">
                {!this.state.loginFlag ? (
                  <p>{this.state.invalidCredentialsMessage}</p>
                ) : (
                  ""
                )}
                <div className="student-profile-form" style={{width:"380px", paddingRight:"100px"}}>
                  <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label></Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={this.handleOnChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label></Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="password"
                        name="password"
                        // onKeyDown={this.onKeyUp}
                        onChange={this.handleOnChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label></Form.Label>
                      <Form.Control
                        as="select"
                        name="persona"
                        onChange={this.handleOnChange}
                      >
                        <option value={Constants.Role.Admin}>Admin</option>
                        <option value={Constants.Role.User}>User</option>
                      </Form.Control>
                    </Form.Group>
                  </Form>
                  <div class="nan"  style={{ paddingLeft:"50px", paddingTop:"10px"}}>
                  <Button type="button" variant="contained" color="primary"
        
          onClick={this.submitForm}
       
          
        >
         Login
        </Button> &nbsp;
          &nbsp;<Link to="/sign-up" className="remove-link-style">
            <Button variant="outlined" color="primary">
              Sign up
            </Button>
          </Link>
       
                  
                 
                  </div>
                  {/* <Link className="btn btn-primary btn-login" to="/">
                  Login
                </Link> */}
                </div>
              
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
              
          
          
             
         
    
    );
  }
}

export default Login;
