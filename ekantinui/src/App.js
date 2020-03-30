import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import AppBar from "./components/AppBar";
import Homepage from "./pages/Homepage";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import CssBaseline from "@material-ui/core/CssBaseline";

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
          <Route path="/" component={Homepage} />
        </Switch>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
