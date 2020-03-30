import React from 'react';
import Header from '../modules/header';
import Input from '../components/inputs/input';
import Button from '../components/button';
import '../firebase';
import * as firebase from 'firebase';

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
        this.registrate = this.registrate.bind(this);
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

    registrate = () => {
        if(this.state.password === this.state.secondPassword && this.state.email !== ''){
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log('kodas', errorCode, errorMessage);
                    console.log('zinute', errorMessage);
                });

            console.log('tinka')
        }else{
            console.log('netinka')
        }
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
                            <Button buttonText='Regisrtuotis' handleClick={this.registrate} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}