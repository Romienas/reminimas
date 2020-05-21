import React from 'react'
import * as firebase from 'firebase'

let db = firebase.firestore()

const OrderDetail = () => {
    return (
        <div className='orderDetail'>

        </div>
    )
}

export default class AdminOrders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ordersArr: [],
            orderDetail: false,
            orderId: ''
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
                {this.state.orderDetail && 
                    <OrderDetail 
                        order-id={this.state.orderId}
                    />
                }
                <div className='admin__title'>
                    <h3>Užsakymų valdymas</h3>
                </div>
                <div className='adminOrders__list'>
                    <div>
                        {this.state.ordersArr.map((item) => {
                            return (
                                <div 
                                    key={item.order_id} 
                                    className='adminOrders__list-item'
                                    onClick={ () => {
                                        this.setState({
                                            orderDetail: !this.state.orderDetail,
                                            orderId: item.order_id
                                        })
                                    }}
                                >
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