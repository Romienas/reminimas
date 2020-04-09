import React from 'react';

export default class Select extends React.Component {

    render(){
        return(
            <div>
                <select>
                    {this.props.selectArr.map((opt, i) => {
                        return <option key={i} value={opt}>{opt}</option>
                    })}
                </select>
            </div>
        )
    }
}