import React from 'react';

export default class Select extends React.Component {

    handleSelect = (e) => {
        if (e.target.value !== '0'){
            this.props.handleSelect(e.target.value)
        }
    }

    render(){
        return(
            <div className='select'>
                <select className='select__field' onChange={this.handleSelect}>
                    <option value='0' defaultValue>{this.props.selectTxt}</option>
                    {this.props.selectArr.map((opt, i) => {
                        return <option key={i} value={opt}>{opt}</option>
                    })}
                </select>
            </div>
        )
    }
}