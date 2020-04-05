// import React, { Component } from 'react';
// import './App.css';
// // react-router dom
// import { Switch, Route } from 'react-router-dom';
// // pages
// import Managemerchant from './admin/managemerchant'
// import Managemenus from './admin/managemenus'
// import HeaderAdmin from './admincomponent/header'
// import FooterAdmin from './admincomponent/footer'
// import LoginAdmin from './admin/login';

// class App extends Component {
//   state = {  }
//   render() { 
//     return ( 
//       <div className="content">
//         <div className="App">
//           <HeaderAdmin />
//           <Switch>
//             <Route exact path="/adminlogin" component={LoginAdmin}/>
//             <Route exact path="/managemerchant" component={Managemerchant}/>
//             <Route exact path="/managemenus/:id" component={Managemenus}/>
//           </Switch>
//         </div>
//           <FooterAdmin />
//       </div>
//      );
//   }
import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import CssBaseline from "@material-ui/core/CssBaseline";
import './styles/App.css';

import AppBar from "./components/AppBar";
import BottomNav from "./components/BottomNav";
import Katalog from "./pages/Katalog";
import DaftarMenu from "./pages/DaftarMenu";
import ProfilKantin from "./pages/ProfilKantin";

import Managemerchant from './admin/managemerchant'
import Managemenus from './admin/managemenus'
import HeaderAdmin from './admincomponent/header'
import FooterAdmin from './admincomponent/footer'
import LoginAdmin from './admin/login';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: "#f44336"
    }
  }
});

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar />
        <Switch>
          <Route path="/" exact component={Katalog} />
          <Route path="/daftar_menu" component={DaftarMenu} />
          <Route path="/profil" component={ProfilKantin} />
          <div className="content">
        <div className="App">
          <HeaderAdmin />
          <Switch>
            <Route exact path="/adminlogin" component={LoginAdmin}/>
            <Route exact path="/managemerchant" component={Managemerchant}/>
            <Route exact path="/managemenus/:id" component={Managemenus}/>
          </Switch>
        </div>
          <FooterAdmin />
      </div>
        </Switch>
        <BottomNav />
      </ThemeProvider>
    </Fragment>
  );
}
 
export default App;
