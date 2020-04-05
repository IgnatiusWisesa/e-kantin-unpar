import React from "react";
import { Switch, Route } from "react-router-dom";

import ManageMerchant from "./admin/manageMerchant";
import ManageMenu from "./admin/manageMenu";
import LoginPage from "./admin/login";

import AdminHeader from "../components/admin/adminHeader";
import AdminFooter from "../components/admin/adminFooter";

function Admin(props) {
  return (
    <div className="content">
      <div className="App">
        <AdminHeader />
        <Switch>
          <Route path="/admin" component={LoginPage} />
          <Route path="/managemerchant" component={ManageMerchant} />
          <Route path="/managemenu/:id" component={ManageMenu} />
        </Switch>
        <AdminFooter />
      </div>
    </div>
  );
}

export default Admin;
