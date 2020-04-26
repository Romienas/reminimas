import React from 'react';
import * as firebase from 'firebase'; 
import '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

let storage = firebase.storage();
let storageRef = storage.ref();

export default class OrderProduct extends React.Component {

    componentDidMount(){
        this.props.productObj.image.forEach(img => {
            storageRef.child(`images/${img}`)
            .getDownloadURL()
            .then(url => {
                document.getElementById(img).src = url
            })
        });

        // Set gallery main image
        storageRef.child(`images/${this.props.productObj.image[0]}`)
        .getDownloadURL()
        .then(url => {
            document.getElementById('orderProduct__mainImg').src = url
        })
    }

    handleClick = () =>{
        this.props.handleClick('')
    }
    
    changeImage = (e) => {
        document.getElementById('orderProduct__mainImg').src = e.target.src
    }

    render() {
        return(
            <div className='orderProduct' >
                <div className='orderProduct__closeBackground' onClick={this.handleClick}></div>
                <div className='orderProduct__box'>
                    <FontAwesomeIcon 
                        className='orderProduct__closeButton'
                        icon={faWindowClose}
                        onClick={this.handleClick}
                    />
                    <div className='orderProduct__padding'>
                        <div className='global__title'>
                            <h2>Rėmo užsakymas</h2>    
                        </div>
                        <div>
                            <h3>{this.props.productObj.productName}</h3>
                        </div>
                        <div className='orderProduct__gallery'>
                            <div className='orderProduct__gallery-mainImg'>
                                <img id='orderProduct__mainImg' src='' alt={this.props.productObj.productName} />
                            </div>
                            <div className='orderProduct__gallery-images'>
                                {this.props.productObj.image.map((img, i) => {
                                    return <img 
                                                id={img} 
                                                key={i} 
                                                src='' 
                                                alt={this.props.productObj.productName} 
                                                onClick={this.changeImage}
                                            />
                                })}
                            </div>
                        </div>
                        <div className='orderProduct__header'>                          
                            <div>
                                Kaina: {this.props.productObj.price} &euro;/m
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}