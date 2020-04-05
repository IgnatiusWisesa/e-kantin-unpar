import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import AppBar from "../components/appBar";
import BottomNav from "../components/bottomNav";
import CatalogMerchant from "./homepage/catalogMerchant";
import MenuList from "./homepage/menuList";
import ProfileMerchant from "./homepage/profileMerchant";

function Homepage(props) {
  return (
    <Fragment>
      <AppBar />
      <Switch>
        <Route path="/daftar_menu" component={MenuList} />
        <Route path="/profil" component={ProfileMerchant} />
        <Route path="/" component={CatalogMerchant} />
      </Switch>
      <BottomNav />
    </Fragment>
  );
}

export default Homepage;
