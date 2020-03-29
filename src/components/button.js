import React from 'react';

export default class Button extends React.Component {
    render(){
        return(
            <div className='button'>
                <div className='button__text'>
                    {this.props.buttonText}
                </div>
            </div>
        )
    }
}