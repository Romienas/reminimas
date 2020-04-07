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
            loaded: false,
            productName: '',
            productPrice: 0,
            productHeight: 0,
            productWidth: 0
        }

        this.getProductName = this.getProductName.bind(this);
        this.getProductPrice = this.getProductPrice.bind(this);
        this.getProductHeight = this.getProductHeight.bind(this);
        this.getProductWidth = this.getProductWidth.bind(this);
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

    getProductName = (productName) => {
        this.setState({
            productName
        })
    }

    getProductPrice = (productPrice) => {
        this.setState({
            productPrice
        })
    }

    getProductHeight = (productHeight) => {
        this.setState({
            productHeight
        })
    }
    
    getProductWidth = (productWidth) => {
        this.setState({
            productWidth
        })
    }
    render() {
        return(
            <div>
                <Header />
                {this.state.loaded ? null : <Loading />}
                <div className='addProduct'>
                    <div className='global__title'><h2>Produktų valdymas</h2></div>
                    <div className='addProduct__box'>
                        <div className='addProduct__box-padding'>
                            <div className='addProduct__inputs'>
                                <Input 
                                    type='text' 
                                    placeholder='Prekės pavadinimas' 
                                    changeHandler={this.getProductName} 
                                />
                            </div>
                            <div className='addProduct__inputs'>
                                <Input className='addProduct__inputs' type='url' placeholder='Nuotraukos URL' />
                            </div>
                            <div className='addProduct__inputs'>
                                <Input 
                                    className='addProduct__inputs' 
                                    type='number' 
                                    placeholder='Metro kaina'
                                    changeHandler={this.getProductPrice}
                                />
                            </div>
                            <div className='addProduct__inputs'>
                                <Input 
                                    className='addProduct__inputs' 
                                    type='number' 
                                    placeholder='Bageto aukštis' 
                                    changeHandler={this.getProductHeight}
                                />
                            </div>
                            <div className='addProduct__inputs'>
                                <Input 
                                    className='addProduct__inputs' 
                                    type='number' 
                                    placeholder='Bageto plotis' 
                                    changeHandler={this.getProductWidth}    
                                />
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}