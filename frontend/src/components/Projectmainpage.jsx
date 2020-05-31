import React, { Component } from "react";
import axios from "axios";
import "../components/css/projectmainpage.css";
import { Link } from "react-router-dom";
import ProjectFuncCardView from "./ProjectFunctionCard";
// import red from "@material-ui/core/colors/red";

// import TabPanel from "./TabPanel";
import Env from "../helpers/Env";

class Projectmainpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectid: this.props.match.params.id,
      projectdetails: "",
    };
  }
  async componentDidMount() {
    console.log("the project_id is", this.state.projectid);
    sessionStorage.setItem("projectid", this.state.projectid);

    await axios
      .get(
        Env.host +
          "/project-create/project_by_id/?projectid=" +
          this.state.projectid
      )
      .then((response) => {
        console.log(response.data);
        this.setState({
          projectdetails: response.data,
        });
      });

    sessionStorage.setItem(
      "projectname",
      this.state.projectdetails
        ? this.state.projectdetails[0]
          ? this.state.projectdetails[0].name
          : ""
        : ""
    );
    console.log(sessionStorage.getItem("projectname"));
  }

  render() {
    const projectFunctions = [
      {
        name: "Contacts",
        desc:
          "Here you can see the list of contacts available as part of the project. Details like name, phone number and roles of the users listed here.",
        path: "/Contactspage",
      },
      {
        name: "User Groups",
        desc:
          "Here you can see the list of user groups created as part of the project. Users can be assigned to these user groups which gives users role based permissions defined by access rights set for these groups.",
        path: "/usergroups",
      },
      {
        name: "My Calender",
        desc:
          "Here you can see the Calender events of the project. Calender events give a calender view of the events created within the project.",
        path: "/Mycalender",
      },

      {
        name: "Tasks",
        desc:
          "Here you can see the tasks created as part of the project. Tasks can be created by users based on access rights of the users. Taks can be assigned to specific users as part of creation.",
        path: "/ProjectTasks",
      },
      {
        name: "Events",
        desc:
          "Here you can see the events created as part of the project.Events can be created by users based on access rights of the users. Events are added to the calender.",
        path: "/ProjectEvent",
      },
      {
        name: "Costumes",
        desc:
          "Here you can see the list of costumes available as part of the project. Costumes created in a project can further be assigned to actors. They can also be resused in other projects",
        path: "/Costumepage",
      },
      {
        name: "Documents",
        desc:
          "Here you can see the list of Documents available in various rooms as part of the project. Users having access rights to specific rooms can only view or add files to those rooms.",
        path: "/documents",
      },
    ];

    return (
      <article>
        <div className="project-functions d-flex flex-wrap">
          {projectFunctions?.map((func) => (
            <ProjectFuncCardView
              projectId={this.state.projectid}
              funcName={func.name}
              funcDesc={func.desc}
              funcPath={func.path}
            />
          ))}
        </div>
      </article>
    );
  }
}

export default Projectmainpage;
