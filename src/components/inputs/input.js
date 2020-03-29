import React from 'react';

export default class Input extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        this.props.changeHandler(e.tartget.value)
    }

    render(){
        return(
            <div className='input'>
                <input 
                    className='input__field' 
                    type={this.props.type} 
                    placeholder={this.props.placeholder}  
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}