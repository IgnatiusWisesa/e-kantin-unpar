/* eslint-disable no-unused-vars */
import React, { useState, Fragment } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Popover from "@material-ui/core/Popover";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 480,
    backgroundColor: "grey",
    flexGrow: 1,
  },
  appBar: {
    width: 460,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: "auto",
    marginRight: "auto",
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit",
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  toolbar: theme.mixins.toolbar,
}));

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function HeaderAppBar(props) {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const [state, setState] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setState(open);
  };

  return (
    <Fragment>
      <ElevationScroll {...props}>
        <div className={classes.root}>
          <AppBar>
            <div id="appbar-menu" className={classes.appBar}>
              <Toolbar>
                {location.pathname === "/" || location.pathname === "/daftar_menu" ? (
                  <>
                    <IconButton
                      onClick={toggleDrawer(true)}
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="menu">
                      <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                      eKantin
                    </Typography>
                  </>
                ) : (
                  <Typography className={classes.title} variant="h6" noWrap>
                    <Button onClick={() => history.goBack()} style={{ color: "#fff" }} startIcon={<ArrowBackIosIcon />}>
                      Back
                    </Button>
                  </Typography>
                )}
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
              </Toolbar>
            </div>
          </AppBar>
        </div>
      </ElevationScroll>
      <SwipeableDrawer anchor="left" open={state} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        <div className={classes.toolbar} />
        <Divider />
        <Paper elevation={0} style={{ width: 200 }}>
          <ListItem>
            <Button component={Link} to="/admin/login">
              Login
            </Button>
          </ListItem>
        </Paper>
      </SwipeableDrawer>
    </Fragment>
  );
}

export default HeaderAppBar;
