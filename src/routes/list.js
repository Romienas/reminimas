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

    // async componentDidMount() {
    //     let productsArr = []
    //     let productsData = await db.collection('products')
    //         .get()
    //         .then( list => {
    //             let arr = []
    //             list.forEach( doc => {
    //                 arr.push(doc.data())
    //             })
    //             return productsArr = arr
    //         })
    //     console.log('productsArr', productsArr)

        // let getImagesUrls = await productsArr.map( obj => {
        //     let imgArr = []
        //     console.log('obj', obj)
        //     let imagesLength = obj.images
        //     console.log('imagesLength', imagesLength)

        //     obj.images.map( img => {
        //         storageRef.child(`images/${img}`)
        //         .getDownloadURL()
        //         .then(url => {
        //             console.log('url', url)
        //             imgArr.push(url)
        //         })
        //         .catch(err => console.log('Getting image url ERROR', err))
        //         // const returnImgArr = await Promise.all(imgUrls)
        //         console.log('imgArr', imgArr)
        //     })
        //     const newObj = Object.assign(obj, {images: imgArr})
        //     console.log('newObj', newObj.images[0])
        //     // productsArr.push(newObj)
        //     return newObj
        // })

        // console.log('getImagesUrls', getImagesUrls)
    //   }
    
   componentDidMount() {
        console.log('didmount')
        this.setState({
            loaded: true
        })
        db.collection('products').get().then((list) => {
            let productsArr = []
            list.forEach((doc) => {
                let obj = doc.data();
                productsArr.push(obj)
            })
            console.log('product arr', productsArr)
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
                        console.log('img', product.images[0])
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