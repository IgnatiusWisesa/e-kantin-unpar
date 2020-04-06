import React, { Fragment, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import AppBar from "../components/appBar";
import BottomNav from "../components/bottomNav";
import CatalogMerchant from "./homepage/catalogMerchant";
import MenuList from "./homepage/menuList";
import ProfileMerchant from "./homepage/profileMerchant";
import { GetListStand, GetMenuList } from "../redux/actions";

function Homepage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetListStand());
    dispatch(GetMenuList());
  });

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
