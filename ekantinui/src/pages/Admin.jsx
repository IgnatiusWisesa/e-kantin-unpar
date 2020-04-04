import React from "react";
import { Switch, Route } from "react-router-dom";

import Managemerchant from "../admin/managemerchant";
import Managemenus from "../admin/managemenus";
import HeaderAdmin from "../admincomponent/header";
import FooterAdmin from "../admincomponent/footer";
import LoginAdmin from "../admin/login";

function Admin({ match }) {
  return (
    <div className="content">
      <div className="App">
        <HeaderAdmin />
        <Switch>
          <Route path="/admin" component={LoginAdmin} />
          <Route path="/managemerchant" component={Managemerchant} />
          <Route path="/managemenus/:id" component={Managemenus} />
        </Switch>
        <FooterAdmin />
      </div>
    </div>
  );
}

export default Admin;
