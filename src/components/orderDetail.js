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
                    <div>
                        <div>
                            Užsakovas:
                        </div>
                        <div>
                            {this.state.user.name} {this.state.user.surname}
                        </div>
                    </div>
                    <div>
                        Telefono nr.: {this.state.user.phone}
                    </div>
                    <div>
                        El. paštas: {this.state.user.email}
                    </div>
                    <div>
                        Bageto pavadinimas: {this.props.product}
                    </div>
                    <div>
                        Stiklas: {this.props.glass}
                    </div>
                    <div>
                        Nugara: {this.props.back}
                    </div>
                    <div>
                        Išmatavimai: {this.props.width} X {this.props.height} cm
                    </div>
                    <div>
                        Komentaras:
                    </div>
                    <div>
                        {this.props.comment}
                    </div>
                    <div>
                        Užsakymo vertė: {this.props.price} &euro;
                    </div>
                    <div>
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