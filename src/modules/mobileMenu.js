import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import * as firebase from 'firebase'
import Login from './login'

export default class MobileMenu extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            login: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (localStorage.getItem('userID')){
            if (prevState.login) {
                this.setState({
                    login: false
                })
            }
        }
    }

    signOut = () => {
        firebase.auth().signOut().then(() => {
            localStorage.removeItem('userEmail')
            localStorage.removeItem('userID')
            localStorage.removeItem('admin')
            this.props.onClickClose(false)
            })
            .catch((error) => {
            console.log(error.code, error.message)
            });
    }

    render(){
        return(
            <div className='mobileMenu'>
                <FontAwesomeIcon 
                    className='mobileMenu__close'
                    icon={faTimes}
                    onClick={() => this.props.onClickClose(false) }
                />
                { this.state.login ?
                    <Login /> :
                    <div>
                        {localStorage.getItem('userID') &&
                            <div className='mobileMenu__user'>
                                {localStorage.getItem('userEmail')}
                            </div>
                        }
                        <ul className='mobileMenu__menu'>
                            <li>
                                <a href='/' >Paslaugos</a>
                            </li>
                            <li>
                                <a href='/' >Rėmai</a>
                            </li>
                            <li>
                                <a href='/' >Kontaktai</a>
                            </li>
                            { localStorage.getItem('userID') ? 
                                <div>
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
                                    <li>
                                        <div onClick={this.signOut}>Atsijungti</div>
                                    </li>    
                                </div> :
                                <li>
                                    <div onClick={() => this.setState({login: true})}>
                                        Prisijungti
                                    </div>
                                </li>
                            }
                        </ul>
                    </div>
                }
            </div>
        )
    }
}