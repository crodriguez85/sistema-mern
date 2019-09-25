import React from 'react';
import './App.css';
import AuthService from './services/AuthService';
import Home from './components/commons/Home';
import Login from './components/commons/Login';

class App extends Component {
  constructor(props){
    super(props);
    this.auth = new AuthService();
    this.state = {
      auth: this.auth.isLoggedIn()
    }
  }
  render() { 
    if(this.state.auth){
      return (<Home/>)
    }
    return (<Login/>);
  }
}
 
export default App;
