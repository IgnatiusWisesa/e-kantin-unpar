import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import AppBar from "../components/AppBar";
import BottomNav from "../components/BottomNav";
import Katalog from "./Homepage/Katalog";
import DaftarMenu from "./Homepage/DaftarMenu";
import ProfilKantin from "./Homepage/ProfilKantin";

function Homepage(props) {
  console.log(props.match);
  return (
    <Fragment>
      <AppBar />
      <Switch>
        <Route path="/daftar_menu" component={DaftarMenu} />
        <Route path="/profil" component={ProfilKantin} />
        <Route path="/" component={Katalog} />
      </Switch>
      <BottomNav />
    </Fragment>
  );
}

export default Homepage;
