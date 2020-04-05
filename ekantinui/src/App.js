import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./styles/App.css";

import Homepage from "./pages/homepage";
import Admin from "./pages/admin";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: "#f44336",
    },
  },
});

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/" component={Homepage} />
        </Switch>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
