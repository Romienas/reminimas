import React from 'react'
import * as firebase from 'firebase'
import OrderDetail from '../components/orderDetail'

let db = firebase.firestore()

export default class AdminOrders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ordersArr: [],
            orderDetail: false,
            product: '',
            userId: '',
            glas: '',
            back: '',
            width: '',
            height: '',
            comment: '',
            price: ''
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
        })
    }

    render(){
        return(
            <div>
                {this.state.orderDetail &&
                    <OrderDetail 
                        handleClick={ (bool) => this.setState({orderDetail: bool}) }
                        product={this.state.product}
                        glass={this.state.glass}
                        back={this.state.back}
                        user={this.state.userId}
                        width={this.state.width}
                        height={this.state.height}
                        comment={this.state.comment}
                        price={this.state.price}
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
                                    onClick={ () => {
                                        this.setState({ 
                                            orderDetail: !this.state.orderDetail,
                                            product: item.product,
                                            glass: item.glass,
                                            back: item.back,
                                            userId: item.user,
                                            width: item.width,
                                            height: item.height,
                                            comment: item.comment,
                                            price: item.price
                                        })                                   
                                    }}
                                >
                                    <div className='adminOrders__list-item'>
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
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}