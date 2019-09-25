import React, { Component } from 'react';
import './App.css';
import AuthService from './services/AuthService';
import Home from './components/commons/Home';
import Login from './components/commons/Login';
import UserNav from './components/commons/UserNav';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';

class App extends Component {

  constructor(props){
    super(props);
    this.auth = new AuthService();
    this.state = {auth: this.auth.isLoggedIn()};
    this.onAuthChange = this.onAuthChange.bind(this);
  }

  render() {
    if(this.state.auth){
      return(<UserNav onAuthChange={this.onAuthChange}></UserNav>);
    }
    return (
    <Router>
      <Switch>
        <Route path="/Login" render={(routerProps)=> <Login {...routerProps} onAuthChange={this.onAuthChange}></Login>}/>
        <Redirect from="*" to="/Login"/>
      </Switch>
    </Router>
    );
  }

  onAuthChange(){
    this.setState({auth:this.auth.isLoggedIn()});
  }

}

export default App;
