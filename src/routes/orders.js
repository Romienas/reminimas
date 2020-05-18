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
            //TODO
            console.log(ordersArr)
            this.setState({
                loading: false
            })
        })
        .catch(err => console.log('Get user orders error: ', err))
    }

    render(){
        return(
            <div>
                <Header />
                    {this.state.loading && <Loading />}
                
                <Footer />
            </div>
        )
    }
}