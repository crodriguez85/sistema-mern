import React, { Component } from 'react';
import AuthService from '../../services/AuthService';
import {Card, CardHeader} from '@material-ui/core';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {email: '', password: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.AuthService = new AuthService();
    }
    render() { 
        return ( 
            <Card>
                <div style={{textAlign: 'center'}}>
                    <CardHeader title="Acceso al Sistema"/>
                </div>
            </Card>
         );
    }
}

handleChange(){
    
}
 
export default Login;