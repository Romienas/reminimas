import React from 'react'
import * as firebase from 'firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

let db = firebase.firestore()
let storage = firebase.storage()
let storageRef = storage.ref()

export default class ProductList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            productsArr: []
        }
    }

    componentDidMount(){     
        db.collection('products')
        .onSnapshot((querySnapshot) => {
            let productsArr = [];
            querySnapshot.forEach((doc) => {
                productsArr.push(doc.data())
            });
            this.setState({
                productsArr
            })
          });
    }

    deleteProduct = (id) => {
        // Delete photos
        const foundObj  = this.state.productsArr.find(el => el.id === id)
        console.log(foundObj)
        foundObj.images.forEach( i => {
            storageRef.child(`images/${i}`)
            .delete()
            .then(() => {
                console.log('Image deleted')
            }).catch(err => {
                console.log(err)
            })
        })

        // Delete product from database
        db.collection('products')
        .doc(id)
        .delete()
        .then( () => {
            console.log('istrinta')
        })
    }

    render(){
        return(
            <table className='productList'>
                <tbody>
                    <tr>
                        <th>Pavadinimas</th>
                        <th>Kategorija</th>
                        <th>Kaina</th>
                        <th>Spalva</th>
                        <th>Sandėlio statusas</th>
                        <th>Veiksmai</th>
                    </tr>
                    {this.state.productsArr.map((product, i) => {
                        return (
                            <tr key={i}>
                                <td>
                                    {product.productName}
                                </td>
                                <td>
                                    {product.category}
                                </td>
                                <td>
                                    {product.price} eur/m
                                </td>
                                <td>
                                    {product.color}
                                </td>
                                <td>
                                    {product.warehouse ? 'Yra' : 'Nėra'}
                                </td>
                                <td>
                                    <FontAwesomeIcon 
                                        className='global__trash' 
                                        icon={faTrash} 
                                        onClick={() => this.deleteProduct(product.id)}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}