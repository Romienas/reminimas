import React from 'react';
import PopUp from '../components/popUp';
import * as firebase from 'firebase';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopUp: false,
            userLogged: false
        }

        this.showPopUp = this.showPopUp.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                //TODO
                console.log(user)
                localStorage.setItem('userEmail', user.email);
                localStorage.setItem('userID', user.uid);
                this.setState({
                    showPopUp: false,
                    userLogged: true
                })
            } else {
            }
          });
    }
 

    showPopUp = () => {
        this.setState({
            showPopUp: !this.state.showPopUp
        })
    }

    signOut = () => {
        firebase.auth().signOut().then(() => {
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userID');
            this.setState({
                userLogged: false
            })
          }).catch((error) => {
            console.log(error.code, error.message)
          });
    }

    render() {
        return(
            <div className='header'>
                <div>
                    <h1>Paveikslų rėminimas</h1>
                </div>
                <div>
                    { localStorage.getItem('userID') ? 
                        <div className='header__user'>
                            <div>{localStorage.getItem('userEmail')}</div>
                            <div className='header__signout' onClick={this.signOut}>Atsijungti</div>
                        </div> :
                        <div className='header__login' onClick={this.showPopUp}>Prisijungti</div>
                    }
                    {this.state.showPopUp === false ? null :
                    <div>
                        <div className='header__close-popup' onClick={this.showPopUp}></div>
                        <PopUp />
                    </div>
                    }
                </div>
            </div>
        )
    }
}