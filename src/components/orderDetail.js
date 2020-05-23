import React from 'react'
import * as firebase from 'firebase'
import Button from './button'

let db = firebase.firestore()

export default class OrderDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        db.collection('users')
        .doc(this.props.user)
        .get()
        .then(doc => {
            let data = doc.data()
            data = JSON.stringify(data)
            data = JSON.parse(data)
            this.setState({
                user: data
            })
        })
    }

    render() {
        return (
            <div 
                className='orderDetail__detail'
                onClick={ () => this.props.handleClick(false) }
            >
                <div className='orderDetail__detail-box'>
                    <div className='orderDetail__item'>
                        <div>
                            <span>Užsakovas:</span>
                        </div>
                        <div>
                            {this.state.user.name} {this.state.user.surname}
                        </div>
                    </div>
                    <div className='orderDetail__item'>
                        <span>Telefono nr.:</span> {this.state.user.phone}
                    </div>
                    <div className='orderDetail__item'>
                        <span>El. paštas:</span> {this.state.user.email}
                    </div>
                    <div className='orderDetail__item'>
                        <span>Bageto pavadinimas:</span> {this.props.product}
                    </div>
                    <div className='orderDetail__item'>
                        <span>Stiklas:</span> {this.props.glass}
                    </div>
                    <div className='orderDetail__item'>
                        <span>Nugara:</span> {this.props.back}
                    </div>
                    <div className='orderDetail__item'>
                        <span>Išmatavimai:</span> {this.props.width} X {this.props.height} cm
                    </div>
                    <div className='orderDetail__item'>
                        <div>
                            <span>Komentaras:</span>
                        </div>
                        <div>
                            {this.props.comment}
                        </div>
                    </div>
                    <div className='orderDetail__item'>
                        <span>Užsakymo vertė:</span> {this.props.price} &euro;
                    </div>
                    <div className='orderDetail__button'>
                        <Button 
                            buttonText='Uždaryti'
                            handleClick={ () => this.props.handleClick(false) }
                        />
                    </div>
                </div>
            </div>
        )
    }
}