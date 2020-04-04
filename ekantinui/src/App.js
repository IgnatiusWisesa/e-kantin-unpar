import React, { Component } from 'react';
import './App.css';
// react-router dom
import { Switch, Route } from 'react-router-dom';
// pages
import Managemerchant from './admin/managemerchant'
import Managemenus from './admin/managemenus'
import HeaderAdmin from './admincomponent/header'
import FooterAdmin from './admincomponent/footer'
import LoginAdmin from './admin/login';

class App extends Component {
  state = {  }
  render() { 
    return ( 
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
     );
  }
}
 
export default App;
