import React from 'react';
import Header from '../modules/header';
import Input from '../components/inputs/input';
import Button from '../components/button';
import InfoPop from '../components/infoPop';
import '../firebase';
import * as firebase from 'firebase';

let db = firebase.firestore();

export default class Registration extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            secondPassword: '',
            falseEmail: false,
            badPassword: false,
            usedEmail: false,
            registered: false
        }

        this.getEmail = this.getEmail.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.registrate = this.registrate.bind(this);
        this.falseEmail = this.falseEmail.bind(this);
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
            .then((data) => {
                this.setState({
                    registered: true
                })

                let email = data.user.email;
                let userID = data.user.uid;

                db.collection("users").doc(userID).set({
                    email,
                    userID,
                    role: '',
                    phone: '',
                    name: '',
                    surname: ''
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            })    
            .catch(
                    (err) => {
                        var errorCode = err.code;
                        var errorMessage = err.message;

                        console.log(errorCode, errorMessage);
                        if(errorCode === 'auth/invalid-email'){
                            this.setState({
                                falseEmail: true
                            });
                        } else if (errorCode === 'auth/weak-password'){
                            this.setState({
                                badPassword: true
                            })
                        } else if (errorCode === 'auth/email-already-in-use'){
                            this.setState({
                                usedEmail: true
                            })
                        }
                }
                );
        }else{
        }
    }

    falseEmail = () => {
        this.setState({
            falseEmail: true
        });
    }

    render() {
        return(
            <div>
                {this.state.falseEmail === true ? <InfoPop infoText='Blogai nurodytas el. pašto adresas.' /> : null}
                {this.state.badPassword === true ? <InfoPop infoText='Silpnas slaptažodis. Slaptažodis turis susidaryti bet iš 6 simbolių.' /> : null}
                {this.state.usedEmail === true ? <InfoPop infoText='Vartotojas su šiuo el. pašto adresu jau egzistuoja.' /> : null}
                {this.state.registered === true ? <InfoPop infoText='Jūsų paskyra sėkmingai sukurta. Galite prisijungti.' /> : null}
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