import React, { Fragment, useState } from "react";
import Numeral from "numeral";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import Paper from "@material-ui/core/Paper";

import ScrollToTop from "../../components/scrollToTop";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    maxWidth: 360,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: -55,
    backgroundColor: "#fff",
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 340,
    minHeight: "100vh",
    paddingBottom: 80,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 5,
  },
  nested: {
    paddingLeft: theme.spacing(2),
  },
  tab: {
    width: 360,
    paddingLeft: -20,
    paddingRight: -20,
  },
}));

function MenuList() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { ListFood, ListDrink, Loading, onSearch, querySearch } = useSelector(({ MenuList, Search }) => {
    return {
      ListFood: MenuList.listFood,
      ListDrink: MenuList.listDrink,
      Loading: MenuList.loading,
      onSearch: Search.onSearch,
      querySearch: Search.querySearch,
    };
  });

  if (onSearch) {
    return <Redirect to={{ pathname: "/search", query: querySearch }} />;
  }

  return (
    <Fragment>
      <ScrollToTop />
      <Toolbar />
      <div className={classes.container}>
        <AppBar className={classes.tab} position="static" color="inherit">
          <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
            <Tab label="Makanan" icon={<RestaurantIcon />} {...a11yProps(0)} />
            <Tab label="Minuman" icon={<LocalCafeIcon />} {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        {Loading ? (
          <div className="loading">Loading&#8230;</div>
        ) : (
          <div className={classes.root}>
            <TabPanel value={value} index={0} dir={theme.direction}>
              {ListFood.map((food, index) => {
                return (
                  <ListItem
                    component={Link}
                    to={{ pathname: "/profil", id: food.profileId }}
                    key={food.menuId}
                    button
                    className={classes.nested}>
                    <ListItemText primary={"Rp " + Numeral(food.menuPrice).format("0,0")} />
                    <ListItemText
                      style={{ width: 150, marginLeft: 15 }}
                      primary={food.menuName}
                      secondary={`Kantin ${food.standName}`}
                    />
                  </ListItem>
                );
              })}
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              {ListDrink.map((drink, index) => {
                return (
                  <ListItem
                    component={Link}
                    to={{ pathname: "/profil", id: drink.profileId }}
                    key={drink.menuId}
                    button
                    className={classes.nested}>
                    <ListItemText primary={"Rp " + Numeral(drink.menuPrice).format("0,0")} />
                    <ListItemText
                      style={{ width: 150, marginLeft: 15 }}
                      primary={drink.menuName}
                      secondary={`Kantin ${drink.standName}`}
                    />
                  </ListItem>
                );
              })}
            </TabPanel>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default MenuList;
