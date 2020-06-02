import React from 'react'
import Header from '../modules/header'
import Footer from '../modules/footer'
import Loading from '../components/loading'
import Button from '../components/button'
import Select from '../components/select'
import ZoomImage from '../components/zoomImage'
import OrderProduct from '../modules/orderProduct'
import * as firebase from 'firebase'
import '../firebase'

let db = firebase.firestore()
let storage = firebase.storage()
let storageRef = storage.ref()

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            productsArr: [],
            categories: [],
            colors: [],
            selectedCategory: '',
            selectedColor:'',
            zoomImageUrl: '',
            productInfo: '',
            logged: false
        }
    }
    
   componentDidMount() {
        this.setState({
            loaded: true
        })

        if (localStorage.getItem('userID')){
            console.log('true')
            this.setState({
                logged: true
            }) 
        }else {
            console.log('false')
            this.setState({
                logged: false
            })
        }
        
        //GET categories array
        db.collection('categories').doc('cat').get()
        .then(doc => {
            let data = doc.data();
            data = JSON.stringify(data);
            data = JSON.parse(data);

            this.setState({
                categories: data.category,
            })
        })

        //GET colors array
        db.collection('categories').doc('colors').get()
        .then(doc => {
            let data = doc.data();
            data = JSON.stringify(data);
            data = JSON.parse(data);

            this.setState({
                colors: data.colors,
            })
        })
        this.getProductsList();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.logged !== this.state.logged){
            if (localStorage.getItem('userID')){
                console.log('true')
                this.setState({
                    logged: true
                }) 
            }else {
                console.log('false')
                this.setState({
                    logged: false
                })
            }
        }
    }

    getProductsList = () => {
        db.collection('products').get().then((list) => {
            let productsArr = []
            list.forEach((doc) => {
                let obj = doc.data();
                productsArr.push(obj)
            })
            productsArr.forEach(data => {
                storageRef.child(`images/${data.images[0]}`)
                .getDownloadURL()
                .then(url => {
                    document.getElementById(data.id).src = url
                })
            })
            this.setState({
                productsArr,
                loaded: false
            })
        })
    }

    handleCategoriesVal = (selectedCategory) => {
        this.setState({
            selectedCategory
        })
    }

    handleColorsVal = (selectedColor) => {
        this.setState({
            selectedColor
        })
    }

    filterProducts = () => {
        this.setState({
            loaded: true
        })

        let category = this.state.selectedCategory
        let color = this.state.selectedColor

        if(category !== '' && color === ''){
            let arr =[]
            db.collection('products')
            .where('category', '==', category)
            .get()
            .then(snap => {
                snap.forEach(prod => {
                    let data = prod.data();
                    data = JSON.stringify(data);
                    data = JSON.parse(data);
                    arr.push(data)
                })
                arr.forEach(data => {
                    storageRef.child(`images/${data.images[0]}`)
                    .getDownloadURL()
                    .then(url => {
                        document.getElementById(data.id).src = url
                    })
                })
            }).then(() => {
                this.setState({
                    productsArr: arr,
                    loaded: false
                })
            })
        } else if (color !== '' && category === ''){
            let arr =[]
            db.collection('products')
            .where('color', '==', color)
            .get()
            .then(snap => {
                snap.forEach(prod => {
                    let data = prod.data();
                    data = JSON.stringify(data);
                    data = JSON.parse(data);
                    arr.push(data)
                })
                arr.forEach(data => {
                    storageRef.child(`images/${data.images[0]}`)
                    .getDownloadURL()
                    .then(url => {
                        document.getElementById(data.id).src = url
                    })
                })
            }).then(() => {
                this.setState({
                    productsArr: arr,
                    loaded: false
                })
            })
        } else if (category !== '' && color !== ''){
            let arr =[]
            db.collection('products')
            .where('category', '==', category)
            .where('color', '==', color)
            .get()
            .then(snap => {
                snap.forEach(prod => {
                    let data = prod.data();
                    data = JSON.stringify(data);
                    data = JSON.parse(data);
                    arr.push(data)
                })
                arr.forEach(data => {
                    storageRef.child(`images/${data.images[0]}`)
                    .getDownloadURL()
                    .then(url => {
                        document.getElementById(data.id).src = url
                    })
                })
            }).then(() => {
                this.setState({
                    productsArr: arr,
                    loaded: false
                })
            })
        }
    }

    clearFilter = () => {
        this.setState({
            loaded: true
        })
        this.getProductsList();
    }

    zoomImage = (id) => {
        this.setState({
            zoomImageUrl: document.getElementById(id).src
        })
    }

    closeZoom = (string) => {
        this.setState({
            zoomImageUrl: string
        })
    }

    productClick = (id, price, productName, width, image) => {
        // const image = document.getElementById(id).src
        this.setState({
            productInfo: {
                id,
                price,
                productName,
                width,
                image
            }
        })
    }

    closeOrder = (string) => {
        this.setState({
            productInfo: string
        })
    }

    render() {
        return(
            <div>
                {this.state.productInfo ? 
                    <OrderProduct 
                        productObj={this.state.productInfo}
                        handleClick={this.closeOrder}
                    /> : null
                }
                {this.state.zoomImageUrl ? 
                    <ZoomImage 
                        imageUrl={this.state.zoomImageUrl}
                        handleClick={this.closeZoom}
                    /> :null
                }
                <Header />
                {this.state.loaded ? <Loading /> : null}
                <div className='list__filter'>
                    <div className='list__filter-text'>
                        Filtras:
                    </div>
                    <div>
                        <Select 
                            selectArr={this.state.categories}
                            selectTxt='Pasirinkite kategoriją'
                            handleSelect={this.handleCategoriesVal}
                        />
                    </div>
                    <div>
                        <Select 
                            selectArr={this.state.colors}
                            selectTxt='Pasirinkite spalvą'
                            handleSelect={this.handleColorsVal}
                        />
                    </div>
                    <div>
                        <Button 
                            buttonText='Filtruoti'
                            handleClick={this.filterProducts}
                        />
                    </div>
                    <div className='list__filter-clear' onClick={this.clearFilter}>
                        Išvalyti paiešką
                    </div>
                </div>
                <div className='list'>
                    {this.state.productsArr.map((product, i) => {
                        return (
                            <div key={i}>
                                <div className='list__box'>
                                    <div className='list__padding'>
                                        <div>
                                            <h3>{product.productName}</h3>
                                        </div>
                                        <img id={product.id}
                                            className='list__image' 
                                            src={product.images[0]}
                                            alt={product.category} 
                                            onClick={() => this.zoomImage(product.id)}
                                        />
                                        <div className='list__category'>
                                            Kategorija: {product.category}
                                        </div>
                                        <div  className='list__category'>
                                            Spalva: {product.color}
                                        </div>
                                        <div  className='list__category'>
                                            Plotis: {product.width} mm
                                        </div>
                                        <div  className='list__category'>
                                            Aukštis: {product.height} mm
                                        </div>
                                        <div className='list__price'>
                                            Kaina: {product.price} &euro;/m
                                        </div>
                                        <div className='list__button'>
                                            {this.state.loaded ? 
                                            <Button 
                                                buttonText='Užsakyti' 
                                                handleClick={() => this.productClick(
                                                    product.id,
                                                    product.price,
                                                    product.productName,
                                                    product.width,
                                                    product.images
                                                )}
                                            /> :
                                            <div className='list__login'>
                                            Norėdami užsisakyti turite <a href='/login/'>prisijungti</a>
                                            </div> }
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Footer />
            </div>
        )
    }
}