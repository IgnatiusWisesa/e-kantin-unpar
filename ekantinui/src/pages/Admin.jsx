import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ManageMerchant from "./admin/manageMerchant";
import ManageMenus from "./admin/manageMenus";

import AdminHeader from "../components/admin/adminHeader";
import AdminFooter from "../components/admin/adminFooter";
import LoginPage from "../components/login";

function Admin(props) {
  return (
    <div className="content">
      <div className="App">
        <AdminHeader />
        <Switch>
          <Route path="/admin/managemerchant" component={ManageMerchant} />
          <Route path="/admin/managemenus/:id" component={ManageMenus} />
          <Route path="/admin/login" component={LoginPage} />
          <Redirect from="/admin" to="/admin/login" />
        </Switch>
        <AdminFooter />
      </div>
    </div>
  );
}

export default Admin;