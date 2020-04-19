import React from 'react';

export default class ZoomImage extends React.Component {

    handleClick = () => {
        this.props.handleClick('')
    }

    render() {
        return(
            <div className='zoomImage__box' onClick={this.handleClick}>
                <div className='zoomImage__image'>
                    <img src={this.props.imageUrl} alt='' />
                </div>
            </div>
        )
    }
}