import React from 'react';
import Header from '../modules/header';
import Footer from '../modules/footer';
import Loading from '../components/loading';
import Button from '../components/button';
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
        }
    }
    
   componentDidMount() {
        this.setState({
            loaded: true
        })
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

    productClick = () => {
        console.log('uzsakyti')
    }

    render() {
        return(
            <div>
                <Header />
                {this.state.loaded ? <Loading /> : null}
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
                                        <div>
                                            Spalva: {product.color}
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