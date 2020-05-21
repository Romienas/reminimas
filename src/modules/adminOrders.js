import React from 'react'
import * as firebase from 'firebase'

let db = firebase.firestore()

export default class AdminOrders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ordersArr: []
        }
    }

    componentDidMount() {
        db.collection('orders')
        .get()
        .then(snap => {
            let ordersArr = []
            snap.forEach(doc => {
                let data = doc.data()
                data = JSON.stringify(data)
                data = JSON.parse(data)
                ordersArr.push(data)
            })
            ordersArr.sort((c, d) => {
                let a = new Date(c.date)
                let b = new Date(d.date)
                return b - a
            })
            this.setState({
                ordersArr
            })
            console.log(ordersArr)
        })
    }

    render(){
        return(
            <div>
                <div className='admin__title'>
                    <h3>Užsakymų valdymas</h3>
                </div>
                <div className='adminOrders__list'>
                    <div>
                        {this.state.ordersArr.map((item, i) => {
                            return (
                                <div key={i} className='adminOrders__list-item'>
                                    <div>
                                        {item.order_id}
                                    </div>
                                    <div>
                                        {item.date}
                                    </div>
                                    <div>
                                        {item.product}
                                    </div>
                                    <div>
                                    Kaina: {item.price} &euro;
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}