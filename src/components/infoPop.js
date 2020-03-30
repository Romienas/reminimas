import React from 'react';

export default class InfoPop extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            close: true
        }
        this.closePop = this.closePop.bind(this);
    }

    closePop = () => {
        this.setState({
            close: false
        })
    }
    render() {
        return(
            <div className={this.state.close ? 'info-pop' : 'info-pop--close'}>
                <div className='info-pop__box'>
                    <div className='info-pop__box-close' onClick={this.closePop}>x</div>
                    <div className='info-pop__text'>{this.props.infoText}</div>
                </div>
            </div>
        )
    }
}