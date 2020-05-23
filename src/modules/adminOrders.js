import React from 'react'
import * as firebase from 'firebase'
import OrderDetail from '../components/orderDetail'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

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
        .onSnapshot(snap => {
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

    checkItem = (id, done) => {
        let bool
        if (done === true) {
            bool = false
        }else if (done === false) {
            bool = true
        }
        db.collection('orders')
        .doc(id)
        .update({
            done: bool
        })
    }

    render(){
        return(
            <div className='adminOrder'>
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
                                >
                                    <div className={
                                        item.done === true ? 
                                        'adminOrders__list-item adminOrders__list-item--done' : 
                                        'adminOrders__list-item'
                                        }>
                                        <div
                                            className='adminOrders__check adminOrders__list-item--done'
                                            onClick={() => this.checkItem(item.order_id, item.done)}
                                        >
                                            <FontAwesomeIcon 
                                                icon={faCheck}
                                            />
                                        </div>
                                        <div 
                                            className='adminOrders__list-item-info'
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
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}