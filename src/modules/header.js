import React from 'react'
import Login from './login'
import * as firebase from 'firebase'
import logo from '../media/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import MobileMenu from './mobileMenu'

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopUp: false,
            userLogged: false,
            showDropdown: false,
            hamburger: false
        }
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                localStorage.setItem('userEmail', user.email)
                localStorage.setItem('userID', user.uid)
                this.setState({
                    showPopUp: false,
                    userLogged: true
                })
            }
          });

          let userID = localStorage.getItem('userID')
          if(userID){
            let db = firebase.firestore()
            db.collection('users').doc(userID).get()
            .then((doc) =>{
                    if(doc.exists){
                        let data = doc.data()
                        data = JSON.stringify(data)
                        data = JSON.parse(data)
                        
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
            localStorage.removeItem('userEmail')
            localStorage.removeItem('userID')
            localStorage.removeItem('admin')
            localStorage.removeItem('logged')
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
                {this.state.hamburger &&
                    <MobileMenu 
                        onClickClose={(hamburger)=> this.setState({hamburger})}
                    />
                }
                <div>
                    <a href='/'>
                        <img className='header__logo'  src={logo} alt='Meno mūzos logotipas' />
                    </a>
                </div>
                <div className='header__menu'>
                    <ul>
                        <li><a href='/' >Paslaugos</a></li>
                        <li><a href='/' >Rėmai</a></li>
                        <li><a href='/' >Kontaktai</a></li>
                    </ul>
                </div> 
                <div>
                    { localStorage.getItem('userID') ? 
                        <div className='header__user'>
                            <div
                                onMouseEnter={() => this.setState({showDropdown: true})}
                                onMouseLeave={() => this.setState({showDropdown: false})}
                            >
                                <div 
                                    className='header__user--active'
                                >
                                    { localStorage.getItem('userEmail') }
                                </div>
                                {this.state.showDropdown &&
                                    <div className='header__user-dropdown'>
                                        <ul>
                                            { localStorage.getItem('admin') === 'true' && 
                                                <li>
                                                    <a href='/admin'>Admin</a>
                                                </li>
                                            }
                                            { localStorage.getItem('admin') === 'true' &&
                                                <li>
                                                    <a href='/add-product'>Prekės</a>
                                                </li>
                                            }
                                            <li>
                                                <a href='/profile'>Profilis</a>
                                            </li>
                                            <li>
                                                <a href='/'>Užsakymai</a>
                                            </li>
                                        </ul>
                                    </div>
                                }
                            </div>
                            <div className='header__signout' onClick={this.signOut}>Atsijungti</div>
                        </div> :
                        <div className='header__login' onClick={this.showPopUp}>Prisijungti</div>
                    }
                    <FontAwesomeIcon 
                        className='header__hamburger'
                        icon={faBars}
                        onClick={() => this.setState({hamburger: !this.state.hamburger})}
                    />
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