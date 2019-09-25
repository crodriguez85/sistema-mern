import React from 'react';
import './App.css';
import AuthService from './services/AuthService';

class App extends Component {
  constructor(props){
    super(props);
    this.auth = new AuthService();
    this.state = {
      auth: this.auth.isLoggedIn()
    }
  }
  render() { 
    return ( 
      <div></div>
     );
  }
}
 
export default App;
