import React, { useState, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
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

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 480,
    backgroundColor: "grey",
    flexGrow: 1
  },
  appBar: {
    width: 460,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: "auto",
    marginRight: "auto",
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit",
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
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
        width: "20ch"
      }
    }
  }
}));

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

export default function SearchAppBar(props) {
  const classes = useStyles();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Fragment>
      <ElevationScroll {...props}>
        <div className={classes.root}>
          <AppBar>
            <div id="appbar-menu" className={classes.appBar}>
              <Toolbar>
                <Typography className={classes.title} component={Link} to="/" variant="h6" noWrap>
                  {location.pathname === "/" ? (
                    "eKantin"
                  ) : location.pathname === "/daftar_menu" ? (
                    // <Button style={{ color: "#fff" }} startIcon={<ArrowBackIosIcon />}>
                    "eKantin"
                  ) : (
                    // </Button>
                    <Button style={{ color: "#fff" }} startIcon={<ArrowBackIosIcon />}>
                      Back
                    </Button>
                  )}
                </Typography>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
              </Toolbar>
            </div>
          </AppBar>
        </div>
      </ElevationScroll>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}>
        <div style={{ width: 480, marginLeft: "auto", marginRight: "auto" }}>
          <Typography className={classes.typography}>The content of the Popover.</Typography>
        </div>
      </Popover>
    </Fragment>
  );
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired
};
