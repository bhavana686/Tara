import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import MyProjects from "./components/MyProjects";
import AdminDashboard from "./components/AdminDashboard";
import ProjectOverview from "./components/ProjectOverview";
import SuDashboard from "./su/components/su-dashboard";
import CompanyDB from "./components/companyDB";
import Example from "./components/samplepopup";
import Navbarpage from "./components/Navbarpage";
import Eventdetails from "./components/Eventdetails";
import Taskdetails from "./components/Taskdetails";
import Mycalender from "./components/Mycalender";
import Projectpage from "./components/Projectpage";
import Projectmainpage from "./components/Projectmainpage";
import Adminprofilepage from "./components/Adminprofilepage";
import ProjectEvent from "./components/ProjectEvent";
import ProjectTasks from "./components/ProjectTasks";
import CrewListing from "./components/projectOverview/ProjectContacts";
import CompanyUsers from './components/CompanyUsers';
import CompanyCostumes from './components/CompanyCostumes';
import Costume from "./components/projectOverview/CostumePage";
import UserGroups from "./components/projectOverview/UserGroups";
import CompanyLocation from './components/CompanyLocations'
class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("Routes props: ", JSON.stringify(this.props));
    return (
      <div>
        <Router>
           <Route path="/" component={Navbarpage}/>
          <Route path="/login" component={Login} />
          <Route path="/my-projects" component={MyProjects} />
          <Route path="/su-dashboard" component={SuDashboard} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
          <Route path="/project-overview/:id" component={ProjectOverview} />
          <Route path="/company-db" component={CompanyDB} />
          <Route path="/samplepopup" component= {Example}/>
          <Route path="/eventdetails/:id" component={Eventdetails}/>
          <Route path="/taskdetails/:id" component={Taskdetails}/>
          <Route path="/mycalender" component={Mycalender}/>
          <Route  path="/navbarpage" component={Navbarpage}/>
          <Route  path="/Projectpage" component={Projectpage}/>
          <Route path="/usergroups" component={UserGroups}/>
          <Route  path="/Projectmainpage/:id" component={Projectmainpage}/>
          <Route  path="/Adminprofilepage" component={Adminprofilepage}/>
          <Route  path="/ProjectEvent/:id" component={ProjectEvent}/>
          <Route  path="/ProjectTasks/:id" component={ProjectTasks}/>
          <Route path="/contactspage" component={CrewListing}/>
          <Route path="/Companyuserspage" component={CompanyUsers}/>
          <Route path="/companyCostumes" component={CompanyCostumes}/>
          <Route path="/Costumepage" component={Costume}/>
          <Route path="/companylocations" component={CompanyLocation}/>
        </Router>
      </div>
    );
  }
}

export default Routes;
