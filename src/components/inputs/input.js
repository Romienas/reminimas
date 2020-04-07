import React from 'react';

export default class Input extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        if(this.props.isFile){
            this.props.changeHandler(e.target.files)
        }else{
            this.props.changeHandler(e.target.value)
        }
    }

    render(){
        return(
            <div className='input'>
                {this.props.isMultiple ? <input 
                    className='input__field' 
                    type={this.props.type} 
                    placeholder={this.props.placeholder}  
                    onChange={this.handleChange}
                    multiple
                /> :
                <input 
                    className='input__field' 
                    type={this.props.type} 
                    placeholder={this.props.placeholder}  
                    onChange={this.handleChange}
                />}
            </div>
        )
    }
}