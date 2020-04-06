/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from "react";
// react-router dom
import { Link, Redirect } from "react-router-dom";
// import header
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// redux
import { connect } from 'react-redux'
import { LoginSuccessAction } from './../../redux/actions'

class AdminHeader extends Component {
  state = {
    tologin:false
  };

  onLogoutClick=()=>{
    let logoutuser={
      id:'',
      adminMail:'',
      adminPassword:'',
      login:false
    }

    console.log("logging out")
    this.props.LoginSuccessAction(logoutuser)
    localStorage.clear();
    this.setState({ tologin:true })
  }

  render() {
    if(this.state.tologin){
      return(
        <Redirect to="/" />
      )
    }

    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              {/* <MenuIcon /> */}
            </IconButton>
            {
              this.props.Auth.login?
              <Fragment>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                  Admin Page
                </Typography>
                <Button onClick={this.onLogoutClick}>
                  <ExitToAppIcon />
                </Button>
              </Fragment>
              :
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                Login Admin Page
              </Typography>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const MapstateToprops =(state)=>{
  return{
      Auth: state.Auth
  }
}

export default connect(MapstateToprops, {LoginSuccessAction}) (AdminHeader);
