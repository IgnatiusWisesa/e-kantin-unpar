import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ManageMerchant from "./admin/manageMerchant";
import ManageMenus from "./admin/manageMenus";

import AdminHeader from "../components/admin/adminHeader";
import AdminFooter from "../components/admin/adminFooter";
import LoginPage from "../components/login";

import { useDispatch, useSelector } from "react-redux";
import { adminKeepLogin } from "./../redux/actions";

function Admin() {
  const [dataIn, setDataIn] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(adminKeepLogin());
    setDataIn(true);
  }, [dispatch]);

  // get data from global state
  const data = useSelector((state) => state.Auth);

  if (dataIn) {
    if (data.loading && data.login === false) {
      return (
        <div className="content">
          <div className="App">
            <AdminHeader />
            <LoginPage />
            <AdminFooter />
          </div>
        </div>
      );
    } else {
      if (data.login) {
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
    }
  } else {
    return (
      <div>
        <div className="loading">Loading&#8230;</div>
      </div>
    );
  }
}

export default Admin;
