import React from 'react';
import Input from '../components/inputs/input';
import Button from '../components/button';
import * as firebase from 'firebase';
import InfoPop from '../components/infoPop';
import { UserContext } from '../contexts/user'

export default class Login extends React.Component {
    static contextType = UserContext
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
            let authData = JSON.stringify(user.user);
            authData = JSON.parse(authData);

            localStorage.setItem('userEmail', authData.email);
            localStorage.setItem('userID', authData.uid);
            localStorage.setItem('logged', 'true')

            const { trueFunc } = this.context
            trueFunc()

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