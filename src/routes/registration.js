import React from 'react';
import Header from '../modules/header';
import Input from '../components/inputs/input';
import Button from '../components/button';

// let firebase = require('firebase');
// let firebaseui = require('firebaseui')

// let ui = new firebaseui.auth.AuthUI(firebase.auth());

export default class Registration extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            secondPassword: ''
        }

        this.getEmail = this.getEmail.bind(this);
        this.getPassword = this.getPassword.bind(this);
    }

    getEmail = (email) => {
        this.setState({
            email
        });
    }

    getPassword = (password) => {
        this.setState({
            password
        });
    }

    getSecondPassword = (secondPassword) => {
        this.setState({
            secondPassword
        });
    }


    render() {
        return(
            <div>
                <Header />
                <div className='registration'>
                    <div className='registration__box'>
                        <div className='registration__input'>
                            <Input 
                                type='email' 
                                placeholder='El. pašto adresas' 
                                changeHandler={this.getEmail} 
                            />
                        </div>
                        <div className='registration__input'>
                            <Input 
                                type='password' 
                                placeholder='Slaptažodis' 
                                changeHandler={this.getPassword} 
                            />
                        </div>
                        <div className='registration__input'>
                            <Input 
                                type='password' 
                                placeholder='Pakartokite slaptažodį' 
                                changeHandler={this.getSecondPassword} 
                            />
                        </div>
                        <div className='registration__button'>
                            <Button buttonText='Regisrtuotis' />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}