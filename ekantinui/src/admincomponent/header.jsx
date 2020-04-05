import React, { Component } from 'react';
// react-router dom
import { Link, Redirect } from 'react-router-dom'
// import header
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class Header extends Component {
    state = {  }
    render() { 
        return ( 
            <div style={{flexGrow:1}}>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        {/* <MenuIcon /> */}
                    </IconButton>
                    <Typography variant="h6" style={{flexGrow:1}}>
                        Login Admin Page
                    </Typography>
                        {/* <Link to={'/adminlogin'} style={{ color: 'white', textDecoration: 'none' }}>
                            <Button color="inherit">Login</Button>
                        </Link> */}
                        <ExitToAppIcon />
                    </Toolbar>
                </AppBar>
            </div>
         );
    }
}
 
export default Header;