import React from 'react'
import Header from '../modules/header'
import Footer from '../modules/footer'
import Loading from '../components/loading'
import * as firebase from 'firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import Input from '../components/inputs/input'
import Button from '../components/button'
import { withRouter } from 'react-router-dom'

let db = firebase.firestore()

class Profile extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            userObj: {},
            newName: '',
            newSurname: '',
            newPhone: '',
            showEdit: false,
            warning: false
        }
    }

    componentDidMount(){
        this.setState({
            loading: true
        })

        db.collection('users').doc(localStorage.getItem('userID'))
        .onSnapshot( (doc) => {
            let data = doc.data();
            data = JSON.stringify(data);
            data = JSON.parse(data);

            this.setState({
                loading: false,
                userObj: data
            })
        })
    }

    editProfile = () => {

        this.setState({
            loading: true
        })

        //Update name
        if(this.state.newName !== ''){
            db.collection('users').doc(localStorage.getItem('userID')).update({
                name: this.state.newName
            }).then( () => this.setState({newName: '', loading: false, showEdit: false}))
        }

        //Update surname
        if(this.state.newSurname !== ''){
            db.collection('users').doc(localStorage.getItem('userID')).update({
                surname: this.state.newSurname
            }).then( () => this.setState({newSurname: '', loading: false, showEdit: false}))
        }
        
        //Update phone number
        if(this.state.newPhone !== ''){
            db.collection('users').doc(localStorage.getItem('userID')).update({
                phone: this.state.newPhone
            }).then( () => this.setState({newPhone: '', loading: false, showEdit: false}))
        }
    }

    deleteAcc = () => {
        const {history} = this.props
        const user = firebase.auth().currentUser
        
        
            db.collection('users').doc(localStorage.getItem('userID'))
            .delete()
            .then(() => {
                user.delete().then(() => {
                    localStorage.removeItem('userID')
                    localStorage.removeItem('userEmail')
                    localStorage.removeItem('admin')
                    history.push('/')
                })
            })
      
        .catch((err) => {
            console.log('User delete error: ', err)
        })
    }

    render() {
        return(
            <div>
                <Header />
                {this.state.loading &&
                    <Loading />
                }
                <div className='profile'>
                {this.state.warning &&
                    <div className='profile__warning'>
                        <div className='profile__warning-box'>
                            <p>
                                Ar tikrai norite panaikinti savo paskyrą?
                            </p>
                            <div className='profile__warning-buttons'>
                                <div 
                                    className='profile__warning-buttons--yes'
                                    onClick={this.deleteAcc}
                                >
                                    Taip
                                </div>
                                <Button 
                                    buttonText='Ne'
                                    handleClick={() => this.setState({warning: false})}
                                />
                            </div>
                        </div>
                    </div>
                }
                    <div className='global__title'>
                        <h2>Profilis</h2>
                    </div>
                    <div className='profile__container'>
                        <div className='profile__box'>
                            <div className='profile__box-padding'>
                                <div className='profile__title'>
                                    <h3>Mano duomenys</h3>
                                </div>
                                <ul>
                                    <li>
                                        <span>Vardas:</span> {this.state.userObj.name}
                                    </li>
                                    <li>
                                        <span>Pavardė:</span> {this.state.userObj.surname}
                                    </li>
                                    <li>
                                        <span>Telefono numeris:</span> {this.state.userObj.phone}
                                    </li>
                                    <li>
                                        <span>El.paštas:</span> {this.state.userObj.email}
                                    </li>
                                </ul>
                                <div>
                                    <div
                                        className='profile__edit'
                                        onClick={()=>this.setState({showEdit: !this.state.showEdit})}
                                    >
                                        <span>
                                            {this.state.showEdit ? 
                                                <FontAwesomeIcon icon={faMinus} /> :
                                                <FontAwesomeIcon icon={faPlus} />
                                            }
                                        </span>
                                        Redaguoti duomenis
                                    </div>
                                    {this.state.showEdit &&
                                        <div className='profile__inputs'>
                                            <div className='profile__inputs-margin'>
                                                <Input 
                                                    placeholder='Vardas' 
                                                    changeHandler={(newName) => this.setState({newName})}
                                                    type='text'
                                                />
                                            </div>
                                            <div className='profile__inputs-margin'>
                                                <Input 
                                                    placeholder='Pavardė' 
                                                    changeHandler={(newSurname) => this.setState({newSurname})}
                                                    type='text'
                                                />
                                            </div>
                                            <div className='profile__inputs-margin'>
                                                <Input 
                                                    placeholder='Telefono numeris' 
                                                    changeHandler={(newPhone) => this.setState({newPhone})}
                                                    type='number'
                                                />
                                            </div>
                                            <div className='profile__editButton'>
                                                <Button 
                                                    buttonText='Redaguoti' 
                                                    handleClick={this.editProfile}
                                                />
                                            </div>
                                        </div>
                                    }
                                    <div 
                                        className='profile__deleteAcc'
                                        onClick={() => this.setState({warning: true})}
                                    >
                                        Panaikinti paskyrą
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default withRouter(Profile)