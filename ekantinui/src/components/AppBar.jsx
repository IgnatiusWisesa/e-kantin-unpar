import React, { useState, Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { SEARCH_START } from "../redux/types";

import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 480,
    backgroundColor: "grey",
    flexGrow: 1,
  },
  rootcolor: {
    backgroundColor: "#00a8cc",
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
    marginLeft: "1vh",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade("#005082", 0.15),
    "&:hover": {
      backgroundColor: fade("#005082", 0.25),
    },
    marginLeft: 0,
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    // backgroundColor:'#005082'
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
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleInput = (e) => {
    if (e.key === "Enter") {
      dispatch({ type: SEARCH_START, payload: searchQuery });
    }
  };

  return (
    <Fragment>
      <ElevationScroll {...props}>
        <div className={classes.root}>
          <AppBar className={classes.rootcolor}>
            <div id="appbar-menu" className={classes.appBar}>
              <Toolbar>
                {location.pathname === "/" || location.pathname === "/daftar_menu" ? (
                  <>
                    {/* <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="menu">
                      <MenuIcon />
                    </IconButton> */}
                    <RestaurantMenuIcon />
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
                {location.pathname !== "/search" ? (
                  <div className={classes.search}>
                    <>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder="search menu"
                        onChange={handleSearchQuery}
                        value={searchQuery}
                        onKeyPress={handleInput}
                        onFocus={() => setSearchQuery("")}
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        inputProps={{ "aria-label": "search" }}
                      />
                    </>
                  </div>
                ) : (
                  <Typography align="right" className={classes.title} variant="subtitle1" noWrap>
                    {`Hasil pencarian ${searchQuery}`}
                  </Typography>
                )}
              </Toolbar>
            </div>
          </AppBar>
        </div>
      </ElevationScroll>
    </Fragment>
  );
}

export default HeaderAppBar;
