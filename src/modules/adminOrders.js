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
            console.log(ordersArr)
        })
    }

    render(){
        return(
            <div>
                <div className='admin__title'>
                    <h3>Užsakymų valdymas</h3>
                </div>
            </div>
        )
    }
}