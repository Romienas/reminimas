import React from 'react';

export default class Button extends React.Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.props.handleClick();
    }

    render(){
        return(
            <div className='button' onClick={this.handleClick}>
                <div className='button__text'>
                    {this.props.buttonText}
                </div>
            </div>
        )
    }
}