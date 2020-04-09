import React from 'react';
import Header from '../modules/header';
import Input from '../components/inputs/input';
import Loading from '../components/loading'
import Button from '../components/button';
import * as firebase from 'firebase';

let db = firebase.firestore();
let storage = firebase.storage();

export default class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            loaded: false,
            productName: '',
            productPrice: 0,
            productHeight: 0,
            productWidth: 0,
            productImages: []
        }

        this.getProductName = this.getProductName.bind(this);
        this.getProductPrice = this.getProductPrice.bind(this);
        this.getProductHeight = this.getProductHeight.bind(this);
        this.getProductWidth = this.getProductWidth.bind(this);
        this.submitProduct = this.submitProduct.bind(this);
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

    getProductImages = (productImages) => {
        this.setState({
            productImages
        })
    }

    submitProduct = () => {
        this.setState({
            loaded: false
        })

        let images = this.state.productImages

        for(let i = 0; i < images.length; i++) {
            let productName = images[i].name;
            let sotrageRef = storage.ref('/images/' + productName);
            sotrageRef.put(images[i])
        }
        this.setState({
            loaded: true,
            productImages: []
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
                                <Input 
                                    className='addProduct__inputs' 
                                    type='file' 
                                    placeholder='Nuotraukos URL' 
                                    changeHandler={this.getProductImages}
                                    isFile={true}
                                    isMultiple={true}
                                />
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
                            <div>
                                <Button buttonText='Pridėti' handleClick={this.submitProduct} />
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}