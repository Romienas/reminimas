import React from 'react';
import Header from '../modules/header';
import Input from '../components/inputs/input';
import Loading from '../components/loading'
import * as firebase from 'firebase';

let db = firebase.firestore();

export default class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            loaded: false
        }
    }

    componentDidMount(){
        db.collection('categories').doc('cat').get()
        .then(doc => {
            let data = doc.data();
            data = JSON.stringify(data);
            data = JSON.parse(data);

            this.setState({
                categories: data.category,
                loaded: true
            })
        })
    }

    render() {
        return(
            <div>
                <Header />
                {this.state.loaded ? null : <Loading />}
                <div>
                    <Input type='text' placeholder='Prekės pavadinimas' />
                    <Input type='url' placeholder='Nuotraukos URL' />
                    <Input type='number' placeholder='Metro kaina' />
                    <Input type='number' placeholder='Bageto aukštis' />
                    <Input type='number' placeholder='Bageto plotis' />
                    
                </div>
            </div>
        )
    }
}