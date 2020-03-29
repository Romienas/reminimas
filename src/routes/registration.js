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

    getEmail = (e) => {
        this.setState({
            email: e.target.value
        });

        //TODO
        console.log(this.state.email)
    }

    getPassword = (e) => {
        this.setState({
            password: e.target.value
        });

        //TODO
        console.log(this.state.password)
    }


    render() {
        return(
            <div>
                <Header />
                <div className='registration'>
                    <div className='registration__box'>
                        <div className='registration__input'>
                            <Input type='email' placeholder='El. pašto adresas' onChange={this.getEmail} onClick={this.klik} />
                        </div>
                        <div className='registration__input'>
                            <Input type='password' placeholder='Slaptažodis' onChange={this.getPassword} />
                        </div>
                        <div className='registration__input'>
                            <Input type='password' placeholder='Pakartokite slaptažodį' onChange={this.getSecondPassword} />
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