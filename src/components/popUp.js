import React from 'react';
import Input from './inputs/input';
import Button from './button';
import * as firebase from 'firebase';
import InfoPop from './infoPop';

export default class PopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            badLogin: false
        }

        this.getEmail = this.getEmail.bind(this);
        this.getPassword = this.getPassword.bind(this);
    }

    getEmail = (email) => {
        this.setState({
            email
        })
    }

    getPassword = (password) => {
        this.setState({
            password
        })
    }

    signIn = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userID', user.uid);
            
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage);
            this.setState({
                badLogin: true
            })
          });
    }

    render(){
        return(
            <div>
                {this.state.badLogin ? <InfoPop infoText='Neteisingai suvesti duomenys, bandykite dar kartą' /> : null}
                {/* TODO uzdeti backgrounda */}
                <div className='popup'>
                    <div className='popup__input'>
                        <Input type='text' placeholder='El. paštas' changeHandler={this.getEmail} />
                    </div>
                    <div className='popup__input'>
                        <Input type='password' placeholder='Slaptažodis' changeHandler={this.getPassword} />
                    </div>
                    <div className='popup__bottom'>
                        <div className='popup__text'>
                            <a href='/registration' >Registruotis</a>
                        </div>
                        <Button buttonText='Prisijungti' handleClick={this.signIn} />
                    </div>
                </div>
            </div>
        )
    }
}