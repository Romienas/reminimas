import React from 'react';
import Header from '../modules/header';
import Footer from '../modules/footer';
import Loading from '../components/loading';
import Button from '../components/button';
import Select from '../components/select';
import * as firebase from 'firebase'; 
import '../firebase';

let db = firebase.firestore();
let storage = firebase.storage();
let storageRef = storage.ref();

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            productsArr: [],
            categories: [],
            colors: [],
            selectedCategory: '',
            selectedColor:''
        }

        this.getProductsList = this.getProductsList.bind(this);
        this.handleCategoriesVal = this.handleCategoriesVal.bind(this);
        this.handleColorsVal = this.handleColorsVal.bind(this);
        this.filterProducts = this.filterProducts.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
    }
    
   componentDidMount() {
        this.setState({
            loaded: true
        })
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

    productClick = () => {
        console.log('uzsakyti')
    }


    render() {
        return(
            <div>
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
                                            <Button 
                                                buttonText='Užsakyti' 
                                                handleClick={this.productClick}
                                            />
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