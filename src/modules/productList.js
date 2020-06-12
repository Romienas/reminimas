import React from 'react'
import * as firebase from 'firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

let db = firebase.firestore()

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