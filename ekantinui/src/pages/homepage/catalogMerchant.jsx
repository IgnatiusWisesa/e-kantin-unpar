import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import LogoWA from "../../chat_via_wa.svg";
import ScrollToTop from "../../components/scrollToTop";

import { APIURL } from "../../helpers/APIURL";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    maxWidth: 360,
    paddingTop: 30,
    // paddingLeft: 15,
    // paddingRight: 15,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: -55,
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
    paddingBottom: 80,
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

function CatalogMerchant() {
  const classes = useStyles();
  const cardStyle = cardStyles();

  const { ListStand, Loading, onSearch, querySearch } = useSelector(({ Catalog, Search }) => {
    return {
      ListStand: Catalog.listStand,
      Loading: Catalog.loading,
      onSearch: Search.onSearch,
      querySearch: Search.querySearch,
    };
  });

  if (onSearch) {
    return <Redirect to={{ pathname: "/search", query: querySearch }} />;
  }

  return (
    <Fragment>
      <Helmet>
        <title>eKantin Unpar</title>
      </Helmet>
      <Toolbar />
      <ScrollToTop />
      <div className={classes.container}>
        {Loading ? (
          <div className="loading">Loading&#8230;</div>
        ) : (
          <div className={cardStyle.container}>
            {ListStand.map((stand) => {
              return (
                <div variant="outlined" key={stand.profileId} className={cardStyle.root}>
                  <CardActionArea component={Link} to={{ pathname: "/profil", id: stand.profileId }}>
                    <CardContent className={cardStyle.media}>
                      {stand.standPhoto === "/images/img1586087837004.retail-store-icon.png" ? (
                        <Avatar className={cardStyle.avatar}>
                          <img width="50px" src={APIURL + stand.standPhoto} alt={stand.standName} />
                        </Avatar>
                      ) : (
                        <Avatar className={cardStyle.avatar}>
                          <img width="100%" src={APIURL + stand.standPhoto} alt={stand.standName} />
                        </Avatar>
                      )}
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
      </div>
    </Fragment>
  );
}
export default CatalogMerchant;
