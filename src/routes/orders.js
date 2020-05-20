import React from 'react'
import Header from '../modules/header'
import Footer from '../modules/footer'
import * as firebase from 'firebase'
import Loading from '../components/loading'

let db = firebase.firestore()

export default class Orders extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            ordersArr: []
        }
    }

    componentDidMount(){
        this.setState({
            loading: true
        })
        db.collection('orders')
        .where('user',  '==', localStorage.getItem('userID'))
        .get()
        .then((snap) => {
            let ordersArr = []
            snap.forEach(doc => {
                let data = doc.data()
                data = JSON.stringify(data)
                data = JSON.parse(data)
                ordersArr.push(data)
            })
            this.setState({
                loading: false,
                ordersArr
            })
        })
        .catch(err => console.log('Get user orders error: ', err))
    }

    render(){
        return(
            <div>
                <Header />
                    {this.state.loading && <Loading />}
                    <div className='order'>
                        <div className='global__title'><h2>Mano užsakymai</h2></div>
                        <div>
                            <table className='order__list'>
                                <tbody>
                                    <tr>
                                        <th>Užsakymo nr.</th>
                                        <th>Data</th>
                                        <th>Rėmas</th>
                                        <th>Stiklas</th>
                                        <th>Nugara</th>
                                        <th>Kaina</th>
                                    </tr>
                                    {this.state.ordersArr.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{item.order_id}</td>
                                                <td>{item.date}</td>
                                                <td>{item.product}</td>
                                                <td>{item.glass}</td>
                                                <td>{item.back}</td>
                                                <td>{item.price}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                <Footer />
            </div>
        )
    }
}