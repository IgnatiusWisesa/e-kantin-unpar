import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import CssBaseline from "@material-ui/core/CssBaseline";

import AppBar from "./components/AppBar";
import BottomNav from "./components/BottomNav";
import Katalog from "./pages/Katalog";
import DaftarMenu from "./pages/DaftarMenu";
import ProfilKantin from "./pages/ProfilKantin";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: "#f44336"
    }
  }
});

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar />
        <Switch>
          <Route path="/" exact component={Katalog} />
          <Route path="/daftar_menu" component={DaftarMenu} />
          <Route path="/profil" component={ProfilKantin} />
        </Switch>
        <BottomNav />
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
