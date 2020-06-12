import React from 'react'
import Header from '../modules/header'
import Input from '../components/inputs/input'
import Loading from '../components/loading'
import Button from '../components/button'
import Select from '../components/select'
import InfoPop from '../components/infoPop'
import ProductList from '../modules/productList'
import * as firebase from 'firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import Footer from '../modules/footer'

let db = firebase.firestore()
let storage = firebase.storage()

export default class AddProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            loaded: false,
            productName: '',
            productPrice: 0,
            productHeight: 0,
            productWidth: 0,
            productImages: [],
            colors: [],
            selectVal: '',
            selectColorVal: '',
            warehouseStatusArr: ['Yra', 'Nėra'],
            warehouseStatusVal: true,
            error: false,
            productId: '',
            showBox: false
        }
    }

    componentDidMount(){
        //GET categories array
        db.collection('categories').doc('cat').get()
        .then(doc => {
            let data = doc.data()
            data = JSON.stringify(data)
            data = JSON.parse(data)

            this.setState({
                categories: data.category,
                loaded: true
            })
        })

        //GET colors array
        db.collection('categories').doc('colors').get()
        .then(doc => {
            let data = doc.data()
            data = JSON.stringify(data)
            data = JSON.parse(data)

            this.setState({
                colors: data.colors,
                loaded: true
            })
        })
    }

    showBox = () => {
        this.setState({
            showBox: !this.state.showBox
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

    getSelectValue = (selectVal) => {
        this.setState({
            selectVal
        })
    }

    getSelectColorValue = (selectColorVal) => {
        this.setState({
            selectColorVal
        })
    }

    getwarehouseStatusValue = (val) => {
        if (val === 'Yra') {
            this.setState({
                warehouseStatusVal: true
            })
        } else {
            this.setState({
                warehouseStatusVal: false
            })
        }
    }

    getProductId = (productId) => {
        this.setState({
            productId
        })
    }

    submitProduct = () => {
        this.setState({
            loaded: false
        })

        if (
            this.state.productName === '' || 
            this.state.productImages === [] ||
            this.state.productPrice === 0 ||
            this.state.productHeight === 0 ||
            this.state.productWidth === 0 ||
            this.state.selectVal === '' ||
            this.state.selectColorVal === '' ||
            this.state.productId === ''
        ){
            this.setState({
                error: true
            })
        } else {
            let imgArr = [];
            for (let i = 0; i < this.state.productImages.length; i++) {
                imgArr.push(this.state.productImages[i].name) 
            }

            // ADD product to database
            db.collection('products').doc(this.state.productId).set({
                productName: this.state.productName,
                id: this.state.productId,
                images: imgArr,
                price: this.state.productPrice,
                height: this.state.productHeight,
                width: this.state.productWidth,
                category: this.state.selectVal,
                color: this.state.selectColorVal,
                warehouse: this.state.warehouseStatusVal
            })
            .then(() => {
                this.setState({
                    productName: '', 
                    productImages: [],
                    productPrice: 0,
                    productHeight: 0,
                    productWidth: 0,
                    selectVal: '',
                    selectColorVal: '',
                    productId: '',
                    error: false
                })
            })
            .catch(err => {console.log(err)})
        }

        //ADD images to storage
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

        alert('Produktas pridėtas')
    }

    render() {
        return(
            <div>
                <Header />
                {this.state.loaded ? null : <Loading />}
                {this.state.error ? <InfoPop infoText='Užpildykite visus laukus' /> : null}
                <div className='addProduct'>
                    <div className='global__title'><h2>Produktų valdymas</h2></div>
                    <div className='addProduct__showBox' onClick={this.showBox}>
                        <span>
                            <FontAwesomeIcon icon={this.state.showBox ? faMinus : faPlus} />
                        </span>
                        Pridėti prekę
                    </div>
                    {this.state.showBox ?
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
                                        type='text' 
                                        placeholder='Prekės kodas' 
                                        changeHandler={this.getProductId} 
                                    />
                                </div>
                                <div className='addProduct__inputs'>
                                    <Input 
                                        className='addProduct__inputs' 
                                        type='file' 
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
                                        placeholder='Bageto aukštis mm' 
                                        changeHandler={this.getProductHeight}
                                    />
                                </div>
                                <div className='addProduct__inputs'>
                                    <Input 
                                        className='addProduct__inputs' 
                                        type='number' 
                                        placeholder='Bageto plotis mm' 
                                        changeHandler={this.getProductWidth}    
                                    />
                                </div>
                                <div className='addProduct__inputs'>
                                    <Select 
                                        selectArr={this.state.categories}
                                        handleSelect={this.getSelectValue} 
                                        selectTxt='Pasirinkite kategoriją'    
                                    />
                                </div>
                                <div className='addProduct__inputs'>
                                    <Select 
                                        selectArr={this.state.colors}
                                        handleSelect={this.getSelectColorValue} 
                                        selectTxt='Pasirinkite spalvą'    
                                    />
                                </div>
                                <div className='addProduct__inputs'>
                                    <Select 
                                        selectArr={this.state.warehouseStatusArr}
                                        handleSelect={this.getwarehouseStatusValue} 
                                        selectTxt='Sandėlio statusas'    
                                    />
                                </div>
                                <div className='addProduct__submit'>
                                    <Button buttonText='Pridėti' handleClick={this.submitProduct} />
                                </div>
                            </div>
                        </div> : null }                  
                </div>
                <ProductList />
                <Footer />
            </div>
        )
    }
}