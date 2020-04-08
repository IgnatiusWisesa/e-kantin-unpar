/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Numeral from "numeral";

import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import LogoWA from "../../chat_via_wa.svg";
import ScrollToTop from "../../components/scrollToTop";
import { APIURL } from "../../helpers/APIURL";

const profilStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 480,
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    minHeight: "100vh",
    // backgroundColor: "#fff"
  },
  root: {
    padding: 20,
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: "#ebebeb",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function ProfileMerchant() {
  const profil = profilStyles();
  const location = useLocation();

  const [foodOpen, setFoodOpen] = useState(false);
  const [bevsOpen, setBevsOpen] = useState(false);
  const handleFood = () => {
    setFoodOpen(!foodOpen);
    setBevsOpen(false);
  };
  const handleBevs = () => {
    setFoodOpen(false);
    setBevsOpen(!bevsOpen);
  };

  const { ListStand, ListMenuFood, ListMenuDrink } = useSelector(({ Catalog, MenuList }) => {
    return {
      ListStand: Catalog.listStand,
      ListMenuFood: MenuList.listFood,
      ListMenuDrink: MenuList.listDrink,
    };
  });
  const stand = ListStand.filter((stand) => stand.profileId === location.id)[0];
  const listFood = ListMenuFood.filter((stand) => stand.profileId === location.id);
  const listDrink = ListMenuDrink.filter((stand) => stand.profileId === location.id);

  if (!location.id) {
    return <Redirect to="/" />;
  } else {
    return (
      <Fragment>
        <ScrollToTop />
        <div className={profil.container}>
          <Toolbar id="back-to-top-anchor" />
          <Paper elevation={0} className={profil.root}>
            <CardContent style={{ display: "flex" }}>
              <CardMedia>
                <Avatar className={profil.avatar}>
                  <img width="75px" src={APIURL + stand.standPhoto} alt={stand.standName} />
                </Avatar>
              </CardMedia>
              <CardContent style={{ display: "block", padding: 0, paddingLeft: 20 }}>
                <Typography variant="h6" component="h2">
                  Kantin {stand.standName}
                </Typography>
                <Typography variant="body2" component="p">
                  {stand.standAddress}
                </Typography>
                <Button
                  style={{ padding: 0, marginTop: 10, marginBottom: 10 }}
                  target="_blank"
                  href={`https://api.whatsapp.com/send?phone=${stand.standContact}`}>
                  <img width={120} src={LogoWA} alt="" />
                </Button>
              </CardContent>
            </CardContent>

            <Divider />

            <CardContent>
              {listFood.length ? (
                <>
                  <ListItem button onClick={handleFood}>
                    <ListItemIcon>
                      <RestaurantIcon />
                    </ListItemIcon>
                    <ListItemText primary="Makanan" />
                    {foodOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </ListItem>
                  <Collapse in={foodOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {listFood.map((food, id) => {
                        return (
                          <ListItem key={id} button className={profil.nested}>
                            <ListItemText primary={"Rp " + Numeral(food.menuPrice).format("0,0")} />
                            <ListItemText style={{ width: 180 }} primary={food.menuName} secondary={food.menuDesc} />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              ) : null}

              {listDrink.length ? (
                <>
                  <ListItem button onClick={handleBevs}>
                    <ListItemIcon>
                      <LocalCafeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Minuman" />
                    {bevsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </ListItem>
                  <Collapse in={bevsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {listDrink.map((drink, id) => {
                        return (
                          <ListItem key={id} button className={profil.nested}>
                            <ListItemText primary={"Rp " + Numeral(drink.menuPrice).format("0,0")} />
                            <ListItemText style={{ width: 180 }} primary={drink.menuName} secondary={drink.menuDesc} />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              ) : null}
            </CardContent>
          </Paper>
        </div>
      </Fragment>
    );
  }
}

// const daftarMakanan = [
//   { name: "Nasi Goreng", description: "nasi goreng kecap saos nasi goreng kecap saos goreng", price: 15000 },
//   { name: "Nasi Goreng Merah", description: "nasi goreng saos", price: 15000 },
//   { name: "Mie Goreng", description: "mie yang digoreng", price: 15000 },
//   { name: "Mie Rebus", description: "mie yang direbus", price: 15000 },
//   { name: "Cap Cay", description: "yur sayur", price: 12000 },
//   { name: "Nasi Goreng", description: "nasi goreng kecap saos", price: 15000 },
// ];

// const daftarMinuman = [
//   { name: "Teh Tawar", description: "dingin/panas", price: 3000 },
//   { name: "Teh Manis", description: "dingin/panas", price: 4000 },
//   { name: "Kopi", description: "dingin/panas", price: 4000 },
//   { name: "Mineral Prima", description: "botol dingin/panas", price: 5000 },
// ];

// const dataKantin = [
//   { id: 1, name: "Kantin Satu", phone: "6285735289857", photo: "https://material-ui.com/static/images/avatar/1.jpg" },
//   { id: 2, name: "Kantin Dua", phone: "6285735288288", photo: "https://material-ui.com/static/images/avatar/2.jpg" },
//   { id: 3, name: "Kantin Tiga", phone: "6285735288288", photo: "https://material-ui.com/static/images/avatar/3.jpg" },
//   { id: 4, name: "Kantin Empat", phone: "6285735288288", photo: "https://material-ui.com/static/images/avatar/4.jpg" },
//   { id: 5, name: "Kantin Lima", phone: "6285735288288", photo: "https://material-ui.com/static/images/avatar/5.jpg" },
//   { id: 6, name: "Kantin Enam", phone: "6285735288288", photo: "https://material-ui.com/static/images/avatar/6.jpg" },
//   { id: 7, name: "Kantin Tujuh", phone: "6285735288288", photo: "https://material-ui.com/static/images/avatar/7.jpg" },
//   { id: 8, name: "Kantin Delapan", phone: "6285735288288", photo: "https://material-ui.com/static/images/avatar/3.jpg" },
//   { id: 9, name: "Kantin Sembilan", phone: "6285735288288", photo: "https://material-ui.com/static/images/avatar/4.jpg" },
//   { id: 10, name: "Kantin Sepuluh", phone: "6285735288288", photo: "https://material-ui.com/static/images/avatar/5.jpg" },
// ];

export default ProfileMerchant;
