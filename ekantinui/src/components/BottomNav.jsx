import React from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";

const useStyles = makeStyles({
  container: {
    width: 360,
    backgroundColor: "#fff",
    position: "sticky",
    bottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
  bottomNav: {
    width: 340,
    borderTop: "solid",
    borderWidth: 0.5,
    borderColor: "#c7c7c7",
  },
});

function BottomNav() {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div className={classes.container}>
      <BottomNavigation showLabels className={classes.bottomNav}>
        <BottomNavigationAction
          className={`${location.pathname === "/" ? "Mui-selected" : null}`}
          label="Katalog Kantin"
          icon={<HomeIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          className={`${location.pathname === "/daftar_menu" ? "Mui-selected" : null}`}
          label="Daftar Menu"
          icon={<RestaurantMenuIcon />}
          component={Link}
          to="/daftar_menu"
        />
      </BottomNavigation>
    </div>
  );
}
export default BottomNav;
