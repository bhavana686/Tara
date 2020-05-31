import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import "../components/css/projectpage.css";
import Env from "../helpers/Env";
import MediaCard from "./ProjectCardView";

class Projectpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allprojects: [],
      companyid: window.sessionStorage.getItem("companyId"),
    };
  }
  componentDidMount() {
    axios
      .get(
        Env.host +
          "/project-create/getproject_bycompanyid/" +
          this.state.companyid
      )
      .then(async (response) => {
        console.log("response from all projects", response);
        await this.setState({
          allprojects: response.data,
        });
        console.log("all projects", this.state.allprojects);
      });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Link to="/create-project" className="remove-link-style">
            <Button variant="outlined" color="primary">
              Create Project
            </Button>
          </Link>

          <Link
            to="/create-project-template"
            className="remove-link-style ml-3"
          >
            <Button variant="outlined" color="primary">
              Create Project Template
            </Button>
          </Link>
        </div>
        <div className="mt-3">
          <div className="project-view-card d-flex flex-wrap">
            {/* {this.state.allprojects.map((project) => {
          <MediaCard projectName={project.name}></MediaCard>;
        })} */}
            {this.state?.allprojects?.map((project) => (
              <MediaCard
                projectName={project.name}
                projectDesc={project.description}
                projectId={project.id}
              />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Projectpage;
