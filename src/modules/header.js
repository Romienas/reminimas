import React from 'react';
import Login from './login';
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
                localStorage.setItem('userEmail', user.email);
                localStorage.setItem('userID', user.uid);
                this.setState({
                    showPopUp: false,
                    userLogged: true
                })
            }
          });

          let userID = localStorage.getItem('userID')
          if(userID){
            let db = firebase.firestore();
            db.collection('users').doc(userID).get()
            .then((doc) =>{
                    if(doc.exists){
                        let data = doc.data();
                        data = JSON.stringify(data);
                        data = JSON.parse(data);
                        
                        if (data.role === 'admin'){
                            localStorage.setItem('admin', "true")
                        }
                    }
            })
        }
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
            localStorage.removeItem('admin');
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
                    <h1><a href='/'>Paveikslų rėminimas</a></h1>
                </div>
                { localStorage.getItem('userID') ?
                    <div className='header__menu'>
                        <ul>
                            { localStorage.getItem('admin') === 'true' ? 
                                <li><a href='/admin'>admin</a></li> :
                                 null 
                            }
                            { localStorage.getItem('admin') === 'true' ? 
                                <li><a href='/add-product'>pridėti prekę</a></li> : 
                                null 
                            }
                            <li><a href='/profile'>profilis</a></li>
                        </ul>
                    </div> : null }
                <div>
                    { localStorage.getItem('userID') ? 
                        <div className='header__user'>
                            <div>{ localStorage.getItem('userEmail') }</div>
                            <div className='header__signout' onClick={this.signOut}>Atsijungti</div>
                        </div> :
                        <div className='header__login' onClick={this.showPopUp}>Prisijungti</div>
                    }
                    {this.state.showPopUp === false ? null :
                    <div>
                        <div className='header__close-popup' onClick={this.showPopUp}></div>
                        <Login />
                    </div>
                    }
                </div>
            </div>
        )
    }
}