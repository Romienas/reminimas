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
                localStorage.setItem('userEmail', user.email)
                this.setState({
                    userLogged: true
                })
            } else {
                this.setState({
                    userLogged: false
                  })
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
                    { this.state.userLogged ? 
                        <div>
                            <div>{localStorage.getItem('userEmail')}</div>
                            <div onClick={this.signOut}>Atsijungti</div>
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