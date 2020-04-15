import React, { Fragment, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./styles/App.css";

import Homepage from "./pages/Homepage";
import Admin from "./pages/Admin";

import "bootstrap/dist/css/bootstrap.min.css";

// import { useDispatch, useSelector } from "react-redux";
// import { adminKeepLogin } from "./redux/actions";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: "#f44336",
    },
  },
});

function App() {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(adminKeepLogin())
  // }, [adminKeepLogin])

  // // get data from global state
  // const data = useSelector( state => state.Auth )
  // console.log(data)
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
