import React from 'react';

export default class Input extends React.Component {
    render(){
        return(
            <div className='input'>
                <input className='input__field' type={this.props.type} placeholder={this.props.placeholder} />
            </div>
        )
    }
}