import React, { Fragment, useEffect } from "react";
import Numeral from "numeral";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";

import ScrollToTop from "../../components/scrollToTop";
import { SEARCH_RESET } from "../../redux/types";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 480,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: -55,
    backgroundColor: "#fff",
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 420,
    minHeight: "100vh",
    paddingBottom: 80,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 5,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function MenuList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch({ type: SEARCH_RESET });
  }, [dispatch]);

  const { ListFood, ListDrink, Loading } = useSelector(({ MenuList }) => {
    return {
      ListFood: MenuList.listFood,
      ListDrink: MenuList.listDrink,
      Loading: MenuList.loading,
    };
  });

  if (!location.query) {
    return <Redirect to="/" />;
  } else {
    return (
      <Fragment>
        <ScrollToTop />
        <Toolbar />
        <Paper className={classes.container}>
          {Loading ? (
            <div className="loading">Loading&#8230;</div>
          ) : (
            <div className={classes.root}>
              {[...ListFood, ...ListDrink]
                .filter((menu) => {
                  return menu.menuName.toLowerCase().indexOf(location.query.toLowerCase()) !== -1;
                })
                .map((food, index) => {
                  return (
                    <ListItem
                      component={Link}
                      to={{ pathname: "/profil", id: food.profileId }}
                      key={food.menuId}
                      button
                      className={classes.nested}>
                      <ListItemText primary={"Rp " + Numeral(food.menuPrice).format("0,0")} />
                      <ListItemText style={{ width: 180 }} primary={food.menuName} secondary={`Kantin ${food.standName}`} />
                    </ListItem>
                  );
                })}
            </div>
          )}
        </Paper>
      </Fragment>
    );
  }
}

export default MenuList;
