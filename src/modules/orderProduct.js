import React from 'react';

export default class OrderProduct extends React.Component {
    render() {
        return(
            <div className='orderProduct'>
                <div className='orderProduct__box'>
                    <div className='orderProduct__padding'>
                        <div className='global__title'>
                            <h2>Rėmo užsakymas</h2>    
                        </div>
                        <div className='orderProduct__header'>
                            <img src={this.props.productObj.image} alt={this.props.productObj.productName} />
                            <div>
                                <h3>{this.props.productObj.productName}</h3>
                            </div>
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