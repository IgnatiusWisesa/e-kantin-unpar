/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import LogoWA from "../../chat_via_wa.svg";
import ScrollToTop from "../../components/ScrollToTop";

import { APIURL } from "../../helpers/APIURL";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    maxWidth: 480,
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    backgroundColor: "#fff",
  },
}));

const cardStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    height: "100%",
    justifyContent: "space-around",
    alignContent: "space-between",
  },
  root: {
    width: 180,
    marginBottom: "5%",
  },
  title: {
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    marginRight: "auto",
    marginLeft: "auto",
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: "#ebebeb",
  },
}));

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

function CatalogMerchant() {
  const classes = useStyles();
  const cardStyle = cardStyles();

  const { ListStand, Loading } = useSelector(({ Catalog }) => {
    return {
      ListStand: Catalog.listStand,
      Loading: Catalog.loading,
    };
  });

  return (
    <Fragment>
      <ScrollToTop />
      <div className={classes.container}>
        <Toolbar />

        {Loading ? (
          <div className="loading">Loading&#8230;</div>
        ) : (
          <div className={cardStyle.container}>
            {ListStand.map((stand) => {
              return (
                <div variant="outlined" key={stand.profileId} className={cardStyle.root}>
                  <CardActionArea component={Link} to={{ pathname: "/profil", id: stand.profileId }}>
                    <CardContent className={cardStyle.media}>

                      
                      {
                        stand.standPhoto==='/images/img1586087837004.retail-store-icon.png'?
                        <Avatar className={cardStyle.avatar}>
                          <img width="50px" src={stand.standPhoto} alt={stand.standName} />
                        </Avatar>
                        :
                        <Avatar className={cardStyle.avatar}>
                          <img width="50px" src={APIURL +'/images/'+ stand.standPhoto} alt={stand.standName} />
                        </Avatar>
                      }


                    </CardContent>
                    <Typography variant="body2" component="p" className={cardStyle.title}>
                      {stand.standName}
                    </Typography>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      className={cardStyle.button}
                      size="small"
                      target="_blank"
                      href={`https://api.whatsapp.com/send?phone=${stand.standContact}`}>
                      <img width={100} src={LogoWA} alt="" />
                    </Button>
                  </CardActions>
                </div>
              );
            })}
          </div>
        )}

        {/* END OF CONTAINER */}
      </div>
    </Fragment>
  );
}
export default CatalogMerchant;
